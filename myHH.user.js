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
		$('a[href^="/quest"]').after($('<a/>', {
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
	}
};

$("document").ready(()=> {
	let pages = /^\//[Symbol.replace](window.location.pathname, "").split(/\.|\//);
	if(myHH.hasOwnProperty(pages[0])) myHH[pages[0]](pages);
	myHH.general(pages);
});
