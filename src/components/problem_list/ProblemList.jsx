import { useContext, useEffect } from "react"
import ProblemListContext from "../../contexts/ProblemListContext"
import ProblemListItem from "./ProblemListItem";
import { Box, CircularProgress, Typography } from "@mui/material";


export const ProblemList = () => {
    const { problems, setProblems, fetchProblems } = useContext(ProblemListContext);
    useEffect(() => {
        fetchProblems().then((data) => setProblems(data));
    }, [])

    return (
        <Box sx={
            {
                mt: 4
            }
        }>
            {problems == null ? <CircularProgress /> 
            : problems.length === 0 ? <Typography variant="body1">No Problems Found. Come back later!</Typography> 
            : problems.map((prob, index) => <ProblemListItem key={prob.id} problem={prob} colorIndex={index % 2}/>)}
        </Box> 
    )
}