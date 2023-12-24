export class Problem {
    static ProblemParser(data) {
        return new Problem(data._id, data.name, data.description, data.defaultCodes, data.difficulty)
    }

    constructor(id, name, description, defaultCodes, difficulty) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.defaultCodes = defaultCodes;
        this.difficulty = difficulty;
    }
}