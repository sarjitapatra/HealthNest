"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractAddress, contractABI } from "@/constants/contract";
import styles from '@/app/styles/profile.module.css';

const PatientUserProfile = () => {
    const [user, setUser] = useState<{ name: string; email: string; phone: string; gender: string; dob: string; height: string; weight: string; emergencyName: string; emergencyNumber: string; emergencyAddress: string; } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (typeof window.ethereum === "undefined") {
                setError("MetaMask not detected");
                return;
            }

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const userAddress = await signer.getAddress(); // Get the currently connected wallet address

                const contract = new ethers.Contract(contractAddress["healthcare"], contractABI["healthcare"], signer);
                // const result = await contract.getPatientDetails(userAddress);
                // console.log("Fetched Patient Data:", result);

                const [name, email, phone, gender, dob, height, weight, emergencyName, emergencyNumber, emergencyAddress, _] = await contract.getPatientDetails(userAddress);

                setUser({ name, email, phone, gender, dob, height, weight, emergencyName, emergencyNumber, emergencyAddress });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setError("Failed to fetch user details");
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className={styles.profileContainerWrapper}>
            <div className={styles.profileContainer}>
                <h2 className={styles.profileHeader}>User Profile</h2>
                {loading ? (
                    <p>Loading user details...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : user ? (
                    <div className={styles.profileInfo}>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                        <p><strong>DOB:</strong> {user.dob}</p>
                        <p><strong>Height (in cm):</strong> {user.height}</p>
                        <p><strong>Weight (in kg):</strong> {user.weight}</p>
                        <p><strong>Emergency Contact Name:</strong> {user.emergencyName}</p>
                        <p><strong>Emergency Contact Number:</strong> {user.emergencyNumber}</p>
                        <p><strong>Emergency Contact Wallet Address:</strong> {user.emergencyAddress}</p>
                    </div>
                ) : (
                    <p>No user found.</p>
                )}
            </div>
        </div>
    );
};

export default PatientUserProfile;