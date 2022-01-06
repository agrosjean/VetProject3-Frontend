import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";

function Dogs() {
  const [dogs, setDogs] = useState([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  useEffect(() => {
    fetch("http://localhost:9292/dogs")
      .then((response) => response.json())
      .then((dogsJson) => {
        setDogs(dogsJson);
      });
  }, []);

  const handleClick = (event) => {
    event.preventDefault();

    // Send the new dog info to the backend
    fetch("http://localhost:9292/dogs", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name, breed: breed }),
    }).then((resp) => {
      // After send success, then refresh page
      window.location.reload();
    });
  };

  const handleDeleteClick = (dogID) => {
    // send a request to delete the row that was clicked
    fetch(`http://localhost:9292/dogs/${dogID}`, {
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

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Breed</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog) => (
            <tr>
              <td>{dog.id}</td>
              <td>{dog.name}</td>
              <td>{dog.breed}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={(event) => handleDeleteClick(dog.id)}
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

        <Form.Group className="mb-3" controlId="formBasicBreed">
          <Form.Label>Breed</Form.Label>
          <Form.Control
            type="Breed"
            value={breed}
            onChange={(event) => setBreed(event.target.value)}
            placeholder="Breed"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleClick}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Dogs;
