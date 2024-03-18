interface ArticleContentInterface {
  title: string;
  group: number;
  content: {[key: string]: [string, ArticleContentItemInferface]}
}

export interface ArticleContentItemInferface {
  text?: string;
  src?: string;
  alt?: string;
  url?: string;
  note?: string;
  afterspace: number;
}

export default ArticleContentInterface