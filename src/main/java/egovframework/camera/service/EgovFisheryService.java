// EgovFisheryService.java
package egovframework.camera.service;

import java.util.List;
import java.util.Map;

public interface EgovFisheryService {
    Map<String, Object> getAllFisheries(FisheryVO fisheryVO) throws Exception;

    // Add this method to retrieve the fishery data
    Map<String, Object> getFisheryData(FisheryVO fisheryVO) throws Exception;
}
