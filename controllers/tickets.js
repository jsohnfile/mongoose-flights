const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
}

function deleteTicket(req, res) {
    console.log("req.params.tid : ",req.params.tid)
    Ticket.findByIdAndDelete(req.params.tid, function(err, ticket){
        if(err) console.log(err);
        console.log("Successful deletion")      
    });
    Flight.findById(req.params.id, function(err, flight){
        res.redirect(`/flights/${flight._id}`)
    })
}

function create(req, res){
    Flight.findById(req.params.id, function(err, flight){
        const ticket = new Ticket(req.body);
        ticket.flight = flight._id
        ticket.save(function(err){
            if (err) return res.redirect(`/flights/${flight._id}`);
            Ticket.find({flight: flight._id}, function(err, tickets){
                res.render('flights/show', { title:  `${flight.airline} Flight ${flight.flightNo} Detail`, flight, tickets });
            });
        });
    });
}

function newTicket(req, res){
    Flight.findById(req.params.id, function(err, flight){
        res.render(`tickets/new`, {
            title: 'Add A Ticket',
            flight
        });
    });
}


