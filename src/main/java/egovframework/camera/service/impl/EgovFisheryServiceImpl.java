package egovframework.camera.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.FileVO;
import egovframework.camera.service.Board;
import egovframework.camera.service.BoardVO;
import egovframework.camera.service.EgovEstManageService;
import egovframework.camera.service.EgovFisheryService;
import egovframework.camera.service.Fishery;
import egovframework.camera.service.FisheryVO;
import egovframework.let.utl.fcc.service.EgovDateUtil;

/**
 * 게시물 관리를 위한 서비스 구현 클래스
 * @author 공통 서비스 개발팀 한성곤
 * @since 2009.03.19
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2009.03.19  이삼섭          최초 생성
 *  2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *  </pre>
 */
@Service("EgovFisheryService")
public class EgovFisheryServiceImpl  implements EgovFisheryService {

//    @Autowired
//    private FisheryDAO fisheryDAO;

	@Resource(name = "FisheryDAO")
	private FisheryDAO fisheryDAO;

	@Override
	public Map<String, Object> getAllFisheries(FisheryVO fisheryVO) throws Exception {
	    List<Fishery> fisheryList = fisheryDAO.selectFisheryList(fisheryVO);

	    // 여기서 데이터를 로깅해서 확인합니다.
	    System.out.println("Fishery List: " + fisheryList);

	    
	    // 결과를 Map에 담아서 반환
	    Map<String, Object> resultMap = new HashMap<>();
	    resultMap.put("resultList", fisheryList);
	    
	    return resultMap;
	}

	@Override
    public Map<String, Object> getFisheryData(FisheryVO fisheryVO) throws Exception {
		//여기는 날짜계산 start 예)9월10일
		//일주일인 경우, to보다 6일 빠른 날짜 예)9월4일 
		//한달인 경우, to보다 한달전+1일 날짜 예)8월11일
		//분기인 경우, to보다 세달전+1일 날짜 예)6월11일
		//jsx에서 처리 하므로 여기는 코멘트
//		if("weekly".contentEquals(fisheryVO.getViewType())){
//		    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//		    // String을 LocalDate로 변환
//		    LocalDate dateTo = LocalDate.parse(fisheryVO.getSelectedDate(), formatter);
//
//		    // 6일 빼기 (일주일 중 첫 번째 날짜 계산)
//		    LocalDate dateFrom = dateTo.minusDays(6);
//			fisheryVO.setSelectedDateFrom(dateFrom.format(formatter));
//		}
//		if("monthly".contentEquals(fisheryVO.getViewType())){
//			//지은님, 경훈님 부탁해요!!!
//			
//		}
//		
//		if("quarterly".contentEquals(fisheryVO.getViewType())){
//			//지은님, 경훈님 부탁해요!!!
//			
//		}
		
		List<Fishery>  chartData = fisheryDAO.selectFisheryData(fisheryVO);
	    // 결과를 Map에 담아서 반환
	    Map<String, Object> resultMap = new HashMap<>();
	    resultMap.put("resultList", chartData);
	    
	    return resultMap;
    }

}