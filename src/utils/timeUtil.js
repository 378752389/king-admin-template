export const nowStr = (date) => {
    const now = date || new Date()
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDay();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}