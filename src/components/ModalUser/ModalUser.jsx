import React, { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'

export default function ModalUser(props){

  const { register, handleSubmit, watch, errors, getValues, setValue } = useForm();

  const onSubmit = event => {
    console.log(event);
  };

  function validateConfirmPassword(data){
    if(data !== getValues().password){
      return "This field must be equal to password"
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>

          <Form.Control type="hidden" name="id" ref={register()}/>

          
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              ref={register({ required: "This field is required" })}
              isInvalid={errors.email}
              placeholder="Enter email"
            />

            <Form.Control.Feedback type="invalid">
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password" 
              ref={register({ required: "This field is required", minLength: { value: 3, message: "Your input required to be more than 3 characters" } })} 
              isInvalid={errors.password} 
              placeholder="Password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password && errors.password.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password" 
              name="confirmPassword" 
              ref={register({ required: "This field is required", validate: validateConfirmPassword })} 
              isInvalid={errors.confirmPassword} 
              placeholder="Confirm Password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword && errors.confirmPassword.message}
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