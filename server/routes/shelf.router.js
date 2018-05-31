const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        console.log('The user is authenticated');
        let queryText = `SELECT * FROM "item";`;
        pool.query(queryText).then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log(`ERROR trying to GET /api/shelf: ${error}`);
        });
    } else {
        res.sendStatus(403);
    }
    // res.sendStatus(200); // For testing only, can be removed
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
    if(req.isAuthenticated()) {
        console.log('The user is authenticated');
        let queryText = `DELETE FROM "item" WHERE "id" = $1;`;
        pool.query(queryText,[req.params.id]).then(results => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(`ERROR trying to DELETE /api/shelf: ${error}`);
        });
    } else {
        res.sendStatus(403);
    }
    // res.sendStatus(200);
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
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;