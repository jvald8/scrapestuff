var dotenv = require('dotenv').load();
var Twitter = require('twitter');
var mysql = require('mysql');

var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var connection = mysql.createConnection(
    	{
      		host: process.env.MYSQL_HOST,
      		user: process.env.MYSQL_USER,
      		password: process.env.MYSQL_PASSWORD,
      		database: process.env.MYSQL_DATABASE,
      		port: process.env.MYSQL_PORT
    	}
)

connection.connect();

connection.query('select * from jondatabase.Persons', function(err, rows) {
	if(err) throw err;

	console.log('rows :' + rows);
})

twitterClient.get('users/lookup', {screen_name: 'rcschwartzman'},  function(error, user, response){
  if(error) throw error;
  console.log('user :' +  JSON.stringify(user));  // User body. 
});

connection.end();