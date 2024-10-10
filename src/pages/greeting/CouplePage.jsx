import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react"; // react에서 useEffect와 useState를 가져옴

const CouplePage = () => {
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
            <button className="h-[calc(100%+0.5rem)] w-full border-b-2 border-r-0 transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black hover:shadow-lg">
              일반관
            </button>
          </Link>
          <Link
            to={"/greeting/couple"}
            className="flex-1 text-inherit no-underline"
          >
            <button className="h-[calc(100%+0.5rem)] w-full border-l-2 border-r-2 border-t-2 py-4 transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black hover:shadow-lg">
              커플관
            </button>
          </Link>
        </section>

        <div className="mt-4 text-center">
          <h1 className="mb-28 text-3xl font-bold text-white">
            THE BOUTIQUE COUPLE
          </h1>
        </div>
        <section className="grid grid-cols-2 gap-4 p-4">
          <div className="text-3xl text-gray-300">
            Romantic
            <br /> <span className="text-6xl">Moment</span>
            <br />
            <span className="text-3xl text-gray-300">
              눈치보지 않고
              <span className="mb-4 ml-2 mt-4 inline-block font-bold text-white">
                둘만의 오붓한 시간
              </span>
            </span>
            <br />
            <span className="text-base text-gray-300">
              영화를 보는 내내 계속되는 둘만의 오붓한 시간,
              <br /> 부티크씨네마에서 경험하세요.
            </span>
          </div>
          <img
            className="ml-4 rounded-2xl"
            src="/greeting/couple.jpg"
            alt="Couple"
          />
        </section>
        <section className="mt-24 flex justify-between text-gray-300">
          <div className="flex flex-1">
            <div className="mt-16 flex h-80 w-full">
              <div className="flex flex-1 justify-start pr-2">
                <img
                  className="h-full w-auto rounded-2xl object-cover"
                  src="/greeting/goldclass_10.jpg"
                  alt="Couple2"
                />
              </div>
              <div className="flex flex-1 justify-start pr-32">
                <img
                  className="h-full w-auto rounded-2xl object-cover"
                  src="/greeting/goldclass_11.jpg"
                  alt="Couple3"
                />
              </div>
            </div>
          </div>
          <div className="ml-4 flex flex-col justify-center text-left text-6xl font-medium">
            <span className="text-3xl text-gray-300">Recliner</span>
            Chair
            <br />
            <span className="ml-1 mt-6 text-xl font-light">
              최상의 안락함을 주는 리클라이너 좌석 <br />
            </span>
          </div>
        </section>

        <h1 className="mb-16 mt-5 text-sm text-teal-600">
          ※ 상영관의 상세 사양은 조금 다를 수 있습니다.
        </h1>
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

export default CouplePage;
