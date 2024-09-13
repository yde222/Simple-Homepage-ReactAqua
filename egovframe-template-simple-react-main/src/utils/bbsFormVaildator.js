const bbsFormVaildator = (formData) => {
    if (formData.get('nttSj') === null || formData.get('nttSj') === "") {
        alert("Title is a required value(제목은 필수 값입니다).");
        return false;
    }
    if (formData.get('nttCn') === null || formData.get('nttCn') === "") {
        alert("Content is a required value(내용은 필수 값입니다).");
        return false;
    }

   // Check if 'nttCn' (Content) is a number
    if (isNaN(formData.get('nttCn'))) {
        alert("Content must be a number(내용은 숫자여야 합니다).");
        return false;
    }
    return true;
};

export default bbsFormVaildator;