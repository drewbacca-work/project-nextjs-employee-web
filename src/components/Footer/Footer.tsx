"use client";

import FooterContainer from "./FooterContainer";
import { i18n } from "../../../i18n-config";
import Link from "next/link";
import { commonStore } from "@/stores/common.store";
import { headerStore } from "@/stores/header.store";

const { locales } = i18n;
function Footer({ locale }: { locale: string }) {
  const setLocale = commonStore((state: any) => state.setLocale);
  const pathName = headerStore((state: any) => state.pathName);
  return (
    <FooterContainer locale={locale}>
      <div dir="ltr" className="flex justify-center mx-1">
        {[...locales].sort().map((lang) => (
          <Link
            key={lang}
            className="p-1"
            href={`/${lang}/${pathName}`}
            onClick={() => {
              setLocale(lang);
            }}
          >
            {lang}
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        {/* eslint-disable-next-line */}
        <img src="/img/next.svg" width={60} height={12} alt="NextJS " />
      </div>
    </FooterContainer>
  );
}

export default Footer;
