import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  TeamDetail,
} from "../components/index";
import Loader from "../components/Global/Loader";

//IMPORTING CONTRCT DATA
import { VOTING_DAPP_CONTEXT } from "../context/context";

const voterDetails = () => {
  const router = useRouter();
  const [candidate, setCandidate] = useState();
  const [loading, setLoading] = useState(false);

  const {
    loader,
    GET_SINGLE_VOTER,
    APPROVE_VOTER,
    address,
    OWNER_ADDRESS,
    REJECT_VOTER,
  } = useContext(VOTING_DAPP_CONTEXT);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (!router.isReady) return;

      const items = await GET_SINGLE_VOTER(router?.query.address);
      setCandidate(items);
      console.log(items);
    };
    //
    fetchData().finally(() => setLoading(false));
  }, [router.isReady]);

  const approveVoter = async (address, message) => {
    await APPROVE_VOTER(address, message);
  };
  const rejectVoter = async (address, message) => {
    await REJECT_VOTER(address, message);
  };
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
      <Header />
      <TeamDetail
        candidate={candidate}
        path={"voter"}
        handleClickApprove={approveVoter}
        handleClickReject={rejectVoter}
        address={address}
        OWNER_ADDRESS={OWNER_ADDRESS}
      />
      {loader && <Loader />}
      <Footer />
    </>
  );
};

export default voterDetails;
