function getRandomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

/**
 * 
 * @param {图片数组} bcgImgList 
 * @param {索引值} index 
 * @param {前景色 默认白色} frontColor 
 * @param {bar背景色} bgColor 
 */
function setNavigationBarColor(bcgImgList, index) {
    let barBgColor = bcgImgList[index].barBgColor;
    let frontColor = bcgImgList[index].frontColor;
    wx.setNavigationBarColor({
        frontColor: frontColor || "#ffffff",
        backgroundColor: barBgColor
    });
}

/**
 * 
 * @param {是否是App} isApp 
 * @param {图片数组} bcgImgList 
 */
function setBarColorUseStorage(isApp, bcgImgList) {
    wx.getStorage({
        key: "bcgImgIndex",
        success: res => {
            setNavigationBarColor(bcgImgList, res.data);
        },
        fail: () => {
            if (!isApp) return;
            let randomIndex = getRandomNum(0, 7);
            setNavigationBarColor(bcgImgList, randomIndex);
            wx.setStorage({
                key: "bcgImgIndex",
                data: randomIndex
            });
        }
    });
}

// 比较版本号：left > right 1, left < right -1, left == right 0
// 用途：旧版本不执行写入、删除 日历操作
function cmpVersion(left, right) {
    if (typeof left + typeof right !== 'stringstring') {
        return false
    }
    let a = left.split('.')
    let b = right.split('.')
    let i = 0
    let len = Math.max(a.length, b.length)
    for (; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1
        }
    }
    return 0
}


export default {
    getRandomNum,
    setNavigationBarColor,
    setBarColorUseStorage,
    cmpVersion
  }