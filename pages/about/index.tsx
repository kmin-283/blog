import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

const About: NextPageWithLayout = () => {
  return <h1>about page</h1>;
};

export default About;

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
};