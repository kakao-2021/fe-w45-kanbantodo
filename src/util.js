/*
    util.js
*/

export function addHTML(node, text) {
    node.innerHTML += text;
}
export function html(node, text) {
    node.innerHTML = text;
}

function dfs_q(node, target) {
    let returnVal;
    /* dfs 탐색 */
    for (let element of node.children) {
        if (element.matches(target))
            return element;
        if (element.hasChildNodes()) {
            let result = dfs_q(element, target);
            if (result !== undefined)  /* 찾았을 경우 */
                returnVal = result;
        }
    }
    return returnVal;
}

function dfs_q_all(nodeList, node, target){
    for (let element of node.children) {
        if (element.matches(target))
            nodeList.push(element);
        if (element.hasChildNodes())
            dfs_q_all(nodeList, element, target);
    }
    return nodeList;
}

export function query(target) {
    return dfs_q(document.body, target)
}
export function queryAll(target) {
    return dfs_q_all([], document.body, target)
}
