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
    let toDo = req.body;
    let queryText = `INSERT INTO "to_do_table" ("to_do")
    VALUES ($1);`; // ,"notes"
    pool.query(queryText, [toDo.to_do]) // ,toDo.notes]
    .then(result=>{
        res.sendStatus(201);
    }).catch(error=>{
        res.sendStatus(500)
    })
});

router.put('/:id', (req,res) => {
  let noteToUpdate = req.body;
  console.log(noteToUpdate);
  let sqlText = `
  UPDATE "to_do_table"
  SET "notes" = 'hello world'
  WHERE "id" = $1;
  `;

  let sqlValues = [noteToUpdate];

pool.query(sqlText, sqlValues)
.then(results => {
  res.sendStatus(200);
}).catch(err => {
  res.sendStatus(500);
})

}); // end of router.put

// PUT
router.put('/:id', (req,res) => {
    let listToUpdate =req.params.id;
    console.log(listToUpdate);
    console.log(req.body);
    let sqlText = `
    UPDATE "to_do_table"
    SET "done" = TRUE
    WHERE "id" = $1;
    `;
  
    let sqlValues = [listToUpdate];
  
  pool.query(sqlText, sqlValues)
  .then(results => {
    res.sendStatus(200);
  }).catch(err => {
    res.sendStatus(500);
  })
  
  }); // end of router.put


// DELETE
router.delete('/:id', (req,res) => {
    let reqId = req.params.id;
    console.log('DELETE id, reqId');
    let queryText = 'DELETE FROM "to_do_table" WHERE "id" = $1;'
    pool.query(queryText, [reqId])
    .then((result) => {
      console.log('To-Do deleted');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error making database query', queryText, error);
      res.sendStatus(500);
    })
  }); // end of router.delete

module.exports = router;