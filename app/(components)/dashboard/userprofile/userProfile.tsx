import PatientUserProfile from "./patientUserProfile";
import DoctorUserProfile from "./doctorUserProfile";
import RoleBasedProfileLayout from "./rolebasedProfileLayout";

const UserProfile = () => {
    return <RoleBasedProfileLayout doctorView={<DoctorUserProfile/>} patientView={<PatientUserProfile/>} />;
};

export default UserProfile;