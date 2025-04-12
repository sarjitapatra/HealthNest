'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const RoleBasedEhrLayout = ({ doctorView, patientView }: { doctorView: JSX.Element; patientView: JSX.Element }) => {
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
        return doctorView;
    } else if(role === 'patient') {
        return patientView;
    }
};

export default RoleBasedEhrLayout;