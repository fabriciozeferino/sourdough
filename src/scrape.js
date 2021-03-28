const puppeteer = require('puppeteer');

const scrapePromotions = async function () {
	const URL = 'https://www2.hm.com/en_gb/sale/kids/babygirls-size4-24m.html';

	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-gpu', '--disable-setuid-sandbox'],
	});

	const page = await browser.newPage();

	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');

	await page.goto(URL,  {waitUntil: 'networkidle2'});
	// await page.screenshot({path: 'buddy-screenshot.png'});

	await page.waitForSelector('#onetrust-accept-btn-handler');
	await page.click('#onetrust-accept-btn-handler');

	await page.waitForSelector('.product-item');

	const promotions = await page.evaluate(() => {
		const products = document.querySelectorAll('.product-item');
		const results = []

		const textContent = (elem) => elem ? elem.textContent.trim() : null;

		const getImgURL = (image) => {
			const imageSrc = image ? image.getAttribute('data-src') : null

			if (imageSrc) {
				const imgHash = imageSrc.match(/\[(.*?)]/);

				if (imgHash) {
					return `https://lp2.hm.com/hmgoepprod?set=source[${imgHash[1]}],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[1]&call=url[file:/product/main]`
				}
			}

			return null
		}

		const getId = (article) => {
			console.log({article})
			return article ? article.getAttribute('data-articlecode') : null
		}

		products.forEach(product => {
				return results.push(
					{
						id: getId(product.querySelector('article')),
						title: textContent(product.querySelector('a.link')),
						price: textContent(product.querySelector('span.sale')),
						imageUrl: getImgURL(product.querySelector('img'))
					}
				)
			}
		)

		return results;
	})

	await browser.close();

	return promotions;
};

module.exports = {scrapePromotions}