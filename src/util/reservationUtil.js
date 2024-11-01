export const adultPrice = 14000;
export const teenPrice = 12000;
export const specialPrice = 7000;

export function calculateTotalPrice(adultCount, teenCount, specialCount) {
  const totalPrice =
    adultCount * adultPrice +
    teenCount * teenPrice +
    specialCount * specialPrice;

  const formattedPrice = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalPrice);

  return formattedPrice;
}

export const generateReservationNumber = (movieNum, theaterNum, roundNum) => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`; // YYYYMMDD 형식
  const randomNum = Math.floor(Math.random() * 10000); // 0~9999 사이의 랜덤 숫자
  return `${formattedDate}${movieNum}${theaterNum}${roundNum}${randomNum}`; // 예: 202310171561234
};

export const convertRoundNumToRoundTime = (reserveRoundNum, movie) => {
  switch (reserveRoundNum) {
    case 1:
      return movie.roundTime1;

    case 2:
      return movie.roundTime2;

    case 3:
      return movie.roundTime3;

    case 4:
      return movie.roundTime4;

    case 5:
      return movie.roundTime5;

    default:
      console.error("잘못된 번호입니다.");
  }
};
