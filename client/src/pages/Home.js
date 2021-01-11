import React from 'react'
import Nav from '../components/Nav'
import {
    Grid,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Typography
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'

function getSteps() {
    return ['Step 1: Create an Account', 'Step 2: Make a Game', 'Step 3: Have Fun']
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `Create an account! Register with your name, email, and username so you can get started making fun, creative jeopardy games!`
        case 1:
            return `On your profile page, click the "New Game" button.  Then, follow the steps to create your game, add categories, and write questions!`
        case 2:
            return `Be your own game show host by sharing and playing your jeopardy game with your friends and family!`
        default:
            return 'Unknown step'
    }
}

const Home = (props) => {
    const [activeStep, setActiveStep] = React.useState(0)
    const steps = getSteps()

    const handleNext = () => {
        activeStep === steps.length - 1 ? props.history.push(`/register`) : setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleLogin = () => {
        props.history.push(`login`)
    }

    return (
        <div>
            <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
            <Grid container justify="center" style={{ paddingTop: "90px", textAlign: "center", width: '500px', margin: "0 auto" }}>
                <h1>Welcome to Jeopardy Builder</h1>
                <p>On this site, you can create and play your own jeopardy games with ease!</p>
                <Stepper activeStep={activeStep} orientation="vertical" style={{ color: 'white' }}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <Typography>{getStepContent(index)}</Typography>
                                <div>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            style={{marginRight: '5px'}}
                                        >
                                            {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                                        </Button>
                                        {activeStep === steps.length - 1 ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleLogin}
                                            >
                                                Login
                                            </Button>
                                        ) : null}
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
        </div>
    )
}

export default withRouter(Home)