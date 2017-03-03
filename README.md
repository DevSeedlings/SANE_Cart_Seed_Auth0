# SANE_Cart_Seed_Auth0
This is a fully functional basic SANE stack app seed. It has passport Auth0, gulp, and sass capabilities.

* Tested to work with google and facebook
* This system will link all accounts with matching emails

## To use this seed

### Code setup
1. Clone this repo.
2. In the terminal, navigate to the project folder and run 'npm i'.
3. Create a 'config.js' file in the server folder (It is already ignored).

#### should look something like this. (Update for your use)
```javascript
var port = 3000; // Feel free to change the port number
module.exports = {
 PORT: port,
 MASSIVE_URI: 'postgres://localhost/testingdb',
 SESSION_SECRET: 'secret',
 INITALIZE_LOG: true,
 AUTH_CONFIG: {
		domain: 'Auth0 domain (Found in Auth0 setup step 5)',
		clientID: 'Auth0 clientId (Found in Auth0 setup step 5)',
		clientSecret: 'Auth0 clientSecret (Found in Auth0 setup step 5)',
		callbackURL: 'http://localhost:' + port + '/auth/callback'
	}
};
```

### Auth0 setup
1. Go to auth0.com and log in / sign up.
2. On the Dashboard, click the new client button in the top right corner.
3. Give your app a name and select the 'Single Page Web App' client type.
4. On your client page, click the settings tab.
5. Here you will find all the info you will need to finish your 'config.js'.
6. Scroll down and add 'http://localhost:PORT/auth/callback' (Where 'PORT' is the  port number from your config) to your 'Allowed Callback URLs' input box (make sure to save when your done)
7. If you want to use facebook, go to social connections and on the attributes section of the facebook connection, enable email. (or if you want to do this for any other connection as well, an email is required. if there is no email, it wont work). Otherwise, disable facebook.

### Gulp setup
1. Run `npm install -g gulp` (if you have not installed it previously).
2. In a terminal window, navigate to the project folder and run `gulp`.

### Run
1. In a new terminal window, navigate to the project folder and run `nodemon`.
