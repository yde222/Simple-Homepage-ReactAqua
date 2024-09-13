package egovframework.camera.service.impl;

import java.util.List;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.camera.service.Board;
import egovframework.camera.service.BoardVO;
import egovframework.camera.service.Fisheryge;
import egovframework.camera.service.FisherygeVO;

/**
 * 게시물 관리를 위한 데이터 접근 클래스
 * 
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009.03.19
 * @version 1.0
 * @see
 *
 *      << 개정이력(Modification Information) >>
 *
 *      수정일 수정자 수정내용
 *      ------- -------- ---------------------------
 *      2009.03.19 이삼섭 최초 생성
 *      2011.08.31 JJY 경량환경 템플릿 커스터마이징버전 생성
 *
 */
@Repository("FisherygeDAO")
public class FisherygeDAO extends EgovAbstractMapper {

	/**
	 * 조건에 맞는 게시물 목록을 조회 한다.
	 *
	 * @param boardVO
	 * @return
	 * @throws Exception
	 */

	@SuppressWarnings("unchecked")
	public List<Fisheryge> selectFisherygeList(FisherygeVO fisherygeVO) throws Exception {
		return (List<Fisheryge>) list("FisherygeDAO.selectFisherygeList", fisherygeVO);
	}

	@SuppressWarnings("unchecked")
	public List<Fisheryge> selectFisherygeData(FisherygeVO fisherygeVO) throws Exception {
		return (List<Fisheryge>) list("FisherygeDAO.selectFisherygeData", fisherygeVO);
	}

}