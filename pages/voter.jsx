import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

import { Cursor, Preloader, ScrollToTop } from "../components/index";

import Input from "../components/Global/Input";
import Upload from "../components/Global/Upload";
import UploadImg from "../components/Global/UploadImg";
import Preview from "../components/Global/Preview";
import PreviewImg from "../components/Global/PreviewImg";
import Loader from "../components/Global/Loader";
import PopUp from "../components/Global/PopUp";

import { VOTING_DAPP_CONTEXT } from "../context/context";

const voter = () => {
  const {
    notifySuccess,
    notifyError,
    setLoader,
    loader,
    checkIfWalletIsConnected,
    REGISTER_VOTER,
    GET_SINGLE_VOTER,
  } = useContext(VOTING_DAPP_CONTEXT);

  const [_, setCurrentAddress] = useState();
  const zeroAddress = "0x0000000000000000000000000000000000000000";
  const [candidate, setCandidate] = useState();

  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
  //
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

                {candidate?.address == zeroAddress && (
                  <div
                    autocomplete="off"
                    id="frmContactus"
                    className="contact__form mt-8 mt-lg-10 text-start"
                  >
                    <div className="d-flex flex-column gap-5 gap-lg-6 ">
                      <Input
                        name={"Name"}
                        placeholder={"Enter your Name"}
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
                        placeholder={"Enter your Address as per Aadhaar Card"}
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
                        placeholder={"Upload your profile Photo"}
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
                        placeholder={"Enter your parent or Spouse Name"}
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
                        placeholder={"Enter your Gender"}
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
                        placeholder={"Enter your Date of Birth"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateVoter({
                            ...updateVoter,
                            _dobOrAge: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Address Details"}
                        placeholder={"Enter your Address details"}
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
                        placeholder={"Enter an Epic number"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateVoter({
                            ...updateVoter,
                            _epicNumber: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Part Number and Name"}
                        placeholder={"Enter part Number or Name"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateVoter({
                            ...updateVoter,
                            _partNumberAndName: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Assembly Constituency Number and Name"}
                        placeholder={"Enter your Assembly Constituency No. & name"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateVoter({
                            ...updateVoter,
                            _assemblyConstituencyNumberAndName: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Issuing Authority Signature"}
                        placeholder={"Upload an Authority Signature"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateVoter({
                            ...updateVoter,
                            _issuingAuthoritySignature: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Hologram And Barcode"}
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
                        onClick={() => REGISTER_VOTER(updateVoter, image, pdf)}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-8 mt-lg-10">
                  <p>
                    Don't have an account? <a href="/">Register Here</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {candidate?.address != zeroAddress && <PopUp candidate={candidate} />}
        {loader && <Loader />}
      </section>
    </>
  );
};

export default voter;
