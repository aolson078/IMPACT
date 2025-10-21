require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type {import('hardhat/config').HardhatUserConfig} */
const config = {
  solidity: {
    compilers: [
      { version: "0.8.23" },
      { version: "0.8.20" },
      { version: "0.8.7" },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v6",
  },
  networks: {
    hardhat: {
      forking:
        process.env.FORK === "1"
          ? {
              url: process.env.FORK_URL || "https://polygon-rpc.com",
              blockNumber: 48480000,
            }
          : undefined,
    },
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    amoy: {
      url: "https://polygon-amoy.g.alchemy.com/v2/vdm22hWf1-OAFE6Oez22S",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

module.exports = config;
