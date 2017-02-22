# SANE-seed
This is a fully functional basic SANE stack app seed. It has passport (with Auth0), gulp, and sass capabilities (gulp and sass not required for use).

### To use this seed
1. Git clone it
2. Run `npm install -g gulp` (if you want to use gulp)
3. In the project folder, run `npm install`
4. In one terminal window run `gulp` (if you want to use gulp)
5. Run 'nodemon' in another terminal window

### Example config.js
```javascript
var port = 3000;
module.exports = {
	PORT: port,
	MASSIVE_URI: 'postgres://localhost/testingdb',
	SESSION_SECRET: 'secret',
	INITALIZE_LOG: true,
	authConfig: {
    domain: 'Auth0 domain',
    clientID: 'Auth0 clientId',
    clientSecret: 'Auth0 clientSecret',
    callbackURL: 'http://localhost:' + port + '/auth/callback'
  }
};
```
