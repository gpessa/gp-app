'use strict';

var _ = require('lodash');
var CryptoJS = require("crypto-js");
var config = require('../../config/environment');
var request = require('request');


var generateOAuthBaseString = function (protocol, host, resource, parameters){
    var sortedKeys = Object.keys(parameters);
    sortedKeys.sort();

    var paramPart = "";
    var amp = "";
    for (var i = 0 ; i < sortedKeys.length; i++){
        paramPart+=amp+sortedKeys[i]+"="+parameters[sortedKeys[i]];
        amp = "&";
    }
    return ("GET"+"&"+encodeURIComponent(protocol+"://"+host+"/"+resource)+"&"+encodeURIComponent(paramPart));
}

var getNonce = function(N){
  return (Math.random().toString(36)+'00000000000000000').slice(2, N+2)
}

var getQueryString = function(parameters){
  var urlrequest = "?";
  var sortedKeys = Object.keys(parameters);
  var amp = "";
  sortedKeys.sort();
  for (var i = 0 ; i < sortedKeys.length; i++){
      urlrequest+=amp+sortedKeys[i]+"="+parameters[sortedKeys[i]];
      amp = "&";
  }
  return urlrequest;
}

var getMeasure = function(measures, type){
  var result = _.filter(measures.measures, { "type" : type });

  if(result.length){
    result = result[0].value * Math.pow(10, result[0].unit);
    result = _.floor(result, 2);
  } else {
    result = undefined;
  }

  return result;
}

var getLastUpdateDate = function(){
  var start  = new Date();

  start.setDate(start.getDate() - 180);

  return start.getTime() / 1000
}

// Get list of withings/measures
exports.index = function(req, res) {

  var withings = req.user.withings;

  var protocol = 'http';
  var host = 'wbsapi.withings.net';
  var resource = 'measure';

  var parameters = {
    action : 'getmeas',
    oauth_consumer_key : config.withings.clientID,
    oauth_nonce : getNonce(10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_timestamp : new Date().getTime(),
    oauth_token : withings.accessToken,
    oauth_version : '1.0',
    userid: withings.id,
    category : 1
  };

  var consumerSecret = config.withings.clientID;
  var tokenSecret = config.withings.WITHINGS_SECRET;

  var baseString = generateOAuthBaseString(protocol, host, resource, parameters);
  var oAuthSecret = config.withings.clientSecret + "&" + withings.refreshToken;
  parameters.oauth_signature = encodeURIComponent(CryptoJS.HmacSHA1(baseString, oAuthSecret).toString(CryptoJS.enc.Base64));

  var urlrequest = protocol + "://" + host + "/" + resource + getQueryString(parameters);

  //Lets configure and request
  request({
    json:true,
    url: urlrequest, //URL to hit
    method: 'GET'
  }, function(error, response, body){
    if(error) {
      console.log(error);
    } else {

      var measures = response.body.body.measuregrps;
      var result = {
        weights : [],
        fats : [],
        labels : []
      };

      _.forEach(measures, function(measure) {
        var date = new Date(measure.date * 1000);
        date.setHours(0);
        date.setSeconds(0);
        date.setMinutes(0);

        measure.date = date;
      });

      var endDate = measures[0].date;
      var startDate = measures[measures.length - 1].date;

      while (startDate.valueOf() !== endDate.valueOf()){

        result.labels.push( new Date(startDate.valueOf()) );

        var measure = _.filter(measures, {date : startDate});

        if(measure.length){
          var weight = getMeasure(measure[0], 1);
          result.weights.push(weight);

          var fat = getMeasure(measure[0], 8);
          result.fats.push(fat);
        } else {
          result.weights.push(undefined);
          result.fats.push(undefined);
        }

        startDate.setDate(startDate.getDate() + 1);
      }

      res.status(response.statusCode).json(result);
    }
  });

};


function handleError(res, err) {
  return res.status(500).send(err);
}