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

// create tooltip
const tooltip = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

// create svg
const svg = d3.select('#map')
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// add event listeners
navigation.select("#kickstarter").on("click", () => {
    data = dataset.kickstarter;
    update();
})
navigation.select("#movie").on("click", () => {
    data = dataset.movie;
    update();
})
navigation.select("#videogame").on("click", () => {
    data = dataset.videogame;
    update();
})

// update
const update = () => {
    //clean svg
    svg.selectAll("*").remove();
    
    // update title and description
    title.text(data.title);
    description.text(data.description);

    // load data
    d3.json(data.url).then(data => {
        // process data
        const root= d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        // create treemap layout
        const treemap = d3.treemap()
            .size([width, height])
            .padding(1);

        treemap(root);

        // draw treemap
        const cell = svg
            .selectAll("g")
            .data(root.leaves())
            .enter()
            .append("g")
            .attr("transform", d => `translate(${d.x0},${d.y0})`);

        cell
            .append("rect")
            .attr("class", "tile")
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr("fill", d => d3.schemeCategory10[d.parent.data.name.charCodeAt(0) % 10]);
            
        // add labels
        cell
            .append("text")
            .attr("class", "tile-label")
            .attr("x", 4)
            .attr("y", 15)
            .text(d => d.data.name);
            
    })
}

window.onload = update;