const convertToKRDate = (isoDate: string) => {
  const [yymmdd, time] = isoDate.split("T");
  const [year, month, day] = yymmdd.split("-");
  return `${year}년 ${month}월 ${day}일`;
};

export { convertToKRDate };
