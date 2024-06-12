const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.use(express.static('public'))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', { restaurants: restaurants });
});

app.get('/restaurants/:id', (req, res) => {
    res.render('detail', { restaurants: restaurants });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})