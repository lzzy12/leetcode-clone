import './App.css'
import {CodeEditor} from "./components/CodeEditor.jsx";
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';


function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#282828",
                light: "#303030",
                dark: "#1A1A1A"
            },
            background: {
                default: "#1A1A1A"
            },
            action: {
                active: "#2CBC5D",
                passive: '#454545'
            }
        },
        button: {
            action: "#2CBC5D"
        }
    },)
    return (

        <ThemeProvider theme={theme}>
            <CssBaseline/>
                <CodeEditor problemId={'dfdf'}/>
        </ThemeProvider>

    )

}

export default App
