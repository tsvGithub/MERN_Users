import React, { useState } from "react";
import "./Form.css";

import axios from "axios";

const Form = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
    message: "",
  });
  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  //----------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    //stringify 'dataFromForm' to send from FE to BE
    const dataFromForm = JSON.stringify({
      userName: userDetails.userName,
      userEmail: userDetails.userEmail,
    });
    //response => is RESPONSE from BE to FE
    const response = await axios.post("/api/register", dataFromForm, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //update the State message
    setUserDetails({
      //grab everything that was there from before on that State
      ...userDetails,
      //message of State will be what is coming from the DB
      message: response.data.message,
    });

    console.log(response); // message: "User Submited" or "That Email is already registered" (from server app.js)
  };
  //------------------------
  return (
    <div className="container">
      <h1 className="title">Register User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name:</label>
        <input type="text" required id="userName" name="userName" onChange={handleChange} />
        <label htmlFor="">Email:</label>
        <input type="email" required id="userEmail" name="userEmail" onChange={handleChange} />
        <button type="submit">Register</button>
        {userDetails.message ? <h1 className="resultMessage">{userDetails.message}</h1> : null}
      </form>
    </div>
  );
};

export default Form;
