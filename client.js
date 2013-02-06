var crypto = require('crypto');
var http = require("http");

pad = function(n) {
    if (n < 10) {
        return "0" + n;
    } else {
        return n;
    }
};

timestamp = function() {
    var day, dow, hours, minutes, month, now, seconds, year;
    now = new Date();
    year = now.getUTCFullYear();
    month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][now.getUTCMonth()];
    dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getUTCDay()];
    day = pad(now.getUTCDate());
    hours = pad(now.getUTCHours());
    minutes = pad(now.getUTCMinutes());
    seconds = pad(now.getUTCSeconds());
    return "" + dow + ", " + day + " " + month + " " + year + " " + hours + ":" + minutes + ":" + seconds + " GMT";
};

sign_request = function(http_options, key, secret) {
    var canonical_string, hmac_signature, hmac_signature_base64, _base, _ref, _ref2;
    if (( _ref = http_options['headers']) == null) {
        http_options['headers'] = {};
    }
    if (( _ref2 = (_base = http_options['headers'])['DATE']) == null) {
        _base['DATE'] = timestamp();
    }
    canonical_string = (http_options['method'] || 'GET');
    canonical_string += (http_options['headers']['Content-Type'] || '');
    canonical_string += (http_options['headers']['CONTENT_MD5'] || '');
    canonical_string += (http_options['headers']['Content-Length'] || '0');
    canonical_string += http_options['headers']['DATE'];
    canonical_string += (http_options['path'] || '');
    hmac_signature = crypto.createHmac("sha1", secret);
    hmac_signature.update(canonical_string);
    hmac_signature_base64 = hmac_signature.digest("base64");
    return http_options['headers']['AUTHENTICATION'] = key + ":" + hmac_signature_base64;
};

exports.request = function(options, data, appId, appSecret, callback) {
    var requestBody = JSON.stringify(data);
    
    var http_options = {
        "hostname" : options.hostName,
        "port" : options.port,
        "method" : options.method,
        "path" : options.path,
        "headers" : {
            "CONTENT_MD5" : '',
            "Content-Type" : "application/json",
            "Content-Length" : requestBody.length,
            "Accept" : options.acceptType
        }
    };
    
    sign_request(http_options, appId, appSecret);
    
    var req = http.request(http_options, function(res) {
        if (options.acceptType == "application/pdf")
            res.setEncoding('binary');
        
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        
        res.on('end', function() {
            callback(body);
        });
    });
    
    req.write(data);
    req.end();
}
