import {useEffect, useState} from "react";
import {Problem} from "../models/Problem.js";
import {Box, CircularProgress, Typography} from "@mui/material";

export const ProblemViewer = (props) => {
    const [problem, setProblem] = useState(null);
    const fetchData = async () => {
        let data = await fetch(`http://localhost:8080/${props.problemId}`, {
            method: 'GET',
        })
        setProblem(Problem.ProblemParser({
            id: 90,
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
                'Input: nums = [1,2,2]\n' +
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
        }));
    }
    useEffect(() => {
        fetchData().then(() => null);
    })
    return ((problem === null) ? <CircularProgress/> : <Box>
        <Typography variant="h5" fontWeight="bold">problem.name</Typography>
    </Box>)
}