const convertToKRDate = (isoDate: string) => {
  const [yymmdd, time] = isoDate.split("T");
  const [year, month, day] = yymmdd.split("-");
  const [hour, minutes] = time.slice(0, 5).split(":");
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minutes}분`;
};

export { convertToKRDate };
