import React, { useState, useEffect } from 'react'
import ServerCard from './ServerCard'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';


const ServerList = () => {

    const [servers, setServers] = useState([])

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }))

    const classes = useStyles();
    const [activnes, setActivnes] = useState(0);
    const [dates, setDates] = useState(0);

    const handleChangeActive = (event) => {
        setActivnes(event.target.value);
    };

    const handleChangeDate = (event) => {
        setDates(event.target.value);
    };


    useEffect(() => {
        fetch(`http://localhost:1000/api/servers/${activnes}/${dates}`)
            .then(response => response.json())
            .then(json => {
                setServers(json.msg)
            })
    }, [activnes, dates])

    return (
        <div>
            <Typography>🙋‍♂️🙋‍♀️ Click the filters to sort the ServerList<br />
            Please ignore the rebellious toggle that represent activness<br />
            The logics works!!<br />
            ENJOY!!!
            </Typography>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel>activnes</InputLabel>
                <Select value={activnes} onChange={handleChangeActive}>
                    <MenuItem onChange={handleChangeActive} value={1}>ACTIVE</MenuItem>
                    <MenuItem onChange={handleChangeActive} value={0}>ALL OFF THEM</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel>date order</InputLabel>
                <Select value={dates} onChange={handleChangeDate}>
                    <MenuItem value={1}>ORDERD</MenuItem>
                    <MenuItem value={0}>NOT ORDERD</MenuItem>
                </Select>
            </FormControl>
            <div style={{ display: "flex", flexflow: "row wrap" }}>
                {servers.map(server => (<ServerCard
                    server_id={server.id}
                    company_name={server.company_name}
                    server_name={server.server_name}
                    ip={server.ip}
                    created_at={server.created_at}
                    current_status={server.current_status}
                ></ServerCard>))}
            </div>
        </div>
    )
}

export default ServerList;
