const express = require ( "express" );
 const bodyParser = require ( "body-parser");
const https = require ( "https");
require("dotenv").config();


const app = express () ;
app.use(bodyParser.urlencoded({extended: true}));
app.get( "/" , function(req, res )
{
    // console.log(__dirname);
    res.sendFile(  __dirname + "/index.html") ;
    

    
});
app.post( "/", function( req, res){
    
    // console.log( cityName);
    const queryAppId = process.ENV.ID;
    const queryCity =  req.body.cityName;
    const queryUnits = "metric" ;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + queryAppId + "&q=" + queryCity + "&units=" + queryUnits + "";
    https.get( url, function( response){
       
        console.log( response.statusCode);

        response.on("data", function(data){

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
                console.log(temp);
             const weatherDescription = weatherData.weather[0].description;
             const weatherIcon = weatherData.weather[0].icon;
            const imageURL =  "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            res.write("<p>the weather is currently "+ weatherDescription+  "</p>");
            res.write( "<h1>The temparature of " + queryCity +  " is " + temp + " degrees celsius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
    });
    });



});



app.listen ( 3000 , function( )
{
    console.log( " server is running at port 3000 " )  ;
})