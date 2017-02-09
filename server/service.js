'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const parser = require('properties-parser');

// get the keys from property file
const weatherAPIKey = parser.read('./apiKeys.properties')['weatherAPIKey'];

service.get('/service/:location', (req, res, next) => {

    request.get('http://api.openweathermap.org/data/2.5/weather?q=' + req.params.location + '&appid='+weatherAPIKey, (err, response) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const location = response.body.main;

        res.json(location);
    });
});

module.exports = service;