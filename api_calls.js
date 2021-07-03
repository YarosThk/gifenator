import { API_KEY } from "./config.js"

function hasMoreGifs(totalGifCount, maxCount) {
    console.log("here here here")
    //returns true if it has more quotes, false otherwise. It compares totalGifCount 
    //with data.pagination.total_count from GIPHY JSON object.
    return totalGifCount < maxCount
}

function catchFetchErrors(response){
    if(!response.ok){
        //meaning the status code is not in successful range
        throw Error(`Response status: ${response.status}`)
    }
    return response
}

async function getGifs(q) {
    let searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=25&lang=en&q=${q}`;
    const queriedGifs = await fetch(searchUrl, { mode: "cors" })
    catchFetchErrors(queriedGifs)
    const data = await queriedGifs.json()
    return data.data
}

async function getTrendingGifs(offsetPosition) {
    let trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&rating=r&offset=${offsetPosition}`;
    const trendingQuery = await fetch(trendingUrl, { mode: "cors" })
    catchFetchErrors(trendingQuery)
    const data = await trendingQuery.json()
    return data
}

export { getGifs, getTrendingGifs, hasMoreGifs, catchFetchErrors }