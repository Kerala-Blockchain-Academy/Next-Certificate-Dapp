const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Cert = await hre.ethers.getContractFactory("Cert");
  const cert = await Cert.deploy();
  await cert.deployed();

  console.log(`${cert.signer.address} deployed to ${cert.address}`);
  let details = {
    deployer: cert.signer.address,
    contract: cert.address
  };
  fs.writeFile('details.json', JSON.stringify(details, null, 4), (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Details are saved")
  })

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
