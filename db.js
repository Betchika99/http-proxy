'use strict';

const { Client } = require('pg');
const fs = require('fs');
const DB_OPTIONS = require('./config').DB_OPTIONS;
const DB_FILE = require('./config').DB_FILE;

class DB {
    constructor() {
        const sqlScript = fs.readFileSync(DB_FILE).toString();

        this.connection = new Client(DB_OPTIONS);
        this.connection.connect();
        console.log("DB connected successfully!");

        this.connection.query(sqlScript, (err, res) => {
            if (err) {
                console.error(err);
            }
        });
    }

    create(method, url, headers, body) {
        const insertQuery = `INSERT INTO requests (method, url, headers, body) VALUES ($1, $2, $3, $4)`;
        this.connection.query(insertQuery,[
            method,
            url,
            headers,
            body
        ], (err, res) => {
            if (err) {
                console.error(err);
            }
        });
    }

    find(id) {
        return new Promise((resolve, reject) => {
            const selectQuery = 'SELECT * FROM requests WHERE id = $1';
            this.connection.query(selectQuery,[id], (err, res) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(res.rows);
            });
        });
    }

    destroy() {
        this.connection.end();
    }
}

module.exports = () => new DB();

// pg.connect(conString, (err, client, done) => {
//     if (err) {
//         return console.error('error fetching client from pool', err)
//     }

    // client.query('SELECT $1::varchar AS my_first_query', ['node hero'], (err, result) => {
    //     done()
    //     if (err) {
    //         return console.error('error happened during query', err)
    //     }
    //     console.log(result.rows[0])
    //     process.exit(0)
    // })
// }); 