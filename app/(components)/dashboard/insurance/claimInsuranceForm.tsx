'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import styles from '@/app/styles/insurance.module.css';

const ClaimInsuranceForm = ({
    contract
}: {
    contract: ethers.Contract | null;
}) => {
    const [claim, setClaim] = useState({ provider: '', amount: '', description: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setClaim({ ...claim, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if(!contract) {
            alert("No valid contract detected");
            return;
        }
        try {
            const tx = await contract.submitInsuranceClaim(claim.provider, claim.description, claim.amount);
            await tx.wait();
            alert("Claim submitted successfully!");
        } catch(error) {
            console.error("Could not submit transaction:", error);
        }
    }

    return (
        <form className={styles.claimForm}>
            <h3 className={styles.claimFormHeader}>Submit Insurance Claim</h3>
            <div className={styles.claimFormElements}>
                <input className={`${styles.claimFormInsuranceProvider} ${styles.claimFormInput}`} type="text" name="provider" placeholder="Insurance Provider" value={claim.provider} onChange={handleChange} required></input>
                <input className={`${styles.claimFormInsuranceAmount} ${styles.claimFormInput}`} type="number" name="amount" placeholder="Claim amount" value={claim.amount} onChange={handleChange} required></input>
                <textarea className={`${styles.claimFormInsuranceDescription} ${styles.claimFormInput}`} name="description" placeholder="Claim Description" value={claim.description} onChange={handleChange} required></textarea>
            </div>
            <button className={styles.claimFormInsuranceButton} type="submit" onClick={handleSubmit}>Submit Claim</button>
        </form>
    );
};

export default ClaimInsuranceForm;