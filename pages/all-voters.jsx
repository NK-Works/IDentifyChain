import { useEffect, useState, useContext } from "react";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  Team,
} from "../components/index";
import { VOTING_DAPP_CONTEXT } from "../context/context";

const registerVoters = () => {
  const [candidates, setCandidates] = useState();
  const [loading, setLoading] = useState();
  const { GET_REGISTER_VOTERS } = useContext(VOTING_DAPP_CONTEXT);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await GET_REGISTER_VOTERS();
      setCandidates(items);
      console.log(items);
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

export default registerVoters;
