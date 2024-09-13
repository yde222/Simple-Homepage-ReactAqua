package egovframework.camera.service;

import java.io.Serializable;
/**
 * 게시물 관리를 위한 VO 클래스
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
 *  2009.06.29  한성곤		   2단계 기능 추가 (댓글관리, 만족도조사)
 *  2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *      </pre>
 */
public class Fisheryge {
    private Long id;
    private String name;
    private Long temp;
    private String tempdate;
    /**
     * 게시판 아이디
     */
    private String bbsId = "";

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getters and Setters
    public Long getTemp() {
        return temp;
    }

    public void setTemp(Long temp) {
        this.temp = temp;
    }

    public String getTempdate() {
        return tempdate;
    }

    public void setTempdate(String tempdate) {
        this.tempdate = tempdate;
    }

    /**
     * bbsId attribute를 리턴한다.
     * 
     * @return the bbsId
     */
    public String getBbsId() {
        return bbsId;
    }

    /**
     * bbsId attribute 값을 설정한다.
     * 
     * @param bbsId the bbsId to set
     */
    public void setBbsId(String bbsId) {
        this.bbsId = bbsId;
    }

}
