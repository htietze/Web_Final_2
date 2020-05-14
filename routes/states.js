// setting routes for.. express, so the server, API routes that it can respond to I think.
let express = require('express')
let States = require('../models').States
let router = express.Router()

// for getting all the states from the database, returning json data
router.get('/states', function(req, res, next){
    States.findAll({order: ['name']})
        .then( states => {
            return res.json(states)
        })
        .catch( err => next.err() )
})

// singular get, where the request parameter name matches.
router.get('/states/:name', function(req, res, next){
    States.findOne({ where: {name: req.params.name}})
        .then( state => {
            if (state) {
                return res.json(state)
            } else {
                return res.status(404).send()
            }
        })
        .catch( err => next.err() )
})

// journal route patch for the api. I had to break it to understand it, and almost die of stress.
// axios routes to here, which routes to the API I think. unless that's cart before horse.
router.patch('/journal/:name', function(req,res, next){
    States.update({ journal: req.body.journal }, { where: {
                name: req.params.name
            }
        })
        .then( rows => {
            if (rows) {
                return res.send('ok')
            } else {
                return res.status(404).send()
            }
        })
        .catch( err => next.err() )
})

// update route, for each state, sets the visited field for the requested one.
// Rows becomes true because a row was changed, so the if statement goes.

router.patch('/state/:name', function(req,res, next){
    States.update({ visited: req.body.visited }, { where: {
                name: req.params.name
            }
        })
        .then( rows => {
            if (rows) {
                return res.send('ok')
            } else {
                return res.status(404).send()
            }
        })
        .catch( err => next.err() )
})

module.exports = router