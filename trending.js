import { getTrendingGifs, hasMoreGifs } from "./api_calls.js"
import { renderGrid } from "./display_controls.js"

let totalGifCount = 25 //start at 25 because window on load request 25 gifs. Later we add 25 with each request
let maxGifs = 0 //represents the total amount of GIFS existent in trending API query

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
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMoreGifs(totalGifCount, maxGifs)){
        try {
            const data = await getTrendingGifs()
            totalGifCount+=25
            renderGrid(data.data)
        } catch (err) {
            console.log(err)
        }
    }
})
