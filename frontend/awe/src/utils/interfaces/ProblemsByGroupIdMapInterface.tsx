interface ProblemInterface {
        video_url: string | undefined;
        important: string;
        group_id: string;
        tips: string[] | undefined;
        problem_url: string;
        difficulty: string;
        solution: string | undefined;
}


interface ProblemsHashMapInterface {
  [fire_id: string]: ProblemInterface;
}

export default ProblemsHashMapInterface