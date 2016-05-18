var CryptoJS = require("crypto-js");
var request = require('request');
var config = require('../../config/environment');
var nonce = require('nonce');

var WithingsService = (function() {
    var protocol = 'http';
    var host = 'wbsapi.withings.net';
    var resource = 'measure';
    // transform a json to a query string

    var getQueryString = function(parameters) {
        var urlrequest = "?";
        var sortedKeys = Object.keys(parameters);
        var amp = "";
        sortedKeys.sort();
        for (var i = 0; i < sortedKeys.length; i++) {
            urlrequest += amp + sortedKeys[i] + "=" + parameters[sortedKeys[i]];
            amp = "&";
        }
        return urlrequest;
    }

    var generateOAuthBaseString = function(protocol, host, resource, parameters) {
        var sortedKeys = Object.keys(parameters);
        sortedKeys.sort();
        var paramPart = "";
        var amp = "";
        for (var i = 0; i < sortedKeys.length; i++) {
            paramPart += amp + sortedKeys[i] + "=" + parameters[sortedKeys[i]];
            amp = "&";
        }
        return ("GET" + "&" + encodeURIComponent(protocol + "://" + host + "/" + resource) + "&" + encodeURIComponent(paramPart));
    }

    return {
        getData: function(user, days) {

          var param = {
            "action": 'getmeas',
            "oauth_consumer_key": config.withings.clientID,
            "oauth_nonce": nonce(10)(),
            "oauth_signature_method": 'HMAC-SHA1',
            "oauth_timestamp": new Date().getTime(),
            "oauth_token": user.oauth_token,
            "oauth_version": '1.0',
            "userid": user.userid,
            "category": 1
          };

          if(days){
            var d = new Date(); // today!
            d.setDate(d.getDate() - parseInt(days));
            var startdate = parseInt(d.valueOf() / 1000); //(d.getTime() / 1000);
            param.startdate = startdate;
          }

          var consumerSecret = param.oauth_consumer_key;
          var tokenSecret = config.withings.WITHINGS_SECRET;
          var baseString = generateOAuthBaseString(protocol, host, resource, param);
          var oAuthSecret = config.withings.clientSecret + "&" + user.refresh_token;
          param.oauth_signature = encodeURIComponent(CryptoJS.HmacSHA1(baseString, oAuthSecret).toString(CryptoJS.enc.Base64));
          var urlrequest = protocol + "://" + host + "/" + resource + getQueryString(param);
          var promise = new Promise(function(resolve, reject) {

          request({
            json: true,
            url: urlrequest, //URL to hit
            method: 'GET'
          }, function(err, res, body) {
            if (err) reject(err);
            else resolve(body);
          });

        });
        return promise;
      }
    }
})();
module.exports = WithingsService;
