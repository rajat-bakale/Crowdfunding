const { ethers } = require("hardhat");

async function main() {
    const target = hre.ethers.parseEther("10");
    const deadline = 3600;

    const CrowdFunding = await ethers.deployContract("CrowdFunding", [target, deadline]);

    await CrowdFunding.waitForDeployment();

    console.log(`CrowdFunding contract deployed to: ${CrowdFunding.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
