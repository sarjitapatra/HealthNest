'use client';

import { useState, useEffect } from "react";
import { ethers } from 'ethers';

import AppointmentBooking from "./appointmentBooking";
import DoctorsList from "./doctorsList";
import ListPatientAppointments from "./listPatientsAppointments";

import { contractAddress, contractABI } from "@/constants/contract";

import styles from '@/app/styles/appointments.module.css';

const PatientAppointments = () => {

    const [doctors, setDoctors] = useState<{ address: string; licenseNo: string; name: string; email: string; specialty: string; phone: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [userAddress, setUserAddress] = useState<string>("");
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [appointment, setAppointment] = useState<AppointmentDetails[]>([]);

    interface AppointmentDetails {
        doctorAddress: string; 
        patientAddress: string; 
        patientName: string; 
        doctorName: string; 
        specialty: string; 
        date: string; 
        time: string; 
        prescription: string; 
        description: string; 
        diagnosis: string; 
        status: string; 
        creationDate: string;
    }

    useEffect(() => {
        const fetchDoctors = async () => {
            if (typeof window.ethereum === "undefined") {
                console.error("MetaMask not detected");
                return;
            }

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setUserAddress(await signer.getAddress());
                const contractAppointment = new ethers.Contract(contractAddress["appointments"], contractABI["appointments"], signer);
                setContract(contractAppointment);

                // retrieve patient's appointments
                const appointmentDetails = await contractAppointment.getAppointments();
                // // await rawAppointments.wait();
                // const appointmentDetails: AppointmentDetails[] = [...rawAppointments];
                console.log("Appointment details:", appointmentDetails);
                const formattedAppointmentDetails = appointmentDetails.map((doctor: any) => ({
                    doctorAddress: doctor[0],
                    patientAddress: doctor[1],
                    patientName: doctor[2],
                    doctorName: doctor[3], 
                    specialty: doctor[4], 
                    date: doctor[5],
                    time: doctor[6],
                    prescription: doctor[7],
                    description: doctor[8],
                    diagnosis: doctor[9],
                    status: doctor[10],
                    creationDate: doctor[11]
                }));
                setAppointment(formattedAppointmentDetails);

                const contractHealthcare = new ethers.Contract(contractAddress["healthcare"], contractABI["healthcare"], signer);
                const [addresses, licenses, names, emails, specialties, phones] = await contractHealthcare.getDoctors();

                // Combine the arrays into a list of objects
                const doctorList = names.map((name: string, index: number) => ({
                    address: addresses[index],
                    licenseNo: licenses[index],
                    name,
                    email: emails[index],
                    specialty: specialties[index],
                    phone: phones[index]
                }));

                setDoctors(doctorList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className={styles.appointmentsContainer}>
            <h1 className={styles.appointmentHeader}>Manage Health Records</h1>
            <div className={styles.appointmentComponents}>
                <ListPatientAppointments appointmentList={appointment} loading={loading}/>
                <DoctorsList doctors={doctors} loading={loading}/>
                <AppointmentBooking doctors={doctors} loading={loading} contract={contract} patientAddress={userAddress}/>
            </div>
        </div>
    );
};

export default PatientAppointments;