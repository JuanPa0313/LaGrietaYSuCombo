/**
 * Created by jprod01 on 11/03/2016.
 */
var express = require('express');
var request = require('request');
var async = require('async');
var bodyParser = require('body-parser');
var url = 'https://global.api.pvp.net';
var api_key = '&api_key=50771ef6-d1ce-4e0c-8f75-9dee56ffdaa8';
var champs = require('./Champions.json')
var app = express();
var API ={
    getChampionsImages:'/api/lol/static-data/lan/v1.2/champion?champData=image',
    getChampionDetails:'/api/lol/static-data/lan/v1.2/champion/'
}

//use body parser to get json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//OBTENER TODAS LAS IMAGENES DE LOS CAMPEONES
app.get('/api/getChampImages', function (req, res) {
    var data ={};
    async.waterfall([
        function(callback){
            request(url+API.getChampionsImages+api_key, function(err, response, body){
                if(!err && response.statusCode==200){
                    var json = JSON.parse(body);
                    data=json;
                    callback(null, data);
                }else {
                    console.log(err);
                }
            });
        }
    ],
    function(err, data){
        if(err){
            console.log(err);
            return;
        }

        res.json(data);
    });
});
/*GET OBTENER INFORMACION DETALLADA DE CAMPEON POR ID*/
app.get('/api/getDetailsChamp/:id', function(req, res){
    var options ='?champData=all';
    var data ={};
    async.waterfall([
            function(callback){
                request(url+API.getChampionDetails+req.params.id+options+api_key, function(err, response, body){
                    if(!err && response.statusCode==200){
                        console.log("entro!");
                        var json = JSON.parse(body);
                        data=json;
                        console.log(json);
                        callback(null, data);
                    }else {
                        console.log(err);
                    }
                });
            }
        ],
        function(err, data){
            if(err){
                console.log(err);
                return;
            }

            res.json(data);
        });
});

app.listen(3030, function () {
    console.log('Example app listening on port 3030!');
});