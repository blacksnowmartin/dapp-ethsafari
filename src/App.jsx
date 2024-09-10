import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import modules
import { Web3 } from "web3";
import { ORAPlugin, Models, Chain } from "@ora-io/web3-plugin-ora";

function App() {
  const [fees, setFees] = useState("0 fees");
  const [account, setAccount] = useState("no account");
  const [txHash, setTxHash] = useState("no hash");
  const [result, setResult] = useState("no hash");

  // initialize provider
  const web3 = new Web3(window.ethereum);

  // register plugin
  web3.registerPlugin(new ORAPlugin(Chain.SEPOLIA));

  //use plugin
  async function sendPrompt() {
    const PROMPT = "create an image of an apple with a tree";

    //  ORA estimate fees
    const fees = await web3.ora.estimateFee(Models.STABLE_DIFFUSION);
    setFees(fees.toString());

    // connect wallet
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);

    // ORA send the prompt
    const txReceipt = await web3.ora.calculateAIResult(accounts[0], Models.STABLE_DIFFUSION, PROMPT, fees);
    setTxHash(txReceipt.transactionHash);
  }

  async function fetchResult() {
    // ORA fetch result
    const PROMPT = "create an image of an apple with a tree";

    const result = await web3.ora.getAIResult(Models.STABLE_DIFFUSION, PROMPT);
    setResult(result);
  }

  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Fees: {fees}</p>
      <p>Account connected: {account}</p>
      <p>Tx Hash {txHash}</p>
      <p>Result AI: {result}</p>
      <button onClick={sendPrompt}>Send prompt to ORA</button>
      <button onClick={fetchResult}>Fetch result from ORA</button>
      <div className="card"></div>
    </>
  );
}

export default App;
