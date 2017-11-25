// ==UserScript==
// @name         简易百度密语
// @namespace    
// @version      0.0.0.1
// @description  
// @author       
// @match        *://tieba.baidu.com/p/*
// @match        *://tieba.baidu.com/f?*
// @grant        none
// ==/UserScript==
function decrypt(a, b) {
    if ((a === '') || (a.length < 8)) {
        return '';
    }
    b = escape((b === undefined) || (b === '') ? this.a : b);
    var c = '';
    for (var i = 0; i < b.length; ++i) {
        c += b.charCodeAt(i).toString();
    }
    var d = Math.floor(c.length / 5);
    var e = parseInt(c.charAt(d) + c.charAt(d * 2) + c.charAt(d * 3) + c.charAt(d * 4) + c.charAt(d * 5));
    var f = Math.round(b.length / 2);
    var g = Math.pow(2, 31) - 1;
    var h = parseInt(a.substring(a.length - 8, a.length), 16);
    a = a.substring(0, a.length - 8);
    c += h;
    while (c.length > 10) {
        c = (parseInt(c.substring(0, 10)) + parseInt(c.substring(10, c.length))).toString();
    }
    c = (e * c + f) % g;
    var j = "";
    var k = "";
    for (var i = 0; i < a.length; i += 2) {
        j = parseInt(parseInt(a.substring(i, i + 2), 16) ^ Math.floor((c / g) * 255));
        k += String.fromCharCode(j);
        c = (e * c + f) % g;
    }
    return unescape(k);
}
function encrypt(a, b) {
    if (a === '') {
        return '';
    }
    a = escape(a);
    b = escape((b === undefined) || (b === '') ? this.a : b);
    var c = '';
    for (var i = 0; i < b.length; ++i) {
        c += b.charCodeAt(i).toString();
    }
    var d = Math.floor(c.length / 5);
    var e = parseInt(c.charAt(d) + c.charAt(d * 2) + c.charAt(d * 3) + c.charAt(d * 4) + c.charAt(d * 5));
    var f = Math.ceil(b.length / 2);
    var g = Math.pow(2, 31) - 1;
    var h = Math.round(Math.random() * 1000000000) % 100000000;
    c += h;
    while (c.length > 10) {
        c = (parseInt(c.substring(0, 10)) + parseInt(c.substring(10, c.length))).toString();
    }
    c = (e * c + f) % g;
    var j = '';
    var k = '';
    for (var i = 0; i < a.length; ++i) {
        j = parseInt(a.charCodeAt(i) ^ Math.floor((c / g) * 255));
        if (j < 16) {
            k += '0' + j.toString(16);
        } else {
            k += j.toString(16);
        }
        c = (e * c + f) % g;
    }
    h = h.toString(16);
    while (h.length < 8) {
        h = '0' + h;
    }
    k += h;
    return k;
}
function load() {
    var d = document.querySelectorAll('.d_post_content');
    Array.prototype.map.call(d, function(d) {
        var p = d.parentNode,
            l = d.querySelectorAll('img[src^="' + location.protocol + '//tb2.bdstatic.com?"]'),
            c = '';
        if (l.length > 0) {
            for (var i = 0; i < l.length; ++i) {
                c += l[i].getAttribute('src').replace(/^http:\/\/tb2.bdstatic.com\?(.*)/i, '$1').replace(/^https:\/\/tb2.bdstatic.com\?(.*)/i, '$1');
            }
            var d = document.createElement('pre');
            d.textContent = c;
            d.style.color = 'green';
            d.style.wordWrap = 'break-word';
            d.text = d.textContent;
            d.addEventListener('click', function(e) {
                e.preventDefault();
                this.textContent = decrypt(this.text, prompt('\u8BF7\u8F93\u5165\u5BC6\u7801\uFF1A'));
                return false;
            },
                false);
            p.appendChild(document.createElement('hr'));
            p.appendChild(d);
        }
    });
};
load();
var bd = document.createElement('input');
bd.type = 'button';
bd.value = '密 语';
bd.addEventListener('click', function() {
    $.dialog.open('密码：<input type="text" id="text" style="width: 300px;"><br>内容：<br><textarea id="contents" style="width: 800px;  height: 200px;"></textarea><br><input type="button" id="ft" value="发 表">', {
        title: "简易百度密语",
        width: 900
    });
    document.getElementById('ft').addEventListener('click', function() {
        var m = test_editor.getContent();
        var n = encrypt(document.getElementById('contents').value, document.getElementById('text').value).split(/(.{487})/).filter(function(v) {
            return v.trim();
        }).map(function(v) {
            return '<img width="1" height="1" class="BDE_Smiley" src="http://tb2.bdstatic.com?' + v + '">';
        }).join('');
        test_editor.getContentUbb = function() {
            return UE.utils.html2ubb(m + n)
        };
        test_poster.post();
        $.dialog.close();
        setTimeout(function() {load();}, 5000);
    },
        false);
},
    false);
document.getElementsByClassName('poster_posting_status')[0].appendChild(bd);
