package egovframework.let.cop.bldn.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.FileVO;
import egovframework.let.cop.bldn.service.Board;
import egovframework.let.cop.bldn.service.BoardVO;
import egovframework.let.cop.bldn.service.EgovBldnManageService;
import egovframework.let.utl.fcc.service.EgovDateUtil;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.egovframe.rte.fdl.property.EgovPropertyService;

/**
 * 게시물 관리를 위한 서비스 구현 클래스
 * 
 * @author 공통 서비스 개발팀 한성곤
 * @since 2009.03.19
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2009.03.19  이삼섭          최초 생성
 *  2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *      </pre>
 */
@Service("EgovBldnManageService")
public class EgovBldnManageServiceImpl extends EgovAbstractServiceImpl implements EgovBldnManageService {

	@Resource(name = "BldnManageDAO")
	private BldnManageDAO bldnMngDAO;

	@Resource(name = "EgovFileMngService")
	private EgovFileMngService fileService;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;

	@Resource(name = "egovBBSMstrIdGnrService")
	private EgovIdGnrService idgenService;

	/**
	 * 게시물 한 건을 삭제 한다.
	 *
	 */
	  @Override public void deleteBoardArticle(Board board) throws Exception {
	  FileVO fvo = new FileVO();
	  
	  fvo.setAtchFileId(board.getAtchFileId());
	  
	  board.setNttSj("이 글은 작성자에 의해서 삭제되었습니다.");
	  
	  bldnMngDAO.deleteBoardArticle(board);
	  bldnMngDAO.deleteBoardArticleDtl(board);
	  
	  }
	  
	  /**
       * 전체 파일을 삭제한다.
       *
       */
      @Override
	  	public void deleteBoardArticleDtl(Board board) throws Exception {
    	  bldnMngDAO.deleteBoardArticleDtl(board);
	    }
	 
	/**
	 * 게시판에 게시물 또는 답변 게시물을 등록 한다.
	 *
	 */
	@Override
	public void insertBoardArticle(Board board) throws Exception {
		bldnMngDAO.insertBoardArticle(board);

	}

	/**
	 * 게시물 대하여 상세 내용을 조회 한다.
	 *
	 */
	@Override 
	  public BoardVO selectBoardArticle(BoardVO boardVO) throws Exception{ 
	if (boardVO.isPlusCount()) { 
		int iniqireCo =  bldnMngDAO.selectMaxInqireCo(boardVO);
	  
	    boardVO.setInqireCo(iniqireCo); 
	    bldnMngDAO.updateInqireCo(boardVO); 
	  }
	  
	  return bldnMngDAO.selectBoardArticle(boardVO); 
	  }
	  
	  @Override 
	  public BoardVO insertSelectBoardArticle(BoardVO boardVO) throws Exception{ 
		 if (boardVO.isPlusCount()) { 
			int iniqireCo =  bldnMngDAO.selectMaxInqireCo(boardVO);
		  
		  boardVO.setInqireCo(iniqireCo); 
		  bldnMngDAO.updateInqireCo(boardVO); 
		  }
		  
		  	return bldnMngDAO.insertSelectBoardArticle(boardVO); 
		  }	  
	 

	/**
	 * 조건에 맞는 게시물 목록을 조회 한다.
	 *
	 */
	@Override
	public Map<String, Object> selectBoardArticles(BoardVO boardVO, String attrbFlag) throws Exception {
		List<BoardVO> list = bldnMngDAO.selectBoardArticleList(boardVO);
		List<BoardVO> result = new ArrayList<BoardVO>();

		if ("BBSA01".equals(attrbFlag)) {
			String today = EgovDateUtil.getToday();

			BoardVO vo;
			Iterator<BoardVO> iter = list.iterator();
			while (iter.hasNext()) {
				vo = iter.next();

				if (!"".equals(vo.getNtceBgnde()) || !"".equals(vo.getNtceEndde())) {
					if (EgovDateUtil.getDaysDiff(today, vo.getNtceBgnde()) > 0
							|| EgovDateUtil.getDaysDiff(today, vo.getNtceEndde()) < 0) {
						// 시작일이 오늘날짜보다 크거나, 종료일이 오늘 날짜보다 작은 경우
					}
				}
				result.add(vo);
			}
		} else {
			result = list;
		}

		int cnt = bldnMngDAO.selectBoardArticleListCnt(boardVO);

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
	}

	/**
	 * 게시물 한 건의 내용을 수정 한다.
	 *
	 */
	  @Override public void updateBoardArticle(Board board) throws Exception {
		  bldnMngDAO.updateBoardArticle(board); 
	}

	/**
	 * 주소 정보csv를 갱신 한다.
	 *
	 */
	@Override
	public void insertJuso(BoardVO board) throws Exception {
		bldnMngDAO.insertJuso(board);
	}
	
	/**
	 * excel 파일명 검색시 사용.
	 *
	 */
	@Override
	public String selectOrignlFileNm(BoardVO boardVO) throws Exception {
		return bldnMngDAO.selectOrignlFileNm(boardVO);
	}
	  
	/**
     * 주소용 상세보기
     */
	@Override 
	  public Map<String, Object> selectBoardArticleJuso(BoardVO boardVO, String attrbFlag) throws Exception{ 
		List<BoardVO> list = bldnMngDAO.selectBoardArticleListJuso(boardVO);
		int cnt = bldnMngDAO.selectBoardArticleListJusoCnt(boardVO);
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		return map;  
	  }
	
	//주소한건 삭제
	  @Override 
	  public void deleteBoardArticleJuso(BoardVO boardVO) throws Exception {
		  bldnMngDAO.deleteBoardArticleJuso(boardVO); 
	  }
	  
	  //주소한건 수정
	  @Override 
	  public void updateBoardArticleJuso(BoardVO boardVO) throws Exception {
		  bldnMngDAO.updateBoardArticleJuso(boardVO); 
	  }

	  /**
	   * 주소정제 읽기 갱신
	   * */
	@Override 
	  public List<BoardVO> selectBoardArticleJusoCvt(BoardVO boardVO) throws Exception{ 
		List<BoardVO> list = bldnMngDAO.selectBoardArticleListJusoDtlCvt(boardVO);
		return list;  
	  }

	  @Override 
	  public void updateJusoCvtDetail(BoardVO boardVO) throws Exception {
		  bldnMngDAO.updateJusoCvtDetail(boardVO); 
	}
  
	  @Override 
	  public void updateJusoCvtDetailNothing(BoardVO boardVO) throws Exception {
		  bldnMngDAO.updateJusoCvtDetailNothing(boardVO); 
	}

	  /**
	   * 전체 발급완료 처리
	   * */
	  @Override 
	  public void updateJusoCompDetail(BoardVO boardVO) throws Exception {
		  bldnMngDAO.updateJusoCompDetail(boardVO); 
	}
  
	  /**
	   * 선택 미발급 처리
	   * */
	  @Override 
	  public void updateJusoCompDetailDtl(BoardVO boardVO) throws Exception {
		  bldnMngDAO.updateJusoCompDetailDtl(boardVO); 
	}

}