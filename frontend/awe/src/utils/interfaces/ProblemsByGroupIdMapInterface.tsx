export interface ProblemInterface {
  name: string;
  video_url: string | undefined;
  important: string | undefined;  // str if important else undefined
  group_id: string;
  tips: string[] | undefined;
  problem_url: string;
  difficulty: string;
  solution: string | undefined;
}


export interface ProblemsHashMapInterface {
  [fire_id: string]: ProblemInterface;
}