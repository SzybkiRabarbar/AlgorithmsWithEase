import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Nav from '../Nav';

const urls = [
  '/',
  '/groups',
  '/map',
  '/info',
  'https://github.com/SzybkiRabarbar/AlgorithmsWithEase',
];

describe('Nav', () => {
  it('should toggle visibility when burger icon is clicked', () => {
    const { getByTestId, getByAltText } = render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    const navElement = getByAltText('≡');
    const pre = 'div';

    urls.forEach(url_ => {
      const divLinkElement = getByTestId(pre + url_);

      expect(divLinkElement).toHaveClass('hidden');
      fireEvent.click(navElement);

      expect(divLinkElement).toHaveClass('visible');
      fireEvent.click(navElement);
    });
  });

  it('should have correct link elements', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
    
    const pre = 'link';

    urls.forEach(url_ => {
      const linkElement = getByTestId(pre + url_);
      expect(linkElement).toBeInTheDocument();

      fireEvent.click(linkElement);

      waitFor(() => {
        expect(window.location.href).toBe(url_);
      });
    });
  });
});
