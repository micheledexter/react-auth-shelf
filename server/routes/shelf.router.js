const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

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