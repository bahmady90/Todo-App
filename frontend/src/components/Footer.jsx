import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="gradient-background">

      <h2>Copyright ⓒ {year}</h2>
      
    </footer>
  );
}

export default Footer;
