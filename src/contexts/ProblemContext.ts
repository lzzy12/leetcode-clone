import React from 'react'


export interface Problem{
    _id: string;
    name: string;
    description: string;
    defaultCodes: [{language: string, code: string}];
    difficulty: 'easy' | 'medium' | 'hard';
    solutionCode: string | null;
    testCases: string
}

export interface ProblemContextType {
    problem: null | Problem;
    setProblem: (problem: Problem) => void
    fetchProblemDetails: (id: string) => Promise<Problem>
    updateProblemDetails: (id: string, data: Problem) => Promise<string | null>
}
export const ProblemContext = React.createContext<ProblemContextType | null>(null);