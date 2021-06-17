const apiKey = "5X2j8Y2uf6f8BIRK5TFQr3hdLTDwAS7k"
const body = document.querySelector("body")
const searchButton = document.querySelector("#getGif")
const queryField = document.querySelector("#queryField")
const gifCarousel = document.querySelector(".carousel")

const carousleContainer = document.querySelector(".gif-carousel")
const arrowLeft = document.querySelector(".arrow-left")
const arrowRight = document.querySelector(".arrow-right")

searchButton.addEventListener("click", (e) => {
    // e.preventDefault() //don't need it because getGif is a type button not submit
    let queriedText = queryField.value
    getGifs(queriedText)
})


function getGifs(q){
    let searchRequest = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=15&lang=en&q=${q}`
    fetch(searchRequest, {mode : "cors"})
        .then(function (response){
            console.log("in the response")
            response.json() //this returns a Promise that resolves to JS Objects. Since it's a promise we need then or another asyn function.
                .then(data => {
                    console.log(data.data)
                    renderGif(data.data)
                })
                .catch(e => console.log("Error parsing JSON: ", e))
        })
        .catch(function(e){
            console.log("IN THE ERROR ",e)
        })
            
}

function renderGif(d){

    d.forEach(gif => {
        let gifBox = createDiv("gif")
        let objPath = gif.images.fixed_height.webp
        let gifMedia = gifElement(objPath, "gif__img")

        gifBox.appendChild(gifMedia)
        gifCarousel.appendChild(gifBox)
    });
}

function createDiv(div_class) {
    const divElement = document.createElement("div")
    divElement.classList.add(div_class)
    return divElement
}

function gifElement(img_link, img_class) {
    let img = document.createElement("img")
    img.src = img_link
    img.classList.add(img_class)
    return img
}

function hoverEffect(e){
    console.log(e.target)

}

function removeHoverEffect(e){
    console.log(e.target)
}

arrowRight.addEventListener("click", () => {
    carousleContainer.scrollLeft += carousleContainer.offsetWidth

})

arrowLeft.addEventListener("click", () => {
    carousleContainer.scrollLeft -= carousleContainer.offsetWidth
})