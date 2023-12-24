import React, { useContext, useEffect, useRef } from 'react'
import { QuestionViewer } from './QuestionViewer'
import { CodeEditor } from './CodeEditor'
import Grid from '@mui/material/Unstable_Grid2';
import { ProblemContext } from '../../contexts/ProblemContext';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Languages } from '../../utils/enums';
export const ProblemViewer = (props) => {
    const {fetchProblemDetails, setProblem} = useContext(ProblemContext);
    const ref = useRef(null);
    const {id} = useParams();
    useEffect( () => {
        fetchProblemDetails(id).then((problem) =>{
             setProblem(problem);
             setTimeout(() => ref.current.setValue(problem.defaultCodes[0]['code']),1000)
        });
    }, []);
    return (<Grid container alignSelf="start" alignContent={'start'} alignItems='start' style={{
            width: "95vw",
        }}>
            <Grid xs={6}><QuestionViewer/></Grid>
            <Grid xs={6}><Box sx={
                {
                    height: '95vh'
                }
            }><CodeEditor ref={ref}/></Box></Grid>
        </Grid>)
}

