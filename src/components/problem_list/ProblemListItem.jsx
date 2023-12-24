import { Box,  Typography, useTheme} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import { Link } from 'react-router-dom'
import { capitalise } from '../../utils/methods'

function ProblemListItem(props) {
    const difficultyColorMap = {
        easy: 'misc.easyDifficulty',
        medium: 'misc.mediumDifficulty',
        hard: 'misc.hardDifficulty'
    }
  return (
    <Link to={`/problems/${props.problem.id}`} style={{textDecoration: 'none', cursor: 'pointer'}}>
        <Box sx={
            {
                backgroundColor: props.colorIndex == 0
                ? 'primary.dark'
                : 'primary.light',
                height: '100%',
                padding: 2,
                pl: 8,
                ":hover":{
                    borderWidth: 4,
                    borderColor: 'white',
                    borderStyle: 'solid',
                }
            }
        }>
            <Grid container columnSpacing={2}>
                <Grid xs={8}><Typography variant='h6' textAlign={'left'}>{props.problem.name}</Typography></Grid>
                <Grid xs={2} ><Typography variant='h6' sx= {{
                    color: difficultyColorMap[props.problem.difficulty],
                    align: 'center' 
                }}>{capitalise(props.problem.difficulty)}</Typography></Grid>
                <Grid xs={2}><Typography variant='h6' textAlign={'center'}>{props.problem.acceptancePercent}%</Typography></Grid>
            </Grid>
        </Box>
    </Link>
  )
}

export default ProblemListItem