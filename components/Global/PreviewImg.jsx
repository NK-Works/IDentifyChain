import React from "react";

const PreviewImg = ({ image }) => {
  return (
    <img
      src={image}
      alt="profile"
      style={{
        with: "100px",
        height: "100px",
      }}
    />
  );
};

export default PreviewImg;
