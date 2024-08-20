import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl">Welcome to Anything_Goes_Casts🎧</h1>
      <h3 className="text-center my-14">
        Welcome to your gateway to endless stories and insights! Whether you’re
        on the go or lounging at home, we’ve got the perfect podcast for every
        moment. Tune in, explore, and let us guide you through your next audio
        adventure!
      </h3>
      <div className="text-center">
        <Link to="/Shows" className="text-xl font-bold">
          Find your first show
        </Link>
      </div>
    </div>
  );
}
