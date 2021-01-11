import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { Grid, Button, Icon } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { __DeleteGame, __GetGamesByUser } from '../services/GameServices'

const Profile = (props) => {
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames()
    }, [])

    const getGames = async () => {
        try {
            const res = await __GetGamesByUser(props.currentUser._id)
            setGames(res.games)
        } catch (error) {
            throw error
        }
    }

    const deleteGame = async (id) => {
        try {
            await __DeleteGame(id)
            const arr = games.filter(game => game._id !== id)
            setGames(arr)
        } catch (error) {
            throw error
        }
    }

    return (
        <div>
            <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
            <Grid container justify="center" style={{ textAlign: "center", marginTop: "100px" }}>
                <Grid container justify='center'>
                    <Button color='secondary' variant="contained" onClick={() => { props.history.push(`/create`) }} endIcon={<Icon>add</Icon>}>New Game</Button>
                    <Button color='secondary' variant="contained" onClick={() => { props.history.push(`/play`) }} endIcon={<Icon>play_arrow</Icon>} style={{marginLeft: '10px'}}>Play Random Game</Button>
                </Grid>
                <Grid container justify='center'>
                    <h1>My Games</h1>
                    {games.length ? (
                        games.map(game => (
                            <Grid container key={game.title} justify='center'>
                                <Grid container justify='center'>
                                    <h2>{game.title}</h2>
                                </Grid>
                                <Grid container justify='center'>
                                    <Button color='secondary' variant="contained" style={{ maxHeight: '35px', margin: '5px' }} onClick={() => { props.history.push(`/play/${game._id}`) }}>Play</Button>
                                    <Button color='secondary' variant="contained" style={{ maxHeight: '35px', margin: '5px' }} onClick={() => { deleteGame(game._id) }}>Delete</Button>
                                    <Button color='secondary' variant="contained" style={{ maxHeight: '35px', margin: '5px' }} onClick={() => { props.history.push(`/update/${game._id}`) }}>Update</Button>
                                </Grid>
                            </Grid>
                        ))
                    ) : null}
                </Grid>

            </Grid>
        </div>
    )
}

export default withRouter(Profile)