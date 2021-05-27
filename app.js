const apiKey = "5X2j8Y2uf6f8BIRK5TFQr3hdLTDwAS7k"
const body = document.querySelector("body")
const searchButton = document.querySelector("#getGif")
const queryField = document.querySelector("#queryField")

searchButton.addEventListener("click", (e) => {
    // e.preventDefault() //don't need it because getGif is a type button not submit
    let queriedText = queryField.value
    getGifs(queriedText)
})


function getGifs(q){
    let search_request = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&lang=en&q=${q}`
    fetch(search_request, {mode : "cors"})
        .then(function (response){
            console.log("in the response")
            response.json() //this returns a Promise that resolves to JS Objects. Since it's a prmise we need then or another asyn function.
                .then(data => renderGif(data))
                .catch(e => console.log("Error parsin JSON: ", e))
        })
        .catch(function(e){
            console.log("IN THE ERROR ",e)
        })
            
}

function renderGif(d){
    let img = document.createElement("img")
    img.src = d.data[0].images.downsized.url
    body.appendChild(img)
}