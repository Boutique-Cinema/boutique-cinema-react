export function getDateFormatted(date) {
  const year = date.getFullYear(); // 연도 (4자리)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (1~12), 2자리로 포맷
  const day = String(date.getDate()).padStart(2, "0"); // 일 (1~31), 2자리로 포맷

  return `${year}-${month}-${day}`; // 'yyyy-MM-dd' 형식으로 조합
}

export function addMinutesToTime(startTime, runTime) {
  // 시작 시간을 "09:00" 형식으로 받음
  const [hours, minutes] = startTime.split(":").map(Number);

  // 새로운 Date 객체 생성
  let date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  // 상영 시간을 더함
  date.setMinutes(date.getMinutes() + runTime);

  // 종료 시간 문자열 형식으로 변환 (HH:MM 형식)
  const endHours = String(date.getHours()).padStart(2, "0");
  const endMinutes = String(date.getMinutes()).padStart(2, "0");

  return `${startTime} ~ ${endHours}:${endMinutes}`;
}
