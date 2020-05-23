const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index,
    show
};

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render('flights/show', { title:  `${flight.airline} Flight ${flight.flightNo} Detail`, flight });
      });
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {flights});

    });
}

function create(req, res) {
    if(!req.body.departs) delete req.body.departs;
    if(!req.body.airport) delete req.body.airport;
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights/new');
    })
}


function newFlight(req, res) {
    res.render('flights/new')
}