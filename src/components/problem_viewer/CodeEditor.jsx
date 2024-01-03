import {useTheme} from '@emotion/react';
import { Paper,  Button, Box} from '@mui/material';
import {forwardRef, useContext, useState} from 'react';
import {Languages} from "../../utils/enums.js";
import { ProblemContext } from '../../contexts/ProblemContext.js';
import AppDropDown from '../common/AppDropDown.jsx';
import { Editor } from '@monaco-editor/react';
export const CodeEditor = forwardRef((props, ref) => {
    const theme = useTheme()
    const [language, setLanguage] = useState(Languages.CPP)
    const {problem} = useContext(ProblemContext);
    const onEditorMount = (editor, monaco) => {
        ref.current = editor
        if (props.onEditorMount !== undefined)
            props.onEditorMount(editor);
    }
    const onChange = (value, editor) => {
        if (props.onChange !== undefined){
            props.onChange(value);
            console.log('on change called');
        }
    }
    const onSubmit = async () => {
        try {
            await fetch('http://localhost:8080/submit', {
                method: 'POST',
                body: {
                    code: ref.current.getValue(),
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
                    code: ref.current.getValue(),
                    lang: language,
                    problem: props.problemId,
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
    const onChangeLanguage = (lang) => {
        setLanguage(lang);
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
            height: '85%',
        }}>
            <Paper sx={{
                backgroundColor: "primary.light",
                padding: 1
            }}>

            <AppDropDown onChange={onChangeLanguage} value={language} choices={Languages}/>

            </Paper>
            <Editor onMount={onEditorMount} onChange={onChange}
                    value={problem != null? problem.defaultCodes[language]: ''}
                    defaultLanguage={language} theme='vs-dark' language={language}></Editor>
            <Paper elevation={2} sx={{
                backgroundColor: 'primary.light',
                padding: 1,
                display: 'flex',
                flexDirection: 'row',
                visibility: (props.consoleVisible ?? true) ? 'visible' : 'hidden'
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
})