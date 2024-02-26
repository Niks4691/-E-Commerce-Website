import { Divider } from "@mui/material";
import React, { useEffect } from "react";
import Banner from "./Banner";
import "../home/home.css";
import Slide from "./Slide";
import { getProducts } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

const Maincomp = () => {
  const { products } = useSelector((state) => state.getproductsdata);
  console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>
      <div className="slide_part">
        <div className="left_slide">
          <Slide title="Deal of Rthe Day" products={products} />
        </div>
        <div className="right_slide">
          <h4>Republic Day Offer</h4>
          <img
            src="https://i.pinimg.com/474x/b5/29/8e/b5298e4fdfd59daaa69e8fcc2ba89942.jpg"
            id=""
            alt="img"
          ></img>
          <a href="#">See More</a>
        </div>
      </div>
      <img
        src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/e950dea8b3bf4907.jpg?q=20
"
        alt="img"
      />
      <Slide title="Today's Deal" products={products} />
      <div className="center_img">
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/629a3c9caacbc0bf.jpeg?q=20
"
          alt="img"
        />
      </div>
      <Slide title="Best Seller" products={products} />
      <img
        src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-25124-DailyBanner-Z5-P4-Adidas-Nike-min30.jpg
"
        alt="img"
      />
      <Slide title="Upto 80% off" products={products} />
    </div>
  );
};

export default Maincomp;
