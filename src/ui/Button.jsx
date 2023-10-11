// import React from 'react'

import { Link } from "react-router-dom";

const base =
  "inline-block text-sm font-semibold tracking-wide uppercase transition-colors duration-300 bg-yellow-400 rounded-full text-stone-800 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";

const styles = {
  primary: base + " px-4 py-3 md:px-6 md:py-4",
  small: base + " py-2 px-4 md:px-5 md:py-2.5 text-xs",
  round: base + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  secondary: `inline-block
     border-2
     border-stone-300
     font-semibold 
     tracking-wide 
     uppercase
     text-sm
    transition-colors 
    duration-300 
    bg-stone-300 
    rounded-full
    text-stone-400 
    hover:text-stone-800 
    hover:bg-stone-600 
    focus:outline-none 
    focus:ring
    focus:text-stone-800
    focus:ring-stone-200
    focus:ring-offset-2 
    disabled:cursor-not-allowed
    px-4 py-2.5 md:px-6 md:py-3.5`,
};

export default function Button({ children, disabled, onClick, to, type }) {
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button onClick={onClick} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
