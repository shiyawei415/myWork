/**
 * Created by WangYue.
 */
function animate(dom, targets, callback) {
    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
        var isCompleted = true, styleName, target, leader, step;
        for (styleName in targets) {
            if (targets.hasOwnProperty(styleName)) {
                target = targets[styleName];
                if (styleName === 'zIndex') {
                    dom.style[styleName] = leader = target;
                } else if (styleName === 'opacity') {
                    target *= 100;
                    leader = ~~(getStyle(dom, styleName) * 100) || 0;
                    step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader += step;
                    dom.style[styleName] = leader / 100;
                } else {
                    leader = parseInt(getStyle(dom, styleName)) || 0;
                    step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader += step;
                    dom.style[styleName] = leader + 'px';
                }
            }
            if (leader !== target) {
                isCompleted = false;
            }
        }
        if (isCompleted) {
            clearInterval(dom.timer);
            if (typeof callback === 'function') {
                callback();
            }
        }
    }, 16.7);
}

function getStyle(dom, attr) {
    return (dom && dom.currentStyle) ?
        dom.currentStyle[attr] :
        window.getComputedStyle(dom, null)[attr];
}