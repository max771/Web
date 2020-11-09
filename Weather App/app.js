const express = require("express");
const fetch = require('node-fetch')
const hbs = require("hbs");
hbs.registerPartials(__dirname + '/views/partials');
let app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');



app.get('/', (req, res) =>{
    res.send("Hello JS<br><a href='../login'>Press for Continue</a>");
});
app.get('/weather', (req,res) => {
    const weather = {
        description: "Clear sky"
    }
    res.render('weather.hbs', {weather})
});
app.get('/weather/:city', async function (req,res) {
    var city = req.params.city;
    var appId = '9f14818550a75877c7dcdd3994f0f5d6';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`;
    var result = await fetch(url);
    var weather = await result.json();

    res.render('weather.hbs',{city, weather});
});
app.get('/login', (req,res) => {
    res.render('login.hbs')
});




app.listen(process.env.PORT || 3000, () =>{
    console.log("Example app listening onport 3000");
});