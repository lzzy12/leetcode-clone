import React, { useState } from 'react'
import { ProblemContext } from '../ProblemContext'
import { Problem } from '../../models/Problem';
import client from '../../utils/http_client';

function ProblemContextProvider({children}) {
  const [problem, setProblem] = useState(null);
  
  const fetchProblemDetails = async (id): Promise<Problem> => {
    const data = await client.get(`/problems/${id}`);
    return Problem.ProblemParser(data.data);
}

  const updateProblemDetails = async (id: string, data: Problem): Promise<string | null> => {
    const res = await client.patch(`/problems/${id}`, data);
    if (res.status >= 200 && res.status < 300){
      return null;
    }
    return 'Something went wrong';
  }

  return (
    <ProblemContext.Provider value={{problem, setProblem, fetchProblemDetails, updateProblemDetails}}>{children}</ProblemContext.Provider>
  )
}

export default ProblemContextProvider