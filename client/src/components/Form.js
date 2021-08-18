import React, { useState } from "react";

import "./Form.css";

import axios from "axios";

const initialState = {
  userName: "",
  userEmail: "",
};

const Form = () => {
  const [person, setPerson] = useState(initialState);
  const [people, setPeople] = useState([]);
  const [message, setMessage] = useState("");

  //--------------------------
  // Form inputs
  const handleChange = (e) => {
    //access event Object
    const name = e.target.name;
    const value = e.target.value;
    //set state 'person'
    setPerson({
      //spread out 'person' object to preserve all properties,
      ...person,
      //update what is changed [e.target.name]: e.target.value,
      [name]: value,
    });
  };
  //-----------------------------
  //Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //stringify 'dataFromForm' to send from FE to BE
    const dataFromForm = JSON.stringify({
      userName: person.userName,
      userEmail: person.userEmail,
    });

    //!!!'res' is actually 'request' from FE to BE, what we send to BE to create a new user
    const res = await axios.post("/api/register", dataFromForm, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //update 'people' array
    setPeople([...people, person]);
    // message: "User Submited" or "That Email is already registered" (from BE app.js)
    setMessage(res.data.message);
    //clear inputs
    setPerson({ userName: "", userEmail: "" });

    console.log(res);
  };
  //------------------------
  return (
    <div className="container form">
      <h1 className="title">Register User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Name:</label>
        <input
          type="text"
          required
          //person object first name
          name="userName"
          value={person.userName}
          onChange={handleChange}
        />
        <label htmlFor="userEmail">Email:</label>
        <input type="email" required name="userEmail" value={person.userEmail} onChange={handleChange} />
        <button type="submit">Submit</button>
        {message ? <h1 className="resultMessage">{message}</h1> : null}
      </form>
    </div>
  );
};

export default Form;
