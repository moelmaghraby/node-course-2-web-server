const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `Incomming ${req.method} request for ${req.url} @ ${now}`;
    console.log(log);
    fs.appendFile("server.log", log + '\n');
    next();
})
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.get('/', (req, res) => {
    //res.send("<h1>Hello from node</h1>");
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome To My Website',

    })

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',

    });
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'unable to handle request'
    });
})
app.listen(3000);