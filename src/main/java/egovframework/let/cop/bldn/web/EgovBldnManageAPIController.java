package egovframework.let.cop.bldn.web;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.ResponseCode;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.cmm.service.ResultVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.let.cop.bbs.service.BoardMasterVO;
import egovframework.let.cop.bbs.service.EgovBBSAttributeManageService;
import egovframework.let.cop.bldn.service.EgovBldnManageService;
import egovframework.let.cop.bldn.service.Board;
import egovframework.let.cop.bldn.service.BoardVO;

import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 게시물 관리를 위한 컨트롤러 클래스
 * 
 * @author 공통 서비스 개발팀 이삼섭
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
 *  2009.06.29  한성곤	       2단계 기능 추가 (댓글관리, 만족도조사)
 *  2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *      </pre>
 */
@Controller
public class EgovBldnManageAPIController {

	@Resource(name = "EgovBldnManageService")
	private EgovBldnManageService bldnMngService;

	/** EgovCmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;

	@Resource(name = "EgovBBSAttributeManageService")
	private EgovBBSAttributeManageService bbsAttrbService;

	@Resource(name = "EgovFileMngService")
	private EgovFileMngService fileMngService;

	@Resource(name = "EgovFileMngUtil")
	private EgovFileMngUtil fileUtil;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;

	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;

	@Resource(name = "EgovFileMngService")
	private EgovFileMngService fileService;

	@Autowired
	private DefaultBeanValidator beanValidator;

	/**
	 * 게시물에 대한 목록을 조회한다.
	 *
	 * @param boardVO
	 * @param sessionVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/cop/bldn/selectBoardListAPI.do", consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResultVO selectBoardArticles(@RequestBody BoardVO boardVO) throws Exception {

		ResultVO resultVO = new ResultVO();

		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

		BoardMasterVO vo = new BoardMasterVO();
		vo.setBbsId(boardVO.getBbsId());
		vo.setUniqId(user.getUniqId());

		BoardMasterVO master = bbsAttrbService.selectBBSMasterInf(vo);

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(boardVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(propertyService.getInt("pageUnit"));
		paginationInfo.setPageSize(propertyService.getInt("pageSize"));

		boardVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		boardVO.setLastIndex(paginationInfo.getLastRecordIndex());
		boardVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		Map<String, Object> resultMap = bldnMngService.selectBoardArticles(boardVO, vo.getBbsAttrbCode());

		int totCnt = Integer.parseInt((String) resultMap.get("resultCnt"));
		paginationInfo.setTotalRecordCount(totCnt);
		
		resultMap.put("boardVO", boardVO);
		resultMap.put("brdMstrVO", master);
		resultMap.put("paginationInfo", paginationInfo);
		resultMap.put("user", user);

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		resultVO.setResult(resultMap);
		
		return resultVO;
	}

	/**
	 * 게시물에 대한 상세 정보를 조회한다.
	 *
	 * @param boardVO
	 * @param sessionVO
	 * @param model
	 * @return
	 * @throws Exception
	 */

	@RequestMapping("/cop/bldn/selectBoardArticleAPI.do")
	@ResponseBody
	public ResultVO selectBoardArticle(@RequestBody BoardVO boardVO, String attrbFlag) throws Exception {

		ResultVO resultVO = new ResultVO();

		LoginVO user = new LoginVO();
		if (EgovUserDetailsHelper.isAuthenticated()) {
			user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		}

		// 조회수 증가 여부 지정
		boardVO.setPlusCount(true);

		// 2009.06.29 : 2단계 기능 추가
		if (!boardVO.getSubPageIndex().equals("")) {
			boardVO.setPlusCount(false);
		}

		BoardVO vo = bldnMngService.selectBoardArticle(boardVO);
		// template 처리 (기본 BBS template 지정 포함)
		BoardMasterVO master = new BoardMasterVO();

		master.setBbsId(boardVO.getBbsId());
		master.setUniqId(user.getUniqId());

		BoardMasterVO masterVo = bbsAttrbService.selectBBSMasterInf(master);

		if (masterVo.getTmplatCours() == null || masterVo.getTmplatCours().equals("")) {
			masterVo.setTmplatCours("/css/egovframework/cop/bbs/egovBaseTemplate.css");
		}
		boardVO.setLastUpdusrId(user.getName());
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("boardVO", vo);
		resultMap.put("sessionUniqId", user.getUniqId());
		resultMap.put("brdMstrVO", masterVo);
		resultMap.put("user", user);

		// 첨부파일 확인
		if (vo != null && vo.getAtchFileId() != null && !vo.getAtchFileId().isEmpty()) {
			FileVO fileVO = new FileVO();
			fileVO.setAtchFileId(vo.getAtchFileId());
			List<FileVO> resultFiles = fileService.selectFileInfs(fileVO);
			resultMap.put("resultFiles", resultFiles);
		}

		resultVO.setResult(resultMap);
		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		return resultVO;
	}
	
	/*
	 * 수정용 상세보기
	 * 
	 * */
	@RequestMapping("/cop/bldn/insertSelectBoardArticleAPI.do")
	@ResponseBody
	public ResultVO insertSelectBoardArticle(@RequestBody BoardVO boardVO) throws Exception {

		ResultVO resultVO = new ResultVO();

		LoginVO user = new LoginVO();
		if (EgovUserDetailsHelper.isAuthenticated()) {
			user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		}

		// 조회수 증가 여부 지정
		boardVO.setPlusCount(true);

		// 2009.06.29 : 2단계 기능 추가
		if (!boardVO.getSubPageIndex().equals("")) {
			boardVO.setPlusCount(false);
		}

		boardVO.setLastUpdusrId(user.getUniqId());
		BoardVO vo = bldnMngService.insertSelectBoardArticle(boardVO);

		// template 처리 (기본 BBS template 지정 포함)
		BoardMasterVO master = new BoardMasterVO();

		master.setBbsId(boardVO.getBbsId());
		master.setUniqId(user.getUniqId());

		BoardMasterVO masterVo = bbsAttrbService.selectBBSMasterInf(master);

		if (masterVo.getTmplatCours() == null || masterVo.getTmplatCours().equals("")) {
			masterVo.setTmplatCours("/css/egovframework/cop/bbs/egovBaseTemplate.css");
		}

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("boardVO", vo);
		resultMap.put("sessionUniqId", user.getUniqId());
		resultMap.put("brdMstrVO", masterVo);
		resultMap.put("user", user);

		// 첨부파일 확인
		if (vo != null && vo.getAtchFileId() != null && !vo.getAtchFileId().isEmpty()) {
			FileVO fileVO = new FileVO();
			fileVO.setAtchFileId(vo.getAtchFileId());
			List<FileVO> resultFiles = fileService.selectFileInfs(fileVO);
			resultMap.put("resultFiles", resultFiles);
		}

		resultVO.setResult(resultMap);
		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		return resultVO;
	}

	/**
	 * 게시물에 대한 내용을 수정한다.
	 *
	 * @param boardVO
	 * @param board
	 * @param sessionVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	
	@RequestMapping("/cop/bldn/updateBoardArticleAPI.do")
	@ResponseBody
	public ResultVO updateBoardArticle(final MultipartHttpServletRequest multiRequest, BoardVO boardVO,	BindingResult bindingResult) throws Exception {
		
		ResultVO resultVO = new ResultVO();
		
		//로그인한 사용자 정보
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		
		Boolean isAuthenticated = true;
		beanValidator.validate(boardVO, bindingResult);
		if (bindingResult.hasErrors()) {

			resultVO.setResultCode(ResponseCode.INPUT_CHECK_ERROR.getCode());
			resultVO.setResultMessage(ResponseCode.INPUT_CHECK_ERROR.getMessage());

			return resultVO;
		}
		if (isAuthenticated) {

			// 필수체크
			if (boardVO.getBbsTyACode() == null || boardVO.getBbsTyBCode() == null || boardVO.getBbsTyCCode() == null
					|| boardVO.getBbsTyDCode() == null || boardVO.getBbsTyACode().isEmpty()
					|| boardVO.getBbsTyBCode().isEmpty() || boardVO.getBbsTyCCode().isEmpty()
					|| boardVO.getBbsTyDCode().isEmpty()) {
				resultVO.setResultCode(ResponseCode.INPUT_CHECK_NOT_EMPTY.getCode());
				resultVO.setResultMessage(ResponseCode.INPUT_CHECK_NOT_EMPTY.getMessage());

				return resultVO;
			}
 
		String atchFileId = boardVO.getAtchFileId();

		beanValidator.validate(boardVO, bindingResult);
		if (bindingResult.hasErrors()) {

			resultVO.setResultCode(ResponseCode.INPUT_CHECK_ERROR.getCode());
			resultVO.setResultMessage(ResponseCode.INPUT_CHECK_ERROR.getMessage());

			return resultVO;
		}

		if (isAuthenticated) {
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			if (!files.isEmpty()) {
				if ("".equals(atchFileId)) {
					List<FileVO> result = fileUtil.parseFileInf(files, "BBS_", 0, atchFileId, "");
					atchFileId = fileMngService.insertFileInfs(result);
					boardVO.setAtchFileId(atchFileId);
				} else {
					FileVO fvo = new FileVO();
					fvo.setAtchFileId(atchFileId);
					int cnt = fileMngService.getMaxFileSN(fvo);
					List<FileVO> _result = fileUtil.parseFileInf(files, "BBS_", cnt, atchFileId, "");
					fileMngService.updateFileInfs(_result);
				}
			}

			boardVO.setLastUpdusrId(loginVO.getName());

			
			boardVO.setNtcrNm(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			boardVO.setPassword(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			
			bldnMngService.updateBoardArticle(boardVO);
		}

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		}
		return resultVO;
	}
	 

	/**
	 * 게시물을 등록한다.
	 *
	 * @param boardVO
	 * @param board
	 * @param sessionVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/cop/bldn/insertBoardArticleAPI.do")
	@ResponseBody
	public ResultVO insertBoardArticle(final MultipartHttpServletRequest multiRequest, BoardVO boardVO, BindingResult bindingResult, HttpServletResponse response) throws Exception {

		ResultVO resultVO = new ResultVO();
		Map<String, Object> resultMap = new HashMap<String, Object>();

		//로그인한 사용자 정보
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = true;

		
		if (isAuthenticated) {

			// 필수체크
			if (boardVO.getBbsTyACode() == null || boardVO.getBbsTyBCode() == null || boardVO.getBbsTyCCode() == null
					|| boardVO.getBbsTyDCode() == null || boardVO.getBbsTyACode().isEmpty()
					|| boardVO.getBbsTyBCode().isEmpty() || boardVO.getBbsTyCCode().isEmpty()
					|| boardVO.getBbsTyDCode().isEmpty()) {
				resultVO.setResultCode(ResponseCode.INPUT_CHECK_NOT_EMPTY.getCode());
				resultVO.setResultMessage(ResponseCode.INPUT_CHECK_NOT_EMPTY.getMessage());

				return resultVO;
			}
			List<FileVO> result = null;
			String atchFileId = "";

			ComDefaultCodeVO vo = new ComDefaultCodeVO();
			vo.setCodeId("BUS007");

			List<?> codeResult = cmmUseService.selectCmmCodeDetail(vo); // 공통코드조회

			resultMap.put("typeList", codeResult);

			resultVO.setResult(resultMap);

			codeResult = cmmUseService.selectCmmCodeDetail(vo);

			resultMap.put("attrbList", codeResult);

			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			// textarea이나 첨부파일을 입력하세요.
			if(files.isEmpty()) {

				//csv 정보가 있는 곳.
				String tmpstr;
				tmpstr = boardVO.getNttCn();
				String[] resultTmp = tmpstr.split("\n");
				
				String[] resultTmp0 = resultTmp[0].split(",");

				int resultCount = resultTmp0.length;
				
				if(resultCount == 0) {
					resultVO.setResultCode(ResponseCode.INPUT_CHECK_INSERT_EMPTY.getCode());
					resultVO.setResultMessage(ResponseCode.INPUT_CHECK_INSERT_EMPTY.getMessage());

					return resultVO;
				}
				if(resultCount >= 1) {
					if(resultTmp0[0] == null || resultTmp0[0].isEmpty()) {
						resultVO.setResultCode(ResponseCode.INPUT_CHECK_INSERT_EMPTY.getCode());
						resultVO.setResultMessage(ResponseCode.INPUT_CHECK_INSERT_EMPTY.getMessage());

						return resultVO;
					}
				}
			}

			if (!files.isEmpty()) {
				result = fileUtil.parseFileInf(files, "BBS_", 0, "", "");
				atchFileId = fileMngService.insertFileInfs(result);
			}

			boardVO.setAtchFileId(atchFileId);
			boardVO.setFrstRegisterId(loginVO.getName()); //해당부분 수정
			boardVO.setBbsId(boardVO.getBbsId());

			bldnMngService.insertBoardArticle(boardVO);
			boardVO.setNtcrNm(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			boardVO.setPassword(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)

		}
			return resultVO;
	}

	/**
	 * 게시물에 대한 내용을 삭제한다. 
	 *
	 * @param boardVO
	 * @param board
	 * @param sessionVO
	 * @param model
	 * @return
	 * @throws Exception
	 */
	
	@RequestMapping("/cop/bldn/deleteBoardArticleAPI.do")
	@ResponseBody
	public ResultVO deleteBoardArticle(@RequestBody BoardVO boardVO)

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
			boardVO.setLastUpdusrId(user.getUniqId());

			bldnMngService.deleteBoardArticle(boardVO);
		}

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

		return resultVO;
	}
	
	/**
	 * 주소용 상세보기
	 * */
	@RequestMapping(value = "/cop/bldn/jusoDetail.do", consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResultVO selectBoardArticleListJuso(@RequestBody BoardVO boardVO, String attrbFlag) throws Exception {

		ResultVO resultVO = new ResultVO();

		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

		BoardMasterVO vo = new BoardMasterVO();
		vo.setBbsId(boardVO.getBbsId());
		vo.setUniqId(user.getUniqId());

		BoardMasterVO master = bbsAttrbService.selectBBSMasterInf(vo);

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(boardVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(propertyService.getInt("pageUnit"));
		paginationInfo.setPageSize(propertyService.getInt("pageSize"));

		boardVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		boardVO.setLastIndex(paginationInfo.getLastRecordIndex());
		boardVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		Map<String, Object> resultMap = bldnMngService.selectBoardArticleJuso(boardVO, attrbFlag);

		int totCnt = Integer.parseInt((String) resultMap.get("resultCnt"));
		paginationInfo.setTotalRecordCount(totCnt);
		
		resultMap.put("boardVO", boardVO);
		resultMap.put("brdMstrVO", master);
		resultMap.put("paginationInfo", paginationInfo);
		resultMap.put("user", user);
		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		resultVO.setResult(resultMap);

		return resultVO;
	}
	
	/**
	 * 주소 수정
	 * */
	@RequestMapping("cop/bldn/deleteBoardArticleAPI2.do")
	@ResponseBody
	public ResultVO updateBoardArticleJuso(@RequestBody BoardVO boardVO, Board board)
			throws Exception {

		ResultVO resultVO = new ResultVO();

		// 사용자권한 처리
		if (!EgovUserDetailsHelper.isAuthenticated()) {

			resultVO.setResultCode(ResponseCode.AUTH_ERROR.getCode());
			resultVO.setResultMessage(ResponseCode.AUTH_ERROR.getMessage());

			return resultVO;

		}

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = true;

		if (isAuthenticated) {
			boardVO.setFrstRegisterId(user.getName());

			
			bldnMngService.updateBoardArticleJuso(boardVO);
		}

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

		return resultVO;
	}
	
	//주소정제
	@RequestMapping(value = "/cop/bldn/jusoCvtDetail.do", method= {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
    public ResultVO jusoCvtDetail(@RequestBody BoardVO boardVO, BindingResult bindingResult, HttpServletResponse response) throws Exception {
		
		ResultVO resultVO = new ResultVO();

        List<BoardVO> resultMap = bldnMngService.selectBoardArticleJusoCvt(boardVO);
        int totCnt = resultMap.size();
		//로그인한 사용자 정보
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

        for(int detailcnt =0; detailcnt < totCnt; detailcnt ++) {
        	boardVO.setDtlId(resultMap.get(detailcnt).getDtlId());
			boardVO.setFrstRegisterId(loginVO.getName()); //해당부분 수정

		    String currentPage = "1";    //요청 변수 설정 (현재 페이지. currentPage : n > 0)
			String countPerPage = "1";  //10, 요청 변수 설정 (페이지당 출력 개수. countPerPage 범위 : 0 < n <= 100)
			String resultType = "json";      //요청 변수 설정 (검색결과형식 설정, json)
			String confmKey = "devU01TX0FVVEgyMDIzMDMxNTExMDM0NDExMzU5NDg=";          //요청 변수 설정 (승인키)
			String keyword = "";
			
			if(resultMap.get(detailcnt).getRoadBaseAd() != null && !resultMap.get(detailcnt).getRoadBaseAd().isEmpty()) {
				keyword = keyword + resultMap.get(detailcnt).getRoadBaseAd();
			}  
			if(resultMap.get(detailcnt).getRoadBaseA() != null && !resultMap.get(detailcnt).getRoadBaseA().isEmpty()) {
				keyword = keyword + " " + resultMap.get(detailcnt).getRoadBaseA();
			}  
			if(resultMap.get(detailcnt).getRoadBaseB() != null && !resultMap.get(detailcnt).getRoadBaseB().isEmpty()) {
				keyword = keyword + " " + resultMap.get(detailcnt).getRoadBaseB();
			}  
			if(resultMap.get(detailcnt).getRoadBaseC() != null && !resultMap.get(detailcnt).getRoadBaseC().isEmpty()) {
				keyword = keyword + " " + resultMap.get(detailcnt).getRoadBaseC();
			}  
			if(resultMap.get(detailcnt).getRoadBaseD() != null && !resultMap.get(detailcnt).getRoadBaseD().isEmpty()) {
				keyword = keyword + " "  + resultMap.get(detailcnt).getRoadBaseD();
			}  

		// OPEN API 호출 URL 정보 설정
			String apiUrl = "https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage="+currentPage+"&countPerPage="+countPerPage+"&keyword="+URLEncoder.encode(keyword,"UTF-8")+"&confmKey="+confmKey+"&resultType="+resultType;
			URL url = new URL(apiUrl);
	    	BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream(),"UTF-8"));
	    	StringBuffer sb = new StringBuffer();
	    	String tempStr = null;
	    	

        }

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

		return resultVO;
	
	}	

	//전체 발급완료 처리
	@RequestMapping(value = "/cop/bldn/jusoCompDetail.do", method= {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
    public ResultVO jusoCompDetail(@RequestBody BoardVO boardVO, BindingResult bindingResult, HttpServletResponse response) throws Exception {
		
	
		ResultVO resultVO = new ResultVO();

		//로그인한 사용자 정보
		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		boardVO.setFrstRegisterId(user.getName());
		boardVO.setState("1"); // 전체발급
		bldnMngService.updateJusoCompDetail(boardVO);


		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

		return resultVO;
	
	}	

	
	//전체 미발급 처리
	@RequestMapping(value = "/cop/bldn/jusoAllNoIssDetail.do", method= {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
    public ResultVO jusoAllNoIssDetail(@RequestBody BoardVO boardVO, BindingResult bindingResult, HttpServletResponse response) throws Exception {
		
		ResultVO resultVO = new ResultVO();

		//로그인한 사용자 정보
		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		boardVO.setFrstRegisterId(user.getName());
		boardVO.setState("0"); // 미발급
		bldnMngService.updateJusoCompDetail(boardVO);


		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

		return resultVO;
	
	}	
	
	//선택 미발급 처리
	@RequestMapping(value = "/cop/bldn/jusoNoIssDetail.do", method= {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
    public ResultVO jusoNoIssDetail(@RequestBody BoardVO boardVO, BindingResult bindingResult, HttpServletResponse response) throws Exception {
		
		ResultVO resultVO = new ResultVO();

		if(boardVO.getCheckedList().length() < 2) {
			resultVO.setResultCode(ResponseCode.INPUT_CHECK_LIST_EMPTY.getCode());
			resultVO.setResultMessage(ResponseCode.INPUT_CHECK_LIST_EMPTY.getMessage());
			return resultVO;
		}
		//마지막 콤마 제거 , 예 "10,11,"-->>"10,11"
		String tmpDtl = boardVO.getCheckedList().substring(0, boardVO.getCheckedList().length() - 1 );
		String tmpDtlId[] = tmpDtl.split(",");
		int totCnt = tmpDtlId.length;

		//로그인한 사용자 정보
		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		boardVO.setFrstRegisterId(user.getName());

        for(int cnt=0; cnt < totCnt; cnt++) {
        	
			boardVO.setState("0"); // 미발급
			boardVO.setDtlId(tmpDtlId[cnt]); // 해당 dtlId
			bldnMngService.updateJusoCompDetailDtl(boardVO);
        }


		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

		return resultVO;
	
	}	
	
	/**
	 * 주소용 삭제
	 * */
	@RequestMapping("/cop/bldn/jusoDelDetail.do")
	@ResponseBody
	public ResultVO deleteBoardArticleJuso(@RequestBody BoardVO boardVO, Board board)

		throws Exception {
		ResultVO resultVO = new ResultVO();

		// 사용자권한 처리
		if (!EgovUserDetailsHelper.isAuthenticated()) {

			resultVO.setResultCode(ResponseCode.AUTH_ERROR.getCode());
			resultVO.setResultMessage(ResponseCode.AUTH_ERROR.getMessage());

			return resultVO;

		}

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = true;

		if (isAuthenticated) {
			boardVO.setLastUpdusrId(user.getUniqId());

			bldnMngService.deleteBoardArticleJuso(boardVO);
		}

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		return resultVO;
	}
	

}