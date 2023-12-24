import React, { useState } from 'react'
import { ProblemContext } from '../ProblemContext'
import { Problem } from '../../models/Problem';
import client from '../../utils/http_client';

function ProblemContextProvider({children}) {
  const [problem, setProblem] = useState(null);
  
  const fetchProblemDetails = async (id) => {
    const data = await client.get(`/problems/${id}`);
    return Problem.ProblemParser(data.data);
}

  return (
    <ProblemContext.Provider value={{problem, setProblem, fetchProblemDetails}}>{children}</ProblemContext.Provider>
  )
}

export default ProblemContextProvider