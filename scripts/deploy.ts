import { ethers, upgrades } from "hardhat";
import { contract_alpha, get_deployed_address, save_deployed_address } from "./_misc";

async function main() {
    const alphaFactory = await ethers.getContractFactory(contract_alpha)
    const contract = await upgrades.deployProxy(
        alphaFactory,
        [1989],
        {unsafeAllow: ['delegatecall']}
    )
    await contract.deployed()

    let deploy_address = get_deployed_address()
    deploy_address[contract_alpha] = contract.address;
    save_deployed_address(deploy_address)

    console.log(`contract ${contract_alpha} deploy to: ${contract.address}`)
}

main().catch((err) => {
    console.log(err)
    process.exitCode = 1
})