// ==UserScript==
// @name         MyHH
// @version      0.0.8
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
		$('body > div > header > div.energy_counter[type="energy_fight"] > .over').after($('<div/>', {
			'class': 'fightBoss',
			'html': $('<style/>', {'text': `.bar,body>div>header>div.energy_counter>.over{max-height:18px}body>div>header>div.energy_counter>.fightBoss{margin-top:22px;z-index:4!important;visibility:hidden;background:rgba(102,136,153,.67);border-radius:0 8px 8px 0;box-shadow:0 0 0 1px rgba(255,255,255,.73);margin-left:-18px}body>div>header>div.energy_counter>.fightBoss>a{display:block;padding-left:20px;color:#fff;text-decoration:none}body>div>header>div.energy_counter>.fightBoss>a:hover{text-decoration:underline solid #fff}body>div>header>div.energy_counter>.fightBoss:hover,body>div>header>div.energy_counter>.over:hover~div.fightBoss,body>div>header>div.energy_counter>[cur=EF]:hover~div.fightBoss{visibility:visible;position:inherit}`})
		}));
		for(let z=0;z<Hero.infos.questing.id_world-1;z++) {
			$('body > div > header > div.energy_counter > .fightBoss > style').before($('<a/>', {
				'href': `https://www.hentaiheroes.com/battle.html?id_troll=${z+1}`,
				'text': troll[z]
			}));
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
