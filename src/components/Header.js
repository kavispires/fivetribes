import React from "react";

const Header = () => {
  return (
    <header className="screen-header">
      <img
        src={`${process.env.PUBLIC_URL}/images/logo.svg`}
        alt="Five Tribes Logo"
      />
    </header>
  );
};

export default Header;
