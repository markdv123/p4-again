import React, { useState } from 'react'
import { Grid, FormControl, TextField, Icon, Button } from '@material-ui/core'
import { __CreateCategory } from '../services/CategoryServices'

const SetCats = (props) => {
    const [name, setName] = useState('')
    const [cats, setCats] = useState([])

    const handleName = ({ target }) => setName(target.value)
    const handleSubmit = async () => {
        try {
            setCats([...cats, name])
            console.log(cats)
            await __CreateCategory({name: name}, props.gameId)
            setName('')
        } catch (error) {
            throw error
        }
    }

    return (
        <div>
            <Grid container justify="center">
                <FormControl
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="standard-basic"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleName}
                        style={{margin: '5px'}}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<Icon>add</Icon>}
                        onClick={handleSubmit}
                        style={{ margin: '5px' }}
                    >
                        Add
                    </Button>
                </FormControl>
            </Grid>
            <Grid container justify="center" style={{marginBottom: '10px'}}>
                <div style={{flexDirection: 'column'}}>
                    <h4>Categories:</h4>
                {cats.map(cat => (
                    <li key={cat} style={{listStyle: "none"}}>{cat}</li>
                ))}
                </div>
            </Grid>
        </div>
    )
}

export default SetCats