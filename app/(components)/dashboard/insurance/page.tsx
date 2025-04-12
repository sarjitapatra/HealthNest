'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ClaimInsuranceForm from "./claimInsuranceForm";
import ClaimsList from "./claimsList";
import { contractAddress, contractABI } from "@/constants/contract";

import styles from '@/app/styles/insurance.module.css';

const Page = () => {

    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [claims, setClaims] = useState<ClaimDetails[]>([]);
    const [loading, setLoading] = useState(true);

    interface ClaimDetails {
        provider: string;
        description: string;
        amount: number;
        time: number;
    }

    useEffect(() => {
        const fetchClaimsList = async () => {
            if (typeof window.ethereum === "undefined") {
                console.error("MetaMask not detected");
                return;
            }

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress["insurance"], contractABI["insurance"], signer);
                setContract(contract);

                const claimsList = await contract.getInsuranceClaim();
                const claimsArray = Array.from(claimsList);
                const formattedClaims = claimsArray.map((record: any) => ({
                    provider: String(record[0]),
                    description: String(record[1]),
                    amount: Number(record[2]),
                    time: Number(record[3]),
                }));
                console.log(formattedClaims);
                setClaims(formattedClaims);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setLoading(false);
            }
        };

        fetchClaimsList();
    }, []);

    return (
        <div className={styles.insuranceContainer}>
            <h1 className={styles.insuranceHeader}>Manage Insurance Claims</h1>
            <div className={styles.insuranceComponents}>
                <ClaimInsuranceForm contract={contract}/>
                <ClaimsList claims={claims} loading={loading}/>
            </div>
        </div>
    );
};

export default Page;