'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import styles from '@/app/styles/dashboard.module.css';
import { DocumentChartBarIcon, DocumentDuplicateIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const DoctorNavbar = () => {
    const pathname = usePathname();

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={pathname === "/dashboard/userprofile" ? styles.activeLink : ""}>
                    <Link href="/dashboard/userprofile" className={styles.navbarLink}><DocumentChartBarIcon className="w-6"/>Profile</Link>
                </li>
                <li className={pathname === "/dashboard/ehr" ? styles.activeLink : ""}>
                    <Link href="/dashboard/ehr" className={styles.navbarLink}><DocumentDuplicateIcon className="w-6"/>EHR</Link>
                </li>
                <li className={pathname === "/dashboard/appointments" ? styles.activeLink : ""}>
                    <Link href="/dashboard/appointments" className={styles.navbarLink}><ChatBubbleLeftRightIcon className="w-6"/>Appointments</Link>
                </li>
            </ul>
        </nav>
    );
};

export default DoctorNavbar;