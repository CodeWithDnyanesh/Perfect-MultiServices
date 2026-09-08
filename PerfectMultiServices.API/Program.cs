using System.Linq;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder => builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Add in-memory database for demo
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

// In-memory data storage
var services = new List<Service>
{
    new Service
    {
        Id = 1,
        Name = "Home Housekeeping",
        Description = "Complete home cleaning service",
        Category = "Housekeeping",
        Price = 1500,
        Duration = "2 hours",
        Icon = "🏠",
        Active = true
    },
    new Service
    {
        Id = 2,
        Name = "Office Cleaning",
        Description = "Professional office cleaning",
        Category = "Cleaning",
        Price = 2500,
        Duration = "3 hours",
        Icon = "🏢",
        Active = true
    },
    new Service
    {
        Id = 3,
        Name = "Deep Cleaning",
        Description = "Thorough deep cleaning service",
        Category = "Cleaning",
        Price = 3500,
        Duration = "4 hours",
        Icon = "🧹",
        Active = true
    },
    new Service
    {
        Id = 4,
        Name = "Pest Control",
        Description = "Complete pest elimination",
        Category = "Pest Control",
        Price = 2000,
        Duration = "2 hours",
        Icon = "🐀",
        Active = true
    },
    new Service
    {
        Id = 5,
        Name = "Solar Panel Cleaning",
        Description = "Professional solar panel maintenance",
        Category = "Specialized Cleaning",
        Price = 4000,
        Duration = "3 hours",
        Icon = "☀️",
        Active = false
    }
};

var bookings = new List<Booking>
{
    new Booking
    {
        Id = "BK-2024-001",
        CustomerName = "Rahul Sharma",
        CustomerPhone = "+91 9876543210",
        Service = "Home Housekeeping",
        Date = "2024-09-06",
        Time = "10:00 AM",
        Address = "123, Main Street, Sangli",
        Status = "confirmed",
        Amount = 1500,
        AssignedStaff = "John Doe",
        Notes = "Customer requested deep cleaning"
    },
    new Booking
    {
        Id = "BK-2024-002",
        CustomerName = "Priya Patel",
        CustomerPhone = "+91 9876543211",
        Service = "Office Cleaning",
        Date = "2024-09-06",
        Time = "2:00 PM",
        Address = "456, Business Park, Sangli",
        Status = "pending",
        Amount = 2500,
        Notes = "After hours service requested"
    },
    new Booking
    {
        Id = "BK-2024-003",
        CustomerName = "Amit Kumar",
        CustomerPhone = "+91 9876543212",
        Service = "Pest Control",
        Date = "2024-09-05",
        Time = "11:00 AM",
        Address = "789, Residential Area, Sangli",
        Status = "completed",
        Amount = 2000,
        AssignedStaff = "Jane Smith",
        Notes = "Inspection completed"
    },
    new Booking
    {
        Id = "BK-2024-004",
        CustomerName = "Sneha Reddy",
        CustomerPhone = "+91 9876543213",
        Service = "Deep Cleaning",
        Date = "2024-09-05",
        Time = "9:00 AM",
        Address = "321, Apartment Complex, Sangli",
        Status = "in-progress",
        Amount = 3500,
        AssignedStaff = "Mike Johnson",
        Notes = "Follow-up visit scheduled"
    },
    new Booking
    {
        Id = "BK-2024-005",
        CustomerName = "Vijay Singh",
        CustomerPhone = "+91 9876543214",
        Service = "Industrial Cleaning",
        Date = "2024-09-04",
        Time = "8:00 AM",
        Address = "654, Industrial Estate, Sangli",
        Status = "cancelled",
        Amount = 8000,
        Notes = "Customer cancelled due to emergency"
    }
};

var customers = new List<Customer>
{
    new Customer
    {
        Id = "CUST-001",
        Name = "Rahul Sharma",
        Email = "rahul.sharma@email.com",
        Phone = "+91 9876543210",
        Address = "123, Main Street, Sangli",
        RegistrationDate = "2024-01-15",
        TotalBookings = 12,
        TotalSpent = 18500,
        Status = "active",
        LastBookingDate = "2024-09-06",
        AverageRating = 4.5m
    },
    new Customer
    {
        Id = "CUST-002",
        Name = "Priya Patel",
        Email = "priya.patel@email.com",
        Phone = "+91 9876543211",
        Address = "456, Business Park, Sangli",
        RegistrationDate = "2024-02-20",
        TotalBookings = 8,
        TotalSpent = 12000,
        Status = "active",
        LastBookingDate = "2024-09-06",
        AverageRating = 4.8m
    },
    new Customer
    {
        Id = "CUST-003",
        Name = "Amit Kumar",
        Email = "amit.kumar@email.com",
        Phone = "+91 9876543212",
        Address = "789, Residential Area, Sangli",
        RegistrationDate = "2024-03-10",
        TotalBookings = 5,
        TotalSpent = 7500,
        Status = "active",
        LastBookingDate = "2024-09-05",
        AverageRating = 4.2m
    },
    new Customer
    {
        Id = "CUST-004",
        Name = "Sneha Reddy",
        Email = "sneha.reddy@email.com",
        Phone = "+91 9876543213",
        Address = "321, Apartment Complex, Sangli",
        RegistrationDate = "2024-04-05",
        TotalBookings = 15,
        TotalSpent = 22500,
        Status = "active",
        LastBookingDate = "2024-09-05",
        AverageRating = 4.7m
    },
    new Customer
    {
        Id = "CUST-005",
        Name = "Vijay Singh",
        Email = "vijay.singh@email.com",
        Phone = "+91 9876543214",
        Address = "654, Industrial Estate, Sangli",
        RegistrationDate = "2024-05-12",
        TotalBookings = 3,
        TotalSpent = 4500,
        Status = "inactive",
        LastBookingDate = "2024-08-20",
        AverageRating = 3.9m
    },
    new Customer
    {
        Id = "CUST-006",
        Name = "Neha Gupta",
        Email = "neha.gupta@email.com",
        Phone = "+91 9876543215",
        Address = "987, Commercial Hub, Sangli",
        RegistrationDate = "2024-06-18",
        TotalBookings = 1,
        TotalSpent = 1500,
        Status = "blocked",
        LastBookingDate = "2024-07-10",
        AverageRating = 2.5m
    }
};

// Service endpoints
app.MapGet("/api/services", () => services)
.WithName("GetServices");

app.MapGet("/api/services/{id}", (int id) =>
{
    var service = services.FirstOrDefault(s => s.Id == id);
    return service is not null ? Results.Ok(service) : Results.NotFound();
})
.WithName("GetServiceById");

app.MapPost("/api/services", (Service service) =>
{
    service.Id = services.Max(s => s.Id) + 1;
    services.Add(service);
    return Results.Created($"/api/services/{service.Id}", service);
})
.WithName("CreateService");

app.MapPut("/api/services/{id}", (int id, Service updatedService) =>
{
    var index = services.FindIndex(s => s.Id == id);
    if (index == -1) return Results.NotFound();
    
    services[index] = updatedService;
    return Results.Ok(updatedService);
})
.WithName("UpdateService");

app.MapDelete("/api/services/{id}", (int id) =>
{
    var service = services.FirstOrDefault(s => s.Id == id);
    if (service is null) return Results.NotFound();
    
    services.Remove(service);
    return Results.NoContent();
})
.WithName("DeleteService");

// Booking endpoints
app.MapGet("/api/bookings", () => bookings)
.WithName("GetBookings");

app.MapGet("/api/bookings/{id}", (string id) =>
{
    var booking = bookings.FirstOrDefault(b => b.Id == id);
    return booking is not null ? Results.Ok(booking) : Results.NotFound();
})
.WithName("GetBookingById");

app.MapPost("/api/bookings", (Booking booking) =>
{
    booking.Id = $"BK-2024-{bookings.Count + 1:000}";
    bookings.Add(booking);
    return Results.Created($"/api/bookings/{booking.Id}", booking);
})
.WithName("CreateBooking");

app.MapPut("/api/bookings/{id}", (string id, Booking updatedBooking) =>
{
    var index = bookings.FindIndex(b => b.Id == id);
    if (index == -1) return Results.NotFound();
    
    bookings[index] = updatedBooking;
    return Results.Ok(updatedBooking);
})
.WithName("UpdateBooking");

app.MapDelete("/api/bookings/{id}", (string id) =>
{
    var booking = bookings.FirstOrDefault(b => b.Id == id);
    if (booking is null) return Results.NotFound();
    
    bookings.Remove(booking);
    return Results.NoContent();
})
.WithName("DeleteBooking");

// Company info endpoint
app.MapGet("/api/company", () =>
{
    var company = new CompanyInfo
    {
        Name = "Perfect Multi Services Pvt. Ltd.",
        Tagline = "One Company. Multiple Solutions.",
        Description = "Professional housekeeping and maintenance services for homes, offices, and industrial facilities.",
        Location = "Sangli, Maharashtra",
        ContactEmail = "info@perfectmultiservices.com",
        Phone = "+91 XXXXXXXXXX"
    };
    return company;
})
.WithName("GetCompanyInfo");

// Contact endpoint
app.MapPost("/api/contact", (ContactRequest request) =>
{
    // In a real application, this would send an email or save to database
    return Results.Ok(new { message = "Thank you for your inquiry! We will contact you soon." });
})
.WithName("SubmitContact");

// Dashboard statistics endpoint
app.MapGet("/api/admin/dashboard/stats", () =>
{
    var stats = new
    {
        totalCustomers = customers.Count,
        todayBookings = bookings.Count(b => b.Date == DateTime.Now.ToString("yyyy-MM-dd")),
        pendingBookings = bookings.Count(b => b.Status == "pending"),
        confirmedBookings = bookings.Count(b => b.Status == "confirmed"),
        completedBookings = bookings.Count(b => b.Status == "completed"),
        cancelledBookings = bookings.Count(b => b.Status == "cancelled"),
        totalRevenue = bookings.Where(b => b.Status == "completed").Sum(b => b.Amount),
        pendingPayments = bookings.Where(b => b.Status == "confirmed").Sum(b => b.Amount),
        activeStaff = 28,
        complaints = 8
    };
    return Results.Ok(stats);
})
.WithName("GetDashboardStats");

app.MapGet("/api/customers", () => customers)
.WithName("GetCustomers");

app.Run();

class Service
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Duration { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public bool Active { get; set; }
}

class Booking
{
    public string Id { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string Service { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public decimal Amount { get; set; }
    public string? AssignedStaff { get; set; }
    public string? Notes { get; set; }
}

class CompanyInfo
{
    public string Name { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string ContactEmail { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
}

class Customer
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string RegistrationDate { get; set; } = string.Empty;
    public int TotalBookings { get; set; }
    public decimal TotalSpent { get; set; }
    public string Status { get; set; } = "active";
    public string? LastBookingDate { get; set; }
    public decimal? AverageRating { get; set; }
}

class ContactRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string Service { get; set; } = string.Empty;
}
