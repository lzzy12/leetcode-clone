import {useContext, useEffect, useState} from "react";
import {Problem} from "../../models/Problem.js";
import {Box, CircularProgress, Typography} from "@mui/material";
import Markdown from 'react-markdown'
import { ProblemContext } from "../../contexts/ProblemContext.js";
import createDOMPurify from 'dompurify'

export const QuestionViewer = (props) => {
    const {problem} = useContext(ProblemContext);
    const DOMPurify = createDOMPurify(window)
    return ((problem === null) ? <CircularProgress/> : <Box sx={{
        height: '85vh',
        marginLeft: 0,
        textAlign: 'start',
        pr: 4,
    }}>
        <Typography variant="h5" fontWeight="bold" align="left">{problem.name}</Typography>
        { <Box sx={{
            pt: 2
        }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(problem.description) }} /> }
    </Box>)
}