const express = require('express');
const router = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "to_do_table" ORDER BY "id";';

    pool.query(queryText).then(result => {
        // send back results in an object
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting to-do list', error);
        
        res.sendStatus(500);
    })
});

// POST
router.post('/', (req,res)=>{
    console.log('req.body', req.body);
    let koala = req.body
    
    let queryText = `INSERT INTO "to_do_table" ("to_do","notes")
    VALUES ($1,$2);`;
    pool.query(queryText, [to_do_table.to_do,to_do_table.notes])
    .then(result=>{
        res.sendStatus(201);
    }).catch(error=>{
        res.sendStatus(500)
    })
})

// PUT


// DELETE

module.exports = router;