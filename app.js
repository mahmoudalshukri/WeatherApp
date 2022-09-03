const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
})
app.post('/', function(req, res){
    let city = req.body.city;
    let query = city;
    const apiKey = "b125838b12c4de66f5fa5ac1cc690246";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey+"&units="+ unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.write("<h1>The Temprature In "+query+" Is: " + temp + "C </h1>");
            res.write("<p> The Weather Is Currently: " + description + "</p>");
            res.write("<img src = 'http://openweathermap.org/img/wn/" + icon + "@2x.png'>")
            res.send()
        })
    })
})
app.listen(3000, function(){
    console.log("server starts at port 3000");
});

