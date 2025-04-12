'use client';

import { useState } from "react";
import styles from '@/app/styles/appointments.module.css';

const ListPatientAppointments = ({
    appointmentList,
    loading
} : {
    appointmentList: { doctorAddress: string; patientAddress: string; patientName: string; doctorName: string; specialty: string; date: string; time: string; prescription: string; description: string; diagnosis: string; status: string; creationDate: string; }[];
    loading: boolean
}) => {

    {appointmentList.map((appt, index) => (
        console.log(appt)
    ))}

    return (
        <div className={styles.appointmentsList}>
            <div className={styles.appointmentsListContent}>
                <h3 className={styles.appointmentsListHeader}>My Appointments</h3>
                {loading ? (
                        <p>Loading your appointments...</p>
                    ) : appointmentList.length === 0 ? (
                        <p>No appointments found.</p>
                    ) : (
                        <div className={styles.appointmentsListTableWrapper}>
                            <table className={styles.appointmentsListTable}>
                                <thead>
                                    <tr className={styles.appointmentsListTableHeaderRow}>
                                        <th className={styles.appointmentsListTableCell}>Doctor's Name</th>
                                        <th className={styles.appointmentsListTableCell}>Specialization</th>
                                        <th className={styles.appointmentsListTableCell}>Date</th>
                                        <th className={styles.appointmentsListTableCell}>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointmentList.map((appt, index) => (
                                        <tr key={index} className={styles.appointmentsListTableRow}>
                                            <td className={styles.appointmentsListTableCell}>{appt.doctorName}</td>
                                            <td className={styles.appointmentsListTableCell}>{appt.specialty}</td>
                                            <td className={`${styles.appointmentsListTableCell} ${styles.appointmentsListTableCellDateTime}`}>{appt.date}</td>
                                            <td className={`${styles.appointmentsListTableCell} ${styles.appointmentsListTableCellDateTime}`}>{appt.time}</td>
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

export default ListPatientAppointments;