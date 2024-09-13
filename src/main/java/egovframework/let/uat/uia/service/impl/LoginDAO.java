package egovframework.let.uat.uia.service.impl;

import egovframework.com.cmm.LoginVO;
import egovframework.let.cop.bbs.service.Board;
import egovframework.let.cop.bbs.service.BoardVO;

import java.util.Iterator;
import java.util.List;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.stereotype.Repository;

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
@Repository("loginDAO")
public class LoginDAO extends EgovAbstractMapper {

	/**
	 * 일반 로그인을 처리한다
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
	public LoginVO actionLogin(LoginVO vo) throws Exception {
		return (LoginVO) selectOne("loginDAO.actionLogin", vo);
	}

	/**
	 * 일반 로그인을 처리한다(사용자 갱신용)
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
	public LoginVO actionLoginUpdate(LoginVO vo) throws Exception {
		return (LoginVO) selectOne("loginDAO.actionLoginUpdate", vo);
	}


	/**
	 * 아이디를 찾는다.
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
	public LoginVO searchId(LoginVO vo) throws Exception {
		return (LoginVO) selectOne("loginDAO.searchId", vo);
	}

	/**
	 * 비밀번호를 찾는다.
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
	public LoginVO searchPassword(LoginVO vo) throws Exception {
		return (LoginVO) selectOne("loginDAO.searchPassword", vo);
	}

	/**
	 * 변경된 비밀번호를 저장한다.
	 * @param vo LoginVO
	 * @exception Exception
	 */
	public void updatePassword(LoginVO vo) throws Exception {
		update("loginDAO.updatePassword", vo);
	}
	
    /**
     * 로그인 정보를 등록 한다.
     *
     * @param LoginVO
     * @throws Exception
     */
    public void insertLogin(LoginVO vo) throws Exception {
	//long nttId = (Long)selectOne("BBSManageDAO.selectMaxNttId");
	//board.setNttId(nttId);

    	insert("loginDAO.insertLogin", vo);
    }

    /**
     * 로그인 정보를 갱신 한다.(비번)
     *
     * @param LoginVO
     * @throws Exception
     */
    public void updatePwLogin(LoginVO vo) throws Exception {
	//long nttId = (Long)selectOne("BBSManageDAO.selectMaxNttId");
	//board.setNttId(nttId);

    	//insert("loginDAO.updatePwLogin", vo);
    	//비번변경과 회원정보변경 2종류(하나로 통일,,,비번, 이름,전화번호)
    	insert("loginDAO.updateLogin", vo);
    }

    /**
     * 로그인 정보를 갱신 한다.(회원정보)
     *
     * @param LoginVO
     * @throws Exception
     */
    public void updateLogin(LoginVO vo) throws Exception {
	//long nttId = (Long)selectOne("BBSManageDAO.selectMaxNttId");
	//board.setNttId(nttId);

    	insert("loginDAO.updateLogin", vo);
    }

    /**
     * 조건에 맞는 게시물로그인 목록을 조회 한다.
     *
     * @param boardVO
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public List<LoginVO> selectBoardLoginArticleList(LoginVO loginVO) throws Exception {
	return (List<LoginVO>) list("loginDAO.selectBoardLoginArticleList", loginVO);
    }

    /**
     * 조건에 맞는 게시물로그인 목록에 대한 전체 건수를 조회 한다.
     *
     * @param boardVO
     * @return
     * @throws Exception
     */
    public int selectBoardLoginArticleListCnt(LoginVO loginVO) throws Exception {
	return (Integer)selectOne("loginDAO.selectBoardLoginArticleListCnt", loginVO);
    }

    /* 230227 insert */
    
    /**
     * 게시물로그인에 대한 조회 건수를 수정 한다.
     *
     * @param loginVO
     * @throws Exception
     */
    public void updateInqireCo(LoginVO loginVO) throws Exception {
	update("loginDAO.updateInqireCo", loginVO);
    }

    /**
     * 게시물로그인에 대한 현재 조회 건수를 조회 한다.
     *
     * @param loginVO
     * @return
     * @throws Exception
     */
    public int selectMaxInqireCo(LoginVO loginVO) throws Exception {
	return (Integer)selectOne("loginDAO.selectMaxInqireCo", loginVO);
    }

    /**
     * 게시판로그인에 대한 목록을 정렬 순서로 조회 한다.
     *
     * @param boardVO
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public List<BoardVO> selectLoginListForSort(Board board) throws Exception {
	return (List<BoardVO>) list("loginDAO.selectNoticeListForSort", board);
    }

    /**
     * 게사판로그인에 대한 정렬 순서를 수정 한다.
     *
     * @param sortList
     * @throws Exception
     */
    public void updateSortOrder(List<LoginVO> sortList) throws Exception {
    	LoginVO vo;
	Iterator<LoginVO> iter = sortList.iterator();
		while (iter.hasNext()) {
			vo = (LoginVO)iter.next();
			update("loginDAO.updateSortOrder", vo);
		}
    }

    /**
     * 게시물로그인 한 건에 대하여 상세 내용을 조회 한다.
     *
     * @param loginVO
     * @return
     * @throws Exception
     */
    public LoginVO selectBoardLoginArticle(LoginVO loginVO) throws Exception {
    	return (LoginVO)selectOne("loginDAO.selectBoardLoginArticle", loginVO);
    }

    /**
	 * 게시물 로그인 한 건의 내용을 수정 한다.(슈퍼관리자의 경우, 승인여부)
     *
     * @param board
     * @throws Exception
     */
    public void updateBoardLoginArticle(LoginVO loginVO) throws Exception {
    	update("loginDAO.updateBoardLoginArticle", loginVO);
    }

    /**
     * 게시물로그인 한 건을 삭제 한다.
     *
     * @param board
     * @throws Exception
     */
    public void deleteBoardLoginArticle(LoginVO loginVO) throws Exception {
	update("loginDAO.deleteBoardLoginArticle", loginVO);
    }


}
