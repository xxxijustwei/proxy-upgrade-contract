import fs from "fs";

export let contract_alpha = "ContractAlpha"
export let contract_beta = "ContractBeta"

const path = "./common/deploy_address.json";

export function get_deployed_address() {
    let deploy_address: {[key: string]: string} = {}

    try {
        fs.accessSync(path, fs.constants.F_OK)
        let data = fs.readFileSync(path, "utf-8")
        let obj = JSON.parse(data)
        for (let key in obj) {
            deploy_address[key] = obj[key]
        }
    } catch (ignore) {}

    return deploy_address
}

export function save_deployed_address(deploy_address: {[key: string]: string}) {
    fs.writeFile(
        path,
        JSON.stringify(deploy_address),
        (err) => {
            if (err) console.log("deploy contract address write failed!", err)
            else console.log("deploy contract address write successful!")
        })
}