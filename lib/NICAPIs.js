var request = require('request');

function NICAPIs() {
	this.basePath = 'http://NICAPIS.mybluemix.net';
}

NICAPIs.prototype.getBasePath = function () {
	return this.basePath;
};

NICAPIs.prototype.setBasePath = function (basePath) {
	this.basePath = basePath;
};

NICAPIs.prototype.setAPICredentials = function (username, password) {
	this.username = username;
	this.password = password;
};
NICAPIs.prototype.getAccount = function (parameters, callback) {
	if (parameters.AccountId === undefined) {
		return callback(new Error('Required parameter "AccountId" has not been supplied'), null);
	}
	var path = '/accounts/get';
	var options = {
		method: 'GET',
		uri: this.basePath + path,
		headers: {},
		qs: {}
	};
	if (this.username === undefined || this.password === undefined) {
		} else if (this.username && this.password) {
		options.auth = {
			user: this.username,
			pass: this.password
		};
	}
	if (parameters.AccountId !== undefined) {
		options.qs.AccountId = parameters.AccountId;
		options.qs.client_id = parameters.client_id;
	}
	options.json = true;
	request(options, function (error, response, body) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, body);
		}
	});
};

module.exports = NICAPIs;
