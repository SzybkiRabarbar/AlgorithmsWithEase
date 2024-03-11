interface ArticleContentInterface {
  title: string;
  group: number;
  content: {[key: string]: [string, ContentItem]}
}

interface ContentItem {
  text?: string;
  src?: string;
  alt?: string;
  url?: string;
  note?: string;
}

export default ArticleContentInterface