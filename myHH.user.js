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
		let troll = ["Dark Lord", "l'Espion Ninja", "Gruntt", "Edwarda", "Donatien", "Sylvanus", "Bremen", "Finalmecia", "Fredy Sih Roko Senseï"];
		$('div[rel^="content"] > div > a[href^="/quest"]').after($('<a/>', {
			'id': 'myHH_boss',
			'href': './',
			'onclick': `hh_popup.open("hh_boss_fight",{}, 'popup_queue_front'); return false;`,
			'html': [
				$('<ic/>', {'class': 'continue_quest'}),
				$('<span/>', {'text': 'Boss'})
			]
		}));
		$('div#popups').append($('<div/>', {
			'id': 'hh_boss_fight',
			'css': {'display': 'none'}
		}));
		for(var a=0;a<Hero.infos.questing.id_world-1;a++) {
			$('<a/>', {
				'href': `https://www.hentaiheroes.com/battle.html?id_troll=${a+1}`,
				'class': 'blue_text_button',
				'text': troll[a]
			})
		}
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
	}
};

$("document").ready(()=> {
	let pages = /^\//[Symbol.replace](window.location.pathname, "").split(/\.|\//);
	if(myHH.hasOwnProperty(pages[0])) myHH[pages[0]](pages);
	myHH.general(pages);
});
