import Web3 from "web3";
import { isAddress } from 'web3-validator';
import { ALCHEMY_NODE, ERC20_ADDRESS } from "../constants";

const balanceABI = [{
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
}]
const txABI = [{
    constant: false,
    inputs: [{ name: "_to", type: "address" }, { name: "_value", type: "uint256" }],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function"
}];

export const getBalance = async (magic, addr) => {
    const web3 = new Web3(magic.rpcProvider);
    let contract = new web3.eth.Contract(balanceABI, ERC20_ADDRESS);
    const result = await contract.methods.balanceOf(addr).call();
    return result ? parseInt(result) / 1000000 : 0;
}

export const getAdminBalance = async (addr) => {
    const web3 = new Web3(ALCHEMY_NODE);
    let contract = new web3.eth.Contract(balanceABI, ERC20_ADDRESS);
    const result = await contract.methods.balanceOf(addr).call();
    return result ? parseInt(result) / 1000000 : 0;
}

export const transferERC20 = async (magic, amount, toAddr) => {
    const web3 = new Web3(magic.rpcProvider);
    const accounts = await magic.wallet.connectWithUI();
    console.log(accounts)
    const fromAddress = (await web3.eth.getAccounts())[0];
    console.log(`TRANSFER ${amount} from ${fromAddress} to ${toAddr}`)
    const contract = new web3.eth.Contract(txABI, ERC20_ADDRESS);
    const receipt = await contract.methods.transfer(toAddr, amount).send({ from: fromAddress });
    console.log(receipt)
    return receipt
}

export const validateAddr = (addr) => {
    return isAddress(addr);
}