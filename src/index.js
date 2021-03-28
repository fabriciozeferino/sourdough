const fs = require('fs')
const path = require('path')
const {scrapePromotions} = require('./scrape')
const {newEmail} = require('./mailer')

//Get data before override by new search
const fileData = fs.readFileSync('./src/data/data.json', 'utf8');

const previousSearch = JSON.parse(fileData.toString())

scrapePromotions().then(item => {
	const newScrapeStringify = JSON.stringify(item);

	let absolutePath = path.basename("data.json");

	//Save in file
	fs.writeFile('./src/data/' + absolutePath, newScrapeStringify, (err) => {
		if (err) {
			throw err;
		}
		console.log("JSON data is saved.");
	})

	getNewItemsInTheSearch(previousSearch, item)
})

const getNewItemsInTheSearch = (previousSearch, newSearch) => {
	const newItems = newSearch.filter(newSearchItem => !previousSearch.find(item => item.id === newSearchItem.id))

	return newItems.length > 0
	? newEmail(newItems)
		: console.log('no items')
}