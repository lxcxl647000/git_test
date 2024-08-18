import { reactive } from "vue";

export default function () {
    // 规则对象属性//
    // required 表示该字段必须校验//
    // min 文本最小长度//
    // max 文本最大长度//
    // message 错误提示信息//
    // trigger 处罚校验时机 blur失去焦点  change文本发生改变//
    let userRules = reactive({
        username: [
            // { required: true, message: '名字长度6到10位', min: 6, max: 10, trigger: 'change' }
            { validator: validateUserName, trigger: 'change' }
        ],
        password: [
            // { required: true, message: '密码长度至少6位', min: 6, trigger: 'change' }
            { validator: validatePassword, trigger: 'change' }
        ]
    });

    function validateUserName(rule: any, value: any, callback: any) {
        if (value.length < 5 || value.length > 10) {
            callback(new Error('名字长度5到10位'));
        }
        else {
            callback();
        }
    }

    function validatePassword(rule: any, value: any, callback: any) {
        if (value.length < 6) {
            callback(new Error('密码长度至少6位'));
        }
        else {
            callback();
        }
    }

    // 给外部提供东西
    return { userRules };
}