import PatientAppointments from "./patient/patientAppointments";
import DoctorAppointments from "./doctor/doctorAppointments";
import RoleBasedAppointmentLayout from "./roleBasedAppointmentLayout";

const Appointments = () => {
    return <RoleBasedAppointmentLayout doctorView={<DoctorAppointments/>} patientView={<PatientAppointments/>} />;
};

export default Appointments;