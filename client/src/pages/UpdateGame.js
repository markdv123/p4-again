import React, { useState, useEffect } from 'react'
import { __GetGameById, __UpdateGame } from '../services/GameServices'
import { __UpdateCategory, __CreateCategory, __DeleteCategory } from '../services/CategoryServices'
import { __UpdateQuestion, __CreateQuestion, __DeleteQuestion } from '../services/QuestionServices'
import Nav from '../components/Nav'
import { withRouter } from 'react-router-dom'
import {
    Grid,
    Paper,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core'
import ScaleText from "react-scale-text"

const UpdateGame = (props) => {
    const [game, setGame] = useState({})
    const [cat, setCat] = useState({})
    const [que, setQue] = useState({})
    const [open, setOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState(1)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [name, setName] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [points, setPoints] = useState(0)

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

    const handleClose = () => {
        setOpen(false)
    }

    const openTitle = async ({ target }) => {
        setDialogMode(1)
        setOpen(true)
    }

    const submitTitle = async () => {
        try {
            const updatedGame = await __UpdateGame({
                title: title
            }, game._id)
            setGame(updatedGame)
            setOpen(false)
            setTitle('')
        } catch (error) {
            throw error
        }
    }

    const openDesc = async ({ target }) => {
        setDialogMode(2)
        setOpen(true)
    }

    const submitDesc = async () => {
        try {
            const updatedGame = await __UpdateGame({
                description: desc
            }, game._id)
            setGame(updatedGame)
            setOpen(false)
            setDesc('')
        } catch (error) {
            throw error
        }
    }

    const openCat = (category) => {
        setDialogMode(3)
        setCat(category)
        setOpen(true)
    }

    const submitCat = async () => {
        try {
            await __UpdateCategory({
                name: name
            }, cat._id)
            getGame()
            setOpen(false)
            setName('')
        } catch (error) {
            throw error
        }
    }

    const deleteCat = async () => {
        try {
            await __DeleteCategory(cat._id)
            getGame()
            setOpen(false)
        } catch (error) {
            throw error
        }
    }

    const openQ = (question) => {
        setDialogMode(4)
        setQue(question)
        setQuestion(question.question)
        setAnswer(question.answer)
        setPoints(question.points)
        setOpen(true)
    }

    const submitQ = async () => {
        try {
            await __UpdateQuestion({
                question: question,
                answer: answer,
                points: parseInt(points)
            }, que._id)
            getGame()
            setOpen(false)
        } catch (error) {
            throw error
        }
    }

    const deleteQ = async () => {
        try {
            await __DeleteQuestion(que._id)
            getGame()
            setOpen(false)
        } catch (error) {
            throw error
        }
    }

    const openNewCat = () => {
        setDialogMode(5)
        setOpen(true)
    }

    const submitNewCat = async () => {
        try {
            await __CreateCategory({
                name: name
            }, game._id)
            getGame()
            setOpen(false)
        } catch (err) {
            throw err
        }
    }

    const openNewQ = () => {
        setDialogMode(6)
        setCat({})
        setQuestion('')
        setAnswer('')
        setPoints(0)
        setOpen(true)
    }

    const submitNewQ = async () => {
        try {
            console.log(cat)
            await __CreateQuestion({
                question: question,
                answer: answer,
                points: points
            }, cat._id)
            getGame()
            setOpen(false)
        } catch (err) {
            throw err
        }
    }

    let content = ''
    switch (dialogMode) {
        case 1:
            content = (
                <div>
                    <DialogContent>
                        <DialogContentText>
                            Edit game title:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            value={title}
                            fullWidth
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={submitTitle}>
                            Submit
                        </Button>
                    </DialogActions>
                </div>
            )
            break
        case 2:
            content = (
                <div>
                    <DialogContent>
                        <DialogContentText>
                            Edit game Description:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="desc"
                            label="Description"
                            value={desc}
                            fullWidth
                            onChange={({ target }) => setDesc(target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={submitDesc}>
                            Submit
                        </Button>
                    </DialogActions>
                </div>
            )
            break
        case 3:
            content = (
                <div>
                    <DialogContent>
                        <DialogContentText>
                            Edit Category Name:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="catName"
                            label="Name"
                            value={name}
                            fullWidth
                            onChange={({ target }) => setName(target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteCat}>
                            Delete Category
                        </Button>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={submitCat}>
                            Submit
                        </Button>
                    </DialogActions>
                </div>
            )
            break
        case 4:
            content = (
                <div>
                    <DialogContent>
                        <DialogContentText>
                            Edit Question:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="question"
                            label="Question"
                            value={question}
                            fullWidth
                            onChange={({ target }) => setQuestion(target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="answer"
                            label="Answer"
                            value={answer}
                            fullWidth
                            onChange={({ target }) => setAnswer(target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="points"
                            label="Points"
                            value={points}
                            fullWidth
                            onChange={({ target }) => setPoints(target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteQ}>
                            Delete Question
                        </Button>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={submitQ}>
                            Submit
                        </Button>
                    </DialogActions>
                </div>
            )
            break
        case 5:
            content = (
                <div>
                    <DialogContent>
                        <DialogContentText>
                            New Category Name:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newCatName"
                            label="Name"
                            value={name}
                            fullWidth
                            onChange={({ target }) => setName(target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={submitNewCat}>
                            Submit
                        </Button>
                    </DialogActions>
                </div>
            )
            break
        case 6:
            content = (
                <div>
                    <DialogContent>
                        <DialogContentText>
                            New Question:
                        </DialogContentText>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={cat.name ? cat.name : ''}
                        >
                            {game.categories.length ? (game.categories.map(cat => (
                                <MenuItem onClick={()=> setCat(cat)} value={cat.name}>{cat.name}</MenuItem>
                            ))) : null}
                        </Select>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newQuestion"
                            label="Question"
                            value={question}
                            fullWidth
                            onChange={({ target }) => setQuestion(target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newAnswer"
                            label="Answer"
                            value={answer}
                            fullWidth
                            onChange={({ target }) => setAnswer(target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newPoints"
                            label="Points"
                            value={points}
                            fullWidth
                            onChange={({ target }) => setPoints(target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={submitNewQ}>
                            Submit
                        </Button>
                    </DialogActions>
                </div>
            )
            break
        default:
            content = <p>unknown dialog mode</p>
    }

    return (
        <div>
            <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
            <h1 style={{ marginTop: '90px' }}>Edit Mode</h1>
            <h2>Click on anything to edit it. Click Finish to return to the game page.</h2>
            {game.title ? (
                <div style={{ textAlign: 'center', marginTop: "10px", color: 'rgb(36, 84, 89)' }}>
                    <h1 style={{ fontSize: '50px' }} onClick={openTitle}>{game.title}</h1>
                    {game.description ? (
                        <h3 onClick={openDesc}>{game.description}</h3>
                    ) : (
                            <h3 onClick={openDesc}>Add Description</h3>
                        )}
                </div>
            ) : null}
            <Button onClick={openNewCat} color='rgb(36, 84, 89)'>
                Add Category
            </Button>
            <Button onClick={openNewQ} color='rgb(36, 84, 89)'>
                Add Question
            </Button>
            <Grid container justify="center">
                {game.categories ? (
                    game.categories.map((cat, i) => (
                        <div style={{ display: 'flex', flexDirection: "column", fontSize: '60px' }} key={i}>
                            <div style={{ display: 'flex', flexDirection: "column", margin: "10px", maxWidth: '200px' }} key={i}>
                                <div key={i}>
                                    <Paper onClick={() => { openCat(cat) }} style={{ width: "150px", height: '70px', color: 'white', margin: "10px" }}>
                                        <ScaleText>
                                            <p>{cat.name}</p>
                                        </ScaleText>
                                    </Paper>
                                </div>
                                {cat.questions.map((q, i) => (
                                    <div key={i} style={{ margin: "10px" }}>
                                        <Paper style={{ width: '150px', color: 'white' }} onClick={() => openQ(q)}>
                                            {q.points}
                                        </Paper>
                                    </div>
                                ))}
                            </ div>
                        </ div>
                    ))
                ) : null}
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                {content}
            </Dialog>
        </div>
    )
}

export default withRouter(UpdateGame)