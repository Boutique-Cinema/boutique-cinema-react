import React from "react";

const InfoPage = () => {
  return (
    <>
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

      <section
        id="company-overview"
        className="mb-10 h-[400px] w-full transform bg-[rgba(214,209,202,0.03)] shadow-lg shadow-gray-500/50 transition-transform duration-300 hover:scale-105"
      >
        <div className="mx-auto flex w-full flex-col items-center">
          <ul className="mb-10 mt-10 text-left">
            <li className="mb-10 text-3xl font-bold">
              1. 개성 있는 브랜드 이미지
            </li>
            <li className="mb-4 max-w-5xl text-2xl">
              <ol>
                <span className="text-violet-600">"Boutique"</span>라는 용어는
                독특하고 맞춤형 서비스를 제공하는 상점을 의미하며,
              </ol>
              <ol>
                이는 영화관이 제공하는 특별한 관람 경험,즉 대형 체인과는 다른,
                개인화된 서비스와 고유한 분위기를 강조합니다.
              </ol>
            </li>
          </ul>
        </div>
      </section>

      <section
        id="company-overview"
        className="mb-10 h-[400px] w-full transform bg-[rgba(214,209,202,0.03)] shadow-lg shadow-gray-500/50 transition-transform duration-300 hover:scale-105"
      >
        <div className="mx-auto flex w-full flex-col items-center">
          <ul className="mb-10 mt-10 text-left">
            <li className="mb-10 text-3xl font-bold">2. 개인화된 경험</li>
            <li className="mb-4 max-w-5xl text-2xl">
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
            </li>
          </ul>
        </div>
      </section>

      <section
        id="company-overview"
        className="mb-10 h-[400px] w-full transform bg-[rgba(214,209,202,0.03)] shadow-lg shadow-gray-500/50 transition-transform duration-300 hover:scale-105"
      >
        <div className="mx-auto flex w-full flex-col items-center">
          <ul className="mt-10 text-left">
            <li className="mb-10 text-3xl font-bold">
              3. 유행에 민감한 Company
            </li>
            <li className="mb-10 max-w-5xl text-2xl">
              <ol>
                <span className="text-violet-600">"Trandy"</span>함을 추구하며,
                최신 트렌드와 스타일을 반영하는 영화와 서비스를 제공합니다.
              </ol>
              <ol>
                이는 영화관이 제공하는 특별한 관람 경험,즉 대형 체인과는 다른,
                개인화된 서비스와 고유한 분위기를 강조합니다.
              </ol>
            </li>
          </ul>
        </div>
      </section>

      <section
        id="company-overview"
        className="mb-20 h-[400px] w-full transform bg-[rgba(214,209,202,0.03)] shadow-lg shadow-gray-500/50 transition-transform duration-300 hover:scale-105"
      >
        <div className="mx-auto flex w-full flex-col items-center">
          <ul className="mb-10 mt-10 text-left">
            <li className="mb-10 text-3xl font-bold">4. 차별화된 가치</li>
            <li className="mb-4 max-w-5xl text-2xl">
              <ol>
                <span className="text-violet-600">"uniqueness"</span>를
                추구하며, 단순한 영화를 넘어, 각 관객이 소중한 순간을 만끽할 수
                있도록 돕는 것입니다.
              </ol>
              맞춤형 좌석 배치와 개인화된 상영 리스트는 물론, 아늑한 분위기와
              함께 제공되는 특별한 간식과 음료는 관람의 즐거움을 더욱 풍부하게
              만듭니다
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default InfoPage;
