const hre = require("hardhat");

async function main () { 
    const Giraffes = await hre.ethers.getContractFactory("GiraffesAtTheBar");
    const giraffes = await Giraffes.deploy()
    await giraffes.deployed();
    console.log("GATB deployed to ", giraffes.address);
}

main ()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });