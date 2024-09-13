//update git test
// https://www.daleseo.com/react-intl/
//test3
//test4
import { IntlProvider } from "react-intl";
import enUsMsg from "../../../lang/en-US.json";
import koMsg from "../../../lang/ko.json";
//import zhMsg from "./lang/zh.json";
import Page from "../../../lang/Page";

const locale = localStorage.getItem("locale") ?? "ko";
//const messages = { "en-US": enUsMsg, ko: koMsg, zh: zhMsg }[locale];
const messages = { "en-US": enUsMsg, ko: koMsg }[locale];

function App() {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <Page />
    </IntlProvider>
  );
}

export default App;