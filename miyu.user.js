// ==UserScript==
// @name         简易百度密语
// @namespace    
// @version      0.0.0.0.1
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
	b = escape((b === undefined) || (b === '') ? this.a: b);
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
var d = document.querySelectorAll('.d_post_content');
Array.prototype.map.call(d,
function(d) {
	var p = d.parentNode,
	l = d.querySelectorAll('img[src^="'+location.protocol+'//tb2.bdstatic.com?"]'),
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
		d.addEventListener('click',
		function(e) {
			e.preventDefault();
			this.textContent = decrypt(this.text, prompt('\u8BF7\u8F93\u5165\u5BC6\u7801\uFF1A'));
			return false;
		},
		false);
		p.appendChild(document.createElement('hr'));
		p.appendChild(d);
	}
});
var s=document.createElement('script');
s.type='text/javascript';
var html='';
html+='function encrypt(a, b) {';
html+='if (a === \'\') {';
html+='return \'\';';
html+='}';
html+='a = escape(a);';
html+='b = escape((b === undefined) || (b === \'\') ? this.a: b);';
html+='var c = \'\';';
html+='for (var i = 0; i < b.length; ++i) {';
html+='c += b.charCodeAt(i).toString();';
html+='}';
html+='var d = Math.floor(c.length / 5);';
html+='var e = parseInt(c.charAt(d) + c.charAt(d * 2) + c.charAt(d * 3) + c.charAt(d * 4) + c.charAt(d * 5));';
html+='var f = Math.ceil(b.length / 2);';
html+='var g = Math.pow(2, 31) - 1;';
html+='var h = Math.round(Math.random() * 1000000000) % 100000000;';
html+='c += h;';
html+='while (c.length > 10) {';
html+='c = (parseInt(c.substring(0, 10)) + parseInt(c.substring(10, c.length))).toString();';
html+='}';
html+='c = (e * c + f) % g;';
html+='var j = \'\';';
html+='var k = \'\';';
html+='for (var i = 0; i < a.length; ++i) {';
html+='j = parseInt(a.charCodeAt(i) ^ Math.floor((c / g) * 255));';
html+='if (j < 16) {';
html+='k += \'0\' + j.toString(16);';
html+='} else {';
html+='k += j.toString(16);';
html+='}';
html+='c = (e * c + f) % g;';
html+='}';
html+='h = h.toString(16);';
html+='while (h.length < 8) {';
html+='h = \'0\' + h;';
html+='}';
html+='k += h;';
html+='return k;';
html+='}';
html+='function ft(){';
html+='var m = test_editor.getContent();';
html+='var n = encrypt(document.getElementById(\'contents\').value, document.getElementById(\'text\').value).split(/(.{487})/).filter(function(v) {';
html+='return v.trim();';
html+='}).map(function(v) {';
html+='return \'<img width="1" height="1" class="BDE_Smiley" src="http://tb2.bdstatic.com?\'+v+\'">\';';
html+='}).join(\'\');';
html+='test_editor.getContentUbb=function(){return UE.utils.html2ubb(m+n)};';
html+='test_poster.post();';
html+='$.dialog.close();';
html+='setTimeout(\'location.reload()\', 5000);';
html+='}';
html+='function bdmy(){$.dialog.open(\'密码：<input type="text" id="text" style="width: 300px;"><br>内容：<br><textarea id="contents" style="width: 800px;  height: 200px;"></textarea><br><input type="button" value="发 表" onclick="ft()">\',{title:"简易百度密语",width:900});}';
s.text=html;
document.body.appendChild(s);
var bd=document.createElement('input');bd.type='button';
bd.value='密 语';
bd.setAttribute('onclick','bdmy()');
document.getElementsByClassName('poster_posting_status')[0].appendChild(bd);