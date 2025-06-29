import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import AppointmentService from '../services/appointment-service';
import { useNavigate } from 'react-router-dom';


const Login = () => {
const navigate = useNavigate();

const handleClick = () => {
    navigate('/');
}
    const users = [
        { user: 1, name: 'Patient' },
        { user: 2, name: 'Doctor' },
    ];
    const location = useLocation();
    //const data = location.state; //{name:'Test'};
    // console.log(data);

    const formik = useFormik({
        initialValues: {
            user: '',
            userName: '',
            password: '',
        },
        validationSchema: Yup.object({
            user: Yup.string().required('Select user type'),
            userName: Yup.string().required('User name required'),
            password: Yup.string().required('Password  required'),
        }),
        onSubmit: (values) => {

            // alert(JSON.stringify(values, null, 2));

            AppointmentService.Login(values)
                .then((response) => {
                    console.log('Logged in successfully:', response);
                    //alert('Patient appointment created successfully:');
                     

                    if (response !== undefined) {
                        localStorage.clear();
                        localStorage.setItem("User", JSON.stringify(response));
                        if (values.user === "1") {
                            navigate('/appointment');
                        }
                        else {
                            navigate('/doctor-dashboard');
                        }
                    }
                    else {
                        alert('Invalid credentials.');
                    }
                    
                })
                .catch((error) => {
                    console.error('Error Logged In:', error);
                });

        },


    });

    const { values, handleChange, handleSubmit, errors, touched, handleBlur } = formik;

    return (
        <div className="container mt-4">

            <div className="container mt-4">

                   <div className="bg-primary text-white text-center py-3 mb-4">
                        <h1 className="display-6">Doctor Appointment Application</h1>
                        <p className="lead">Your Health, Our Priority !!!</p>
                    </div>      

                <h2>Login</h2>
                <form onSubmit={handleSubmit} noValidate>

                    <div className="mb-3">
                        <label className="form-label">User Type</label>
                        <select
                            name="user"
                            className={`form-select ${touched.user && errors.user ? 'is-invalid' : ''}`}
                            value={values.user}
                            onChange={handleChange}
                        >
                            <option value={0}>-- Select User Type --</option>
                            {users.map((u) => (
                                <option key={u.user} value={u.user}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                        {touched.user && errors.user && (
                            <div className="invalid-feedback">{errors.user}</div>
                        )}
                    </div>

                    {[
                        ['User Name', 'userName', 'text', 'Enter user name'],
                        ['Password', 'password', 'password', 'Enter password'],
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



                    <button type="submit" className="btn btn-primary">Login</button>&nbsp;&nbsp;
                    <button type="button" className="btn btn-primary" onClick={handleClick} >Regisration</button>
                </form>
            </div>
        </div>
    );
};

export default Login