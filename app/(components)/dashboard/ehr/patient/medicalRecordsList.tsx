'use client';

import { useState } from "react";
import { ethers } from "ethers";
import { DocumentTextIcon, PhotoIcon } from "@heroicons/react/24/outline";
import styles from '@/app/styles/ehr.module.css';

const MedicalRecordsList = ({
    ehrList,
    loading
}: {
    ehrList: { description: string; fileURL: string; creationDate: string; }[];
    loading: boolean;
}) => {

    {ehrList.map((ehr, index) => (
        console.log(ehr.fileURL)
    ))}

    return (
        <div className={styles.ehrList}>
            <div className={styles.ehrListContent}>
                <h3 className={styles.ehrListHeader}>My Medical Records</h3>
                {loading ? (
                        <p>Loading your medical records...</p>
                    ) : ehrList.length === 0 ? (
                        <p>No medical records found.</p>
                    ) : (
                        <div className={styles.ehrListTableWrapper}>
                            <table className={styles.ehrListTable}>
                                <thead>
                                    <tr className={styles.ehrListTableHeaderRow}>
                                        <th className={styles.ehrListTableCell}>Record Description</th>
                                        <th className={styles.ehrListTableCell}>Medical Record File</th>
                                        <th className={styles.ehrListTableCell}>Time of Upload</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ehrList.map((ehr, index) => (
                                        <tr key={index} className={styles.ehrListTableRow}>
                                            <td className={styles.ehrListTableCell}>{ehr.description}</td>
                                            <td className={`${styles.ehrListTableCell} ${styles.ehrListTableEhrCell}`}>
                                                <a href={ehr.fileURL} target="_blank" rel="noopener noreferrer"><DocumentTextIcon className="w-6"></DocumentTextIcon></a>
                                            </td>
                                            <td className={`${styles.ehrListTableCell} ${styles.ehrListTableTimeCell}`}>{new Date(Number(ehr.creationDate) * 1000).toLocaleString()}</td>
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

export default MedicalRecordsList;