import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import AppointmentService from '../services/appointment-service';
import { useNavigate } from 'react-router-dom';
import Header from '../containers/Header';

const Appointment = () => {


    //Doctor State
    const [doctor, Setdoctor] = useState(0);
    const [data, SetData] = useState([]);

    //Appointment Date State
    const [appointmentDate, SetAppointmentDate] = useState('');
    const [appointmentDateData, SetAppointmentDateData] = useState([]);
    const [appointmentDateDatas, SetAppointmentDateDatas] = useState([]);

    //Timse-slot state
    const [time, SetTime] = useState('');
    const [timeSlot, SetTimeSlot] = useState([]);

    useEffect(() => {
        AppointmentService.GetAllDoctorsList()
            .then((response) => {
                //console.log('Fetching doctors list successfully:', response);
                SetData(response);
                //Setdoctor(doctor);
            })
            .catch((error) => {
                console.error('Error fetching doctors list:', error);
            });
        console.log(doctor)
    }, []);

    useEffect(() => {
        AppointmentService.GetDoctorScheduleList(doctor, 0)
            .then((response) => {
                //console.log('Before schedule list',response);
                SetAppointmentDateDatas(response);
                const uniqueObjects = [...new Map(response.map(item => [item.appointmentDate, item])).values()]
                SetAppointmentDateData(uniqueObjects);
                Setdoctor(doctor);
                // SetAppointmentDate(appointmentDate);

            })
            .catch((error) => {
                console.error('Error fetching doctors schedule list:', error);
            });

        // console.log(doctor);
        // console.log(appointmentDate)
    }, [doctor]);


    useEffect(() => {

        SetAppointmentDate(appointmentDate);
        const timeSlot = appointmentDateDatas.filter(ts => ts.appointmentDate === appointmentDate);
        console.log('Time-slot', timeSlot);
        SetTimeSlot(timeSlot);
        //SetAppointmentDate(appointmentDate);     
        // console.log(doctor);
        console.log(appointmentDate)
    }, [appointmentDate]);

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login');
    }

    const handlePatientDashboardClick = () => {

        navigate('/patient-dashboard');
    }


    // const doctors = [
    //     { doctorId: 1, name: 'Ajit Mane - Neurologist' },
    //     { doctorId: 2, name: 'Vikrant Patil - Cardiologist' },
    // ];


    const storedString = localStorage.getItem("User");
    const retrievedObject = JSON.parse(storedString);

    //console.log('appointment page', { retrievedObject })

    const formik = useFormik({
        initialValues: {
            doctorId: '',
            patientId: retrievedObject.id,
            status: 0,
            appointmentDate: '',
            hours: '',
            mins: '',
        },
        validationSchema: Yup.object({
            hours: Yup.number()
                .required('Hours is required')
                .min(-1, 'Invalid hours')
                .max(24, 'Invalid hours'),

            mins: Yup.number().required('Minutes is required')
                .min(-1, 'Invalid minutes')
                .max(59, 'Invalid minutes'),

            appointmentDate: Yup.string().required('Date is required'),

            doctorId: Yup.string().required('Doctor is required')
        }),
        onSubmit: (values) => {

            // alert(JSON.stringify(values, null, 2));

            AppointmentService.CreateAppointment(values)
                .then((response) => {
                    console.log('Patient appointment created successfully:', response);
                    alert('Patient appointment created successfully:');
                    navigate('/patient-dashboard');
                })
                .catch((error) => {
                    console.error('Error creating appointment:', error);
                });

        },


    });

    const { values, handleChange, handleSubmit, errors, touched, handleBlur } = formik;

    return (
        <div className="container mt-4">

            <Container>
                <div className="container mt-3">

                    <div className="bg-primary text-white text-center py-3 mb-4">
                        <h1 className="display-6">Doctor Appointment Application</h1>
                        <p className="lead">Your Health, Our Priority !!!</p>
                    </div>

                    <div className="d-flex justify-content-end align-items-center">
                        <span className="me-3">Welcome Patient: <strong>{retrievedObject.name}</strong></span>
                        <button className="btn btn-outline-danger" onClick={handleLogOut}>Logout</button>
                    </div>
                </div>
            </Container>


            <hr></hr>

            <Container>
                <div className="container mt-3">
                    <div className="d-flex justify-content-end align-items-center">

                        <button type="button" className="btn btn-primary" onClick={handlePatientDashboardClick}>Patient Dashboard</button>
                    </div>
                </div>
            </Container>

            <br></br>
            <div className="row g-4">
                <div className="col-md-2">
                <label className="form-label font-weight-bold">Doctors Avaibility:</label>
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        onChange={(e) => Setdoctor(e.target.value)}

                    >
                        <option value={doctor}> -- Select Doctor -- </option>
                        {data.map((d) => <option key={d.doctorId} value={d.doctorId}>{d.name}</option>)}
                    </select>
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        onChange={(e) => SetAppointmentDate(e.target.value)}
                    >
                        <option value={appointmentDate}> -- Select Appointment Date -- </option>
                        {appointmentDateData.map((appdate) => <option key={appdate.scheduleId} value={appdate.appointmentDate}>{appdate.appointmentDate}</option>)}
                    </select>
                </div>

                <div className="col-md-2">
                    <select
                        className="form-select"
                        onChange={(e) => SetTime(e.target.value)}
                    >
                        {timeSlot.map((ts) => <option key={ts.scheduleId} value={`${ts.from} - ${ts.to}`}>{`${ts.from} - ${ts.to}`}</option>)}
                    </select>
                </div>
            </div>

            <div className="container mt-4">
                <h2>Create Appointment</h2>
                <form onSubmit={handleSubmit} noValidate>
                    {[
                        ['Date', 'appointmentDate', 'text', 'yyyy-mm-dd'],
                        ['Hours', 'hours', 'number', ''],
                        ['Mins', 'mins', 'number', ''],
                    ].map(([label, field, type, placeholderText]) => (
                        <div className="mb-3" key={field}>
                            <label className="form-label">{label}</label>
                            <input
                                type={type}
                                name={field}
                                value={values[field]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${touched[field] && errors[field] ? 'is-invalid' : ''}`}
                                placeholder={placeholderText}
                            />
                            {touched[field] && errors[field] && (
                                <div className="invalid-feedback">{errors[field]}</div>
                            )}
                        </div>
                    ))}

                    <div className="mb-3">
                        <label className="form-label">Doctor</label>
                        <select
                            name="doctorId"
                            // className="form-select"
                            className={`form-select ${touched.doctorId && errors.doctorId ? 'is-invalid' : ''}`}
                            value={values.doctorId}
                            onChange={handleChange}
                        >
                            <option value={0}>-- Select Doctor --</option>
                            {data.map((d) => (
                                <option key={d.doctorId} value={d.doctorId}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                        {touched.doctorId && errors.doctorId && (
                            <div className="invalid-feedback">{errors.doctorId}</div>
                        )}
                    </div>

                    {/* <div className="mb-3">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Choose a date"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Selected Date:</label>
                        <input
                            type="text"
                            className={`form-control ${touched.appdate && errors.appdate ? 'is-invalid' : ''}`}                    
                            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                            name = "appdate"
                            
                        />
                        {touched.appdate && errors.appdate && (
                            <div className="text-danger mt-1">{errors.appdate}</div>
                        )}
                    </div> */}


                    {/* Gender Radio Buttons */}

                    {/* <div className="mb-3">
                        <label className="form-label d-block">Gender</label>
                        {['Male', 'Female'].map((g) => (
                            <div className="form-check form-check-inline" key={g}>
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="gender"
                                    value={g}
                                    onChange={handleChange}
                                    checked={values.gender === g}
                                />
                                <label className="form-check-label">{g}</label>
                            </div>
                        ))}
                        {touched.gender && errors.gender && (
                            <div className="text-danger mt-1">{errors.gender}</div>
                        )}
                    </div> */}

                    <button type="submit" className="btn btn-primary">Save Appointment</button>
                </form>
            </div>
        </div>
    );
};

export default Appointment