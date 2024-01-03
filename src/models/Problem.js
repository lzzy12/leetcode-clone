export class Problem {
    static ProblemParser(data) {
        return new Problem(data._id, data.name, data.description, data.defaultCodes, data.difficulty, data.solutionCode, data.solutionLanguage, data.testCases)
    }

    constructor(id, name, description, defaultCodes, difficulty, solutionCode, solutionLanguage, testCases) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.defaultCodes = defaultCodes;
        this.difficulty = difficulty;
        this.solutionCode = solutionCode;
        this.solutionLanguage = solutionLanguage;
        this.testCases = testCases;
    }
}