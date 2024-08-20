export default function () {
    function validateUserName(rule: any, value: any, callback: any) {
        let val = value.trim();
        if (val.length < 5 || val.length > 10) {
            callback(new Error('名字长度5到10位'));
        }
        else {
            callback();
        }
    }

    function validateName(rule: any, value: any, callback: any) {
        let val = value.trim();
        if (val.length == 0) {
            callback(new Error('昵称不能为空'));
        }
        else {
            callback();
        }
    }

    function validatePassword(rule: any, value: any, callback: any) {
        let val = value.trim();
        if (val < 6) {
            callback(new Error('密码长度至少6位'));
        }
        else {
            callback();
        }
    }

    // 给外部提供东西
    return { validateUserName, validatePassword, validateName };
}