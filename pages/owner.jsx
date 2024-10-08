import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

import { Cursor, Preloader, ScrollToTop } from "../components/index";

import Input from "../components/Global/Input";
import Loader from "../components/Global/Loader";

//IMPORTING CONTRCT DATA
import { VOTING_DAPP_CONTEXT } from "../context/context";

const voter = () => {
  const {
    loader,
    OWNER_ADDRESS,
    checkIfWalletIsConnected,
    CHANGE_OWNER,
    RESET_CONTRACT,
    SET_VOTING_PREIOD,
  } = useContext(VOTING_DAPP_CONTEXT);

  const [currentAddress, setCurrentAddress] = useState();
  const [loading, setLoading] = useState(false);

  const [voteTime, setVoteTime] = useState({
    startTime: "",
    endTime: "",
  });

  const [changeOwner, setChangeOwner] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const address = await checkIfWalletIsConnected();
      setCurrentAddress(address);
    };

    fetchData().finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />

      <section className="sign nb4-bg h-100 d-flex align-items-center position-relative z-0">
        <div className="animation position-absolute top-0 left-0 w-100 h-100 z-n1">
          <img
            src="assets/images/star.png"
            alt="vector"
            className="position-absolute push_animat"
          />
        </div>
        <div className="container ">
          <div className="row align-items-center justify-content-center justify-content-xl-start">
            <div className="col-12 col-sm-10 col-md-6">
              <div className="welcome alt-color text-center text-md-start pt-120 pb-120 position-relative z-0">
                <h1 className="display-one">Welcome Admin!</h1>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-5 col-xxl-5 offset-xxl-1 text-center ms-xl-auto mx-auto">
              <div className="sign__content ms-md-5 ms-xxl-0 pt-120 pb-120">
                <div className="head_part">
                  <Link href="/">
                    <a
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "start",
                        gap: 16,
                      }}
                    >
                      <img
                        style={{
                          width: "3.2rem",
                          height: "3.2rem",
                        }}
                        src="assets/images/logo.png"
                        className="logo"
                        alt="logo"
                      />
                      <h1
                        style={{
                          fontSize: "3.5rem",
                          fontFamily: "Tiny5",
                          fontWeight: 400,
                          fontStyle: "normal",
                        }}
                      >
                        IDentifyChain
                      </h1>
                    </a>
                  </Link>
                  <h5 className="mt-5 mt-lg-6">Import Contract Functions </h5>
                </div>

                {currentAddress == OWNER_ADDRESS.toLowerCase() && (
                  <div
                    autocomplete="off"
                    id="frmContactus"
                    className="contact__form mt-8 mt-lg-10 text-start"
                  >
                    <div className="d-flex flex-column gap-5 gap-lg-6 ">
                      <Input
                        name={"Start Time"}
                        placeholder={"startTime"}
                        type={"date"}
                        handleClick={(e) =>
                          setVoteTime({
                            ...voteTime,
                            startTime: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"End Time"}
                        placeholder={"endTime"}
                        type={"date"}
                        handleClick={(e) =>
                          setVoteTime({
                            ...voteTime,
                            endTime: e.target.value,
                          })
                        }
                      />
                      <div>
                        <button
                          className="cmn-btn py-3 px-5 px-lg-6 w-100 d-center"
                          onClick={() => SET_VOTING_PREIOD(voteTime)}
                        >
                          Set Voting Period
                        </button>
                      </div>
                      <div className="mt-lg-8"></div>
                      <Input
                        name={"New Address"}
                        placeholder={"new address"}
                        type={"text"}
                        handleClick={(e) => setChangeOwner(e.target.value)}
                      />
                      <div>
                        <button
                          className="cmn-btn py-3 px-5 px-lg-6 w-100 d-center"
                          onClick={() => CHANGE_OWNER(changeOwner)}
                        >
                          Change Owner
                        </button>
                      </div>
                    </div>

                    <div className=" mt-7 mt-lg-16">
                      <button
                        className="cmn-btn py-3 px-5 px-lg-6 mt-7 mt-lg-8 w-100 d-center"
                        onClick={() => RESET_CONTRACT()}
                      >
                        Reset Contract
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {loader && <Loader />}
      </section>
    </>
  );
};

export default voter;
