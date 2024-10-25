import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  createReservation,
  deleteReservationByRnum,
} from "../../api/reservationApi";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "2BWntIsYHxJIwrZAEKM8T";

export function TossPayModal({ reserveData, rnum, amount }) {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  const loginState = useSelector((state) => state.loginSlice);

  const tossAmount = useMemo(
    () => ({
      currency: "KRW",
      value: amount,
    }),
    [amount],
  );

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      });

      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(tossAmount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets, tossAmount]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount(tossAmount);
  }, [widgets, tossAmount]);

  return (
    <div className="h-fit w-[540px] bg-white pb-1">
      <div className="">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* 결제하기 버튼 */}
        <div className="m-6 mt-2">
          <button
            className="w-full rounded bg-[#3282f6] py-3 text-[#f9fcff]"
            disabled={!ready}
            onClick={async () => {
              try {
                await createReservation(reserveData);

                // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                await widgets?.requestPayment({
                  orderId: rnum,
                  orderName: "BoutiqueCinema 영화 예매",
                  successUrl:
                    window.location.origin +
                    "/reserve/success" +
                    window.location.search,
                  failUrl:
                    window.location.origin +
                    "/reserve/fail" +
                    window.location.search,
                  customerEmail: loginState.email,
                  customerName: loginState.name,
                  customerMobilePhone: loginState.phone,
                });
              } catch (error) {
                // 에러 처리하기
                await deleteReservationByRnum(rnum);

                console.error(error);
                alert("결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
