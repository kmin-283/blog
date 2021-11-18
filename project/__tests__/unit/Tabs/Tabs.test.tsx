import React from 'react';
import Tabs from '@/components/Tabs/Tabs';
import Tab from '@/components/Tabs/Tab/Tab';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import TabPanel from "@/components/Tabs/TabPanel/TabPanel";
import TabList from "@/components/Tabs/TabList/TabList";
import '@testing-library/jest-dom/extend-expect';

describe('Tabs 컴포넌트', () => {
  afterAll(cleanup);
  
  describe('Tab 테스트', () => {
    afterAll(cleanup);
    test('활성화 된 Tab은 "active"클래스를 갖는다', () => {
      const {getAllByRole} = render(<Tabs tabIds={['published', 'drafted']}>
        <TabList>
          <Tab>게시된 글</Tab>
          <Tab>임시 저장 글</Tab>
        </TabList>
        <TabPanel>
          <p>게시된 글 입니다</p>
        </TabPanel>
        <TabPanel>
          <p>임시 저장 글 입니다</p>
        </TabPanel>
      </Tabs>);
      
      const tabs = getAllByRole('tab');
      
      expect(tabs[0]).toHaveClass('active');
      expect(tabs[0]).toHaveTextContent('게시된 글');
      expect(tabs[1]).not.toHaveClass('active');
      expect(tabs[1]).toHaveTextContent('임시 저장 글');
    });
    
    test('Tab 클릭시 "active"클래스가 클릭한 요소로 변한다', () => {
      const {getAllByRole} = render(<Tabs tabIds={['published', 'drafted']}>
        <TabList>
          <Tab>게시된 글</Tab>
          <Tab>임시 저장 글</Tab>
        </TabList>
        <TabPanel>
          <p>게시된 글 입니다</p>
        </TabPanel>
        <TabPanel>
          <p>임시 저장 글 입니다</p>
        </TabPanel>
      </Tabs>);
      
      const tabs = getAllByRole('tab');
      
      expect(tabs[0]).toHaveClass('active');
      expect(tabs[0]).toHaveTextContent('게시된 글');
      expect(tabs[1]).not.toHaveClass('active');
      expect(tabs[1]).toHaveTextContent('임시 저장 글');
      
      fireEvent.click(tabs[1]);
      expect(tabs[0]).not.toHaveClass('active');
      expect(tabs[1]).toHaveClass('active');
    });
  });
  
  
  describe('TabList 테스트', () => {
    afterAll(cleanup);
    
    test('TabList를 가져야 한다', () => {
      const {getAllByRole, getByRole} = render(<Tabs tabIds={['published', 'drafted']}>
        <TabList>
          <Tab>게시된 글</Tab>
          <Tab>임시 저장 글</Tab>
        </TabList>
        <TabPanel>
          <p>게시된 글 입니다</p>
        </TabPanel>
        <TabPanel>
          <p>임시 저장 글 입니다</p>
        </TabPanel>
      </Tabs>);
  
      const tabList = getByRole('tablist');
      const tabs = getAllByRole('tab');
      expect(tabList).toBeInTheDocument();
      expect(tabs).toHaveLength(2);
    });
  });
  
  describe('TabPanel 테스트', () => {
    afterAll(cleanup);
    test('tabPanel을 가져야 한다', () => {
      const {getAllByRole} = render(
        <Tabs tabIds={['published', 'drafted', 'tested']}>
          <TabList>
            <Tab>게시된 글</Tab>
            <Tab>임시 저장 글</Tab>
            <Tab>테스트 글</Tab>
          </TabList>
          <TabPanel>
            <ul>
              <li>테스트 글 1</li>
              <li>테스트 글 2</li>
              <li>테스트 글 3</li>
            </ul>
          </TabPanel>
          <TabPanel>
            <p>임시 저장 글 입니다</p>
          </TabPanel>
          <TabPanel>
            <p>테스트 글 입니다</p>
          </TabPanel>
        </Tabs>);
    
      // isHidden=true인 tabPanel은 보이지 않으므로 길이는 1이 된다.
      const tabPanels = getAllByRole('tabpanel');
      
      expect(tabPanels).toHaveLength(1);
      expect(tabPanels[0]).toBeInTheDocument();
    });
  
    test('선택된 Tab의 TabPanel이 보여야한다', () => {
      const {getAllByRole} = render(
        <Tabs tabIds={['published', 'drafted', 'tested']}>
          <TabList>
            <Tab>게시된 글</Tab>
            <Tab>임시 저장 글</Tab>
            <Tab>테스트 글</Tab>
          </TabList>
          <TabPanel>
            <ul>
              <li>테스트 글 1</li>
              <li>테스트 글 2</li>
              <li>테스트 글 3</li>
            </ul>
          </TabPanel>
          <TabPanel>
            <p>임시 저장 글 입니다</p>
          </TabPanel>
          <TabPanel>
            <p>테스트 글 입니다</p>
          </TabPanel>
        </Tabs>);
    
      // isHidden=true인 tabPanel은 보이지 않으므로 길이는 1이 된다.
      const tabPanels = getAllByRole('tabpanel');
      
      expect(tabPanels[0]).not.toHaveAttribute('hidden');
    });
  
    test('선택되지 않은 Tab의 TabPanel은 보이지 않는다', () => {
      render(
        <Tabs tabIds={['published', 'drafted', 'tested']}>
          <TabList>
            <Tab>게시된 글</Tab>
            <Tab>임시 저장 글</Tab>
            <Tab>테스트 글</Tab>
          </TabList>
          <TabPanel>
            <ul>
              <li>테스트 글 1</li>
              <li>테스트 글 2</li>
              <li>테스트 글 3</li>
            </ul>
          </TabPanel>
          <TabPanel>
            <p>임시 저장 글 입니다</p>
          </TabPanel>
          <TabPanel>
            <p>테스트 글 입니다</p>
          </TabPanel>
        </Tabs>);
      
      expect(screen.queryByText('<p>테스트 글 입니다</p>')).not.toBeInTheDocument();
    });
  });
});