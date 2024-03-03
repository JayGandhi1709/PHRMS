import React, { useEffect,useState } from "react";

import About from "../../components/UI/About";
import Counter from "../../components/UI/Counter";
import Hero from "../../components/UI/Hero";
import Services from "../../components/UI/Services";
import StepsUse from "../../components/UI/StepsUse";
import Header from "../../components/Header/Header";
// import Testimonial from "../../components/UI/Testimonial";
import Newsletter from "../../components/UI/Newsletter";
import Footer from "../../components/Footer/Footer";
import { BACKENDURL } from "../../App";
// import { BACKENDURL } from "../../App";

// const Home = ({ theme,toggleTheme }) => {
const Home = (props) => {
  const [logedIn, setLogedIn] = useState(false);
  
  useEffect(() => {
    async function checkLogin() {
      const res = await fetch(`${BACKENDURL}/auth`);
      const data = await res.json();

      console.log(data);
      if (data.errors) {
        console.log("Not Logedin");
        // console.log(logedIn);
      } else {
        setLogedIn(data.msg);
        console.log(logedIn);
        // setLogedIn(true);
      }
    }
    checkLogin();
  }, [logedIn]);

  return (
    <div>
      <Header {...props} logedIn={logedIn} />
      <Hero theme={props.theme} />
      <Counter theme={props.theme} />
      <Services />
      <About />
      <StepsUse theme={props.theme} />
      {/* <Testimonial /> */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
