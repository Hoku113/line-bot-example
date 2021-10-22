"use strict";

const express = require("express");
const line = require("@line/bot-sdk");
const app = express();

const PORT = process.env.PORT || 3000;

const config = {
	channelSecret: "7ae9be46e00471a4867fb1df7e5c675d",
	channelAccessToken: "UVvcprbcVIdjzMqfe87f981t9O3JMEaqjlpsju0BIGyuNwxx3PjzcgO9OedBF1LxkjU/8qGgLzPhKMgPfnupVz9kg3Bn8gIP+6WlahXZ6WRgRsGf2tpYuHGiiBpwzpGC+Dk9wfsM9hjR99SgqQUg0wdB04t89/1O/w1cDnyilFU=",
};

const client = new line.Client(config);

// ! ここから
app.post("/webhook", line.middleware(config), async (req, res) => {
	const event = req.body.events[0];

	const text = event.message.text;

	let result;
	if (text === "hello") {
		result = await client.replyMessage(event.replyToken, {
			"type": "template",
			"altText": "This is a buttons template",
			"template": {
				"type": "buttons",
				"title": "Menu",
				"text": "Please select",
				"actions": [
					{
					  "type": "postback",
					  "label": "Buy",
					  "data": "action=buy&itemid=123"
					},
					{
					  "type": "postback",
					  "label": "Add to cart",
					  "data": "action=add&itemid=123"
					},
					{
					  "type": "uri",
					  "label": "View detail",
					  "uri": "http://example.com/page/123"
					}
				]
			}
		  });
	} else {
		result = await client.replyMessage(event.replyToken, {
			type: "text",
			text: `Σ(ﾟДﾟ)`,
		});
	}

	res.json(result);
});
// !ここまで

app.listen(PORT, console.log(`Server listning on port ${PORT}`));
