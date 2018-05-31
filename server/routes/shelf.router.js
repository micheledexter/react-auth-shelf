const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    res.sendStatus(200); // For testing only, can be removed
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {

});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {

});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "person"."username", COUNT("item"."id") FROM "item"
    RIGHT JOIN "person" ON "person"."id"="item"."person_id"
    GROUP BY "person"."username"
    ORDER BY "person"."username";`
    pool.query(queryText)
    .then((response ) => {
        res.send(response.rows);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;