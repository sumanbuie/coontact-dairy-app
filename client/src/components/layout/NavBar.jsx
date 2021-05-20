import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import ContactContext from "../../context/contact/contactContext";
import AuthContext from "../../context/auth/authContext";

export default function NavBar({ title, icon }) {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, user, logout } = authContext;
  const { clearContacts } = contactContext;
  const onLogout = () => {
    logout();
    clearContacts();
  };
  const authLink = (
    <Fragment>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <spam className="hide-sm">Logout</spam>
        </a>
      </li>
    </Fragment>
  );
  const guestLink = (
    <Fragment>
      <li>
        <Link to="/register">Sign Up</Link>
      </li>
      <li>
        <Link to="/login">Sign In</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLink : guestLink}
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}

NavBar.defaultProps = {
  title: "Contact Dairy",
  icon: "fas fa-id-card-alt",
};
