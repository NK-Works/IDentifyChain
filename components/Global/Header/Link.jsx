import React from "react";
import NextLink from "next/link";

const Link = () => {
  const navMenu = [
    {
      link: "/",
      menu: "Home",
    },
    {
      link: "/",
      menu: "Markets",
    },
    {
      link: "/",
      menu: "Company",
    },
    {
      link: "/",
      menu: "Education",
    },
    {
      link: "/",
      menu: "Resources",
    },
  ];
  return (
    <div
      className="collapse navbar-collapse justify-content-center"
      id="navbar-content"
    >
      <ul className="navbar-nav gap-2 gap-lg-3 gap-xxl-8  align-self-center mx-auto mt-4 mt-lg-0">
        {navMenu.map((menu, index) => (
          <li key={index + 1} className="dropdown show-dropdown">
            <NextLink className=" dropdown-nav" href={menu.menu}>
              {menu.menu}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Link;
