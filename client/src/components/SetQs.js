import React, { useState, useEffect } from 'react'
import { __CreateQuestion } from '../services/QuestionServices'
import { Grid, FormControl, TextField, Icon, Button, InputLabel, Select, MenuItem } from '@material-ui/core'
import { __GetCategoriesByGame } from '../services/CategoryServices'

const SetQs = (props) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [points, setPoints] = useState(0)
    const [cats, setCats] = useState([])
    const [cat, setCat] = useState({})
    const [qs, setQs] = useState([])

    useEffect(() => {
        getCats()
    }, [])

    const getCats = async () => {
        try {
            const res = await __GetCategoriesByGame(props.gameId)
            setCats(res)
        } catch (error) {
            throw error
        }
    }

    const handleCat = ({ target }) => setCat(target.value)
    const handleQuestion = ({ target }) => setQuestion(target.value)
    const handleAnswer = ({ target }) => setAnswer(target.value)
    const handlePoints = ({ target }) => setPoints(target.value)
    const handleSubmit = async () => {
        try {
            const res = await __CreateQuestion({
                question: question,
                answer: answer,
                points: parseInt(points)
            }, cats.find(category => category.name === cat)._id)
            setQs([...qs, res])
        } catch (err) {
            throw err
        }
    }

    return (
        <div>
            <Grid container justify="center" style={{margin: '5px'}}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cat}
                        onChange={handleCat}
                    >
                        {cats.length ? (cats.map(cat => (
                            <MenuItem value={cat.name}>{cat.name}</MenuItem>
                        ))) : null}
                    </Select>
                </FormControl>
            </Grid>
            <Grid container justify="center" alignItems="center" style={{margin: '5px'}}>
                <FormControl
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        className="standard-basic"
                        placeholder="Question"
                        name="question"
                        value={question}
                        onChange={handleQuestion}
                    />
                </FormControl>
            </Grid>
            <Grid container justify="center" alignItems="center" style={{margin: '5px'}}>
                <FormControl
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        className="standard-basic"
                        placeholder="Answer"
                        name="answer"
                        value={answer}
                        onChange={handleAnswer}
                    />
                </FormControl>
            </Grid>
            <Grid container justify="center" alignItems="center" style={{margin: '5px'}}>
                <FormControl
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        className="standard-basic"
                        placeholder="Points"
                        name="points"
                        value={points}
                        onChange={handlePoints}
                    />
                </FormControl>
            </Grid>
            <Grid container justify="center" alignItems="center" style={{margin: '5px'}}>
            <Button
               variant="contained"
               color="secondary"
               endIcon={<Icon>add</Icon>}
               onClick={handleSubmit}
               style={{ margin: '5px' }}
            >
               Add
            </Button>
            </Grid>
            <Grid container justify="center" style={{margin: '5px'}}>
                <div style={{flexDirection: 'column'}}>
                    <h4>Questions Added:</h4>
                    {qs.map((q, i) => (
                        <li key={i} style={{listStyle: 'none'}}>{q.question}</li>
                    ))}
                </div>
            </Grid>
        </div>
    )
}

export default SetQs