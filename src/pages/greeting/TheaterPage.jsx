import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react"; // react에서 useEffect와 useState를 가져옴

const TheaterPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 300);
    console.log(`Scroll Y: ${scrollY}`);
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("Scrolling to top...");
  };

  // useEffect로 스크롤 이벤트를 설정합니다.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Cleanup 함수로 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="mt-5 flex justify-center text-center text-2xl font-semibold text-gray-100">
        상영관 소개
      </div>
      <div className="mt-10 justify-center">
        <section className="mb-24 mt-16 flex rounded-md border-white px-0 py-0 text-center font-bold text-white">
          <Link
            to={"/greeting/theater"}
            className="flex-1 text-inherit no-underline"
          >
            <button className="h-[calc(100%+0.5rem)] w-full border-l-2 border-r-2 border-t-2 transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black hover:shadow-lg">
              일반관
            </button>
          </Link>
          <Link
            to={"/greeting/couple"}
            className="flex-1 text-inherit no-underline"
          >
            <button className="h-[calc(100%+0.5rem)] w-full border-b-2 py-4 transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black hover:shadow-lg">
              커플관
            </button>
          </Link>
        </section>

        <div className="mb-14 mt-3 text-center">
          <h1 className="mb-24 text-3xl font-bold text-white">
            THE BOUTIQUE THEATER
          </h1>
          <h1 className="mt-1 text-base text-gray-100">
            당신을 위해 특별히 준비한 다양한 타입의 여유 공간을 통해서 편안한
            관람 환경을 제공합니다.
          </h1>
        </div>
        <ul className="flex scale-90 justify-center space-x-20 text-center text-xs text-black">
          <ol className="">
            <img className="" src="/greeting/bgTableChair.png" alt="chair1" />
            <li className="text-lg text-cyan-600">Front Table</li>
            <li className="mb-10 text-gray-300">
              두 손을 자유롭게 하는
              <br /> 프론트 테이블
            </li>
          </ol>
          <ol>
            <img className="" src="/greeting/bgArmChair.png" alt="chair2" />
            <li className="text-lg text-cyan-600">Double Arm Chair</li>
            <li className="text-gray-300">
              팔걸이에 대한 논쟁을 <br />
              종식시키는 양팔걸이 좌석
            </li>
          </ol>
          <ol>
            <img className="" src="/greeting/bgSideChair.png" alt="chair3" />
            <li className="text-lg text-cyan-600">Side Table</li>
            <li className="text-gray-300">
              쾌적한 영화관람을 위해
              <br /> 나만의 테이블
            </li>
          </ol>
          <ol>
            <img className="" src="/greeting/bgWideChair.png" alt="chair4" />
            <li className="text-lg text-cyan-600">Wide Seat</li>
            <li className="text-gray-300">
              감각적인 디자인에
              <br /> 안락함을 더한 와이드 시트
            </li>
          </ol>
        </ul>

        <section className="m-0 mb-20 grid grid-cols-2 gap-2 p-0">
          <div className="col-span-2 mx-10 p-4">
            <img
              className="mb-20 mt-16 h-96 w-full rounded-2xl"
              src="/greeting/basic.png"
              alt="basic1"
            />
          </div>
          <div className="mx-10 mb-0 mt-0 flex">
            {" "}
            {/* mb-20에서 mb-0으로 변경 */}
            <img
              className="h-64 w-full rounded-2xl pl-4"
              src="/greeting/imgTheaterComfortView02.png"
              alt="basic2"
            />
            <img
              className="h-64 w-full rounded-2xl"
              style={{ marginLeft: "8.5rem" }} // 인라인 스타일로 조정
              src="/greeting/imgTheaterComfortView03.png"
              alt="basic3"
            />
          </div>
          <h1 className="col-span-2 ml-14 mt-4 text-sm text-teal-600">
            ※ 상영관의 상세 사양은 조금 다를 수 있습니다.
          </h1>
        </section>
      </div>
      {isVisible && (
        <button
          onClick={ScrollToTop}
          className="fixed bottom-12 right-80 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white shadow-lg transition"
          style={{ fontSize: "12px" }}
        >
          <span>top↑</span>
        </button>
      )}
    </>
  );
};

export default TheaterPage;
