import React from "react";
import { Link } from "react-router-dom";

function NavBar({ id, name, action }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/" className="btn btn-link">
            Go Home
          </Link>
        </li>
        {name && (
          <li className="breadcrumb-item">
            <Link to={`/decks/${id}`} className="btn btn-link">
              {name}
            </Link>
          </li>
        )}
        {action && (
          <li className="breadcrumb-item">
            <p className="btn btn-link">{action}</p>
          </li>
        )}
      </ol>
    </nav>
  );
}

export default NavBar;
