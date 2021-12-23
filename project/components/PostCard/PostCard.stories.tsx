import React from "react";
import { Story, Meta } from "@storybook/react";
import PostCard from "@/components/PostCard/PostCard";
import { PostCardProps } from "@/components/PostCard/PostCard";

export default {
  title: "Components/PostCard",
  component: PostCard,
} as Meta;

const Template: Story<PostCardProps> = ({ post }) => {
  return <PostCard post={post} />;
};

export const BasicPostCard = Template.bind({});
BasicPostCard.args = {
  post: {
    _id: "1",
    title: "테스트 포스트 입니다",
    tags: ["test1", "test2"],
    file: "/__mocks__/fileMock.js",
    thumbnail: "/__mocks__/thumbnailMock.js",
    description: "postcard 컴포넌트 테스트",
    updatedAt: new Date("1995-12-17T03:24:00Z"),
    createdAt: new Date("1995-12-17T03:24:00Z"),
  },
};

export const LongTitlePostCard = Template.bind({});
LongTitlePostCard.args = {
  post: {
    _id: "1",
    title: "최적의 타이틀은 공백 포함 최대 32자 입니다ㅋㅋㅋㅋㅋㅋㅋ",
    tags: ["test1", "test2"],
    file: "/__mocks__/fileMock.js",
    thumbnail: "/__mocks__/thumbnailMock.js",
    description: "postcard 컴포넌트 테스트",
    updatedAt: new Date("1995-12-17T03:24:00Z"),
    createdAt: new Date("1995-12-17T03:24:00Z"),
  },
};

export const LongDescriptionPostCard = Template.bind({});
LongDescriptionPostCard.args = {
  post: {
    _id: "1",
    title: "최적의 타이틀은 공백 포함 최대 32자 입니다ㅋㅋㅋㅋㅋㅋㅋ",
    tags: ["test1", "test2"],
    file: "/__mocks__/fileMock.js",
    thumbnail: "/__mocks__/thumbnailMock.js",
    description:
      "이 포스트에 대한 설명은 길어야 합니다." +
      "왜냐하면 지정된 영역을 벗어났을 때 스타일링이 어떻게 구성되는지 확인하기 위함이죠" +
      "여기 포스트는 더 보이지 않을겁니다.",
    updatedAt: new Date("1995-12-17T03:24:00Z"),
    createdAt: new Date("1995-12-17T03:24:00Z"),
  },
};
