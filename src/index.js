const fs = require('fs')
const path = require('path')
const {scrapePromotions} = require('./scrape')
const {newEmail} = require('./mailer')

//Get data before override by new search
const jsonPath = path.join(__dirname, 'data', 'data.json');

console.log(jsonPath)
const fileData = fs.readFileSync(jsonPath, 'utf8');

const previousSearch = JSON.parse(fileData.toString())

scrapePromotions().then(item => {
	const newScrapeStringify = JSON.stringify(item);

	let absolutePath = path.basename("data.json");

	//Save in file
	fs.writeFile(jsonPath, newScrapeStringify, (err) => {
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