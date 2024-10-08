import React, { useEffect, useState, useContext } from "react";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  Team,
} from "../components/index";
//IMPORTING CONTRCT DATA
import { VOTING_DAPP_CONTEXT } from "../context/context";

const allVotersVoted = () => {
  const [candidates, setCandidates] = useState();

  const { ALL_VOTERS_VOTED } = useContext(VOTING_DAPP_CONTEXT);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await ALL_VOTERS_VOTED();

      console.log(items);

      setCandidates(items);
    };

    fetchData().finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
      <Header />
      <Team candidates={candidates} path={"voter"} />
      <Footer />
    </>
  );
};

export default allVotersVoted;
