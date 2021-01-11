import React, { useState } from 'react'
import Nav from '../components/Nav'
import {
    Grid,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,

} from '@material-ui/core'
import SetGame from '../components/SetGame'
import SetCats from '../components/SetCats'
import SetQs from '../components/SetQs'
import {withRouter} from 'react-router-dom'

function getSteps() {
    return ['Create Game', 'Create Categories', 'Create Questions']
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Title your game and give it a description! Click Confirm, then Next.'
        case 1:
            return 'Name your Categories!'
        case 2:
            return 'Input your questions and answers! Define their point values!'
        default:
            return 'Unknown stepIndex'
    }
}

const CreatGame = (props) => {
    const [activeStep, setActiveStep] = React.useState(0)
    const steps = getSteps()
    const [gameId, setGameId] = useState('')

    const handleNext = () => {
        if(activeStep < 2) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        } else {
            props.history.push(`/play/${gameId}`)
        }
    }
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
    const handleReset = () => setActiveStep(0)

    const gId = (id) => setGameId(id)

    let content = ''
    switch (activeStep) {
        case 0:
            content = <SetGame {...props} gId={gId}/>
            break
        case 1:
            content = <SetCats {...props} gameId={gameId}/>
            break
        case 2:
            content = <SetQs {...props} gameId={gameId}/>
            break
        default:
            content = 'no active step'
    }
    return (
        <div>
            <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
            <div style={{ width: "100%", marginTop: '100px'}}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography >All steps completed</Typography>
                            <Button color='secondary' onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div style={{margin: '10px'}}>
                                <Typography>{getStepContent(activeStep)}</Typography>
                                <Grid container justify="center">
                                    {content}
                                </Grid>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        color='secondary'
                                    >
                                        Back
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default withRouter(CreatGame)