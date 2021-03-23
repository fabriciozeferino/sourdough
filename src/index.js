const fs = require('fs')
const path = require('path')
const {scrapePromotions} = require('./scrape')


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

	console.log(newItems)

}
