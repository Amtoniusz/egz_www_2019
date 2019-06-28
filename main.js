function clearList(id) {
    let lis = document.getElementById(id);
    while (lis.lastElementChild != null)
        lis.removeChild(lis.lastElementChild);
}
// select * from pokemon JOIN pokemon_types ON pokemon.id = pokemon_types.poke;
function resizeFunction() {
    console.log("resizeFunction " + window.innerWidth);
    let f = document.getElementById("stopka");
    let h = document.getElementById("naglowek");
    // f.textContent = "12";
    // f.style.color = "red";
    console.log(f);
    if (window.innerWidth < 600) {
        f.textContent = "Pokémon";
        h.textContent = "Pokémon";
    }
    else {
        f.textContent = "Pokémon – japoński serial anime tworzony od 1997 roku. W Japonii odcinki dzielą się na sześć serii: Pokémon, Pokémon: Advanced Generation, Pokémon: Diamond &amp; Pearl, Pokémon: Best Wishes!, Pokémon: XY i Pokémon Sun &amp; Moon, jednak wszędzie poza nią stosowany jest podział na 21 sezonów.";
        h.textContent = "Pokémon - nazwa serii gier konsolowych firmy Nintendo, tworzonych od 1996 przez Satoshiego Tajiri.";
    }
}
window.onresize = resizeFunction;
function clearTableId(id) {
    const table = document.getElementById(id);
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}
function storeId(id) {
    console.log("stored: " + id);
    localStorage.setItem("id", id.toString());
}
function addToList(tab, id, name, h, w, d) {
    let t = document.getElementById(tab);
    let newRow = t.insertRow(-1);
    let newCell = newRow.insertCell();
    let a = document.createElement("a");
    a.textContent = name;
    a.setAttribute('href', "pokemon.html");
    a.onclick = function () { storeId(id); };
    newCell.appendChild(a);
    newCell = newRow.insertCell();
    newCell.textContent = h;
    newCell = newRow.insertCell();
    newCell.textContent = w;
    newCell = newRow.insertCell();
    newCell.textContent = d;
}
function setList() {
    console.log("setList/ ");
    clearTableId("tabelka");
    fetch("/getPokemonList")
        .then(function (response) { return response.json(); })
        .then(function (myJson) {
        console.log(myJson);
        for (let i = 0; i < myJson.length; ++i) {
            localStorage.clear();
            let name = myJson[i].name;
            let height = myJson[i].height;
            let weigth = myJson[i].weigth;
            let id = myJson[i].id;
            let dengerous = myJson[i].dengerous;
            //let t1 = myJson[i].t1;
            //let t2 = myJson[i].t2;
            addToList("tabelka", id, name, height, weigth, dengerous);
        }
    });
}
function init() {
    resizeFunction();
    setList();
}
function initPokemon() {
    resizeFunction();
    getPokemon(parseInt(localStorage.getItem("id"), 10));
    console.log("storeId: " + localStorage.getItem("id"));
}
function getPokemon(id) {
    console.log("getPokomon/" + id);
    document.getElementById("type").textContent = "1";
    fetch("/getPokemon/" + id)
        .then(function (response) { return response.json(); })
        .then(function (myJson) {
        console.log(myJson);
        for (let i = 0; i < myJson.length; ++i) {
            document.getElementById("name").textContent = myJson[i].name;
            document.getElementById("weight").textContent = myJson[i].weight;
            document.getElementById("height").textContent = myJson[i].height;
            if (myJson[i].dengerous === "nie")
                document.getElementById("dengerous").textContent = "niegroźny";
            else
                document.getElementById("dengerous").textContent = "groźny";
        }
        if (myJson.length == 1)
            document.getElementById("type").textContent = myJson[0].t;
        else
            document.getElementById("type").textContent = myJson[0].t + "/" + myJson[1].t;
    });
}
function sortByColumn(column) {
}
