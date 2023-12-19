import React, { useState } from 'react'
import ProblemListContext  from '../ProblemListContext'
import client from '../../utils/http_client'
import { Problem } from '../../models/Problem'


function ProblemListContextProvider({children}) {
    const [problems, setProblems] = useState(null)

    const fetchProblems = async (options) => {
        // const res = await client.get('/problems');
        const data = [{
            id: Math.random() * 100,
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
            acceptancePercent: Math.floor(Math.random() * 100),
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
        }]
        for (var i = 1; i < 10; i++){
            data.push(data[0]);
            data[i].id = Math.floor(Math.random() * 100)
        }
        return data.map(Problem.ProblemParser);
    }
  return (
    <ProblemListContext.Provider value={{problems, setProblems, fetchProblems}}>
        {children}
    </ProblemListContext.Provider>
  );
}

export default ProblemListContextProvider