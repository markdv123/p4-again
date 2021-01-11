import React, { useState, useEffect } from 'react'
import { __GetGameById } from '../services/GameServices'
import { withRouter } from 'react-router-dom'
import Nav from '../components/Nav'
import {
    Grid,
    Paper,
    Slide,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@material-ui/core'
import ScaleText from "react-scale-text"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const GamePage = (props) => {
    const [game, setGame] = useState({})
    const [question, setQuestion] = useState({})
    const [open, setOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState(1)

    const getGame = async () => {
        try {
            const gameId = props.match.params.game_id
            const res = await __GetGameById(gameId)
            setGame(res)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getGame()
    }, [props.match.params.game_id])
    
    const handleQ = (question) => {
        setQuestion(question)
        setOpen(true)
    }

    const handleA = () => {
        setDialogMode(2)
    }

    const handleClose = () => {
        setOpen(false)
        setDialogMode(1)
    }

    return (
        <div>
            <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
            {game.title ? (
                <div style={{ textAlign: 'center', marginTop: "100px", color: 'rgb(36, 84, 89)' }}>
                    <h1 style={{ fontSize: '50px' }}>{game.title}</h1>
                    <h3>{game.description}</h3>
                </div>
            ) : null}
            <Grid container justify="center">
                {game.categories ? (
                    game.categories.map((cat, i) => (
                        <div style={{ display: 'flex', flexDirection: "column", fontSize: '60px' }} key={i}>
                            <div style={{ display: 'flex', flexDirection: "column", margin: "10px", maxWidth: '200px' }} key={i}>
                                <div key={i}>
                                    <Paper style={{ width: "150px", height: '70px', color: 'white', margin: "10px" }}>
                                        <ScaleText>
                                            <p>{cat.name}</p>
                                        </ScaleText>
                                    </Paper>
                                </div>
                                {cat.questions.map((q, i) => (
                                    <div key={i} style={{ margin: "10px" }}>
                                        <Paper style={{ width: '150px', color: 'white' }} onClick={() => handleQ(q)}>
                                            {q.points}
                                        </Paper>
                                    </div>
                                ))}
                            </ div>
                        </ div>
                    ))
                ) : null}
            </Grid>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {question.question && dialogMode === 1 ? (
                    <div>
                        <DialogTitle id="alert-dialog-slide-title">{`For ${question.points} Points`}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description" style={{color: 'white'}}>
                                {question.question}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleA} color="white">
                                Answer
                            </Button>
                            <Button onClick={handleClose} color="white">
                                Close
                            </Button>
                        </DialogActions>
                    </div>
                ) : null}
                {question.question && dialogMode === 2 ? (
                    <div>
                        <DialogTitle id="alert-dialog-slide-title">{`For ${question.points} Points`}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description" style={{color: 'white'}}>
                                {question.question}
                                <br />
                                {question.answer}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="white">
                                Close
                            </Button>
                        </DialogActions>
                    </div>
                ) : null}
            </Dialog>
        </div>
    )
}

export default withRouter(GamePage)