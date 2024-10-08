import React from "react";

const Input = ({ name, placeholder, type, handleClick }) => {
  return (
    <div className="single-input">
      <label className="mb-2 nw1-color" htmlFor="lname">
        {name}
      </label>
      <input
        type={type}
        className="fs-six-up bg_transparent"
        name={name}
        id={name}
        placeholder={placeholder}
        required
        onChange={handleClick}
      />
    </div>
  );
};

export default Input;
