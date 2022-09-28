import { ethers, upgrades } from "hardhat";
import {contract_alpha, contract_beta} from "../scripts/_misc";
import { expect } from "chai"

describe('proxy upgradeable contract', function () {
    let address: string;
    let value = 1989

    before(async function () {
        const factory = await ethers.getContractFactory(contract_alpha);
        const contract = await upgrades.deployProxy(
            factory,
            [value],
            {unsafeAllow: ['delegatecall']}
        )
        await contract.deployed()

        address = contract.address
    })

    it('alpha contract getValue() == 1989 ',  async function () {
        const factory = await ethers.getContractFactory(contract_alpha)
        const contract = await factory.attach(address)

        expect(await contract.getValue()).to.equal(value)
    });

    it('alpha contract *addValue()* function', async function () {
        const factory = await ethers.getContractFactory(contract_alpha)
        const contract = await factory.attach(address)

        const tx = await contract.add(1213)
        await tx.wait()

        value += 1213
        expect(await contract.getValue()).to.equal(value)
    });

    it('upgrade beta contract', async function () {
        const factory = await ethers.getContractFactory(contract_beta);
        const contract = await upgrades.upgradeProxy(
            address,
            factory,
            {unsafeAllow: ['delegatecall']}
        )
        await contract.deployed()
    });

    it('beta contract *increase()* function', async function () {
        const factory = await ethers.getContractFactory(contract_beta)
        const contract = await factory.attach(address)

        const tx = await contract.increase()
        await tx.wait()

        value += 1
        expect(await contract.getValue()).to.equal(value)
    });

    it('alpha contract getValue() == 3203', async function () {
        const factory = await ethers.getContractFactory(contract_alpha)
        const contract = await factory.attach(address)

        expect(await contract.getValue()).to.equal(value)
    });
});
