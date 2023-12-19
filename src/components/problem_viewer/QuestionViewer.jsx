import {useContext, useEffect, useState} from "react";
import {Problem} from "../../models/Problem.js";
import {Box, CircularProgress, Typography} from "@mui/material";
import Markdown from 'react-markdown'
import { ProblemContext } from "../../contexts/ProblemContext.js";

export const QuestionViewer = (props) => {
    const {problem} = useContext(ProblemContext);
    
    return ((problem === null) ? <CircularProgress/> : <Box sx={{
        height: '85vh',
        marginLeft: 0
    }}>
        <Typography variant="h5" fontWeight="bold" align="left">{problem.name}</Typography>
        <Typography variant="body1" align="left"><Markdown>{problem.description}</Markdown></Typography>
    </Box>)
}