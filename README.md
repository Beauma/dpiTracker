# dpiTracker
The original, but the second version.

## /get-people
Get's all the people in the people database. Outputs in JSON format.

## /insert-person
Inserts a person into the database in the "people" collection. Takes a POST request with data in a JSON format. Takes fields:
- "firstName"
- "lastName"
- "comapny"
- "email"

## /get-person-fn
Gets person by their first name from the "people" collection. Takes a GET requires with data in JSON format. Takes fields:
- "firstName"

## /get-person-ln
Gets person by their last name from the "people" collection. Takes a GET requires with data in JSON format. Takes fields:
- "lastName"

## /insert-dpi
**prototype**
Inserts a dpi into the database in the "dpis" collection. Takes a POST request with data in a JSON format. Takes fields:
- "date" — Use ISO 8601 YYYY-MM-DDTHH:MM:SS.000Z
- "interviewee" — Use ID from "people" collection
- "type" — Zoom?, irl?, etc
- "notnots" — A JSON array of not nots. Considering making a collection for these.


# AWS Server Information

The EC2 instance uses mongoDB, Express, and NodeJS. The github repository is stored in /var/www. PM2 and Nginx are used to manage resources.
