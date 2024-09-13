package egovframework.camera.web;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import egovframework.camera.service.EgovFisheryService;
import egovframework.camera.service.FisheryVO;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cop/est")
public class EgovEstFisheryController {

    @Autowired
    private EgovFisheryService fisheryService;

    @PostMapping(value = "/selectFisheryListAPI.do", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> selectFisheryList(@RequestBody FisheryVO fisheryVO) throws Exception {
        Map<String, Object> response = fisheryService.getAllFisheries(fisheryVO);
        response.put("status", "success");
        return response;
    }

    @PostMapping(value = "/getFisheryData.do", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> getFisheryData(@RequestBody Map<String, Object> params) throws Exception {
    	   // fisheryId를 BigDecimal로 처리
        BigDecimal fisheryId = new BigDecimal(params.get("fisheryId").toString());
        String selectedDateFrom = (String) params.get("selectedDateFrom");
        String selectedDate = (String) params.get("selectedDate");
        String viewType = (String) params.get("viewType");

        FisheryVO fisheryVO = new FisheryVO();
        fisheryVO.setFisheryId(fisheryId);
        fisheryVO.setSelectedDateFrom(selectedDateFrom);
        fisheryVO.setSelectedDate(selectedDate);
        fisheryVO.setViewType(viewType);
        
        // 서비스 호출하여 DB에서 데이터 조회
        Map<String, Object> chartData = fisheryService.getFisheryData(fisheryVO);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("chartData", chartData);

        return response;
    }
}
