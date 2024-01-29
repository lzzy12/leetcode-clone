import { Box, Divider, TextField, TextareaAutosize, Typography } from "@mui/material";
import React from "react";

export interface ConsoleWindowProps{
    testCases: string;
     setTestCases: ((testCases: string) => any);
     testCaseEditable?: boolean;
     output: string;
     setOutput: ((out: string) => any);
}
export default function ConsoleWindow({testCases, setTestCases, testCaseEditable = true, output, setOutput}: ConsoleWindowProps){
    return (
        <Box className="disabledScrollbarContainer" sx={{
            height: '100%',
            width: '100%',
            alignContent: 'start',
            textAlign: 'start',
            p: 2,
            overflowY: 'scroll',
            position: 'relative'
        }}>
            <Typography variant="h5" color='white'>Console</Typography>
            <Divider color='white' sx={{
                my: 2
            }}/>
            <Typography variant="h6" color='white' sx={{
                mb: 2,
            }}>Test case:</Typography>
            <TextareaAutosize minRows={5} placeholder='Test cases' style={{ width: '100%' }} onChange={(event) => {
                    setTestCases(event.target.value);
                }} value={testCases} contentEditable={testCaseEditable}/>
            <Typography variant="h6" color='white'>Output: </Typography>
            <TextareaAutosize minRows={5} maxRows={10} contentEditable={false} placeholder='Test cases' style={{ width: '100%' }} onChange={(event) => {
                    setOutput(event.target.value);
                }} value={output} />
        </Box>
    )
}