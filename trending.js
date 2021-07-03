import { getTrendingGifs, hasMoreGifs } from "./api_calls.js"
import { renderGrid } from "./display_controls.js"

const scrollTopButton = document.querySelector(".button-go-top")
let totalGifCount = 25 //start at 25 because window on load request 25 gifs. Later we add 25 with each request
let offsetPosition = 0 //with each query it will offset 25 GIFS
let maxGifs = 0 //represents the total amount of GIFS existent in trending API query

scrollTopButton.addEventListener("click", () => {
    //this piece is from W3Schools
    document.body.scrollTop = 0; // For Safari. But seems like Safari works without it as well.
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
})

window.addEventListener("load", async () => {
    try {
        const data = await getTrendingGifs(offsetPosition)
        offsetPosition += 25
        maxGifs = data.pagination.total_count
        renderGrid(data.data)
    }catch(err){
        console.log(err)
    }
})

window.addEventListener("scroll", async () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMoreGifs(totalGifCount, maxGifs)){
        try {
            const data = await getTrendingGifs(offsetPosition)
            totalGifCount+=25
            offsetPosition += 25
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
