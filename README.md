# FreelanceProof (Hackathon Submission)

> **"Your GitHub is Your Passport."** A full-stack verification platform empowering African freelancers to prove their professional legitimacy to fintechs, securely bypassing Enhanced Due Diligence (EDD) freezes.

**Live Demo:** [https://freelance-proof.vercel.app](https://freelance-proof.vercel.app)
**Live API:** [https://freelance-proof.onrender.com](https://freelance-proof.onrender.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)

---

## The Problem

The core issue African freelancers face isn't basic identity verification (KYC)—fintechs already use passports, BVNs, and biometrics for that perfectly. **The real problem is proving the Source of Funds and Income Legitimacy.** 

Because freelancers have highly irregular income patterns and operate from geographically red-flagged regions, legacy banking risk models view their inbound international payments as highly suspicious. This triggers aggressive **Enhanced Due Diligence (EDD)**. 

When fintechs see these unusual transaction volumes, they freeze accounts and demand formal payslips, corporate employment letters, or wealthy bank statements—documents independent freelancers physically cannot produce. 

## The Solution

**FreelanceProof** acts as a cryptographically secure, verifiable signal of professional legitimacy. 

By analyzing a developer's GitHub history through OAuth, our engine calculates a deep **"Legitimacy Score"** based on real-world proof of work (account age, commit frequency, repository quality, technical diversity). We then issue a cryptographically signed Verification Token (JWT using RS256). 

When a freelancer receives a payment, they simply hand their Token to the fintech. The fintech instantly queries our API, verifies the cryptography, and sees mathematical proof that the user is a demonstrably active, skilled professional earning a legitimate income—preventing unwarranted account freezes entirely.

---

## Hackathon Judges Guide: How to Test

We have built a fully functional end-to-end flow. Here is how you can test the platform from both the perspective of a Freelancer and a Fintech Business:

**1. The Freelancer Experience (Generating Proof)**
- Go to the Live Demo at: [https://freelance-proof.vercel.app](https://freelance-proof.vercel.app)
- Click **"Connect GitHub"**. 
- You will be securely OAuth'd through GitHub and redirected to your generated Dashboard.
- Watch as the backend live-calculates your Legitimacy Score out of 100 based on your public repositories.
- **Copy your generated FreelanceProof Token** from the dashboard (there is a convenient copy button next to the long cryptographic string).

**2. The Fintech Experience (Verifying the Token)**
- After copying your token from Step 1, open a new tab and go to the **"Fintech Portal"** (via the top navigation bar).
- *Optional:* You can register a mock business using the "Business Registration" link to get an API Key, but for Sandbox testing, you can use the built-in Sandbox mode.
- **Paste the Freelancer's Token** you copied in Step 1 into the "Enter Freelancer Token" input box on the Verifier page.
- Click **"Verify Authenticity"**.
- The backend will cryptographically decode the RSA signature and instantly generate a beautiful **Credibility Report** on your screen, proving the freelancer's technical background, score breakdown, and legitimacy!

---

## Technical Architecture

Our platform is engineered for security and scalability:

- **Frontend (`/frontend`)**: A fast Single Page Application built with **React, Vite, and TailwindCSS**. We implemented a premium "glassmorphism" aesthetic with custom Recharts data visualization. Routing is handled entirely client-side, protected by a custom `vercel.json` configuration.
- **Backend API (`/backend`)**: A robust **Node.js/Express** REST API connected to **MongoDB** (Atlas).
- **Security & Cryptography**: We built a custom `crypto.service.js` which generates raw RSA Private/Public Keypairs. The "Freelancer Token" is a JWT signed using the `RS256` asymmetric algorithm. The backend verifies the token using the Public Key, ensuring it cannot be forged by malicious actors.
- **GitHub Integration**: Direct OAuth 2.0 integration with the GitHub API to securely aggregate developer statistics without storing plain-text access tokens.

---

## Running the Code Locally

If you prefer to run the codebase on your local machine:

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/freelanceproof
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
FRONTEND_URL=http://localhost:5173
```
Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the Vite server:
```bash
npm run dev
```

---
*Built with passion to empower African talent.*
