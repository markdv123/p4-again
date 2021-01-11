import React, { useState } from 'react'
import {
    FormControl,
    TextField,
    Grid,
    Button,
    Icon
} from '@material-ui/core'
import { __CreateGame } from '../services/GameServices'

const SetGame = (props) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [isMade, setMade] = useState(false)

    const handleTitle = ({ target }) => setTitle(target.value)
    const handleDesc = ({ target }) => setDesc(target.value)

    const handleSubmit = async () => {
        try {
            const newGame = await __CreateGame({
                title: title,
                description: desc
            }, props.currentUser._id)
            props.gId(newGame._id)
            setMade(true)
        } catch (error) {
            throw error
        }
    }

    return (
        <div>
            <Grid container justify="center" alignItems="center" style={{ margin: '5px' }}>
                <FormControl
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        className="standard-basic"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={handleTitle}
                    />
                </FormControl>
            </Grid>
            <Grid container justify="center" alignItems="center" style={{ margin: '5px' }}>
                <FormControl
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        style={{ width: '450px' }}
                        multiline
                        variant="outlined"
                        id="outlined-textarea"
                        placeholder="Description"
                        name="description"
                        value={desc}
                        onChange={handleDesc}
                    />
                </FormControl>
            </Grid>
            <Grid container justify="center" alignItems="center" style={{ margin: '5px' }}>
                {!isMade ? (
                    <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<Icon>arrow_forward_ios</Icon>}
                    onClick={handleSubmit}
                    style={{ margin: '5px' }}
                    >
                        Confirm
                    </Button>
                ) : (
                    <p>Game Created! Click Next!</p>
                )}
            </Grid>
        </div>
    )
}

export default SetGame