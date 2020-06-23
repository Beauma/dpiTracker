const express = require('express');

const app = express();
var url = 'mongodb://localhost:27017/test'
var mongo = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
const client = new mongoClient(url, {useUnifiedTopology: true});
var assert = require('assert');
const dbName = 'test';
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
var jsonParser = bodyParser.json()


//Mid
/*
app.use('/away', () => {
    console.log('this is a mid');
});
*/

//Routes
app.get('/get-data', (req, res, next) => {
    var resultArray = [];
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc, err) {
            assert.equal(err, null);
            resultArray.push(doc);
        }, function() {
            client.close()
            res.send(resultArray);
        });
    })
});

app.get('/get-by-interviewee', jsonParser, (req, res, next) => {
    //console.log(req.body.interviewee);
    var resultArray = [];
    mongoClient.connect(url, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        var cursor = db.collection('user-data')
        .find({"interviewee" : req.body.interviewee});
        cursor.forEach((doc, err) => {
            assert.equal(err, null);
            resultArray.push(doc);
        }, function() {
            client.close();
            res.send(resultArray);
        });
    });
});

app.get('/get-num-interviews-from', jsonParser, (req, res, next) => {
    mongoClient.connect(url, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        var cursor = db.collection('user-data').find({'interviewee':req.body.interviewee});
        cursor.count(function (err, num) {
            if(err) {
                return console.log(err);
            }
            client.close();
            res.send(num.toString());
        });
    })
})

app.get('/get-all-interviewees', (req, res, next) => {
    mongoClient.connect(url, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        db.collection('user-data').distinct('interviewee')
        .then(function(intList) {
            client.close();
            res.send(intList);
        })
        .catch((err) => {
            console.log(err);
        })
    })
})

app.get('/get-all-notnots', (req, res, next) => {
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        db.collection('user-data').distinct('notnots')
        .then(function(nnList) {
            client.close();
            res.send(nnList);
        })
        .catch((err) => {
            console.log(err);
        })
    })
})

app.post('/insert', jsonParser, (req, res, next) => {
    console.log(req.body);
    var item = {
        "date": req.body.date,
        "interviewee": req.body.interviewee,
        "type": req.body.type,
        "notnots": req.body.notnots
    };
    console.log('Item Created');
    mongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection('user-data').insertOne(item, (err, result) => {
            assert.equal(err, null);
            client.close();
        });
    });
    res.sendStatus(200);
    console.log("response sent");
});

app.delete('/remove', function (req, res) {
    console.log("Deleting");
    mongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection('user-data').deleteOne({}, (err, result) => {
            assert.equal(err, null);
            console.log('Deleted');
            client.close();
        });
    });
    res.send("We deleted a thing");
});

app.get('/get-by-id', jsonParser, function(req, res) {
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        var o_id = new mongo.ObjectID(req.body.id);
        var cursor = db.collection('user-data').findOne({"_id" : o_id}, function(err, doc) {
            assert.equal(err, null);
            client.close();
            res.send(doc);
        });
    })
})

app.delete('/remove-by-id', jsonParser, function(req, res) {
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        var o_id = new mongo.ObjectID(req.body.id);
        var filter = {"_id" : o_id};
        var result = db.collection('user-data').deleteOne(filter, (err, result) => {
            assert.equal(err, null);
            client.close();
            res.send("Deleted: " + result);
        })
    })
})

app.get('/', (req, res) => {
    res.send('We are at home');
});

app.get('/away', (req, res) => {
    res.send('We are at away');
});

app.listen(3000);