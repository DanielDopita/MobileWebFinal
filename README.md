Personal Finance Tracker App
This mobile app is built with React Native, Firebase, and Expo to help users manage their finances. It allows users to add, edit, delete, and view transactions in real-time. All data is stored in Firebase Firestore and user authentication is handled with Firebase Auth.

Features
Firebase Authentication (email/password)

Add, update, and delete income or expense transactions

Real-time sync using Firestore

Search and filter transactions

Dynamic charts with Victory Native

Dark mode UI with a deep color theme

Tech Stack
React Native (Expo)

Firebase (Auth and Firestore)

Victory Native (data visualization)

Context API

AsyncStorage (optional for caching)

Project Structure

app/
├── components/
│   ├── TransactionList.jsx
│   ├── SummaryCard.jsx
│   └── Chart.jsx
├── context/
│   ├── AuthContext.jsx
│   └── TransactionContext.jsx
├── screens/
│   ├── home.jsx
│   ├── add-transaction.jsx
│   ├── edit-transaction.jsx
│   ├── transaction-list.jsx
│   ├── search.jsx
│   ├── login.jsx
│   └── signup.jsx
├── utils/
│   └── firebase.js
├── index.jsx
└── _layout.jsx

Firebase Setup
Create a Firebase project at firebase.google.com.

Enable Authentication with email and password.

Set up Firestore.

Add your Firebase config in utils/firebase.js

The TransactionContext handles real-time updates and all transaction CRUD operations.

Installation

git clone https://github.com/your-username/finance-tracker-app.git
cd finance-tracker-app
npm install
npx expo start

Future Improvements
Recurring transactions
Budget planning
Export options
Category breakdowns
