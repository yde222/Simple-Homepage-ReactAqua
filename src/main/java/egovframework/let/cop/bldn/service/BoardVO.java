package egovframework.let.cop.bldn.service;

import java.io.Serializable;

import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * 게시물 관리를 위한 VO 클래스
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009.03.19
 * @version 1.0
 * @see
 * test
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2009.03.19  이삼섭          최초 생성
 *  2009.06.29  한성곤		   2단계 기능 추가 (댓글관리, 만족도조사)
 *  2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *  </pre>
 */
public class BoardVO extends Board implements Serializable {

	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -3779821913760046011L;

	
	//에러이유정보
	private String errReason;


	public String getErrReason() {
		return errReason;
	}

	public void setErrReason(String errReason) {
		this.errReason = errReason;
	}

	//체크정보
	private String checkedList;


	public String getCheckedList() {
		return checkedList;
	}

	public void setCheckedList(String checkedList) {
		this.checkedList = checkedList;
	}


/****************************************/	
	private String lastUpdusrId = "";


	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}


	/** 검색시작일 */
	private String searchBgnDe = "";

	/** 검색조건 */
	private String searchCnd = "";

	/** 검색종료일 */
	private String searchEndDe = "";

	/** 검색단어 */
	private String searchWrd = "";

	/** 정렬순서(DESC,ASC) */
	private long sortOrdr = 0L;

	/** 검색사용여부 */
	private String searchUseYn = "";

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

	/** 레코드 번호 */
	private int rowNo = 0;

	/** 최초 등록자명 */
	private String frstRegisterNm = "";

	/** 최종 수정자명 */
	private String lastUpdusrNm = "";

	/** 유효여부 */
	private String isExpired = "N";

	/** 상위 정렬 순서 */
	private String parntsSortOrdr = "";

	/** 상위 답변 위치 */
	private String parntsReplyLc = "";

	/** 게시판 유형코드 */
	//private String bbsTyCode = "";

	/** 게시판 속성코드 */
	private String bbsAttrbCode = "";

	/** 게시판 명 */
	private String bbsNm = "";

	/** 파일첨부가능여부 */
	private String fileAtchPosblAt = "";

	/** 첨부가능파일숫자 */
	private int posblAtchFileNumber = 0;

	/** 답장가능여부 */
	private String replyPosblAt = "";

	/** 조회 수 증가 여부 */
	private boolean plusCount = false;

	// 총개수
	private String staCnt = "";
	//발급완료 개수
	private String finCnt = "";
	//파싱완료 개수
	private String pasCnt = "";
	//오류 개수
	private String errCnt = "";
	
	

	//---------------------------------
	// 2009.06.29 : 2단계 기능 추가
	//---------------------------------
	/** 하위 페이지 인덱스 (댓글 및 만족도 조사 여부 확인용) */
	private String subPageIndex = "";
	////-------------------------------

	/**
	 * searchBgnDe attribute를 리턴한다.
	 *
	 * @return the searchBgnDe
	 */
	public String getSearchBgnDe() {
		return searchBgnDe;
	}

	/**
	 * searchBgnDe attribute 값을 설정한다.
	 *
	 * @param searchBgnDe
	 *            the searchBgnDe to set
	 */
	public void setSearchBgnDe(String searchBgnDe) {
		this.searchBgnDe = searchBgnDe;
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
	 * sortOrdr attribute를 리턴한다.
	 *
	 * @return the sortOrdr
	 */
	@Override
	public long getSortOrdr() {
		return sortOrdr;
	}

	/**
	 * sortOrdr attribute 값을 설정한다.
	 *
	 * @param sortOrdr
	 *            the sortOrdr to set
	 */
	@Override
	public void setSortOrdr(long sortOrdr) {
		this.sortOrdr = sortOrdr;
	}

	/**
	 * searchUseYn attribute를 리턴한다.
	 *
	 * @return the searchUseYn
	 */
	public String getSearchUseYn() {
		return searchUseYn;
	}

	/**
	 * searchUseYn attribute 값을 설정한다.
	 *
	 * @param searchUseYn
	 *            the searchUseYn to set
	 */
	public void setSearchUseYn(String searchUseYn) {
		this.searchUseYn = searchUseYn;
	}

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
	 * rowNo attribute를 리턴한다.
	 *
	 * @return the rowNo
	 */
	public int getRowNo() {
		return rowNo;
	}

	/**
	 * rowNo attribute 값을 설정한다.
	 *
	 * @param rowNo
	 *            the rowNo to set
	 */
	public void setRowNo(int rowNo) {
		this.rowNo = rowNo;
	}

	/**
	 * frstRegisterNm attribute를 리턴한다.
	 *
	 * @return the frstRegisterNm
	 */
	public String getFrstRegisterNm() {
		return frstRegisterNm;
	}

	/**
	 * frstRegisterNm attribute 값을 설정한다.
	 *
	 * @param frstRegisterNm
	 *            the frstRegisterNm to set
	 */
	public void setFrstRegisterNm(String frstRegisterNm) {
		this.frstRegisterNm = frstRegisterNm;
	}

	/**
	 * lastUpdusrNm attribute를 리턴한다.
	 *
	 * @return the lastUpdusrNm
	 */
	public String getLastUpdusrNm() {
		return lastUpdusrNm;
	}

	/**
	 * lastUpdusrNm attribute 값을 설정한다.
	 *
	 * @param lastUpdusrNm
	 *            the lastUpdusrNm to set
	 */
	public void setLastUpdusrNm(String lastUpdusrNm) {
		this.lastUpdusrNm = lastUpdusrNm;
	}

	/**
	 * isExpired attribute를 리턴한다.
	 *
	 * @return the isExpired
	 */
	public String getIsExpired() {
		return isExpired;
	}

	/**
	 * isExpired attribute 값을 설정한다.
	 *
	 * @param isExpired
	 *            the isExpired to set
	 */
	public void setIsExpired(String isExpired) {
		this.isExpired = isExpired;
	}

	/**
	 * parntsSortOrdr attribute를 리턴한다.
	 *
	 * @return the parntsSortOrdr
	 */
	public String getParntsSortOrdr() {
		return parntsSortOrdr;
	}

	/**
	 * parntsSortOrdr attribute 값을 설정한다.
	 *
	 * @param parntsSortOrdr
	 *            the parntsSortOrdr to set
	 */
	public void setParntsSortOrdr(String parntsSortOrdr) {
		this.parntsSortOrdr = parntsSortOrdr;
	}

	/**
	 * parntsReplyLc attribute를 리턴한다.
	 *
	 * @return the parntsReplyLc
	 */
	public String getParntsReplyLc() {
		return parntsReplyLc;
	}

	/**
	 * parntsReplyLc attribute 값을 설정한다.
	 *
	 * @param parntsReplyLc
	 *            the parntsReplyLc to set
	 */
	public void setParntsReplyLc(String parntsReplyLc) {
		this.parntsReplyLc = parntsReplyLc;
	}

	/**
	 * bbsTyCode attribute를 리턴한다.
	 *
	 * @return the bbsTyCode
	 */
//	public String getBbsTyCode() {
//		return bbsTyCode;
//	}

	/**
	 * bbsTyCode attribute 값을 설정한다.
	 *
	 * @param bbsTyCode
	 *            the bbsTyCode to set
	 */
//	public void setBbsTyCode(String bbsTyCode) {
//		this.bbsTyCode = bbsTyCode;
//	}

	/**
	 * bbsAttrbCode attribute를 리턴한다.
	 *
	 * @return the bbsAttrbCode
	 */
	public String getBbsAttrbCode() {
		return bbsAttrbCode;
	}

	/**
	 * bbsAttrbCode attribute 값을 설정한다.
	 *
	 * @param bbsAttrbCode
	 *            the bbsAttrbCode to set
	 */
	public void setBbsAttrbCode(String bbsAttrbCode) {
		this.bbsAttrbCode = bbsAttrbCode;
	}

	/**
	 * bbsNm attribute를 리턴한다.
	 *
	 * @return the bbsNm
	 */
	public String getBbsNm() {
		return bbsNm;
	}

	/**
	 * bbsNm attribute 값을 설정한다.
	 *
	 * @param bbsNm
	 *            the bbsNm to set
	 */
	public void setBbsNm(String bbsNm) {
		this.bbsNm = bbsNm;
	}

	/**
	 * fileAtchPosblAt attribute를 리턴한다.
	 *
	 * @return the fileAtchPosblAt
	 */
	public String getFileAtchPosblAt() {
		return fileAtchPosblAt;
	}

	/**
	 * fileAtchPosblAt attribute 값을 설정한다.
	 *
	 * @param fileAtchPosblAt
	 *            the fileAtchPosblAt to set
	 */
	public void setFileAtchPosblAt(String fileAtchPosblAt) {
		this.fileAtchPosblAt = fileAtchPosblAt;
	}

	/**
	 * posblAtchFileNumber attribute를 리턴한다.
	 *
	 * @return the posblAtchFileNumber
	 */
	public int getPosblAtchFileNumber() {
		return posblAtchFileNumber;
	}

	/**
	 * posblAtchFileNumber attribute 값을 설정한다.
	 *
	 * @param posblAtchFileNumber
	 *            the posblAtchFileNumber to set
	 */
	public void setPosblAtchFileNumber(int posblAtchFileNumber) {
		this.posblAtchFileNumber = posblAtchFileNumber;
	}

	/**
	 * replyPosblAt attribute를 리턴한다.
	 *
	 * @return the replyPosblAt
	 */
	public String getReplyPosblAt() {
		return replyPosblAt;
	}

	/**
	 * replyPosblAt attribute 값을 설정한다.
	 *
	 * @param replyPosblAt
	 *            the replyPosblAt to set
	 */
	public void setReplyPosblAt(String replyPosblAt) {
		this.replyPosblAt = replyPosblAt;
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

	/**
	 * subPageIndex attribute 값을 설정한다.
	 * @param subPageIndex the subPageIndex to set
	 */
	public void setSubPageIndex(String subPageIndex) {
		this.subPageIndex = subPageIndex;
	}

	/**
	 * toString 메소드를 대치한다.
	 */
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
	
	
	 /** 게시판 유형코드 test*/
   private String bbsTyACode = "";

   private String bbsTyBCode = "";
   
   private String bbsTyCCode = "";
   
   private String bbsTyDCode = "";
   
   
   public String getBbsTyACode() {
		return bbsTyACode;
	}

	public void setBbsTyACode(String bbsTyACode) {
		this.bbsTyACode = bbsTyACode;
	}

	public String getBbsTyBCode() {
		return bbsTyBCode;
	}

	public void setBbsTyBCode(String bbsTyBCode) {
		this.bbsTyBCode = bbsTyBCode;
	}

	public String getBbsTyCCode() {
		return bbsTyCCode;
	}

	public void setBbsTyCCode(String bbsTyCCode) {
		this.bbsTyCCode = bbsTyCCode;
	}

	public String getBbsTyDCode() {
		return bbsTyDCode;
	}

	public void setBbsTyDCode(String bbsTyDCode) {
		this.bbsTyDCode = bbsTyDCode;
	}
	
	/**
	 * 주소 상세보기
	 * */
	private String dtlId = "";
	private String zipCd = "";
	private String roadBaseAd = "";
	private String roadBaseA = "";
	private String roadBaseB = "";
	private String roadBaseC = "";
	private String roadBaseD = "";
	private String prclAdre = "";
	private String state = "";
	private String adresStat = "";
	private String modify = "";
	private String del = ""; 
	
	
	public String getDtlId() {
		
		return dtlId;
	}

	public void setDtlId(String dtlId) {
		this.dtlId = dtlId;
	}
	
	public String getZipCd() {
		return zipCd;
	}

	public void setZipCd(String zipCd) {
		this.zipCd = zipCd;
	}

	public String getRoadBaseAd() {
		return roadBaseAd;
	}

	public void setRoadBaseAd(String roadBaseAd) {
		this.roadBaseAd = roadBaseAd;
	}

	public String getRoadBaseA() {
		return roadBaseA;
	}

	public void setRoadBaseA(String roadBaseA) {
		this.roadBaseA = roadBaseA;
	}

	public String getRoadBaseB() {
		return roadBaseB;
	}

	public void setRoadBaseB(String roadBaseB) {
		this.roadBaseB = roadBaseB;
	}

	public String getRoadBaseC() {
		return roadBaseC;
	}

	public void setRoadBaseC(String roadBaseC) {
		this.roadBaseC = roadBaseC;
	}

	public String getRoadBaseD() {
		return roadBaseD;
	}

	public void setRoadBaseD(String roadBaseD) {
		this.roadBaseD = roadBaseD;
	}

	public String getPrclAdre() {
		return prclAdre;
	}

	public void setPrclAdre(String prclAdre) {
		this.prclAdre = prclAdre;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getAdresStat() {
		return adresStat;
	}

	public void setAdresStat(String adresStat) {
		this.adresStat = adresStat;
	}

	public String getModify() {
		return modify;
	}

	public void setModify(String modify) {
		this.modify = modify;
	}

	public String getDel() {
		return del;
	}

	public void setDel(String del) {
		this.del = del;
	}

	//총개수
	public String getStaCnt() {
		return staCnt;
	}

	public void setStaCnt(String staCnt) {
		this.staCnt = staCnt;
	}

	//발급완료 개수
	public String getFinCnt() {
		return finCnt;
	}

	public void setFinCnt(String finCnt) {
		this.finCnt = finCnt;
	}

	//파싱완료 개수
	public String getPasCnt() {
		return pasCnt;
	}

	public void setPasCnt(String pasCnt) {
		this.pasCnt = pasCnt;
	}

	//오류 개수
	public String getErrCnt() {
		return errCnt;
	}

	public void setErrCnt(String errCnt) {
		this.errCnt = errCnt;
	}


	 
}