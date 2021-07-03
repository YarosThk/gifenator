import { getGifs } from "./api_calls.js"
import { renderGif, clearCarousel, removeEmptyIndicator } from "./display_controls.js"

const searchButton = document.querySelector("#getGif")
const queryField = document.querySelector("#queryField")
const carousleContainer = document.querySelector(".gif-carousel")
const innerCarousel = document.querySelector(".carousel")
const arrowLeft = document.querySelector(".arrow-left")
const arrowRight = document.querySelector(".arrow-right")

searchButton.addEventListener("click", async (e) => {
    // e.preventDefault() //don't need it because getGif is a type button not submit
    let queriedText = queryField.value
    clearCarousel()
    removeEmptyIndicator()
    try {
        let returnedGifs = await getGifs(queriedText)
        renderGif(returnedGifs)
    } catch (err) {
        console.log("Error in search event listener ", err)
    }
})

arrowRight.addEventListener("click", () => {
    carousleContainer.scrollLeft += carousleContainer.offsetWidth
})

arrowLeft.addEventListener("click", () => {
    carousleContainer.scrollLeft -= carousleContainer.offsetWidth
})