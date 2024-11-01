import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/review.css";
import { updateReview } from "../../api/reservationApi";
import ImageDetect from "../python/ImageDetect";

export default function MyReviewWrite() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { reservation } = state;
  const [rating, setRating] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const maxLength = 100; // 리뷰 내용의 최대 글자 수 제한

  // 리뷰 수정시 들고 올 데이터
  useEffect(() => {
    if (reservation.reviewContent) {
      setRating(reservation.reviewRating / 2);
      setReviewContent(reservation.reviewContent);
      setCanSubmit(true);
    }
  }, [reservation]);

  // 리뷰 내용 변경 핸들러
  const handleReviewChange = (e) => {
    setReviewContent(e.target.value);
  };

  // 리뷰 등록 핸들러
  const handleSubmit = async (e, condition) => {
    e.preventDefault();

    if (condition === "delete") {
      const isConfirmed = window.confirm("정말 관람평을 삭제하시겠습니까?");

      if (!isConfirmed) {
        return;
      }

      await updateReview(reservation.rnum, {
        reviewRating: null,
        reviewContent: null,
      });

      alert(`관람평이 삭제되었습니다.`);
      navigate("/mypage/review");
      return;
    }

    if (!canSubmit) {
      alert("영화티켓 인증 후 관람평을 등록할 수 있습니다.");
      return;
    }

    if (reviewContent.trim() === "") {
      alert("관람평을 작성해야 합니다.");
      return;
    }

    if (reviewContent.length > maxLength) {
      alert(`리뷰는 최대 ${maxLength}글자까지 작성 가능합니다.`);
      return;
    }

    await updateReview(reservation.rnum, {
      reviewRating: rating * 2,
      reviewContent,
    });

    alert(`관람평이 ${reservation.reviewContent ? "수정" : "등록"}되었습니다.`);
    navigate("/mypage/review");
  };

  // 이미지 검증 결과를 상태에 반영
  const handleDetectClass = (isValid) => {
    setCanSubmit(isValid);
  };

  return (
    <div className="ml-10">
      <h2 className="mb-4 text-2xl font-medium">
        {reservation.reviewContent ? "관람평 수정" : "관람평 등록"}
      </h2>
      <div className="rounded border border-gray-400 p-5">
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            {/* 예매번호 */}
            <div className="mb-4 flex items-center justify-center gap-5">
              <label className="text-lg">예매 번호</label>
              <div>{reservation.rnum}</div>
            </div>

            {/* 영화 제목 표시 */}
            <div className="mb-4 flex items-center justify-center gap-5">
              <label className="text-lg">영화 제목</label>
              <div className="mt-2 flex items-center text-lg">
                {reservation.movie.rating === "전체" ? (
                  <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-green-600 text-sm font-medium text-white">
                    All
                  </div>
                ) : reservation.movie.rating === "12" ? (
                  <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-yellow-500 text-sm font-medium text-white">
                    12
                  </div>
                ) : reservation.movie.rating === "15" ? (
                  <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-orange-600 text-sm font-medium text-white">
                    15
                  </div>
                ) : (
                  <div className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-red-600 text-sm font-medium text-white">
                    19
                  </div>
                )}
                {reservation.movie.korTitle}({reservation.movie.enTitle})
              </div>
            </div>

            {/* 별점 선택 */}
            <div className="mb-4 flex items-center justify-center gap-5">
              <label className="text-lg">평점</label>
              <div className="mt-2 flex gap-3">
                <div>
                  <Rate
                    allowClear={false}
                    allowHalf
                    defaultValue={
                      reservation.reviewContent
                        ? reservation.reviewRating / 2
                        : 5
                    }
                    className="text-2xl"
                    onChange={setRating}
                  />
                </div>
                <div className="text-lg leading-8">{rating * 2}</div>
              </div>
            </div>
          </div>

          {/* 영화 포스터 */}
          <div className="h-full w-[110px]">
            {reservation.movie.posterUrl && (
              <img
                src={`http://localhost:8080/api/admin/movie/view/${reservation.movie.posterUrl}`}
                alt={`${reservation.movie.korTitle} 포스터 이미지`}
                className="h-full w-full rounded"
              />
            )}
          </div>
        </div>

        {/* ImageDetect 컴포넌트 */}
        {!reservation.reviewContent && (
          <ImageDetect onDetectClass={handleDetectClass} />
        )}

        {/* 내용 입력 */}
        <div className="relative mb-4">
          <label className="text-lg" htmlFor="reviewContent">
            내용 (최대 {maxLength}글자)
          </label>
          <textarea
            id="reviewContent"
            value={reviewContent}
            onChange={handleReviewChange}
            maxLength={maxLength}
            rows={4}
            className="mt-3 w-full resize-none rounded border p-2 text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="관람평을 작성해주세요."
          />
          <div className="absolute bottom-2 right-2 text-right text-gray-500">
            {reviewContent.length}/{maxLength}
          </div>
        </div>

        {/* 등록/수정/삭제 버튼 */}
        <div className="flex justify-end">
          <div className="flex gap-2">
            <button
              onClick={(e) => handleSubmit(e, "update")}
              className="rounded bg-secondary px-4 py-2 text-white hover:bg-secondary"
            >
              {reservation.reviewContent ? "관람평 수정" : "관람평 등록"}
            </button>
            {reservation.reviewContent ? (
              <button
                onClick={(e) => handleSubmit(e, "delete")}
                className="rounded bg-tertiary px-4 py-2 text-white hover:bg-tertiary-hover"
              >
                관람평 삭제
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
