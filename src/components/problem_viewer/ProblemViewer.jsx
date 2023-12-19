import React, { useContext, useEffect } from 'react'
import { QuestionViewer } from './QuestionViewer'
import { CodeEditor } from './CodeEditor'
import Grid from '@mui/material/Unstable_Grid2';
import { ProblemContext } from '../../contexts/ProblemContext';
export const ProblemViewer = (props) => {
    const {fetchProblemDetails, setProblem} = useContext(ProblemContext);
    useEffect( () => {
        fetchProblemDetails(props.id).then((problem) =>{ setProblem(problem); console.log(problem)});
    }, []);
    return (<Grid container alignSelf="start" alignContent={'start'} alignItems='start' style={{
            width: "95vw",
        }}>
            <Grid xs={6}><QuestionViewer/></Grid>
            <Grid xs={6}><CodeEditor/></Grid>
        </Grid>)
}

