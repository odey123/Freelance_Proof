# 🛡️ FreelanceProof

> **Your GitHub is Your Passport.** A full-stack freelancer verification platform that helps African freelancers prove their legitimacy to fintechs like Raenest. 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)

---

## 📖 The Problem

The core issue African freelancers face isn't basic identity verification (KYC)—fintechs already use passports, BVN, and biometrics for that. **The real problem is proving the source of funds and income legitimacy.** 

Irregular income patterns and geographic red flags often trigger risk models, leading to frozen accounts or rejected applications. When fintechs see unusual transaction volumes, they require Enhanced Due Diligence (EDD) to verify where the wealth/money is coming from.

**FreelanceProof** solves this exactly by acting as a strong, verifiable signal of professional legitimacy. By analyzing a developer's GitHub history, we calculate a comprehensive "Legitimacy Score" and issue a cryptographically signed Verification Token. When a fintech receives this token, they can instantly verify that the user is a demonstrably active, skilled professional—satisfying source-of-wealth/income checks and preventing unwarranted account freezes.

## Features

### For Freelancers
- **1-Click OAuth**: Connect your GitHub account securely.
- **Legitimacy Scoring Engine**: Automatically calculates a score (out of 100) based on:
  - Account Age & Experience
  - Commit Consistency
  - Repository Quality
  - Tech Language Diversity
  - Community Signals
- **Verifiable Token Generation**: Generates an **RS256-signed JWT token** proving your legitimacy metrics.
- **Beautiful Dashboard**: Visualize your score breakdown using sleek Recharts pie charts and progress bars.

### For Fintechs (Businesses)
- **Sandbox Registration**: Register your business to obtain an API Key.
- **Instant Credibility Reports**: Validate freelancer cryptographic tokens and instantly access detailed credibility reports via the UI portal or REST API.

---

## Tech Stack

- **Backend**: Node.js, Express, MongoDB & Mongoose, Custom RS256 JWT implementation.
- **Frontend**: React (Vite), Tailwind CSS, React Router, Recharts, Lucide React icons.

---

## Getting Started

### 1. Prerequisites
- **Node.js** (v16 or newer)
- **MongoDB** (Running locally on `mongodb://127.0.0.1:27017` or a cloud Atlas URI)
- A GitHub account to create an OAuth App.

### 2. GitHub OAuth Setup
1. Go to your GitHub account settings -> **Developer settings** -> **OAuth Apps**.
2. Create a new App with the following details:
   - **Application name**: `FreelanceProof Local`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:5000/api/auth/github/callback`
3. Generate a **Client Secret** and save both your `Client ID` and `Client Secret`.

### 3. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder containing:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/freelanceproof
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *(Note: The server will automatically generate the cryptographic RSA `public.pem` and `private.pem` keys in a `/keys` folder on the first run!)*

5. **(Optional)** Seed the database with mock Fintech API Keys to test the portal:
   ```bash
   node seed.js
   ```

### 4. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000` in your browser.

---

## 🔌 API Documentation for Fintechs

Fintechs can programmatically verify a freelancer's token by calling the public API. *(Requires an API key passed in the request body for the sandbox demo).*

#### `POST /api/business/register`
Registers a business to obtain a sandbox API Key.
- **Body**: `{ "business_name": "String", "email": "String" }`
- **Returns**: `{ "api_key": "String", "business_name": "Stri", "message": "..." }`

#### `POST /api/business/verify`
Verifies a freelancer's signed JWT token.
- **Body**: 
  ```json
  { 
    "api_key": "YOUR_API_KEY", 
    "token": "eyJhbGciOiJSUzI1NiIs..." 
  }
  ```
- **Returns (Success 200)**: 
  ```json
  {
    "valid": true,
    "business_recipient": "Raenest",
    "report": {
      "github_username": "odey123",
      "score": {
        "overall": 75,
        "experience": 20,
        "consistency": 10,
        "activity": 20,
        "diversity": 10,
        "community": 15
      },
      "verified_platforms": ["github"],
      "issued_at": "2024-03-21T00:00:00.000Z"
    }
  }
  ```
- **Returns (Error 400)**: `{ "valid": false, "error": "Invalid or expired token" }`

---

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License
This project is licensed under the MIT License.
