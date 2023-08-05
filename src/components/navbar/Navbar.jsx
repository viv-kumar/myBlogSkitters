"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import classes from "./navbar.module.css";
import person from "../../../public/person.jpg";
import { AiOutlineClose } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();
  // console.log(session)

  const handleShowDropdown = () => setShowDropdown((prev) => true);

  const handleHideDropdown = () => setShowDropdown((prev) => false);

  // const loggedIn = false;

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.left}>
          <Link href="/">Skitter&apos;s</Link>
        </h2>
        <ul className={classes.right}>
          {session?.user ? (
            <div>
              {/* <Image
                onClick={handleShowDropdown}
                src={person}
                width="45"
                height="45"
                alt="img"
              /> */}
              <p className={classes.para} onClick={handleShowDropdown}>
                {session.user.email.charAt(0)}
              </p>
              {showDropdown && (
                <div className={classes.dropdown}>
                  <AiOutlineClose
                    className={classes.closeIcon}
                    onClick={handleHideDropdown}
                  />
                  <button
                    onClick={() => {
                      signOut();
                      handleHideDropdown();
                    }}
                    className={classes.logout}
                  >
                    Logout
                  </button>
                  <Link
                    onClick={handleHideDropdown}
                    href="/create-blog"
                    className={classes.create}
                  >
                    Create
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  signIn();
                }}
                className={classes.login}
              >
                Log in
              </button>
              <Link href="/register">Register</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
