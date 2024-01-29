import {useContext, useEffect, useState} from "react";
import {Problem} from "../../models/Problem.js";
import {Box, CircularProgress, Divider, Typography} from "@mui/material";
import Markdown from 'react-markdown'
import { ProblemContext } from "../../contexts/ProblemContext";
import createDOMPurify from 'dompurify'

export const QuestionViewer = (props) => {
    const {problem} = useContext(ProblemContext);
    const DOMPurify = createDOMPurify(window)
    return ((problem === null) ? <CircularProgress/> : <Box className="disabledScrollbarContainer" sx={{
        height: '85vh',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        textAlign: 'start',
        pr: 4,
        color: 'white',
        width: '100%'
    }}>
        <Typography variant="h5" fontWeight="bold" align="left" sx={{ mb: 2}}>{problem.name}</Typography>
        <Divider color="white"/>
        { <Box sx={{
            pt: 2
        }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(problem.description) }} /> }
    </Box>)
}