import PatientEHR from "./patient/patientEHR";
import DoctorEHR from "./doctor/doctorEHR";
import RoleBasedEhrLayout from "./roleBasedEhrLayout";

const EHR = () => {
    return <RoleBasedEhrLayout doctorView={<DoctorEHR/>} patientView={<PatientEHR/>} />;
};

export default EHR;