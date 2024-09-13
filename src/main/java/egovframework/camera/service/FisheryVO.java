package egovframework.camera.service;

import java.io.Serializable;
import java.math.BigDecimal;

import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * 게시물 관리를 위한 VO 클래스
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009.03.19
 * @version 1.0
 * @see
 *
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
public class FisheryVO extends Fishery implements Serializable {

	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -3779821913760046011L;

	//챠트 데이터 파라메터
	private BigDecimal fisheryId;
	public BigDecimal getFisheryId() {
		return fisheryId;
	}

	public void setFisheryId(BigDecimal fisheryId) {
		this.fisheryId = fisheryId;
	}

	//여기는 날짜계산 start 예)9월10일
	//일주일인 경우, to보다 6일 빠른 날짜 예)9월4일 
	//한달인 경우, to보다 한달전+1일 날짜 예)8월11일
	//분기인 경우, to보다 세달전+1일 날짜 예)6월11일
	private String selectedDateFrom = "";
	public String getSelectedDateFrom() {
		return selectedDateFrom;
	}

	public void setSelectedDateFrom(String selectedDateFrom) {
		this.selectedDateFrom = selectedDateFrom;
	}


	//여기는 날짜계산 to
	private String selectedDate = "";
	public String getSelectedDate() {
		return selectedDate;
	}

	public void setSelectedDate(String selectedDate) {
		this.selectedDate = selectedDate;
	}

	private String viewType = "";
	public String getViewType() {
		return viewType;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

}
