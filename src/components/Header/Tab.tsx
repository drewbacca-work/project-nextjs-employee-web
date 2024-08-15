"use client";

import { HEADER_TABS_INDEX } from "@/constants/common.constant";
import { headerStore } from "@/stores/header.store";
import { useRouter } from "next/navigation";

export default function Tab({
  locale,
  index,
  value,
}: {
  locale: string;
  index: number;
  value: string;
}) {
  const router = useRouter();
  const currentIndex = headerStore((state: any) => state.currentIndex);
  const setCurrentIndex = headerStore((state: any) => state.setCurrentIndex);
  const setPathName = headerStore((state: any) => state.setPathName);

  function onClickHeaderTab(index: number) {
    let pushPath = `${locale}/add`;

    switch (index) {
      case HEADER_TABS_INDEX.EDIT: {
        pushPath = `${locale}/edit`;
        setCurrentIndex(1);
        setPathName("/edit");
        break;
      }
      case HEADER_TABS_INDEX.VIEW: {
        pushPath = `${locale}/view`;
        setCurrentIndex(2);
        setPathName("/view");
        break;
      }
      default: {
        setCurrentIndex(0);
        setPathName("/add");
      }
    }

    router.push(pushPath);
  }

  return (
    <div
      className={`flex justify-evenly w-full py-2 cursor-pointer ${
        currentIndex === index ? "bg-color-focus" : "bg-color-inactive"
      }`}
      onClick={() => onClickHeaderTab(index)}
    >
      <div className="px-8 " key={index}>
        {value}
      </div>
    </div>
  );
}
