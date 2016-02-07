var CryptoJS = require("crypto-js");
var request = require('request');
var config = require('../../config/environment');
var _ = require('lodash');

var WithingsService = (function() {
    var protocol = 'http';
    var host = 'wbsapi.withings.net';
    var resource = 'measure';
    // return a random string

    var getNonce = function(N) {
            return (Math.random().toString(36) + '00000000000000000').slice(2, N + 2)
        }
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
        getData: function(user) {
            var param = {
                "action": 'getmeas',
                "oauth_consumer_key": config.withings.clientID,
                "oauth_nonce": getNonce(10),
                "oauth_signature_method": 'HMAC-SHA1',
                "oauth_timestamp": new Date().getTime(),
                "oauth_token": user.oauth_token,
                "oauth_version": '1.0',
                "userid": user.userid,
                "category": 1
            };
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
