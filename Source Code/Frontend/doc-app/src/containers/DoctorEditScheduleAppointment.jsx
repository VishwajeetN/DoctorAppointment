import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useLocation,useParams,useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import AppointmentService from '../services/appointment-service';

const DoctorEditScheduleAppointment = () => {
    //const [schedule, setSchedule] = useState([]);
    const { scheduleId } = useParams();
    console.log(scheduleId);

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login')
    }

    const doctorDashboardClick = () => {
        navigate('/doctor-dashboard')
    }
const handlescheduleClick = () => {

        navigate('/doctor-schedule-list')
    }
    


    const storedString = localStorage.getItem("User");
    const retrievedObject = JSON.parse(storedString);

    console.log('appointment page', { retrievedObject });

    

 const GetDoctorSchedule = () => {
        AppointmentService.GetDoctorSchedule(scheduleId,parseInt(retrievedObject.id))
            .then((response) => {
                if (response) {
                   //setSchedule(response[0]);
                   const appDate = response.appointmentDate.split('/')
                   const scheudlData = {
                    doctorId:response.doctorId,
                    status: response.status,
                    appointmentDate: `${appDate[2]}-${appDate[1]}-${appDate[0]}`,
                    fromHours: response.fromHours,
                    fromMins: response.fromMins,
                    toHours: response.toHours,
                    toMins: response.toMins
                   }
                   formik.setValues(scheudlData);
                    console.log('Edit Schedule',  response )
                }
            })
            .catch((error) => {
                console.error('Error fetching doctor schedule:', error);
            });
    }

    useEffect(() => {
        GetDoctorSchedule();
    },[]);

    

    const formik = useFormik({
        initialValues: {
            doctorId: retrievedObject.id,
            status: 0,
            appointmentDate: '',
            fromHours: '',
            fromMins: '',
            toHours: '',
            toMins: '',
        },
        validationSchema: Yup.object({
            fromHours: Yup.number()
                .required('Hours is required')
                .min(-1, 'Invalid hours')
                .max(24, 'Invalid hours'),

            fromMins: Yup.number().required('Minutes is required')
                .min(-1, 'Invalid minutes')
                .max(59, 'Invalid minutes'),

            toHours: Yup.number()
                .required('Hours is required')
                .min(-1, 'Invalid hours')
                .max(24, 'Invalid hours'),

            toMins: Yup.number().required('Minutes is required')
                .min(-1, 'Invalid minutes')
                .max(59, 'Invalid minutes'),

            appointmentDate: Yup.string().required('Date is required'),

            //doctorId: Yup.string().required('Doctor is required')
        }),
        onSubmit: (values) => {

             //alert(JSON.stringify(values, null, 2));
             const obj= {scheduleId:scheduleId}
             const  scheduleData  = {...values,...obj}
             //alert(JSON.stringify(scheduleData, null, 2));
            AppointmentService.UpdateDoctorScheduleAppointment(scheduleData)
                .then((response) => {
                    console.log('Doctor schedule appointment updated successfully:', response);
                    alert('Doctor schedule appointment updated successfully:');
                    navigate('/doctor-schedule-list');
                })
                .catch((error) => {
                    console.error('Error updating doctors schedule appointment:', error);
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



            {/* <Header name={retrievedObject.name} onLogout={handleLogOut} /> */}



            <hr></hr>

            <Container>
                <div className="container mt-3">
                    <div className="d-flex justify-content-end align-items-center">

                        <button type="button" className="btn btn-primary" onClick={doctorDashboardClick}>Doctor Dashboard</button>&nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={handlescheduleClick}>View Schedule</button>
                    </div>
                </div>
            </Container>

            <div className="container mt-4">
                <h2>Edit Schedule Doctors Appointment</h2>
                <form onSubmit={handleSubmit} noValidate>
                    {[
                        ['Date', 'appointmentDate', 'text', 'yyyy-mm-dd'],
                        ['From Hours', 'fromHours', 'number', ''],
                        ['From Mins', 'fromMins', 'number', ''],
                        ['To Hours', 'toHours', 'number', ''],
                        ['To Mins', 'toMins', 'number', ''],
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

                    <button type="submit" className="btn btn-primary">Save Schedule</button>
                </form>
            </div>
        </div>
    );
};

export default DoctorEditScheduleAppointment