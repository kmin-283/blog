import React from 'react';
import TabPanel from "@/components/Tabs/TabPanel/TabPanel";
import {render, cleanup, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('TabPanel 컴포넌트', () => {
  afterAll(cleanup);
  
  test('isHidden이 아닌 경우 보여야 한다', () => {
    const {container} = render(
      <div>
        <TabPanel tabId="published" isHidden={false}>
          <p>게시된 글 내용입니다</p>
        </TabPanel>
      </div>);

    expect(container).toBeInTheDocument();
  });

  test('isHidden인 경우 보이지 말아야 한다', () => {
    render(
      <div>
        <TabPanel tabId="drafted" isHidden={true}>
          <p>임시 저장 글 내용입니다</p>
        </TabPanel>
      </div>);

    expect(screen.queryByRole('div')).not.toBeInTheDocument();
  });
});