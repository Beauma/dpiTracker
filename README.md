# dpiTracker
The original, but the second version.

## /get-people
Get's all the people in the people database. Outputs in JSON format.

## /insert-person
Inserts a person into the database in the "people" collection. Takes a post request with data in a JSON format. Takes fields:
- "firstName"
- "lastName"
- "comapny"
- "email"



# AWS Server Information

The EC2 instance uses mongoDB, Express, and NodeJS. The github repository is stored in /var/www. PM2 and Nginx are used to manage resources.
