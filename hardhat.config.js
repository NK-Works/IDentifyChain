require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    // open_chain: {
    //   url: process.env.RPC_URL,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`],
    // },
  },
};
