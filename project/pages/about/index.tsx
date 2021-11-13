import React, {ReactElement} from "react";
import {NextPageWithLayout} from "../_app";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

interface AboutProps {
}

const About: NextPageWithLayout<AboutProps> = () => {
  return <h1>about page</h1>;
};

export default About;

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header/>
      {page}
      <Footer/>
    </>
  );
};
