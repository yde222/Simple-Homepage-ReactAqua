package egovframework.let.uat.uia.service.impl;

import egovframework.com.cmm.LoginVO;
import egovframework.let.uat.uia.service.EgovLoginService;
import egovframework.let.utl.fcc.service.EgovDateUtil;
import egovframework.let.utl.fcc.service.EgovNumberUtil;
import egovframework.let.utl.fcc.service.EgovStringUtil;
import egovframework.let.utl.sim.service.EgovFileScrty;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

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
@Service("loginService")
public class EgovLoginServiceImpl extends EgovAbstractServiceImpl implements EgovLoginService {

	@Resource(name = "loginDAO")
	private LoginDAO loginDAO;

	/**
	 * 일반 로그인을 처리한다
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
	@Override
	public LoginVO actionLogin(LoginVO vo) throws Exception {

		// 1. 입력한 비밀번호를 암호화한다.
		String enpassword = EgovFileScrty.encryptPassword(vo.getPassword(), vo.getId());
		vo.setPassword(enpassword);

		// 2. 아이디와 암호화된 비밀번호가 DB와 일치하는지 확인한다.
		LoginVO loginVO = loginDAO.actionLogin(vo);

		// 3. 결과를 리턴한다.
		if (loginVO != null && !loginVO.getId().equals("") && !loginVO.getPassword().equals("")) {
			return loginVO;
		} else {
			loginVO = new LoginVO();
		}

		return loginVO;
	}

	/**
	 * 일반 로그인을 처리한다(사용자 갱신용)
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
	@Override
	public LoginVO actionLoginUpdate(LoginVO vo) throws Exception {

		// 1. 입력한 비밀번호를 암호화한다.
		String enpassword = EgovFileScrty.encryptPassword(vo.getPasswordHint(), vo.getEmail());
		vo.setPasswordHint(enpassword);

		// 2. 아이디와 암호화된 비밀번호가 DB와 일치하는지 확인한다.
		//vo.setPassword( vo.getPasswordHint());
		//vo.setId( vo.getEmail());
		LoginVO loginVO = loginDAO.actionLoginUpdate(vo);

		// 3. 결과를 리턴한다.
		if (loginVO != null && !loginVO.getId().equals("") && !loginVO.getPassword().equals("")) {
			return loginVO;
		} else {
			loginVO = new LoginVO();
		}

		return loginVO;
	}

	/**
	 * 아이디를 찾는다.
	 * @param vo LoginVO
	 * @return LoginVO
	 * @exception Exception
	 */
	@Override
	public LoginVO searchId(LoginVO vo) throws Exception {

		// 1. 이름, 이메일주소가 DB와 일치하는 사용자 ID를 조회한다.
		LoginVO loginVO = loginDAO.searchId(vo);

		// 2. 결과를 리턴한다.
		if (loginVO != null && !loginVO.getId().equals("")) {
			return loginVO;
		} else {
			loginVO = new LoginVO();
		}

		return loginVO;
	}

	/**
	 * 비밀번호를 찾는다.
	 * @param vo LoginVO
	 * @return boolean
	 * @exception Exception
	 */
	@Override
	public boolean searchPassword(LoginVO vo) throws Exception {

		boolean result = true;

		// 1. 아이디, 이름, 이메일주소, 비밀번호 힌트, 비밀번호 정답이 DB와 일치하는 사용자 Password를 조회한다.
		LoginVO loginVO = loginDAO.searchPassword(vo);
		if (loginVO == null || loginVO.getPassword() == null || loginVO.getPassword().equals("")) {
			return false;
		}

		// 2. 임시 비밀번호를 생성한다.(영+영+숫+영+영+숫=6자리)
		String newpassword = "";
		for (int i = 1; i <= 6; i++) {
			// 영자
			if (i % 3 != 0) {
				newpassword += EgovStringUtil.getRandomStr('a', 'z');
				// 숫자
			} else {
				newpassword += EgovNumberUtil.getRandomNum(0, 9);
			}
		}

		// 3. 임시 비밀번호를 암호화하여 DB에 저장한다.
		LoginVO pwVO = new LoginVO();
		String enpassword = EgovFileScrty.encryptPassword(newpassword, vo.getId());
		pwVO.setId(vo.getId());
		pwVO.setPassword(enpassword);
		pwVO.setUserSe(vo.getUserSe());
		loginDAO.updatePassword(pwVO);

		return result;
	}
	
	/**
	 * 로그인 정보를 등록 한다.
	 *
	 */
	@Override
	public void insertLogin(LoginVO login) throws Exception {
		// SORT_ORDR는 부모글의 소트 오더와 같게, NTT_NO는 순서대로 부여

/*		if ("Y".equals(login.getReplyAt())) {
			// 답글인 경우 1. Parnts를 세팅, 2.Parnts의 sortOrdr을 현재글의 sortOrdr로 가져오도록, 3.nttNo는 현재 게시판의 순서대로
			// replyLc는 부모글의 ReplyLc + 1

			@SuppressWarnings("unused") long tmpNttId = 0L; // 답글 게시물 ID

			tmpNttId = bbsMngDAO.replyBoardArticle(login);

		} else {
*/			// 답글이 아닌경우 Parnts = 0, replyLc는 = 0, sortOrdr = nttNo(Query에서 처리)
			//login.setParnts("0");
			//login.setReplyLc("0");
			//login.setReplyAt("N");

			loginDAO.insertLogin(login);
//		}
	}

	/**
	 * 로그인 정보를 갱신 한다.(비번 변경)
	 *
	 */
	@Override
	public void updatePwLogin(LoginVO login) throws Exception {
		// SORT_ORDR는 부모글의 소트 오더와 같게, NTT_NO는 순서대로 부여

/*		if ("Y".equals(login.getReplyAt())) {
			// 답글인 경우 1. Parnts를 세팅, 2.Parnts의 sortOrdr을 현재글의 sortOrdr로 가져오도록, 3.nttNo는 현재 게시판의 순서대로
			// replyLc는 부모글의 ReplyLc + 1

			@SuppressWarnings("unused") long tmpNttId = 0L; // 답글 게시물 ID

			tmpNttId = bbsMngDAO.replyBoardArticle(login);

		} else {
*/			// 답글이 아닌경우 Parnts = 0, replyLc는 = 0, sortOrdr = nttNo(Query에서 처리)
			//login.setParnts("0");
			//login.setReplyLc("0");
			//login.setReplyAt("N");

			loginDAO.updatePwLogin(login);
//		}
	}
	
	/**
	 * 로그인 정보를 갱신 한다.(회원정보변경)
	 *
	 */
	@Override
	public void updateLogin(LoginVO login) throws Exception {
		// SORT_ORDR는 부모글의 소트 오더와 같게, NTT_NO는 순서대로 부여

/*		if ("Y".equals(login.getReplyAt())) {
			// 답글인 경우 1. Parnts를 세팅, 2.Parnts의 sortOrdr을 현재글의 sortOrdr로 가져오도록, 3.nttNo는 현재 게시판의 순서대로
			// replyLc는 부모글의 ReplyLc + 1

			@SuppressWarnings("unused") long tmpNttId = 0L; // 답글 게시물 ID

			tmpNttId = bbsMngDAO.replyBoardArticle(login);

		} else {
*/			// 답글이 아닌경우 Parnts = 0, replyLc는 = 0, sortOrdr = nttNo(Query에서 처리)
			//login.setParnts("0");
			//login.setReplyLc("0");
			//login.setReplyAt("N");

			loginDAO.updateLogin(login);
//		}
	}

	/**
	 * 게시물 로그인 대하여 상세 내용을 조회 한다.
	 *
	 * @see egovframework.let.cop.bbs.brd.service.EgovBBSManageService#selectBoardArticle(egovframework.let.cop.bbs.brd.service.BoardVO)
	 */
	@Override
	public LoginVO selectBoardLoginArticle(LoginVO loginVO) throws Exception {
		//if (loginVO.isPlusCount()) {
			//int iniqireCo = loginDAO.selectMaxInqireCo(loginVO);

			//loginVO.setInqireCo(iniqireCo);
			//loginDAO.updateInqireCo(loginVO);
		//}

		return loginDAO.selectBoardLoginArticle(loginVO);
	}


	/**
	 * 조건에 맞는 게시물로그인 목록을 조회 한다.
	 *
	 * @see egovframework.let.cop.bbs.brd.service.EgovBBSManageService#selectBoardArticles(egovframework.let.cop.bbs.brd.service.BoardVO)
	 */
	@Override
	public Map<String, Object> selectBoardLoginArticles(LoginVO loginVO, String attrbFlag) throws Exception {
		List<LoginVO> list = loginDAO.selectBoardLoginArticleList(loginVO);
		List<LoginVO> result = new ArrayList<LoginVO>();

		if ("BBSA01".equals(attrbFlag)) {
			// 유효게시판 임
			String today = EgovDateUtil.getToday();

			LoginVO vo;
			Iterator<LoginVO> iter = list.iterator();
			while (iter.hasNext()) {
				vo = iter.next();

				if (!"".equals(vo.getNtceBgnde()) || !"".equals(vo.getNtceEndde())) {
					if (EgovDateUtil.getDaysDiff(today, vo.getNtceBgnde()) > 0
						|| EgovDateUtil.getDaysDiff(today, vo.getNtceEndde()) < 0) {
						// 시작일이 오늘날짜보다 크거나, 종료일이 오늘 날짜보다 작은 경우
						//vo.setIsExpired("Y");
					}
				}
				result.add(vo);
			}
		} else {
			result = list;
		}

		int cnt = loginDAO.selectBoardLoginArticleListCnt(loginVO);//0224

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 게시물 로그인 한 건의 내용을 수정 한다.(슈퍼관리자의 경우, 승인여부)
	 *
	 * @see egovframework.let.cop.bbs.brd.service.EgovBBSManageService#updateBoardArticle(egovframework.let.cop.bbs.brd.service.Board)
	 */
	@Override
	public void updateBoardLoginArticle(LoginVO loginVO) throws Exception {
		loginDAO.updateBoardLoginArticle(loginVO);
	}

	/**
	 * 게시물 로그인 한 건을 삭제 한다.
	 *
	 * @see egovframework.let.cop.bbs.brd.service.EgovBBSManageService#deleteBoardArticle(egovframework.let.cop.bbs.brd.service.Board)
	 */
	@Override
	public void deleteBoardLoginArticle(LoginVO loginVO) throws Exception {
//		FileVO fvo = new FileVO();

//		fvo.setAtchFileId(board.getAtchFileId());

//		board.setNttSj("이 글은 작성자에 의해서 삭제되었습니다.");

		loginDAO.deleteBoardLoginArticle(loginVO);

//		if (!"".equals(fvo.getAtchFileId()) || fvo.getAtchFileId() != null) {
//			fileService.deleteAllFileInf(fvo);
//		}
	}


}