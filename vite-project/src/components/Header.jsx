import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="">
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link className="nav">Favorites</Link>
        </li>
      </nav>
    </header>
  );
}
