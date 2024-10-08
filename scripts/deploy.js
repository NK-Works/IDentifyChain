const hre = require("hardhat");

async function main() {
  const VotingOrganization = await hre.ethers.getContractFactory(
    "VotingOrganization"
  );
  const Electoralbond = await hre.ethers.getContractFactory("ElectoralBond");
  const voting = await VotingOrganization.deploy();
  const bond = await Electoralbond.deploy();

  await voting.deployed();
  await bond.deployed();

  console.log({ voting: voting.address, bond: bond.address });
}

//npx hardhat run scripts/deploy.js --network polygon_amoy
//npx hardhat run scripts/deploy.js --network localhost

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
