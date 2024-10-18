import React, { useEffect, useState } from "react"; // react에서 useEffect와 useState를 가져옴

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 300);
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      {isVisible && (
        <button
          onClick={ScrollToTop}
          className="fixed bottom-10 right-[320px] z-50 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-secondary text-white transition"
          style={{ fontSize: "12px" }}
        >
          <div>↑</div>
          <div>TOP</div>
        </button>
      )}
    </>
  );
};

export default ScrollTop;
