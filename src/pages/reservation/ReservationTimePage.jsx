import React from "react";
import TimeTable from "../../components/reservation/TimeTable";

export default function ReservationTimePage() {
  return (
    <div className="mb-[100px] h-[70vh]">
      <h2 className="mb-5 text-2xl">예매</h2>
      <div className="flex h-full">
        <div className="w-1/3">
          <div className="h-1/2 bg-red-100">
            <TimeTable />
          </div>
          <div className="h-1/2 bg-yellow-200">1</div>
        </div>
        <div className="w-2/3 bg-teal-200">1</div>
      </div>
    </div>
  );
}
