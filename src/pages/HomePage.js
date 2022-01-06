import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";

function HomePage() {
  const [vets, setVets] = useState([]);
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");

  useEffect(() => {
    fetch("http://localhost:9292/vets")
      .then((response) => response.json())
      .then((vetsJson) => {
        setVets(vetsJson);
      });
  }, []);

  const handleDeleteClick = (vetID) => {
    // send a request to delete the row that was clicked
    fetch(`http://localhost:9292/vets/${vetID}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((resp) => {
      // After send success, then refresh page
      window.location.reload();
    });
  };

  const handleClick = (event) => {
    event.preventDefault();

    // Send the new dog info to the backend
    fetch("http://localhost:9292/vets", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name, information: information }),
    }).then((resp) => {
      // After send success, then refresh page
      window.location.reload();
    });
  };

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Information</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {vets.map((vet) => (
            <tr>
              <td>{vet.id}</td>
              <td>{vet.name}</td>
              <td>{vet.information}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={(event) => handleDeleteClick(vet.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicInformation">
          <Form.Label>Information</Form.Label>
          <Form.Control
            type="Information"
            value={information}
            onChange={(event) => setInformation(event.target.value)}
            placeholder="Information"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleClick}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default HomePage;
