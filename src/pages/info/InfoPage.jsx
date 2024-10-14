import React, { useEffect, useRef } from "react";

const InfoPage = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <style>{`
        .section-hidden {
          opacity: 0;
          transform: translateY(100px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .section-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section.left {
          animation: slideInLeft 0.6s forwards; /* 왼쪽에서 나타나는 애니메이션 */
        }

        .section.right {
          animation: slideInRight 0.6s forwards; /* 오른쪽에서 나타나는 애니메이션 */
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-500px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <header className="mb-10 bg-gray-800">
        <div className="relative mx-auto max-w-screen-2xl bg-gray-800">
          <img
            src="/greeting/basic.png"
            className="h-auto w-full opacity-80"
            alt="Boutique Cinema"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mb-auto text-center text-3xl font-bold text-white">
              BoutiqueCinema 소개
              <div className="text text-xs font-normal">
                새로운 이야기를 만나고, 함께 어울려 놀고, 즐거운 경험을 공유하는
                순간
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="section-container">
        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          className="section section-hidden left p-4"
        >
          <div className="mb-20 flex flex-col">
            <h2 className="mb-6 text-2xl font-bold">개성 있는 브랜드 이미지</h2>
            <p className="max-w-5xl">
              <ol>
                <span className="text-violet-600">"Boutique"</span>라는 용어는
                독특하고 맞춤형 서비스를 제공하는 상점을 의미하며,
              </ol>
              <ol>
                이는 영화관이 제공하는 특별한 관람 경험, 즉 대형 체인과는 다른,
                개인화된 서비스와 고유한 분위기를 강조합니다.
              </ol>
            </p>
          </div>
        </section>

        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="section section-hidden right p-4"
        >
          <div className="mb-20 flex flex-col">
            <h2 className="mb-6 text-2xl font-bold">개인화된 경험</h2>
            <p className="max-w-5xl">
              <ol>
                <span className="text-violet-600">"Boutique Cinema"</span>는
                관람객들에게 개인의 취향에 맞춘 섬세한 서비스와 독특한 영화 관람
                경험을 선사합니다.
              </ol>
              각 상영관은 특별히 디자인되어, 관객들이 편안하게 영화를 감상할 수
              있는 최적의 환경을 제공합니다.
              <ol>
                아늑한 좌석, 최첨단 음향 시스템, 그리고 감각적인 인테리어가
                어우러져 마치 영화 속 주인공이 된 듯한 몰입감을 선사합니다.
                또한, 맞춤형 간식과 음료 서비스로 관람의 즐거움을 더욱
                배가시킵니다.
              </ol>
            </p>
          </div>
        </section>
      </div>

      <div className="horizontal-container mb-32 flex flex-wrap">
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="section section-hidden left w-1/2 transform p-6 shadow-lg"
        >
          <div className="flex flex-col pb-6">
            <h2 className="mb-4 text-3xl font-bold text-gray-100">
              유행에 민감한 Company
            </h2>
            <p className="max-w-5xl text-gray-100">
              <ol>
                <span className="font-semibold text-violet-600">"Trandy"</span>
                함을 추구하며, 최신 트렌드와 스타일을 반영하는 영화와 서비스를
                제공합니다.
              </ol>
            </p>
          </div>
        </section>

        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="section section-hidden right w-1/2 transform p-6 shadow-lg"
        >
          <div className="flex flex-col">
            <h2 className="mb-4 text-3xl font-bold text-gray-100">
              차별화된 가치
            </h2>
            <p className="max-w-5xl text-gray-100">
              <ol>
                <span className="font-semibold text-violet-600">
                  "uniqueness"
                </span>
                를 추구하며, 단순한 영화를 넘어, 각 관객이 소중한 순간을 만끽할
                수 있도록 돕는 것입니다.
              </ol>
              맞춤형 좌석 배치와 개인화된 상영 리스트는 물론, 아늑한 분위기와
              함께 제공되는 특별한 간식과 음료는 관람의 즐거움을 더욱 풍부하게
              만듭니다.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default InfoPage;
