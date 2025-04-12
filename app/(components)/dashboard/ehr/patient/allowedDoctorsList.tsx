'use client';

import { useState } from "react";
import { ethers } from "ethers";
import styles from '@/app/styles/ehr.module.css';

const AllowedDoctorsList = ({
    contractEmergency,
    contractHealthcare,
    approvedDoctorsList,
    setApprovedDoctors,
    loading
}: {
    contractEmergency: ethers.Contract | null;
    contractHealthcare: ethers.Contract | null;
    approvedDoctorsList: { patientAddress: string; patientName: string; patientNo: string; doctorName: string; specialty: string; doctorAddress: string; }[];
    setApprovedDoctors: React.Dispatch<React.SetStateAction<{ doctorName: string; specialty: string; doctorAddress: string; }[]>>;
    loading: boolean;
}) => {

    const [revoking, setRevoking] = useState<string | null>(null);  // 🔹 To track which doctor is being revoked

    const handleRevokeAccess = async (doctorAddress: string, patientAddress: string) => {
        if (!contractHealthcare) {
            console.error("Smart contract is not initialized");
            return;
        }

        try {
            setRevoking(doctorAddress);  // Show loading state for this row

            const tx = await contractHealthcare.removeAccess(doctorAddress, patientAddress);
            await tx.wait();  // Wait for transaction confirmation

            console.log(`Access revoked for: ${doctorAddress}`);

            // 🔹 Remove the doctor from the list after successful transaction
            setApprovedDoctors((prevDoctors) =>
                prevDoctors.filter((doctor) => doctor.doctorAddress !== doctorAddress)
            );

        } catch (error) {
            console.error("Error revoking access:", error);
        } finally {
            setRevoking(null);  // Reset loading state
        }
    };

    return (
        <div className={styles.accessList}>
            <div className={styles.accessListContent}>
                <h3 className={styles.accessListHeader}>Doctors with access</h3>
                {loading ? (
                    <p>Loading your doctor access list...</p>
                ) : approvedDoctorsList.length === 0 ? (
                    <p>No doctors granted access currently.</p>
                ) : (
                    <div className={styles.accessListTableWrapper}>
                        <table className={styles.accessListTable}>
                            <thead className={styles.accessListTableHeaderRow}>
                                <tr>
                                    <th className={styles.accessListTableCell}>Doctor Name</th>
                                    <th className={styles.accessListTableCell}>Specialization</th>
                                    <th className={styles.accessListTableCell}>Doctor Wallet Address</th>
                                    <th className={styles.accessListTableCell}>Patient Name</th>
                                    <th className={styles.accessListTableCell}>Patient Contact No.</th>
                                    <th className={styles.accessListTableCell}>Patient Wallet Address</th>
                                    <th className={styles.accessListTableCell}>Revoke Access</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedDoctorsList.map((approvedDoctor, index) => (
                                    <tr key={index} className={styles.accessListTableRow}>
                                        <td className={styles.accessListTableCell}>{approvedDoctor.doctorName}</td>
                                        <td className={styles.accessListTableCell}>{approvedDoctor.specialty}</td>
                                        <td className={`${styles.accessListTableCell} ${styles.accessListTableDoctorAddressCell}`}>{approvedDoctor.doctorAddress}</td>
                                        <td className={styles.accessListTableCell}>{approvedDoctor.patientName}</td>
                                        <td className={styles.accessListTableCell}>{approvedDoctor.patientNo}</td>
                                        <td className={styles.accessListTableCell}>{approvedDoctor.patientAddress}</td>
                                        <td className={styles.accessListTableCell}><button className={styles.revokeAccessButton} onClick={() => handleRevokeAccess(approvedDoctor.doctorAddress, approvedDoctor.patientAddress)}
                                                disabled={revoking === approvedDoctor.doctorAddress} >{revoking === approvedDoctor.doctorAddress ? "Revoking..." : "Revoke Access"}</button></td>
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

export default AllowedDoctorsList;