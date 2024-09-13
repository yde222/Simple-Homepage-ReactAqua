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

import egovframework.camera.service.EgovFisherygeService;
import egovframework.camera.service.FisherygeVO;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cop/est")
public class EgovEstFisherygeController {

    @Autowired
    private EgovFisherygeService fisherygeService;

    @PostMapping(value = "/selectFisherygeListAPI.do", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> selectFisherygeList(@RequestBody FisherygeVO fisherygeVO) throws Exception {
        Map<String, Object> response = fisherygeService.getAllFisheries(fisherygeVO);
        response.put("status", "success");
        return response;
    }

    @PostMapping(value = "/getFisherygeData.do", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> getFisherygeData(@RequestBody Map<String, Object> params) throws Exception {
        // fisherygeId를 BigDecimal로 처리
        BigDecimal fisheryId = new BigDecimal(params.get("fisheryId").toString());
        String selectedDate = (String) params.get("selectedDate");
        String viewType = (String) params.get("viewType");

        FisherygeVO fisherygeVO = new FisherygeVO();
        fisherygeVO.setFisheryId(fisheryId);
        fisherygeVO.setSelectedDate(selectedDate);
        fisherygeVO.setViewType(viewType);

        // 서비스 호출하여 DB에서 데이터 조회
        Map<String, Object> chartData = fisherygeService.getFisherygeData(fisherygeVO);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("chartData", chartData);

        return response;
    }
}
