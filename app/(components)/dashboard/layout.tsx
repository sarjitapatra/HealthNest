'use client';

import { ReactNode } from "react";
import { useRouter } from 'next/navigation';

import { useState, useEffect } from "react";
import Image from "next/image";

import DoctorNavbar from "./doctorNavbar";
import PatientNavbar from "./patientNavbar";
import styles from '@/app/styles/dashboard.module.css';

const DashboardLayout = ({ children }: { children: ReactNode }) => {

    const [role, setRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        if(!storedRole) {
            router.push('/login');
        } else {
            setRole(storedRole);
        }
    }, []);

    if(!role)   return <p>Loading...</p>

    if(role === 'doctor') {
        return (
                <div className={styles.dashboardWrapper}>
                <section className={styles.dashboardLogo}>
                    <Image className={styles.userProfile} src="/doctor-generic-user-profile.png" alt="user profile icon" width={800} height={800}></Image>
                </section>
                <header className={styles.dashboardHeader}>
                    <h1 className={styles.dashboardHeaderContent}>Doctor Dashboard</h1>
                    <p className={styles.dashboardHeaderDescription}>View and manage patient appointments, medical records, and telemedicine sessions.</p>
                </header>
                <div className={styles.dashboardNavbarWrapper}>
                    <nav className={styles.dashboardNavbar}>
                        <DoctorNavbar/>
                    </nav>
                </div>
                <section className={styles.dashboardContent}>
                    {children}
                </section>
            </div>
        );
    } else if(role === 'patient') {
        return (
            <div className={styles.dashboardWrapper}>
            <section className={styles.dashboardLogo}>
                <Image className={styles.userProfile} src="/patient-default-profile-icon.jpg" alt="user profile icon" width={400} height={400}></Image>
            </section>
            <header className={styles.dashboardHeader}>
                <h1 className={styles.dashboardHeaderContent}>Patient Dashboard</h1>
                <p className={styles.dashboardHeaderDescription}>Schedule appointments, view medical records, and manage insurance claims</p>
            </header>
            <div className={styles.dashboardNavbarWrapper}>
                <nav className={styles.dashboardNavbar}>
                    <PatientNavbar/>
                </nav>
            </div>
            <section className={styles.dashboardContent}>
                {children}
            </section>
        </div>
        );
    }
};

export default DashboardLayout;