import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

import { Cursor, Preloader, ScrollToTop } from "../components/index";

import Input from "../components/Global/Input";
import Upload from "../components/Global/Upload";
import UploadImg from "../components/Global/UploadImg";
import Preview from "../components/Global/Preview";
import PreviewImg from "../components/Global/PreviewImg";
import Loader from "../components/Global/Loader";

import { VOTING_DAPP_CONTEXT } from "../context/context";

const voter = () => {
  const {
    notifySuccess,
    notifyError,
    setLoader,
    loader,
    checkIfWalletIsConnected,
    UPDATE_VOTER,
    GET_SINGLE_VOTER,
  } = useContext(VOTING_DAPP_CONTEXT);

  //VOTER ADDRESS
  const [currentAddress, setCurrentAddress] = useState();
  const [candidate, setCandidate] = useState();
  const [loading, setLoading] = useState(false);

  //FILES
  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);

  //VOTER DETAIL
  const [updateVoter, setUpdateVoter] = useState({
    _name: "",
    _voterAddress: "",
    _photograph: "",
    _parentOrSpouseName: "",
    _gender: "",
    _dobOrAge: "",
    _addressDetails: "",
    _epicNumber: "",
    _partNumberAndName: "",
    _assemblyConstituencyNumberAndName: "",
    _issuingAuthoritySignature: "",
    _hologramAndBarcode: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const address = await checkIfWalletIsConnected();
      if (address) {
        setCurrentAddress(address);
        const items = await GET_SINGLE_VOTER(address);
        setCandidate(items);
        console.log(items);
      }
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
                <h1 className="display-one">Welcome Back!</h1>
                {image && <PreviewImg image={image} />}
                {pdf && <Preview pdf={pdf} />}
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
                  <h5 className="mt-5 mt-lg-6">Register as a voter </h5>
                </div>

                <div
                  autocomplete="off"
                  id="frmContactus"
                  className="contact__form mt-8 mt-lg-10 text-start"
                >
                  <div className="d-flex flex-column gap-5 gap-lg-6 ">
                    <Input
                      name={"Name"}
                      placeholder={"_name"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _name: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"Voter Address"}
                      placeholder={"_voterAddress"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _voterAddress: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"Photograph"}
                      placeholder={"_photograph"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _photograph: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"Parent Or SpouseName"}
                      placeholder={"_parentOrSpouseName"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _parentOrSpouseName: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"Gender"}
                      placeholder={"_gender"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _gender: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"DOB Or Age"}
                      placeholder={"_dobOrAge"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _dobOrAge: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"AddressDetails"}
                      placeholder={"_addressDetails"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _addressDetails: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"Epic Number"}
                      placeholder={"_epicNumber"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _epicNumber: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"Part Number AndName"}
                      placeholder={"_partNumberAndName"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _partNumberAndName: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"Assembly Constituency NumberAndName"}
                      placeholder={"_assemblyConstituencyNumberAndName"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _assemblyConstituencyNumberAndName: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"IssuingAuthoritySignature"}
                      placeholder={"_issuingAuthoritySignature"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _issuingAuthoritySignature: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"HologramAndBarcode"}
                      placeholder={"_hologramAndBarcode"}
                      type={"text"}
                      handleClick={(e) =>
                        setUpdateVoter({
                          ...updateVoter,
                          _hologramAndBarcode: e.target.value,
                        })
                      }
                    />
                    <UploadImg
                      setLoader={setLoader}
                      notifySuccess={notifySuccess}
                      notifyError={notifyError}
                      setImage={setImage}
                    />
                    <Upload
                      setLoader={setLoader}
                      notifySuccess={notifySuccess}
                      notifyError={notifyError}
                      setPdf={setPdf}
                    />
                  </div>

                  <div className=" mt-7 mt-lg-8">
                    <button
                      className="cmn-btn py-3 px-5 px-lg-6 mt-7 mt-lg-8 w-100 d-center"
                      onClick={() => UPDATE_VOTER(updateVoter, image, pdf)}
                    >
                      Update
                    </button>
                  </div>
                </div>

                <div className="mt-8 mt-lg-10">
                  <p>
                    Don’t have an account? <a href="/">Register Here</a>
                  </p>
                </div>
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
