'use client';

import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import styles from "@/app/styles/appointments.module.css";

const DoctorsList = ({ 
    doctors, 
    loading 
}: { 
    doctors: { address: string; licenseNo: string; name: string; email: string; specialty: string; phone: string }[];
    loading: boolean 
}) => {

    return (
        <div className={styles.doctorsList}>
            <div className={styles.doctorsListContent}>
                <h3 className={styles.doctorsListHeader}>Available Doctors</h3>
                {loading ? (
                    <p>Loading doctors...</p>
                ) : doctors.length === 0 ? (
                    <p>No doctors found.</p>
                ) : (
                    <div className={styles.doctorsListTableWrapper}>
                        <table className={styles.doctorsListTable}>
                            <thead>
                                <tr className={styles.doctorsListTableHeaderRow}>
                                    <th className={styles.doctorsListTableCell}>License No.</th>
                                    <th className={styles.doctorsListTableCell}>Name</th>
                                    <th className={styles.doctorsListTableCell}>Email</th>
                                    <th className={styles.doctorsListTableCell}>Specialization</th>
                                    <th className={styles.doctorsListTableCell}>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doctor, index) => (
                                    <tr key={index} className={styles.doctorsListTableRow}>
                                        <td className={styles.doctorsListTableCell}>{doctor.licenseNo}</td>
                                        <td className={styles.doctorsListTableCell}>{doctor.name}</td>
                                        <td className={styles.doctorsListTableCell}>{doctor.email}</td>
                                        <td className={styles.doctorsListTableCell}>{doctor.specialty}</td>
                                        <td className={styles.doctorsListTableCell}>{doctor.phone}</td>
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

export default DoctorsList;