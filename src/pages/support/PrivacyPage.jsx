import React, { useState, useEffect } from "react";

function PrivacyPage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 300); // 스크롤이 300px 이상이면 버튼 보이기
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤 업
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 리스너 추가
    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트 unmount 시 리스너 제거
    };
  }, []);

  const getArticle = (index) => {
    const articles = [
      {
        title: "개인정보의 처리목적",
        content: `
        <p className="text-sm">회사는 다음 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제 18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
        <table class="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="border border-gray-300 px-4 py-2">구분</th>
              <th class="border border-gray-300 px-4 py-2">수집항목</th>
              <th class="border border-gray-300 px-4 py-2">수집 및 이용 목적</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2" rowSpan="2">회원 서비스 제공 및 관리 필수 수집 항목</td>
              <td class="border border-gray-300 px-4 py-2">성명, 생년월일, 성별, 본인인증정보(CI, DI), 아이핀 번호(아이핀 본인 인증일 경우), 아이디, 비밀번호, 휴대폰번호, 이메일</td>
              <td class="border border-gray-300 px-4 py-2">
                -메가박스 상품 구매에 대한 결제 및 예매 확인</br>
                -회원 서비스 이용에 따른 본인 식별 및 실명 여부, 중복 가입 여부 확인</br>
                -멤버십 서비스 제공 및 이벤트 시 활용</br>
                -공지사항 전달, 문의 또는 불만 처리 등을 위한 원활한 의사소통 경로의 확보</br>
                -드림센터 운영</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">만 14세 미만 법정대리인의 이름, 휴대폰번호, CI</td>
              <td class="border border-gray-300 px-4 py-2">-만 14세 미만 아동의 고객 가입을 위한 법정대리인 동의 여부 확인</td>
            </tr>
          </tbody>
        </table>
      `,
      },
      {
        title: "개인정보의 처리 및 보유 기간",
        content: `<p>회사는 법령에 따른 개인정보 보유 및 이용기간 내에서 개인정보를 처리 · 보유합니다.</p>
        <ol>
          <li>
            1.서비스 이용을 위한 필수 수집 항목 : 탈퇴 시까지 보유
            <ol>
              <li>다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지 보유
                <ol>
                  <li>비회원 수집 항목
                    <ol>
                      <li>관람 또는 취소 후 7일까지 보유</li>
                      <li>고객센터 문의, 제휴/광고/부대사업 문의, 온라인제보 센터 이용 시 문의 접수 완료 후 3년까지 보유</li>
                    </ol>
                  </li>
                  <li>무분별한 회원 탈퇴와 재가입으로 인한 피해 최소화, 고객 탈퇴 후 변심에 의한 민원 등을 처리하기 위해 고객 탈퇴 후 30일 간 최소한의 고객 정보 보유 (탈퇴 즉시 최소한의 정보만 분리 보관, 30일 보유 후 지체 없이 파기)</li>
                  <li>관계 법령 위반에 따른 수사 · 조사 등이 진행 중인 경우에는 해당 수사 · 조사 종료 시까지</li>
                  <li>홈페이지 이용에 따른 채권 · 채무 관계 잔존 시에는 해당 채권 · 채무 관계 정산 시까지</li>
                </ol>
              </li>
            </ol>
          </li>
          <li>2.선택 수집 항목 : 수집 동의 받을 때 명시한 기간까지 보유 후 파기</li>
          <li> 재화 또는 서비스 제공 : 재화, 서비스 공급 완료 및 요금 결제, 정산 완료 시 까지
          다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지
          １) 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시 · 광고, 계약 내용 및 이행 등 거래에 관한 기록
          - 게시한 이용자의 본인 확인에 관한 기록 : 6개월
          - 계약 또는 청약 철회, 대금 결제, 재화 등의 공급 기록 : 5년
          - 소비자 불만 또는 분쟁 처리에 관한 기록 : 3년 </br>
          ２) 「통신비밀보호법」 시행령 제 41조에 따른 통신 사실 확인 자료 보관
          - 웹페이지 방문 및 로그인에 관한 기록 : 3개월
          </li>
          <li>4.스템커피 가맹 상담 수집 항목 : 수집 동의 받을 때 명시한 기간까지 보유 후 파기</li>
        </ol> `,
      },
      {
        title: "개인정보의 제 3자 제공",
        content: `<p>회사는 정보주체의 개인정보를 이용 약관 및 제 1조에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제 17조에 해당하는 경우에만 개인정보를 제 3자에게 제공합니다.</p>`,
      },
      {
        title: "개인정보 처리의 위탁",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
      {
        title: "정보주체의 권리, 의무 및 행사 방법",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
      {
        title: "개인정보의 파기 절차 및 방법",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
      {
        title: "개인정보의 안전성 확보조치",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
      {
        title:
          "개인정보 및 행태정보 자동 수집 장치의 설치 · 운영 및 거부에 관한 사항",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
      {
        title: "개인정보 국외이전",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
      {
        title: "개인정보 보호책임자",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
      {
        title: "개인정보 열람청구",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
      {
        title: "권익침해 구제방법",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
      {
        title: "고정형 영상정보처리기기 설치",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
      {
        title: "개인위치정보의 처리",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
      {
        title: "개인정보 처리방침 변경",
        content: `<p>회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>`,
      },
    ];

    return articles[index - 1] || { title: "", content: " " };
  };

  return (
    <>
      <div className="mx-auto px-8 py-6">
        <div className="mb-6 ml-6 border-b border-gray-300 pb-4">
          <h1 className="mb-6 text-2xl font-semibold">개인정보처리방침</h1>
          <p className="size- mb-3 mt-1 text-sm font-light">
            부띠끄시네마(주)(이하 '회사')는 개인정보보호법에 따라 이용자의
            개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을
            원활하게 처리할 수 있도록 <br />
            다음과 같은 개인정보 처리방침을 두고 있습니다. 회사는 개인정보
            처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여
            공지할 것입니다.
          </p>
          <p className="mb-6 mt-1 text-sm font-bold text-teal-200">
            본 방침은 2024년 07월 22일부터 시행됩니다.
          </p>
          <p className="mt-1 text-sm">
            항목을 선택하시면 해당 내용으로 이동합니다.
          </p>
        </div>

        <nav className="relative mb-6 ml-6 flex gap-4">
          <div className="flex w-1/2 flex-col gap-2">
            {/* 제 1조부터 제 10조까지 */}
            {Array.from({ length: 10 }, (_, index) => (
              <button
                key={`article${index + 1}`}
                onClick={() =>
                  document
                    .getElementById(`article${index + 1}`)
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="w-full text-left text-sm hover:text-teal-200 focus:text-teal-200 focus:underline"
              >
                <span className="font-bold">제 {index + 1}조.</span>{" "}
                {getArticle(index + 1).title}
              </button>
            ))}
          </div>

          <div className="flex w-1/2 flex-col gap-2">
            {/* 제 11조부터 제 15조까지 */}
            {Array.from({ length: 5 }, (_, index) => (
              <button
                key={`article${index + 11}`}
                onClick={() =>
                  document
                    .getElementById(`article${index + 11}`)
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="w-full text-left text-sm hover:text-teal-200 focus:text-teal-200 focus:underline"
              >
                <span className="font-bold">제 {index + 11}조.</span>{" "}
                {getArticle(index + 11).title}
              </button>
            ))}
          </div>
        </nav>

        <section className="m-5 mb-12 max-h-screen overflow-auto border border-gray-300 bg-gray-200 p-6 shadow-sm">
          {Array.from({ length: 15 }, (_, index) => {
            // 배열의 길이에 맞게 수정
            const article = getArticle(index + 1);
            return (
              <div
                key={`article${index + 1}`}
                id={`article${index + 1}`}
                className="mb-4"
              >
                <h2 className="mb-2 text-sm font-semibold text-gray-800">
                  {article.title}
                </h2>
                <div
                  className="text-xs leading-relaxed text-gray-700"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            );
          })}
        </section>

        {isVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-12 right-40 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white shadow-lg transition"
            style={{ fontSize: "12px" }}
          >
            <span>top↑</span>
          </button>
        )}
      </div>
    </>
  );
}

export default PrivacyPage;
