import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AppointmentService from '../services/appointment-service';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const RegistrationForm = () => {
    const navigate = useNavigate();
const handleClick = () => {
    navigate('/login');
}

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      state: '',
      city: '',
      address: '',
      pin: '',
      mobile: '',
      gender: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      age: Yup.number()
        .required('Age is required')
        .min(1, 'Too young')
        .max(120, 'Invalid age'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      address: Yup.string().required('Address is required'),
      pin: Yup.string()
        .required('PIN is required')
        .matches(/^\d{6}$/, 'PIN must be 6 digits'),
      mobile: Yup.string()
        .required('Mobile is required')
        .min(10, 'Mobile Number must be  10 characters')
        .matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
      gender: Yup.string().required('Gender is required'),
      username: Yup.string().required('Username is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: (values) => {
    //   alert(JSON.stringify(values, null, 2));
      const condition = values.gender ==="Male" ? true : false;
      const updatedObject = {
        ...values,
        ...(condition ? { gender: 0 } : {gender:1}), 
      };
     // alert(JSON.stringify(updatedObject, null, 2));

      AppointmentService.Create(updatedObject)
      .then((response) => {
        console.log('Patient registration created successfully:', response);
        //toast('Patient registration created successfully:');
        // localStorage.clear();
        // localStorage.setItem("PatientID", response);
        alert('Patient registration created successfully:');
        navigate('/login'); 
      })
      .catch((error) => {
        console.error('Error creating regitration:', error);
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
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Login</button>
                    </div>
                </div>
            </Container>

      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit} noValidate>
        {[
          ['Name', 'name', 'text'],
          ['Age', 'age', 'number'],
          ['State', 'state', 'text'],
          ['City', 'city', 'text'],
          ['Address', 'address', 'text'],
          ['PIN', 'pin', 'text'],
          ['Mobile', 'mobile', 'text'],
          ['Username', 'username', 'text'],
          ['Password', 'password', 'password'],
        ].map(([label, field, type]) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              name={field}
              value={values[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${touched[field] && errors[field] ? 'is-invalid' : ''}`}
            />
            {touched[field] && errors[field] && (
              <div className="invalid-feedback">{errors[field]}</div>
            )}
          </div>
        ))}

        {/* Gender Radio Buttons */}
        <div className="mb-3">
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
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
