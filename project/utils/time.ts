const convertToKRDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`;
};

export {convertToKRDate};
