'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from '@/app/styles/ehr.module.css';
import { contractAddress, contractABI } from '@/constants/contract';

const EmergencyAccessRequest = () => {

    interface emergencyAccessList {
        patientAddress: string;
        patientName: string;
        patientContactNo: string;
    };

    const [emergencyContactAddress, setEmergencyContactAddress] = useState('');
    const [contractHealthcare, setContractHealthcare] = useState<ethers.Contract | null>(null);
    const [loading, setLoading] = useState<"" | "loading" | "loadedsuccess" | "loadedFailure">("");
    const [pendingRequestList, setPendingRequestList] = useState<emergencyAccessList[]>([]);
    const [confirmedRequestList, setConfirmedRequestList] = useState<emergencyAccessList[]>([]);

    useEffect(() => {

        const emergencyAccessRequestList = async () => {
            if (typeof window.ethereum === "undefined") {
                console.error("MetaMask not detected");
                return;
            }

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress["healthcare"], contractABI["healthcare"], signer);  
                setContractHealthcare(contract);
                // console.log(contractHealthcare);

                setConfirmedRequestList([]);
                setPendingRequestList([]);
                setLoading("loading");
                
                if(!contract) {
                    alert("No valid contract found");
                    return;
                }
                const confirmedRequestList = await contract.getDoctorAccessRequestsGranted();
                const pendingRequestList = await contract.getDoctorAccessRequestsPending();

                const formattedConfirmedRequestList = confirmedRequestList.map((request: any) => ({
                    patientAddress: request[0],
                    patientName: request[1],
                    patientContactNo: request[2],
                }));
                const formattedPendingRequestList = pendingRequestList.map((request: any) => ({
                    patientAddress: request[0],
                    patientName: request[1],
                    patientContactNo: request[2],
                }));
                // console.log(pendingRequestList);

                setConfirmedRequestList(formattedConfirmedRequestList);
                setPendingRequestList(formattedPendingRequestList);

                setLoading("loadedsuccess");
            } catch (error) {
                console.error(error);
                setLoading("loadedFailure");
            }
        };

        emergencyAccessRequestList();
        
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmergencyContactAddress(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!contractHealthcare) {
            alert("No valid contract found");
            return;
        }

        try {
            const tx = await contractHealthcare.requestEmergencyAccess(emergencyContactAddress);
            await tx.wait();
            alert("Access requested successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.emergencyList}>
            <div className={styles.emergencyListContent}>
                <h3 className={styles.emergencyListHeader}>Request Patient Details to Emergency Contact</h3>
                <form className={styles.searchPatientsRecord} onSubmit={handleSubmit}>
                    <input className={styles.searchPatientsRecordInput} type="string" name="patientAddress" value={emergencyContactAddress} placeholder="Enter patient's address" onChange={handleChange} required/>
                    <button className={styles.searchPatientsRecordsButton} type="submit">Submit</button>
                </form>
                {
                    loading === "loading" ? (
                        <p>Loading confirmed emergency access list...</p>
                    ): confirmedRequestList.length === 0 ? (
                        <p>No patient in confirmed emergency access list.</p>
                    ): (
                        <div className={styles.emergencyListTableWrapper}>
                            <p className={styles.emergencyListStatusHeader}>Confirmed Emergency Access List:</p>
                            <table className={styles.emergencyListTable}>
                            <thead>
                                <tr className={styles.emergencyListTableHeaderRow}>
                                    <th className={styles.emergencyListTableCell}>Patient Address</th>
                                    <th className={styles.emergencyListTableCell}>Patient Name</th>
                                    <th className={styles.emergencyListTableCell}>Contact No.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {confirmedRequestList.map((confirmedRequest, index) => (
                                    <tr key={index} className={styles.emergencyListTableRow}>
                                        <td className={`${styles.emergencyListTableCell} ${styles.emergencyListTableAddressCell}`}>{confirmedRequest.patientAddress}</td>
                                        <td className={styles.emergencyListTableCell}>{confirmedRequest.patientName}</td>
                                        <td className={`${styles.emergencyListTableCell} ${styles.emergencyListTableContactNoCell}`}>{confirmedRequest.patientContactNo}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    )
                }
                {
                    loading === "loading" ? (
                        <p>Loading pending emergency access list...</p>
                    ): pendingRequestList.length === 0 ? (
                        <p>No patient in pending emergency access list.</p>
                    ): (
                        <div className={styles.emergencyListTableWrapper}>
                            <p className={styles.emergencyListStatusHeader}>Pending Emergency Access List:</p>
                            <table className={styles.emergencyListTable}>
                            <thead>
                                <tr className={styles.emergencyListTableHeaderRow}>
                                    <th className={styles.emergencyListTableCell}>Patient Address</th>
                                    <th className={styles.emergencyListTableCell}>Patient Name</th>
                                    <th className={styles.emergencyListTableCell}>Contact No.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingRequestList.map((pendingRequest, index) => (
                                    <tr key={index} className={styles.emergencyListTableRow}>
                                        <td className={`${styles.emergencyListTableCell} ${styles.emergencyListTableAddressCell}`}>{pendingRequest.patientAddress}</td>
                                        <td className={styles.emergencyListTableCell}>{pendingRequest.patientName}</td>
                                        <td className={`${styles.emergencyListTableCell} ${styles.emergencyListTableContactNoCell}`}>{pendingRequest.patientContactNo}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </div>
    )
};

export default EmergencyAccessRequest;