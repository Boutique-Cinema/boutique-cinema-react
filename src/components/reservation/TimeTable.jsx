import React, { useState } from "react";
import TimeTableItem from "./TimeTableItem";

// 탭 버튼에 해당하는 콘텐츠
const tabs = [{ title: "일반관" }, { title: "커플관" }];

export default function TimeTable({ date, movies, selectedMovie }) {
  const [activeTab, setActiveTab] = useState(0);

  // 선택한 영화(상영관만 다른 같은 영화 배열) 필터링
  const selectedMovies = movies.filter(
    (movie) => movie.korTitle === selectedMovie,
  );

  return (
    <div className="h-full">
      {/* 상영관(일반관, 커플관) 탭 */}
      <div className="flex w-full">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`w-1/2 rounded-t py-4 text-lg ${activeTab === index ? "border-2 border-b-0 bg-gray-500" : "border-b-2 bg-gray-400 text-gray-100"}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="h-[600px] rounded-b border-t-0 bg-gray-500">
        {/* 상영시간표 목록 컴포넌트 */}
        <TimeTableItem
          date={date}
          selectedMovies={selectedMovies}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}
