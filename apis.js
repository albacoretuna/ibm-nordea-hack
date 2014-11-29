module.exports = function(app, https, utmToLatLong, api) {

  app.post('/api/test', function(req, res){
    var payload = req.body.payload ? req.body.payload: "";
    var options = {
      host: 'nordea-api.icds.ibmcloud.com',
      path: '/nordea/sb'+req.body.path,
      method: req.body.method,
      port: 443,
      rejectUnauthorized: false,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": payload.length
      }
    };
    var data = "";
    var apiReq = https.request(options, function(response) {
      response.on('data', function(d) {
        data += d;
      });
      response.on('end', function() {
        dataObj = JSON.parse(data);
        res.send(dataObj);
      });
      response.on('error', function(error) {
        process.stdout.write(error);
      });
    });
    if (payload.length > 0) {
      apiReq.write(payload);
    }
    apiReq.end();
  });

  app.get('/api/getCustomer/:id', function(req, res){
    var options = {
      host: 'nordea-api.icds.ibmcloud.com',
      path: '/nordea/sb/customer/get?CustomerId='+req.params.id+"&client_id=<INTSERT CLIENT ID HERE>",
      method: "GET",
      port: 443,
      rejectUnauthorized: false,
      headers: {
        "Content-Type": "application/json"
      }
    };

    var data = "";
    var apiReq = https.request(options, function(response) {
      response.on('data', function(d) {
        data += d;
      });
      response.on('end', function() {
        var customer = JSON.parse(data);
        var latlong = utmToLatLong(customer.Y400, customer.X400, 32);
        customer.latitude = latlong.latitude;
        customer.longitude = latlong.longitude;
        res.send(customer);
      });
      response.on('error', function(error) {
        process.stdout.write(error);
      });
    });
    apiReq.end();
  });

  app.get('/api/getAccount/:id', function(req, res){
    var options = {
      host: 'nordea-api.icds.ibmcloud.com',
      path: '/nordea/sb/accounts/get?AccountId='+req.params.id+"&client_id=<INTSERT CLIENT ID HERE>",
      method: "GET",
      port: 443,
      rejectUnauthorized: false,
      headers: {
        "Content-Type": "application/json"
      }
    };

    var data = "";
    var apiReq = https.request(options, function(response) {
      response.on('data', function(d) {
        data += d;
      });
      response.on('end', function() {
        res.send(data);
      });
      response.on('error', function(error) {
        process.stdout.write(error);
      });
    });
    apiReq.end();
  });
};
