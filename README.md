# HealthNest
- A secure, transparent, and blockchain-based platform to manage patient medical records, appointments, insurance claims, and emergency access — all while maintaining strict access control. 
- Built with Solidity and integrated into a full-stack DApp.
- This decentralized application (DApp) empowers patients to manage their medical data and securely share it with doctors, insurance providers, and emergency contacts via blockchain smart contracts. It eliminates data silos, ensures integrity, and gives control back to users.

Live Demo
Coming Soon

## Features
### User Registration
* #### Patient
  > A patient registers to the website using their personal info. These details are stored in the Ethereum blockchain by mapping with the patient's unique Metamask wallet address. These details are displayed on the user profile.
* #### Doctor
  > A doctor registers to the website using their personal info. These details are stored in the Ethereum blockchain by mapping with the doctor's unique Metamask wallet address. These details are displayed on the user profile.

### Appointments
* Enables patient to create an appointment with a registered doctor.
* Registered doctors list visible on the patient's profile.
* Appointment details : Date, time, description, prescription, diagnosis.
* Doctors and patients can view appointment history

### Medical Records
* Enables patient to upload record (IPFS hash, description)
* Medical data will be encrypted and stored in IPFS.
* A hash of the encrypted record will be stored on the blockchain.

### Insurance Claim
* Patients can file a claim by providing provider name, reason, claim amount.
* Retrieve previous claim history

### Access Control
* Direct Access
  * Patients will be able to assign permissions to doctors to be able to view their medical record history.
  * Once approved, the encrypted data is retrieved and shown on the doctor's profile.
  * Patient profiles and medical records are protected and accessible only when granted.
  * Patient can also revoke access if they wish to.
* Emergency Access
  * Patient assigns an emergency contact on registration.
  * Doctor requests access in emergencies to the patient's records.
  * Emergency contact (assigned by patient) can view all pending/granted requests related to them on their profile and can approve access request to the doctor.
  * The status of the access request is changed to Granted and the doctor can view the patient's medical record on their profile.
  * The emergency contact or the patient can revoke access.

## Tech Stack

| Component | Technology |
| :---------| :----------|
| Frontend  | React.js, Next.js, CSS |
| Backend   | TypeScript |
| Blockchain  | Etheruem |
| Smart Contracts | Solidity |
| Database  | IPFS (Pinata) |
| Wallet Authentication  | MetaMask |


All contracts reside in the same .sol file and are deployed as separate contract instances.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, clone the repository in your local directory using ` git clone ` 


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

