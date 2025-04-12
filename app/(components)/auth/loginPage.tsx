'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '@/app/styles/auth.module.css';
import { ethers } from "ethers";
import { contractAddress, contractABI } from '@/constants/contract';

const LoginPage = ({onLogin}: { onLogin: (role: string) => void }) => {

    const router = useRouter();

    const [role, setRole] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', role: '', phone: '', dob: '', gender: '', height: '', weight: '', emergencyName: '', emergencyContact: '', emergencyContactAddress: '', licenseNo: '', specialty: '' });
    const [walletAddress, setWalletAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!formData.name || !formData.email || !formData.role) {
            alert('Please fill in all fields.');
            return;
        }

        if(formData.role === "patient" && (!formData.phone || !formData.dob || !formData.gender || !formData.height || !formData.weight)) {
            alert('Please fill in all fields.');
            return;
        }

        if(formData.role === "doctor" && (!formData.phone || !formData.licenseNo || !formData.specialty)) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            setLoading(true);

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setWalletAddress(address);
            const contract = new ethers.Contract(contractAddress["healthcare"], contractABI["healthcare"], signer);

            if(role === "patient") {
                const tx = await contract.setPatientDetails(formData.name, formData.email, formData.phone, formData.gender, formData.dob, formData.height,formData.weight, formData.emergencyName, formData.emergencyContact, formData.emergencyContactAddress);
                await tx.wait();
            } else {
                const tx = await contract.setDoctorDetails(formData.licenseNo, formData.name, formData.email, formData.specialty, formData.phone);
                await tx.wait();
            }

            localStorage.setItem('userRole', formData.role);

            console.log("User registered successfully!");
    
            router.push('/dashboard/userprofile');
        } catch(error) {
            console.error("Transaction failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className={styles.loginFullPage}>
        <main className={styles.welcomePage}>
            <div className={styles.welcomeSectionWrapper}>
                <section className={styles.welcomeSection}>
                    <h1 className={styles.welcomeHeader}>Welcome!</h1>
                    <p className={styles.welcomeParagraph}>To continue, please login with your personal info and connect with your Ethereum wallet</p>
                </section>
            </div>
            <div className={styles.loginSectionWrapper}>
                <section className={styles.loginContainer}>
                    <h2 className={styles.loginPrompt}>Log in</h2>
                    <form className={styles.loginForm}>
                        <label>Full Name:</label>
                        <input className={styles.inputField} type="text" name="name" placeholder="Full Name" onChange={handleChange} required></input>
                        <label>Email:</label>
                        <input className={styles.inputField} type="email" name="email" placeholder="Email" onChange={handleChange} required></input>
                        <select className={styles.roleSelector} onChange={(e) => {handleChange(e); setRole(e.target.value);}} name = "role" required>
                            <option value="">Select Role</option>
                            <option value="doctor">Doctor</option>
                            <option value="patient">Patient</option>
                        </select>
                        {/* Conditional Fields for Patients */}
                        {role === "patient" && (
                            <>
                                <label>Phone:</label>
                                <input type="string" name="phone" placeholder="Contact No." value={formData.phone} onChange={handleChange} className={styles.inputField} required/>

                                <label>Date of Birth:</label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border rounded mb-3" required/>

                                <label>Gender:</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded mb-3" required>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>

                                <label>Height (in cm):</label>
                                <input type="number" name="height" placeholder="0" value={formData.height} onChange={handleChange} className={styles.inputField} required/>

                                <label>Weight (in kg):</label>
                                <input type="number" name="weight" placeholder="0" value={formData.weight} onChange={handleChange} className={styles.inputField} required/>

                                <label>Emergency Contact Name:</label>
                                <input type="text" name="emergencyName" placeholder="Emergency Contact Name" value={formData.emergencyName} onChange={handleChange} className={styles.inputField}/>

                                <label>Emergency Contact Number:</label>
                                <input type="text" name="emergencyContact" placeholder="Emergency Contact Number" value={formData.emergencyContact} onChange={handleChange} className={styles.inputField}/>

                                <label>Emergency Contact Wallet Address:</label>
                                <input type="text" name="emergencyContactAddress" placeholder="Emergency Contact Wallet Address" value={formData.emergencyContactAddress} onChange={handleChange} className={styles.inputField}/>
                            </>
                        )}

                        {/* Conditional Fields for Doctors */}
                        {role === "doctor" && (
                            <>
                                <label>Phone:</label>
                                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className={styles.inputField} required/>
                                <label>License Registration No:</label>
                                <input type="text" name="licenseNo" placeholder="License Registration No." value={formData.licenseNo} onChange={handleChange} className={styles.inputField} required/>
                                <label>Specialty:</label>
                                <input type="text" name="specialty" placeholder="Specialty" value={formData.specialty} onChange={handleChange} className={styles.inputField} required/>
                            </>
                        )}
                        <div className={styles.connectButtonWrapper}>
                            <button className={styles.walletConnectButton} onClick={handleLogin} type="submit">Submit & Connect Wallet</button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
      </div>
    );
};

export default LoginPage;