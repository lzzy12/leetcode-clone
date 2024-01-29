import React, { useContext, useEffect, useRef, useState } from 'react'
import { QuestionViewer } from './QuestionViewer'
import { CodeEditor } from './CodeEditor'
import { ProblemContext, ProblemContextType } from '../../contexts/ProblemContext';
import { Box, Button, CircularProgress, Paper, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ResizeHandle from './ResizeHandler';
import './ProblemViewer.css'
import ConsoleWindow from './ConsoleWindow';
import client from '../../utils/http_client';
import { Languages } from '../../utils/enums';
import { SubmissionResult, SubmissionStatus } from '../../models/Submission';
export const ProblemViewer = () => {
    const {problem, fetchProblemDetails, setProblem} = useContext(ProblemContext) as ProblemContextType;
    const ref = useRef<any>(null);
    const {id} = useParams();
    const [isRunning, setIsRunning] = useState(false);
    const [testCases, setTestCases] = useState<string>(problem?.testCases ?? '');
    const [output, setOutput] = useState<string>('');
    const consoleWindowRef = useRef<ImperativePanelHandle>(null);
    let language: string = Languages.CPP;

    const onLanguageChange = (lang: string) => {
        language = lang;
        console.log(language);
    }
    const onSubmit = async () => {
        try {
            if (!ref || !ref.current) return;
            const res = await client.post('/submit', {
                code: ref.current.getValue(),
                language,
                problemId: id,
            })
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

    const onRun = async () => {
        try {
            setIsRunning(true);
            const submitRes = await client.post('/submit', {
                code: ref.current.getValue(),
                language,
                problemId: id,
            })
            console.log(submitRes.data);
            const submitData = submitRes.data as {jobId: string};
            let resultRes = await client.get('/result', {
                params: {
                    jobId: submitData.jobId
                }
            })
            let resultData = resultRes.data as SubmissionResult;
            while(resultData.status === SubmissionStatus.queued || resultData.status === SubmissionStatus.processing){
                await (new Promise((resolve) => setTimeout(resolve, 1000)))
                resultData = (await client.get('/result', {
                    params: {
                        jobId: submitData.jobId
                    }
                })).data as SubmissionResult;
            }
            if (resultData.status === SubmissionStatus.error) {
                setOutput(resultData.error ?? "Something went wrong")
            } else{
                if (!resultData.output){
                    setOutput("[No output]");
                    
                } else{
                    setOutput(resultData.output ?? "[No output]")
                }
            }
            consoleWindowRef.current?.resize(75);
        } catch (e) {
            console.log(e);
        } finally{
            setIsRunning(false);
        }
    }
    useEffect( () => {
        if (!id){
            return console.log('id not provided')
        }
        fetchProblemDetails(id).then((problem) =>{
             setProblem(problem);
             setTimeout(() => ref.current.setValue(problem.defaultCodes[0]['code']), 1000)
        });
    }, []);

    
    return (<Box sx={{
        width: '95vw'
    }}><PanelGroup direction='horizontal'>
                <Panel defaultSize={50}>
                    <Box sx={{
                        p: 2
                    }}>
                        <QuestionViewer/>
                    </Box>
                </Panel>
                <ResizeHandle/>
                <Panel defaultSize={50}>
                    <PanelGroup direction='vertical'>
                        <Panel defaultSize={95}>
                    <CodeEditor ref={ref} onLanguageChange={onLanguageChange}/>
                    
                </Panel>
                <ResizeHandle direction='vertical'/>
                <Panel defaultSize={5} ref={consoleWindowRef}>
                    <Box sx={{
                        height: '100%',
                        weight: '100%',
                        position: 'relative',
                        textAlign: 'center',
                        alignContent: 'center'
                    }}>
                        <ConsoleWindow testCases={testCases} 
                            setTestCases={setTestCases} output={output} 
                            setOutput={setOutput}
                        />
                        {isRunning? <Box className="disabledScrollbarContainer" sx={{
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.7,
                            backgroundColor: '#b3c7f7',
                            position: 'absolute',
                            top: 0
                        }}><CircularProgress sx={{
                            m: 'auto',
                        }}/></Box>: <div/>}
                    </Box>
                </Panel>
                </PanelGroup>
            </Panel>
            </PanelGroup>
            <Box sx={{
                    // backgroundColor: 'primary.dark',
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                }}><Button variant="outlined" onClick={onSubmit} sx={{
                    backgroundColor: 'action.active',
                    color: 'white',
                    border: 'none',
                    ":hover": {
                        backgroundColor: 'action.active',
                        color: 'white',
                        boxShadow: 6
                    }
                }}>Submit</Button> 
                {isRunning? <CircularProgress sx={{
                    ml: 2
                }}/>: <Button variant="outlined" onClick={onRun} sx={{
                    backgroundColor: 'action.passive',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    ml: 2,
                    flexDirection: 'row-reverse',
                    ":hover": {
                        color: 'white',
                        backgroundColor: 'action.passive',
                        boxShadow: 6
                    }
                }}>Run</Button>}
                </Box>
            
            </Box>)
}

