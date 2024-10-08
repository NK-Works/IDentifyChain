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

const registerVoters = () => {
  const [candidates, setCandidates] = useState();
  const [votingTime, setVotingTime] = useState();
  const [currentVotingTime, setCurrentVotingTime] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const {
    loader,
    GET_REGISTER_CANDIDATES,
    GIVE_VOTE,
    ALL_VOTERS_VOTED,
    checkVote,
    INITIAL_CONTRACT_DATA,
    GET_SINGLE_VOTER,
    checkIfWalletIsConnected,
  } = useContext(VOTING_DAPP_CONTEXT);

  function filterUsersByStatus(users, status) {
    return users?.filter((user) => user.status === status);
  }

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await GET_REGISTER_CANDIDATES();

      const approvedUsers = filterUsersByStatus(items, 1);
      setCandidates(approvedUsers);

      const votingStatus = await INITIAL_CONTRACT_DATA();

      setVotingTime(votingStatus);
      console.log(votingStatus);

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

export default registerVoters;
