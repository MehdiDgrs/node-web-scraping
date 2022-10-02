const axios = require('axios');
let fs = require ('fs')
const cheerio = require('cheerio')

let resultArray = []
let fetchData = async  (url) => {
    let result = await axios.get(url)
   
    return cheerio.load(result.data)
    
}
let fetchDataHash = async () => {

let $ =  await fetchData('https://www.nowinstock.net/videogaming/consoles/sonyps5/');
let result = $("#trackerContent > div#data > table > tbody >tr").each((index,element)=> {if(index===0) return true;
let tds = $(element).find('td');

let [title,availability,price,date] = tds
resultArray.push({
title:$(title).text(),
availability:$(availability).text(),
price:$(price).text(),
date:$(date).text(),

})


})
console.log(resultArray)
return resultArray 
 

}


fetchDataHash()