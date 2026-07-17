"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";

interface Position {
  title: string;
  type: string;
  salary: string;
  hours: string;
  stockOption: boolean;
  description: string;
}

export function PositionCard({ position, img }: { position: Position; img: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col border border-line bg-white">
      <img src={img} alt="" className="aspect-[4/3] w-full object-cover" />

      <div className="flex flex-1 flex-col px-4 py-4">
        <p className="text-[0.7rem] text-muted">{position.type}</p>
        <h3 className="mt-1.5 text-[0.88rem] font-bold leading-5 text-[#333333]">
          {position.title}
        </h3>
        <dl className="mt-3 grid grid-cols-[4.5rem_1fr] gap-y-1 text-[0.72rem]">
          <dt className="text-muted">雇用形態</dt>
          <dd className="text-[#333333]">{position.type}</dd>
          <dt className="text-muted">勤務地</dt>
          <dd className="text-[#333333]">フルリモート</dd>
        </dl>
      </div>

      {open && (
        <div
          className="border-t border-line bg-white px-4 py-4"
          style={{ animation: "expand-down 0.22s ease" }}
        >
          <dl className="grid grid-cols-[4.5rem_1fr] gap-y-2 text-[0.75rem]">
            <dt className="text-muted">給与</dt>
            <dd className="text-[#333333]">{position.salary}</dd>
            <dt className="text-muted">勤務時間</dt>
            <dd className="text-[#333333]">{position.hours}</dd>
            <dt className="text-muted">ストック</dt>
            <dd className="text-[#333333]">ストックオプションあり</dd>
          </dl>
          <Link
            href="/contact"
            className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-primary px-2 py-1.5 text-[0.78rem] font-bold tracking-wide text-white transition-opacity hover:opacity-85"
          >
            応募する
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center justify-between bg-ink px-4 py-3 text-[0.75rem] tracking-wide text-white transition-colors hover:bg-primary"
      >
        詳細を確認する
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
