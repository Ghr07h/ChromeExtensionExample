var codetextarea = null
var atext = ""
var btext = ""
var stext = ""
var md5iframe = null

var codebutton = document.getElementById("codebutton")
codebutton.onclick = codetext

function codetext() {
    atext = ""
    btext = ""
    stext = ""

    codetextarea = document.getElementById("codetext")
    atext = codetextarea.value

    stext = document.getElementById("codeselect").value

    if ((atext != "" && stext != "") ||(stext == "14")) {
        switch (stext) {
            case "0":
                // Base64 Decode
                btext = atob(atext)
                break;
            case "1":
                // Base64 Decode(中文UTF8+Url编码处理)
                btext = decodeURIComponent(atob(atext))
                break;
            case "2":
                // Base64 Encode(中文UTF8+Url编码处理)
                btext = btoa(encodeURIComponent(atext))
                break;
            case "3":
                // Base64 Decode(中文Unicode字符集处理)
                btext = unescape(atob(atext))
                break;
            case "4":
                // Base64 Encode(中文Unicode字符集处理)
                btext = btoa(escape(atext))
                break;
            case "5":
                // Url Decode
                btext = decodeURIComponent(atext)
                break;
            case "6":
                // Url Encode
                btext = encodeURI(atext)
                break;
            case "7":
                // Url Encode(编码非ascii特殊符号@#$&=:/,;?+)
                btext = encodeURIComponent(atext)
                break;
            case "8":
                // Escape Decode
                btext = unescape(atext)
                break;
            case "9":
                // Escape Encode
                btext = escape(atext)
                break;
            case "10":
                // MD5
                btext = hex_md5(atext)
                break;
            case "11":
                // SHA1
                btext = hex_sha1(atext)
                break;
            case "12":
                // SHA256
                btext = (new SHA256(atext)).toHex()
                break;
            case "13":
                // Json 格式化
                btext = JSON.stringify(JSON.parse(atext), null, 4)
                break;
            case "14":
                // cmd5
                md5iframe = document.getElementsByTagName("iframe")
                if (md5iframe[0] != null) {
                    md5iframe[0].src="https://www.cmd5.com/"
                    md5iframe[0].style.display = "block"
                }
                break;
            default:
                btext = ""
        }
    }
    if (btext != "") {
        codetextarea.value = btext
    }
}