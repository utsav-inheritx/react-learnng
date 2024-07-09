import React, { useState, useEffect } from "react";
import './BasicForm.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const BasicForm = () => {
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        mobileNumber: "",
        password: "",
        errors: {},
    });

    const [showPassword, setShowPassword] = useState(false);
    const [storedData, setStoredData] = useState([]);

    useEffect(() => {
        // Fetch data from local storage on component mount
        const data = JSON.parse(localStorage.getItem('showData')) || [];
        setStoredData(data);
    }, []);

    // Handle Change Event
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.firstName) {
            errors.firstName = "First Name is required";
        }

        if (!formData.lastName) {
            errors.lastName = "Last Name is required";
        }

        if (!formData.userName) {
            errors.userName = "User Name is required";
        }

        if (!formData.email) {
            errors.email = "Email is required";
        }

        if (!formData.mobileNumber) {
            errors.mobileNumber = "Mobile Number is required";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        }

        setFormData((prevState) => ({ ...prevState, errors }));

        // Return true if there are no errors
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            const existingData = JSON.parse(localStorage.getItem('showData')) || [];
            existingData.push({ ...formData, errors: {} });
            localStorage.setItem('showData', JSON.stringify(existingData));
            alert("Data inserted successfully");
            setStoredData(existingData); 
            // Clear the form
            setFormData({
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
                mobileNumber: "",
                password: "",
                errors: {},
            });
        } else {
            alert("Please fill the form");
        }
    };

    // const handleDelete = (index) => {
    //     const updatedData = storedData.filter((_, i) => i !== index);
    //     localStorage.setItem('showData', JSON.stringify(updatedData));
    //     setStoredData(updatedData);
    // };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <h1>Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Enter First Name" value={formData.firstName} onChange={handleChange} />
                    {formData.errors.firstName && (
                        <p style={{ color: "red" }}>{formData.errors.firstName}</p>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Enter Last Name" value={formData.lastName} onChange={handleChange} />
                    {formData.errors.lastName && (
                        <p style={{ color: "red" }}>{formData.errors.lastName}</p>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" name="userName" placeholder="Enter UserName" value={formData.userName} onChange={handleChange} />
                    {formData.errors.userName && (
                        <p style={{ color: "red" }}>{formData.errors.userName}</p>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Id</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email Id" value={formData.email} onChange={handleChange} />
                    {formData.errors.email && (
                        <p style={{ color: "red" }}>{formData.errors.email}</p>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMobileNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="tel" name="mobileNumber" placeholder="Enter Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
                    {formData.errors.mobileNumber && (
                        <p style={{ color: "red" }}>{formData.errors.mobileNumber}</p>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
                        <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </InputGroup.Text>
                    </InputGroup>
                    {formData.errors.password && (
                        <p style={{ color: "red" }}>{formData.errors.password}</p>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <h2>Stored Data</h2>
            {storedData.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {storedData.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.userName}</td>
                                <td>{data.email}</td>
                                <td>{data.mobileNumber}</td>
                                {/* <td>
                                    <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default BasicForm;