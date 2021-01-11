import React, { useState, useEffect } from 'react'
import Axios from 'axios'
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
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Input,
    Chip,
    MenuItem
} from '@material-ui/core'
import ScaleText from "react-scale-text"
import PlayQuestions from '../components/PlayQuestions'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const Play = (props) => {
    const [cats, setCats] = useState([])
    const [gameCats, setGameCats] = useState([])
    const [numQ, setNumQ] = useState(0)
    const [mode, setMode] = useState(1)
    const [dialogMode, setDialogMode] = useState(1)
    const [open, setOpen] = useState(false)
    const [question, setQuestion] = useState({})
    const [currentPoints, setCurrentPoints] = useState(0)
    const [start, setStart] = useState(false)

    const getCats = async () => {
        try {
            const res = await Axios.get(`https://opentdb.com/api_category.php`)
            setCats(res.data.trivia_categories)
        } catch (error) {
            throw error
        }
    }

    const initGame = () => {
        gameCats.forEach(async (cat, i) => {
            try {
                const res = await Axios.get(`https://opentdb.com/api.php?amount=${parseInt(numQ)}&category=${cat.id}`)
                let arr = gameCats
                arr[i] = {
                    id: cat.id,
                    name: cat.name,
                    questions: res.data.results
                }
                setGameCats(arr)
            } catch (error) {
                throw error
            }
        })
    }

    useEffect(() => {
        if (mode === 1) {
            getCats()
            console.log(cats)
        } else if (mode === 2) {
            initGame()
            console.log(cats)
        }
    }, [props, mode])

    const handleQ = (question, i) => {
        setQuestion(question)
        setCurrentPoints((i + 1) * 100)
        setOpen(true)
    }

    const handleA = () => {
        setDialogMode(2)
    }

    const handleClose = () => {
        setOpen(false)
        setDialogMode(1)
    }

    const handleCats = ({ target }) => {
        setGameCats(target.value)
    }

    const handleNum = ({ target }) => {
        setNumQ(target.value)
    }

    let content = 'v'
    switch (mode) {
        case 1:
            content = (
                <div style={{ marginTop: '90px' }}>
                    <p>Choose your Categories:</p>
                    <FormControl style={{ minWidth: '200px', maxWidth: '400px' }}>
                        <InputLabel id="demo-mutiple-chip-label">Categories</InputLabel>
                        <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={gameCats}
                            onChange={handleCats}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {selected.map((value) => (
                                        <Chip key={value.name} label={value.name} style={{ margin: '2px' }} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {cats.map((cat, i) => (
                                <MenuItem key={i} value={cat}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <p style={{ marginTop: '30px' }}>Select the Number of Questions per Category:</p>
                    <FormControl
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            className="standard-basic"
                            placeholder="# of Q/Cat"
                            name="num"
                            value={numQ}
                            onChange={handleNum}
                        />
                    </FormControl>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button onClick={() => { setMode(2) }}>
                            Start Game
                    </Button>
                    </Grid>
                </div>
            )
            break
        case 2:
            content = (
                <div style={{ marginTop: '90px' }}>
                    <Grid container justify="center">
                        {start === false ? (<Button onClick={()=> {setStart(true)}}>Start Game</Button>) : null}
                        {gameCats.map((cat, i) => (
                                <div style={{ display: 'flex', flexDirection: "column", fontSize: '60px' }} key={i}>
                                    <div style={{ display: 'flex', flexDirection: "column", margin: "10px", maxWidth: '200px' }} key={i}>
                                        <div key={i}>
                                            <Paper style={{ width: "150px", height: '70px', color: 'white', margin: "10px", padding: '5px' }}>
                                                <ScaleText>
                                                    <p>{cat.name}</p>
                                                </ScaleText>
                                            </Paper>
                                        </div>
                                        {start === true ? <PlayQuestions q={cat.questions} handleQ={handleQ}/> : null}
                                    </ div>
                                </ div>
                            ))}
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
                                <DialogTitle id="alert-dialog-slide-title">{`For ${currentPoints} Points`}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description" style={{ color: 'white' }}>
                                        {question.question.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"')}
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
                                    <DialogContentText id="alert-dialog-slide-description" style={{ color: 'white' }}>
                                        {question.question.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"')}
                                        <br />
                                        {question.correct_answer.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"')}
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
            break
        default:
            content = (<p style={{ marginTop: '90px' }}>no mode set</p>)
    }

    return (
        <div>
            <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
            {content}
        </div>
    )
}

export default Play