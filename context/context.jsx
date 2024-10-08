import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { ethers } from "ethers";

//INTERNAL  IMPORT
import {
  checkIfWalletIsConnected,
  connectWallet,
  VOTING_CONTRACT,
  OWNER_ADDRESS,
  BOND_CONTRACT,
} from "./constants";

export const VOTING_DAPP_CONTEXT = React.createContext();

export const VOTER_DAPP_PROVIDER = ({ children }) => {
  const VOTING_DAPP = "Voting Dapp";

  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [address, setAddress] = useState();
  const [checkVote, setCheckVote] = useState(false);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const REGISTER_CANDIDATE = async (updateCandidate, image, pdf) => {
    const {
      _name,
      _nominationForm,
      _affidavit,
      _criminalAntecedents,
      _assetsAndLiabilities,
      _educationalQualifications,
      _electoralRollEntry,
      _securityDeposit,
      _partyAffiliation,
      _oathOrAffirmation,
      _photographs,
      _proofOfAge,
      _proofOfAddress,
      _panCardDetails,
      _voterIdCardDetails,
    } = updateCandidate;

    if (
      !_name ||
      !_nominationForm ||
      !_affidavit ||
      !_criminalAntecedents ||
      !_assetsAndLiabilities ||
      !_educationalQualifications ||
      !_electoralRollEntry ||
      !_securityDeposit ||
      !_partyAffiliation ||
      !_oathOrAffirmation ||
      !_photographs ||
      !_proofOfAge ||
      !_proofOfAddress ||
      !_panCardDetails ||
      !_voterIdCardDetails ||
      !image ||
      !pdf
    )
      return notifyError("Data Is Missing");
    notifySuccess("Registering Candidate, kindly wait...");
    setLoader(true);

    const votingContract = await VOTING_CONTRACT();
    const bondContract = await BOND_CONTRACT();

    const data = JSON.stringify({
      _name,
      _nominationForm,
      _affidavit,
      _criminalAntecedents,
      _assetsAndLiabilities,
      _educationalQualifications,
      _electoralRollEntry,
      _securityDeposit,
      _partyAffiliation,
      _oathOrAffirmation,
      _photographs,
      _proofOfAge,
      _proofOfAddress,
      _panCardDetails,
      _voterIdCardDetails,
      image,
      pdf,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(url);

      const votingTransaction = await votingContract.registerCandidate(
        _name,
        url
      );
      const bondTransaction = await bondContract.registerDonee();

      await votingTransaction.wait();
      await bondTransaction.wait();

      notifySuccess("Successfully Registered Candidate");
      setLoader(false);
      router.push("/all-candidates");
    } catch (error) {
      setLoader(false);
      notifySuccess(
        "Registration failed, kindly connect to ellection commission"
      );
      console.log(error);
    }
  };

  const REGISTER_VOTER = async (updateVoter, image, pdf) => {
    const {
      _name,
      _voterAddress,
      _photograph,
      _parentOrSpouseName,
      _gender,
      _dobOrAge,
      _addressDetails,
      _epicNumber,
      _partNumberAndName,
      _assemblyConstituencyNumberAndName,
      _issuingAuthoritySignature,
      _hologramAndBarcode,
    } = updateVoter;

    if (
      !_name ||
      !_voterAddress ||
      !_photograph ||
      !_parentOrSpouseName ||
      !_gender ||
      !_dobOrAge ||
      !_addressDetails ||
      !_epicNumber ||
      !_partNumberAndName ||
      !_assemblyConstituencyNumberAndName ||
      !_issuingAuthoritySignature ||
      !_hologramAndBarcode ||
      !image ||
      !pdf
    )
      return notifyError("Data Is Missing");
    notifySuccess("Registering Voter, kindly wait...");
    setLoader(true);

    const CONTRACT = await VOTING_CONTRACT();

    const data = JSON.stringify({
      _name,
      _voterAddress,
      _photograph,
      _parentOrSpouseName,
      _gender,
      _dobOrAge,
      _addressDetails,
      _epicNumber,
      _partNumberAndName,
      _assemblyConstituencyNumberAndName,
      _issuingAuthoritySignature,
      _hologramAndBarcode,
      image,
      pdf,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(url);

      const transaction = await CONTRACT.registerVoter(_name, url);

      await transaction.wait();

      notifySuccess("Successfully Registered Candidate");
      setLoader(false);
      router.push("/all-voters");
    } catch (error) {
      setLoader(false);
      notifySuccess(
        "Registration failed, kindly connect to ellection commission"
      );
      console.log(error);
    }
  };

  const APPROVE_CANDIDATE = async (address, message) => {
    if (!address || !message) return notifyError("Data Is Missing");
    notifySuccess("kindly wait, approving candidate...");
    setLoader(true);

    const CONTRACT = await VOTING_CONTRACT();

    try {
      const transaction = await CONTRACT.approveCandidate(address, message);

      await transaction.wait();
      setLoader(false);
      notifySuccess("Successfully approve Candidate");
      router.push("/approve-candidates");
    } catch (error) {
      setLoader(false);
      notifySuccess("approve failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const APPROVE_VOTER = async (address, message) => {
    if (!address || !message) return notifyError("Data Is Missing");
    notifySuccess("kindly wait, approving voter...");
    setLoader(true);

    const CONTRACT = await VOTING_CONTRACT();

    try {
      const transaction = await CONTRACT.approveVoter(address, message);

      await transaction.wait();
      setLoader(false);
      notifySuccess("Successfully aapprove voter");
      router.push("/approve-voters");
    } catch (error) {
      setLoader(false);
      notifySuccess("approving failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const REJECT_CANDIDATE = async (address, message) => {
    if (!address || !message) return notifyError("Data Is Missing");
    notifySuccess("kindly wait, approving candidate...");
    setLoader(true);

    const CONTRACT = await VOTING_CONTRACT();

    try {
      const transaction = await CONTRACT.rejectCandidate(address, message);

      await transaction.wait();
      setLoader(false);
      notifySuccess(" Candidate Rejected");
      router.push("/all-candidates");
    } catch (error) {
      setLoader(false);
      notifySuccess("approve failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const REJECT_VOTER = async (address, message) => {
    console.log(address, message);
    if (!address || !message) return notifyError("Data Is Missing");
    notifySuccess("kindly wait, approving voter...");
    setLoader(true);

    const CONTRACT = await VOTING_CONTRACT();

    try {
      const transaction = await CONTRACT.rejectVoter(address, message);

      await transaction.wait();
      setLoader(false);
      notifySuccess("Successfully Rejected");
      router.push("/all-voters");
    } catch (error) {
      setLoader(false);
      notifySuccess("approving failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const SET_VOTING_PREIOD = async (voteTime) => {
    const { startTime, endTime } = voteTime;

    if (!startTime || !endTime) return notifyError("Data Is Missing");
    notifySuccess("kindly wait...");
    setLoader(true);

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const startTimeMilliseconds = startDate.getTime();
    const endTimeMilliseconds = endDate.getTime();

    const startTimeSeconds = Math.floor(startTimeMilliseconds / 1000);
    const endTimeSeconds = Math.floor(endTimeMilliseconds / 1000);

    const CONTRACT = await VOTING_CONTRACT();

    try {
      const transaction = await CONTRACT.setVotingPeriod(
        startTimeSeconds,
        endTimeSeconds
      );

      await transaction.wait();
      setLoader(false);
      notifySuccess("Successfully set voting period ");
      router.push("/");
    } catch (error) {
      setLoader(false);
      notifyError(
        "set voting period failed, kindly connect to ellection commission"
      );
      console.log(error);
    }
  };

  const UPDATE_VOTER = async (updateVoter, image, pdf) => {
    const {
      _name,
      _voterAddress,
      _photograph,
      _parentOrSpouseName,
      _gender,
      _dobOrAge,
      _addressDetails,
      _epicNumber,
      _partNumberAndName,
      _assemblyConstituencyNumberAndName,
      _issuingAuthoritySignature,
      _hologramAndBarcode,
    } = updateVoter;

    if (
      !_name ||
      !_voterAddress ||
      !_photograph ||
      !_parentOrSpouseName ||
      !_gender ||
      !_dobOrAge ||
      !_addressDetails ||
      !_epicNumber ||
      !_partNumberAndName ||
      !_assemblyConstituencyNumberAndName ||
      !_issuingAuthoritySignature ||
      !_hologramAndBarcode ||
      !image ||
      !pdf
    )
      return notifyError("Data Is Missing");
    notifySuccess("Upadate Voter, kindly wait...");
    setLoader(true);

    const CONTRACT = await VOTING_CONTRACT();

    const data = JSON.stringify({
      _name,
      _voterAddress,
      _photograph,
      _parentOrSpouseName,
      _gender,
      _dobOrAge,
      _addressDetails,
      _epicNumber,
      _partNumberAndName,
      _assemblyConstituencyNumberAndName,
      _issuingAuthoritySignature,
      _hologramAndBarcode,
      image,
      pdf,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(url);

      const transaction = await CONTRACT.updateVoter(_name, url);

      await transaction.wait();

      notifySuccess("Successfully updated voter");
      setLoader(false);
      router.push("/all-voters");
    } catch (error) {
      setLoader(false);
      notifySuccess("Update failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const UPDATE_CANDIDATE = async (updateCandidate, image, pdf) => {
    const {
      _name,
      _nominationForm,
      _affidavit,
      _criminalAntecedents,
      _assetsAndLiabilities,
      _educationalQualifications,
      _electoralRollEntry,
      _securityDeposit,
      _partyAffiliation,
      _oathOrAffirmation,
      _photographs,
      _proofOfAge,
      _proofOfAddress,
      _panCardDetails,
      _voterIdCardDetails,
    } = updateCandidate;

    if (
      !_name ||
      !_nominationForm ||
      !_affidavit ||
      !_criminalAntecedents ||
      !_assetsAndLiabilities ||
      !_educationalQualifications ||
      !_electoralRollEntry ||
      !_securityDeposit ||
      !_partyAffiliation ||
      !_oathOrAffirmation ||
      !_photographs ||
      !_proofOfAge ||
      !_proofOfAddress ||
      !_panCardDetails ||
      !_voterIdCardDetails ||
      !image ||
      !pdf
    )
      return notifyError("Data Is Missing");
    notifySuccess("Updating Candidate, kindly wait...");
    setLoader(true);

    const CONTRACT = await VOTING_CONTRACT();

    const data = JSON.stringify({
      _name,
      _nominationForm,
      _affidavit,
      _criminalAntecedents,
      _assetsAndLiabilities,
      _educationalQualifications,
      _electoralRollEntry,
      _securityDeposit,
      _partyAffiliation,
      _oathOrAffirmation,
      _photographs,
      _proofOfAge,
      _proofOfAddress,
      _panCardDetails,
      _voterIdCardDetails,
      image,
      pdf,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(url);

      const transaction = await CONTRACT.updateCandidate(_name, url);

      await transaction.wait();

      notifySuccess("Successfully Updated Candidate");
      setLoader(false);
      router.push("/all-candidates");
    } catch (error) {
      setLoader(false);
      notifySuccess("Update failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const CHANGE_OWNER = async (_newOwner) => {
    if (!_newOwner) return notifyError("Data Is Missing");
    notifySuccess("kindly wait...");
    setLoader(true);

    const CONTRACT = await VOTING_CONTRACT();

    try {
      const transaction = await CONTRACT.changeOwner(_newOwner);

      await transaction.wait();
      setLoader(false);
      notifySuccess("Successfully updated ");
      router.push("/");
    } catch (error) {
      setLoader(false);
      notifySuccess("updated failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const RESET_CONTRACT = async () => {
    notifySuccess("kindly wait...");
    setLoader(true);

    const CONTRACT = await VOTING_CONTRACT();

    try {
      const transaction = await CONTRACT.resetContract();

      await transaction.wait();
      setLoader(false);
      notifySuccess("Successfully RESET ");
      router.push("/");
    } catch (error) {
      setLoader(false);
      notifySuccess("RESET failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const GIVE_VOTE = async (_candidateAddress) => {
    if (!_candidateAddress) return notifyError("Data Is Missing");
    notifySuccess("kindly wait...");
    setLoader(true);

    const CONTRACT = await VOTING_CONTRACT();

    try {
      const transaction = await CONTRACT.vote(_candidateAddress);

      await transaction.wait();
      setLoader(false);
      notifySuccess("Successfully voted ");
      router.push("/approve-candidates");
    } catch (error) {
      setLoader(false);
      notifySuccess("vote failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  //READ DATA FUNCTIONS
  const INITIAL_CONTRACT_DATA = async () => {
    try {
      const userAddress = await checkIfWalletIsConnected();

      setAddress(userAddress);
      if (userAddress) {
        const CONTRACT = await VOTING_CONTRACT();

        const startDateN = await CONTRACT.startTime();
        const endDateN = await CONTRACT.endTime();

        const timestamp1 = startDateN;
        const timestamp2 = endDateN;

        const date1 = new Date(timestamp1 * 1000);
        const date2 = new Date(timestamp2 * 1000);

        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };

        const item = {
          startDate: date1.toLocaleDateString("en-US", options),
          endDate: date2.toLocaleDateString("en-US", options),
          startDateN: startDateN.toNumber(),
          endDateN: endDateN.toNumber(),
        };

        return item;
      }
    } catch (error) {
      notifyError("Something weng wrong ");
      console.log(error);
    }
  };

  const GET_REGISTER_CANDIDATES = async () => {
    try {
      const userAddress = await checkIfWalletIsConnected();

      setAddress(userAddress);
      if (userAddress) {
        const CONTRACT = await VOTING_CONTRACT();

        const candidates = await CONTRACT.getAllRegisteredCandidates();
        // console.log(candidates);

        const items = await Promise.all(
          candidates.map(
            async ({
              ipfs,
              candidateAddress,
              registerId,
              status,
              voteCount,
              message,
            }) => {
              const {
                data: {
                  _name,
                  _nominationForm,
                  _affidavit,
                  _criminalAntecedents,
                  _assetsAndLiabilities,
                  _educationalQualifications,
                  _electoralRollEntry,
                  _securityDeposit,
                  _partyAffiliation,
                  _oathOrAffirmation,
                  _photographs,
                  _proofOfAge,
                  _proofOfAddress,
                  _panCardDetails,
                  _voterIdCardDetails,
                  image,
                  pdf,
                },
              } = await axios.get(ipfs, {});

              return {
                address: candidateAddress,
                registerId: registerId?.toNumber(),
                status,
                voteCount: voteCount?.toNumber(),
                ipfs,
                message,
                _name,
                _nominationForm,
                _affidavit,
                _criminalAntecedents,
                _assetsAndLiabilities,
                _educationalQualifications,
                _electoralRollEntry,
                _securityDeposit,
                _partyAffiliation,
                _oathOrAffirmation,
                _photographs,
                _proofOfAge,
                _proofOfAddress,
                _panCardDetails,
                _voterIdCardDetails,
                image,
                pdf,
              };
            }
          )
        );

        return items;
      }
    } catch (error) {
      notifyError("Something weng wrong ");
      console.log(error);
    }
  };

  const GET_REGISTER_VOTERS = async () => {
    try {
      const userAddress = await checkIfWalletIsConnected();

      setAddress(userAddress);
      if (userAddress) {
        const CONTRACT = await VOTING_CONTRACT();

        const candidates = await CONTRACT.getAllRegisteredVoters();
        // console.log(candidates);

        const items = await Promise.all(
          candidates.map(
            async ({
              ipfs,
              voterAddress,
              registerId,
              status,
              hasVoted,
              message,
            }) => {
              const {
                data: {
                  _name,
                  _voterAddress,
                  _photograph,
                  _parentOrSpouseName,
                  _gender,
                  _dobOrAge,
                  _addressDetails,
                  _epicNumber,
                  _partNumberAndName,
                  _assemblyConstituencyNumberAndName,
                  _issuingAuthoritySignature,
                  _hologramAndBarcode,
                  image,
                  pdf,
                },
              } = await axios.get(ipfs, {});

              return {
                address: voterAddress,
                registerId: registerId?.toNumber(),
                status,
                hasVoted,
                message,
                ipfs,
                _name,
                _voterAddress,
                _photograph,
                _parentOrSpouseName,
                _gender,
                _dobOrAge,
                _addressDetails,
                _epicNumber,
                _partNumberAndName,
                _assemblyConstituencyNumberAndName,
                _issuingAuthoritySignature,
                _hologramAndBarcode,
                image,
                pdf,
              };
            }
          )
        );

        return items;
      }
    } catch (error) {
      notifyError("Something weng wrong ");
      console.log(error);
    }
  };

  const ALL_VOTERS_VOTED = async () => {
    try {
      const userAddress = await checkIfWalletIsConnected();

      setAddress(userAddress);
      if (userAddress) {
        const CONTRACT = await VOTING_CONTRACT();

        const candidates = await CONTRACT.getAllVotersWhoVoted();
        // console.log(candidates);

        const items = await Promise.all(
          candidates.map(
            async ({
              ipfs,
              voterAddress,
              registerId,
              status,
              hasVoted,
              message,
            }) => {
              const {
                data: {
                  _name,
                  _voterAddress,
                  _photograph,
                  _parentOrSpouseName,
                  _gender,
                  _dobOrAge,
                  _addressDetails,
                  _epicNumber,
                  _partNumberAndName,
                  _assemblyConstituencyNumberAndName,
                  _issuingAuthoritySignature,
                  _hologramAndBarcode,
                  image,
                  pdf,
                },
              } = await axios.get(ipfs, {});

              return {
                address: voterAddress,
                registerId: registerId?.toNumber(),
                status,
                hasVoted,
                message,
                ipfs,
                _name,
                _voterAddress,
                _photograph,
                _parentOrSpouseName,
                _gender,
                _dobOrAge,
                _addressDetails,
                _epicNumber,
                _partNumberAndName,
                _assemblyConstituencyNumberAndName,
                _issuingAuthoritySignature,
                _hologramAndBarcode,
                image,
                pdf,
              };
            }
          )
        );

        //CHECK CURRENT USER VOTING STATE
        items?.filter((user) =>
          user.address.toLowerCase() == userAddress
            ? setCheckVote(true)
            : setCheckVote(false)
        );

        return items;
      }
    } catch (error) {
      notifyError("Something weng wrong ");
      console.log(error);
    }
  };

  const HIGHEST_VOTED_CANDIDATE = async () => {
    try {
      const userAddress = await checkIfWalletIsConnected();
      setAddress(userAddress);

      if (userAddress) {
        const CONTRACT = await VOTING_CONTRACT();
        const candidates = await CONTRACT.getCurrentVotingStatus();

        console.log(candidates);

        const zeroAddress = "0x0000000000000000000000000000000000000000";
        if (candidates?.candidateAddress.toLowerCase() === zeroAddress) return;

        const {
          data: {
            _name,
            _nominationForm,
            _affidavit,
            _criminalAntecedents,
            _assetsAndLiabilities,
            _educationalQualifications,
            _electoralRollEntry,
            _securityDeposit,
            _partyAffiliation,
            _oathOrAffirmation,
            _photographs,
            _proofOfAge,
            _proofOfAddress,
            _panCardDetails,
            _voterIdCardDetails,
            image,
            pdf,
          },
        } = await axios.get(candidates?.ipfs);

        const candidateData = {
          address: candidates?.candidateAddress,
          registerId: candidates?.registerId?.toNumber(),
          status: candidates?.status,
          voteCount: candidates?.voteCount?.toNumber(),
          ipfs: candidates?.ipfs,
          message: candidates?.message,
          _name,
          _nominationForm,
          _affidavit,
          _criminalAntecedents,
          _assetsAndLiabilities,
          _educationalQualifications,
          _electoralRollEntry,
          _securityDeposit,
          _partyAffiliation,
          _oathOrAffirmation,
          _photographs,
          _proofOfAge,
          _proofOfAddress,
          _panCardDetails,
          _voterIdCardDetails,
          image,
          pdf,
        };

        console.log(candidateData);

        return candidateData;
      }
    } catch (error) {
      notifyError("Something went wrong");
      console.log(error);
    }
  };

  const WINNER = async () => {
    try {
      const userAddress = await checkIfWalletIsConnected();

      setAddress(userAddress);
      if (userAddress) {
        const CONTRACT = await VOTING_CONTRACT();

        const candidates = await CONTRACT.getWinningCandidate();
        // console.log(candidates);

        const items = await Promise.all(
          candidates.map(
            async ({
              ipfs,
              voterAddress,
              registerId,
              status,
              hasVoted,
              message,
            }) => {
              const {
                data: {
                  _name,
                  _voterAddress,
                  _photograph,
                  _parentOrSpouseName,
                  _gender,
                  _dobOrAge,
                  _addressDetails,
                  _epicNumber,
                  _partNumberAndName,
                  _assemblyConstituencyNumberAndName,
                  _issuingAuthoritySignature,
                  _hologramAndBarcode,
                  image,
                  pdf,
                },
              } = await axios.get(ipfs, {});

              return {
                voterAddress,
                registerId: registerId?.toNumber(),
                status,
                hasVoted,
                message,
                ipfs,
                _name,
                _voterAddress,
                _photograph,
                _parentOrSpouseName,
                _gender,
                _dobOrAge,
                _addressDetails,
                _epicNumber,
                _partNumberAndName,
                _assemblyConstituencyNumberAndName,
                _issuingAuthoritySignature,
                _hologramAndBarcode,
                image,
                pdf,
              };
            }
          )
        );

        return items;
      }
    } catch (error) {
      notifyError("Something weng wrong ");
      console.log(error);
    }
  };

  const GET_SINGLE_VOTER = async (address) => {
    try {
      const userAddress = await checkIfWalletIsConnected();

      setAddress(userAddress);
      if (!address) return notifyError("Kindly provide address");

      const CONTRACT = await VOTING_CONTRACT();

      const data = await CONTRACT.getVoter(address);
      const {
        data: {
          _name,
          _voterAddress,
          _photograph,
          _parentOrSpouseName,
          _gender,
          _dobOrAge,
          _addressDetails,
          _epicNumber,
          _partNumberAndName,
          _assemblyConstituencyNumberAndName,
          _issuingAuthoritySignature,
          _hologramAndBarcode,
          image,
          pdf,
        },
      } = await axios.get(data?.ipfs, {});

      const voter = {
        address: data?.voterAddress,
        registerId: data?.registerId.toNumber(),
        ipfs: data?.ipfs,
        status: data?.status,
        hasVoted: data?.hasVoted,
        message: data?.message,
        _name,
        _voterAddress,
        _photograph,
        _parentOrSpouseName,
        _gender,
        _dobOrAge,
        _addressDetails,
        _epicNumber,
        _partNumberAndName,
        _assemblyConstituencyNumberAndName,
        _issuingAuthoritySignature,
        _hologramAndBarcode,
        image,
        pdf,
      };

      return voter;
    } catch (error) {
      notifySuccess("Failed to get data, kindly reload page");
      console.log(error);
    }
  };

  const GET_SINGLE_CANDIDATE = async (address) => {
    try {
      const userAddress = await checkIfWalletIsConnected();

      setAddress(userAddress);
      if (!address) return notifyError("Kindly provide address");

      const CONTRACT = await VOTING_CONTRACT();

      const data = await CONTRACT.getCandidate(address);

      const {
        data: {
          _name,
          _nominationForm,
          _affidavit,
          _criminalAntecedents,
          _assetsAndLiabilities,
          _educationalQualifications,
          _electoralRollEntry,
          _securityDeposit,
          _partyAffiliation,
          _oathOrAffirmation,
          _photographs,
          _proofOfAge,
          _proofOfAddress,
          _panCardDetails,
          _voterIdCardDetails,
          image,
          pdf,
        },
      } = await axios.get(data?.ipfs, {});
      console.log(_name);
      const candidate = {
        address: data?.candidateAddress,
        registerId: data?.registerId.toNumber(),
        ipfs: data?.ipfs,
        status: data?.status,
        voteCount: data?.voteCount.toNumber(),
        message: data?.message,
        _name,
        _nominationForm,
        _affidavit,
        _criminalAntecedents,
        _assetsAndLiabilities,
        _educationalQualifications,
        _electoralRollEntry,
        _securityDeposit,
        _partyAffiliation,
        _oathOrAffirmation,
        _photographs,
        _proofOfAge,
        _proofOfAddress,
        _panCardDetails,
        _voterIdCardDetails,
        image,
        pdf,
      };

      return candidate;
    } catch (error) {
      notifyError("Failed to get data, kindly reload page");
      console.log(error);
    }
  };

  const GIVE_DONATION = async (doneeAddress, amount) => {
    try {
      const userAddress = await checkIfWalletIsConnected();
      setAddress(userAddress);
      if (userAddress) {
        const CONTRACT = await BOND_CONTRACT();
        const transaction = await CONTRACT.giveDonation(doneeAddress, {
          value: ethers.utils.parseEther(`${amount}`),
        });
        await transaction.wait();
        notifySuccess("Donation Successfull");
      }
    } catch (err) {
      notifyError("Failed to complete donation, kindly reload page");
      console.log(err);
    }
  };

  const GET_ALL_DONATIONS = async (doneeAddress) => {
    try {
      const userAddress = await checkIfWalletIsConnected();
      setAddress(userAddress);
      console.log({ doneeAddress });
      if (!doneeAddress) return [];
      if (userAddress) {
        const CONTRACT = await BOND_CONTRACT();
        const contractDonators = await CONTRACT.getAllDonations(doneeAddress);
        return contractDonators;
      }
    } catch (err) {
      notifyError("Failed to complete donation, kindly reload page");
      console.error(err);
    }
  };

  return (
    <VOTING_DAPP_CONTEXT.Provider
      value={{
        GET_SINGLE_CANDIDATE,
        GET_SINGLE_VOTER,
        GET_REGISTER_CANDIDATES,
        GET_REGISTER_VOTERS,
        HIGHEST_VOTED_CANDIDATE,
        INITIAL_CONTRACT_DATA,
        ALL_VOTERS_VOTED,
        WINNER,
        notifySuccess,
        notifyError,
        setLoader,
        connectWallet,
        address,
        checkVote,
        OWNER_ADDRESS,
        setAddress,
        loader,
        checkIfWalletIsConnected,
        VOTING_DAPP,
        REGISTER_CANDIDATE,
        REGISTER_VOTER,
        APPROVE_VOTER,
        APPROVE_CANDIDATE,
        GIVE_VOTE,
        UPDATE_CANDIDATE,
        UPDATE_VOTER,
        CHANGE_OWNER,
        RESET_CONTRACT,
        SET_VOTING_PREIOD,
        REJECT_CANDIDATE,
        REGISTER_VOTER,
        REJECT_VOTER,
        GIVE_DONATION,
        GET_ALL_DONATIONS,
      }}
    >
      {children}
    </VOTING_DAPP_CONTEXT.Provider>
  );
};
