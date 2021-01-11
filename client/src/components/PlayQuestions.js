import React from 'react'
import {Paper} from '@material-ui/core'

const PlayQuestions = ({ q, handleQ }) => {
    return (
        <div>
            {q.map((q, i) => (
                <div key={i} style={{ margin: "10px" }}>
                    <Paper style={{ width: '150px', color: 'white', padding: '5px' }} onClick={() => handleQ(q, i)}>
                        {(i + 1) * 100}
                    </Paper>
                </div>
            ))}
        </div>
    )
}

export default PlayQuestions