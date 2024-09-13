package egovframework.camera.service;

import java.util.List;
import java.util.Map;

public interface EgovFisherygeService {
    Map<String, Object> getAllFisheries(FisherygeVO fisherygeVO) throws Exception;

    Map<String, Object> getFisherygeData(FisherygeVO fisherygeVO) throws Exception;
}