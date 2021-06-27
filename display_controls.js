const queriedGifs = document.querySelector(".queried-gifs")
const gifContainer = document.querySelector(".gif-container")
const carousel = document.querySelector(".carousel")
const gifGrid = document.querySelector(".gif-grid")

function renderGrid(d) {
    if (typeof d === "undefined"){
        return;
    }
    d.forEach(gif => {
        let objPath = gif.images.fixed_width.webp
        let gifMedia = gifElement(objPath, "gif__img")
        gifGrid.appendChild(gifMedia)
    })
}

function renderGif(d) {
    if(d.length > 0){
        gifContainer.style.display = ""
        d.forEach(gif => {
            let gifBox = createDiv("gif")
            let objPath = gif.images.fixed_width.webp //fixed with is 200
            let gifMedia = gifElement(objPath, "gif__img")

            gifBox.appendChild(gifMedia)
            carousel.appendChild(gifBox)
        });
    }else{
        gifContainer.style.display = "none"
        emptyIndicator()
    }
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

function emptyIndicator(){
    let empty_div = createDiv("empty-query-indicator")
    empty_div.innerHTML = `<span class="material-icons">
                                    no_photography
                            </span>
                            <p>NO GIFS FOUND</p>`

    queriedGifs.appendChild(empty_div)
}

function removeEmptyIndicator(){
    if (document.querySelector(".empty-query-indicator")){
        queriedGifs.removeChild(document.querySelector(".empty-query-indicator"))
    }else{
        return
    }
}

function clearCarousel(){
    if(carousel.hasChildNodes){
        while(carousel.firstChild){
            carousel.removeChild(carousel.firstChild)
        }
    }
}
export { renderGif, renderGrid, clearCarousel, removeEmptyIndicator}