package egovframework.com.cmm;

import java.io.Serializable;

import egovframework.let.cop.bbs.service.Board;

/**
 * @Class Name : LoginVO.java
 * @Description : Login VO class
 * @Modification Information
 * @
 * @  수정일         수정자                   수정내용
 * @ -------    --------    ---------------------------
 * @ 2009.03.03    박지욱          최초 생성
 *
 *  @author 공통서비스 개발팀 박지욱
 *  @since 2009.03.03
 *  @version 1.0
 *  @see
 *  
 */
public class LoginVO extends Board implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8274004534207618049L;
	
	/** 아이디 */
	private String id;
	/** 이름 */
	private String name;
	/** 주민등록번호(=전화번호) */
	private String ihidNum;
	/** 승인여부 */
	private String replyPosblAt;
	/** 이메일주소 */
	private String email;
	/** 비밀번호 */
	private String password;
	/** 비밀번호 힌트 */
	private String passwordHint;
	/** 비밀번호 정답 */
	private String passwordCnsr;
	/** 사용자구분 */
	private String userSe;
	/** 조직(부서)ID */
	private String orgnztId;
	/** 조직(부서)명 */
	private String orgnztNm;
	/** 고유아이디 */
	private String uniqId;
	/** 로그인 후 이동할 페이지 */
	private String url;
	/** 사용자 IP정보 */
	private String ip;
	/** GPKI인증 DN */
	private String dn;
	
	//LoginVO에서 갖고온 항목 start
	/** 현재페이지 */
	private int pageIndex = 1;

	/** 페이지갯수 */
	private int pageUnit = 10;

	/** 페이지사이즈 */
	private int pageSize = 10;

	/** 첫페이지 인덱스 */
	private int firstIndex = 1;

	/** 마지막페이지 인덱스 */
	private int lastIndex = 1;

	/** 페이지당 레코드 개수 */
	private int recordCountPerPage = 10;

	/** 검색조건 */
	private String searchCnd = "";

	/** 검색종료일 */
	private String searchEndDe = "";

	/** 검색단어 */
	private String searchWrd = "";

	/** 조회 수 증가 여부 */
	private boolean plusCount = false;

	//---------------------------------
	// 2009.06.29 : 2단계 기능 추가
	//---------------------------------
	/** 하위 페이지 인덱스 (댓글 및 만족도 조사 여부 확인용) */
	private String subPageIndex = "";
	////-------------------------------


	/**
	 * pageIndex attribute를 리턴한다.
	 *
	 * @return the pageIndex
	 */
	public int getPageIndex() {
		return pageIndex;
	}

	/**
	 * pageIndex attribute 값을 설정한다.
	 *
	 * @param pageIndex
	 *            the pageIndex to set
	 */
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	/**
	 * pageUnit attribute를 리턴한다.
	 *
	 * @return the pageUnit
	 */
	public int getPageUnit() {
		return pageUnit;
	}

	/**
	 * pageUnit attribute 값을 설정한다.
	 *
	 * @param pageUnit
	 *            the pageUnit to set
	 */
	public void setPageUnit(int pageUnit) {
		this.pageUnit = pageUnit;
	}

	/**
	 * pageSize attribute를 리턴한다.
	 *
	 * @return the pageSize
	 */
	public int getPageSize() {
		return pageSize;
	}

	/**
	 * pageSize attribute 값을 설정한다.
	 *
	 * @param pageSize
	 *            the pageSize to set
	 */
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * firstIndex attribute를 리턴한다.
	 *
	 * @return the firstIndex
	 */
	public int getFirstIndex() {
		return firstIndex;
	}

	/**
	 * firstIndex attribute 값을 설정한다.
	 *
	 * @param firstIndex
	 *            the firstIndex to set
	 */
	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	/**
	 * lastIndex attribute를 리턴한다.
	 *
	 * @return the lastIndex
	 */
	public int getLastIndex() {
		return lastIndex;
	}

	/**
	 * lastIndex attribute 값을 설정한다.
	 *
	 * @param lastIndex
	 *            the lastIndex to set
	 */
	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	/**
	 * recordCountPerPage attribute를 리턴한다.
	 *
	 * @return the recordCountPerPage
	 */
	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	/**
	 * recordCountPerPage attribute 값을 설정한다.
	 *
	 * @param recordCountPerPage
	 *            the recordCountPerPage to set
	 */
	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	/**
	 * searchCnd attribute를 리턴한다.
	 *
	 * @return the searchCnd
	 */
	public String getSearchCnd() {
		return searchCnd;
	}

	/**
	 * searchCnd attribute 값을 설정한다.
	 *
	 * @param searchCnd
	 *            the searchCnd to set
	 */
	public void setSearchCnd(String searchCnd) {
		this.searchCnd = searchCnd;
	}

	/**
	 * searchEndDe attribute를 리턴한다.
	 *
	 * @return the searchEndDe
	 */
	public String getSearchEndDe() {
		return searchEndDe;
	}

	/**
	 * searchEndDe attribute 값을 설정한다.
	 *
	 * @param searchEndDe
	 *            the searchEndDe to set
	 */
	public void setSearchEndDe(String searchEndDe) {
		this.searchEndDe = searchEndDe;
	}

	/**
	 * searchWrd attribute를 리턴한다.
	 *
	 * @return the searchWrd
	 */
	public String getSearchWrd() {
		return searchWrd;
	}

	/**
	 * searchWrd attribute 값을 설정한다.
	 *
	 * @param searchWrd
	 *            the searchWrd to set
	 */
	public void setSearchWrd(String searchWrd) {
		this.searchWrd = searchWrd;
	}

	/**
	 * plusCount attribute를 리턴한다.
	 * @return the plusCount
	 */
	public boolean isPlusCount() {
		return plusCount;
	}

	/**
	 * plusCount attribute 값을 설정한다.
	 * @param plusCount the plusCount to set
	 */
	public void setPlusCount(boolean plusCount) {
		this.plusCount = plusCount;
	}

	/**
	 * subPageIndex attribute를 리턴한다.
	 * @return the subPageIndex
	 */
	public String getSubPageIndex() {
		return subPageIndex;
	}



	//LoginVO에서 갖고온 항목 end

	/**
	 * id attribute 를 리턴한다.
	 * @return String
	 */
	public String getId() {
		return id;
	}
	/**
	 * id attribute 값을 설정한다.
	 * @param id String
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * name attribute 를 리턴한다.
	 * @return String
	 */
	public String getName() {
		return name;
	}
	/**
	 * name attribute 값을 설정한다.
	 * @param name String
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * ihidNum attribute 를 리턴한다.
	 * @return String
	 */
	public String getIhidNum() {
		return ihidNum;
	}
	/**
	 * ihidNum attribute 값을 설정한다.
	 * @param ihidNum String
	 */
	public void setIhidNum(String ihidNum) {
		this.ihidNum = ihidNum;
	}
	/**
	 * replyPosblAt attribute 를 리턴한다.
	 * @return String
	 */
	public String getReplyPosblAt() {
		return replyPosblAt;
	}
	/**
	 * replyPosblAt attribute 값을 설정한다.
	 * @param replyPosblAt String
	 */
	public void setReplyPosblAt(String replyPosblAt) {
		this.replyPosblAt = replyPosblAt;
	}

	/**
	 * email attribute 를 리턴한다.
	 * @return String
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * email attribute 값을 설정한다.
	 * @param email String
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * password attribute 를 리턴한다.
	 * @return String
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * password attribute 값을 설정한다.
	 * @param password String
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * passwordHint attribute 를 리턴한다.
	 * @return String
	 */
	public String getPasswordHint() {
		return passwordHint;
	}
	/**
	 * passwordHint attribute 값을 설정한다.
	 * @param passwordHint String
	 */
	public void setPasswordHint(String passwordHint) {
		this.passwordHint = passwordHint;
	}
	/**
	 * passwordCnsr attribute 를 리턴한다.
	 * @return String
	 */
	public String getPasswordCnsr() {
		return passwordCnsr;
	}
	/**
	 * passwordCnsr attribute 값을 설정한다.
	 * @param passwordCnsr String
	 */
	public void setPasswordCnsr(String passwordCnsr) {
		this.passwordCnsr = passwordCnsr;
	}
	/**
	 * userSe attribute 를 리턴한다.
	 * @return String
	 */
	public String getUserSe() {
		return userSe;
	}
	/**
	 * userSe attribute 값을 설정한다.
	 * @param userSe String
	 */
	public void setUserSe(String userSe) {
		this.userSe = userSe;
	}
	/**
	 * orgnztId attribute 를 리턴한다.
	 * @return String
	 */
	public String getOrgnztId() {
		return orgnztId;
	}
	/**
	 * orgnztId attribute 값을 설정한다.
	 * @param orgnztId String
	 */
	public void setOrgnztId(String orgnztId) {
		this.orgnztId = orgnztId;
	}
	/**
	 * uniqId attribute 를 리턴한다.
	 * @return String
	 */
	public String getUniqId() {
		return uniqId;
	}
	/**
	 * uniqId attribute 값을 설정한다.
	 * @param uniqId String
	 */
	public void setUniqId(String uniqId) {
		this.uniqId = uniqId;
	}
	/**
	 * url attribute 를 리턴한다.
	 * @return String
	 */
	public String getUrl() {
		return url;
	}
	/**
	 * url attribute 값을 설정한다.
	 * @param url String
	 */
	public void setUrl(String url) {
		this.url = url;
	}
	/**
	 * ip attribute 를 리턴한다.
	 * @return String
	 */
	public String getIp() {
		return ip;
	}
	/**
	 * ip attribute 값을 설정한다.
	 * @param ip String
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}
	/**
	 * dn attribute 를 리턴한다.
	 * @return String
	 */
	public String getDn() {
		return dn;
	}
	/**
	 * dn attribute 값을 설정한다.
	 * @param dn String
	 */
	public void setDn(String dn) {
		this.dn = dn;
	}
	/**
	 * @return the orgnztNm
	 */
	public String getOrgnztNm() {
		return orgnztNm;
	}
	/**
	 * @param orgnztNm the orgnztNm to set
	 */
	public void setOrgnztNm(String orgnztNm) {
		this.orgnztNm = orgnztNm;
	}
	
}
