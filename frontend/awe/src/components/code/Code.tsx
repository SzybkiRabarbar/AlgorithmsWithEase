import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import CodeParamsInterface from '@/utils/interfaces/CodeParamsInterface';


const customStyle = {
  ...vscDarkPlus,
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    fontFamily: 'Fira Code',
  },
};


const Code = ({ language, children }: CodeParamsInterface) => (
    <SyntaxHighlighter language={ language } 
        style={ customStyle } showLineNumbers
    >
        { children }
    </SyntaxHighlighter>
);

export default Code;