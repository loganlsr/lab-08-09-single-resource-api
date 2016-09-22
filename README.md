#REST API
Our task was to build a simple REST API.

#Start Server
In terminal type the following: node server.js

#POST
Example of a proper POST:

echo '{}' | http POST localhost:3000/api/single-resource

#GET
Example of a GET:

http localhost:3000/api/single-resource?id=(specific id here)

#DELETE
Example of a DELETE:

http DELETE localhost:3000/api/single-resource?id=(specific id here)
