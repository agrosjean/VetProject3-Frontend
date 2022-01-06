import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [vets, setVets] = useState([]);
  const [dogs, setDogs] = useState([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vetID, setVetID] = useState("");
  const [dogID, setDogID] = useState("");

  useEffect(() => {
    fetch("http://localhost:9292/appointments")
      .then((response) => response.json())
      .then((appointJson) => {
        setAppointments(appointJson);
      });
  }, []);

  // send request to GET a vet from the list
  useEffect(() => {
    fetch(`http://localhost:9292/vets`)
      .then((response) => response.json())
      .then((vetsJson) => {
        console.log(vetsJson);
        setVets(vetsJson);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9292/dogs`)
      .then((response) => response.json())
      .then((dogsJson) => {
        console.log(dogsJson);
        setDogs(dogsJson);
      });
  }, []);

  const handleDeleteClick = (aptID) => {
    // send a request to delete the row that was clicked
    fetch(`http://localhost:9292/appointments/${aptID}`, {
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

    // Send the new appt info to the backend
    fetch("http://localhost:9292/appointments", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        date: date,
        time: time,
        vet_id: vetID,
        dog_id: dogID,
      }),
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
            <th>Vet</th>
            <th>Date</th>
            <th>Time</th>
            <th>Dog</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr>
              <td>{appointment.id}</td>
              <td>{appointment.vet_id}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.dog_id}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={(event) => handleDeleteClick(appointment.id)}
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
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="Date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            placeholder="Enter Date"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicInformation">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="Time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            placeholder="Time"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicInformation">
          <Form.Label>Vet</Form.Label>
          <Form.Select
            value={vetID}
            onChange={(event) => setVetID(event.target.value)}
            aria-label="Default select example"
            placeholder="Vets"
          >
            <option>Our Vets</option>
            {vets.map((vet) => (
              <option value={vet.id}>{vet.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicInformation">
          <Form.Label>Dog</Form.Label>
          <Form.Select
            value={dogID}
            onChange={(event) => setDogID(event.target.value)}
            aria-label="Default select example"
            placeholder="Dogs"
          >
            <option>Our Dogs</option>
            {dogs.map((dog) => (
              <option value={dog.id}>{dog.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleClick}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Appointments;
