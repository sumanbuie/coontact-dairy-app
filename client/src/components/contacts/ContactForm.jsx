import { set } from "mongoose";
import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

export default function ContactForm() {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateConact } = contactContext;
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      console.log(contact);
      updateConact(contact);
    }
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };
  const clearAll = () => {
    clearCurrent();
  };
  return (
    <form method="POST" onSubmit={onSubmit}>
      <h2 className="text-primary">
        {!current ? "Add Contact" : "Edit Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        name="name"
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={onChange}
        value={email}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        name="phone"
        onChange={onChange}
      />
      <h5>Contact Type : </h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      personal{" "}
      <input
        type="radio"
        name="type"
        value="profassional"
        checked={type === "profassional"}
        onChange={onChange}
      />{" "}
      personal{" "}
      <div>
        <input
          type="submit"
          value={!current ? "Add Contact" : "update Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
}
