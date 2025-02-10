
## Aura Event


AuraEvent is a full-stack event management application built with TypeScript, designed to simplify event organization while offering a modern and intuitive user experience.

🔹 Key Features:

Event Creation & Management – Users can create, edit, and manage events effortlessly.

Attendee Registration – Seamless RSVP and participant tracking.

Real-time Updates – Stay informed with live status updates.

Dark Mode & Modern UI – Styled with shadcn/ui for an elegant and responsive design.

🛠 Tech Stack: Frontend: React with Context API for state management.

Backend: Node.js + Express for handling API requests.

Database: MongoDB for efficient event storage.

Authentication: JWT-based secure login.

With AuraEvent, managing events becomes effortless, thanks to its clean UI, smooth state handling with Context API, and real-time interactions. 🚀


## Getting Started

### Prerequisite
- npm install
- MongoDB installed locally or MongoDB Atlas account


### Clone the Repository
```bash
git clone https://github.com/dadhichharshit22/AuraEvent.git
cd event-management-project
```

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI = mongodb://localhost:27017/<your db name>
JWT_SECRET = secret_key
PORT = 8085
EMAIL_USERNAME = your email_id
EMAIL_PASSWORD = your_password
RAZORPAY_KEY = your razorpay key
RAZORPAY_SECRET = your razorpay secret key
```

4. Start the backend server:
```bash
# Development mode
npm run dev
```bash


### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL = http://localhost:5173
```

4. Start the frontend development server:
```bash
npm start
```

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

4. Start the frontend development server:
```bash
npm run dev
```


## Available Scripts

In both frontend and backend directories, you can run:

###  `npm run dev` 
Runs the app in development mode
- Frontend: [http://localhost:3000](http://localhost:5173)
- Backend: [http://localhost:8085](http://localhost:8085)






