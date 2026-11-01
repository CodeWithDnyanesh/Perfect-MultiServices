using System.Net;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

/// <summary>
/// SMTP settings, read from the "Email" configuration section. On Render set them as
/// environment variables: Email__Username, Email__Password (a Gmail app password), and
/// optionally Email__CompanyInbox, Email__Host, Email__Port, Email__FromName.
/// </summary>
public class EmailSettings
{
    public string Host { get; set; } = "smtp.gmail.com";
    public int Port { get; set; } = 587;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FromName { get; set; } = "Perfect Multi Services";
    public string CompanyInbox { get; set; } = "perfectmultiservicess@gmail.com";

    public bool IsConfigured => !string.IsNullOrWhiteSpace(Username) && !string.IsNullOrWhiteSpace(Password);
}

public enum EnquiryResult { Sent, NotConfigured, Failed }

/// <summary>Emails each website enquiry to the company and a confirmation to the visitor.</summary>
public class EnquiryEmailService(EmailSettings settings, ILogger<EnquiryEmailService> logger)
{
    public async Task<EnquiryResult> SendAsync(ContactRequest request, CancellationToken ct)
    {
        if (!settings.IsConfigured)
        {
            logger.LogWarning("Enquiry from {Name} ({Phone}) not emailed: Email settings are missing.", request.Name, request.Phone);
            return EnquiryResult.NotConfigured;
        }

        using var smtp = new SmtpClient();
        try
        {
            // Real mail servers always require TLS; a mail server on this machine (for testing) may not offer it.
            var security = settings.Host is "localhost" or "127.0.0.1" ? SecureSocketOptions.None : SecureSocketOptions.StartTls;
            await smtp.ConnectAsync(settings.Host, settings.Port, security, ct);
            // Google shows app passwords in groups of four ("abcd efgh ..."); the spaces are not part of it.
            await smtp.AuthenticateAsync(settings.Username.Trim(), settings.Password.Replace(" ", ""), ct);
            await smtp.SendAsync(BuildCompanyEmail(request), ct);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Could not email enquiry from {Name} ({Phone}).", request.Name, request.Phone);
            return EnquiryResult.Failed;
        }

        // The enquiry has reached the company; a failed confirmation must not fail the request.
        if (!string.IsNullOrWhiteSpace(request.Email))
        {
            try
            {
                await smtp.SendAsync(BuildConfirmationEmail(request), ct);
            }
            catch (Exception ex)
            {
                logger.LogWarning(ex, "Enquiry delivered, but the confirmation to the visitor failed.");
            }
        }

        await smtp.DisconnectAsync(true, ct);
        return EnquiryResult.Sent;
    }

    private MimeMessage BuildCompanyEmail(ContactRequest r)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Perfect Multi Services Website", settings.Username));
        message.To.Add(MailboxAddress.Parse(settings.CompanyInbox));
        if (!string.IsNullOrWhiteSpace(r.Email))
        {
            message.ReplyTo.Add(new MailboxAddress(r.Name, r.Email));
        }
        message.Subject = $"New enquiry: {r.Service} – {r.Name}";

        var rows = new (string Label, string Value)[]
        {
            ("Name", r.Name),
            ("Phone", r.Phone),
            ("Email", r.Email),
            ("Service", r.Service)
        };

        var text = string.Join("\n", rows.Where(x => x.Value.Length > 0).Select(x => $"{x.Label}: {x.Value}"))
                   + $"\n\nMessage:\n{r.Message}\n";

        var htmlRows = string.Concat(rows.Where(x => x.Value.Length > 0).Select(x =>
            $"<tr><td style=\"padding:6px 14px 6px 0;color:#777\">{x.Label}</td><td style=\"padding:6px 0\"><strong>{Html(x.Value)}</strong></td></tr>"));
        var html = $"""
            <div style="font-family:Arial,sans-serif;color:#252525;max-width:560px">
              <h2 style="margin:0 0 12px;color:#e86b00">New website enquiry</h2>
              <table style="border-collapse:collapse;font-size:15px">{htmlRows}</table>
              <p style="margin:18px 0 6px;color:#777">Message</p>
              <div style="white-space:pre-wrap;padding:14px;border-radius:8px;background:#f7f7f5;font-size:15px">{Html(r.Message)}</div>
              <p style="margin-top:18px;font-size:13px;color:#777">Reply to this email to answer the customer directly.</p>
            </div>
            """;

        message.Body = new BodyBuilder { TextBody = text, HtmlBody = html }.ToMessageBody();
        return message;
    }

    private MimeMessage BuildConfirmationEmail(ContactRequest r)
    {
        var t = ConfirmationText.For(r.Language);
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(settings.FromName, settings.Username));
        message.To.Add(new MailboxAddress(r.Name, r.Email));
        message.ReplyTo.Add(MailboxAddress.Parse(settings.CompanyInbox));
        message.Subject = t.Subject;

        var text = $"{t.Greeting} {r.Name},\n\n{t.Body}\n\n{t.ServiceLabel}: {r.Service}\n\n{t.Help}\n+91 84606 57606\n\n{t.SignOff}\nPerfect Multi Services Pvt. Ltd.\n";
        var html = $"""
            <div style="font-family:Arial,sans-serif;color:#252525;max-width:560px;line-height:1.6">
              <h2 style="margin:0 0 12px;color:#e86b00">{t.Subject}</h2>
              <p>{t.Greeting} {Html(r.Name)},</p>
              <p>{t.Body}</p>
              <p><span style="color:#777">{t.ServiceLabel}:</span> <strong>{Html(r.Service)}</strong></p>
              <p>{t.Help}<br><a href="tel:+918460657606" style="color:#e86b00;font-weight:bold">+91 84606 57606</a>
                · <a href="https://wa.me/918460657606" style="color:#1fa855;font-weight:bold">WhatsApp</a></p>
              <p style="margin-top:22px">{t.SignOff}<br><strong>Perfect Multi Services Pvt. Ltd.</strong><br>
                <span style="color:#777">One Call All Services · Sangli</span></p>
            </div>
            """;

        message.Body = new BodyBuilder { TextBody = text, HtmlBody = html }.ToMessageBody();
        return message;
    }

    private static string Html(string value) => WebUtility.HtmlEncode(value);
}

/// <summary>Confirmation email wording in the visitor's language.</summary>
public record ConfirmationText(string Subject, string Greeting, string Body, string ServiceLabel, string Help, string SignOff)
{
    public static ConfirmationText For(string language) => language switch
    {
        "mr" => new(
            "तुमची चौकशी आम्हाला मिळाली आहे",
            "नमस्कार",
            "Perfect Multi Services शी संपर्क केल्याबद्दल धन्यवाद. तुमची चौकशी आम्हाला मिळाली असून आमची टीम लवकरच तुमच्याशी संपर्क करेल.",
            "सेवा",
            "तातडीच्या कामासाठी आम्हाला कॉल किंवा WhatsApp करा:",
            "धन्यवाद,"),
        "hi" => new(
            "आपकी पूछताछ हमें मिल गई है",
            "नमस्ते",
            "Perfect Multi Services से संपर्क करने के लिए धन्यवाद. आपकी पूछताछ हमें मिल गई है और हमारी टीम जल्द ही आपसे संपर्क करेगी.",
            "सेवा",
            "तत्काल काम के लिए हमें कॉल या WhatsApp करें:",
            "धन्यवाद,"),
        _ => new(
            "We have received your enquiry",
            "Hello",
            "Thank you for contacting Perfect Multi Services. We have received your enquiry and our team will get in touch with you shortly.",
            "Service",
            "For anything urgent, call or WhatsApp us:",
            "Thank you,")
    };
}
