var client = require("./client");
var fs = require("fs");


var options = {
    "hostName": "127.0.0.1",
    "port": 3000,
    "path": "",
    "method": "",
    "acceptType": ""
}
var appId = "";
var appSecret = "";

exports.options = options;

exports.init = function(id, secret) {
    appId = id;
    appSecret = secret;
}

exports.generatePDF = function (templateID, data, callback) {
    if (templateID == null || templateID == "")
        throw "Please supply a templateID";
    var requestData = {
        "data": data
    };
    options.path = "/api/templates/" + templateID + "/generate_pdf";
    options.method = "POST"
    client.request(options, requestData, appId, appSecret, callback);
}

exports.listTemplates = function (callback) {
    options.path = "/api/templates";
    options.acceptType = "application/json";
    options.method = "GET"
    client.request(options, {}, appId, appSecret, callback);
}

exports.newTemplate = function (callback) {
    options.path = "/api/templates";
    options.acceptType = "application/json";
    options.method = "POST"
    client.request(options, {}, appId, appSecret, callback);
}

exports.editTemplate = function (templateID, callback) {
    if (templateID == null || templateID == "")
        throw "Please supply a templateID";
    options.path = "/api/templates/" + templateID + "/edit";
    options.acceptType = "application/json";
    options.method = "GET"
    client.request(options, {}, appId, appSecret, callback);
}

exports.deleteTemplate = function (templateID, callback) {
    if (templateID == null || templateID == "")
        return false;
    options.path = "/api/templates/" + templateID;
    options.acceptType = "application/json";
    options.method = "DELETE"
    client.request(options, {}, appId, appSecret, callback);
}