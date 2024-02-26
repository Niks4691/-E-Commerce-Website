import React, { useContext, useState } from 'react'
import "./signup.css";
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Logincontext } from '../context/Contextprovider';

const Sign_in = () => {
  const [logdata, setdata] = useState({
    email: "",
    password: "",
  });
  // console.log(logdata);

  const { account, setAccount } = useContext(Logincontext);

  const adddata = (e) => {
    const { name, value } = e.target;

    setdata(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();

    const { email, password } = logdata;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status == 400 || !data) {
      console.log("invalid details");
      toast.warn("invalid details",{
        position:"top-center",
      })
    }
    else{
       console.log("data is valid")
       setAccount(data);
       toast.success("Login Successfully done 😃!",{
        position:"top-center",
      })

       setdata({...logdata,email:"",password:""});
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img
            src="https://banner2.cleanpng.com/20180807/ysj/kisspng-responsive-web-design-website-development-e-commer-5b69834be31cc0.2827101115336415479303.jpg"
            alt=" "
          />
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>sign-In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={adddata}
                value={logdata.email}
                name="email"
                id="email"
                placeholder="Please Entre your Email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={adddata}
                value={logdata.password}
                name="password"
                id="password"
                placeholder="Atlist 6 char"
              />
            </div>
            <button className="signin_btn" onClick={senddata}>
              Continue
            </button>
          </form>
        </div>
        <div className="create_accountinfo">
          <p>New To E-Com</p>
          <NavLink to="/register">
            {" "}
            <button>Create Your E-Com account</button>
          </NavLink>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default Sign_in;
