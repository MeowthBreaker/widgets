import React, { ReactNode } from "react";
import "./App.css";

import { Calendar } from "./Calendar/Calendar";
import { Slider } from "./Slider/Slider";
import { Tick } from './Tick/Tick';


import img1 from "./images/img-1.jpg";
import img2 from "./images/img-2.jpg";
import img3 from "./images/img-3.jpg";
import img4 from "./images/img-4.jpg";
import img5 from "./images/img-5.jpg";
import img6 from "./images/img-6.jpg";
import img7 from "./images/img-7.jpg";
import img8 from "./images/img-8.jpg";
import img9 from "./images/img-9.jpg";
import img10 from "./images/img-10.jpg";
import img11 from "./images/img-11.jpg";

function App() {
  const images: ReactNode[] = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
  ].map((image) => <img className="slider__image" src={image}></img>);


  return (
    <>
      <Slider amount={3} content={images}></Slider>
      <Calendar></Calendar>
      <Tick size={300}></Tick>
    </>
  );
}

export default App;
