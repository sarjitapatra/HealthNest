'use client';

import MedicalRecordsList from "./medicalRecordsList";
import EmergencyAccessRequest from "./emergencyAccessRequest";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '@/constants/contract';
import styles from '@/app/styles/ehr.module.css';

const DoctorEHR = () => {
    interface EHRDetails {
        description: string; 
        fileURL: string;
        creationDate: string;
    }

    const [userAddress, setUserAddress] = useState<string>("");
    const [contractMedicalrecords, setContractMedicalrecords] = useState<ethers.Contract | null>(null);
    const [contractHealthcare, setContractHealthcare] = useState<ethers.Contract | null>(null);
    const [loading, setLoading] = useState(true);
    const [ehrList, setEhrList] = useState<EHRDetails[]>([]);

    const [doctors, setDoctors] = useState<{ address: string; licenseNo: string; name: string; email: string; specialty: string; phone: string }[]>([]);

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            if (typeof window.ethereum === "undefined") {
                console.error("MetaMask not detected");
                return;
            }

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setUserAddress(await signer.getAddress());
                const contract = new ethers.Contract(contractAddress["medicalRecords"], contractABI["medicalRecords"], signer);
                setContractMedicalrecords(contract);    
                
                setEhrList([]);
                if(!contract) {
                    alert("No valid contract found");
                    return;
                }

                // fetch patient's medical records from blockchain
                const recordsList = await contract.getMedicalRecords();
                const formattedRecords = recordsList.map((record: any) => ({
                    description: record[0],
                    fileURL: record[1],
                    creationDate: record[2],
                }));
                setEhrList(formattedRecords);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchMedicalRecords();
    }, []);
    return (
        <div className={styles.ehrContainer}>
            <h1 className={styles.ehrHeader}>View Patients' Health Records</h1>
            <div className={styles.ehrComponents}>
                <MedicalRecordsList contract={contractMedicalrecords}/>
                <EmergencyAccessRequest/>
            </div>
        </div>
    )
};

export default DoctorEHR;