const express = require("express");
const app = express();
const https = require('https');
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")


});

app.post("/", (req, res) => {

    const query = req.body.cityName
    const apiKey = "ab36dadc390227bd83e6a698a12261c2"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + ""

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            console.log(temp);
            const description = weatherData.weather[0].description;
            console.log(description);
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.send("<h1>The temp in " + query + " is " + temp + " and weather description is </h1>" + "<h1>" + description + "</h1>" + "<img src = " + imgUrl + ">")
        })
    })
})



app.listen(3000, function () {
    console.log("im here at 3000");
})