require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { ethers } = require("ethers");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.0",
  networks: {
    // hardhat: {
    //   chainId: 31337,
    // },
    polygon_amoy: {
      url: process.env.RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      maxFeePerGas: ethers.utils.parseUnits("30", "gwei").toNumber(), // Adjust based on network conditions
      maxPriorityFeePerGas: ethers.utils.parseUnits("2.5", "gwei").toNumber(), // Increase if needed
    },
  },
};
