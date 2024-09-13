package egovframework.com.cmm;

public enum ResponseCode {

	SUCCESS(200, "성공했습니다."),
	AUTH_ERROR(403, "인가된 사용자가 아닙니다."),
	DELETE_ERROR(700, "삭제 중 내부 오류가 발생했습니다."),
	SAVE_ERROR(800, "저장시 내부 오류가 발생했습니다."),
	INPUT_CHECK_ERROR(900, "입력값 무결성 오류 입니다."),

	//김평권 추가 
	INPUT_CHECK_INSERT_EMPTY(981, "textarea이나 첨부파일을 입력하세요."),
	INPUT_CHECK_LIST_EMPTY(982, "선택된 체크가 없습니다. 다시 체크하세요."),
	INPUT_CHECK_DOUBLE(991, "이미 등록된 email 입니다."),
	INPUT_CHECK_NOT_EMPTY(992, "필수 입력을 체크하세요."),
	INPUT_CHECK_PASSWORD(993, "패스워드 확인값이 다릅니다."),
	INPUT_CHECK_ENG_BIG_SMALL_LEN_8_12(994, "패스워드에 영문 대소문자, 숫자 특수문자를 포함하세요.길이는 8에서 12까지 입니다."),
	INPUT_CHECK_EMPTY(995, "등록된 email이 아닙니다."),
	INPUT_CHECK_NEW_OLD_PASSWORD(996, "현재비번과 새비번이 같습니다."),
	INPUT_CHECK_NOW_PASSWORD(997, "현재 비밀번호가 다릅니다.");


	private int code;
	private String message;

	private ResponseCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

	public int getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}




}
