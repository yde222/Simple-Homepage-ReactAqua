package egovframework.let.uat.uia.service;

import java.util.Map;

import egovframework.com.cmm.LoginVO;

/**
 * 일반 로그인을 처리하는 비즈니스 구현 클래스
 * @author 공통서비스 개발팀 박지욱
 * @since 2009.03.06
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2009.03.06  박지욱          최초 생성
 *  2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *  </pre>
 */
public interface EgovLoginService {

	/**
	 * 일반 로그인을 처리한다
	 * @return LoginVO
	 *
	 * @param vo    LoginVO
	 * @exception Exception Exception
	 */
	public LoginVO actionLogin(LoginVO vo) throws Exception;

	/**
	 * 일반 로그인을 처리한다(update)
	 * @return LoginVO
	 *
	 * @param vo    LoginVO
	 * @exception Exception Exception
	 */
	public LoginVO actionLoginUpdate(LoginVO vo) throws Exception;


	/**
	 * 아이디를 찾는다.
	 * @return LoginVO
	 *
	 * @param vo    LoginVO
	 * @exception Exception Exception
	 */
	public LoginVO searchId(LoginVO vo) throws Exception;

	/**
	 * 비밀번호를 찾는다.
	 * @return boolean
	 *
	 * @param vo    LoginVO
	 * @exception Exception Exception
	 */
	public boolean searchPassword(LoginVO vo) throws Exception;

	/**
	 * 로그인 관련 정보를 등록 한다.
	 * 
	 * @param loginVO
	 * @exception Exception Exception
	 */
	public void insertLogin(LoginVO loginVO)
	  throws Exception;

	/**
	 * 로그인 관련 정보를 갱신 한다.(비번)
	 * 
	 * @param loginVO
	 * @exception Exception Exception
	 */
	public void updatePwLogin(LoginVO loginVO)
	  throws Exception;

	/**
	 * 로그인 관련 정보를 갱신 한다.(회원정보)
	 * 
	 * @param loginVO
	 * @exception Exception Exception
	 */
	public void updateLogin(LoginVO loginVO)
	  throws Exception;

	/**
	 * 게시물 로그인 대하여 상세 내용을 조회 한다.
	 * @return
	 * 
	 * @param loginVO
	 * @exception Exception Exception
	 */
	public LoginVO selectBoardLoginArticle(LoginVO loginVO)
	  throws Exception;


	/**
	 * 조건에 맞는 게시물로그인 목록을 조회 한다.
	 * @return
	 * 
	 * @param boardVO
	 * @param attrbFlag
	 * @exception Exception Exception
	 */
	public Map<String, Object> selectBoardLoginArticles(LoginVO loginVO, String attrbFlag)
	  throws Exception;

	/**
	 * 게시물 로그인 한 건의 내용을 수정 한다.
	 * 
	 * @param Board
	 * @exception Exception Exception
	 */
	public void updateBoardLoginArticle(LoginVO loginVO)
	  throws Exception;


	/**
	 * 게시물 로그인 한 건을 삭제 한다.
	 * 
	 * @param Board
	 * @exception Exception Exception
	 */
	public void deleteBoardLoginArticle(LoginVO loginVO)
	  throws Exception;


}