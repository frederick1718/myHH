// ==UserScript==
// @name       MyHH
// @version    0.0.1
// @grant      unsafeWindow
// @grant      GM_xmlhttpRequest
// @grant      GM.xmlHttpRequest
// @require    https://code.jquery.com/jquery-3.3.1.min.js
// @match      https://www.hentaiheroes.com/*
// ==/UserScript==

var myHH= ()=> {
	activities: ()=> {
		$('.missions_wrap > div.mission_object').sort((a,b)=> {
			let x = JSON.parse(a.dataset.d);
			let y = JSON.parse(b.dataset.d);
			return x.duration-y.duration;
		}).each((a,b)=>{
			$('.missions_wrap').append($(b));
		});
	}
};

$("document").ready(()=> {
	let pages = /^\//[Symbol.replace](window.location.pathname, "").split(/\.|\//);
	if(MyHHf.hasOwnProperty(pages[0])) MyHHf[pages[0]]();
	//console.log()
});
