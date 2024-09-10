// import web3 and swisstronik pluging
import { Web3 } from "web3";
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import ABI from "./abi_erc20.mjs";

// initialize the RPC endpoint
const web3 = new Web3("https://json-rpc.testnet.swisstronik.com/");

// register plugin
web3.registerPlugin(new SwisstronikPlugin());

async function main() {
  // initialize the contract object
  const ADDRESS = "0xb652af511905b871953928a93c1d2e31ad31da00";
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  // interact with the contract
  const name = await myContract.methods.name().call();

  const totalS = await myContract.methods.totalSupply().call();

  const decimals = await myContract.methods.decimals().call();

  console.log(name);
  console.log(totalS);
  console.log(decimals);
}

main();
