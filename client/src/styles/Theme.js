import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    "palette":{
        "common":{
          "black":"#000",
          "white":"#fff"
        },
        "background":{
          "paper":"rgb(36, 84, 89)",
          "default":"#fafafa"
        },
        "primary":{
          "light":"rgba(118, 118, 118, 1)",
          "main":"rgb(57,127,135)",
          "dark":"rgba(0, 0, 0, 1)",
          "contrastText":"#fff"
        },
        "secondary":{
          "light":"rgba(255, 29, 40, 1)",
          "main":"rgb(112,178,184)",
          "dark":"rgb(36, 84, 89)",
          "contrastText":"#fff"
        },
        "error":{
          "light":"#e57373",
          "main":"#f44336",
          "dark":"#d32f2f",
          "contrastText":"#fff"
        },
        "text":{
          "primary":"rgba(0, 0, 0, 0.87)",
          "secondary":"rgba(0, 0, 0, 0.54)",
          "disabled":"rgba(0, 0, 0, 0.38)",
          "hint":"rgba(0, 0, 0, 0.38)"
        }
      },
})

export default theme