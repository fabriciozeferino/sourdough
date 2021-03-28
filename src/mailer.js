'use strict';
require('dotenv').config()

const nodemailer = require('nodemailer');

const main = async (emailBody) => {
	try {

		console.log({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS
			}
		})

		//Create a SMTP transporter object
		let transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS
			}
		});

		// Message object
		let message = {
			from: 'Fabricio <jacquelyn.lindgren81@ethereal.email>',

			// Comma separated list of recipients
			to: 'Viviana <fabriciozeferino84@gmail.com>',

			// Subject of the message
			subject: 'Nodemailer is unicode friendly ✔',

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

const newEmail = function (items){
	let emailBody = `<div style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -webkit-text-size-adjust: none; background-color: #ffffff; color: #718096; height: 100%; line-height: 1.4; margin: 0; padding: 0; width: 300px !important;">`;

	items.forEach(item => {

		emailBody += `<div style="width: 300px">
	<div style="padding-bottom: 16px">
		<img src="${item.imageUrl}" alt="" width="300"/>
		<p>${item.title}</p>
		<p>${item.price}</p>
	</div>
</div>`
	})

	emailBody += `</div>`;

	main(emailBody).then(item => console.log(item))
}

module.exports = {main, newEmail}