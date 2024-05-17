const formatDateString = (dateString: string): string => {
  // 입력된 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 년, 월, 일을 두 자리 숫자로 포맷
  const year = date.getFullYear().toString().slice(-2); // 마지막 두 자리만 추출
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 1월은 0이므로 +1
  const day = ('0' + date.getDate()).slice(-2);

  // 원하는 형식으로 변환
  return `${year}.${month}.${day}`;
};
export default formatDateString;
