'use client';

import styles from '@/app/styles/ehr.module.css';
import { ethers } from 'ethers';
import { useState } from 'react';
import { DocumentTextIcon, PhotoIcon } from "@heroicons/react/24/outline";

const MedicalRecordsList = ({
    contract
}: {
    contract: ethers.Contract | null;
}) => {

    interface EHRDetails {
        description: string; 
        fileURL: string;
        creationDate: string;
    }

    const [patientAddress, setPatientAddress] = useState('');
    const [loading, setLoading] = useState<"" | "loading" | "loadedsuccess" | "loadedFailure">("");
    const [ehrList, setEhrList] = useState<EHRDetails[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPatientAddress(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading("loading");
            setEhrList([]);
            if(!contract) {
                alert("No valid contract found");
                return;
            }

            // fetch patient's medical records from blockchain
            const recordsList = await contract.getMedicalRecordsForDoctor(patientAddress);
            const formattedRecords = recordsList.map((record: any) => ({
                description: record[0],
                fileURL: record[1],
                creationDate: record[2],
            }));
            console.log(formattedRecords);
            setEhrList(formattedRecords);
            setLoading("loadedsuccess");
        } catch (error) {
            console.error(error);
            setLoading("loadedFailure");
        }
    };

    return (
        <div className={styles.ehrList}>
            <div className={styles.ehrListContent}>
                <h3 className={styles.ehrListHeader}>Search patient's records</h3>
                <form className={styles.searchPatientsRecord} onSubmit={handleSubmit}>
                    <input className={styles.searchPatientsRecordInput} type="string" name="patientAddress" value={patientAddress} placeholder="Enter patient's address" onChange={handleChange} required/>
                    <button className={styles.searchPatientsRecordsButton} type="submit">Submit</button>
                </form>
                { loading === "loadedsuccess" ? (
                    <p>Loaded records successfully.</p> 
                ): loading === "loadedFailure" ? (
                    <p>Couldn't load records. Please check the address again.</p>
                ): loading === "loading" ? (
                    <p>Loading records...</p>
                ): <p></p>
                }
                {
                    ehrList.length ? (
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
                    ) : <div></div>
                }
            </div>
        </div>
    );
};

export default MedicalRecordsList;