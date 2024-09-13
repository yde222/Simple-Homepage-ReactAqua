package egovframework.camera.service;

import java.util.List;
import java.util.Map;


public interface EgovEstManageService {

	/**   
	 * 게시물 한 건을 삭제 한다.
	 * 
	 * @param Board
	 * @exception Exception Exception
	 */
	public void deleteBoardArticle(Board Board)  throws Exception;
	
	/**
	 * 게시판에 게시물 또는 답변 게시물을 등록 한다.
	 * 
	 * @param Board
	 * @exception Exception Exception
	 */
	public void insertBoardArticle(Board Board)  throws Exception;

	/**
	 * 게시물 대하여 상세 내용을 조회 한다.
	 * @return
	 * 
	 * @param boardVO
	 * @exception Exception Exception
	 */
	public BoardVO selectBoardArticle(BoardVO boardVO)  throws Exception;

	public BoardVO selectBoardArticle2(BoardVO boardVO)  throws Exception;
	
	/**
	 * 조건에 맞는 게시물 목록을 조회 한다.
	 * @return
	 * 
	 * @param boardVO
	 * @param attrbFlag
	 * @exception Exception Exception
	 */
	public Map<String, Object> selectBoardArticles(BoardVO boardVO, String attrbFlag)  throws Exception;

	/**
	 * 게시물 한 건의 내용을 수정 한다.
	 * 
	 * @param Board
	 * @exception Exception Exception
	 */
	public void updateBoardArticle(Board Board)  throws Exception;
	
	/**
	 * 게시물 한 건을 삭제 한다.
	 * 
	 * @param Board
	 * @exception Exception Exception
	 */
	public void deleteBoardArticleDtl(Board Board) throws Exception;	
	
	/**
	 * 주소 정보csv를 입력 한다.
	 * 
	 * @param boardVO
	 * @exception Exception Exception
	 */
	public void insertJuso(BoardVO boardVO)  throws Exception;
	
	/**
	 * excel 파일명 검색시 사용.
	 *
	 */
	
	public String selectOrignlFileNm(BoardVO boardVO) throws Exception;
	
	/**
	 * 주소용 상세보기
	 * */

	public Map<String, Object> selectBoardArticleListJuso(BoardVO boardVO, String attrbFlag) throws Exception;
	
	//주소명세 한건삭제
	public void deleteBoardArticleJuso(BoardVO boardVO) throws Exception;
	
	//주소명세 한건수정
	public void updateBoardArticleJuso(BoardVO boardVO) throws Exception;
	
	/**
	 * 주소정제 읽기 갱신
	 * */
	public List<BoardVO> selectBoardArticleJusoCvt(BoardVO boardVO) throws Exception;

	public void updateJusoCvtDetail(BoardVO BoardVO) throws Exception;

	public void updateJusoCvtDetailNothing(BoardVO BoardVO) throws Exception;
	
	   /**
	   * 전체 발급완료 처리
	   * */
	public void updateJusoCompDetail(BoardVO boardVO)  throws Exception;

	  /**
	   * 선택 미발급 처리
	   * */
	public void updateJusoCompDetailDtl(BoardVO boardVO)  throws Exception;
	
}