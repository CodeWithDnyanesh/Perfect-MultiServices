import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'mr' | 'hi';

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home', services: 'Services', howItWorks: 'How It Works', about: 'About', contact: 'Contact', quote: 'Get Quote',
    footerDescription: 'Professional housekeeping and maintenance services for homes, offices, and industrial facilities.',
    quickLinks: 'Quick Links', contactInfo: 'Contact Info', housekeeping: 'Housekeeping', maintenance: 'Maintenance',
    industrialCleaning: 'Industrial Cleaning', officeMaintenance: 'Office Maintenance', allRights: 'All rights reserved.',
    servicesEyebrow: 'One call. All services.', servicesTitle: 'Professional care for every kind of space.',
    servicesDescription: 'Perfect Multi Services brings housekeeping, cleaning, maintenance, and pest control together under one dependable partner.',
    requestQuote: 'Request a tailored quote', capabilities: 'Our capabilities', capabilitiesTitle: 'Solutions designed around your property.',
    capabilitiesText: 'Whether you need a one-time deep clean or an ongoing facility support plan, our team can shape the service around your priorities, schedule, and budget.',
    residential: 'Residential Housekeeping', commercial: 'Commercial Cleaning', maintenanceSupport: 'Maintenance Support', pestControl: 'Pest Control',
    planService: 'Plan this service', specific: 'Need something specific?', tellUs: 'Tell us what your space needs.', talkTeam: 'Talk to our team',
    processEyebrow: 'How it works', processTitle: 'A simpler way to keep your space at its best.',
    processDescription: 'From the first conversation to the final follow-up, our process is designed to be clear, convenient, and dependable.',
    approach: 'Our approach', fourSteps: 'Four steps. One trusted partner.', servicePromise: 'Our service promise',
    startConversation: 'Start with a conversation', aboutEyebrow: 'One company. Multiple solutions.',
    aboutDescription: 'Reliable housekeeping, cleaning, maintenance, and pest control support for homes, offices, and facilities.',
    contactTitle: 'Contact Us', contactDescription: 'Tell us about your home, office, or facility and we will recommend the right service plan.',
    whatNext: 'What happens next?', sendMessage: 'Send Message', location: 'Location', email: 'Email', phone: 'Phone',
    selectLanguage: 'Language', loading: 'Loading services...', retry: 'Retry', bookService: 'Book a Service',
    whyChooseUs: 'Why Choose Us', customerRating: 'Customer Rating', homesServed: 'Homes Served', support: 'Support',
    popular: 'Popular', deepCleaning: 'Deep cleaning', sanitization: 'Sanitization', flexibleTiming: 'Flexible timing',
    sameDay: 'Same-day slot', trustedFamilies: 'Trusted by 1250+ families', difference: 'The Perfect difference',
    servicePrecision: 'Thoughtful service, delivered with precision.', ourServices: 'Our Services',
    professionalCare: 'Professional care for every space', learnMore: 'Learn More', chooseUs: 'Why choose us',
    cleanSpaces: 'Clean spaces. Trusted teams. Reliable service.', howSimple: 'Simple steps to a better space',
    fullName: 'Full Name', emailAddress: 'Email Address', phoneNumber: 'Phone Number', message: 'Message',
    selectService: 'Select a service', sendAnother: 'Send another message', thankYou: 'Thank you for your inquiry!',
    willContact: 'We will contact you soon.', otherWays: 'Other Ways to Reach Us'
  },
  mr: {
    home: 'मुख्यपृष्ठ', services: 'सेवा', howItWorks: 'सेवा कशी मिळते', about: 'आमच्याबद्दल', contact: 'संपर्क', quote: 'कोट मिळवा',
    footerDescription: 'घरे, कार्यालये आणि औद्योगिक सुविधांसाठी व्यावसायिक हाऊसकीपिंग व देखभाल सेवा.',
    quickLinks: 'जलद दुवे', contactInfo: 'संपर्क माहिती', housekeeping: 'हाऊसकीपिंग', maintenance: 'देखभाल',
    industrialCleaning: 'औद्योगिक स्वच्छता', officeMaintenance: 'कार्यालय देखभाल', allRights: 'सर्व हक्क राखीव.',
    servicesEyebrow: 'एक कॉल. सर्व सेवा.', servicesTitle: 'प्रत्येक जागेसाठी व्यावसायिक सेवा.',
    servicesDescription: 'हाऊसकीपिंग, स्वच्छता, देखभाल आणि पेस्ट कंट्रोल एका विश्वासू भागीदाराकडून.',
    requestQuote: 'तुमचा कोट मागवा', capabilities: 'आमच्या सेवा', capabilitiesTitle: 'तुमच्या जागेसाठी योग्य उपाय.',
    capabilitiesText: 'एकदाच डीप क्लीनिंग असो किंवा नियमित सुविधा सेवा, तुमच्या गरजेनुसार आम्ही योजना तयार करतो.',
    residential: 'घरगुती हाऊसकीपिंग', commercial: 'व्यावसायिक स्वच्छता', maintenanceSupport: 'देखभाल सेवा', pestControl: 'पेस्ट कंट्रोल',
    planService: 'ही सेवा निवडा', specific: 'तुमची गरज वेगळी आहे?', tellUs: 'तुमच्या जागेबद्दल आम्हाला सांगा.', talkTeam: 'आमच्या टीमशी बोला',
    processEyebrow: 'सेवा कशी मिळते', processTitle: 'तुमची जागा उत्तम ठेवण्याचा सोपा मार्ग.',
    processDescription: 'पहिल्या संवादापासून अंतिम फॉलो-अपपर्यंत आमची प्रक्रिया स्पष्ट आणि विश्वासार्ह आहे.',
    approach: 'आमचा दृष्टिकोन', fourSteps: 'चार पायऱ्या. एक विश्वासू भागीदार.', servicePromise: 'आमचे सेवा वचन',
    startConversation: 'संवाद सुरू करा', aboutEyebrow: 'एक कंपनी. अनेक उपाय.',
    aboutDescription: 'घरे, कार्यालये आणि सुविधांसाठी विश्वासार्ह हाऊसकीपिंग, स्वच्छता, देखभाल व पेस्ट कंट्रोल.',
    contactTitle: 'संपर्क करा', contactDescription: 'तुमच्या जागेबद्दल सांगा आणि आम्ही योग्य सेवा योजना सुचवू.',
    whatNext: 'पुढे काय?', sendMessage: 'संदेश पाठवा', location: 'ठिकाण', email: 'ईमेल', phone: 'फोन',
    selectLanguage: 'भाषा', loading: 'सेवा लोड होत आहेत...', retry: 'पुन्हा प्रयत्न करा', bookService: 'सेवा बुक करा',
    whyChooseUs: 'आम्हाला का निवडावे', customerRating: 'ग्राहक रेटिंग', homesServed: 'सेवा दिलेली घरे', support: 'मदत',
    popular: 'लोकप्रिय', deepCleaning: 'डीप क्लीनिंग', sanitization: 'निर्जंतुकीकरण', flexibleTiming: 'सोयीची वेळ',
    sameDay: 'त्याच दिवशीची वेळ', trustedFamilies: '१२५०+ कुटुंबांचा विश्वास', difference: 'Perfect मधील फरक',
    servicePrecision: 'नियोजनबद्ध आणि अचूक सेवा.', ourServices: 'आमच्या सेवा', professionalCare: 'प्रत्येक जागेसाठी व्यावसायिक सेवा',
    learnMore: 'अधिक जाणून घ्या', chooseUs: 'आम्हाला का निवडावे', cleanSpaces: 'स्वच्छ जागा. विश्वासू टीम. उत्तम सेवा.',
    howSimple: 'उत्तम जागेसाठी सोप्या पायऱ्या', fullName: 'पूर्ण नाव', emailAddress: 'ईमेल पत्ता', phoneNumber: 'फोन नंबर',
    message: 'संदेश', selectService: 'सेवा निवडा', sendAnother: 'दुसरा संदेश पाठवा', thankYou: 'आपल्या चौकशीबद्दल धन्यवाद!',
    willContact: 'आम्ही लवकरच संपर्क करू.', otherWays: 'आमच्याशी संपर्क करण्याचे इतर मार्ग'
  },
  hi: {
    home: 'होम', services: 'सेवाएं', howItWorks: 'सेवा कैसे मिलती है', about: 'हमारे बारे में', contact: 'संपर्क', quote: 'कोट पाएं',
    footerDescription: 'घरों, कार्यालयों और औद्योगिक सुविधाओं के लिए पेशेवर हाउसकीपिंग और रखरखाव सेवाएं.',
    quickLinks: 'त्वरित लिंक', contactInfo: 'संपर्क जानकारी', housekeeping: 'हाउसकीपिंग', maintenance: 'रखरखाव',
    industrialCleaning: 'औद्योगिक सफाई', officeMaintenance: 'ऑफिस रखरखाव', allRights: 'सर्वाधिकार सुरक्षित.',
    servicesEyebrow: 'एक कॉल. सभी सेवाएं.', servicesTitle: 'हर जगह के लिए पेशेवर देखभाल.',
    servicesDescription: 'हाउसकीपिंग, सफाई, रखरखाव और पेस्ट कंट्रोल एक भरोसेमंद पार्टनर से.',
    requestQuote: 'कोट का अनुरोध करें', capabilities: 'हमारी सेवाएं', capabilitiesTitle: 'आपकी जगह के लिए सही समाधान.',
    capabilitiesText: 'एक बार की डीप क्लीनिंग हो या नियमित सुविधा सेवा, हम आपकी जरूरत के अनुसार योजना बनाते हैं.',
    residential: 'घरेलू हाउसकीपिंग', commercial: 'व्यावसायिक सफाई', maintenanceSupport: 'रखरखाव सहायता', pestControl: 'पेस्ट कंट्रोल',
    planService: 'यह सेवा चुनें', specific: 'कुछ खास चाहिए?', tellUs: 'अपनी जगह की जरूरत बताएं.', talkTeam: 'हमारी टीम से बात करें',
    processEyebrow: 'सेवा कैसे मिलती है', processTitle: 'अपनी जगह को बेहतर रखने का आसान तरीका.',
    processDescription: 'पहली बातचीत से अंतिम फॉलो-अप तक हमारी प्रक्रिया स्पष्ट और भरोसेमंद है.',
    approach: 'हमारा तरीका', fourSteps: 'चार कदम. एक भरोसेमंद पार्टनर.', servicePromise: 'हमारा सेवा वादा',
    startConversation: 'बातचीत शुरू करें', aboutEyebrow: 'एक कंपनी. अनेक समाधान.',
    aboutDescription: 'घरों, कार्यालयों और सुविधाओं के लिए भरोसेमंद हाउसकीपिंग, सफाई, रखरखाव और पेस्ट कंट्रोल.',
    contactTitle: 'संपर्क करें', contactDescription: 'अपनी जगह के बारे में बताएं और हम सही सेवा योजना सुझाएंगे.',
    whatNext: 'अब आगे क्या?', sendMessage: 'संदेश भेजें', location: 'स्थान', email: 'ईमेल', phone: 'फोन',
    selectLanguage: 'भाषा', loading: 'सेवाएं लोड हो रही हैं...', retry: 'फिर कोशिश करें', bookService: 'सेवा बुक करें',
    whyChooseUs: 'हमें क्यों चुनें', customerRating: 'ग्राहक रेटिंग', homesServed: 'सेवा प्राप्त घर', support: 'सहायता',
    popular: 'लोकप्रिय', deepCleaning: 'डीप क्लीनिंग', sanitization: 'सैनिटाइजेशन', flexibleTiming: 'लचीला समय',
    sameDay: 'उसी दिन का स्लॉट', trustedFamilies: '१२५०+ परिवारों का भरोसा', difference: 'Perfect का अंतर',
    servicePrecision: 'सोची-समझी और सटीक सेवा.', ourServices: 'हमारी सेवाएं', professionalCare: 'हर जगह के लिए पेशेवर देखभाल',
    learnMore: 'और जानें', chooseUs: 'हमें क्यों चुनें', cleanSpaces: 'स्वच्छ जगह. भरोसेमंद टीम. विश्वसनीय सेवा.',
    howSimple: 'बेहतर जगह के लिए आसान कदम', fullName: 'पूरा नाम', emailAddress: 'ईमेल पता', phoneNumber: 'फोन नंबर',
    message: 'संदेश', selectService: 'सेवा चुनें', sendAnother: 'दूसरा संदेश भेजें', thankYou: 'आपकी पूछताछ के लिए धन्यवाद!',
    willContact: 'हम जल्द ही आपसे संपर्क करेंगे.', otherWays: 'हमसे संपर्क करने के अन्य तरीके'
  }
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<Language>((localStorage.getItem('pms-language') as Language) || 'en');

  setLanguage(language: Language): void {
    this.language.set(language);
    localStorage.setItem('pms-language', language);
    document.documentElement.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en';
  }

  t(key: string): string {
    return translations[this.language()][key] || translations.en[key] || key;
  }
}
