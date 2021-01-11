const path = require('path');
const express = require('express');
const request = require('request');
const app = express();
const apiUrlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Nehru%20Nagar%20East%20Bhilai.json?access_token=pk.eyJ1IjoidmFzdTIyIiwiYSI6ImNrajQ5eGNxZjN0ZXkyeW40aGx2c2R2dHQifQ.En-W4fSUJgvz3QpxLOvRzA';
const apiUrlWeatherStack = 'http://api.weatherstack.com/current?access_key=45c59e05a2e62a65eab23b30cf88cf96&query=bhilai';
const port = process.env.PORT || 3000;

console.log(__dirname);
console.log(__filename);
const publicDirPath = path.join(__dirname,'../public');
app.use(express.static(publicDirPath));

app.get('/', (req,res) => {
    res.send("<h1>Hello Express New Page here.</h1>");
});

app.get('/help', (req,res) => {
    res.send("Help Page Content");
});

app.get('/career', (req,res) => {
    res.send("This is career page.");
});


app.get('/contact', (req,res) => {
    res.send("Contact Page Content");
});

app.get('/about', (req,res) => {
    res.send("About Page Content");
});

app.get('/location', (req,res) => {
    
    request({url : apiUrlMapBox, json : true}, (error,response) => {	
        
            res.send([{
            'Latitude' : response.body.features[0].center[0],
            'Longitude' : response.body.features[0].center[1]
            
            },
            {
                Place : response.body.features[0].place_name
            }]);
        
    });
});

app.get('/weather', (req,res) => {
    
    request({url : apiUrlWeatherStack, json : true}, (error,response) => {	
        
            res.send({
                'Weather Descriptions' : response.body.current.weather_descriptions[0],
                'Temprature' : response.body.current.temperature,
                'humidity' : response.body.current.humidity
            });
        
    });
});

app.listen(port, () => {
    console.log("Server is running on Port 3000");
});