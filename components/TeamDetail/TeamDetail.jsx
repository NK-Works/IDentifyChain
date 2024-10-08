import React from "react";

//INTERNAL IMPORT
import Banner from "./Banner";
import Details from "./Details";

const TeamDetail = ({
  candidate,
  path,
  handleClickApprove,
  handleClickReject,
  GIVE_VOTE,
  OWNER_ADDRESS,
  address,
  checkVote,
  votingTime,
  currentVotingTime,
  user,
}) => {
  return (
    <>
      <Banner />
      <Details
        candidate={candidate}
        path={path}
        handleClickApprove={handleClickApprove}
        handleClickReject={handleClickReject}
        GIVE_VOTE={GIVE_VOTE}
        OWNER_ADDRESS={OWNER_ADDRESS}
        address={address}
        checkVote={checkVote}
        user={user}
        votingTime={votingTime}
        currentVotingTime={currentVotingTime}
      />
    </>
  );
};

export default TeamDetail;
