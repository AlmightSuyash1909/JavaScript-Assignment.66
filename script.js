let root = document.querySelector(".cards");
let rootTags = document.querySelector(".tags");
let search = document.querySelector(".search");


let allPeople = got.houses.reduce((acc, cv) => {
    acc = acc.concat(cv.people);
    return acc;
} , []); 

let allTags = got.houses.map(house => house.name)

let activeHouse = "";


function createCards( data = [] ) {
    root.innerHTML = "";
    data.forEach((people) => {
        let li = document.createElement("li")

        let img = document.createElement("img");
        img.src = people.image;
        img.alt = people.name;

        let h2 = document.createElement("h2");
        h2.innerText = people.name;

        let p = document.createElement("p");
        p.innerText = people.description;

        let a = document.createElement("a");
        a.innerText = "Read More!";
        a.classList.add("btn")
        a.href = people.wikiLink;

        li.append(img,h2,p,a);
        li.classList.add("card")

        root.append(li);
    })
}

function createTagsUi(tags = []) {
    rootTags.innerHTML = "";
    tags.forEach((tag) => {
        let li = document.createElement("li");
        li.innerText = tag;
        if (activeHouse === tag){
            li.classList.add("active")
        }

        li.addEventListener('click', () => {
            activeHouse = tag;
            let peopleOfTheHouse = got.houses.find(house => house.name === tag).people || [];
            createCards(peopleOfTheHouse)
            createTagsUi(allTags)

        })
        rootTags.append(li)
    })
}

function handleSearch (event) {
    let searchText = event.target.value;
    let filteredPeople = allPeople.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()));
    createCards(filteredPeople)
}

search.addEventListener("input", handleSearch);
createCards(allPeople);
createTagsUi(allTags)