// 获取当前时间描述 <9点早上 <12点上午 <18点下午 其他晚上//
export function getCurrentTimeDes() {
    let des = '';
    let hours = new Date().getHours();
    if (hours < 9) {
        des = '早上';
    }
    else if (hours < 12) {
        des = '上午'
    }
    else if (hours < 18) {
        des = '下午'
    }
    else {
        des = '晚上'
    }
    return des;
}