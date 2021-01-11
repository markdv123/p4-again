import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { FormControl, Button, Icon, Grid, TextField } from '@material-ui/core'
import { __RegisterUser } from '../services/UserServices'
import Nav from '../components/Nav'

function SignUp(props) {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [formError, setError] = useState(false)

    const handleName = ({ target }) => {
        setName(target.value)
    }

    const handleUsername = ({ target }) => {
        setUsername(target.value)
    }

    const handleEmail = ({ target }) => {
        setEmail(target.value)
    }

    const handlePassword = ({ target }) => {
        setPassword(target.value)
    }

    const handleConfirmPassword = ({ target }) => {
        setConfirmPassword(target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setPasswordsMatch(false)
            return
        }
        setPasswordsMatch(true)
        try {
            const register = await __RegisterUser(name, username, email, password)
            props.toggleAuthenticated(true, register.user)
            props.history.push('/profile')
        } catch (error) {
            setError(true)
        }
    }
    return (
        <div>
            <Nav />
            <Grid container justify="center" style={{ margin: '20px', marginTop: "100px"}}>
                <FormControl className="flex-col" onSubmit={handleSubmit}>
                    <TextField
                        placeholder="Your Name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleName}
                    />
                    <TextField
                        placeholder="Your Username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUsername}
                    />
                    <TextField
                        placeholder="Your Email"
                        name="email"
                        value={email}
                        type="email"
                        onChange={handleEmail}
                    />
                    <TextField
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                    />
                    <TextField
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                    />
                    <br />
                    {passwordsMatch ? <p></p> : <p>Passwords must match</p>}
                    <Button onClick={handleSubmit} variant="contained" color='secondary' endIcon={<Icon>person_add</Icon>}>
                        Sign Up
                    </Button>

                    {formError ? <p>Account Error</p> : <p></p>}
                </FormControl>
            </Grid>
        </div>
    )
}

export default withRouter(SignUp)