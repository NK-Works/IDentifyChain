import Link from "next/link";
import React from "react";

const Member = ({
  candidates,
  path,
  GIVE_VOTE,
  checkVote,
  votingTime,
  currentVotingTime,
  user,
}) => {
  console.log(path);
  return (
    <section className="team pt-120 pb-120 position-relative z-0">
      <div className="container">
        <div className="row gy-6">
          {candidates?.map((item, index) => (
            <div
              key={index + 1}
              className="new-custom-position col-sm-6 col-lg-4 col-xxl-3"
            >
              <div className="team__card nb3-bg cus-rounded-1 overflow-hidden">
                <div className="team__thumbs position-relative">
                  <img src={item?.image} alt="Image" className="w-100" />
                </div>
                <div className="team__content pseudo_element_after transition text-center py-6 py-lg-7 py-xxl-8 px-4 px-lg-5 px-xxl-6">
                  <Link
                    href={
                      path == "candidate"
                        ? `/candidate-details?address=${item?.address} `
                        : `/voter-details?address=${item?.address} `
                    }
                  >
                    <a>
                      <h5 className="team__title d-center pb-4 mb-4 pseudo_element_after">
                        {item?._name}{" "}
                      </h5>
                    </a>
                  </Link>
                  <p className="new-custom-top">
                    <strong>
                      {item?.status == 0
                        ? "Pending"
                        : item?.status == 1
                        ? "Approved"
                        : "Rejected"}
                    </strong>
                  </p>

                  {path == "candidate" &&
                    item?.status == 1 &&
                    user?.status == 1 &&
                    !user?.hasVoted &&
                    currentVotingTime >= votingTime?.startDateN &&
                    currentVotingTime <= votingTime?.endDateN && (
                      <>
                        <p>Total Vote: {item?.voteCount}</p>

                        <div
                          style={{ cursor: "pointer" }}
                          className="custom-actions"
                        >
                          <a
                            className="custom-read"
                            onClick={() => GIVE_VOTE(item?.address)}
                          >
                            Give Vote
                          </a>
                        </div>
                      </>
                    )}

                  {path == "candidate" &&
                    item?.status == 1 &&
                    user?.hasVoted && (
                      <>
                        <p>Total Vote: {item?.voteCount}</p>

                        <div className="custom-actions">
                          <a className="custom-read">Already Voted</a>
                        </div>
                      </>
                    )}

                  {path == "candidate" && item?.status == 0 && (
                    <>
                      <div className="custom-actions">
                        <a className="custom-read">Status: Pending</a>
                      </div>
                    </>
                  )}

                  {path == "voter" && item?.status == 1 && (
                    <>
                      <div className="custom-actions">
                        <a className="custom-read">
                          {item?.hasVoted ? "Already Voted" : "Not Voted"}
                        </a>
                      </div>
                    </>
                  )}
                  {path == "voter" && item?.status == 0 && (
                    <>
                      <div className="custom-actions">
                        <a className="custom-read">Status: Pending</a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="col-12 mt-10 mt-lg-15 d-flex justify-content-center">
            <Link
              href="/"
              className="cmn-btn py-2 py-lg-3 px-4 px-lg-6 gap-2 gap-lg-3 align-items-center"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Member;
