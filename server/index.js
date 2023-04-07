const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
	"060cd9b3be5889cc086f079433f140a6ca351c32": 100,
	"c5382ebce9fe30fbdf029217de24345005b55389": 50,
	"99d84c1e99838263b84867e2acc2f68e4435ec46": 75,
};

app.get("/balance/:address", (req, res) => {
	const { address } = req.params;
	const balance = balances[address] || 0;
	res.send({ balance });
});
//
app.post("/send", (req, res) => {
	const { recipient, amount, sign, recoveryKey, msg } = req.body;

	const sender = toHex(
		keccak256(secp.recoverPublicKey(msg, sign, recoveryKey).slice(1)).slice(-20)
	);
	setInitialBalance(sender);
	setInitialBalance(recipient);

	if (balances[sender] < amount) {
		res.status(400).send({ message: "Not enough funds!" });
	} else {
		balances[sender] -= amount;
		balances[recipient] += amount;
		res.send({ balance: balances[sender] });
	}
});

app.listen(port, () => {
	console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
	if (!balances[address]) {
		balances[address] = 0;
	}
}
