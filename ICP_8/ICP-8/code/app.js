//Importing Require Modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const clarifai = require('clarifai');
const config = require('./config/config');

const clasrifaiApp = new clarifai.App({
    apiKey: config.key
});

const app = express();
const port = 3002;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Get method is used to fetch the data.
app.get("/getName", (req, res, next) => {
    console.log(req.query.url);
    clasrifaiApp.models.predict("e466caa0619f444ab97497640cefc4dc",req.query.url).then(
        function (response) {
            res.send(response.rawData.outputs[0].data.regions[0].data.face.identity.concepts[0].name);
        },
        function (err) {
            
        }
    );
});


app.listen(port, () => {
    console.log("Sever running in port : " + port);
});