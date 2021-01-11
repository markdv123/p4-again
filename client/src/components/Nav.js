import React from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Icon
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'

const Nav = (props) => {
    return props.authenticated && props.currentUser ? (
        <AppBar position="absolute">
            <Toolbar>
                <IconButton
                    onClick={() => props.history.push('/')}
                    edge="start"
                    aria-label="menu"
                    color='inherit'
                >
                    <Icon >home</Icon>
                </IconButton>
                <Typography variant="h6">
                    Jeopardy Builder
                </Typography>
                <Typography variant="h6" style={{ position: 'relative', margin: '0 auto' }}>
                    Hello, {props.currentUser.name}
                </Typography>
                <Button color='inherit' href='/play'>
                    Play
                </Button>
                <Button color='inherit' onClick={() => props.history.push('/profile')}>
                    Profile
                </Button>
                <Button
                    href="/"
                    onClick={() => localStorage.clear()}
                    color='inherit'
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    ) : (
            <AppBar position="absolute">
                <Toolbar>
                    <IconButton
                        onClick={() => props.history.push('/')}
                        edge="start"
                        aria-label="menu"
                        color='inherit'
                    >
                        <Icon >home</Icon>
                    </IconButton>
                    <Typography variant="h6">
                        Jeopardy Builder
                    </Typography>
                    <Typography variant="h6" style={{ position: 'relative', margin: '0 auto' }} />
                    <Button color='inherit' href='/play'>
                        Play
                    </Button>
                    <Button color="inherit" href="/login">
                        Sign In
                    </Button>
                    <Button color="inherit" href="/register">
                        Sign Up
                    </Button>
                </Toolbar>
            </AppBar>
        )
}

export default withRouter(Nav)