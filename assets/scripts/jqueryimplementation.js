// There are 778 pokemon on the database
// This function allows us to generate a random number between two limits
function randomIntFromInterval(min,max){
    return Math.floor( Math.random() * (max - min + 1) + min);
};

// A more specific number between 0 and the number of poke on database
function randPokemon() {
    return randomIntFromInterval(0, 718).toString();
}

// Fetch a random pokemon name
function generateName(urlinput, id) {
    var generateurl = "http://pokeapi.co/api/v1/" + urlinput + randPokemon();

    $.ajax({
        type: "GET",
        url: generateurl,
        // Set the data to fetch as jsonp to avoid same-origin policy
        dataType: "jsonp",
        async: true,
        success: function(data){
            // If the ajax call is successfull, add the name to the "name" span
            $(id).text(data.name);
        }
    });
}

// Fetch random pokemon types
function generateTypes(urlinput, id) {
    var generateurl = "http://pokeapi.co/api/v1/" + urlinput + randPokemon()

    $.ajax({
        type: "GET",
        url: generateurl,
        dataType: "jsonp",
        async: true,
        success: function(data){
            var types = "";
            // Loop over all the types contained in an array
            for (var i = 0; i < data.types.length; i++) {
                // Set the current type we will add to the "types" span
                var typetoAdd = (data.types[i].name);
                // Capitalise the first letter of the current ability
                typetoAdd = typetoAdd.charAt(0).toUpperCase() + typetoAdd.slice(1, (typetoAdd.length));
                // Append the current type to the overall "types" variable
                types += typetoAdd + " ";
            }
            // Insert each type the pokemon is into the "types" span
            $(id).text(types);
        }
    });
}

// Fetch random pokemon abilities
function generateAbilities(urlinput, id) {
    var generateurl = "http://pokeapi.co/api/v1/" + urlinput + randPokemon()

    $.ajax({
        type: "GET",
        url: generateurl,
        dataType: "jsonp",
        async: true,
        success: function(data){
            var abilities = "";
            // Loop over all the abilities
            for (var i = 0; i < data.abilities.length; i++) {
                // Set the current ability we will add to the "abilities" span
                var abilityToAdd = (data.abilities[i].name);
                // Capitalise the first letter of the current ability
                abilityToAdd = abilityToAdd.charAt(0).toUpperCase() + abilityToAdd.slice(1, (abilityToAdd.length));
                // Append the current ability to the overall "abilities" variable
                abilities += "<li>" + abilityToAdd + "</li>";
            }
            // Insert abilities to "abilities" span
            $(id).html(abilities);
        }
    });
}

// Fetch a random pokemon image
function generateSprite(urlinput, id) {
    var generateurl = "http://pokeapi.co/api/v1/" + urlinput + randPokemon()

    $.ajax({
        type: "GET",
        url: generateurl,
        dataType: "jsonp",
        async: true,
        success: function(data){
            var href = "http://pokeapi.co" + data.image;
            // Add random image source to the sprite image source
            $(id).attr("src", href);
        }
    });
}

// Use all generate functions together to make a new random pokemon!
function makeAPokemon() {
    generateName("pokemon/", "#name");
    generateTypes("pokemon/", "#types");
    generateAbilities("pokemon/", "#abilities")
    generateSprite("sprite/", "#sprite")
}

// If the generate button is clicked, call the makeAPokemon() function
$("#generate").on("click", makeAPokemon);

// Call the makeAPokemon() function once initial page load
makeAPokemon();
