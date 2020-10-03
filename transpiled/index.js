// Compiled using ts2gas 3.4.4 (TypeScript 3.5.3)
var exports = exports || {};
var module = module || { exports: exports };
function main() {
    var spreadsheet = SpreadsheetApp.openById('insert your target sheet id');
    var lastIndex = spreadsheet.getLastRow();
    for (var i = 2; i <= lastIndex; i++) {
        var res = fetch(spreadsheet.getRange('A' + i).getValue());
        // statusCode
        spreadsheet.getRange('B' + i).setValue(res.status);
        // title
        spreadsheet.getRange('C' + i).setValue(simpleParer('title', res.contents));
        // h1
        spreadsheet.getRange('D' + i).setValue(simpleParer('h1', res.contents));
        // footer
        // spreadsheet.getRange('E' + i).setValue(simpleParer('footer',res.contents));
    }
}
function fetch(url) {
    var res = UrlFetchApp.fetch(url);
    if (res.getResponseCode() == 200) {
        return { 'status': 200, 'contents': res.getContentText() };
    }
    else {
        return { 'status': res.getResponseCode(), 'contents': "" };
    }
}
/**
 * 入れ子無く使われるものを抽出できるパーサー
 * <tagName {class等}>{抽出したいコンテンツ}</tagName>
 * @param tagName 抽出したいタグ名
 * @param contents text/html
 */
function simpleParer(tagName, contents) {
    var firstParsed = Parser.data(contents).from('<' + tagName).to(tagName + '>').build();
    return Parser.data(firstParsed).from('>').to('</').build();
}
