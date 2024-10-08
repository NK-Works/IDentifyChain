import React from "react";
import {
  Cursor,
  ScrollToTop,
  Footer,
  Header,
  RoadMap,
} from "../components/index";

const roadmap = () => {
  return (
    <>
      <ScrollToTop />
      <Cursor />
      <Header />
      <RoadMap />
      <Footer />
    </>
  );
};

export default roadmap;
