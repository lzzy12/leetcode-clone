import axios from "axios"
import { Problem } from "../models/Problem";


export const fetchProblems = async () => {
    let data = await http.get('/problems');
    return data.map(Problem.ProblemParser);
}

