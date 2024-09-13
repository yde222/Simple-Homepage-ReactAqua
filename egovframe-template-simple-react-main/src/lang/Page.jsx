import { FormattedMessage } from "react-intl";
import Form from "./Form";

function Page() {
  return (
    <main>
      <h1>
        <FormattedMessage id="title" />
      </h1>
      <p>
        <FormattedMessage
          id="info"
          defaultMessage="메시지를 찾을 수 없습니다. (locale: {locale})"
          values={{ locale: localStorage.getItem("locale") }}
        />
      </p>
      <Form />
    </main>
  );
}

export default Page;