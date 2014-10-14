// Accessing the pokeapi API
// There are 778 pokemon on the database
// We want to get a random one
// This function gets a random number between 0 and 778
function randomIntFromInterval(min,max){
    return Math.floor( Math.random() * (max - min + 1) + min);
};

// Connect to the API
// This is absolute dreadful. CORS. JSONP. Serve does not have approp response header. Have to get the data from the page by using it as the source of a script, then append it to the body.
function generate(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var pokeurl = url + randomIntFromInterval(0,718).toString() + "/";
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = pokeurl + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

// Run the generate a pokemon function

function makeAPokemon() {
    // Use the standard Pokemon URL and output it's name, species and abilities
    generate('http://pokeapi.co/api/v1/pokemon/', function(data) {
       // Insert the name of the Pokemon into the "name" span
       document.getElementById("name").innerHTML = data.name;
    });

    generate("http://pokeapi.co/api/v1/pokemon/", function(data) {
        // Insert each type the pokemon is into the "types" span
        var types = "";
        for (var i = 0; i < data.types.length; i++) {
            var typetoAdd = (data.types[i].name);
            typetoAdd = typetoAdd.charAt(0).toUpperCase() + typetoAdd.slice(1, (typetoAdd.length));
            types += typetoAdd + " ";
        }
        document.getElementById("types").innerHTML = types;
    });

    // Get a list of abilities and add them to the abilities ID
    generate("http://pokeapi.co/api/v1/pokemon/", function(data) {
        var abilities = "";
        for (var i = 0; i < data.abilities.length; i++) {
            var abilityToAdd = (data.abilities[i].name);
            abilityToAdd = abilityToAdd.charAt(0).toUpperCase() + abilityToAdd.slice(1, (abilityToAdd.length));

            abilities += "<li>" + abilityToAdd + "</li>";
        }
        document.getElementById("abilities").innerHTML = abilities;
    });

    // Run the generate function again, this time on the sprite url
    generate("http://pokeapi.co/api/v1/sprite/", function(data) {
        document.getElementById("sprite").src = "http://pokeapi.co" + data.image;
    });
}

var button = document.getElementById("generate");
button.addEventListener("click", makeAPokemon);

makeAPokemon();

// On button press
  // Get the random name
  // Get the random species
  // Get the random sprite
  // Get the random abilities
