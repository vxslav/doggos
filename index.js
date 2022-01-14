//fetch attempt
window.addEventListener("load", getBreeds);
function getBreeds() {
     fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then((data) => {
                let breeds = [];
                    for (breed in data.message) {
                        breeds.push(breed);
                    }
                    let html = document.getElementById("dog-options").innerHTML
                    const template = Handlebars.compile(html)
                    document.getElementById("breeds").innerHTML = template(breeds)
                    const select = document.getElementById("breeds")
                    const btn = document.getElementById("fetch")
                    btn.addEventListener("click", getImage)
                    select.addEventListener("change", getImage)
        })
        .catch(err => console.log(err))
}
function getImage() {
    const select = document.getElementById("breeds")
    let target = select.options[select.selectedIndex].text;
    fetch(`https://dog.ceo/api/breed/${target}/images/random`)
        .then(response => response.json())
        .then(data => createImg.call(data))
        .catch(err => console.log(err))
}
document.getElementById("random").addEventListener("click", () => {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => createImg.call(data))
        .catch(err => console.log(err))
})
function createImg() {
    let img = document.getElementById("dog-img").innerHTML;
    let imgTemplate = Handlebars.compile(img);
    document.getElementById("img").innerHTML = imgTemplate(this)
}