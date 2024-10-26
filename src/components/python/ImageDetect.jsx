import React, { useState } from "react";
import axios from "axios";

export default function ImageDetect({ onDetectClass }) {
  const [resultImage, setResultImage] = useState("");
  const [classNames, setClassNames] = useState([]);

  // 이미지 객체 탐지 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/java_service",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // 결과 이미지와 클래스 이름을 상태에 저장
      setResultImage(response.data.image);
      setClassNames(response.data.class_names);

      // "movie ticket" 클래스가 있는지 확인하고 상위 컴포넌트로 전달
      const hasMovieTicket = response.data.class_names.includes("movie ticket");
      onDetectClass(hasMovieTicket);
    } catch (error) {
      console.error("이미지를 불러오는데 실패했습니다.", error);
      alert("이미지를 불러오는데 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="mb-4">
      <label className="mr-3 text-lg">영화티켓 인증</label>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        required
      />

      {resultImage && (
        <div>
          <img
            src={`data:image/jpeg;base64,${resultImage}`}
            alt="분석한 이미지"
            className="m-2 h-[300px] w-[300px] object-contain"
          />
        </div>
      )}
    </div>
  );
}
