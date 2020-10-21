# star-wars-app
Application for listing all star wars characters

How does it work? 
Firstly you should define your own configuration, by going into the /client folder and creating a .env file for the following variable:

-------------------------------

##### REACT_APP_API_URL = some api url

-------------------------------

The config file however, provides a default API URL for querying: https://graphql.org/swapi-graphql

-------------------------------

To run the app, simply do "npm run install:all" (make sure you are using node v12) and then run "npm run start:app" (default port 4000).

-------------------------------

To run the compiled app with a server, run "npm run install:all" and "npm run build" scripts, followed by "npm run start" (default port 3000).