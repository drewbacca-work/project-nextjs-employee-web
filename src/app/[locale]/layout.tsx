import { getIntl } from "@/lib/intl";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./globals.css";

type LayoutProps = {
  params: { locale: string };
  children: React.ReactNode;
};

export default async function RootLayout({ params, children }: LayoutProps) {
  const { locale } = params;

  const intl = await getIntl(locale);

  return (
    <html lang={locale}>
      <body className="h-screen">
        <Header locale={locale} intl={intl} />
        <div className="h-4/5 bg-color-focus p-8">{children}</div>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
