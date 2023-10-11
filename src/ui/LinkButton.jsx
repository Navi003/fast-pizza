// import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const className = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

export default function LinkButton({ children, to }) {
  const navigate = useNavigate();

  if (to === "-1") {
    return (
      <button className={className} onClick={() => navigate(-1)}>
        &larr; Go back
      </button>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
