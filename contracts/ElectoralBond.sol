// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ElectoralBond {
    struct Donator {
        address donatorAddress;
        uint256 amount;
    }

    struct Donee {
        uint256 donorLength;
        address[] donatorAddress;
        uint256[] amount;
    }

    mapping(address => Donee) public donees;

    function giveDonation(address _doneeAddress) public payable {
        (bool sent, ) = payable(_doneeAddress).call{value: msg.value}("");
        require(sent, "Unable to donate");
        Donee storage d = donees[_doneeAddress];
        d.donorLength++;
        d.amount.push(msg.value);
        d.donatorAddress.push(msg.sender);
    }

    function getAllDonations(
        address _doneeAddress
    ) public view returns (Donator[] memory) {
        Donee memory donee = donees[_doneeAddress];
        Donator[] memory donators = new Donator[](donee.donorLength);

        for (uint256 i = 0; i < donee.donorLength; i++) {
            Donator memory d = Donator(
                donee.donatorAddress[i],
                donee.amount[i]
            );
            donators[i] = d;
        }

        return donators;
    }

    function registerDonee() public {
        address[] memory acc;
        uint[] memory amt;
        Donee memory d = Donee(0, acc, amt);
        donees[msg.sender] = d;
    }
}
