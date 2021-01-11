import React, { useState } from 'react'
import { FormControl, Button, Icon, Grid, TextField } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import Nav from '../components/Nav'
import { __LoginUser } from '../services/UserServices'

function SignIn(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setError] = useState(false)

    const handleEmail = ({ target }) => {
        setEmail(target.value)
        setError(false)
    }

    const handlePassword = ({ target }) => {
        setPassword(target.value)
        setError(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const loginData = await __LoginUser(email, password)
            props.toggleAuthenticated(true, loginData.user)
            props.history.push('/profile')
        } catch (error) {
            setError(true)
        }
    }
    return (
        <div>
            <Nav />
            <Grid container justify="center" style={{margin: '20px', marginTop: "100px"}}>
                <FormControl className="flex-col" onSubmit={handleSubmit}>
                    <TextField
                        placeholder='Your Email'
                        name='email'
                        type='email'
                        value={email}
                        onChange={handleEmail}
                    />
                    <TextField
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handlePassword}
                    />
                    <br />
                    <Button onClick={handleSubmit} variant="contained" color='secondary' endIcon={<Icon>person</Icon>}>
                        Sign In
                    </Button>
                    {formError ? <p>Error While Logging In</p> : <p></p>}
                </FormControl>
            </Grid>
        </div>
    )
}

export default withRouter(SignIn)