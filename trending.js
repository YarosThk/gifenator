const apiKey = "5X2j8Y2uf6f8BIRK5TFQr3hdLTDwAS7k"
const body = document.querySelector("body")
const gifGrid = document.querySelector(".gif-grid")

window.addEventListener("load", () => {
    console.log("DISPLAYED WHEN PAGE LOADED")
    getTrendingGifs()
})


function getTrendingGifs(){
    console.log("performing a request")
    let trendingQuery = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=r`;
    fetch(trendingQuery, { mode: "cors" })
        .then(function(response){
            response.json() //this returns a Promise that resolves to JS Object. Since it's a promise we need then or another async function.
                .then(data => {
                    console.log(data.data)
                    renderGrid(data.data)
                })
                .catch(e => console.log("Error parsing JSON: ", e))

        })
        .catch(function (e) {
            console.log("IN THE ERROR ", e)
        })
}

function renderGrid(d){
    d.forEach(gif => {
        let objPath = gif.images.fixed_width.webp
        let gifMedia = gifElement(objPath, "gif__img")
        gifGrid.appendChild(gifMedia)
    });
}


function gifElement(img_link, img_class) {
    let img = document.createElement("img")
    img.src = img_link
    img.classList.add(img_class)
    return img
}