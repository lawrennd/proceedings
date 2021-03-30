function CopyToClipboard(containerid) {
    var $temp = $("<textarea>");
    $("body").append($temp);
    
    var str = document.getElementById(containerid).innerHTML
    $temp.val(str).select();
    document.execCommand("Copy");
    $temp.remove();
}
