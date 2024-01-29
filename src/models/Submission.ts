export enum SubmissionStatus {
    error = 'error',
    wa = 'wa',
    tle = 'tle',
    success = 'success',
    queued = 'queued',
    processing = 'processing'
}

class Submission{
    _id: string;
    status: SubmissionStatus;
    problemId: string;
    language: string
}

export class SubmissionResult{
    jobId: string;
    status: SubmissionStatus;
    problemId: string;
    language: string;
    error?: string;
    output?: string;
}