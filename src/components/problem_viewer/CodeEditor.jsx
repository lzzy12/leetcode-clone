import {useTheme} from '@emotion/react';
import Editor, {useMonaco} from '@monaco-editor/react';
import {MenuItem, Paper, Select, Typography, Button, Container, Box} from '@mui/material';
import {useContext, useEffect, useRef, useState} from 'react';
import {Languages} from "../../utils/enums.js";
import { ProblemContext } from '../../contexts/ProblemContext.js';
export const CodeEditor = (props) => {
    const theme = useTheme()
    const editorRef = useRef(null)
    const [language, setLanguage] = useState(Languages.javascript)
    const {problem} = useContext(ProblemContext);
    const onEditorMount = (editor, monaco) => {
        editorRef.current = editor
    }

    const onSubmit = async () => {
        try {
            await fetch('http://localhost:8080/submit', {
                method: 'POST',
                body: {
                    code: editorRef.current.getValue(),
                    lang: language,
                    problem: props.problemId,
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    const onRun = async () => {
        try {
            await fetch('http://localhost:8080/run', {
                method: 'POST',
                body: {
                    code: editorRef.current.getValue(),
                    lang: language,
                    problem: props.problemId,
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
    const onChangeLanguage = (event) => {
        setLanguage(event.target.value)
    }

    // useEffect(() => {
    //     const monaco = useMonaco()
    //     monaco.editor.defineTheme('appTheme', {
    //         base: 'vs-dark',
    //         colors: {
    //             'editor.background': theme.palette.primaryColor,
    //         }
    //     })
    // }, [])
    return (
        <Box sx={{
            height: '85vh',
        }}>
            <Paper sx={{
                backgroundColor: "primary.light",
                padding: 1
            }}><Select sx={{
                height: "30px",
                width: "130px",
                display: 'flex',
                backgroundColor: "primary.light"
            }} onChange={onChangeLanguage} value={language}>

                {
                    ...(Object.keys(Languages).map((key) => {
                        return <MenuItem value={Languages[key]} key={key} sx={{
                            backgroundColor: "primary.light"
                        }}><Typography
                            variant="body1" color="white">{Languages[key]}</Typography></MenuItem>
                    }))
                }
            </Select></Paper>
            <Editor onMount={onEditorMount} onChange={props.onChange}
                    value={problem != null? problem.defaultCodes[language]: ''}
                    defaultLanguage={language} theme='vs-dark' language={language}></Editor>
            <Paper elevation={2} sx={{
                backgroundColor: 'primary.light',
                padding: 1,
                display: 'flex',
                flexDirection: 'row'
            }}><Button variant="outlined" onClick={onSubmit} sx={{
                backgroundColor: 'action.active',
                color: 'white',
                border: 'none',
                ":hover": {
                    backgroundColor: 'action.active',
                    color: 'white',
                    boxShadow: 6
                }
            }}>Submit</Button> <Button variant="outlined" onClick={onRun} sx={{
                backgroundColor: 'action.passive',
                color: 'white',
                border: 'none',
                display: 'flex',
                ml: 2,
                flexDirection: 'row-reverse',
                ":hover": {
                    color: 'white',
                    boxShadow: 6
                }
            }}>Run</Button></Paper>
        </Box>
    )
}