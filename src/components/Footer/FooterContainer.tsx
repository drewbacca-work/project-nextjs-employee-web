import React from "react";
import { IntlProvider } from "react-intl";

// async function getMessages(locale: string) {
//   return await import(`../../../public/locales/${locale}.json`);
// }

type FooterContainerProps = {
  locale: string;
  children: React.ReactNode;
};

function FooterContainer({ locale, children }: FooterContainerProps) {
  // const messages = await getMessages(locale);

  return (
    <IntlProvider locale={locale}>
      <div className="absolute bottom-0 left-0 right-0 pb-4 h-[0.5/5]">
        {children}
      </div>
    </IntlProvider>
  );
}

export default FooterContainer;
