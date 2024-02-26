import "./App.css";
import Navbar from "./commponents/Header/Navbar";
import Newnav from "./commponents/newnav/Newnav";
import Maincomp from "./commponents/home/Maincomp";
import Footer from "./commponents/footer/Footer";
import SignUp from "./commponents/signUp_signin/SignUp";
import Sign_in from "./commponents/signUp_signin/Sign_in";
import Cart from "./commponents/cart/Cart";
import Buynow from "./commponents/buynow/Buynow";
import CircularProgress from "@mui/material/CircularProgress";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 1000);
  }, []);

  return (
    <>
      {
        data ? (
          <>
           
       <Navbar></Navbar>
        <Newnav />
        <Routes>
        <Route path="/" element={<Maincomp />} />
        <Route path="/login" element={<Sign_in />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<Buynow />} />
      </Routes>
      <Footer />
          </>
        ) : (
          <div className="circle">
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )
      }

    </>
  );
}

export default App;


