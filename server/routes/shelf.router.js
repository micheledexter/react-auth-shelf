const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
    // console.log('/shelf POST route');
    //console.log(req.body);
    //console.log('is authenticated?', req.isAuthenticated);
    // console.log('user', req.user);
    if (req.isAuthenticated()) {
        let queryText = `INSERT INTO "item" ("description", "image_url")
                    VALUES ($1, $2)`;
        pool.query(queryText, [req.body.description, req.body.image_url])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((err) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
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
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;