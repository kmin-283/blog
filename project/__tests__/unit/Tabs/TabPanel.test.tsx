import React from 'react';
import TabPanel from "@/components/Tabs/TabPanel/TabPanel";
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('TabPanel 컴포넌트', () => {
  afterAll(cleanup);
  
  test('labelledBy를 가져야한다', () => {
    const {container} = render(<TabPanel labelledBy="published">
      <p>게시된 글 내용입니다</p>
    </TabPanel>);
    expect(container).toHaveTextContent('게시된 글 내용입니다');
  });
});