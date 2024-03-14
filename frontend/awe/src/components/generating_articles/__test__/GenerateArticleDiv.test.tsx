import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import GenereteArticleDiv from '../GenerateArticleDiv';
import { ArticleContentItemInferface } from '../../../interfaces/ArticleContentInterface';

describe('GenereteArticleDiv', () => {
  it('renders the correct component for each type', () => {
    const articleContentItems: Array<[string, ArticleContentItemInferface]> = [
      ['0', { text: 'Test text' }],
      ['1', { src: 'Test src', alt: 'Test alt' }],
      ['2', { url: 'Test url' }],
      ['3', { url: 'Test url' }],
      ['4', { note: 'Test note' }],
    ];

    articleContentItems.forEach(([type, content], index: number) => {
      const { getByText, getByAltText, getByTestId } = render(<GenereteArticleDiv obj={[type, content]} index={index} />);

      switch (type) {

        case '0':
          if(content.text) {
            expect(getByText(content.text)).toBeInTheDocument();
          } else {
            expect(false).toBe(true);
          }
          break;

        case '1':
          if(content.alt && content.src) {
            const img = getByAltText(content.alt);
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute('src', content.src);
          } else {
            expect(false).toBe(true);
          }
          break;

        case '2':
          if(content.url) {
            expect(getByTestId(content.url)).toBeInTheDocument();
          } else {
            expect(false).toBe(true);
          }
          break;

        case '3':
          // TODO: Add assertion for code
          break;

        case '4':
          if(content.note) {
            expect(getByText(content.note)).toBeInTheDocument();
          } else {
            expect(false).toBe(true);
          }
          break;

        default:
          break;
      }
    });
  });
});