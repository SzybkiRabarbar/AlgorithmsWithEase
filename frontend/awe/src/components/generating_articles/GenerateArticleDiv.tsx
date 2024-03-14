import { ArticleContentItemInferface } from '../../interfaces/ArticleContentInterface'

function GenereteArticleDiv(
  props: {
    obj: [string, ArticleContentItemInferface],
    index: number
  }) {
    const type: number = +props.obj[0];
    const content: ArticleContentItemInferface = props.obj[1];
    const index = props.index;
    const elements = [textElement, imgElement, videoElement, codeElement, noteElement];
    const Element = elements[type];
            
  return (
    <div key={ index }>
      <Element content={content} />
    </div>
  )
}

const textElement = (props: {content: ArticleContentItemInferface}) => {
  return (
    <p>{ props.content.text }</p>
  );
}

const imgElement = (props: {content: ArticleContentItemInferface}) => {
  const src = props.content.src;
  const alt = props.content.alt;
  return (
    <img src={ src } alt={ alt }></img>
  );
}

const videoElement = (props: {content: ArticleContentItemInferface}) => {
  const url = props.content.url;
  return (
    <iframe data-testid={ url } src={ url }></iframe>
  );
}

const codeElement = (props: {content: ArticleContentItemInferface}) => {
  const url = props.content.url;
  return (  // TODO githubfetch
    <code></code>
  );
}

const noteElement = (props: {content: ArticleContentItemInferface}) => {
  return (
    <div className='note'>
      <span>{ props.content.note }</span>
    </div>
  );
}

export default GenereteArticleDiv