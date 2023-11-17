import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Register() {
  const [details, setDetails] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async () => {
    if (details.email.length === 0)
      toast.error("Please enter your Email address");
    else if (details.name.length === 0)
      toast.error("Please enter your Full Name");
    else if (details.password.length < 8)
      toast.error("Password must be at least 8 characters");
    else {
      try {
        setLoading(true);
        const response = await axios.post(
          `https://backend-3d-tshirt-app.onrender.com/user/register`,
          details
        );
        console.log(response.data)
        if (response.data.success === false) toast.error(response.data.message);
        else {
          navigate("/");
          toast.success("Registration successful. Login to continue.");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="font-montserrat">
      <div className={styles.mainContainer}>
        <div
          className={styles.registerBox}
          onKeyUp={(event) => {
            if (event.key == "Enter") register();
          }}
        >
          <div className={styles.title}>Register</div>{" "}
          <div className={styles.inputDiv}>
            <input
              type="name"
              className={styles.inputField}
              placeholder="Name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              required
            />
          </div>
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
              placeholder="Create New Password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              required
            />
          </div>
          <button
            className={styles.submit}
            disabled={loading}
            onClick={register}
          >
            {loading ? (
              <Loading
                color={"#000"}
                height={"40%"}
                width={"20%"}
                divHeight={"20px"}
                divWidth={"128px"}
              />
            ) : (
              "Register"
            )}
          </button>
          <div className={styles.already}>Already Registered?</div>
          <a href="/" className={styles.login}>
            Login
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
  );
}
