const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'servus',
    dateStrings: ['DATE','DATETIME']
});

connection.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
})

const myQuery = (qry) => {
    return new Promise((resolve, reject) => {
        connection.query(qry, (err, results) => {
            err ? reject(err) : resolve(results)
        })
    })
}



module.exports = myQuery