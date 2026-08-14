import React, { useState} from "react";
import "./LoginForm.css";
import { Cross_icon } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import { useContext } from "react";
import axios from "axios";

function LoginForm({ setFormOpen }) {
    const [currentState, setCurrentState] = useState("Login");
    const {Url,setToken} = useContext(StoreContext)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

  const handelLogin = async(event) =>{
    event.preventDefault();
   let newUrl = Url;
   if(currentState === "Login"){
     newUrl += "/api/user/login"
   }else{
    newUrl += "/api/user/register"
   }
     const response = await axios.post(newUrl,data);
     if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setFormOpen(false);
     }else{
        alert(response.data.message)
     }
  }

    return (
        <div className="login-open">
            <form onSubmit={handelLogin} className="login-container">
                <div className="login-title">
                    <h2>{currentState}</h2>
                    <img
                        onClick={() => setFormOpen(false)}
                        src={Cross_icon}
                        alt="close"
                    />
                </div>

                <div className="login-from-input">
                    {currentState === "Login" ? null : (
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            placeholder="Your Name"
                            required
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        placeholder="Your Email"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        placeholder="Your Password"
                        required
                    />
                </div>

                <div className="login-form-checkbox">
                    <input type="checkbox" required />
                    <p>
                        By creating an account, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>

                <button type="submit">
                    {currentState === "Sign Up" ? "Create Account" : "Login"}
                </button>

                {currentState === "Login" ? (
                    <p>
                        Create A New Account{" "}
                        <span onClick={() => setCurrentState("Sign Up")}>
                            Click Here
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setCurrentState("Login")}>
                            Login
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
}

export default LoginForm;