const express = require('express');

const app = express();
var url = 'mongodb://localhost:27017/pt'
var mongo = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
const client = new mongoClient(url, {useUnifiedTopology: true});
var assert = require('assert');
const dbName = 'pt';
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
var jsonParser = bodyParser.json()


//Mid
/*
app.use('/away', () => {
    console.log('this is a mid');
});
*/

//NEW ROUTES

app.delete('/remove-person', function(req, res) {
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        console.log(req.query);
        var result = db.collection('people').deleteOne(req.query, (err, result) => {
            assert.equal(err, null);
            client.close();
            res.send("Deleted: " + result)
        })
    })
})

app.get('/get-person', (req, res, next) => {
    var resultArray = [];
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        var cursor = db.collection('people').find(req.query);
        cursor.forEach(function(doc, err) {
            assert.equal(err, null);
            resultArray.push(doc);
        }, function() {
            client.close()
            res.send(resultArray);
        })
    })
});

app.get('/get-people', (req, res, next) => {
    var resultArray = [];
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        var cursor = db.collection('people').find();
        cursor.forEach(function(doc, err) {
            assert.equal(err, null);
            resultArray.push(doc);
        }, function() {
            client.close()
            res.send(resultArray);
        });
    })
});


app.post('/insert-person', jsonParser, (req, res, next) => {
    console.log(req.body);
    var item = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "company": req.body.company,
        "email": req.body.email
    };
    console.log('Item Created');
    mongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection('people').insertOne(item, (err, result) => {
            assert.equal(err, null);
            client.close();
        });
    });
    res.sendStatus(200);
    console.log("response sent");
});

app.post('/insert-dpi', jsonParser, (req, res, next) => {
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
        db.collection('dpis').insertOne(item, (err, result) => {
            assert.equal(err, null);
            client.close();
        });
    });
    res.sendStatus(200);
    console.log("response sent");
});

app.get('/get-all-dpis', (req, res, next) => {
    var resultArray = [];
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        var cursor = db.collection('dpis').find();
        cursor.forEach(function(doc, err) {
            assert.equal(err, null);
            resultArray.push(doc);
        }, function() {
            client.close()
            res.send(resultArray);
        });
    })
});

app.get('/get-all-notnots', (req, res, next) => {
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        assert.equal(err, null);
        const db = client.db(dbName);
        db.collection('dpis').distinct('notnots')
        .then(function(nnList) {
            client.close();
            res.send(nnList);
        })
        .catch((err) => {
            console.log(err);
        })
    })
})

//OLD ROUTES

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