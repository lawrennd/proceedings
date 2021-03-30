function CopyToClipboard(containerid) {
if (document.selection) { 
    var $temp = $("<textarea>");
    $("body").append($temp);
    
    var str = document.getElementById(containerid).innerHTML
    $temp.val(str).select();
    document.execCommand("Copy");
    document.selection.empty();
    
} else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().addRange(range);
    document.execCommand("Copy");
    window.getSelection().removeAllRanges();
}
}
