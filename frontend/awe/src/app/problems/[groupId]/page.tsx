import ProblemList from "./ProblemList"
 

export default function Page({params}: {params: {groupId: string}}) {
  return <ProblemList groupId={params.groupId} />
}