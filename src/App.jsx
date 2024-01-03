import './App.css'
import { createTheme, CssBaseline, ThemeProvider, Box } from '@mui/material';
import { ProblemViewer } from './components/problem_viewer/ProblemViewer';
import { QuestionViewer } from './components/problem_viewer/QuestionViewer'
import { CodeEditor } from './components/problem_viewer/CodeEditor'
import ProblemContextProvider from './contexts/providers/ProblemContextProvider'
import Grid from '@mui/material/Unstable_Grid2';
import { ProblemList } from './components/problem_list/ProblemList';
import ProblemListContextProvider from './contexts/providers/ProblemListContextProvider';

import {
    BrowserRouter,
    createBrowserRouter,
    Route,
    Routes
  } from "react-router-dom";
import { DrawerAppBar } from './components/DrawerAppBar';
import LoginPage from './components/authentication/Login';
import RegisterPage from './components/authentication/Register';
import ProblemForm from './components/problem_form/ProblemForm';
import ProblemEditForm from './components/problem_form/ProblemEditForm';


function App() {

    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: <ProblemListContextProvider><ProblemList /></ProblemListContextProvider>
            },
            {
                path: '/problems',
                element: <ProblemListContextProvider><ProblemList /></ProblemListContextProvider>
            },
            {
                path: '/problems/:id',
                element: <ProblemContextProvider><ProblemViewer></ProblemViewer></ProblemContextProvider>
            }
        ]
    )
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
            },
            misc: {
                easyDifficulty: '#1DB888',
                mediumDifficulty: '#FE9F21',
                hardDifficulty: '#FD3651',
            }
        },
        button: {
            action: "#2CBC5D"
        }
    },)
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Box sx={{mb:6}}><DrawerAppBar/></Box>
                <Routes>
                    <Route path='/' element={<ProblemListContextProvider><ProblemList /></ProblemListContextProvider>}/>
                    <Route path='/problems/:id' element={<ProblemContextProvider><ProblemViewer></ProblemViewer></ProblemContextProvider>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path='/admin/problems/add' element={<ProblemForm />} />
                    <Route path='/admin/problems/edit/:id' element={<ProblemContextProvider><ProblemEditForm/></ProblemContextProvider>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>

    )

}

export default App
