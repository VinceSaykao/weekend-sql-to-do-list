  // put for notes
  const express = require('express');
const router = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');
  
  router.put('/:id', (req,res) => {
    let noteToUpdate = req.params.id;
    console.log(noteToUpdate);
    let sqlText = `
    UPDATE "to_do_table"
    SET "notes" = 'cool'
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



module.exports = router;

/*




  const pool = require('../modules/pool');
  
  router.put('/:id', (req,res) => {
    let noteToUpdate = req.body.id;
    console.log(noteToUpdate);

    let sqlText = `
    UPDATE "to_do_table"
    SET "notes" = $1
    WHERE "id" = $2;
    `;
  
    let sqlValues = [noteToUpdate];
  
  pool.query(sqlText, sqlValues)
  .then(results => {
    res.sendStatus(200);
  }).catch(err => {
    res.sendStatus(500);
  })
  
  }); // end of router.put

*/