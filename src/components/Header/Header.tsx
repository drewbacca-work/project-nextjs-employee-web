import { HEADER_TABS } from "@/constants/common.constant";
import { IAppState } from "@/interfaces/common.interface";
import Tab from "./Tab";

async function Header(props: IAppState) {
  const { intl, locale } = props;

  return (
    <header>
      <div className="flex items-center justify-center flex-col h-[0.5/5]">
        <h1 className="font-bold text-4xl py-4">
          {intl.formatMessage({ id: "app.title" })}
        </h1>
        <div className="flex justify-evenly w-full">
          {[...HEADER_TABS].sort().map((headerTab) => (
            <Tab
              key={headerTab.index}
              locale={locale}
              index={headerTab.index}
              value={intl.formatMessage({ id: headerTab.title })}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
