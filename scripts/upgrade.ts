import {ethers, upgrades} from "hardhat";
import {contract_alpha, contract_beta, get_deployed_address} from "./_misc";

async function main() {
    let deployed = get_deployed_address()
    let alphaAddress = deployed[contract_alpha]
    const betaFactory = await ethers.getContractFactory(contract_beta)
    const contract = await upgrades.upgradeProxy(
        alphaAddress,
        betaFactory,
        {unsafeAllow: ['delegatecall']}
    )
    await contract.deployed()

    console.log(`contract upgraded!`)
}

main().catch((err) => {
    console.log(err)
    process.exitCode = 1
})