import React from 'react'
import { Languages } from '../../utils/enums'
import { MenuItem, Select, Typography } from '@mui/material'

function AppDropDown(props) {
    // onChange: called when the value is changed with the changed value
    // choices: An object with keys as the text to be displayed to the user and the corresponding values are the internal values used to send to the backend
    // value: Currently selected value. This component does not have it's own state so the users need to maintain their own state

    const onChange = (event) => {
        props.onChange(event.target.value);
    }
    return (
        <Select sx={{
            height: "30px",
            width: "130px",
            display: 'flex',
            backgroundColor: "primary.light",
            ...props.sx,
        }} onChange={onChange} value={props.value}>
            {
                ...(Object.keys(props.choices).map((key) => {
                    return <MenuItem value={props.choices[key]} key={key} sx={{
                        backgroundColor: "primary.light"
                    }}><Typography
                        variant="body1" color="white">{key}</Typography></MenuItem>
                }))
            }
        </Select>
    )
}

export default AppDropDown