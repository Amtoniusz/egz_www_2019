const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const session = require('express-session');
const app = express();
const port = 8080;
app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'pug');
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.static(__dirname));
var db = new sqlite3.Database('baza.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to database');
});
app.listen(port, function () {
    console.log('Server listening on port : ' + port);
});
app.get('/getPokemon/:id/', function (req, res) {
    console.log("getPokemon " + req.params.id);
    sqlite3.verbose();
    let pokemons = [];
    db.all(`select * from pokemon LEFT JOIN pokemon_types ON pokemon.id = pokemon_types.pokemon_id WHERE id = ?;`, [req.params.id], (err, rows) => {
        //db.all(`select * from pokemon;`, [], (err, rows) => {
        rows.forEach((row) => {
            //console.log ( "name: " +row.name );
            //console.log ( "height: " +row.height );
            //console.log ( "weigth: " +row.weight );
            //console.log ( "id: "+ row.id );
            //console.log ( "t: "+ row.type_id );
            //console.log ( "t2: "+ row.t2 );
            //console.log ( "dengerous: "+ "nie" );
            pokemons.push({
                "name": row.name,
                "height": row.height,
                "weight": row.weight,
                "id": row.id,
                "dengerous": "nie",
                "t": row.type_id,
            });
        });
        //console.log(pokemons);
        res.json(pokemons);
    });
});
app.get('/getPokemonList', function (req, res) {
    console.log("getPokemonList ");
    sqlite3.verbose();
    let pokemons = [];
    //db.all(`select * from pokemon LEFT JOIN (select A.pokemon_id, A.type_id as t1 , B.type_id as t2, A.slot as s1 ,  B.slot as s2	 from pokemon_types as A LEFT JOIN  pokemon_types as B ON (A.pokemon_id = B.pokemon_id )  WHERE s1 = 1 AND s2 = 1 order by A.pokemon_id) as x ON pokemon.id = x.pokemon_id;`, [], (err, rows) => {
    db.all(`select * from pokemon;`, [], (err, rows) => {
        rows.forEach((row) => {
            //console.log ( "name: " +row.name );
            //console.log ( "height: " +row.height );
            //console.log ( "weigth: " +row.weight );
            //console.log ( "id: "+ row.id );
            //console.log ( "t1: "+ row.t1 );
            //console.log ( "t2: "+ row.t2 );
            //console.log ( "dengerous: "+ "nie" );
            pokemons.push({
                "name": row.name,
                "height": row.height,
                "weigth": row.weight,
                "id": row.id,
                "dengerous": "nie"
                // "t1": row.t1,
                // "t2": row.t2
            });
        });
        //console.log(pokemons);
        res.json(pokemons);
    });
});
