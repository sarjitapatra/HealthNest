'use client';

import ListDoctorAppointments from "./listDoctorsAppointments";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "@/constants/contract";

const DoctorAppointments = () => {

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

    const [loading, setLoading] = useState(true);
    const [userAddress, setUserAddress] = useState<string>("");
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    useEffect(() => {
        const doctorAppointments = async () => {
            if (typeof window.ethereum === "undefined") {
                console.error("MetaMask not detected");
                return;
            }

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setUserAddress(await signer.getAddress());
                const contract = new ethers.Contract(contractAddress["appointments"], contractABI["appointments"], signer);
                setContract(contract);

                const appointmentDetails = await contract.getAppointmentsForDoctor();
                console.log(appointmentDetails);
                setAppointment(appointmentDetails);
                setLoading(false);
            } catch (error) {
                console.error("Could not load appointments");
                setLoading(false);
            }
        };
        doctorAppointments();
    }, []);
    return (
        <div>
            <ListDoctorAppointments appointmentList={appointment} loading={loading}/>
        </div>
    )
};

export default DoctorAppointments;