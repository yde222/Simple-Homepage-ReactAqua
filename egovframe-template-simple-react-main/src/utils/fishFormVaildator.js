const fishFormVaildator = (formData) => {
    if (formData.get('nttSj') === null || formData.get('nttSj') === "") {
        alert("Title is a required value(제목은 필수 값입니다).");   //이 부분도 obj라고 표기 되어서 영문을 메인으로 입력하였습니다
        return false;
    }
    if (formData.get('bbsTyACode') === null || formData.get('bbsTyACode') === "") {
        alert("Content is a required value(내용은 필수 값입니다)."); //이 부분도 obj라고 표기 되어서 영문을 메인으로 입력하였습니다
        return false;
    }
    if (formData.get('bbsTyBCode') === null || formData.get('bbsTyBCode') === "") {
        alert("Content is a required value(내용은 필수 값입니다)."); //이 부분도 obj라고 표기 되어서 영문을 메인으로 입력하였습니다
        return false;
    }
    if (formData.get('bbsTyCCode') === null || formData.get('bbsTyCCode') === "") {
        alert("Content is a required value(내용은 필수 값입니다)."); //이 부분도 obj라고 표기 되어서 영문을 메인으로 입력하였습니다
        return false;
    }
    if (formData.get('bbsTyDCode') === null || formData.get('bbsTyDCode') === "") {
        alert("Content is a required value(내용은 필수 값입니다)."); //이 부분도 obj라고 표기 되어서 영문을 메인으로 입력하였습니다
        return false;
    }
    if (formData.get('bbsTyECode') === null || formData.get('bbsTyECode') === "") {
        alert("Content is a required value(내용은 필수 값입니다)."); //이 부분도 obj라고 표기 되어서 영문을 메인으로 입력하였습니다
        return false;
    }
    if (formData.get('bbsTyFCode') === null || formData.get('bbsTyFCode') === "") {
        alert("Content is a required value(내용은 필수 값입니다)."); //이 부분도 obj라고 표기 되어서 영문을 메인으로 입력하였습니다
        return false;
    }
    return true;
};

export default fishFormVaildator;