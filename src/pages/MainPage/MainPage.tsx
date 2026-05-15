import React from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <Link to="/">Main</Link> <br />
      <Link to="/about">About</Link>
    </div>
  );
}
