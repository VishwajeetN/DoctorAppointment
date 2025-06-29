import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import AppointmentService from '../services/appointment-service';
import { useNavigate } from 'react-router-dom';


const DoctorListScheduleAppointment = () => {
    const [key, setKey] = useState(0);
    const [schedule, setSchedule] = useState({});

    const storedString = localStorage.getItem("User");
    const retrievedObject = JSON.parse(storedString);

    const scheduleStatus = {
        active: 0,
        inactive: 1
    }

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login')
    }

    const handleAppointmentClick = () => {
        navigate('/doctor-schedule-appointment');
    }
    const doctorDashboardClick = () => {
        navigate('/doctor-dashboard');
    }

    const handleActiveClick = (rowData, actionType) => {
        UpdateDoctorSchedule(rowData, actionType);
    };
    const handleInactiveClick = (rowData, actionType) => {
        UpdateDoctorSchedule(rowData, actionType);
    };

    const handleEditClick = (rowData) => {
       navigate(`/doctor-schedule-appointment-edit/${rowData.scheduleId}`)
    };

    const UpdateDoctorSchedule = (rowData, actionType) => {
        const status = actionType === 'active' ? scheduleStatus.active : scheduleStatus.inactive
        AppointmentService.UpdateDoctorSchedule(rowData.scheduleId, retrievedObject.id, status)
            .then((response) => {
                console.log('Schedule status updated successfully:', response);
                alert('Schedule status updated successfully');
                GetDoctorScheduleList();
            })
            .catch((error) => {
                console.error('Error updating Schedule', error);
            });
    }


    useEffect(() => {
        GetDoctorScheduleList();
    }, [key]);

    const GetDoctorScheduleList = () => {
        AppointmentService.GetDoctorScheduleList(parseInt(retrievedObject.id), key)
            .then((response) => {
                if (response) {
                    setSchedule(response);
                    console.log('Schedule list', { response })
                }
            })
            .catch((error) => {
                console.error('Error fetching doctor schedule:', error);
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
                        <button type="button" className="btn btn-primary" onClick={doctorDashboardClick}>Doctor Dashboard</button>
                    </div>
                </div>
            </Container>
            <h4 className="mb-4">Doctor Schedule Details</h4>
            <Tabs
                id="user-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                justify
            >
                <Tab eventKey={0} title="Active Schedule">
                    <div className="container mt-4">
                        <table className="table table-bordered table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Schedule Id</th>
                                    <th>Appointment Date</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Status</th>
                                    <th>Doctor Name</th>
                                    <th>Speciality</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.length > 0 ? (
                                    schedule.map((sch) => (
                                        <tr key={sch.scheduleId}>
                                            <td>{sch.scheduleId}</td>
                                            <td>{sch.appointmentDate}</td>
                                            <td>{sch.from}</td>
                                            <td>{sch.to}</td>
                                            <td>{sch.status}</td>
                                            <td>{sch.doctorName}</td>
                                            <td>{sch.speciality}</td>
                                            <td>
                                                <button type="button" className="btn btn-warning btn-sm" onClick={() => handleEditClick(sch)}>Edit</button> &nbsp;
                                                <button type="button" className="btn btn-success btn-sm" onClick={() => handleActiveClick(sch, 'active')}>Active</button> &nbsp;
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleInactiveClick(sch, 'inactive')}>Inactive</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Tab>

                <Tab eventKey={1} title="Inactive Schedule">
                    <div className="container mt-4">
                        <table className="table table-bordered table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Schedule Id</th>
                                    <th>Appointment Date</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Status</th>
                                    <th>Doctor Name</th>
                                    <th>Speciality</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.length > 0 ? (
                                    schedule.map((sch) => (
                                        <tr key={sch.scheduleId}>
                                            <td>{sch.scheduleId}</td>
                                            <td>{sch.appointmentDate}</td>
                                            <td>{sch.from}</td>
                                            <td>{sch.to}</td>
                                            <td>{sch.status}</td>
                                            <td>{sch.doctorName}</td>
                                            <td>{sch.speciality}</td>
                                            <td>
                                                <button type="button" className="btn btn-warning btn-sm" onClick={() => handleEditClick(sch)}>Edit</button> &nbsp;
                                                <button type="button" className="btn btn-success btn-sm" onClick={() => handleActiveClick(sch, 'active')}>Active</button> &nbsp;
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleInactiveClick(sch, 'inactive')}>Inactive</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">
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

export default DoctorListScheduleAppointment;
