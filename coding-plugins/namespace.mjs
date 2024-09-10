// import web3 and plugin
import { Web3 } from "web3";
import { Chain, EnsPlugin } from "@namespace-ens/web3-plugin-ens";

// initialize rpc endpoint
const web3 = new Web3(); // mainnet by default

// register plugin
web3.registerPlugin(new EnsPlugin(Chain.Mainnet));

// use plugin
async function main() {
  const name = await web3.ens.getAddress("santiagodevrel.eth");

  console.log(name);
}

main();
