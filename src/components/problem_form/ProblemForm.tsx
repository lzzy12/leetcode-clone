import { Box, Button, CircularProgress, TextField, TextareaAutosize } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AppDropDown from '../common/AppDropDown'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Languages } from '../../utils/enums';
import { CodeEditor } from '../problem_viewer/CodeEditor';
import ProblemContextProvider from '../../contexts/providers/ProblemContextProvider';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build';
import './editor.css'
import client from '../../utils/http_client';

function ProblemForm() {
    const [difficulty, setDifficulty] = useState('easy');
    const startingCodeRef = useRef(null);
    const solutionCodeRef = useRef(null);
    let [problemTitle, setProblemTitle] = useState('')
    let [problemDesc, setProblemDesc] = useState('');
    let [isLoading, setIsLoading] = useState(false);
    const saveProblemForm = async () => {
        const problemDescription = problemDesc;
        if (startingCodeRef.current === null || solutionCodeRef.current === null) {
            console.log('Code editor is not ready or something else went wrong');
            return;
        }
        const startingCode = startingCodeRef.current.getValue();
        const solutionCode = solutionCodeRef.current.getValue();
        localStorage.setItem('draft-problem', JSON.stringify({
                name: problemTitle,
                description: problemDescription,
                difficulty,
                defaultCodes: [{
                    language: Languages.CPP,
                    code: startingCode,
                }],
                solutionLanguage: Languages.CPP,
                solutionCode: solutionCode
        }))
    }
    setTimeout(() => {
        setInterval(saveProblemForm, 5000);
    }, 5000);
    useEffect(() => {
        if (localStorage.getItem('draft-problem') !== null){
            setTimeout(() => {const draftProblem = JSON.parse(localStorage.getItem('draft-problem')!);
            if (draftProblem !== null){
                setProblemTitle(draftProblem.name)
                setProblemDesc(draftProblem.description);
                setDifficulty(draftProblem.difficulty);
                startingCodeRef.current.setValue(draftProblem.defaultCodes[0].code)
                solutionCodeRef.current.setValue(draftProblem.solutionCode)
            }}, 2000)
        }
    }, [])
    const submitProblemForm = async () => {
        const problemDescription = problemDesc;
        if (startingCodeRef.current === null || solutionCodeRef.current === null) {
            console.log('Code editor is not ready or something else went wrong');
            return;
        }
        const startingCode = startingCodeRef.current.getValue();
        const solutionCode = solutionCodeRef.current.getValue()
        try{
            setIsLoading(true);
            const res = await client.post('/problems', {
                name: problemTitle,
                description: problemDescription,
                difficulty,
                defaultCodes: [{
                    language: Languages.CPP,
                    code: startingCode,
                }],
                solutionLanguage: Languages.CPP,
                solutionCode: solutionCode
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                withCredentials: false
                
            });
            // const navigate = useNavigate();
            // navigate(`/problems/${res.data.id}`)
        } catch(e){
            console.log(e);
        } finally{
            setIsLoading(false);
        }
        
    }
    return (
        <Grid container spacing={2} style={{
            width: "95vw",
        }}>

            <Grid xs={6} justifyContent={'start'}>

                <TextField label="Problem Title" sx={
                    {
                        mb: 4,
                        width: '100%'
                    }
                } onChange={(event) => {
                    setProblemTitle(event.target.value);
                    console.log(event.target.value)
                }} value={problemTitle}/> <br />
                <AppDropDown choices={{
                    Easy: 'easy',
                    Medium: 'medium',
                    Hard: 'hard'
                }} value={difficulty} onChange={diff => { setDifficulty(diff); console.log(diff) }} sx={{
                    mb: 2
                }} />
                <CKEditor
                    editor={Editor}
                    onChange={(event, editor) => {
                        setProblemDesc(editor.getData());
                    }}
                    data={problemDesc}
                />

            </Grid>
            <Grid xs={6} justifyContent={'start'} sx={{
                height: '100vh'
            }}>

                <Grid container direction={'column'}>
                    <Grid>Starter Codes: </Grid>
                    <Grid xs={5} height={'45vh'}><ProblemContextProvider><CodeEditor ref={startingCodeRef} consoleVisible={false} /></ProblemContextProvider></Grid>
                    <Grid>Solution Code: </Grid>
                    <Grid xs={5} height={'50vh'}><ProblemContextProvider><CodeEditor ref={solutionCodeRef} consoleVisible={false} /></ProblemContextProvider></Grid>
                </Grid>
            </Grid>
            <Grid>
                { isLoading? <CircularProgress/>: <Button variant='contained' onClick={submitProblemForm}>Submit</Button>}
            </Grid>
            <Grid>
                <Button variant='contained' onClick={saveProblemForm}>Save</Button>
            </Grid>
        </Grid>
    )
}

export default ProblemForm