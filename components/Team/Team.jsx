import React from "react";

import Banner from "./Banner";
import Member from "./Member";

const Team = ({
  candidates,
  path,
  GIVE_VOTE,
  checkVote,
  votingTime,
  currentVotingTime,
  user,
}) => {
  return (
    <>
      <Banner />
      <Member
        candidates={candidates}
        path={path}
        GIVE_VOTE={GIVE_VOTE}
        checkVote={checkVote}
        votingTime={votingTime}
        currentVotingTime={currentVotingTime}
        user={user}
      />
    </>
  );
};

export default Team;
