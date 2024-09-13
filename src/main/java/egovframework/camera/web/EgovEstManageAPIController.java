package egovframework.camera.web;

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
import egovframework.camera.service.EgovEstManageService;
//import egovframework.camera.service.Oper;
import egovframework.camera.service.Board;
import egovframework.camera.service.BoardVO;

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
public class EgovEstManageAPIController {

	@Resource(name = "EgovEstManageService")
	private EgovEstManageService estMngService;
	
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
	@RequestMapping(value = "/cop/est/selectBoardListAPI.do", consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResultVO selectBoardArticles(@RequestBody BoardVO boardVO) throws Exception {

		ResultVO resultVO = new ResultVO();

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

		BoardMasterVO vo = new BoardMasterVO();
		vo.setBbsId(boardVO.getBbsId());
		vo.setFrstRegisterId(user.getName());
				
		BoardMasterVO master = bbsAttrbService.selectBBSMasterInf(vo);

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(boardVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(propertyService.getInt("pageUnit"));
		paginationInfo.setPageSize(propertyService.getInt("pageSize"));

		boardVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		boardVO.setLastIndex(paginationInfo.getLastRecordIndex());
		boardVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		Map<String, Object> resultMap = estMngService.selectBoardArticles(boardVO, vo.getBbsAttrbCode());

		int totCnt = Integer.parseInt((String)resultMap.get("resultCnt"));
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
	
	@RequestMapping("/cop/est/selectBoardArticleAPI.do")
	@ResponseBody
	public ResultVO selectBoardArticle(@RequestBody BoardVO boardVO) throws Exception {

		ResultVO resultVO = new ResultVO();

		LoginVO user = new LoginVO();
		if (EgovUserDetailsHelper.isAuthenticated()) {
			user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		}

		// 조회수 증가 여부 지정
		boardVO.setPlusCount(true);

		// 2009.06.29 : 2단계 기능 추가
		if (!boardVO.getSubPageIndex().equals("")) {
			boardVO.setPlusCount(false);
		}
		
		BoardVO vo = estMngService.selectBoardArticle(boardVO);
		// template 처리 (기본 BBS template 지정  포함)
		BoardMasterVO master = new BoardMasterVO();

		master.setBbsId(boardVO.getBbsId());
		master.setFrstRegisterNm(user.getName());

		BoardMasterVO masterVo = bbsAttrbService.selectBBSMasterInf(master);

//		if (masterVo.getTmplatCours() == null || masterVo.getTmplatCours().equals("")) {
//			masterVo.setTmplatCours("/css/egovframework/cop/bbs/egovBaseTemplate.css");
//		}
		master.setFrstRegisterNm(user.getName());
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("boardVO", vo);
		resultMap.put("sessionUniqId", user.getUniqId());
		resultMap.put("brdMstrVO", masterVo);
		resultMap.put("user", user);

		// 첨부파일 확인
		//if (vo != null && vo.getAtchFileId() != null && !vo.getAtchFileId().isEmpty()) {
		//	FileVO fileVO = new FileVO();
		//	fileVO.setAtchFileId(vo.getAtchFileId());
		//	List<FileVO> resultFiles = fileService.selectFileInfs(fileVO);
		//	resultMap.put("resultFiles", resultFiles);
		//}

		resultVO.setResult(resultMap);
		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		return resultVO;
	}
	
	/*
	 * 수정용 상세보기
	 * 
	 * */
	@RequestMapping(value = "/cop/est/selectBoardArticle2API.do", method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public ResultVO selectBoardArticle2(@RequestBody BoardVO boardVO, BindingResult bindingResult) throws Exception {
		
		ResultVO resultVO = new ResultVO();

		LoginVO user = new LoginVO();
		if (EgovUserDetailsHelper.isAuthenticated()) {
			user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		}
		
		// 조회수 증가 여부 지정
		boardVO.setPlusCount(true);

		// 2009.06.29 : 2단계 기능 추가
		if (!boardVO.getSubPageIndex().equals("")) {
			boardVO.setPlusCount(false);
		}

		boardVO.setFrstRegisterId(user.getUniqId());
		BoardVO vo = estMngService.selectBoardArticle2(boardVO);

		// template 처리 (기본 BBS template 지정 포함)
		BoardMasterVO master = new BoardMasterVO();

		master.setBbsId(boardVO.getBbsId());
		master.setUniqId(user.getUniqId());

//		BoardMasterVO masterVo = bbsAttrbService.selectBBSMasterInf(master);

//		if (masterVo.getTmplatCours() == null || masterVo.getTmplatCours().equals("")) {
//			masterVo.setTmplatCours("/css/egovframework/cop/bbs/egovBaseTemplate.css");
//		}

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("boardVO", vo);
		resultMap.put("sessionUniqId", user.getUniqId());
//		resultMap.put("brdMstrVO", masterVo);
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
	
	@RequestMapping("/cop/est/updateBoardArticleAPI.do")
	@ResponseBody
	public ResultVO updateBoardArticle(final MultipartHttpServletRequest multiRequest, BoardVO boardVO, BindingResult bindingResult) throws Exception {
		
		ResultVO resultVO = new ResultVO();

		//로그인한 사용자 정보
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		beanValidator.validate(boardVO, bindingResult);
		if (bindingResult.hasErrors()) {

			resultVO.setResultCode(ResponseCode.INPUT_CHECK_ERROR.getCode());
			resultVO.setResultMessage(ResponseCode.INPUT_CHECK_ERROR.getMessage());

			return resultVO;
		}
		if (isAuthenticated) {
			
			//필수체크
			if(	boardVO.getNttSj() == null || boardVO.getBbsTyACode() == null || boardVO.getBbsTyBCode() == null 
					|| boardVO.getBbsTyCCode() == null || boardVO.getBbsTyDCode() == null 
					|| boardVO.getBbsTyECode() == null || boardVO.getBbsTyFCode() == null 
					|| boardVO.getNttSj().isEmpty()	   || boardVO.getBbsTyACode().isEmpty() 
					|| boardVO.getBbsTyBCode().isEmpty() || boardVO.getBbsTyCCode().isEmpty()
					|| boardVO.getBbsTyDCode().isEmpty() || boardVO.getBbsTyECode().isEmpty()
					|| boardVO.getBbsTyFCode().isEmpty() 
					)
			{
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

			boardVO.setLastUpdusrId(user.getName());

			boardVO.setNtcrNm(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			boardVO.setPassword(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)

			estMngService.updateBoardArticle(boardVO);
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
	@RequestMapping("/cop/est/insertBoardArticleAPI.do")
	@ResponseBody
	public ResultVO insertBoardArticle(final MultipartHttpServletRequest multiRequest, BoardVO boardVO, BindingResult bindingResult) throws Exception {
		
		ResultVO resultVO = new ResultVO();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		//로그인한 사용자 정보
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = true;

		if (isAuthenticated) {
			
			//필수체크
			if(boardVO.getNttSj() == null 
		       || boardVO.getBbsTyACode() == null || boardVO.getBbsTyBCode() == null 
		       || boardVO.getBbsTyCCode() == null || boardVO.getBbsTyDCode() == null 
		       || boardVO.getBbsTyECode() == null || boardVO.getBbsTyFCode() == null 
		       || boardVO.getNttSj().isEmpty()	   || boardVO.getBbsTyACode().isEmpty() 
		       || boardVO.getBbsTyBCode().isEmpty() || boardVO.getBbsTyCCode().isEmpty()
		       || boardVO.getBbsTyDCode().isEmpty() || boardVO.getBbsTyECode().isEmpty()
		       || boardVO.getBbsTyFCode().isEmpty()) {
				resultVO.setResultCode(ResponseCode.INPUT_CHECK_NOT_EMPTY.getCode());
				resultVO.setResultMessage(ResponseCode.INPUT_CHECK_NOT_EMPTY.getMessage());

				return resultVO;
			}
	
			
			List<FileVO> result = null;
			String atchFileId = "";

			ComDefaultCodeVO vo = new ComDefaultCodeVO();
			vo.setCodeId("BUS005");
			
			List<?> codeResult = cmmUseService.selectCmmCodeDetail(vo); //공통코드조회
			
			resultMap.put("typeList", codeResult);
			
			resultVO.setResult(resultMap);

			codeResult = cmmUseService.selectCmmCodeDetail(vo);
			
			resultMap.put("attrbList", codeResult);

//			final Map<String, MultipartFile> files = multiRequest.getFileMap();
//			
//			// textarea이나 첨부파일을 입력하세요.
//			if(files.isEmpty()) {
//
//				//csv 정보가 있는 곳.
//				String tmpstr;
//				tmpstr = boardVO.getNttCn();
//				String[] resultTmp = tmpstr.split("\n");
//				
//				String[] resultTmp0 = resultTmp[0].split(",");
//
//				int resultCount = resultTmp0.length;
//				
//				if(resultCount == 0) {
//					resultVO.setResultCode(ResponseCode.INPUT_CHECK_INSERT_EMPTY.getCode());
//					resultVO.setResultMessage(ResponseCode.INPUT_CHECK_INSERT_EMPTY.getMessage());
//
//					return resultVO;
//				}
//				if(resultCount >= 1) {
//					if(resultTmp0[0] == null || resultTmp0[0].isEmpty()) {
//						resultVO.setResultCode(ResponseCode.INPUT_CHECK_INSERT_EMPTY.getCode());
//						resultVO.setResultMessage(ResponseCode.INPUT_CHECK_INSERT_EMPTY.getMessage());
//
//						return resultVO;
//					}
//				}
//			}
//			
//			if (!files.isEmpty()) {
//				result = fileUtil.parseFileInf(files, "BBS_", 0, "", "");
//				atchFileId = fileMngService.insertFileInfs(result);
//			}
//			
//
//			boardVO.setAtchFileId(atchFileId);
			boardVO.setFrstRegisterId(user.getName());
			boardVO.setBbsId(boardVO.getBbsId());
			
			estMngService.insertBoardArticle(boardVO);
			boardVO.setNtcrNm(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			boardVO.setPassword(""); // dummy 오류 수정 (익명이 아닌 경우 validator 처리를 위해 dummy로 지정됨)
			
			// 엑셀구현
			if(boardVO.getAtchFileId() != null && !boardVO.getAtchFileId().isEmpty()) {
				String orignlFileNm = estMngService.selectOrignlFileNm(boardVO);
				
		
			}else { //엑셀파일이 없는 경우
				//csv 정보가 있는 곳.
				String tmpstr;
				tmpstr = boardVO.getNttCn();
				String[] resultTmp = tmpstr.split("\n");
				
				
				int dtlId = 0;
				for(int i = 0; i<resultTmp.length; i++) {
					if(dtlId >= 10) break; //최대 10건까지
					// 아래로 이동
					
					resultTmp[i] = resultTmp[i].replaceAll("'","");
					resultTmp[i] = resultTmp[i].replaceAll("\"","");
					
					String[] resultTmp0 = resultTmp[i].split(",");
	
					int resultCount = resultTmp0.length;
					
					if(resultCount == 0) {
						continue;
					}
					
					boardVO.setRoadBaseAd("");
					if(resultCount >= 1) {
						if(resultTmp0[0] == null || resultTmp0[0].isEmpty() || resultTmp0[0].length() < 2) {
							continue;
						}
						
						boardVO.setRoadBaseAd(resultTmp0[0]);
					}
					
					boardVO.setRoadBaseA("");
					if(resultCount >= 2) {
						
						boardVO.setRoadBaseA(resultTmp0[1]);
					}
					
					boardVO.setRoadBaseB("");
					if(resultCount >= 3) {
						
						boardVO.setRoadBaseB(resultTmp0[2]);
					}
					
					boardVO.setRoadBaseC("");
					if(resultCount >= 4) {
						
						boardVO.setRoadBaseC(resultTmp0[3]);
					}
					
					boardVO.setRoadBaseD("");
					if(resultCount >= 5) {
						
						boardVO.setRoadBaseD(resultTmp0[4]);
					}
					
					boardVO.setDtlId(String.valueOf(dtlId+1));
					dtlId ++; //중간에 쓸데없는 데이터를 걸러내기 위해 별도로
					
					estMngService.insertJuso(boardVO);
					
					resultVO.setResult(resultMap);
					resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
					resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
				
				}
			}
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
	@RequestMapping("/cop/est/deleteBoardArticleAPI.do")
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
			boardVO.setLastUpdusrId(user.getName());

			estMngService.deleteBoardArticle(boardVO);
		}

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

		return resultVO;
	}
	
	/**
	 * 주소용 상세보기
	 * */
	@RequestMapping(value = "/cop/est/jusoDetail.do", consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResultVO selectBoardArticleJuso(@RequestBody BoardVO boardVO, String attrbFlag) throws Exception {

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

		Map<String, Object> resultMap = estMngService.selectBoardArticleListJuso(boardVO, attrbFlag);

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
	@RequestMapping("cop/est/deleteBoardArticleAPI2.do")
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
			
			estMngService.updateBoardArticleJuso(boardVO);
		}

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

		return resultVO;
	}

	
	
	//전체 발급완료 처리
		@RequestMapping(value = "/cop/est/jusoCompDetail.do", method= {RequestMethod.GET, RequestMethod.POST})
		@ResponseBody
	    public ResultVO jusoCompDetail(@RequestBody BoardVO boardVO, BindingResult bindingResult, HttpServletResponse response) throws Exception {
		
			ResultVO resultVO = new ResultVO();

			//로그인한 사용자 정보
			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			boardVO.setFrstRegisterId(user.getName());
			boardVO.setState("1"); // 전체발급
			estMngService.updateJusoCompDetail(boardVO);


			resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
			resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

			return resultVO;
		
		}	

		
		//전체 미발급 처리
		@RequestMapping(value = "/cop/est/jusoAllNoIssDetail.do", method= {RequestMethod.GET, RequestMethod.POST})
		@ResponseBody
	    public ResultVO jusoAllNoIssDetail(@RequestBody BoardVO boardVO, BindingResult bindingResult, HttpServletResponse response) throws Exception {
		
			ResultVO resultVO = new ResultVO();
	        
			//로그인한 사용자 정보
			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			boardVO.setFrstRegisterId(user.getName());
			boardVO.setState("0"); // 미발급
			estMngService.updateJusoCompDetail(boardVO);


			resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
			resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

			return resultVO;
		
		}	
		
		//선택 미발급 처리
		@RequestMapping(value = "/cop/est/jusoNoIssDetail.do", method= {RequestMethod.GET, RequestMethod.POST})
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
				estMngService.updateJusoCompDetailDtl(boardVO);
	        }
	        
			resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
			resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());

			return resultVO;
		
		}
	
	/**
	 * 주소용 삭제
	 * */
	@RequestMapping("/cop/est/jusoDelDetail.do")
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

			estMngService.deleteBoardArticleJuso(boardVO);
		}

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		
		return resultVO;
	}
	

}