export const contractAddress = {
    "healthcare": "0x03e49F3eACf2B9D2d7178D7294f78Cfc42e47c7f",
    "medicalRecords": "0x0aAC55372dE847a76fc74fb3B0E942fB7D755557",
    "appointments": "0x5cafC348e4eD713e7bd9e5140c72B550413612a5",
    "insurance": "0x424FF240f7aA7f2848a5a589A7738Ba6fa932c64",
    "emergency": "0xbB9dA4b1c2AE78Fe356C880d5Edc37a670fF6f1a"
};

export const contractABI = {
    "healthcare": [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"_doctor","type":"address"},{"internalType":"address","name":"_patient","type":"address"}],"name":"approveEmergencyAccess","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"doctorCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"doctorList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"doctors","outputs":[{"internalType":"string","name":"ic","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"doctor_specialisation","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"address","name":"doctor","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"emergencymap","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDoctorAccessRequestsGranted","outputs":[{"components":[{"internalType":"address","name":"patient","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"contact","type":"string"}],"internalType":"struct HealthcareData.ApprovedPatients[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDoctorAccessRequestsPending","outputs":[{"components":[{"internalType":"address","name":"patient","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"contact","type":"string"}],"internalType":"struct HealthcareData.ApprovedPatients[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_doctor","type":"address"}],"name":"getDoctorDetails","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDoctors","outputs":[{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_patient","type":"address"}],"name":"getPatientDetails","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_doctor","type":"address"}],"name":"grantAccess","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"hasAccess","outputs":[{"internalType":"enum HealthcareData.AccessStatus","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"isApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"patientCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"patientList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"patients","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"string","name":"gender","type":"string"},{"internalType":"string","name":"dob","type":"string"},{"internalType":"string","name":"height","type":"string"},{"internalType":"string","name":"weight","type":"string"},{"internalType":"string","name":"emergencyName","type":"string"},{"internalType":"string","name":"emergencyPhone","type":"string"},{"internalType":"address","name":"emergencyContact","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_doctor","type":"address"},{"internalType":"address","name":"_patient","type":"address"}],"name":"removeAccess","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_patient","type":"address"}],"name":"requestEmergencyAccess","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_ic","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_email","type":"string"},{"internalType":"string","name":"_specialisation","type":"string"},{"internalType":"string","name":"_phone","type":"string"}],"name":"setDoctorDetails","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_email","type":"string"},{"internalType":"string","name":"_phone","type":"string"},{"internalType":"string","name":"_gender","type":"string"},{"internalType":"string","name":"_dob","type":"string"},{"internalType":"string","name":"_height","type":"string"},{"internalType":"string","name":"_weight","type":"string"},{"internalType":"string","name":"_emergencyName","type":"string"},{"internalType":"string","name":"_emergencyPhone","type":"string"},{"internalType":"address","name":"_emergencyContact","type":"address"}],"name":"setPatientDetails","outputs":[],"stateMutability":"nonpayable","type":"function"}],
    "medicalRecords": [{"inputs":[{"internalType":"address","name":"_healthcareData","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"_description","type":"string"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"addMedicalRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getMedicalRecords","outputs":[{"components":[{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"ipfsHash","type":"string"},{"internalType":"uint256","name":"creationDate","type":"uint256"}],"internalType":"struct MedicalRecords.MedicalRecord[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_patient","type":"address"}],"name":"getMedicalRecordsForDoctor","outputs":[{"components":[{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"ipfsHash","type":"string"},{"internalType":"uint256","name":"creationDate","type":"uint256"}],"internalType":"struct MedicalRecords.MedicalRecord[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"patientMedicalRecords","outputs":[{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"ipfsHash","type":"string"},{"internalType":"uint256","name":"creationDate","type":"uint256"}],"stateMutability":"view","type":"function"}],
    "appointments": [{"inputs":[{"internalType":"address","name":"_healthcareData","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"appointments","outputs":[{"internalType":"address","name":"doctoraddr","type":"address"},{"internalType":"address","name":"patientaddr","type":"address"},{"internalType":"string","name":"patientName","type":"string"},{"internalType":"string","name":"doctorName","type":"string"},{"internalType":"string","name":"doctorspecialization","type":"string"},{"internalType":"string","name":"date","type":"string"},{"internalType":"string","name":"time","type":"string"},{"internalType":"string","name":"prescription","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"status","type":"string"},{"internalType":"uint256","name":"creationDate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_doctor","type":"address"},{"internalType":"string","name":"_date","type":"string"},{"internalType":"string","name":"_time","type":"string"},{"internalType":"string","name":"_description","type":"string"}],"name":"createAppointment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"doctorAppointments","outputs":[{"internalType":"address","name":"doctoraddr","type":"address"},{"internalType":"address","name":"patientaddr","type":"address"},{"internalType":"string","name":"patientName","type":"string"},{"internalType":"string","name":"doctorName","type":"string"},{"internalType":"string","name":"doctorspecialization","type":"string"},{"internalType":"string","name":"date","type":"string"},{"internalType":"string","name":"time","type":"string"},{"internalType":"string","name":"prescription","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"status","type":"string"},{"internalType":"uint256","name":"creationDate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAppointments","outputs":[{"components":[{"internalType":"address","name":"doctoraddr","type":"address"},{"internalType":"address","name":"patientaddr","type":"address"},{"internalType":"string","name":"patientName","type":"string"},{"internalType":"string","name":"doctorName","type":"string"},{"internalType":"string","name":"doctorspecialization","type":"string"},{"internalType":"string","name":"date","type":"string"},{"internalType":"string","name":"time","type":"string"},{"internalType":"string","name":"prescription","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"status","type":"string"},{"internalType":"uint256","name":"creationDate","type":"uint256"}],"internalType":"struct Appointments.Appointment[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAppointmentsForDoctor","outputs":[{"components":[{"internalType":"address","name":"doctoraddr","type":"address"},{"internalType":"address","name":"patientaddr","type":"address"},{"internalType":"string","name":"patientName","type":"string"},{"internalType":"string","name":"doctorName","type":"string"},{"internalType":"string","name":"doctorspecialization","type":"string"},{"internalType":"string","name":"date","type":"string"},{"internalType":"string","name":"time","type":"string"},{"internalType":"string","name":"prescription","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"diagnosis","type":"string"},{"internalType":"string","name":"status","type":"string"},{"internalType":"uint256","name":"creationDate","type":"uint256"}],"internalType":"struct Appointments.Appointment[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}],
    "insurance": [{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInsuranceClaim","outputs":[{"components":[{"internalType":"string","name":"insuranceProvider","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"uint256","name":"claimAmount","type":"uint256"},{"internalType":"uint256","name":"submissionDate","type":"uint256"}],"internalType":"struct InsuranceData.InsuranceClaim[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"insuranceClaims","outputs":[{"internalType":"string","name":"insuranceProvider","type":"string"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"uint256","name":"claimAmount","type":"uint256"},{"internalType":"uint256","name":"submissionDate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_insuranceProvider","type":"string"},{"internalType":"string","name":"_claimReason","type":"string"},{"internalType":"uint256","name":"_claimAmount","type":"uint256"}],"name":"submitInsuranceClaim","outputs":[],"stateMutability":"nonpayable","type":"function"}],
    "emergency": [{"inputs":[{"internalType":"address","name":"_healthcareData","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getDoctorsAndPatients","outputs":[{"components":[{"internalType":"address","name":"patientaddress","type":"address"},{"internalType":"string","name":"pname","type":"string"},{"internalType":"string","name":"pphone","type":"string"},{"internalType":"string","name":"doctorname","type":"string"},{"internalType":"string","name":"doctorspec","type":"string"},{"internalType":"address","name":"docaddress","type":"address"}],"internalType":"struct EmergencyContract.Emergency[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDoctorsAndPatientsGranted","outputs":[{"components":[{"internalType":"address","name":"patientaddress","type":"address"},{"internalType":"string","name":"pname","type":"string"},{"internalType":"string","name":"pphone","type":"string"},{"internalType":"string","name":"doctorname","type":"string"},{"internalType":"string","name":"doctorspec","type":"string"},{"internalType":"address","name":"docaddress","type":"address"}],"internalType":"struct EmergencyContract.Emergency[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}]
};