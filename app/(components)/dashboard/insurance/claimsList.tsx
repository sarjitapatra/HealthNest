'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from '@/app/styles/insurance.module.css';

const ClaimsList = ({
    claims,
    loading
}: {
    claims: { provider: string; description: string; amount: number; time: number; }[];
    loading: boolean;
}) => {

    return (
        <div className={styles.claimsList}>
            <div className={styles.claimsListContent}>
                <h3 className={styles.claimsListHeader}>My Insurance Claims</h3>
                {loading ? (
                            <p>Loading your insurance claims...</p>
                        ) : claims.length === 0 ? (
                            <p>No insurance claims found.</p>
                        ) : (
                            <div className={styles.claimsListTableWrapper}>
                                <table className={styles.claimsListTable}>
                                    <thead>
                                        <tr className={styles.claimsListTableHeaderRow}>
                                            <th className={styles.claimsListTableCell}>Insurance Provider</th>
                                            <th className={styles.claimsListTableCell}>Claim Description</th>
                                            <th className={styles.claimsListTableCell}>Claim Amounts</th>
                                            <th className={styles.claimsListTableCell}>Time of Upload</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claims.map((claim, index) => (
                                            <tr key={index} className={styles.claimsListTableRow}>
                                                <td className={styles.claimsListTableCell}>{claim.provider}</td>
                                                <td className={styles.claimsListTableCell}>{claim.description}</td>
                                                <td className={`${styles.claimsListTableCell} ${styles.claimsListTableAmountCell}`}>{claim.amount}</td>
                                                <td className={`${styles.claimsListTableCell} ${styles.claimsListTableTimeCell}`}>{new Date(claim.time * 1000).toLocaleString()}</td>
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

export default ClaimsList;