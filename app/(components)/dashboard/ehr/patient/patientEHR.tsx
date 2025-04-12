'use client';

import { useState, useEffect } from "react";
import { ethers } from "ethers";

import MedicalRecordsList from "./medicalRecordsList";
import UploadRecordForm from "./uploadRecordForm";
import AccessControl from "./accessControl";
import EmergencyAccessControl from "./emergencyAccessControl";
import AllowedDoctorsList from "./allowedDoctorsList";
import styles from '@/app/styles/ehr.module.css';
import { contractAddress, contractABI } from "@/constants/contract";
import DoctorNavbar from "../../doctorNavbar";

const PatientEHR = () => {

    interface EHRDetails {
        description: string; 
        fileURL: string;
        creationDate: string;
    }

    interface approvedDoctorDetails {
        patientAddress: string;
        patientName: string;
        patientNo: string;
        doctorName: string;
        specialty: string;
        doctorAddress: string;
    };

    const [userAddress, setUserAddress] = useState<string>("");
    const [contractHealthcare, setContractHealthcare] = useState<ethers.Contract | null>(null);
    const [contractMedicalRecords, setContractMedicalRecords] = useState<ethers.Contract | null>(null);
    const [contractEmergency, setContractEmergency] = useState<ethers.Contract | null>(null);
    const [loading, setLoading] = useState(true);
    const [ehrList, setEhrList] = useState<EHRDetails[]>([]);
    const [approvedDoctors, setApprovedDoctors] = useState<approvedDoctorDetails[]>([]);
    // const [approvedDoctorsEmergency, setApprovedDoctorsEmergency] = useState<approvedDoctorDetails[]>([]);
    const [approvedDoctorsList, setApprovedDoctorsList] = useState<{ doctorName: string; specialty: string; doctorAddress: string; }[]>([]);

    const [doctors, setDoctors] = useState<{ address: string; licenseNo: string; name: string; email: string; specialty: string; phone: string }[]>([]);

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            if (typeof window.ethereum === "undefined") {
                console.error("MetaMask not detected");
                return;
            }

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setUserAddress(await signer.getAddress());
                const contract = new ethers.Contract(contractAddress["medicalRecords"], contractABI["medicalRecords"], signer);
                setContractMedicalRecords(contract);    
                
                if(!contract) {
                    alert("No valid contract found");
                    return;
                }

                // fetch patient's medical records from blockchain
                const recordsList = await contract.getMedicalRecords();
                const formattedRecords = recordsList.map((record: any) => ({
                    description: record[0],
                    fileURL: record[1],
                    creationDate: record[2],
                }));
                setEhrList(formattedRecords);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        const fetchDoctors = async () => {

            if (typeof window.ethereum === "undefined") {
                console.error("MetaMask not detected");
                return;
            }

            try {

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setUserAddress(await signer.getAddress());
                const contract = new ethers.Contract(contractAddress["healthcare"], contractABI["healthcare"], signer);
                setContractHealthcare(contract);    
                
                if(!contract) {
                    alert("No valid contract found");
                    return;
                }
                const [addresses, licenses, names, emails, specialties, phones] = await contract.getDoctors();

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

        const fetchApprovedDoctors = async () => {
            if (typeof window.ethereum === "undefined") {
                console.error("MetaMask not detected");
                return;
            }

            try {

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setUserAddress(await signer.getAddress());
                const contract = new ethers.Contract(contractAddress["emergency"], contractABI["emergency"], signer);
                setContractEmergency(contract);    
                
                if(!contract) {
                    alert("No valid contract found");
                    return;
                }
                const approvedDoctorsList = await contract.getDoctorsAndPatientsGranted();
                // 🔹 Format the raw response into readable JavaScript objects
                const formattedApprovedDoctorsList = approvedDoctorsList.map((doctor: any) => ({
                    patientAddress: doctor[0],
                    patientName: doctor[1],
                    patientNo: doctor[2],
                    doctorName: doctor[3],      // Name is at index 0
                    specialty: doctor[4],       // Specialty is at index 1
                    doctorAddress: doctor[5]    // Address is at index 2
                }));
                console.log("Approved emergency doctors list:", formattedApprovedDoctorsList);

                setApprovedDoctors(formattedApprovedDoctorsList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching approved doctors:", error);
                setLoading(false);
            }
        };

        fetchMedicalRecords();
        fetchDoctors();
        fetchApprovedDoctors();
    }, []);
    return (
        <div className={styles.ehrContainer}>
            <h1 className={styles.ehrHeader}>Manage Health Records</h1>
            <div className={styles.ehrComponents}>
                <UploadRecordForm contract={contractMedicalRecords}/>
                <MedicalRecordsList ehrList={ehrList} loading={loading}/>
                <AccessControl doctors={doctors} contract={contractHealthcare}/>
                <EmergencyAccessControl/>
                <AllowedDoctorsList contractEmergency={contractEmergency} contractHealthcare={contractHealthcare} approvedDoctorsList={approvedDoctors} setApprovedDoctors={setApprovedDoctorsList} loading={loading}/>
            </div>
        </div>
    );
};

export default PatientEHR;