'use client';

import { useRouter } from 'next/navigation';
import LoginPage from './loginPage';

const Page = () => {
    const router = useRouter();

    const handleLogin = (role: string) => {
        router.push('/dashboard');
    };

    return (
        <div>
            <LoginPage onLogin={handleLogin}/>
        </div>
    );
}

export default Page;