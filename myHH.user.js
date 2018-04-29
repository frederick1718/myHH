// ==UserScript==
// @name         MyHH
// @version      0.0.7
// @description  Ajout de fonction mineur au site Hentai Heroes <3
// @author       Chifumy
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @match        https://www.hentaiheroes.com/*
// ==/UserScript==

var myHH= {
	general: (a)=> {
		if(a[0]=='boss') return;
		localStorage.setItem('curWorld', Hero.infos.questing.id_world);
		$('div[rel^="content"] > div > a[href^="/quest"]').after($('<a/>', {
			'href': '/boss',
			'html': [
				$('<ic/>', {'class': 'continue_quest'}),
				$('<span/>', {'text': 'Boss'})
			]
		}));
	},
	activities: (a)=> {
		$('.missions_wrap > div.mission_object').sort((a,b)=> {
			let x = JSON.parse(a.dataset.d);
			let y = JSON.parse(b.dataset.d);
			return x.duration-y.duration;
		}).each((a,b)=>{
			$('.missions_wrap').append($(b));
		});
	},
	arena: (a)=> {
		$('#refresh_villains').parent().append($('<button>', {
			'id': "all_fight",
			'css': {left: "15%"},
			'class': "blue_text_button refresh_button",
			'text': 'Les combattres tous'
		}));
		$('#all_fight').click(()=> {
			for(var a=0;a<3;a++)
				window.open(`https://www.hentaiheroes.com/battle.html?id_arena=${a}`);
		});
	},
	boss: ()=> {
		$('head title').text('Hentai Heroes');
		let boss= ["Dark Lord", "l'Espion Ninja", "Gruntt", "Edwarda", "Donatien", "Sylvanus", "Bremen", "Finalmecia", "Fredy Sih Roko Senseï"];
		let idOB= localStorage.getItem("curWorld")-1;
		$('body').html('');
		for(let a=0;a<idOB;a++) {
			$('body').append($('<div/>', {
				'class': 'troll',
				'html': [
					$('<h2/>', {'text': boss[a]}),
					$('<img/>', {'src': `https://content.hentaiheroes.com/pictures/trolls/${a+1}/ava1.png`}),
					$('<a/>', {
						'text': 'Combat',
						'href': `https://www.hentaiheroes.com/battle.html?id_troll=${a+1}`
					})
				]
			}));
		}
		$('body').append($('<style/>', {
'text': `body {
	background: #301 fixed;
	background-image: url(https://content.hentaiheroes.com/design/bg_pattern2.png), linear-gradient(to bottom,#402,#101);
	background-size: 100px 100px, 100% 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-content: center;
	align-items: center;
	margin: 0px;
	padding: 0px;
}
body > div.troll > a {
	display: block;
	background-image: linear-gradient(#00aaff 0px, #006688 50%, #005577 51%, #00aaff 100%);
	border: 1px solid #006688;
	border-radius: 7px;
	box-shadow: #ffffffcc -1px 2px 1px 1px inset, #005577 1px -2px 1px 3px inset, #003344b3 0px 3px 3px 0px;
	color: #ffffff;
	cursor: pointer;
	font-family: "Carter One", cursive;
	font-size: 18px;
	font-weight: 400;
	height: 42px;
	line-height: 42px;
	text-align: center;
	width: 100px;
	text-decoration: none;
}`
		}));
	}
};

$("document").ready(()=> {
	let pages = /^\//[Symbol.replace](window.location.pathname, "").split(/\.|\//);
	if(myHH.hasOwnProperty(pages[0])) myHH[pages[0]](pages);
	myHH.general(pages);
});
