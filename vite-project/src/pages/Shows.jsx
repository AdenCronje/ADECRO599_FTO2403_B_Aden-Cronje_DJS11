import React from "react";
import { Link, NavLink } from "react-router-dom";
import Header from "../components/Header";

export default function Shows() {
  return (
    <>
      <div>
        <h1 className="text-3xl text-left">All available shows</h1>
      </div>
      {/* <h1>All available shows</h1> */}
      <div>
        <nav>
          <Header />
        </nav>
      </div>
    </>
  );
}
