const gifCarousel = document.querySelector(".carousel")
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
    d.forEach(gif => {
        let gifBox = createDiv("gif")
        let objPath = gif.images.fixed_width.webp //fixed with is 200
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

export {renderGif, renderGrid}