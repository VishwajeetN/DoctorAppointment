import apiClient from "../containers/helpers/apiClient";

const AppointmentService = {
    GetAll,
    GetById,
    Create,
    CreateAppointment,
    GetPatientAppointmentByPatient,
    GetPatientAppointmentByDoctor,
    SaveDoctorScheduleAppointment,
    GetDoctorScheduleList,
    GetAllDoctorsList,
    UpdateAppointmentByDoctor,
    UpdateDoctorSchedule,
    GetDoctorSchedule,
    UpdateDoctorScheduleAppointment,
    Login
}
function GetAll() {
    return apiClient.get('/product/getall')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
            throw error;
        });
}
function GetById(id) {
    return apiClient.get(`/product/getbyid/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error fetching product by ID:', error);
            throw error;
        });
}

// Create Registration

function Create(registrationDetails) {
    return apiClient.post('/User/Registration', registrationDetails)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error creating registraion:', error);
            throw error;
        });
}


// Create Appointment

function CreateAppointment(appointmentDetails) {
    return apiClient.post('/Patient/SaveAppointmentDetails', appointmentDetails)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error creating appointment:', error);
            throw error;
        });
}

// Get Patient appointment by PatientId and Status

function GetPatientAppointmentByPatient(patientId,status) {
    return apiClient.get(`/Appointment/GetAppointmentByPatient/${patientId}/${status}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error fetching appointment by patient', error);
            throw error;
        });
}

function GetPatientAppointmentByDoctor(doctorId,status) {
    return apiClient.get(`/Appointment/GetAppointmentByDoctor/${doctorId}/${status}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error fetching appointment by doctor', error);
            throw error;
        });
}

// Get user details by login

function Login(userLogin) {
    return apiClient.post('/User/Login',userLogin)
        .then((response) => {
            return response.data[0];
        })
        .catch((error) => {
            console.error('Error fetching user login', error);
            throw error;
        });
}

// Schedule doctors appointment
function SaveDoctorScheduleAppointment(scheduleAppointmentDetails) {
    return apiClient.post('/Doctor/SaveDoctorScheduleAppointment', scheduleAppointmentDetails)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error creating doctors schedule appointment:', error);
            throw error;
        });
}

// Get  doctors all schedules
function GetDoctorScheduleList(doctorId,status) {
    return apiClient.get(`/Doctor/GetAllDoctorSchedule/${doctorId}/${status}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error fetching doctors schedule list:', error);
            throw error;
        });
}


//Get all doctors list

function GetAllDoctorsList() {
    return apiClient.get(`/Doctor/GetAllDoctorsList`)
        .then((response) => {
            //console.log(response);
            return response.data;
        })
        .catch((error) => {
            console.error('Error fetching doctors  list:', error);
            throw error;
        });
}

// Update Appointment by Doctor

function UpdateAppointmentByDoctor(appointmentId,doctorId,status) {
    return apiClient.post(`/Doctor/UpdateAppointmentByDoctor/${appointmentId}/${doctorId}/${status}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error updating appointment:', error);
            throw error;
        });
}

// Update Schedule by Doctor

function UpdateDoctorSchedule(scheduleId,doctorId,status) {
    return apiClient.post(`/Doctor/UpdateDoctorScheduleStatus/${scheduleId}/${doctorId}/${status}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error updating schedule:', error);
            throw error;
        });
}

// Get doctor schedule for edit

function GetDoctorSchedule(scheduleId,doctorId) {
    return apiClient.get(`/Doctor/GetDoctorSchedule/${scheduleId}/${doctorId}`)
        .then((response) => {
            return response.data[0];
        })
        .catch((error) => {
            console.error('Error fetching doctors schedule:', error);
            throw error;
        });
}


// Update Schedule doctors appointment
function UpdateDoctorScheduleAppointment(scheduleAppointmentDetails) {
    return apiClient.post('/Doctor/UpdateDoctorScheduleAppointment', scheduleAppointmentDetails)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error updating doctors schedule appointment:', error);
            throw error;
        });
}

export default AppointmentService;