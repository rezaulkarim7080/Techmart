/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Faq from './../components/layouts/Faq';
import Hero1 from "../components/layouts/Hero1";
import Categories from "./Categories";
import HomeProduct from "../components/layouts/HomeProduct";
import CallToAction2 from "../components/layouts/CallToAction2";
import CallToAction4 from "../components/layouts/CallToAction4";
import Footer from '../components/layouts/Footer';




const Home = () => {
  return (
    <div >
      <Hero1 />
      <div className="px-5">
        <CallToAction2 />
        <CallToAction4 />
        <Categories />
        <HomeProduct />
        <Faq />


      </div>

      <Footer />
    </div>


  );
};

export default Home;
