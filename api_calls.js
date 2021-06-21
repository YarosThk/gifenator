const apiKey = "5X2j8Y2uf6f8BIRK5TFQr3hdLTDwAS7k";
let offsetPosition = 0 //with each query it will offset 25 GIFS

function hasMoreGifs(totalGifCount, maxCount) {
    //returns true if it has more quotes, false otherwise. It compares totalGifCount 
    //with data.pagination.total_count from GIPHY JSON object.
    //can work more to make it more precise I think
    return totalGifCount < maxCount
}

async function getGifs(q) {
    let searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=25&lang=en&q=${q}`;
    try{
        const queriedGifs = await fetch(searchUrl, { mode: "cors" })
        const data = await queriedGifs.json()
        return data.data
    }catch(err){
        console.log(err)
    }
}

async function getTrendingGifs() {
    let trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=r&offset=${offsetPosition}`;
    try {
        const trendingQuery = await fetch(trendingUrl, { mode: "cors" })
        const data = await trendingQuery.json()
        offsetPosition +=25
        return data

    }catch (err) {
        console.log(err)
    }
}

export { getGifs, getTrendingGifs, hasMoreGifs }