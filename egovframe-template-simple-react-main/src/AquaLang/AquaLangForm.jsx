import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation } from "react-router-dom"; // 경로 확인을 위해 추가

import enUsMsg from "../AquaLang/EgovHeader_en-us.json";
import koMsg from "../AquaLang/EgovHeader_ko.json";

function Form() {
  const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko"); // 기본값 한국어
  const messages = { "en-US": enUsMsg, ko: koMsg }[locale];
  const intl = useIntl();
  const location = useLocation();
    console.log("------------------------------Form location ",  location.pathname);

 // 특정 경로에서만 버튼 비활성화 (예시: /inform/gallery/detail 또는 /inform/gallery/modify)
 // 물고기인 경우,,,/admin/noticeEst/detail 또는 /admin/noticeEst/modify
  const isDisabled = location.pathname === "/inform/gallery/detail" || location.pathname === "/inform/gallery/modify"
                  || location.pathname === "/admin/noticeEst/detail" || location.pathname === "/admin/noticeEst/modify";

  return (
    <form onSubmit={() => localStorage.setItem("locale", locale)}>
      <label htmlFor="locale">
        <FormattedMessage
          id="label"
          defaultMessage="Language (default message)"
        />
      </label>
      <select
        id="locale"
        value={locale}
        onChange={({ target: { value } }) => setLocale(value)}
        disabled={isDisabled} // 경로에 따라 선택 박스 비활성화
      >
        <option value="ko">ko</option>
        <option value="en-US">en-US</option>
      </select>

      <button
        aria-label={intl.formatMessage({
          id: "button",
          defaultMessage: "Save"
        })}
        disabled={isDisabled} // 경로에 따라 버튼 비활성화
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-save"
        >
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
      </button>
    </form>
  );
}

export default Form;
