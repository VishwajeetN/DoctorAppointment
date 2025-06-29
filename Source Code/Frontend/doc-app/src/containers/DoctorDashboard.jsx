import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import AppointmentService from '../services/appointment-service';
import { useNavigate } from 'react-router-dom';
import DoctorAppointmentTable from './DoctorAppointmentTable';


const DoctorDashboard = () => {

    const appointmentStatus = {
        pending: 0,
        approve: 1,
        decline: 2
    }
    const [key, setKey] = useState(0);
    const [appointment, setAppointment] = useState({});

    const storedString = localStorage.getItem("User");
    const retrievedObject = JSON.parse(storedString);

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login')
    }

    const handleAppointmentClick = () => {
        navigate('/doctor-schedule-appointment')
    }
    const handlescheduleClick = () => {
        navigate('/doctor-schedule-list')
    }

    const handleApproveClick = (rowData,actionType) => {
        UpdateAppointmentByDoctor(rowData,actionType);
    };
    const handleDeclineClick = (rowData,actionType) => {
        UpdateAppointmentByDoctor(rowData,actionType);
    };

    const UpdateAppointmentByDoctor = (rowData,actionType) => {
        const status = actionType === 'approve' ? appointmentStatus.approve : appointmentStatus.decline
        AppointmentService.UpdateAppointmentByDoctor(rowData.appointmentId, retrievedObject.id, status)
            .then((response) => {
                console.log('Appointment status updated successfully:', response);
                alert('Appointment status updated successfully');
                GetPatientAppointmentByDoctor();
            })
            .catch((error) => {
                console.error('Error updating appointment', error);
            });
    }


    useEffect(() => {
        GetPatientAppointmentByDoctor();
    }, [key]);

    const GetPatientAppointmentByDoctor = () => {
        AppointmentService.GetPatientAppointmentByDoctor(retrievedObject.id, key)
            .then((response) => {
                if (response) {
                    setAppointment(response);
                }
            })
            .catch((error) => {
                console.error('Error fetching doctor appointment:', error);
            });
    }

    console.log(key)
    return (
        <Container className="mt-4">
            <Container>
                <div className="container mt-3">
                    <div className="bg-primary text-white text-center py-3 mb-4">
                        <h1 className="display-6">Doctor Appointment Application</h1>
                        <p className="lead">Your Health, Our Priority !!!</p>
                    </div>

                    <div className="d-flex justify-content-end align-items-center">
                        <span className="me-3">Welcome Doctor: <strong>{retrievedObject.name}</strong></span>
                        <button className="btn btn-outline-danger" onClick={handleLogOut}>Logout</button>
                    </div>
                </div>
            </Container>

            <hr></hr>

            <Container>
                <div className="container mt-3">
                    <div className="d-flex justify-content-end align-items-center">
                        <button className="btn btn-primary" onClick={handleAppointmentClick}>Create Doctor Schedule</button>&nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={handlescheduleClick}>View Schedule</button>
                    </div>
                </div>
            </Container>
            <h4 className="mb-4">Doctor Appointment Details</h4>
            <Tabs
                id="user-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                justify
            >
                <Tab eventKey={0} title="Pending Appointment">
                    {/* <DoctorAppointmentTable appointment={appointment} handleApproveClick={() => handleApproveClick(app)} handleDeclineClick={() => handleDeclineClick(app)} /> */}
                     <div className="container mt-4">
                        <table className="table table-bordered table-striped table-hover">
                            <thead className="table-dark table-sm">
                                <tr>
                                    <th>App. Id</th>
                                    <th>App. Date</th>
                                    <th>Hours</th>
                                    <th>Min</th>
                                    <th>Status</th>
                                    <th>Doctor Name</th>
                                    <th>Speciality</th>
                                    <th>Patient Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointment.length > 0 ? (
                                    appointment.map((app) => (
                                        <tr key={app.appointmentId}>
                                            <td>{app.appointmentId}</td>
                                            <td>{app.appointmentDate}</td>
                                            <td>{app.hours}</td>
                                            <td>{app.mins}</td>
                                            <td>{app.status}</td>
                                            <td>{app.doctorName}</td>
                                            <td>{app.speciality}</td>
                                            <td>{app.patientName}</td>
                                            <td>{app.age}</td>
                                            <td>{app.gender}</td>
                                            <td>
                                                <button type="button" className="btn btn-success btn-sm" onClick={() => handleApproveClick(app, 'approve')}>Approve</button> &nbsp;
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeclineClick(app, 'decline')}>Decline</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="text-center">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Tab>

                <Tab eventKey={1} title="Approved Appointment">
                    <div className="container mt-4">
                        <table className="table table-bordered table-striped table-hover">
                            <thead className="table-dark table-sm">
                                <tr>
                                    <th>App. Id</th>
                                    <th>App. Date</th>
                                    <th>Hours</th>
                                    <th>Min</th>
                                    <th>Status</th>
                                    <th>Doctor Name</th>
                                    <th>Speciality</th>
                                    <th>Patient Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointment.length > 0 ? (
                                    appointment.map((app) => (
                                        <tr key={app.appointmentId}>
                                            <td>{app.appointmentId}</td>
                                            <td>{app.appointmentDate}</td>
                                            <td>{app.hours}</td>
                                            <td>{app.mins}</td>
                                            <td>{app.status}</td>
                                            <td>{app.doctorName}</td>
                                            <td>{app.speciality}</td>
                                            <td>{app.patientName}</td>
                                            <td>{app.age}</td>
                                            <td>{app.gender}</td>
                                            <td>
                                                <button type="button" className="btn btn-success btn-sm" onClick={() => handleApproveClick(app, 'approve')}>Approve</button> &nbsp;
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeclineClick(app, 'decline')}>Decline</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="text-center">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Tab>

                <Tab eventKey={2} title="Declined Appointment">
                     <div className="container mt-4">
                        <table className="table table-bordered table-striped table-hover">
                            <thead className="table-dark table-sm">
                                <tr>
                                    <th>App. Id</th>
                                    <th>App. Date</th>
                                    <th>Hours</th>
                                    <th>Min</th>
                                    <th>Status</th>
                                    <th>Doctor Name</th>
                                    <th>Speciality</th>
                                    <th>Patient Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointment.length > 0 ? (
                                    appointment.map((app) => (
                                        <tr key={app.appointmentId}>
                                            <td>{app.appointmentId}</td>
                                            <td>{app.appointmentDate}</td>
                                            <td>{app.hours}</td>
                                            <td>{app.mins}</td>
                                            <td>{app.status}</td>
                                            <td>{app.doctorName}</td>
                                            <td>{app.speciality}</td>
                                            <td>{app.patientName}</td>
                                            <td>{app.age}</td>
                                            <td>{app.gender}</td>
                                            <td>
                                                <button type="button" className="btn btn-success btn-sm" onClick={() => handleApproveClick(app, 'approve')}>Approve</button> &nbsp;
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeclineClick(app, 'decline')}>Decline</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="text-center">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default DoctorDashboard;
