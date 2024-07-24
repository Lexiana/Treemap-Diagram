const kickstarterPledgesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
const movieSalesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
const videoGameSalesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

// set data
let dataset = {
    kickstarter: {
        title: "Kickstarter Pleges",
        description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
        url: kickstarterPledgesUrl,
    },
    movie: {
        title: "Movie Sales",
        description: "Top 100 Highest Grossing Movies Grouped By Genre",
        url: movieSalesUrl,

    },
    videogame: {
        title: "Video Game Sales",
        description: "Top 100 Most Sold Video Games Grouped by Platform",
        url: videoGameSalesUrl,
    }
}

// set default data
let data = dataset.kickstarter;

// set dimensions
const width = 960,
    height = 600,
    margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };



// create navigation
const navigation = d3.select("body")
    .insert("nav", ":first-child")
    .attr("id", "navigation")
    .html(`
        <button id="kickstarter">Kickstarter</button>
        <button id="movie">Movie</button>
        <button id="videogame">Video Game</button>
        `)

// create title
const title = d3.select(".container")
    .insert("h1", ":first-child")
    .attr("id", "title");

// create description
const description = d3.select(".container")
    .insert("div", ":nth-child(2)")
    .attr("id", "description");

// create svg
const svg = d3.select('#map')
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// add event listeners
navigation.select("#kickstarter").on("click", () => {
    data = dataset.kickstarter;
    update();
    console.log(data)
})
navigation.select("#movie").on("click", () => {
    data = dataset.movie;
    update();
    console.log(data)
})
navigation.select("#videogame").on("click", () => {
    data = dataset.videogame;
    update();
    console.log(data)
})

// update
const update = () => {
    title.text(data.title);
    description.text(data.description);

}

window.onload = update;