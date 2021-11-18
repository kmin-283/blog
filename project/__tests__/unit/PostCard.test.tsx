import React from 'react';
import PostCard from "@/components/PostCard/PostCard";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {IPost} from "@/models/post";

describe('postcard 컴포넌트', () => {
  
  const post: IPost = {
    _id: '1',
    title: '테스트 포스트 입니다',
    tags: ['test1', 'test2'],
    file: '/__mocks__/fileMock.js',
    thumbnail: '/__mocks__/thumbnailMock.js',
    description: 'postcard 컴포넌트 테스트',
    updatedAt: new Date('1995-12-17T03:24:00Z'),
  };
  
  test('title, thumbnail, description, time 정보가 있어야 한다', () => {
    const {getByRole, getByText} = render(<PostCard post={post} />);
    
    const link = getByRole('link');
    expect(link).toBeInTheDocument();
    
    const thumbnail = getByRole('img');
    expect(thumbnail).toBeInTheDocument();
    
    const title = getByText('테스트 포스트 입니다');
    expect(title).toBeInTheDocument();
    
    const description = getByText('postcard 컴포넌트 테스트');
    expect(description).toBeInTheDocument();
    
    const time = getByText('1995년 12월 17일');
    expect(time).toBeInTheDocument();
  });
});