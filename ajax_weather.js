function makeRequest() {

    var httpRequest = new XMLHttpRequest(); // permet de faire une requête

    var city = document.getElementById("cityname").value; // récup de la ville entrée dans le champ de saisi

    httpRequest.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=541e8f06a430799375af84e58b27c8c8&units=metric", true); // adresse à trouver sur https://openweathermap.org/, dans la rubrique API call : "by city name" + &APPID=la key envoyée par openweather après inscription + units=metric pour convertir les unités Fahrenheit en Celsius


    httpRequest.onreadystatechange = function () { // récup de la réponse 
        if (httpRequest.readyState == 4 && httpRequest.status == 200) { // vérification de la requête
            var answer = httpRequest.response;
            var category = JSON.parse(answer); // conversion de la réponse de la requête en objet JSON

            console.log(category);

            var temperature = category.main.temp; // récup de la température (dans la sous-catégorie "temp" de la catégorie "main")
            var country = category.sys.country; // récup du pays (dans la sous-catégorie "country" de la catégorie "sys")
            var feelslike = category.main.feels_like; // récup du ressenti de la température (dans la sous-catégorie "feels_like" de la catégorie "main")
            var wind = category.wind.speed; // récup de la vitesse du vent (dans la sous-catégorie "speed" de la catégorie "wind")
            var weather = category.weather[0].description; // récup de la description de la météo ("description" se trouve dans la cellule 0 du tableau "weather")
            document.getElementById("results").textContent = "Il fait actuellement " + temperature + "°C à " + city + " (" + country + ")" + ", avec un ressenti de " + feelslike + "°C.";
            document.getElementById("results").innerHTML += "<br>Etat du ciel : " + weather + ".";
            document.getElementById("results").innerHTML += "<br>Le vent souffle à une vitesse de " + wind + " km/h.";
        }
    }

    httpRequest.send(); // envoi de la requête
}

document.getElementById("btnsearch").addEventListener("click", makeRequest); // exécuter la fonction makeRequest quand on clique sur le bouton "Search"
