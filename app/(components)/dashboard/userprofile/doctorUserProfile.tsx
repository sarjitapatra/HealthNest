"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractAddress, contractABI } from "@/constants/contract";
import styles from '@/app/styles/profile.module.css';

const DoctorUserProfile = () => {
    const [user, setUser] = useState<{ licenseNo: string; name: string; email: string; specialty: string; } | null>(null);
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

                const contract = new ethers.Contract(contractAddress["healthcare"], contractABI["healthcare"], provider);
                const [licenseNo, name, email, specialty, wallet] = await contract.getDoctorDetails(userAddress);

                setUser({ licenseNo, name, email, specialty });
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
                        <p><strong>License No.:</strong> {user.licenseNo}</p>
                        <p><strong>Specialization:</strong> {user.specialty}</p>
                    </div>
                ) : (
                    <p>No user found.</p>
                )}
            </div>
        </div>
    );
};

export default DoctorUserProfile;