import { Alert, Box, Button, CircularProgress, Snackbar, TextField, TextareaAutosize } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import AppDropDown from '../common/AppDropDown'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Languages } from '../../utils/enums';
import { CodeEditor } from '../problem_viewer/CodeEditor';
import ProblemContextProvider from '../../contexts/providers/ProblemContextProvider';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build';
import './editor.css'
import client from '../../utils/http_client';
import { ProblemContext } from '../../contexts/ProblemContext';
import { useParams } from 'react-router-dom';
import { Problem } from '../../models/Problem';


function ProblemEditForm() {
    const {fetchProblemDetails, updateProblemDetails} = useContext(ProblemContext);
    const {id} = useParams();
    const [problem, setProblem] = useState(null);
    const [difficulty, setDifficulty] = useState('easy');
    let startingCodeRef = useRef(null);
    let solutionCodeRef = useRef(null);
    let [problemTitle, setProblemTitle] = useState('')
    let [problemDesc, setProblemDesc] = useState('');
    let [testCases, setTestCases] = useState('');
    let [isLoading, setIsLoading] = useState(false);
    let startingCode = ''
    let solutionCode = ''
    let fetchPromise;
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        fetchPromise = fetchProblemDetails(id);
        fetchPromise = fetchPromise.then((p) => {
            setProblem(p);
            setDifficulty(p.difficulty);
            setProblemDesc(p.description);
            setProblemTitle(p.name);
            setTestCases(p.testCases);
        })
    }, [])
    const restoreStartingCode = async (editor) => {
        await fetchPromise;
        startingCode = problem.defaultCodes[0].code;
        editor.setValue(startingCode);
    }
    const restoreSolCode = async (editor) => {
        await fetchPromise;
        solutionCode = problem.solutionCode;
        editor.setValue(solutionCode);
    }
    const onSubmitClicked = async ()=> {
        solutionCode = solutionCodeRef.current.getValue();
        startingCode = startingCodeRef.current.getValue();
        let error;
        try{
            error = await updateProblemDetails(id, Problem.ProblemParser({
                name: problemTitle,
                description: problemDesc,
                defaultCodes: [
                    {
                        language: Languages.CPP,
                        code: startingCode,
                    }
                ],
                solutionCode,
                solutionLanguage: Languages.CPP,
                testCases
            }))
            if (error != null)
                setAlert({msg: error, type: 'error'});
            else
                setAlert({msg: 'Updated successfully', type: 'success'})
        } catch(e){
            setAlert(error);
        }
        
    }
    return (
        <>{ problem == null? <CircularProgress/>: <Grid container spacing={2} style={{
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
                }} value={problemTitle} /> <br />
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
                <Box sx={{
                    textAlign: 'start',
                    mt: 2
                }}><TextareaAutosize minRows={10} placeholder='Test cases' style={{ width: '100%' }} onChange={(event) => {
                    setTestCases(event.target.value);
                    console.log('ssdsd');
                }} value={testCases} /></Box>
            </Grid>
            <Grid xs={6} justifyContent={'start'} sx={{
                height: '100vh'
            }}>

                <Grid container direction={'column'}>
                    <Grid>Starter Codes: </Grid>
                    <Grid xs={5} height={'45vh'}><ProblemContextProvider><CodeEditor onEditorMount={restoreStartingCode} ref={startingCodeRef} consoleVisible={false} onChange={(code) => { startingCode = code}}/></ProblemContextProvider></Grid>
                    <Grid>Solution Code: </Grid>
                    <Grid xs={5} height={'50vh'}><ProblemContextProvider><CodeEditor onEditorMount={restoreSolCode} ref={solutionCodeRef} consoleVisible={false} onChange={(code) => { solutionCode = code}} /></ProblemContextProvider></Grid>
                </Grid>
            </Grid>
            <Grid>
                {isLoading ? <CircularProgress /> : <Button variant='contained' onClick={onSubmitClicked}>Update</Button>}
            </Grid>
        </Grid>
        
    } <Snackbar open={alert != null} autoHideDuration={6000} onClose={() => setAlert(null) }>
        <Alert onClose={() => setAlert(null) }  severity={alert?.type??''} sx={{ width: '100%' }}>
        {alert?.msg??''}
        </Alert>
  </Snackbar></>
    )
}

export default ProblemEditForm