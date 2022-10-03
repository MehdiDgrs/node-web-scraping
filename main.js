const axios = require("axios");
const cheerio = require("cheerio");
const open = require("open");
let resultArray = [];
let fetchData = async (url) => {
  let result = await axios.get(url);

  return cheerio.load(result.data);
};
let fetchDataHash = async () => {
  let $ = await fetchData(
    "https://www.nowinstock.net/videogaming/consoles/sonyps5/"
  );
  let result = $("#trackerContent > div#data > table > tbody >tr").each(
    (index, element) => {
      if (index === 0) return true;
      let tds = $(element).find("td");

      let [title, availability, price, date] = tds;
      resultArray.push({
        title: $(title).find("a").attr("href"),
        availability: $(availability).text(),
        price: $(price).text(),
        date: $(date).text(),
      });
    }
  );

  return resultArray;
};

let checkForAvailability = (data) => {
  let potentials = data.filter(
    (x) =>
      !x.title.includes("ebay") &&
      x.availability !== "Out of Stock" &&
      x.availability !== "Preorder"
  );

  if (potentials.length > 1) {
    console.log("PLAYSTATION FOUND");
  }
  potentials.forEach((potential) => open(potential.title));
  return potentials;
};

(function schedule() {
  fetchDataHash().then((returnedTr) => checkForAvailability(returnedTr));
  console.log("process finished,waiting for 5 minutes");
  setTimeout(() => schedule(), 1000 * 60 * 5);
})();
