'use strict';
require('dotenv').config()
const nodemailer = require('nodemailer');

const main = async (emailBody) => {
	try {
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD
			}
		});

		// Message object
		let message = {
			from: 'Fabricio <fabriciozeferino@gmail.com>',

			// Comma separated list of recipients
			to: 'Viviana <viviana.pd@gmail.com>, Fabricio <fabriciozeferino@gmail.com>',

			// Subject of the message
			subject: 'Latest sales added to H&M ✔',

			// HTML body
			html: emailBody
		};

		let info = await transporter.sendMail(message);

		console.log('Message sent successfully as %s', info.messageId);

		return info
	} catch (e) {
		console.error(e)
	}
}

const newEmail = function (items) {
	let emailBody = `<div style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -webkit-text-size-adjust: none; background-color: #ffffff; color: #718096; height: 100%; line-height: 1.4; margin: 0; padding: 0; width: 300px !important;">`;


	items.forEach(item => {
		emailBody += `
			<div style="width: 300px">
				<div style="padding-bottom: 16px;">
					<a href="https://www2.hm.com/en_gb/productpage.${item.id}.html" target="_blank">
						<img src="${item.imageUrl}" alt="" width="300"/>
						<p>${item.title}</p>
						<p>${item.price}</p>
					</a>
				</div>
			</div>
		`
	})

	emailBody += `</div>`;

	main(emailBody).then(item => console.log(item))
}

module.exports = {main, newEmail}