import {useTheme} from '@emotion/react';
import { Paper, Box} from '@mui/material';
import {forwardRef, useContext, useState} from 'react';
import * as React from 'react';
import {Languages} from "../../utils/enums.js";
import { ProblemContext } from '../../contexts/ProblemContext.js';
import AppDropDown from '../common/AppDropDown.jsx';
import { Editor } from '@monaco-editor/react';

interface CodeEditorProps{
    onEditorMount?: ((editor: any) => void);
    onChange?: ((code: string | undefined) => void);
    onLanguageChange?: ((language: string) => void);
}
export const CodeEditor = forwardRef<any, CodeEditorProps>((props, ref) => {
    const theme = useTheme()
    const [language, setLanguage] = useState<string>(Languages.CPP)
    const {problem} = useContext(ProblemContext);
    const onEditorMount = (editor, monaco) => {
        if (!ref) return;
        ref.current = editor
        if (props.onEditorMount !== undefined)
            props.onEditorMount(editor);
    }
    const onChange = (value, editor) => {
        if (props.onChange){
            props.onChange(value);
        }
    }
    
    const onChangeLanguage = (lang: string) => {
        setLanguage(lang);
        if (props.onLanguageChange)
            props.onLanguageChange(lang);
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
            width: '100%'
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
        </Box>
    )
})