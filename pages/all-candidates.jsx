import { useEffect, useState, useContext } from "react";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  Team,
} from "../components/index";
import Loader from "../components/Global/Loader";
import { VOTING_DAPP_CONTEXT } from "../context/context";

const registerCandidate = () => {
  const [candidates, setCandidates] = useState();
  const [votingTime, setVotingTime] = useState();
  const [currentVotingTime, setCurrentVotingTime] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const {
    loader,
    GET_REGISTER_CANDIDATES,
    GIVE_VOTE,
    checkVote,
    INITIAL_CONTRACT_DATA,
    GET_SINGLE_VOTER,
    checkIfWalletIsConnected,
  } = useContext(VOTING_DAPP_CONTEXT);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await GET_REGISTER_CANDIDATES();
      setCandidates(items);

      const votingStatus = await INITIAL_CONTRACT_DATA();
      setVotingTime(votingStatus);

      const nowInMilliseconds = Date.now();
      const nowInSeconds = Math.floor(nowInMilliseconds / 1000);
      setCurrentVotingTime(nowInSeconds);

      const address = await checkIfWalletIsConnected();

      if (address) {
        const user = await GET_SINGLE_VOTER(address);
        setUser(user);
        console.log(user);
      }
    };

    fetchData().finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
      <Header />
      <Team
        candidates={candidates}
        path={"candidate"}
        GIVE_VOTE={GIVE_VOTE}
        checkVote={checkVote}
        votingTime={votingTime}
        currentVotingTime={currentVotingTime}
        user={user}
      />
      {loader && <Loader />}
      <Footer />
    </>
  );
};

export default registerCandidate;
