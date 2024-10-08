// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingOrganization {
    address public owner;
    uint256 public startTime;
    uint256 public endTime;

    uint256 private voterIdCounter;
    uint256 private candidateIdCounter;

    enum ApprovalStatus {
        Pending,
        Approved,
        Rejected
    }

    struct Voter {
        address voterAddress;
        string name;
        string ipfs;
        uint256 registerId;
        ApprovalStatus status;
        bool hasVoted;
        string message;
    }

    struct Candidate {
        address candidateAddress;
        string name;
        string ipfs;
        uint256 registerId;
        ApprovalStatus status;
        uint256 voteCount;
        string message;
    }

    mapping(address => Voter) public voters;
    mapping(address => Candidate) public candidates;
    address[] public registeredVoters;
    address[] public registeredCandidates;
    address[] public approvedVoters;
    address[] public approvedCandidates;
    address[] public votersWhoVoted;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier onlyDuringVotingPeriod() {
        require(
            block.timestamp >= startTime && block.timestamp <= endTime,
            "Voting is not active."
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        voterIdCounter = 1;
        candidateIdCounter = 1;
    }

    function registerVoter(string memory _name, string memory _ipfs) public {
        Voter memory newVoter = Voter(
            msg.sender,
            _name,
            _ipfs,
            voterIdCounter,
            ApprovalStatus.Pending,
            false,
            "Currently your registertion is pending"
        );
        voters[msg.sender] = newVoter;
        registeredVoters.push(msg.sender);
        voterIdCounter++;
    }

    function registerCandidate(
        string memory _name,
        string memory _ipfs
    ) public {
        Candidate memory newCandidate = Candidate(
            msg.sender,
            _name,
            _ipfs,
            candidateIdCounter,
            ApprovalStatus.Pending,
            0,
            "Currently your registertion is pending"
        );
        candidates[msg.sender] = newCandidate;
        registeredCandidates.push(msg.sender);
        candidateIdCounter++;
    }

    function approveVoter(
        address _voterAddress,
        string memory _message
    ) public onlyOwner {
        Voter storage voter = voters[_voterAddress];
        require(voter.voterAddress != address(0), "Voter not found.");
        voter.status = ApprovalStatus.Approved;
        voter.message = _message;
        approvedVoters.push(_voterAddress);
    }

    function approveCandidate(
        address _candidateAddress,
        string memory _message
    ) public onlyOwner {
        Candidate storage candidate = candidates[_candidateAddress];
        require(
            candidate.candidateAddress != address(0),
            "Candidate not found."
        );
        candidate.status = ApprovalStatus.Approved;
        candidate.message = _message;
        approvedCandidates.push(_candidateAddress);
    }

    function rejectVoter(
        address _voterAddress,
        string memory _message
    ) public onlyOwner {
        Voter storage voter = voters[_voterAddress];
        require(voter.voterAddress != address(0), "Voter not found.");
        voter.status = ApprovalStatus.Rejected;
        voter.message = _message;
    }

    function rejectCandidate(
        address _candidateAddress,
        string memory _message
    ) public onlyOwner {
        Candidate storage candidate = candidates[_candidateAddress];
        require(
            candidate.candidateAddress != address(0),
            "Candidate not found."
        );
        candidate.status = ApprovalStatus.Rejected;
        candidate.message = _message;
        approvedCandidates.push(_candidateAddress);
    }

    function setVotingPeriod(
        uint256 _startTime,
        uint256 _endTime
    ) public onlyOwner {
        require(_startTime < _endTime, "Start time must be before end time.");
        startTime = _startTime;
        endTime = _endTime;
    }

    function getAllRegisteredVoters() public view returns (Voter[] memory) {
        Voter[] memory voterArray = new Voter[](registeredVoters.length);
        for (uint256 i = 0; i < registeredVoters.length; i++) {
            voterArray[i] = voters[registeredVoters[i]];
        }
        return voterArray;
    }

    function getAllRegisteredCandidates()
        public
        view
        returns (Candidate[] memory)
    {
        Candidate[] memory candidateArray = new Candidate[](
            registeredCandidates.length
        );
        for (uint256 i = 0; i < registeredCandidates.length; i++) {
            candidateArray[i] = candidates[registeredCandidates[i]];
        }
        return candidateArray;
    }

    function getAllApprovedVoters() public view returns (Voter[] memory) {
        Voter[] memory voterArray = new Voter[](approvedVoters.length);
        for (uint256 i = 0; i < approvedVoters.length; i++) {
            voterArray[i] = voters[approvedVoters[i]];
        }
        return voterArray;
    }

    function getAllApprovedCandidates()
        public
        view
        returns (Candidate[] memory)
    {
        Candidate[] memory candidateArray = new Candidate[](
            approvedCandidates.length
        );
        for (uint256 i = 0; i < approvedCandidates.length; i++) {
            candidateArray[i] = candidates[approvedCandidates[i]];
        }
        return candidateArray;
    }

    function getVoter(
        address _voterAddress
    ) public view returns (Voter memory) {
        return voters[_voterAddress];
    }

    function getCandidate(
        address _candidateAddress
    ) public view returns (Candidate memory) {
        return candidates[_candidateAddress];
    }

    function updateVoter(string memory _name, string memory _ipfs) public {
        Voter storage voter = voters[msg.sender];
        require(voter.voterAddress != address(0), "Voter not found.");
        voter.name = _name;
        voter.ipfs = _ipfs;
    }

    function updateCandidate(string memory _name, string memory _ipfs) public {
        Candidate storage candidate = candidates[msg.sender];
        require(
            candidate.candidateAddress != address(0),
            "Candidate not found."
        );
        candidate.name = _name;
        candidate.ipfs = _ipfs;
    }

    function changeOwner(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "New owner address cannot be zero.");
        owner = _newOwner;
    }

    function resetContract() public onlyOwner {
        for (uint256 i = 0; i < registeredVoters.length; i++) {
            delete voters[registeredVoters[i]];
        }
        for (uint256 i = 0; i < registeredCandidates.length; i++) {
            delete candidates[registeredCandidates[i]];
        }
        delete registeredVoters;
        delete registeredCandidates;
        delete approvedVoters;
        delete approvedCandidates;
        delete votersWhoVoted;
        voterIdCounter = 1;
        candidateIdCounter = 1;
        startTime = 0;
        endTime = 0;
    }

    function vote(address _candidateAddress) public onlyDuringVotingPeriod {
        Voter storage voter = voters[msg.sender];
        require(
            voter.status == ApprovalStatus.Approved,
            "You are not an approved voter."
        );
        require(!voter.hasVoted, "You have already voted.");

        Candidate storage candidate = candidates[_candidateAddress];
        require(
            candidate.status == ApprovalStatus.Approved,
            "Candidate is not approved."
        );

        voter.hasVoted = true;
        candidate.voteCount++;
        votersWhoVoted.push(msg.sender);
    }

    function getAllVotersWhoVoted() public view returns (Voter[] memory) {
        Voter[] memory voterArray = new Voter[](votersWhoVoted.length);
        for (uint256 i = 0; i < votersWhoVoted.length; i++) {
            voterArray[i] = voters[votersWhoVoted[i]];
        }
        return voterArray;
    }

    function getCurrentVotingStatus() public view returns (Candidate memory) {
        Candidate memory leadingCandidate;
        uint256 highestVotes = 0;

        for (uint256 i = 0; i < approvedCandidates.length; i++) {
            Candidate memory candidate = candidates[approvedCandidates[i]];
            if (candidate.voteCount > highestVotes) {
                highestVotes = candidate.voteCount;
                leadingCandidate = candidate;
            }
        }
        return leadingCandidate;
    }

    function getWinningCandidate() public view returns (Candidate memory) {
        require(block.timestamp > endTime, "Voting period is not over yet.");
        return getCurrentVotingStatus();
    }
}
