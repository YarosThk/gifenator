import { getTrendingGifs, hasMoreGifs } from "./api_calls.js"
import { renderGrid } from "./display_controls.js"

const scrollTopButton = document.querySelector(".button-go-top")
let totalGifCount = 25 //start at 25 because window on load request 25 gifs. Later we add 25 with each request
let maxGifs = 0 //represents the total amount of GIFS existent in trending API query

scrollTopButton.addEventListener("click", () => {
    //this piece is from W3Schools
    document.body.scrollTop = 0; // For Safari. But seems like Safari works without it as well.
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
})

window.addEventListener("load", async () => {
    try {
        const data = await getTrendingGifs()
        maxGifs = data.pagination.total_count
        renderGrid(data.data)
    }catch(err){
        console.log(err)
    }
})

window.addEventListener("scroll", async () => {
    //scrollTop posiciones de scroll en la que estamos: returns the number of pixels an element's content is scrolled vertically
    //scrollHeight: returns the entire height of an element in pixels
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 150 && hasMoreGifs(totalGifCount, maxGifs)){
        //if i put 150, i think it should load before i reach full bottom
        try {
            const data = await getTrendingGifs()
            totalGifCount+=25
            renderGrid(data.data)
        } catch (err) {
            console.log(err)
        }
    }

    if(scrollTop > clientHeight){
        scrollTopButton.style.display = "inline-flex";
    }else{
        scrollTopButton.style.display = "none";
    }
})
