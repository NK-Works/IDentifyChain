import React, { useState, useEffect, useContext } from "react";

//INTERNAL INPORT
import {
  Cursor,
  Preloader,
  ChatBot,
  ScrollToTop,
  Footer,
  Header,
  HeroSection,
  WhyVote,
  Blog,
  Provide,
  Vote,
} from "../components/index";

import { VOTING_DAPP_CONTEXT } from "../context/context";

const index = () => {
  const [initialData, setInitialData] = useState();
  const [higest, setHigest] = useState();
  const [loading, setLoading] = useState(false);

  const { HIGHEST_VOTED_CANDIDATE, INITIAL_CONTRACT_DATA } =
    useContext(VOTING_DAPP_CONTEXT);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await HIGHEST_VOTED_CANDIDATE();
      const initialData = await INITIAL_CONTRACT_DATA();

      setHigest(items);
      setInitialData(initialData);
      console.log(items);
      console.log(initialData);
    };

    fetchData().finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <ChatBot />
      <Cursor />
      <Header />
      <HeroSection initialData={initialData} higest={higest} />
      <WhyVote />
      <Provide />
      <Vote />
      <Blog />
      <Footer />
    </>
  );
};

export default index;
