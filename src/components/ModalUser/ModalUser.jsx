import React, { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function ModalUser(props){

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validated, setValidated] = useState(false);

  const [errorEmail, setErrorEmail] = useState({
    error: false,
    message: '' 
  });

  const [errorPassword, setErrorPassword] = useState({
    error: false,
    message: '' 
  });

  const [errorConfirmPassword, setErrorConfirmPassword] = useState({
    error: false,
    message: '' 
  });

  // function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  const validateEmail = () => {
    if(inputs.email === ''){
      setErrorEmail({
        error: true,
        message: "This field is required" 
      });
      return 1;
    }else{
      setErrorEmail({
        error: false,
        message: "" 
      });
    }
    return 0;
  }

  const validatePassword = () => {
    if(inputs.password === ''){
      setErrorPassword({
        error: true,
        message: "This field is required" 
      });
      return 1;
    }else{
      setErrorPassword({
        error: false,
        message: "" 
      });
    }
    return 0;
  }

  const validateConfirmPassword = () => {
    if(inputs.confirmPassword === ''){
      setErrorConfirmPassword({
        error: true,
        message: "This field is required" 
      });
      return 1;
    }else{
      setErrorConfirmPassword({
        error: false,
        message: "" 
      });
    }
    return 0;
  }

  const validate = field =>{
    let isValid = 0;

    console.log(field);

    if(!field){
      
      isValid += validateEmail();
      isValid += validatePassword();
      isValid += validateConfirmPassword();

      if(isValid !== 0){
        setValidated(true);
      }

    }else{

      switch (field) {
        case 'email':
          isValid += validateEmail();
          break;

        case 'password':
          isValid += validatePassword();
          break;

        case 'confirmPassword':
          isValid += validateConfirmPassword();
          break;
      
        default:
          break;
      }

    }

    if(isValid !== 0){
      return false;
    }

    return true;
  }

  const handleSubmit = event => {
    event.preventDefault();
    
    if(!validate()){
      return;
    }

    console.log(event);
  };


  const handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setInputs({
      ...inputs,
      [name]: value
    });

    console.log(validated);
  
    if(validated){
      validate([name]);
    }
    
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Register
        </Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Body>

          <Form.Control type="hidden" name="id"/>
          
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              isInvalid={errorEmail.error}
              value={inputs.email}
            />

            <Form.Control.Feedback type="invalid">
              {errorEmail.error && errorEmail.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password" 
              placeholder="Password"
              onChange={handleChange}
              isInvalid={errorPassword.error}
              value={inputs.password}
            />
            <Form.Control.Feedback type="invalid">
              {errorPassword.error && errorPassword.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm Password"
              onChange={handleChange}
              isInvalid={errorConfirmPassword.error}
              value={inputs.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errorConfirmPassword.error && errorConfirmPassword.message}
            </Form.Control.Feedback>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Cancel</Button>
          <Button variant="success" type="submit">Register</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}