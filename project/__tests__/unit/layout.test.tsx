import React from 'react';
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('layout 컴포넌트', () => {
  test('header 컴포넌트', () => {
    const {container} = render(<Header />);
    
    expect(container).toHaveTextContent('kmin');
    expect(container).toHaveTextContent('Blog');
  });
  test('footer 컴포넌트', () => {
    const {getByText, getAllByRole} = render(<Footer />);
    const links = getAllByRole('link');
    const github = links[0];
    
    expect(github).toHaveAttribute('href', "https://github.com/kmin-283");
    
    const blog = getByText('Blog');
    expect(blog).toHaveAttribute('href', '/');
  });
});