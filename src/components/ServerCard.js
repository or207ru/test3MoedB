import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles({
    root: {
        minWidth: "12vw",
        border: "solid 1px blue",
        backgroundColor: "rgba(220,220,255,0.5)",
        width: "13vw",
        margin: "5px"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const ServerCard = ({ server_id, company_name, server_name, ip, created_at, current_status }) => {

    const classes = useStyles();
    const [server, setServer] = useState(current_status)

    const handleChange = async () => {
        await fetch(`http://localhost:1000/api/servers/status`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ server_id, server_status: current_status })
        }).then(response => response.json()).then(() => {
            setServer(prevStatus => !prevStatus)
        })
    };

    return (
        <Card className={classes.root}>
            <CardContent>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {company_name}
                </Typography>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {server_name}
                </Typography>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {ip}
                </Typography>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {created_at}
                </Typography>

                <FormControl>
                    <Switch
                        checked={server}
                        onChange={handleChange}
                        name="serverOn"
                        inputProps={{ 'aria-label': 'primary  checkbox' }}
                    />
                </FormControl>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {server ? "Online" : "offline"}
                </Typography>

            </CardContent>
        </Card>
    );

}

export default ServerCard;