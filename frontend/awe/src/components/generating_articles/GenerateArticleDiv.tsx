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
    <div className='text-container'>
      {props.content.text &&
        <div className='text-div'>
          <div dangerouslySetInnerHTML={{ __html: props.content.text }} />
        </div>
      }
    </div>
  );
}

const imgElement = (props: {content: ArticleContentItemInferface}) => {

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (img) {
      img.requestFullscreen();
    }
  };

  const src = props.content.src;
  const alt = props.content.alt;

  return (
    <div className='img-container'>
      <img src={ src } alt={ alt } onClick={handleImageClick}></img>
    </div>
  );
}

const videoElement = (props: {content: ArticleContentItemInferface}) => {
  const url = props.content.url;
  return (
    <div className='video-container'>
      <iframe data-testid={ url } src={ url } width="560" height="315"
      title="YouTube video player" allowFullScreen></iframe>
    </div>
  );
}

const codeElement = (props: {content: ArticleContentItemInferface}) => {

  const url = props.content.url;

  return (
    <div className='code-container'>
      <code></code>
    </div>
  );
}

const noteElement = (props: {content: ArticleContentItemInferface}) => {

  return (
    <div className='note-container'>
      <blockquote>
        <p>{ props.content.note }</p>
      </blockquote>
    </div>
  );
}

export default GenereteArticleDiv