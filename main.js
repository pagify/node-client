var client = require("./client");
var fs = require("fs");


var options = {
    "hostName": "127.0.0.1",
    "port": 3000,
    "method": "",
    "method": "POST",
    "acceptType": ""
}
var appId = "";
var appSecret = "";

exports.init = function(id, secret) {
    appId = id;
    appSecret = secret;
}

exports.generatePDF = function (templateID, data, callback) {
    var requestData = {
        "template_id" : templateID,
        "data": data
    };
    options.path = "/api/generate_pdf";
    options.acceptType = "application/pdf";
    client.request(options, requestData, appId, appSecret, callback);
}

exports.listTemplates = function (callback) {
    options.path = "/api/list_templates";
    options.acceptType = "application/json";
    client.request(options, {}, appId, appSecret, callback);
}

exports.newTemplate = function (callback) {
    options.path = "/api/new_template";
    options.acceptType = "application/json";
    client.request(options, {}, appId, appSecret, callback);
}

exports.editTemplate = function (templateID, callback) {
    var requestData = {
        "template_id" : templateID
    };
    options.path = "/api/edit_template";
    options.acceptType = "application/json";
    client.request(options, requestData, appId, appSecret, callback);
}

exports.deleteTemplate = function (templateID, callback) {
    var requestData = {
        "template_id" : templateID
    };
    options.path = "/api/delete_template";
    options.acceptType = "application/json";
    client.request(options, requestData, appId, appSecret, callback);
}