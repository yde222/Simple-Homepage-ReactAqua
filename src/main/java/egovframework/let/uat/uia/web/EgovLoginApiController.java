package egovframework.let.uat.uia.web;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.egovframe.rte.fdl.cmmn.trace.LeaveaTrace;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.ResponseCode;
import egovframework.com.cmm.service.ResultVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.jwt.config.EgovJwtTokenUtil;
import egovframework.let.cop.bbs.service.BoardMasterVO;
import egovframework.let.cop.bbs.service.EgovBBSAttributeManageService;
import egovframework.let.uat.uia.service.EgovLoginService;
import egovframework.let.utl.sim.service.EgovFileScrty;

/**
 * 일반 로그인을 처리하는 컨트롤러 클래스
 * @author 공통서비스 개발팀 박지욱
 * @since 2009.03.06
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일      수정자      수정내용
 *  -------            --------        ---------------------------
 *  2009.03.06  박지욱     최초 생성
 *  2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *  </pre>
 */
@RestController
public class EgovLoginApiController {

	/** EgovLoginService */
	@Resource(name = "loginService")
	private EgovLoginService loginService;

	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** TRACE */
	@Resource(name = "leaveaTrace")
	LeaveaTrace leaveaTrace;
	
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;

	/** JWT */
	@Autowired
    private EgovJwtTokenUtil jwtTokenUtil;

	@Autowired
	private DefaultBeanValidator beanValidator;
	
	@Resource(name = "EgovBBSAttributeManageService")
	private EgovBBSAttributeManageService bbsAttrbService;



	/**
	 * 일반 로그인을 처리한다
	 * @param vo - 아이디, 비밀번호가 담긴 LoginVO
	 * @param request - 세션처리를 위한 HttpServletRequest
	 * @return result - 로그인결과(세션정보)
	 * @exception Exception
	 */
	@PostMapping(value = "/uat/uia/actionLoginAPI.do", consumes = {MediaType.APPLICATION_JSON_VALUE , MediaType.TEXT_HTML_VALUE})
	public HashMap<String, Object> actionLogin(@RequestBody LoginVO loginVO, HttpServletRequest request) throws Exception {
		HashMap<String,Object> resultMap = new HashMap<String,Object>();

		// 1. 일반 로그인 처리
		LoginVO loginResultVO = loginService.actionLogin(loginVO);

		if (loginResultVO != null && loginResultVO.getId() != null && !loginResultVO.getId().equals("")) {

			request.getSession().setAttribute("LoginVO", loginResultVO);
			resultMap.put("resultVO", loginResultVO);
			resultMap.put("resultCode", "200");
			resultMap.put("resultMessage", "성공 !!!");
		} else {
			resultMap.put("resultVO", loginResultVO);
			resultMap.put("resultCode", "300");
			resultMap.put("resultMessage", egovMessageSource.getMessage("fail.common.login"));
		}

		return resultMap;

	}

	@PostMapping(value = "/uat/uia/actionLoginJWT.do")
	public HashMap<String, Object> actionLoginJWT(@RequestBody LoginVO loginVO, HttpServletRequest request, ModelMap model) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		// 1. 일반 로그인 처리
		LoginVO loginResultVO = loginService.actionLogin(loginVO);
		
		if (loginResultVO != null && loginResultVO.getId() != null && !loginResultVO.getId().equals("")) {

			System.out.println("===>>> loginVO.getUserSe() = "+loginVO.getUserSe());
			System.out.println("===>>> loginVO.getId() = "+loginVO.getId());
			System.out.println("===>>> loginVO.getPassword() = "+loginVO.getPassword());

			//인증이 되지 않은 경우, 바로 종료한다.
			if(!loginResultVO.getReplyPosblAt().equals("Y")) {
				System.out.println("##### actionLogin Start loginResultVO.getReplyPosblAt() #####" + loginResultVO.getReplyPosblAt());

				resultMap.put("resultVO", loginResultVO);
				resultMap.put("resultCode", "300");
				resultMap.put("resultMessage", egovMessageSource.getMessage("fail.common.certification"));
				return resultMap;
			}

			String jwtToken = jwtTokenUtil.generateToken(loginVO);
			
			String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
	    	System.out.println("Dec jwtToken username = "+username);
	    	 
	    	//서버사이드 권한 체크 통과를 위해 삽입
	    	//EgovUserDetailsHelper.isAuthenticated() 가 그 역할 수행. DB에 정보가 없으면 403을 돌려 줌. 로그인으로 튕기는 건 프론트 쪽에서 처리
	    	request.getSession().setAttribute("LoginVO", loginResultVO);
	    	
			resultMap.put("resultVO", loginResultVO);
			resultMap.put("jToken", jwtToken);
			resultMap.put("resultCode", "200");
			resultMap.put("resultMessage", "성공 !!!");
			
		} else {
			resultMap.put("resultVO", loginResultVO);
			resultMap.put("resultCode", "300");
			resultMap.put("resultMessage", egovMessageSource.getMessage("fail.common.login"));
		}
		
		return resultMap;
	}

	/**
	 * 로그아웃한다.
	 * @return resultVO
	 * @exception Exception
	 */
	@GetMapping(value = "/uat/uia/actionLogoutAPI.do")
	public ResultVO actionLogoutJSON(HttpServletRequest request) throws Exception {
		ResultVO resultVO = new ResultVO();

		RequestContextHolder.currentRequestAttributes().removeAttribute("LoginVO", RequestAttributes.SCOPE_SESSION);

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

		return resultVO;
	}
	
	/**
	 * 로그인 정보를 등록한다.
	 *
	 * @param LoginVO
	 * @param loginVO
	 * @param sessionVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/uat/uia/insertLoginAPI.do")
	@ResponseBody
	public ResultVO insertLogin(final MultipartHttpServletRequest multiRequest,
		LoginVO loginVO,
		BindingResult bindingResult)
		throws Exception {
		ResultVO resultVO = new ResultVO();

		System.out.println("##### ResultVO insertLogin Start test1 #####");
		
		System.out.println("##### ResultVO insertLogin Start test1 name #####"+loginVO.getName());

		Boolean isAuthenticated = true;

		System.out.println("##### ResultVO insertLogin Start test2 #####");
		beanValidator.validate(loginVO, bindingResult);
		if (bindingResult.hasErrors()) {
			resultVO.setResultCode(ResponseCode.INPUT_CHECK_ERROR.getCode());
			resultVO.setResultMessage(ResponseCode.INPUT_CHECK_ERROR.getMessage());

			System.out.println("##### ResultVO insertLogin Start test3 #####");

			return resultVO;
		}

		// 김평권 추가 전자정부3.10 참조
		// 미인증 사용자에 대한 보안처리
//		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
//		if (!isAuthenticated) {
//			System.out.println("##### ResultVO isAuthenticated Start test3 #####");
//			HashMap<String, Object> resultMap = new HashMap<String, Object>();
//			resultMap.put("resultVO", resultVO);
//			resultMap.put("resultCode", "300");
//			resultMap.put("resultMessage", egovMessageSource.getMessage("fail.common.login"));
//			return resultVO;
//		}

		if (isAuthenticated) {
			System.out.println("##### ResultVO insertLogin Start test3 isAuthenticated #####");

			//필수체크
			if(loginVO.getEmail() == null || loginVO.getName()== null || loginVO.getPassword()== null  
					|| loginVO.getPasswordCnsr()== null  
					|| loginVO.getIhidNum()== null  
					|| loginVO.getEmail().isEmpty() || loginVO.getName().isEmpty() || loginVO.getPassword().isEmpty() 
					|| loginVO.getPasswordCnsr().isEmpty() 
					|| loginVO.getIhidNum().isEmpty()) 
			{
				resultVO.setResultCode(ResponseCode.INPUT_CHECK_NOT_EMPTY.getCode());
				resultVO.setResultMessage(ResponseCode.INPUT_CHECK_NOT_EMPTY.getMessage());

				return resultVO;
				
			}
			
			//패스워드 확인체크
			if(!loginVO.getPassword().equals(loginVO.getPasswordCnsr())) 
			{
				resultVO.setResultCode(ResponseCode.INPUT_CHECK_PASSWORD.getCode());
				resultVO.setResultMessage(ResponseCode.INPUT_CHECK_PASSWORD.getMessage());

				return resultVO;
			}

			//중복 ID체크(서버체크)
			LoginVO loginResultVO = loginService.searchId(loginVO); 
			if(loginResultVO != null && loginResultVO.getId() != null) 
			{
				System.out.println("##### insertLogin Start loginService.searchId() #####" + loginResultVO.getId());

				resultVO.setResultCode(ResponseCode.INPUT_CHECK_DOUBLE.getCode());
				resultVO.setResultMessage(ResponseCode.INPUT_CHECK_DOUBLE.getMessage());

				return resultVO;
				
			};

			// 정규표현
			//https://coding-factory.tistory.com/529
	           //String pattern = "^[0-9]*$"; //숫자만
	           //String val = "123456789"; //대상문자열
	        
	            //boolean regex = Pattern.matches(pattern, val);
	            //System.out.println(regex);
	
			//https://dev-panda.tistory.com/5
			//1. 영문대소문자 포함여부 확인하는 정규표현식

	           //String pattern = "(?=.*?[a-z])(?=.*?[A-Z])"; 
			//https://jamesdreaming.tistory.com/195
			//https://dev-panda.tistory.com/5
			// 숫자, 영문대소문자, 8자-20자
	           //String pattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$"; 
			// 숫자, 영문대소문자, 특수문자, 8자-12자 TEST
	           String pattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&+-]).{8,12}$"; 
	        
	           boolean regex = Pattern.matches(pattern, loginVO.getPassword());
				if(regex == false) 
				{
					System.out.println("##### insertLogin Start INPUT_CHECK_ENG_BIG_SMALL #####" + loginVO.getPassword());

					resultVO.setResultCode(ResponseCode.INPUT_CHECK_ENG_BIG_SMALL_LEN_8_12.getCode());
					resultVO.setResultMessage(ResponseCode.INPUT_CHECK_ENG_BIG_SMALL_LEN_8_12.getMessage());

					return resultVO;
					
				};
		
			
			//loginVO.setNtcrNm(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			//loginVO.setPassword(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			// board.setNttCn(unscript(board.getNttCn())); // XSS 방지

			// 1. 입력한 비밀번호를 암호화한다.
			String enpassword = EgovFileScrty.encryptPassword(loginVO.getPassword(), loginVO.getEmail());
			loginVO.setPassword(enpassword);

			System.out.println("##### ResultVO insertLogin Start test name 0224 #####"+ loginVO.getPassword());
			loginService.insertLogin(loginVO);
		}

		System.out.println("##### ResultVO insertLogin Start test5 kpg again again 222#####");

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		return resultVO;
	}

	/**
	 * 로그인 정보를 수정한다.
	 *
	 * @param LoginVO
	 * @param loginVO
	 * @param sessionVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/uat/uia/updateLoginAPI.do")
	@ResponseBody
	public ResultVO updateLogin(final MultipartHttpServletRequest multiRequest,
		LoginVO loginVO,
		BindingResult bindingResult)
		throws Exception {
		ResultVO resultVO = new ResultVO();

		System.out.println("##### ResultVO updateLogin Start test1 #####");
		
		System.out.println("##### ResultVO updateLogin Start test1 name #####"+loginVO.getName());

		Boolean isAuthenticated = true;

		System.out.println("##### ResultVO updateLogin Start test2 #####");
		beanValidator.validate(loginVO, bindingResult);
		if (bindingResult.hasErrors()) {
			resultVO.setResultCode(ResponseCode.INPUT_CHECK_ERROR.getCode());
			resultVO.setResultMessage(ResponseCode.INPUT_CHECK_ERROR.getMessage());

			System.out.println("##### ResultVO updateLogin Start test3 #####");

			return resultVO;
		}

		// 김평권 추가 전자정부3.10 참조
		// 미인증 사용자에 대한 보안처리
//		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
//		if (!isAuthenticated) {
//			System.out.println("##### ResultVO isAuthenticated Start test3 #####");
//			HashMap<String, Object> resultMap = new HashMap<String, Object>();
//			resultMap.put("resultVO", resultVO);
//			resultMap.put("resultCode", "300");
//			resultMap.put("resultMessage", egovMessageSource.getMessage("fail.common.login"));
//			return resultVO;
//		}

		if (isAuthenticated) {
			System.out.println("##### ResultVO updateLogin Start test3 isAuthenticated #####");
			
			//필수체크 Smart aquaform_v0.9_1022 여기서는 3군데 체크
			if(loginVO.getEmail() == null || loginVO.getPassword()== null  
					|| loginVO.getPasswordCnsr()== null 
					|| loginVO.getName()== null 
					|| loginVO.getIhidNum()== null  
					|| loginVO.getEmail().isEmpty() || loginVO.getPassword().isEmpty() 
					|| loginVO.getPasswordCnsr().isEmpty()  
					|| loginVO.getName().isEmpty()  
					|| loginVO.getIhidNum().isEmpty() ) 
			{
				resultVO.setResultCode(ResponseCode.INPUT_CHECK_NOT_EMPTY.getCode());
				resultVO.setResultMessage(ResponseCode.INPUT_CHECK_NOT_EMPTY.getMessage());

				return resultVO;
				
			}
			
			//패스워드 확인체크
			if(!loginVO.getPassword().equals(loginVO.getPasswordCnsr())) 
			{
				resultVO.setResultCode(ResponseCode.INPUT_CHECK_PASSWORD.getCode());
				resultVO.setResultMessage(ResponseCode.INPUT_CHECK_PASSWORD.getMessage());

				return resultVO;
			}
			//INPUT_CHECK_NEW_OLD_PASSWORD(996, "현재비번과 새비번이 같습니다."),
			if(loginVO.getPassword().equals(loginVO.getPasswordHint())) 
			{
				resultVO.setResultCode(ResponseCode.INPUT_CHECK_NEW_OLD_PASSWORD.getCode());
				resultVO.setResultMessage(ResponseCode.INPUT_CHECK_NEW_OLD_PASSWORD.getMessage());

				return resultVO;
			}

			//없는 ID체크(서버체크)
			LoginVO loginResultVO = loginService.searchId(loginVO); 
			if(loginResultVO != null && loginResultVO.getId() == null) 
			{
				System.out.println("##### updateLogin Start loginService.searchId() #####" + loginResultVO.getId());

				resultVO.setResultCode(ResponseCode.INPUT_CHECK_EMPTY.getCode());
				resultVO.setResultMessage(ResponseCode.INPUT_CHECK_EMPTY.getMessage());

				return resultVO;
				
			};
			//INPUT_CHECK_NOW_PASSWORD(996, "현재 비밀번호가 다릅니다.");
			// Smart aquaform_v0.9_1022  체크 불필요
//			if(loginResultVO != null && loginResultVO.getId() != null) 
//			{
//				System.out.println("##### updateLogin Start loginResultVO.getId() #####" + loginResultVO.getId());
//				// 1. 입력한 현재비밀번호를 암호화한다.
//				//String enpassword = EgovFileScrty.encryptPassword(loginVO.getPasswordHint(), loginVO.getEmail());
//
//				// 2. 아이디와 암호화된 비밀번호가 DB와 일치하는지 확인한다.
//                // actionLogin과는 별개처리
//				LoginVO result2VO = loginService.actionLoginUpdate(loginVO);
//
//				boolean loginPolicyYn = true;
//
//				if (result2VO != null && result2VO.getId() != null && !result2VO.getId().equals("")
//					&& loginPolicyYn) {
//					System.out.println("##### updateLogin Start loginService.actionLoginUpdate #####" + loginResultVO.getId());
//
//				} else {
//
//						resultVO.setResultCode(ResponseCode.INPUT_CHECK_NOW_PASSWORD.getCode());
//						resultVO.setResultMessage(ResponseCode.INPUT_CHECK_NOW_PASSWORD.getMessage());
//						return resultVO;
//				}
//
//			}

		};


			// 정규표현
			//https://coding-factory.tistory.com/529
	           //String pattern = "^[0-9]*$"; //숫자만
	           //String val = "123456789"; //대상문자열
	        
	            //boolean regex = Pattern.matches(pattern, val);
	            //System.out.println(regex);
	
			//https://dev-panda.tistory.com/5
			//1. 영문대소문자 포함여부 확인하는 정규표현식

	           //String pattern = "(?=.*?[a-z])(?=.*?[A-Z])"; 
			//https://jamesdreaming.tistory.com/195
			//https://dev-panda.tistory.com/5
			// 숫자, 영문대소문자, 8자-20자
	           //String pattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$"; 
			// 숫자, 영문대소문자, 특수문자, 8자-12자 TEST
	           String pattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&+-]).{8,12}$"; 
	        
	           	boolean regex = Pattern.matches(pattern, loginVO.getPassword());
				if(regex == false) 
				{
					System.out.println("##### updateLogin Start INPUT_CHECK_ENG_BIG_SMALL #####" + loginVO.getPassword());

					resultVO.setResultCode(ResponseCode.INPUT_CHECK_ENG_BIG_SMALL_LEN_8_12.getCode());
					resultVO.setResultMessage(ResponseCode.INPUT_CHECK_ENG_BIG_SMALL_LEN_8_12.getMessage());

					return resultVO;
					
				};
		
			
			//loginVO.setNtcrNm(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			//loginVO.setPassword(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			// board.setNttCn(unscript(board.getNttCn())); // XSS 방지

				// 1. 입력한 비밀번호를 암호화한다.
				String enpassword = EgovFileScrty.encryptPassword(loginVO.getPassword(), loginVO.getEmail());
				loginVO.setPassword(enpassword);


		System.out.println("##### ResultVO updateLogin Start test name 0224 #####"+ loginVO.getPassword());
		//비번변경 updatePwLogin
		loginService.updatePwLogin(loginVO);

		System.out.println("##### ResultVO updateLogin Start test5 kpg again again 222#####");

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		return resultVO;
	}

	/**
	 * 게시물 로그인에 대한 목록을 조회한다.
	 *
	 * @param loginVO
	 * @param sessionVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/uat/uia/selectBoardLoginListAPI.do", consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResultVO selectBoardLoginArticles(@RequestBody LoginVO loginVO)
		throws Exception {
		
		System.out.println("##### EgovLoginAPIController selectBoardLoginArticles Start #####");

		ResultVO resultVO = new ResultVO();

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		BoardMasterVO vo = new BoardMasterVO();
		vo.setBbsId(loginVO.getBbsId());
		vo.setUniqId(user.getUniqId());

		BoardMasterVO master = bbsAttrbService.selectBBSMasterInf(vo);

		System.out.println("##### EgovLoginAPIController selectBoardLoginArticles Start2 #####");

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(loginVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(propertyService.getInt("pageUnit"));
		paginationInfo.setPageSize(propertyService.getInt("pageSize"));

		loginVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		loginVO.setLastIndex(paginationInfo.getLastRecordIndex());
		loginVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		Map<String, Object> resultMap = loginService.selectBoardLoginArticles(loginVO, vo.getBbsAttrbCode());

		int totCnt = Integer.parseInt((String)resultMap.get("resultCnt"));
		paginationInfo.setTotalRecordCount(totCnt);

//		resultMap.put("boardVO", loginVO);
		resultMap.put("loginVO", loginVO);
		resultMap.put("brdMstrVO", master);
		resultMap.put("paginationInfo", paginationInfo);
		resultMap.put("user", user);

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		resultVO.setResult(resultMap);

		System.out.println("##### EgovLoginAPIController selectBoardLoginArticles End #####");

		return resultVO;
	}

	/**
	 * 게시물 로그인에 대한 상세 정보를 조회한다.
	 *
	 * @param loginVO
	 * @param sessionVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/uat/uia/selectBoardLoginArticleAPI.do")
	@ResponseBody
	public ResultVO selectBoardArticle(@RequestBody LoginVO loginVO)
		throws Exception {

		ResultVO resultVO = new ResultVO();

		System.out.println("##### EgovLoginAPIController selectBoardArticle loginVO #####" + loginVO.getEmail());

		LoginVO user = new LoginVO();
		if (EgovUserDetailsHelper.isAuthenticated()) {
			user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		}

		// 조회수 증가 여부 지정
		loginVO.setPlusCount(true);

		//---------------------------------
		// 2009.06.29 : 2단계 기능 추가
		//---------------------------------
		if (!loginVO.getSubPageIndex().equals("")) {
			loginVO.setPlusCount(false);
		}
		////-------------------------------

		loginVO.setLastUpdusrId(user.getUniqId());
		LoginVO vo = loginService.selectBoardLoginArticle(loginVO);

		//----------------------------
		// template 처리 (기본 BBS template 지정  포함)
		//----------------------------
		BoardMasterVO master = new BoardMasterVO();

		master.setBbsId(loginVO.getBbsId());
		master.setUniqId(user.getUniqId());

		BoardMasterVO masterVo = bbsAttrbService.selectBBSMasterInf(master);

		if (masterVo.getTmplatCours() == null || masterVo.getTmplatCours().equals("")) {
			masterVo.setTmplatCours("/css/egovframework/cop/bbs/egovBaseTemplate.css");
		}
		//model.addAttribute("brdMstrVO", masterVo);

		Map<String, Object> resultMap = new HashMap<String, Object>();
		//resultMap.put("boardVO", vo);
		resultMap.put("loginVO", vo);
		resultMap.put("sessionUniqId", user.getUniqId());
		resultMap.put("brdMstrVO", masterVo);
		resultMap.put("user", user);

		// 2021-06-01 신용호 추가
		// 첨부파일 확인
//		if (vo != null && vo.getAtchFileId() != null && !vo.getAtchFileId().isEmpty()) {
//			FileVO fileVO = new FileVO();
//			fileVO.setAtchFileId(vo.getAtchFileId());
//			List<FileVO> resultFiles = fileService.selectFileInfs(fileVO);
//			resultMap.put("resultFiles", resultFiles);
//		}

		resultVO.setResult(resultMap);
		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		return resultVO;
	}

	/**
	 * 게시물 로그인에 대한 내용을 수정한다.
	 *
	 * @param loginVO
	 * @param sessionVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/uat/uia/updateBoardLoginArticleAPI.do")
	@ResponseBody
	public ResultVO updateBoardLoginArticle(final MultipartHttpServletRequest multiRequest,
			LoginVO loginVO,
		BindingResult bindingResult)
		throws Exception {
		ResultVO resultVO = new ResultVO();

		// 사용자권한 처리
		//LoginVO user = new LoginVO();
		//user.setUniqId("USRCNFRM_00000000000");
		Boolean isAuthenticated = true;

		System.out.println("##### EgovLoginAPIController updateBoardLoginArticle loginVO #####" + loginVO.getEmail());

		//		String atchFileId = boardVO.getAtchFileId();

		beanValidator.validate(loginVO, bindingResult);
		if (bindingResult.hasErrors()) {

			resultVO.setResultCode(ResponseCode.INPUT_CHECK_ERROR.getCode());
			resultVO.setResultMessage(ResponseCode.INPUT_CHECK_ERROR.getMessage());

			return resultVO;
		}

		if (isAuthenticated) {
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
//			if (!files.isEmpty()) {
//				if ("".equals(atchFileId)) {
//					List<FileVO> result = fileUtil.parseFileInf(files, "BBS_", 0, atchFileId, "");
//					atchFileId = fileMngService.insertFileInfs(result);
//					boardVO.setAtchFileId(atchFileId);
//				} else {
//					FileVO fvo = new FileVO();
//					fvo.setAtchFileId(atchFileId);
//					int cnt = fileMngService.getMaxFileSN(fvo);
//					List<FileVO> _result = fileUtil.parseFileInf(files, "BBS_", cnt, atchFileId, "");
//					fileMngService.updateFileInfs(_result);
//				}
//			}

			//loginVO.setLastUpdusrId(user.getUniqId());

			loginVO.setNtcrNm(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			loginVO.setPassword(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			//loginVO.setNttCn(unscript(loginVO.getNttCn())); // XSS 방지

			loginService.updateBoardLoginArticle(loginVO);
		}

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

		return resultVO;
	}

	/**
	 * 게시물 로그인에 대한 내용을 삭제한다.
	 *
	 * @param boardVO
	 * @param board
	 * @param sessionVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/uat/uia/deleteBoardLoginArticleAPI.do")
	@ResponseBody
	public ResultVO deleteBoardLoginArticle(@RequestBody LoginVO loginVO)

		throws Exception {
		ResultVO resultVO = new ResultVO();

		// 사용자권한 처리
		if (!EgovUserDetailsHelper.isAuthenticated()) {

			resultVO.setResultCode(ResponseCode.AUTH_ERROR.getCode());
			resultVO.setResultMessage(ResponseCode.AUTH_ERROR.getMessage());

			return resultVO;
		}

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			loginVO.setLastUpdusrId(user.getUniqId());

			loginService.deleteBoardLoginArticle(loginVO);
		}

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

		return resultVO;
	}


}