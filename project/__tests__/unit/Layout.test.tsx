import React from 'react';
import Footer from "@/components/Layout/Footer/Footer";
import Header from "@/components/Layout/Header/Header";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Layout 컴포넌트', () => {
  test('Header 컴포넌트', () => {
    const {container} = render(<Header />);
    
    expect(container).toHaveTextContent('kmin');
    expect(container).toHaveTextContent('Blog');
  });
  test('Footer 컴포넌트', () => {
    const {getByText, getAllByRole} = render(<Footer />);
    const links = getAllByRole('link');
    const github = links[0];
    
    expect(github).toHaveAttribute('href', "https://github.com/kmin-283");
    
    const blog = getByText('Blog');
    expect(blog).toHaveAttribute('href', '/');
  });
});