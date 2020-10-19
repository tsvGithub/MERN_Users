import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./Home.css";

const Home = () => {
  //state for all users
  const [users, setUsers] = useState([]);

  //grab all users frm DB BE
  const getUsers = async () => {
    //request to BE for all users
    const res = await Axios.get("/api/users");
    console.log(res.data.users);
    //update State with what is coming from BE
    setUsers(res.data.users);
  };
  //call getUsers after page is loaded
  useEffect(() => {
    getUsers();
  }, []);
  //if thete are users => display
  const allUsers =
    users.length > 0 &&
    users.map((user, index) => {
      return (
        <li key={index}>
          Name: {user.name} || Email: {user.email}{" "}
        </li>
      );
    });
  const title = users.length > 0 ? "All Users" : "No Users Found";
  return (
    <div className="container">
      <h1 className="title">{title}</h1>
      <ul className="users">{allUsers}</ul>
    </div>
  );
};

export default Home;
