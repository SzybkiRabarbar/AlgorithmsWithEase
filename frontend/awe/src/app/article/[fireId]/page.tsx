import Article from "./Article";


export default function Page({params}: {params: {fireId: string}}) {
  console.log(params.fireId);
  return <Article fireId={params.fireId} />
}