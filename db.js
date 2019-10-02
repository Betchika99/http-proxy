// 'use strict';

// const pg = require('pg');
// const conString = 'postgres://username:password@localhost/proxy'
// pg.connect(conString, (err, client, done) => {
//     if (err) {
//         return console.error('error fetching client from pool', err)
//     }
//     client.query('SELECT $1::varchar AS my_first_query', ['node hero'], (err, result) => {
//         done()
//         if (err) {
//             return console.error('error happened during query', err)
//         }
//         console.log(result.rows[0])
//         process.exit(0)
//     })
// }); 