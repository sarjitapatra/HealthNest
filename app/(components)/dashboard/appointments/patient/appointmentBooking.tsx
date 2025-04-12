'use client';

import { useState } from "react";
import styles from '@/app/styles/appointments.module.css';
import { ethers } from "ethers";

const AppointmentBooking = ({ 
    doctors, 
    loading,
    contract,
    patientAddress
}: { 
    doctors: { address: string; licenseNo: string; name: string; email: string; specialty: string; phone: string }[];
    loading: boolean;
    contract: ethers.Contract | null;
    patientAddress: string;
}) => {

    const [appointment, setAppointment] = useState({ doctor: '', date: '', time: '', address: '', description: ''});
    const [selectedAddress, setSelectedAddress] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement>) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!contract) {
            alert("No valid contract detected");
            return;
        }

        const doctor = doctors.find((doc) => doc.name === appointment.doctor);
        if(doctor) {
            console.log(doctor.address);
            console.log(doctor.name);
            console.log(appointment.date);
            console.log(appointment.time);
            setSelectedAddress(doctor.address);
            try {
                const tx = await contract.createAppointment(selectedAddress, appointment.date, appointment.time, appointment.description);
                await tx.wait();
                alert("Appointment booked successfully!");
            } catch(error) {
                console.error("Transaction failed:", error);
            }
        } else {
            alert("Please select a valid doctor.");
            return;
        }
    };

    return (
        <form className={styles.appointmentBookingForm}>
            <h3 className={styles.appointmentBookingFormHeader}>Book an appointment</h3>
            <div className={styles.appointmentBookingFormContent}>
                <select className={`${styles.appointmentBookingFormDoctorSelector} ${styles.appointmentBookingFormContentComponents}`} name="doctor" value={appointment.doctor} onChange={handleChange} required>
                    <option value="">Select Doctor</option>
                    {
                        doctors.map((doctor, index) => (
                            <option value={doctor.name}>{`Dr. ${doctor.name} - ${doctor.specialty}`}</option>
                        ))
                    }
                </select>
                <input className={`${styles.appointmentBookingFormDate} ${styles.appointmentBookingFormContentComponents}`} type="date" name="date" placeholder="Enter appointment date" value={appointment.date} onChange={handleChange} required></input> 
                <input className={`${styles.appointmentBookingFormTime} ${styles.appointmentBookingFormContentComponents}`} type="time" name="time" placeholder="Enter appointment time" value={appointment.time} onChange={handleChange} required></input> 
                <textarea className={`${styles.appointmentBookingFormDescription} ${styles.appointmentBookingFormContentComponents}`} name="description" placeholder="Illness Description" value={appointment.description} onChange={handleChange}></textarea>
            </div>
            <button className={`${styles.appointmentBookingFormContentButton} ${styles.appointmentBookingFormContentComponents}`} type="submit" onClick={handleSubmit}>Book Now</button>
        </form>
    );
};

export default AppointmentBooking;