window.addEventListener("load", getAllBreeds);
function getAllBreeds() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://dog.ceo/api/breeds/list/all");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText);
            let breeds = [];
            for (breed in obj.message) {
                breeds.push(breed);
            }
            let html = document.getElementById("dog-options").innerHTML;
            const template = Handlebars.compile(html);
            document.getElementById("breeds").innerHTML = template(breeds)
            const select = document.getElementById("breeds")
            const btn = document.getElementById("fetch");
            btn.addEventListener("click", getImage)
            select.addEventListener("change", getImage)
        }
    };
    xhr.send();
}
function getImage() {
    const select = document.getElementById("breeds")
    let target = select.options[select.selectedIndex].text;
    let xhr2 = new XMLHttpRequest();
    xhr2.open("GET", `https://dog.ceo/api/breed/${target}/images/random`);
    xhr2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            createImg.call(xhr2);
        }
    }
    xhr2.send();
}
let random = document.getElementById("random");
random.addEventListener("click", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://dog.ceo/api/breeds/image/random");
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status >= 200 && this.status <= 299) {
            createImg.call(xhr);
        }
    }
    xhr.send();
})
function createImg() {
    let link = JSON.parse(this.responseText)
    let img = document.getElementById("dog-img").innerHTML;
    let imgTemplate = Handlebars.compile(img);
    document.getElementById("img").innerHTML = imgTemplate(link)
}