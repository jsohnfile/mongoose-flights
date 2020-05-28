const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create
    // delete: deleteTicket
}

// function deleteTicket(req, res) {
//     Ticket.findById(req.params.tid, function(err, ticket){
//         Flight.findById(ticket.flight, function(err, flight){
//             Ticket.find({flight: flight._id}, function(err, tickets){
//                 const idx = tickets.indexOf(ticket)
//                 console.log("what is IDX: ", idx)
//                 tickets.splice(idx, 1);
//                 res.render('flights/show', { title:  `${flight.airline} Flight ${flight.flightNo} Detail`, flight, tickets })
//             });
//         });
//     });
// }

function create(req, res){
    Flight.findById(req.params.id, function(err, flight){
        console.log("req.body: ", req.body)
        const ticket = new Ticket(req.body);
        ticket.flight = flight._id
        ticket.save(function(err){
            console.log("ticket: ",ticket)
            if (err) return res.redirect(`/flights/${flight._id}`);
            Ticket.find({flight: flight._id}, function(err, tickets){
                console.log("tickets: ", tickets)
                res.render('flights/show', { title:  `${flight.airline} Flight ${flight.flightNo} Detail`, flight, tickets });
            });
        });
    });
}

function newTicket(req, res){
    console.log("req.params.id:", req.params.id)
    Flight.findById(req.params.id, function(err, flight){
        res.render(`tickets/new`, {
            title: 'Add A Ticket',
            flight
        });
    });
}


