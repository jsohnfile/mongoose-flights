const Flight = require('../models/flight');
const Ticket = require('../models/ticket')

module.exports = {
    new: newFlight,
    create,
    index,
    show
};

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
        res.render('flights/show', { title:  `${flight.airline} Flight ${flight.flightNo} Detail`, flight, tickets });
      });
    });
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        let now = Date.now();
        res.render('flights/index', {title: 'All Flights', flights, now});

    });
}

function create(req, res) {
    if(!req.body.departs) delete req.body.departs;
    if(!req.body.airport) delete req.body.airport;
    const flight = new Flight(req.body);
    flight.save(function(err, flights) {
        if (err) return res.render('flights/new',{ title: 'Invalid Entry Please Try Again', flights});
        res.render('flights/new',{ title: 'Success! Enter Another Flight', flights});
    })
}


function newFlight(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/new',{ 
            title: 'Enter a New Flight', flights});
    });
}