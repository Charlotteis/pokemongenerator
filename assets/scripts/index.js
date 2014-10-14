// There are 778 pokemon on the database
// This function gets a random number between 0 and 778
function randomIntFromInterval(min,max){
    return Math.floor( Math.random() * (max - min + 1) + min);
};

// Connect to the API
// This is absolute dreadful:
    // I want to fetch the JSONP from the Poke Api, because using this format enables us to get past the Same Origin Policy which only allows us to fetch data from scripts within the same website. I.E I can only access the pokemon api if it was hosted on the same site I was trying to use it on.
    // Unfortunately, the way to fetch data from a server in Vanilla JS is to use and xmlhttprequest(). However, the xmlhttprequest does not deal with JSONP so we need to use an ugly work around that I found on Stack Overflow: http://stackoverflow.com/questions/22780430/javascript-xmlhttprequest-using-jsonp
    // What this workaround does is define a callback, fetch the data from the url and add the data url as a script within the document.

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

// Make a randomly generated pokemon by running the generate function several times

function makeAPokemon() {
    // Use the standard Pokemon URL and output it's name
    generate('http://pokeapi.co/api/v1/pokemon/', function(data) {
       // Insert the name of the Pokemon into the "name" span
       document.getElementById("name").innerHTML = data.name;
    });

    // Use the standard Pokemon URL and output it's types
    generate("http://pokeapi.co/api/v1/pokemon/", function(data) {
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
        document.getElementById("types").innerHTML = types;
    });

    // Get a list of abilities and add them to the abilities ID
    generate("http://pokeapi.co/api/v1/pokemon/", function(data) {
        var abilities = "";
        // Loop over all the types contained in the abilities array received from the pokeapi
        for (var i = 0; i < data.abilities.length; i++) {
            // Set the current ability we will add to the "abilities" span
            var abilityToAdd = (data.abilities[i].name);
            // Capitalise the first letter of the current ability
            abilityToAdd = abilityToAdd.charAt(0).toUpperCase() + abilityToAdd.slice(1, (abilityToAdd.length));
            // Append the current ability to the overall "abilities" variable
            abilities += "<li>" + abilityToAdd + "</li>";
        }
        // Insert each ability the pokemon has into the "abilities" span
        document.getElementById("abilities").innerHTML = abilities;
    });

    // Run the generate function again, this time on the sprite url
    generate("http://pokeapi.co/api/v1/sprite/", function(data) {
        // Set the received sprite image as the img src for the main image in the HTML
        document.getElementById("sprite").src = "http://pokeapi.co" + data.image;
    });
}

var button = document.getElementById("generate");
// When the button is clicked, run the makeAPokemon() function
button.addEventListener("click", makeAPokemon);

// Run the makeAPokemon() function once when the page loads
makeAPokemon();
