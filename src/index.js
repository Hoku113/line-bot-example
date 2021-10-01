"use strict";

const express = require("express");
const line = require("@line/bot-sdk");
const app = express();

const PORT = process.env.PORT || 3000;

const config = {
	channelSecret: "",
	channelAccessToken: "",
};

const client = new line.Client(config);

// ! ここから
app.post("/webhook", line.middleware(config), async (req, res) => {
	const event = req.body.events[0];

	const text = event.message.text;

	let result;
	if (text === "hello") {
		result = await client.replyMessage(event.replyToken, {
			type: "text",
			text: "こんにちは！",
		});
	} else {
		result = await client.replyMessage(event.replyToken, {
			type: "text",
			text: `${text}が押されました`,
		});
	}

	res.json(result);
});
// !ここまで

app.listen(PORT, console.log(`Server listning on port ${PORT}`));
