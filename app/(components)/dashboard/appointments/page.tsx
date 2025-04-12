import Appointments from './appointments';
import styles from '@/app/styles/appointments.module.css';

const Page = () => {
    return (
        <div className={styles.appointmentsContainer}>
            <Appointments/>
        </div>
    );
};

export default Page;