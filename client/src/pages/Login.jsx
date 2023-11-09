import React, { useState, useEffect } from "react";
import styles from "./register.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSnapshot, proxy } from "valtio";
import { useCookies } from "react-cookie";

const state = proxy({
  color: "#EFBD48", // Define your initial state properties here
});

export default function Login() {
  const [details, setDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const snap = useSnapshot(state);
  const [, setCookies] = useCookies(["access_token"]);

  const login = async () => {
    if (details.email.length === 0 || details.password.length === 0)
      toast.error("Please enter all the fields");
    else {
      try {
        const response = await axios.post(
          `http://localhost:3001/user/login`,
          details
        );

        if (response.data.success === false)
          toast.error(
            "Invalid Email-id or password. Please double-check your credentials."
          );
        else {
          console.log(response.data);
          setCookies("access_token", response.data.token);
          window.localStorage.setItem("userID", response.data.userID);

          // Update T-shirt color in the state using set function
          state.color = response.data.tshirtColor.hex;

          navigate("/home");
          toast.success("Login successful");
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="font-montserrat">
        <ToastContainer autoClose={2000} />
        <div className={styles.mainContainer}>
          <div
            className={styles.registerBox}
            onKeyUp={(event) => {
              if (event.key == "Enter") login();
            }}
          >
            <div className={styles.title}>Login</div>

            <div className={styles.inputDiv}>
              <input
                type="email"
                className={styles.inputField}
                placeholder="Email"
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.inputDiv}>
              <input
                type="password"
                className={styles.inputField}
                placeholder="Password"
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                required
              />
            </div>

            <button className={styles.submit} onClick={login}>
              Login
            </button>

            <div className="already">Not registered yet?</div>
            <a href="/register" className={styles.login}>
              Register Now!
            </a>
          </div>
          <div className={styles.imageContainer}>
            <img
              src="/fashion.svg"
              alt="fashion"
              style={{ height: 700, width: 1300 }}
              className={styles.treasurebox}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
