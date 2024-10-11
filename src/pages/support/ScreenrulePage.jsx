import React, { useState } from "react";

function ScreenrulePage() {
  return (
    <div className="mx-auto flex items-center">
      <div className="px-8 py-6 text-sm">
        <div className="border-gray-300 pb-2">
          <h1 className="mb-4 text-2xl font-semibold">
            스크린 수 배정에 관한 기준
          </h1>
        </div>

        <nav className="mt-14">
          <div className="mb-4 text-xl font-bold">
            <span className="mr-2 text-2xl font-normal italic text-teal-500">
              01.
            </span>
            영화정보
          </div>

          <div className="mb-4 flex justify-between border-b-2">
            <div className="w-1/2 pr-4">
              <ul className="list-disc pl-5">
                <li className="mb-4">
                  영화
                  <p>
                    작품성과 오락성, 배우, 스토리, 장르, 제작비, 감독과 작가
                  </p>
                </li>
                <li>
                  배급
                  <p>배급규모, 경쟁상황, 배급사, 관객기대치</p>
                </li>
              </ul>
            </div>

            <div className="w-1/2 pl-4">
              <ul className="list-disc pl-5">
                <li className="mb-4">
                  마케팅
                  <p>
                    메인 타겟, 예고편, 홍보 규모(P&A), 극장 내 광고, 시사회,
                    무대인사
                  </p>
                </li>
                <li className="mb-4">
                  예매율
                  <p>사전 예매오픈한 영화일 경우 예매기간 대비 예매량 확인</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-4 flex justify-between border-b-2">
            <div className="w-1/2 pr-4">
              <div className="mb-4 text-xl font-bold">
                <span className="mr-2 text-2xl font-normal italic text-teal-500">
                  02.
                </span>
                경쟁상황 및 사전 고객 반응 확인
              </div>
              <ul className="mb-4 ml-6 list-disc">
                <li>차주 상영 예정작 영화 정보 취합</li>
                <li>TV, 라디오, 인터넷(네이버, 다음), SNS 등 검색</li>
                <li>극장 내 고객 설문조사 자료 확인</li>
                <li>배급 시사 후 관계자 반응 및 언론 반응</li>
              </ul>
            </div>

            <div className="w-1/2 pl-4">
              <div className="mb-4 text-xl font-bold">
                <span className="mr-2 text-2xl font-normal italic text-teal-500">
                  03.
                </span>
                프로그램 배정 (각 극장)
              </div>
              <ul className="mb-4 ml-6 list-disc">
                <li>각 영화관 주변 상관 파악, 우리 영화관 주요 고객 파악</li>
                <li>극장 PDP, 예고편 편성표 확인</li>
                <li>
                  사전시사(회원시사, 유료시사, 영사테스트) 후 관람자 반응 파악
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="w-1/2 pr-4">
              <div className="mb-4 text-xl font-bold">
                <span className="mr-2 text-2xl font-normal italic text-teal-500">
                  04.
                </span>
                배정 미팅
              </div>
              <ul className="mb-4 ml-6 list-disc">
                <li>
                  영화별 시사 후기 확인 및 개별 의견 정리, 관련 블로그, 관계자
                  자료 취합
                </li>
                <li>지난주 상영관 배정 반성 & 차주 예상 의견</li>
                <li>개봉작과 현재 상영작에 대한 분위기 및 스크린 배정 확정</li>
              </ul>
            </div>

            <div className="mb-64 w-1/2 pl-4">
              <div className="mb-4 text-xl font-bold">
                <span className="mr-2 text-2xl font-normal italic text-teal-500">
                  05.
                </span>
                프로그램 개봉 후
              </div>
              <ul className="mb-4 ml-6 list-disc">
                <li>영화별 개봉 스코어 및 좌점율 확인</li>
                <li>현장 고객 반응 확인</li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default ScreenrulePage;
