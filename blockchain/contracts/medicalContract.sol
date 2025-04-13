// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// Contract to manage patient and doctor details
contract HealthcareData {
    struct Patient {
        string name;
        string email;
        string phone;
        string gender;
        string dob;
        string height;
        string weight;
        string emergencyName;
        string emergencyPhone;
        address emergencyContact;
        string[] ipfsHashes;
        address owner;
    }


    struct Doctor {
        string ic;
        string name;
        string email;
        string doctor_specialisation;
        string phone;
        address doctor;
    }


    struct ApprovedPatients{
        address patient;
        string name;
        string contact;


    }
    struct ApprovedDoctor {
    string name;
    string specialization;
    address doctorAddress;
    string pname;
    string phone;
    address patientaddress;
    }


   
    enum AccessStatus { Default, Pending, Granted, Removed }
    address public owner;
    address[] public doctorList;
    address[] public patientList;
    mapping(address => Patient) public patients;
    mapping(address => Doctor) public doctors;
    mapping(address => mapping(address => bool)) public isApproved;
    mapping(address=>mapping(address=> bool)) public emergencymap;
    uint public patientCount;
    uint public doctorCount;
   
    mapping(address => mapping(address => AccessStatus)) public hasAccess;
   
    constructor() {
        owner = msg.sender;
    }


     function setPatientDetails(
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _gender,
        string memory _dob,
        string memory _height,
        string memory _weight,
        string memory _emergencyName,
        string memory _emergencyPhone,
        address _emergencyContact
    ) public {
       
        if (bytes(patients[msg.sender].name).length == 0) {
           
        patients[msg.sender] = Patient(
        _name, _email, _phone, _gender, _dob, _height, _weight,
        bytes(_emergencyName).length > 0 ? _emergencyName : "--",
        bytes(_emergencyPhone).length > 0 ? _emergencyPhone : "--",
        _emergencyContact,
        new string[](0) , msg.sender
       
    );
        patientList.push(msg.sender);
        patientCount++;
        emergencymap[_emergencyContact][msg.sender]=true;
        }
    }


    function getPatientDetails(address _patient) public view returns (
        string memory, string memory, string memory, string memory, string memory,
        string memory, string memory,  string memory, string memory, address, address
    ) {
        Patient memory p = patients[_patient];
        return (p.name, p.email, p.phone, p.gender, p.dob, p.height, p.weight,  p.emergencyName, p.emergencyPhone, p.emergencyContact, p.owner);
    }




   function setDoctorDetails(
        string memory _ic,
        string memory _name,
        string memory _email,
        string memory _specialisation,
        string memory _phone
    ) public {
       if (bytes(doctors[msg.sender].name).length == 0) {
                   
        doctors[msg.sender] = Doctor(_ic, _name, _email, _specialisation, _phone, msg.sender);
        doctorList.push(msg.sender);
        doctorCount++;
       }
    }




    function getDoctorDetails(address _doctor) public view returns (
        string memory, string memory, string memory, string memory, string memory, address
    ) {
        Doctor memory d = doctors[_doctor];
        return (d.ic, d.name, d.email, d.doctor_specialisation, d.phone, d.doctor);
    }


    function grantAccess(address _doctor) public {
        isApproved[msg.sender][_doctor] = true;
    }




    function getDoctors() public view returns (
    address[] memory, string[] memory, string[] memory, string[] memory, string[] memory, string[] memory
) {
    uint count = doctorList.length;
    string[] memory ics = new string[](count);
    string[] memory names = new string[](count);
    string[] memory emails = new string[](count);
    string[] memory specializations = new string[](count);
    string[] memory phones = new string[](count);
    address[] memory addresses = new address[](count);
   




    for (uint i = 0; i < count; i++) {
        address doctorAddress = doctorList[i];
        Doctor memory d = doctors[doctorAddress];




        ics[i] = d.ic;
        names[i] = d.name;
        emails[i] = d.email;
        specializations[i] = d.doctor_specialisation;
        phones[i] = d.phone;
         addresses[i] = d.doctor;
       
    }
   
    return ( addresses, ics, names, emails, specializations, phones);
    }


    function requestEmergencyAccess(address _patient) public {
        require(bytes(patients[_patient].name).length > 0, "Patient not found");
        address emergencyContact = patients[_patient].emergencyContact;
        require(emergencyContact != address(0), "No emergency contact assigned");
        hasAccess[_patient][msg.sender] = AccessStatus.Pending;




    }


    function approveEmergencyAccess(address _doctor, address _patient) public {
        require(msg.sender == patients[_patient].emergencyContact, "Only emergency contact can approve");
        require(hasAccess[_patient][_doctor] == AccessStatus.Pending, "No pending request");
        hasAccess[_patient][_doctor] = AccessStatus.Granted;
    }


    function removeAccess(address _doctor, address _patient) public {
        //require(msg.sender == _patient || msg.sender == patients[_patient].emergencyContact, "Not authorized");
        if (msg.sender == patients[_patient].emergencyContact) {
                hasAccess[_patient][_doctor] = AccessStatus.Removed;
        }
       
        else{
            isApproved[_patient][_doctor] = false;
        }
    }
   


    function getDoctorAccessRequestsPending() public view returns (ApprovedPatients[] memory) {
       
        uint count = 0;
        for (uint i = 0; i < patientList.length; i++) {
            if (hasAccess[patientList[i]][msg.sender] == AccessStatus.Pending) {
                count++;
            }
        }
       
        ApprovedPatients[] memory patientsList = new ApprovedPatients[](count);
       
        uint index = 0;
        for (uint i = 0; i < patientList.length; i++) {
            address patient = patientList[i];
            Patient memory p = patients[patient];
            if (hasAccess[patient][msg.sender] == AccessStatus.Pending) {
                patientsList[index]=ApprovedPatients(patient, p.name, p.phone);
                index++;
            }
        }
       
        return patientsList;
    }


    function getDoctorAccessRequestsGranted() public view returns (ApprovedPatients[] memory) {
       
        uint count = 0;
        for (uint i = 0; i < patientList.length; i++) {
            if (hasAccess[patientList[i]][msg.sender] == AccessStatus.Granted) {
                count++;
            }
        }
       
        ApprovedPatients[] memory patientsList = new ApprovedPatients[](count);
       
        uint index = 0;
        for (uint i = 0; i < patientList.length; i++) {
            address patient = patientList[i];
            Patient memory p = patients[patient];
            if (hasAccess[patient][msg.sender] == AccessStatus.Granted) {
                patientsList[index]=ApprovedPatients(patient, p.name, p.phone);
                index++;
            }
        }
       
        return patientsList;
    }


   


}


contract EmergencyContract{
    struct Emergency{
        address patientaddress;
        string pname;
        string pphone;
        string doctorname;
        string doctorspec;
        address docaddress;
       
    }
    HealthcareData healthcareData;


    constructor(address _healthcareData) {
        healthcareData = HealthcareData(_healthcareData);
    }
    function getDoctorsAndPatients() public view returns (Emergency[] memory)
    {
        address emergency=msg.sender;
        uint count=0;
        for(uint i=0;i<healthcareData.patientCount();i++)
        {
            for(uint j=0;j<healthcareData.doctorCount();j++)
            {
                if( healthcareData.emergencymap(emergency, healthcareData.patientList(i))==true && healthcareData.hasAccess(healthcareData.patientList(i), healthcareData.doctorList(j))==HealthcareData.AccessStatus.Pending)
                    count++;
            }
        }
        Emergency[] memory e=new Emergency[](count);
        uint index=0;
        for(uint i=0;i<healthcareData.patientCount();i++)
        {
            for(uint j=0;j<healthcareData.doctorCount();j++)
            {
                if( healthcareData.emergencymap(emergency, healthcareData.patientList(i))==true && healthcareData.hasAccess(healthcareData.patientList(i), healthcareData.doctorList(j))==HealthcareData.AccessStatus.Pending)
                    {
                        address padd=healthcareData.patientList(i);
                        address dadd=healthcareData.doctorList(j);
                          // Get patient address from array
                        (
                        string memory name,
                        ,
                        string memory phone,
                        ,
                        ,
                        ,
                        ,
                        ,
                        ,
                        ,
                       
                    ) = healthcareData.getPatientDetails(padd);


                        (, string memory dname, , string memory spec, , )
                        =healthcareData.getDoctorDetails(dadd);
                       
                        e[index]=Emergency(padd, name, phone, dname, spec, dadd);
                        index++;
                    }
            }
        }
        return e;


    }


    function getDoctorsAndPatientsGranted() public view returns (Emergency[] memory)
    {
        //address emergency=msg.sender;
        uint count=0;
        for(uint i=0;i<healthcareData.patientCount();i++)
        {
            for(uint j=0;j<healthcareData.doctorCount();j++)
            {
                if((healthcareData.isApproved(msg.sender,healthcareData.doctorList(j)) && msg.sender==healthcareData.patientList(i)) ||(healthcareData.emergencymap(msg.sender, healthcareData.patientList(i))==true && healthcareData.hasAccess(healthcareData.patientList(i), healthcareData.doctorList(j))==HealthcareData.AccessStatus.Granted))
                    count++;
            }
        }
        Emergency[] memory e=new Emergency[](count);
        uint index=0;
        for(uint i=0;i<healthcareData.patientCount();i++)
        {
            for(uint j=0;j<healthcareData.doctorCount();j++)
            {
                if((healthcareData.isApproved(msg.sender,healthcareData.doctorList(j)) && msg.sender==healthcareData.patientList(i)) || (healthcareData.emergencymap(msg.sender, healthcareData.patientList(i))==true && healthcareData.hasAccess(healthcareData.patientList(i), healthcareData.doctorList(j))==HealthcareData.AccessStatus.Granted))
                    {
                        address padd=healthcareData.patientList(i);
                        address dadd=healthcareData.doctorList(j);
                         
                        (
                        string memory name,
                        ,
                        string memory phone,
                        ,
                        ,
                        ,
                        ,
                        ,
                        ,
                        ,
                       
                    ) = healthcareData.getPatientDetails(padd);


                        (, string memory dname, , string memory spec, , )
                        =healthcareData.getDoctorDetails(dadd);
                       
                        e[index]=Emergency(padd, name, phone, dname, spec, dadd);
                        index++;
                    }
            }
        }
        return e;


    }


}


// Contract to manage medical records
contract MedicalRecords {
    struct MedicalRecord {
        string description;
        string ipfsHash;
        uint creationDate;
    }


    mapping(address => MedicalRecord[]) public patientMedicalRecords;
    HealthcareData healthcareData;


    constructor(address _healthcareData) {
        healthcareData = HealthcareData(_healthcareData);
    }


    function addMedicalRecord(string memory _description, string memory _ipfsHash) public {
        MedicalRecord memory newRecord = MedicalRecord(
            _description, _ipfsHash, block.timestamp
        );
        patientMedicalRecords[msg.sender].push(newRecord);
    }


    function getMedicalRecords() public view returns (MedicalRecord[] memory) {
        return patientMedicalRecords[msg.sender];
    }


    function getMedicalRecordsForDoctor(address _patient) public view returns (MedicalRecord[] memory) {
        require(healthcareData.isApproved(_patient, msg.sender) || healthcareData.hasAccess(_patient, msg.sender) == HealthcareData.AccessStatus.Granted, "Access Denied");
       
        return patientMedicalRecords[_patient];
    }
}


// Contract to manage appointments
contract Appointments {
    struct Appointment {
        address doctoraddr;
        address patientaddr;
        string patientName;
        string doctorName;
        string doctorspecialization;
        string date;
        string time;
        string prescription;
        string description;
        string diagnosis;
        string status;
        uint creationDate;
    }


    mapping(address => Appointment[]) public appointments;
    mapping(address => Appointment[]) public doctorAppointments;
    HealthcareData healthcareData;


    constructor(address _healthcareData) {
        healthcareData = HealthcareData(_healthcareData);
    }


    function createAppointment(address _doctor, string memory _date, string memory _time, string memory _description) public {
        ( , string memory patientName, , , , , , , , ,) = healthcareData.getPatientDetails(msg.sender);
        ( , string memory doctorName, , string memory spec, , ) = healthcareData.getDoctorDetails(_doctor);


        Appointment memory newAppointment = Appointment(
            _doctor, msg.sender, patientName, doctorName, spec, _date, _time, "", _description, "", "Pending", block.timestamp
        );


        appointments[msg.sender].push(newAppointment);
        doctorAppointments[_doctor].push(newAppointment);
    }


    function getAppointments() public view returns (Appointment[] memory) {
        return appointments[msg.sender];
    }


    function getAppointmentsForDoctor() public view returns (Appointment[] memory) {
        return doctorAppointments[msg.sender];
    }
}


    contract InsuranceData {
    struct InsuranceClaim {
        string insuranceProvider;
        string desc;
        uint claimAmount;
        uint submissionDate;
    }
   
    mapping(address => InsuranceClaim []) public insuranceClaims;
    mapping(address => uint) public claimCount;


    function submitInsuranceClaim(
        string memory _insuranceProvider,
        string memory _claimReason,
        uint _claimAmount
    ) public {


        insuranceClaims[msg.sender].push(InsuranceClaim(
            _insuranceProvider, _claimReason, _claimAmount,  block.timestamp
        ));
    }


    function getInsuranceClaim() public view returns (
        InsuranceClaim[] memory)
        {
        return insuranceClaims[msg.sender];      
        }
}


