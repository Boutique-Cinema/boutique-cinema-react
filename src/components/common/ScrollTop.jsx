import React, { useEffect, useState } from "react"; // react에서 useEffect와 useState를 가져옴

const ScrollTopButton = () => {
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

export default ScrollTopButton;
