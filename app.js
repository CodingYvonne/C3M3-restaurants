const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results


app.use(express.static('public'))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');


app.get('/search', (req, res) => {
    const searchKeyword = req.query.keyword
    const matchedRestaurants = searchKeyword ? restaurants.filter((restaurantList) =>
        Object.values(restaurantList).some((property) => {
            if (typeof property === 'string') {
                return property.toLowerCase().includes(searchKeyword.toLowerCase())
            }
            return false
        })
    ) : restaurants
    res.render('index', { restaurants: matchedRestaurants, searchKeyword })
})


app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    const restaurant = restaurants.find((restDetail) => restDetail.id.toString() === id)
    res.render('detail', { restaurant });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})