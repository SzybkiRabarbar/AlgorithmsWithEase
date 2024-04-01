import Article from "./Article";


export default function Page({params}: {params: {fireId: string}}) {
  return <Article fireId={params.fireId} />
}