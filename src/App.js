import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import ModalUser from './components/ModalUser/ModalUser.jsx';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import axios from 'axios';

function App() {
  
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [userEdit, setUserEdit] = useState();

  const baseURL = 'http://localhost:3001';

  useEffect(() => {
    axios.get(baseURL)
      .then(res => {
        console.log(res);
      });
  }, []);

  const userList = [
    { id: 1, email: "teste@teste", password: "teste", confirmPassword: "teste" },
    { id: 2, email: "teste2@teste", password: "teste2", confirmPassword: "teste2" }
  ];

  function editUser(data){
    setUserEdit(data);
    setShowModalForm(true);
  }

  function hideModalForm(){
    setUserEdit();
    setShowModalForm(false);
  }

  const tableContent = userList.map((user) => 
    <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>{user.confirmPassword}</td>
      <td>
        <ButtonToolbar>
          <Button variant="primary" className="button-edit" onClick={() => editUser(user)}>Edit</Button>
          <Button variant="danger" onClick={() => setShowModalConfirmDelete(true)}>Delete</Button>
        </ButtonToolbar>
      </td>
    </tr>
  );

  return (
    <div className="App">
      <header>
        <Navbar expand="lg" variant="dark" bg="dark">
          <Navbar.Brand href="#">CRUD React.js</Navbar.Brand>
        </Navbar>
      </header>
      <section>
        <div className="div-card">
          <Card className="card-table">
            <Card.Header>Users</Card.Header>
            <Card.Body>
              <Button className="button-create" onClick={() => setShowModalForm(true)} variant="success">Register</Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>E-mail</th>
                    <th>Password</th>
                    <th>Password Confirmation</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {tableContent}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
        

        <Modal show={showModalConfirmDelete} onHide={() => setShowModalConfirmDelete(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure of this?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModalConfirmDelete(false)}>
              Cancel
            </Button>
            <Button variant="primary">
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <ModalUser user={userEdit} show={showModalForm} onHide={hideModalForm}></ModalUser>

      </section>
    </div>
  );
}

export default App;
