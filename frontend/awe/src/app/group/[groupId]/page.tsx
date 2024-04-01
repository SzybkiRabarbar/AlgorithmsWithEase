import GroupDetail from './GroupDetail'
 

export default function Page({params}: {params: {groupId: string}}) {
  return <GroupDetail groupId={params.groupId} />
}