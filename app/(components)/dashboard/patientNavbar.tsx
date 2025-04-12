'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DocumentChartBarIcon, DocumentDuplicateIcon, ChatBubbleLeftRightIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import styles from '@/app/styles/dashboard.module.css';

const PatientNavbar = () => {
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
                <li className={pathname === "/dashboard/insurance" ? styles.activeLink : ""}>
                    <Link href="/dashboard/insurance" className={styles.navbarLink}><BanknotesIcon className="w-6"/>Insurance</Link>
                </li>
            </ul>
        </nav>
    );
};

export default PatientNavbar;