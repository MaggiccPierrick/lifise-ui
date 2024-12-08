import Web3 from "web3";
import { isAddress } from 'web3-validator';
import { RPC_URL, CHAIN_ID, ERC20_ADDRESS, REACT_APP_MAGIC_PUBLISHABLE_KEY } from "../constants";
import { Magic } from 'magic-sdk';

// TODO: I don't know why but the magic passed in args in function
// Not working to get balance
const magic = new Magic(REACT_APP_MAGIC_PUBLISHABLE_KEY, {
    network: {
        rpcUrl: RPC_URL,
        chainId: CHAIN_ID, 
    },
});


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
    const web3 = new Web3(RPC_URL);
    let contract = new web3.eth.Contract(balanceABI, ERC20_ADDRESS);
    const result = await contract.methods.balanceOf(addr).call();
    return result ? parseInt(result) / 1000000 : 0;
}

export const transferERC20 = async (_, amount, toAddr) => {
        
    const web3 = new Web3(magic.rpcProvider);
    await magic.wallet.connectWithUI();
    const fromAddress = (await web3.eth.getAccounts())[0];
    const contract = new web3.eth.Contract(txABI, ERC20_ADDRESS);
    const receipt = await contract.methods.transfer(toAddr, amount).send({ from: fromAddress });
    console.log(receipt)
    return receipt
}

export const validateAddr = (addr) => {
    return isAddress(addr);
}