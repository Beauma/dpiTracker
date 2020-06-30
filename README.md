# dpiTracker
The original, but the second version.

## /get-people
Get's all the people in the people database. Outputs in JSON format.

## /get-person
Gets a person based on params passed in with the GET request. Possible params include:
- "firstName"
- "lastName"
- "comapny"
- "email"

Example's include 'http://18.222.143.61/get-person?email=BeauMartin@gatech.edu'

## /insert-person
Inserts a person into the database in the "people" collection. Takes a POST request with data in a JSON format. Takes fields:
- "firstName"
- "lastName"
- "comapny"
- "email"

## /remove-person
Removes a person from the database's "people" collection. Takes a DELETE request with params. Possible params include:
- "firstName"
- "lastName"
- "comapny"
- "email"

## /insert-dpi
**prototype**
Inserts a dpi into the database in the "dpis" collection. Takes a POST request with data in a JSON format. Takes fields:
- "date" — Use ISO 8601 YYYY-MM-DDTHH:MM:SS.000Z
- "interviewee" — Use ID from "people" collection
- "type" — Zoom?, irl?, etc
- "notnots" — A JSON array of not nots. Considering making a collection for these.

## /get-all-dpis
Gets all the dpis with a GET request.

## /get-all-notnots
Gets all the unique notnots with a GET request.

# AWS Server Information

The EC2 instance uses mongoDB, Express, and NodeJS. The github repository is stored in /var/www. PM2 and Nginx are used to manage resources.

Our stack follows [this article](https://itnext.io/deploy-a-mongodb-expressjs-reactjs-nodejs-mern-stack-web-application-on-aws-ec2-2a0d8199a682) most closely. It also takes hints from [Keith Weaver's article](https://medium.com/@Keithweaver_/setting-up-mern-stack-on-aws-ec2-6dc599be4737) on setting up a deploy key.

MongoDB was installed on the instance using [this StackOverflow](https://stackoverflow.com/questions/61547664/im-unable-to-install-mongodb-in-my-ubuntu-system-and-i-face-this-error-while-in) with help from the [MongoDB docs](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
