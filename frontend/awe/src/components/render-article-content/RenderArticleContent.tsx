'use client'

import './RenderArticleContent.scss'
import { ArticleContentItemInferface } from '@/utils/interfaces/ArticleContentInterface';
import fetchData from '@/utils/fetchData';
import Code from '../code/Code';
import { useState } from 'react';
import Loading from '../loading/Loading';


export default function GenereteArticleDiv(
  props: {
    obj: [string, ArticleContentItemInferface],
    index: number
  })
{

  const [isVisible, setIsVisible] = useState('');

  const type: number = +props.obj[0];
  const content: ArticleContentItemInferface = props.obj[1];
  const index = props.index;
  const elements = [textElement, ImgElement, videoElement, CodeElement, noteElement];
  const Element = elements[type];

  const changeVisibility = async () => {
    const waitTime = (index) * 300 + 500; 

    await new Promise((resolve) => setTimeout(resolve, waitTime));

    setIsVisible(' visible');
  };
  changeVisibility();

  return (
    <>
      <div key={ index } className={'container-container' + isVisible}
        style={{ animation: `1s fadeIn ${(index + 1) * 0.3}s ease-in-out,
                             3s changeBackground ${(index + 1) * 0.3}s ease-in-out` }}>
        <Element content={content} />
      </div>
      <div className={ "space-" + content.afterspace }></div>
    </>
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


const ImgElement = (props: {content: ArticleContentItemInferface}) => {
  const [imgWidth, setImgWidth] = useState(0);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (img) {
      img.requestFullscreen();
    }
  };

  const src = props.content.src ? props.content.src : '';
  const alt = props.content.alt;

  const applyWidth = () => {
    const img = document.getElementById(src);
    if (img && img.clientWidth != imgWidth) {
      setImgWidth(img.clientWidth);
    };
    return imgWidth;
  };

  return (
    <div className='img-container'>
      <div className='img-bg'>
        <img id={ src } src={ src } alt={ src } onClick={handleImageClick}></img>
        <br />
        <div className='alt-text' style={{maxWidth: applyWidth()}} >{ alt }</div>
      </div>
    </div>
  );
}


const videoElement = (props: {content: ArticleContentItemInferface}) => {
  const url = props.content.url;
  return (
    <div className='video-container'>
      <iframe data-testid={ url } src={ url } width="560" height="315"
        title="YouTube video player"
        allowFullScreen></iframe>
    </div>
  );
}


const CodeElement = (props: {content: ArticleContentItemInferface}) => {

  const url = props.content.url;
  const { data, error, isLoading } = fetchData<string>(url ? url : '');

  return (
    <>
      {isLoading && 
        <Loading />
      }
      {data && 
        <div className='code-container'>
          <Code language='python'>
            { data }
          </Code>
        </div>
      }
    </>
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