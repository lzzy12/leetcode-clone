import React, { useState } from 'react'
import ProblemListContext  from '../ProblemListContext'
import client from '../../utils/http_client'
import { Problem } from '../../models/Problem'


function ProblemListContextProvider({children}) {
    const [problems, setProblems] = useState(null)

    const fetchProblems = async (options) => {
        const res = await client.get('/problems');
        return res.data.map(Problem.ProblemParser);
    }
  return (
    <ProblemListContext.Provider value={{problems, setProblems, fetchProblems}}>
        {children}
    </ProblemListContext.Provider>
  );
}

export default ProblemListContextProvider