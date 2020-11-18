const express = require('express')
const app = express()
const myQuery = require('./db')
app.use(require('cors')())
app.use(express.json())
const port = 1000


app.get('/api/servers/:active/:timing', async (req, res) => {
    let qry = `SELECT servers.id, company.name as company_name, server_name, ip, created_at, current_status FROM servus.servers
    INNER JOIN company ON servers.hosting_company_id = company.id`
    if(+req.params.active)
        qry += ` WHERE current_status > 0`
    if(+req.params.timing)
        qry += ` order by created_at`
    qry += `;`
    try {
        const query = await myQuery(qry)
        res.status(200).json({ err: false, msg: query })
    } catch {
        res.status(500).json({ err: true, msg: "request failed" })
    }
})


app.put('/api/servers/status', async (req, res) => {
    const { server_id, server_status } = req.body
    const qry = `UPDATE servers
    SET servers.current_status = ${!server_status}
    WHERE servers.id = ${server_id};`
    try {
        await myQuery(qry)
        res.status(201).json({ err: false, msg: "did succssesfuly" })
    } catch {
        res.status(500).json({ err: true, msg: "did'n do" })
    }
})

app.listen(1000, () => {
    console.log("ahalan wa sahalan to port 1000 🌝")
})