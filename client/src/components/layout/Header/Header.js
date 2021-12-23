import React from "react";
import { useState, useEffect } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom'
import classes from "./Header.module.scss";
function Header() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 760 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const handleMenu = () => {
    setMenuOpen(p => !p);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <h2 className={classes.header__content__logo}>navbar</h2>

        <nav
          className={`${classes.header__content__nav} ${
            menuOpen ? classes.isMenu : ""
          }`}
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/feed">Feed</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            
          </ul>
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={handleMenu} />
          ) : (
            <AiOutlineClose onClick={handleMenu} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;