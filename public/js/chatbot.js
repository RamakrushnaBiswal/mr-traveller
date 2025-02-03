// Element Selectors
let chatbot = document.querySelector('#cbimg');
let form = document.querySelector('#cbform');
let lang = document.querySelector('#languages');
let opt = document.querySelector('#options');
let change1 = document.querySelector('#change1');
let change2 = document.querySelector('#change2');
let enquiry = document.querySelector('#enquiry');
let ques = document.querySelector('#ques');
let mic = document.querySelector('#mic');
let value = ''; // Assuming this is set somewhere in your code
const hasSpeechRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

// Translations object
const translations = {
    English: {
        helpText: "Hello, How can I help you?",
        chooseLanguage: "Choose Your Language",
        continueText: "You have selected English. Continue...",
        bookTicket: "Book Ticket",
        cancelTicket: "Cancel Ticket",
        viewOrders: "View Orders",
        ticketEnquiry: "Ticket Enquiry",
        others: "Others",
        questionPlaceholder: "Question in mind? If any.",
        availableTickets: "Available Tickets: "
    },
    Hindi: {
        helpText: "नमस्ते, मैं आपकी कैसे मदद कर सकता हूँ?",
        chooseLanguage: "अपनी भाषा चुनें",
        continueText: "आपने हिंदी चुनी है। जारी रखें...",
        bookTicket: "टिकट बुक करें",
        cancelTicket: "टिकट रद्द करें",
        viewOrders: "आदेश देखें",
        ticketEnquiry: "टिकट पूछताछ",
        others: "अन्य",
        questionPlaceholder: "कोई प्रश्न है? यदि हां, तो यहाँ लिखें।",
        availableTickets: "उपलब्ध टिकट: "
    },
    Odia: {
        helpText: "ନମସ୍କାର, ମୁଁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
        chooseLanguage: "ଆପଣଙ୍କର ଭାଷା ଚୟନ କରନ୍ତୁ",
        continueText: "ଆପଣ ଓଡ଼ିଆ ଚୟନ କରିଛନ୍ତି। ଆଗକୁ ବଢ଼ନ୍ତୁ...",
        bookTicket: "ଟିକେଟ୍ ବୁକ୍ କରନ୍ତୁ",
        cancelTicket: "ଟିକେଟ୍ ବତିଲ୍ କରନ୍ତୁ",
        viewOrders: "ଅର୍ଡର୍ ଦେଖନ୍ତୁ",
        ticketEnquiry: "ଟିକେଟ୍ ପ୍ରଶ୍ନାବଳୀ",
        others: "ଅନ୍ୟ",
        questionPlaceholder: "କିଛି ପ୍ରଶ୍ନ ଅଛି? ଯଦି ହାଁ, ତେବେ ଏଠାରେ ଲେଖନ୍ତୁ।",
        availableTickets: "ପ୍ରାପ୍ତ ଟିକେଟ୍: "
    },
    Telugu: {
        helpText: "హలో, నేను మీకు ఎలా సహాయం చేయగలను?",
        chooseLanguage: "మీ భాషను ఎంచుకోండి",
        continueText: "మీరు తెలుగు ఎంచుకున్నారు. కొనసాగించండి...",
        bookTicket: "టికెట్ బుక్ చేయండి",
        cancelTicket: "టికెట్ రద్దు చేయండి",
        viewOrders: "ఆర్డర్లను చూడండి",
        ticketEnquiry: "టికెట్ విచారణ",
        others: "ఇతరులు",
        questionPlaceholder: "మీకు ఎటువంటి ప్రశ్న ఉందా? ఉంటే ఇక్కడ రాయండి.",
        availableTickets: "ఉపलब్ధ టికెట్లు: "
    },
    Tamil: {
        helpText: "வணக்கம், நான் உங்களுக்கு எப்படி உதவலாம்?",
        chooseLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
        continueText: "நீங்கள் தமிழ் தேர்ந்தெடுத்தீர்கள். தொடரவும்...",
        bookTicket: "டிக்கெட்டை முன்பதிவு செய்யவும்",
        cancelTicket: "டிக்கெட்டை ரத்து செய்யவும்",
        viewOrders: "ஆர்டர்கள் காண்க",
        ticketEnquiry: "டிக்கெட் விசாரணை",
        others: "மற்றவை",
        questionPlaceholder: "உங்களிடம் எங்கு கேள்விகள் உள்ளனவா? இருந்தால், இங்கே எழுதவும்.",
        availableTickets: "கிடைக்கக்கூடிய டிக்கெட்டுகள்: "
    },
    Bengali: {
        helpText: "হ্যালো, আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        chooseLanguage: "আপনার ভাষা নির্বাচন করুন",
        continueText: "আপনি বাংলা নির্বাচন করেছেন। চালিয়ে যান...",
        bookTicket: "টিকিট বুক করুন",
        cancelTicket: "টিকিট বাতিল করুন",
        viewOrders: "অর্ডারগুলি দেখুন",
        ticketEnquiry: "টিকিট অনুসন্ধান",
        others: "অন্যান্য",
        questionPlaceholder: "আপনার কোনো প্রশ্ন আছে? থাকলে এখানে লিখুন।",
        availableTickets: "প্রাপ্ত টিকিট: "
    }
};

// Function to hide chatbot image and show the form
function chatbotClick() {
    chatbot.style.visibility = "hidden";
    form.style.visibility = "visible";
}

// Function to show language selection options
function chooseLang() {
    lang.style.visibility = "visible";
}

// Function to update text based on the selected language
function options(selLang) {
    opt.style.visibility = "visible";
    lang.style.visibility = "hidden"; // Hide language selection after choosing

    // Set the text based on the selected language
    change1.innerText = translations[selLang].continueText;
    document.querySelector('h3').innerText = translations[selLang].helpText;
    ques.placeholder = translations[selLang].questionPlaceholder;
    
    // Update the text for buttons and other elements
    const buttons = document.querySelectorAll('#options button');
    buttons[0].innerText = translations[selLang].bookTicket;
    buttons[1].innerText = translations[selLang].cancelTicket;
    buttons[2].innerText = translations[selLang].viewOrders;
    buttons[3].innerText = translations[selLang].ticketEnquiry;
    buttons[4].innerText = translations[selLang].others;
}

// Function to display ticket enquiry information
function ticketEnquiry() {
    change2.innerHTML = "<h3>Morning Tickets: 100<br>Afternoon Tickets: 100<br>Evening Tickets: 200</h3>"
    enquiry.style.visibility = "visible";
}

// Function to display the 'Others' section
function others() {
    document.querySelector('#others').style.visibility = "visible";
}

if (hasSpeechRecognition) {
    const recognition = 'webkitSpeechRecognition' in window ? new webkitSpeechRecognition() : new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        ques.value += transcript;
    };
    recognition.onerror = function(event) {
        console.error('Speech recognition error detected: ' + event.error);
    };
    mic.onclick = function() {
        recognition.start();
    };
} else {
    alert('Speech recognition is not supported in this browser.');
}

async function askQuestion() {
    let question = ques.value.trim();
    if (!question) {
        response.textContent = 'Please enter a question.';
        return;
    }

    try {
        const res = await fetch('http://localhost:5000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        response.textContent = data.answer || 'No suitable answer found.';
    } catch (error) {
        response.textContent = `Error occurred while fetching response: ${error.message}`;
        console.error('Error:', error);
    }
}

document.getElementById('ques').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        askQuestion();
    }
});