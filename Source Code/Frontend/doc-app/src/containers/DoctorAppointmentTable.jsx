import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';

const DoctorAppointmentTable = ({appointment,handleApproveClick,handleDeclineClick}) => {
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
                                <button type="button" className="btn btn-success btn-sm" onClick={handleApproveClick}>Approve</button> &nbsp;
                                <button type="button" className="btn btn-danger btn-sm" onClick={handleDeclineClick}>Decline</button>
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
}

export default DoctorAppointmentTable;