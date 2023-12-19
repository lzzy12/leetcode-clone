import React, { useState } from 'react'
import { ProblemContext } from '../ProblemContext'
import { Problem } from '../../models/Problem';

function ProblemContextProvider({children}) {
  const [problem, setProblem] = useState(null);
  
  const fetchProblemDetails = async (id) => {
    // let data = await http.get(`/problems/${id}`);
    // return Problem.ProblemParser(data);
    await setTimeout(null, 1000);
    return Problem.ProblemParser({
        id: id,
        name: 'Subsets II',
        difficulty: 'medium',
        description: 'Given an integer array nums that may contain duplicates, return all possible \n' +
            'subsets\n' +
            ' (the power set).\n' +
            '\n' +
            'The solution set must not contain duplicate subsets. Return the solution in any order.\n' +
            '\n' +
            ' \n' +
            '\n' +
            'Example 1:\n' +
            '\n' +
            'Input: `nums = [1,2,2]`\n' +
            'Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]\n' +
            'Example 2:\n' +
            '\n' +
            'Input: nums = [0]\n' +
            'Output: [[],[0]]\n' +
            ' \n' +
            '\n' +
            'Constraints:\n' +
            '\n' +
            '1 <= nums.length <= 10\n' +
            '-10 <= nums[i] <= 10',
        defaultCodes: {
            cpp: "#include <bits/stdc++.h>\n\nvector<vector<int>> subsetsWithDup(vector<int>& nums) {}",
            javascript: "/**\n" +
                " * @param {number[]} nums\n" +
                " * @return {number[][]}\n" +
                " */\n" +
                "var subsetsWithDup = function(nums) {\n" +
                "    \n" +
                "};",
            java: "class Solution {\n" +
                "    public List<List<Integer>> subsetsWithDup(int[] nums) {\n" +
                "        \n" +
                "    }\n" +
                "}"
        }
    })
}

  return (
    <ProblemContext.Provider value={{problem, setProblem, fetchProblemDetails}}>{children}</ProblemContext.Provider>
  )
}

export default ProblemContextProvider