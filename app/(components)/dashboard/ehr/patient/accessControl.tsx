'use client';

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import styles from "@/app/styles/ehr.module.css";

const AccessControl = ({ 
    doctors,
    contract
}: { 
    doctors: { address: string; licenseNo: string; name: string; email: string; specialty: string; phone: string }[];
    contract: ethers.Contract | null;
}) => {

    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [access, setAccess] = useState({ doctor: '', address: ''});
    const [accessGranting, setAccessGranting] = useState<"" | "granting" | "grantSuccess" | "grantFailure">("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement>) => {
        setAccess({ ...access, [e.target.name]: e.target.value});
    };

    const handleGrantAccess = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!contract) {
            alert("No valid contract detected");
            return;
        }

        setAccessGranting("granting");
        const doctor = doctors.find((doc) => doc.name === access.doctor);
        if(doctor) {
            console.log(doctor.address);
            console.log(doctor.name);
            setSelectedAddress(doctor.address);
            try {
                const tx = await contract.grantAccess(doctor.address);
                await tx.wait();
                setAccessGranting("grantSuccess");
            } catch(error) {
                setAccessGranting("grantFailure");
                console.error("Transaction failed:", error);
            }
        } else {
            alert("Please select a valid doctor.");
            return;
        }
    };

    return (
        <div className={styles.accessControlWrapper}>
            <form className={styles.accessControl}>
                <h3 className={styles.accessControlHeader}>Manage Access</h3>
                <div className={styles.accessControlElements}>
                <select className={`${styles.accessControlDoctorSelector} ${styles.appointmentBookingFormContentComponents}`} name="doctor" value={access.doctor} onChange={handleChange} required>
                        <option value="">Select Doctor</option>
                        {
                            doctors.map((doctor, index) => (
                                <option value={doctor.name}>{`Dr. ${doctor.name} - ${doctor.specialty}`}</option>
                            ))
                        }
                    </select>
                    <button className={styles.grantAccessButton} onClick={handleGrantAccess}>Grant Access</button>
                </div>
            </form>
            { accessGranting === "grantSuccess" ? (
                <p>Access granted.</p> 
            ) : accessGranting === "granting" ? (
                <p>Granting access...</p>
            ) : accessGranting === "grantFailure" ? (
                <p>Could not grant access.</p>
            ) : <p></p>
            }
        </div>
    );
};

export default AccessControl;