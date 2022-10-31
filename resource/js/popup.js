var codetextarea = null
var atext = ""
var btext = ""
var stext = ""
var md5iframe = null

var codebutton = document.getElementById("codebutton")
codebutton.onclick = codetext

var Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = Base64._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}
		return output;
	},
	decode: function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = Base64._utf8_decode(output);
		return output;
	},
	_utf8_encode: function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	},
	_utf8_decode: function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}

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
            case "15":
                // Base64 Decode(中文UTF8编码处理)
                btext = Base64.decode(atext)
                break;
            case "16":
                // Base64 Encode(中文UTF8编码处理)
                btext = Base64.encode(atext)
                break;
            case "1":
                // Base64 Decode(中文Url编码处理)
                btext = decodeURIComponent(atob(atext))
                break;
            case "2":
                // Base64 Encode(中文Url编码处理)
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