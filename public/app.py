from flask import Flask, request, jsonify
from flask_cors import CORS
from fuzzywuzzy import process

app = Flask(__name__)
CORS(app)  # This allows all domains. You can configure it more strictly if needed.

# Sample dataset of questions and answers
qa_dataset = {
    "Hello, hi,":"Hello Sir/Madam, How can I help you?",
    "I love you":"it is not a question of museum",
    "Who are you and your work?": "I am an AI model created to assist with your queries.",
    "What is the name of the museum?":"The name of the museum is Victorial Museum",
    "Details about the victorial museum?":"The Victoria Memorial is a large marble monument on the Maidan in Central Kolkata, having its entrance on the Queen's Way. It was built between 1906 and 1921 by the Government of India. It is dedicated to the memory of Queen Victoria, the Empress of India from 1876 to 1901. It is the largest monument to a monarch anywhere in the world. It stands at 64 acres of gardens and is now a museum under the control of the Ministry of Culture, Government of India. Possessing prominent features of the Indo-Saracenic architecture, it has evolved into one of the most popular attractions in the city.",
    "What is the distance and location of the museum?":"The Victorial Museum is located at 11km away from the Kolkata Railway Station.",
    "How can I reset my password?": "To reset your password, follow the instructions in the password reset email.",
    "What are the museum's opening and closing hours?": "The museum is open from 10:00 AM to 6:00 PM, Monday through Sunday.",
    "what is the entry fee or price?": "The entry fee for Indian Nationals- Rs. 50/-, Rs. 100 for SAARC countries and Rs. 500 for Nationals of all other countries.",
    "Is there any discount or free of cost for any school students?": "School students up to Class XII with uniform and valid ID proof, differently-abled persons, and Army Persons along with spouses and family with valid ID proof.",
    "Closing time of ticket counter?":"Ticket counters close half an hour before the closure of the galleries.",
    "Are there any guided services and tours available?": "Yes, we offer guided tours at 10:00 AM, 11:30 AM, 1:00 PM, 2:45 PM and 4:15 PM daily. You can book a tour at the museum.",
    "Is there parking available at the museum?":"Yes, we have a parking lot available for visitors at free of cost.",
    "Can I buy tickets online?": "Absolutely! You can purchase tickets online through our website for a seamless entry experience.",
    "Is the museum wheelchair accessible?":"Yes, our museum is fully wheelchair accessible, with ramps and elevators available.",
    "Are there any activities for children?":"Yes, we offer interactive exhibits, workshops, and a children's play area designed to engage young visitors.",
    "Is there a dress code for visiting the museum?":"There is no formal dress code, but we recommend comfortable clothing and shoes.",
    "What happens if I lose my ticket?":"Please contact the Information Desk with proof of purchase, and we'll assist you with a replacement.",
    "What should I do if I have a complaint?":"Please bring any concerns to our attention by contacting us directly or visiting the Information Desk.",
    "How can I stay updated on museum events and news?":"Sign up for our newsletter on the website, or follow us on social media for the latest updates.",
    "Can i cancel the ticket?":"Yes, you can cancel the ticket from the previous menu and get the refund shortly.",
    "Can i get refund for cancelled ticket?":"If you cancel the ticket 2 hours prior to the reporting time, you can get full refund of the ticket.",
    "Can i get refund for the reason of not coming or reporting to the museum?":"Sorry for the inconvinience, you cannot get refund for this case.",
    "Can I buy tickets at the museum?":"Yes, tickets can be purchased at the museum's ticket counter. However, we recommend buying tickets in advance online to avoid long lines and ensure availability.",
    "How do I reschedule my ticket?":"Contact the Information Desk for rescheduling the ticket.",
    "Can I bring food or drinks into the museum?":"Outside food and drinks are generally not permitted in the museum. We have a café and dining areas available for your convenience.",
    "Is the museum accessible for people with disabilities?":"Yes, our museum is fully accessible. We offer wheelchair rentals and accessible restrooms. If you have specific needs, please contact us in advance for assistance.",
    "Are group bookings available?":"Yes, we offer group bookings of maximum 10 tickets.",
    "How can I contact customer support?":"For any additional questions or support, you can reach our customer service team via email at rama@giet.edu or call us at +91 6371583380. Our team is available from 9 AM to 8 PM, Monday through Sunday.",
    "What is your COVID-19 policy?":"We follow all local health guidelines to ensure a safe visit. This may include mask requirements, social distancing, and limited capacity. Please check our website for the latest health and safety updates before your visit.",
    "Opeining hours of Garden time?":"The Garden is open from 5:30 a.m. to 6:00 pm",
    "is there camera allowed or not?":"No flash and no shooting of films is allowed.",
    "Pets allowed?":"Pets are prohibited inside the museum.",
    "Total area of the museum?":"The total area of the museum is 57 Acres along with 36L+ annual visitors and 29000+ Artefacts.",
    "Is there a specific time I need to arrive?":"Yes, your ticket will have a designated time slot. Please arrive within this window to ensure a smooth entry. Late arrivals may need to wait until the next available slot."
    
    # Add more question-answer pairs here
}

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question')

    if not question:
        return jsonify({'answer': 'No question provided.'}), 400

    # Find the best matching answer
    response = find_answer(question)
    return jsonify({'answer': response})

def find_answer(question):
    # Use fuzzy matching to find the closest question
    questions = list(qa_dataset.keys())
    best_match, score = process.extractOne(question, questions)

    # You can adjust the threshold based on your needs
    if score >= 80:
        return qa_dataset[best_match]
    else:
        return 'Sorry, I do not have an answer for that question. For further queries, Contact- 7608910930'

if __name__ == '__main__':
    app.run(debug=True)