import React, {useState} from 'react';
import { Story, Meta } from '@storybook/react';
import Tags from '@/components/Tags/Tags';

export default {
  title: 'Components/Tags',
  component: Tags,
} as Meta;

const Template: Story = () => {
  const [tags, setTags] = useState<string[]>(
    ['#1', '##2', '###3','####4','#####5','######6','#######7','########8','#########9','##########10']
  );
  const deleteTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };
  
  return (
    <div style={{width: 200}}>
      <Tags tags={tags} howMany={10} onClickHandler={deleteTag}/>
    </div>);
};

export const BasicTags = Template.bind({});
BasicTags.args = {};