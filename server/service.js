'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const parser = require('properties-parser');

// get the keys from property file
const marsAPIKey = parser.read('./apiKeys.properties')['marsAPIKey'];

service.get('/service/:camera', (req, res, next) => {
    request.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=' + req.params.camera + '&api_key='+marsAPIKey, (err, response) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const image = response.body.photos[0];
        res.json(image);
    });
});

module.exports = service;