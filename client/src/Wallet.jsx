import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import {toHex} from  "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = toHex(keccak256(secp.getPublicKey(privateKey).slice(1)).slice(-20));
    setAddress(publicKey)
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type Private Key" value={privateKey} onChange={onChange}></input>
      </label>
      <label>
         Address: {address.slice(0,10)}...
      </label>
      
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
