'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from '@/app/styles/ehr.module.css';
import { contractAddress, contractABI } from '@/constants/contract';

const EmergencyAccessControl = () => {

    interface doctorsRequested {
        patientAddress: string;
        patientName: string;
        patientNo: string;
        doctorName: string;
        specialty: string;
        doctorAddress: string;
    };

    const [contractHealthcare, setContractHealthcare] = useState<ethers.Contract | null>(null);
    const [requestedAccessList, setRequestedAccessList] = useState<doctorsRequested[]>([]);
    const [loading, setLoading] = useState<"" | "loading" | "loadedsuccess" | "loadedFailure">("");

    useEffect(() => {

        const emergencyAccessRequestList = async () => {
            if (typeof window.ethereum === "undefined") {
                console.error("MetaMask not detected");
                return;
            }

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress["emergency"], contractABI["emergency"], signer);  
                setContractHealthcare(contract);
                // console.log(contractHealthcare);

                setLoading("loading");
                setRequestedAccessList([]);                
                
                if(!contract) {
                    alert("No valid contract found");
                    return;
                }
                const requestedList = await contract.getDoctorsAndPatients();
                console.log("Raw list:", requestedList);

                const formattedRequestList = requestedList.map((request: any) => ({
                    patientAddress: request[0],
                    patientName: request[1],
                    patientNo: request[2],
                    doctorName: request[3],
                    specialty: request[4],
                    doctorAddress: request[5],
                }));

                console.log("Requested access list:", formattedRequestList);

                setRequestedAccessList(formattedRequestList);
                setLoading("loadedsuccess");
            } catch (error) {
                console.error(error);
                setLoading("loadedFailure");
            }
        };

        emergencyAccessRequestList();
        
    }, []);
    
    const handleSubmit = async (patientAddress: string, doctorAddress: string) => {
        console.log("Granting access to:", { patientAddress, doctorAddress });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress["healthcare"], contractABI["healthcare"], signer);  
        setContractHealthcare(contract);

        if(!contract) {
            alert("No valid contract found");
            return;
        }

        try {

            const tx = await contract.approveEmergencyAccess(doctorAddress, patientAddress);
            await tx.wait();
            alert("Access granted successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.accessList}>
            <div className={styles.accessListContent}>
                <h3 className={styles.accessListHeader}>Doctors requesting emergency access</h3>
                {loading === "loading" ? (
                    <p>Loading your doctor access list...</p>
                ) : requestedAccessList.length === 0 ? (
                    <p>No doctors requesting emergency access currently.</p>
                ) : (
                    <div className={styles.accessListTableWrapper}>
                        <table className={styles.accessListTable}>
                            <thead className={styles.accessListTableHeaderRow}>
                                <tr>
                                    <th className={styles.accessListTableCell}>Patient Name</th>
                                    <th className={styles.accessListTableCell}>Patient Contact No.</th>
                                    <th className={styles.accessListTableCell}>Patient Address</th>
                                    <th className={styles.accessListTableCell}>Doctor Name</th>
                                    <th className={styles.accessListTableCell}>Specialization</th>
                                    <th className={styles.accessListTableCell}>Doctor Address</th>
                                    <th className={styles.accessListTableCell}>Access Control</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestedAccessList.map((request, index) => (
                                    <tr key={index} className={styles.accessListTableRow}>
                                        <td className={styles.accessListTableCell}>{request.patientName}</td>
                                        <td className={styles.accessListTableCell}>{request.patientNo}</td>
                                        <td className={styles.accessListTableCell}>{request.patientAddress}</td>
                                        <td className={styles.accessListTableCell}>{request.doctorName}</td>
                                        <td className={styles.accessListTableCell}>{request.specialty}</td>
                                        <td className={`${styles.accessListTableCell} ${styles.accessListTableDoctorAddressCell}`}>{request.doctorAddress}</td>
                                        <td className={styles.accessListTableCell}><button className={styles.revokeAccessButton} onClick={() => handleSubmit(request.patientAddress, request.doctorAddress)}>Grant Access</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )   
                }
            </div>
        </div>
    );
};

export default EmergencyAccessControl;