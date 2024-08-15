import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  // Styling for header links
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <header>
      <Link to="/">#Casts</Link>
      <nav></nav>
    </header>
  );
}
