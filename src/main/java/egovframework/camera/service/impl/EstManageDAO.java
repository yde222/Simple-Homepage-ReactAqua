package egovframework.camera.service.impl;

import java.util.List;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.camera.service.Board;
import egovframework.camera.service.BoardVO;

/**
 * 게시물 관리를 위한 데이터 접근 클래스
 * 
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009.03.19
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2009.03.19  이삼섭          최초 생성
 *  2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 */
@Repository("EstManageDAO")
public class EstManageDAO extends EgovAbstractMapper {

    /**
     * 게시판에 게시물을 등록 한다.
     *
     * @param board
     * @throws Exception
     */
    public void insertBoardArticle(Board board) throws Exception {
    	insert("EstManageDAO.insertBoardArticle", board);
    }

    /**
     * 게시물 한 건에 대하여 상세 내용을 조회 한다.
     *
     * @param boardVO
     * @return
     * @throws Exception
     */
	
	  public BoardVO selectBoardArticle(BoardVO boardVO) throws Exception { 
		  return  (BoardVO)selectOne("EstManageDAO.selectBoardArticle", boardVO); 
	  }
	  
	  //수정용 상세보기
	  public BoardVO selectBoardArticle2(BoardVO boardVO) throws Exception { 
		  return  (BoardVO)selectOne("EstManageDAO.selectBoardArticle2", boardVO);
	}

    /**
     * 조건에 맞는 게시물 목록을 조회 한다.
     *
     * @param boardVO
     * @return
     * @throws Exception
     */
	
	  @SuppressWarnings("unchecked") 
	  public List<BoardVO> selectBoardArticleList(BoardVO boardVO) throws Exception { 
	  return (List<BoardVO>) list("EstManageDAO.selectBoardArticleList", boardVO); 
	  }

    /**
     * 조건에 맞는 게시물 목록에 대한 전체 건수를 조회 한다.
     *
     * @param boardVO
     * @return
     * @throws Exception
     */
	
	  public int selectBoardArticleListCnt(BoardVO boardVO) throws Exception {
	  return (Integer)selectOne("EstManageDAO.selectBoardArticleListCnt", boardVO);
	  }
	 
    /**
     * 게시물 한 건의 내용을 수정 한다.
     *
     * @param board
     * @throws Exception
     */
	
	  public void updateBoardArticle(Board board) throws Exception {
	  update("EstManageDAO.updateBoardArticle", board); 
	  }
	 
    /**
     * 게시물 한 건을 삭제 한다.
     *
     * @param board
     * @throws Exception
     */
	
	  public void deleteBoardArticle(Board board) throws Exception {
	  update("EstManageDAO.deleteBoardArticle", board); 
	  }
	  
	  /**
	   * 게시물 한 건을 삭제 한다.
	   *
	   * @param board
	   * @throws Exception
	   */
		
		public void deleteBoardArticleDtl(Board board) throws Exception {
		update("EstManageDAO.deleteBoardArticleDtl", board); 
		}
			
    /**
     * 게시물에 대한 조회 건수를 수정 한다.
     *
     * @param board
     * @throws Exception
     */
	
	  public void updateInqireCo(BoardVO boardVO) throws Exception {
	  update("EstManageDAO.updateInqireCo", boardVO); 
	  }

    /**
     * 게시물에 대한 현재 조회 건수를 조회 한다.
     *
     * @param boardVO
     * @return
     * @throws Exception
     */
	
	  public int selectMaxInqireCo(BoardVO boardVO) throws Exception { 
		  return  (Integer)selectOne("EstManageDAO.selectMaxInqireCo", boardVO); 
	  }

    /**
     *  주소정보 csv를 입력 한다.
     *
     * @param boardVO
     * @throws Exception
     */
	  
	  public void insertJuso(BoardVO board) throws Exception {
		  insert("EstManageDAO.insertJuso", board);
	  }

		/**
		 * excel 파일명 검색시 사용.
		 *
		 */
		
	  public String selectOrignlFileNm(Board board) throws Exception { 
		  return (String)selectOne("EstManageDAO.selectOrignlFileNm", board); 
	  }
	  
		/**
		 * 주소용 상세보기
		 */
		@SuppressWarnings({ "unchecked" })
		public List<BoardVO> selectBoardArticleListJuso(BoardVO boardVO) throws Exception {
			return (List<BoardVO>) list("EstManageDAO.selectBoardArticleListJuso", boardVO);
		}

		public int selectBoardArticleListJusoCnt(BoardVO boardVO) throws Exception {
			return (Integer) selectOne("EstManageDAO.selectBoardArticleListJusoCnt", boardVO);
		}
		
		//주소정제 일기 갱신
		@SuppressWarnings({ "unchecked" })
		public List<BoardVO> selectBoardArticleListJusoDtlCvt(BoardVO boardVO) throws Exception {
			return (List<BoardVO>) list("EstManageDAO.selectBoardArticleListJusoDtlCvt", boardVO);
		}
		
		public void updateJusoCvtDetail(BoardVO boardVO) throws Exception {
			update("EstManageDAO.updateJusoCvtDetail", boardVO);
		}
		
		public void updateJusoCvtDetailNothing(BoardVO boardVO) throws Exception {
			update("EstManageDAO.updateJusoCvtDetailNothing", boardVO);
		}
		
		//주소명세 한건삭제
		public void deleteBoardArticleJuso(BoardVO boardVO) throws Exception{
			delete("EstManageDAO.deleteBoardArticleJuso", boardVO);
		}		
		
		// 한건 주소 갱신
		public void updateBoardArticleJuso(BoardVO boardVO) throws Exception{
			delete("EstManageDAO.updateBoardArticleJuso", boardVO);
		}		
		
		public int jusoModDetailCnt(BoardVO boardVO) throws Exception {
			return (Integer) selectOne("EstManageDAO.jusoModDetailCnt", boardVO);
		}
		
		// 전체 발급완료 처리
		public void updateJusoCompDetail(BoardVO boardVO) throws Exception{
			delete("EstManageDAO.updateJusoCompDetail", boardVO);
		}

		// 선택 미발급 처리
		public void updateJusoCompDetailDtl(BoardVO boardVO) throws Exception{
			delete("EstManageDAO.updateJusoCompDetailDtl", boardVO);
		}

}