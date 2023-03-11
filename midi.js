/*
Midi Sound Engine v3.0.4

Tridashie Sound Engine?

my custom sound engine https://scratch.mit.edu/projects/561308953/

My Soundbank 13 MB

2023/03/10 Anim Tred Studio, LLC
*/
(function(modules) {
	var installedModules = {};
	function __webpack_require__(moduleId) {
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		module.l = true;
		return module.exports;
	}
	__webpack_require__.m = modules;
	__webpack_require__.c = installedModules;
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, {
				enumerable: true,
				get: getter
			});
		}
	};
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, {
				value: 'Module'
			});
		}
		Object.defineProperty(exports, '__esModule', {
			value: true
		});
	};
	__webpack_require__.t = function(value, mode) {
		if (mode & 1) value = __webpack_require__(value);
		if (mode & 8) return value;
		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) {
			return value;
		}
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ? function getDefault() {
			return module['default'];
		} : function getModuleExports() {
			return module;
		};
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};
	__webpack_require__.o = function(object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	};
	__webpack_require__.p = "";
	return __webpack_require__(__webpack_require__.s = './src/index.js');
})({
	'./src/soundbank.js': function(module, exports, __webpack_require__) {
		var DRUMS = {
			"snare drum": {},
			"side stick": { volume: 0.7 },
			"crash cymbal": { volume: 0.85 },
			"open hi hat": { volume: 0.5 },
			"closed hi hat": { volume: 0.5 },
			"low floor tom": {},
			"high floor tom": {},
			"low tom": {},
			"low mid tom": {},
			"hi mid tom": {},
			"high tom": {},
			"tambourine": { volume: 0.35 },
			"hand": { volume: 0.8 },
			"claves": { volume: 0.35 },
			"wood": { volume: 0.9 },
			"cowbell": { volume: 0.63 },
			"triangle": { volume: 0.5 },
			"bongo": {},
			"cabasa": {},
			"long guiro": {},
			"short guiro": { volume: 0.45 },
			"vibraslap": { volume: 0.22 },
			"cuica": {},
			"short whistle": {},
			"long whistle": {},
			"low wood": {},
			"hi bongo": {},
			"low cuica": {},
			"mute triangle": { volume: 0.5 },
			"high agogo": { volume: 0.7 },
			"low agogo": { volume: 0.7 },
			"conga": {},
			"open conga": {},
			"mute conga": {},
			"acoustic bass drum": { volume: 0.8 },
		}
		var INSTRUMENT = {
			"piano": { releaseTime: 0.12, volume: [[36, 0.8], [48, 0.65], [60, 0.4], [72, 0.3]] },
			"electric piano": { releaseTime: 0.12, volume: 0.7 },
			"organ": { releaseTime: 0.12, volume: [[48, 0.72], [60, 0.68], [72, 0.6]], releasePatch: 52 },
			"guitar": { releaseTime: 0.15, volume: 0.57 },
			"electric guitar": { releaseTime: 0.12, releasePatch: 60, volume: 0.5 },
			"bass": { releaseTime: 0.25, releasePatch: 57, volume: [[36, 0.6], [48, 0.4]] },
			"pizzicato": { releaseTime: 0.25, volume: [[48, 0.5], [60, 0.42]], releasePatch: 47 },
			"harmonica": { loop: true, volume: 0.5 },
			"clarinet": { loop: true, volume: 0.6 },
			"saxophone": { loop: true, volume: 0.6, releasePatch: 59.75 },
			"violin": { releaseTime: 0.12, loop: true, volume: [[60, 0.62], [72, 0.58]] },
			"violin_2": { releaseTime: 0.5, loop: true, volume: [[60, 0.58], [72, 0.53]] },
			"overdriven guitar": { releasePatch: 61, loop: true, volume: 0.62 },
			"flute": { loop: true, loopStart: 2, releasePatch: 63, loopEnd: 25, volume: [[60, 0.66], [72, 0.46]] },
			"wooden flute": { releasePatch: 58, loop: true, volume: [[60, 0.8], [72, 0.7]]},
			"bassoon": { loop: true,  volume: [[36, 0.68], [48, 0.6], [60, 0.48], [72, 0.42]] },
			"choir": { releaseTime: 0.15, releasePatch: 55, loop: true, volume: [[60, 0.6], [72, 0.54]] },
			"vibraphone": { releaseTime: 0.2, releasePatch: 58, volume: [[60, 0.48], [72, 0.42]] },
			"music box": { releaseTime: 0.5, releasePatch: 60.75, volume: 0.52 },
			"steel drum": { releaseTime: 0.2, releasePatch: 57.5, volume: 0.55 },
			"marimba": { releasePatch: 49, volume: 0.6 },
			"synth lead": { releaseTime: 0.1, loop: true, releasePatch: 57,  volume: [[48, 0.5], [60, 0.45], [72, 0.4], [84, 0.3]] },
			"synth pad": { releaseTime: 0.1, loop: true,  volume: 0.6 },
			"timpani": { releaseTime: 0.1, volume: 0.8 },
			"whistle": { loop: true,  volume: 0.55 },
			"accordion": { loop: true, releasePatch: 59,  volume: [[48, 0.4], [60, 0.34]] },
			"orchestra hit": { releaseTime: 0.25, releasePatch: 63, volume: 0.8 },
			"melodic tom": { releaseTime: 0.25, releasePatch: 60, volume: 0.85  },
			"synth drum": { releaseTime: 0.25, releasePatch: 60, volume: 0.6  },
			"church organ": { releaseTime: 0.1, loop: true, releasePatch: 51, volume: [[36, 1], [48, 0.9], [60, 0.8]] },
			"trumpet": { releasePatch: 55, volume: [[48, 0.75], [60, 0.63], [72, 0.56]], loop: true },
			"trumbone": { releasePatch: 61, volume: [[48, 0.8], [60, 0.62], [72, 0.54]], loop: true },
			"taiko drum": { releaseTime: 0.25, releasePatch: 62, volume: 0.8 },
			"reverse cymbal": { volume: 0.55 },
			"gumshot": { releaseTime: 1 },
			"agogo": { releaseTime: 0.25 },
			"warm": { releaseTime: 0.25, loop: true, volume: 0.47 },
		}
		var SOUNDBANK_INFOS = {
			// drums
			"snare drum": {
				title: "Pinkie the Babysitter (Baby Cakes) | MLP: FiM [HD]",
				source: "https://youtu.be/TJ6w9LRH7ts?t=60",
				file: "f8e9a4862f16d6e0bb58e8595cd5a4ad.wav"
			},
			"side stick": {
				title: "MLP: PONY LIFE CAPITULO 18 REACCIÓN! DERPYY!!",
				source: null,
				file: "06f1484566bb6149673c05ee9c14f5f6.wav"
			},
			"crash cymbal": {
				title: "Pinkie the Babysitter (Baby Cakes) | MLP: FiM [HD]",
				source: "https://youtu.be/TJ6w9LRH7ts?t=60",
				file: "d2047cb8e805c3d127c469de2fc1d329.wav"
			},
			"open hi hat": {
				title: "My little pony-season 8 episode 10:The Break Up Breakdown",
				source: "https://youtu.be/S3sIFvA2b-U?t=398",
				file: "46cbebfbac0b11dc76c2e738b78120e4.wav"
			},
			"closed hi hat": {
				title: "My little pony-season 8 episode 10:The Break Up Breakdown",
				source: "https://youtu.be/S3sIFvA2b-U?t=398",
				file: "d7ada32c710b0a883266f4b94b1db43c.wav"
			},
			"low floor tom": {
				title: "My Little Pony Season 5 Episode 9",
				source: "https://youtube.com/watch?v=lzpUO8-Xowk&t=471s",
				file: "4c76166ce0d9b4853e0715f107b01c28.wav"
			},
			"high floor tom":{
				title: "My Little Pony Season 5 Episode 9",
				source: "https://youtube.com/watch?v=lzpUO8-Xowk&t=471s",
				file: "5266b9988ee896bc2bab9cd496c42a98.wav"
			},
			"low tom": {
				title: "My Little Pony Season 5 Episode 9",
				source: "https://youtube.com/watch?v=lzpUO8-Xowk&t=471s",
				file: "8555d813e84048f781c4ff44c6430739.wav"
			},
			"low mid tom": {
				title: "My Little Pony Season 5 Episode 9",
				source: "https://youtube.com/watch?v=lzpUO8-Xowk&t=471s",
				file: "3b3fced980db142e737e15321a7eb7ef.wav"
			},
			"hi mid tom": {
				title: "My Little Pony Season 5 Episode 9",
				source: "https://youtube.com/watch?v=lzpUO8-Xowk&t=471s",
				file: "3e3c032e6bc334b7294310585f79662b.wav"
			},
			"high tom": {
				title: "My Little Pony Season 5 Episode 9",
				source: "https://youtube.com/watch?v=lzpUO8-Xowk&t=471s",
				file: "f57d7b55ae028fb6691530bb3c54bdb2.wav"
			},
			"tambourine": {
				title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
				source: "https://youtu.be/aHEhixFSt-0?t=51",
				file: "4fbbc63e66e4fd7b8611c11343f91fd2.wav"
			},
			"hand": {
				title: "When I'm Sweeping",
				source: "https://youtu.be/u9l9F2H1yn0?t=16",
				file: "8158cc2e2219fb6f7cbfdfd051a3ed72.wav"
			},
			"claves": {
				title: "My little pony-season 8 episode 10:The Break Up Breakdown",
				source: "https://youtu.be/S3sIFvA2b-U?t=22",
				file: "ef64be4f8da4730868cc931f3a15656f.wav"
			},
			"wood": {
				title: "Friendship is Randomly Musical 1",
				source: "https://youtube.com/watch?v=nX1WTsUjCLM&t=67s",
				file: "94bf611190e55266b6250b8bbc17ed24.wav"
			},
			"cowbell": {
				title: "Chicken Little",
				source: null,
				file: "1760020eb37fe3709c40f60d2a8ef544.wav"
			},
			"triangle": {
				title: "[Tridashie] Friendship is Randomly Musical 2 [REUPLOAD]",
				source: "https://youtu.be/y7ho58raWac?t=30",
				file: "0136ce7fbd955f39bb46de40e12be0bc.wav"
			},
			"bongo": {
				title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
				source: "https://youtu.be/aHEhixFSt-0?t=30",
				file: "336220063f686b0f245430f76cbceb4d.wav"
			},
			"conga": {
				title: "My Little Pony Friendship is Magic season 2 episode 19 \"Putting Your Hoof Down\"",
				source: "https://youtu.be/qjhL0p3dHwM?t=38",
				file: "fd5036ce507cd959596e9770efe62415.wav"
			},
			"cabasa": {
				title: "My little pony season 8 episode 4(Fake it 'Til you make it)",
				source: "https://youtu.be/HGK7o5TVVF4?t=1300",
				file: "8b5d05fd13d7e56d91a92690a45d03a2.wav"
			},
			"long guiro": {
				title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
				source: "https://youtu.be/aHEhixFSt-0?t=63",
				file: "601103abf81fc9385f36dd9b47c703ee.wav"
			},
			"vibraslap": {
				title: "My little pony-season 8 episode 10:The Break Up Breakdown",
				source: "https://youtu.be/S3sIFvA2b-U?t=22",
				file: "3934ec317365ad390c5c87c633b189b0.wav"
			},
			"cuica": {
				title: "Friendship is Randomly Musical 8",
				source: "https://youtu.be/JQtbvAmwYVI?t=67",
				file: "b1ebe9cbd60498d3c28ff97ffd26bcdb.wav"
			},
			"short whistle": {
				title: "My Little Pony friendship is magic season 2 episode 7 \"May the Best Pet Win!\"",
				source: "https://youtu.be/GpSNka9ft-w?t=425",
				file: "66eeb991358947dc9354c4fe75254dca.wav"
			},
			"long whistle": {
				title: "My Little Pony friendship is magic season 2 episode 7 \"May the Best Pet Win!\"",
				source: "https://youtu.be/GpSNka9ft-w?t=425",
				file: "545ba524892f481b16633483a19ca963.wav"
			},
			"short guiro": {
				title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
				source: "https://youtu.be/aHEhixFSt-0?t=63",
				file: "f7b53554ebdd758c615cdc574bad7ea5.wav"
			},
			"low wood": {
				title: "Friendship is Randomly Musical 1",
				source: "https://youtube.com/watch?v=nX1WTsUjCLM&t=67s",
				file: "28050489c468fd887d1b45812d183bd3.wav"
			},
			"hi bongo": {
				title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
				source: "https://youtu.be/aHEhixFSt-0?t=30",
				file: "8bb317a1069d04e13c23af27f2fdb76c.wav"
			},
			"low cuica": {
				title: "Friendship is Randomly Musical 8",
				source: "https://youtu.be/JQtbvAmwYVI?t=67",
				file: "2373fc1cf3ff5352b7ece3603999927a.wav"
			},
			"mute triangle": {
				title: "[Tridashie] Friendship is Randomly Musical 2 [REUPLOAD]",
				source: "https://youtu.be/y7ho58raWac?t=30",
				file: "af2148dba23faab1dec7cdd31663e292.wav"
			},
			"high agogo": {
				title: "My Little Pony: FIM Season 9 Episode 15 (2,4,6 Greaaat)",
				source: "https://youtu.be/MluslXu-Pnk?t=937",
				file: "14a03edc9dcaa6099e8def15bc187e10.wav"
			},
			"low agogo": {
				title: "My Little Pony: FIM Season 9 Episode 15 (2,4,6 Greaaat)",
				source: "https://youtu.be/MluslXu-Pnk?t=937",
				file: "f0379c9ab60a09f8f7cccb1cc32ac378.wav"
			},
			"open conga": {
				title: "Peppa Pig Makes Music Instrument with Marbles | Peppa Pig Official Family Kids Cartoon",
				source: "https://youtu.be/eGb3Edtrm1s?t=64",
				file: "41ff2db5a55a45496d63fb0dbdbedd7c.wav"
			},
			"mute conga": {
				title: "Peppa Pig Makes Music Instrument with Marbles | Peppa Pig Official Family Kids Cartoon",
				source: "https://youtu.be/eGb3Edtrm1s?t=64",
				file: "66c02912796e3b9f56a6d60081b96931.wav"
			},
			"acoustic bass drum": {
				title: "Friendship is Musical Compilation",
				source: "https://youtu.be/7WFZEuvZG0s?t=83",
				file: "a639a88d1c502adf8a3fd9889ee9ae77.wav"
			},
			// instruments 
			"piano": {
				title: "Friendship is Musical | Season 1 Episode 17-18",
				source: "https://youtu.be/_CZQ6tfivVs?t=89",
				file: "39237faddf2e6c7d3d8f6d39ae30d8e6.wav"
			},
			"electric piano": {
				title: "My Little Pony: Friendship is Magic - Season 4 Episode 3",
				source: "https://youtu.be/oqaH8rTKu8M?t=820",
				file: "d07006b09cfbac92e3c5bef85ccd3d36.wav"
			},
			"organ": {
				title: "My Little Pony : Friendship is Magic Season 1 Episode 22",
				source: "https://youtu.be/csuoJQH6Axs?t=176",
				file: "dc54c4335b9b365320ce2f0b5a3096ff.wav"
			},
			"guitar": {
				title: "Bright Mac and Pear Butter's Love Story (The Perfect Pear) | MLP: FiM [HD]",
				source: "https://youtu.be/Flv6_BrwPVU?t=193",
				file: "0328765961864d1ff2bc8aa2003489b0.wav"
			},
			"electric guitar": {
				title: "Friendship is Musical VGM #1",
				source: "https://youtu.be/qqB2J3-rMIc?t=12",
				file: "ace30ecd40b0ee7e7d77361e53e1f607.wav"
			},
			"bass": {
				title: "Friendship is Musical Season 2 First Half",
				source: "https://youtu.be/yqYQoVwFn4E?t=143",
				file: "c87bdd77085d5ef9688a4c88b5317947.wav"
			},
			"pizzicato": {
				title: "Friendship is Musical | Season 3",
				source: "https://youtu.be/7WFZEuvZG0s?t=168",
				file: "f527e3719ee8b7b64062e5f9a4b33169.wav"
			},
			"harmonica": {
				title: "Crescend Cinnamon on Twitter: \"https://t.co/zNTcb7oUSz\" / Twitter",
				source: "https://t.co/zNTcb7oUSz",
				file: "c7b1809c6bb6b0cbf1928d796d1d5eea.wav"
			},
			"clarinet": {
				title: "My Little Pony Friendship Is Magic Season 4 Episode 21 Testing, 1, 2, 3 HD",
				source: "https://youtu.be/RGIFQn8rlXw?t=282",
				file: "086fb0c3d8dfab35aaba3c8e1dfb05af.wav"
			},
			"saxophone": {
				title: "My Little Pony Friendship is Magic season 2 episode 22 \"Hurricane Fluttershy\"",
				source: "https://youtu.be/YK7vf0OkmRQ?t=953",
				file: "aa878420c089b36eab7064b70ac27818.wav"
			},
			"violin": {
				title: "Peppa Pig - Musical Instruments (full episode)",
				source: "https://youtu.be/n4gsHAH_q6s?t=69",
				file: "9f121cecc17a68610598587467cfc149.wav"
			},
			"violin_2": {
				title: "Peppa Pig - Musical Instruments (full episode)",
				source: "https://youtu.be/n4gsHAH_q6s?t=69",
				file: "f20c97f5b8369555f1f78e6c2040a8d3.wav"
			},
			"overdriven guitar": {
				title: "Friendship is Musical VGM #1",
				source: "https://youtu.be/qqB2J3-rMIc?t=24",
				file: "578d9cba77e8d6f578b31d5f4a31c151.wav"
			},
			"flute": {
				title: "Friendship is Musical | Season 5 (First Half)",
				source: "https://youtu.be/5pcCX7904d4?t=117",
				file: "10e4407f269919a8da1b686ec71d7953.wav"
			},
			"wooden flute": {
				title: "Peppa Pig Makes Music Instrument with Marbles | Peppa Pig Official Family Kids Cartoon",
				source: "https://youtu.be/eGb3Edtrm1s?t=114",
				file: "49589ee679b86fb05a411ebc302d407d.wav"
			},
			"bassoon": {
				title: "Friendship is Randomly Musical 5",
				source: "https://youtu.be/uoHPvvPGcAw?t=77",
				file: "925bc0db0ad640181cbbd961c326d1fd.wav"
			},
			"choir": {
				title: "Friendship is Musical | Season 1 Episode 21-22",
				source: "https://youtu.be/UZRoOAzI3wo?t=1",
				file: "43c9b3aafd224f62be45c990bef7896b.wav"
			},
			"vibraphone": {
				title: "My Little Pony friendship is magic season 2 episode 10 \"Secret of My Excess\"",
				source: "https://youtu.be/m9xyYfih99Q?t=49",
				file: "44c0ed2158bc9c7b9aa0b90db32ee980.wav"
			},
			"music box": {
				title: "Friendship is Randomly Musical 3 [REUPLOAD]",
				source: "https://youtu.be/rG5ukrHNqE4?t=14",
				file: "e66135be886992bd1be58f1c6eefb8e2.wav"
			},
			"steel drum": {
				title: "Friendship is Musical | Season 3",
				source: "https://youtu.be/7WFZEuvZG0s?t=5",
				file: "98fa3eefd30afd2377db250f33dffe5d.wav"
			},
			"marimba": {
				title: "Friendship is Musical | Season 1 Episode 17-18",
				source: "https://youtu.be/_CZQ6tfivVs?t=30",
				file: "aa0531b278664dfdf9254f2f5676d0e4.wav"
			},
			"synth lead": {
				title: "Friendship is Musical | Season 1 Episode 21-22",
				source: "https://youtu.be/UZRoOAzI3wo?t=3",
				file: "eef84ef4c9a76eb92218deee402a71aa.wav"
			},
			"synth pad": {
				title: "Friendship is Musical | Season 1 Episode 13-14",
				source: "https://youtu.be/QHOjFbbbrXQ?t=40",
				file: "6dd9834236dfc66bea70e387c1481941.wav"
			},
			"timpani": {
				title: "Peppa Pig - Musical Instruments (full episode)",
				source: "https://youtu.be/n4gsHAH_q6s?t=114",
				file: "c4bad1057968e352c835bd5c805f911c.wav"
			},
			"whistle": {
				title: "Whistling Competition Between Peppa Pig and Suzy Sheep",
				source: "https://youtu.be/9ptrXeS7CaE?t=4",
				file: "1d83be8a2f77baae0f03277ea629ee93.wav"
			},
			"orchestra hit": {
				title: "Friendship is Musical | Season 1 Episode 5-6",
				source: "https://youtu.be/EXrDap-pIdk?t=109",
				file: "5fa7509939b2908b5eadd34d4965f2b6.wav"
			},
			"melodic tom": {
				title: "My Little Pony Season 5 Episode 9",
				source: "https://m.youtube.com/watch?v=lzpUO8-Xowk&t=471s",
				file: "baa611917d9f86ec22b1240a0df9e509.wav"
			},
			"synth drum": {
				title: "My Little Pony Season 5 Episode 9",
				source: "https://m.youtube.com/watch?v=lzpUO8-Xowk&t=471s",
				file: "3518b4b38e33fc590b0c6b149e913df4.wav"
			},
			"church organ": {
				title: "My Little Pony: Friendship is Magic - Season 4 Episode 3",
				source: "https://youtu.be/oqaH8rTKu8M?t=820",
				file: "da06d731163ed46fafa290346096528b.wav"
			},
			"trumpet": {
				title: "[1080p] My little Pony Friendship is Magic Season 6 Episode 14 The Cart Before the Ponies",
				source: "https://youtu.be/8pKhEvZRW34?t=915",
				file: "cdb4db94af354ae0f7d442c5b36f5b75.wav"
			},
			"trumbone": {
				title: "My Little Pony: friendship is magic | Swarm of the Century | FULL EPISODE | MLP",
				source: "https://youtu.be/ZEzgWjBMfzM?t=1290",
				file: "badad0a3c04c9c1cbe8bbc864edab749.wav"
			},
			"taiko drum": {
				title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
				source: "https://youtu.be/aHEhixFSt-0?t=53",
				file: "52676535c7f309dbc4c771d733bbc0a4.wav"
			},
			"reverse cymbal": {
				title: "MLP FIM: Season 8 Episode 26",
				source: "https://youtu.be/u5Cbd92uQ80?t=850",
				file: "551922398f65d32746585a34757a83bf.wav"
			},
			"accordion": {
				title: "Peppa Pig - Musical Instruments (full episode)",
				source: "https://youtu.be/n4gsHAH_q6s?t=131",
				file: "f58883149c61023fb78e98e81aa5d023.wav"
			},
			"gumshot": {
				title: "[Midi Player Gumshot]",
				source: null,
				file: "997b210b9cd72734b14e71d28c666894.wav"
			},
			"agogo": {
				title: "My Little Pony: FIM Season 9 Episode 15 (2,4,6 Greaaat)",
				source: "https://youtu.be/MluslXu-Pnk?t=937",
				file: "196ddd23bcd309117e60626d3bcb17dd.wav"
			},
			"warm": {
				title: "My Little Pony Season 5 Episode 9",
				source: "https://youtu.be/lzpUO8-Xowk?t=750",
				file: "15cdf2d6f901c0e27de298d845e4718d.wav"
			},
		}
		var MIDI_INSTRUMENT = [
			// Acoustic Grand, Bright Acoustic, Electric Grand, Honky-Tonk
			"piano", "piano", "piano", "piano",
			// Electric Piano 1, Electric Piano 2, Harpsichord, Clavinet
			"electric piano", "electric piano", "piano", "piano",
			// Celesta, Glockenspiel, Music Box, Vibraphone
			"marimba", "vibraphone", "music box", "vibraphone",
			// Marimba, Xylophone, Tubular Bells, Dulcimer
			"marimba", "marimba", "vibraphone", "guitar",
			// Drawbar Organ, Percussive Organ, Rock Organ, Church Organ
			"organ", "organ", "organ", "church organ",
			// Reed Organ, Accordion, Harmonica, Tango Accordion
			"violin", "accordion", "harmonica", "accordion",
			// Nylon String Guitar, Steel String Guitar, Electric Jazz Guitar, Electric Clean Guitar
			"guitar", "guitar", "electric guitar", "electric guitar",
			// Electric Muted Guitar, Overdriven Guitar,Distortion Guitar, Guitar Harmonics
			"electric guitar", "overdriven guitar", "overdriven guitar", "overdriven guitar",
			// Acoustic Bass, Electric Bass (finger), Electric Bass (pick), Fretless Bass
			"bass", "bass", "bass", "bass",
			// Slap Bass 1, Slap Bass 2, Synth Bass 1, Synth Bass 2
			"bass", "bass", "bass", "bass",
			// Violin, Viola, Cello, Contrabass
			"violin", "violin", "violin", "violin",
			// Tremolo Strings, Pizzicato Strings, Orchestral Strings, Timpani
			"violin", "pizzicato", "bass", "timpani",
			// String Ensemble 1, String Ensemble 2, SynthStrings 1, SynthStrings 2
			"violin", "violin_2", "violin", "violin",
			// Choir Aahs, Voice Oohs, Synth Voice, Orchestra Hit
			"choir", "choir", "choir", "orchestra hit",
			// Trumpet, Trombone, Tuba, Muted Trumpet
			"trumbone", "trumbone", "trumbone", "trumbone",
			// French Horn, Brass Section, SynthBrass 1, SynthBrass 2
			"trumpet", "trumbone", "trumbone", "trumbone",
			// Soprano Sax, Alto Sax, Tenor Sax, Baritone Sax
			"saxophone", "saxophone", "saxophone", "saxophone",
			// Oboe, English Horn, Bassoon, Clarinet
			"bassoon", "clarinet", "bassoon", "clarinet",
			// Piccolo, Flute, Recorder, Pan Flute
			"flute", "flute", "wooden flute", "wooden flute",
			// Blown Bottle, Shakuhachi, Whistle, Ocarina
			"wooden flute", "wooden flute", "whistle", "wooden flute",
			// Lead 1 (square), Lead 2 (sawtooth), Lead 3 (calliope), Lead 4 (chiff)
			"synth lead", "synth lead", "wooden flute", "synth lead",
			// Lead 5 (charang), Lead 6 (voice), Lead 7 (fifths), Lead 8 (bass+lead)
			"synth lead", "choir", "synth lead", "synth lead",
			// Pad 1 (new age), Pad 2 (warm), Pad 3 (polysynth), Pad 4 (choir)
			"synth pad", "warm", "synth pad", "choir",
			// Pad 5 (bowed), Pad 6 (metallic), Pad 7 (halo), Pad 8 (sweep)
			"violin", "violin", "choir", "violin",
			// FX 1 (rain), FX 2 (soundtrack), FX 3 (crystal), FX 4 (atmosphere)
			"synth pad", "violin", "wooden flute", "choir",
			// FX 5 (brightness), FX 6 (goblins), FX 7 (echoes), FX 8 (sci-fi)
			"vibraphone", "warm", "choir", "harmonica",
			// Sitar, Banjo, Shamisen, Koto
			"overdriven guitar", "pizzicato", "bass", "bass",
			// Kalimba, Bagpipe, Fiddle, Shanai
			"marimba", "bassoon", "violin",  "bassoon",
			// Tinkle Bell, Agogo, Steel Drums, Woodblock
			"vibraphone", "agogo", "steel drum", "marimba",
			// Taiko Drum, Melodic Tom, Synth Drum, Reverse Cymbal
			"taiko drum", "melodic tom", "synth drum", "reverse cymbal",
			// Guitar Fret Noise, Breath Noise, Seashore, Bird Tweet
			"electric guitar", "wooden flute", "steel drum", "wooden flute",
			// Telephone Ring, Helicopter, Applause, Gunshot
			"vibraphone", "steel drum", "choir", "gumshot"
		]
		var DRUMS_MIDI = [
			"acoustic bass drum", // 27: ???
			"null", // 28: ???
			"null", // 29: ???
			"null", // 30: ???
			"null", // 31: ???
			"null", // 32: ???
			"null", // 33: ???
			"null", // 34: ???
			"acoustic bass drum", // 1-35: A
			"acoustic bass drum", // 2-36: A
			"side stick", // 3-37: Side Stick
			"snare drum", // 4-38: Acoustic Snare
			"hand", // 5-39: Hand Clap
			"snare drum", // 6-40: Electric Snare
			"low floor tom", // 7-41: Low Floor Tom
			"closed hi hat", // 8-42: Closed Hi-hat
			"high floor tom", // 9-43: High Floor Tom
			"closed hi hat", // 10-44: Pedal Hi-hat
			"low tom", // 11-45: Low Tom
			"open hi hat", // 12-46: Open Hi-hat
			"low mid tom", // 13-47: Low-Mid Tom
			"hi mid tom", // 14-48: Hi-Mid Tom
			"crash cymbal", // 15-49: Crash Cymbal 1
			"high tom", // 16-50: High Tom
			"open hi hat", // 17-51: Ride Cymbal 1
			"crash cymbal", // 18-52: Chinese Cymbal
			"tambourine", // 19-53: Ride Bell
			"tambourine", // 20-54: Tambourine
			"crash cymbal", // 21-55: Splash Cymbal
			"cowbell", // 22-56: Cowbell
			"crash cymbal", // 23-57: Crash Cymbal 2
			"vibraslap", // 24-58: Vibra Slap
			"open hi hat", // 25-59: Ride Cymbal 2
			"hi bongo", // 26-60: High Bongo
			"bongo", // 27-61: Low Bongo
			"mute conga", // 28-62: Mute High Conga
			"open conga", // 29-63: Open High Conga
			"conga", // 30-64: Low Conga
			"bongo", // 31-65: High Timbale
			"conga", // 32-66: Low Timbale
			"high agogo", // 33-67: High Agogo
			"low agogo", // 34-68: Low Agogo
			"cabasa", // 35-69: Cabasa
			"cabasa", // 36-70: Maracas
			"short whistle", // 37-71: Short Whistle
			"long whistle", // 38-72: Long Whistle
			"short guiro", // 39-73: Short Guiro
			"long guiro", // 40-74: Long Guiro
			"claves", // 41-75: Claves
			"wood", // 42-76: High Wood Block
			"low wood", // 43-77: Low Wood Block
			"cuica", // 44-78: Mute Cuica
			"low cuica", // 45-79: Open Cuica
			"mute triangle", // 46-80: Mute Triangle
			"triangle", // 47-81: Open Triangle
			"cabasa", // 48-82: ???
			"null", // 49-83: ???
			"null", // 50-84: ???
			"null", // 51-85: ???
			"null", // 52-86: ???
			"null" // 53-87: ???
		];
		exports.SOUNDBANK_INFOS = SOUNDBANK_INFOS;
		exports.MIDI_INSTRUMENT = MIDI_INSTRUMENT;
		exports.DRUMS_MIDI = DRUMS_MIDI;
		exports.DRUMS = DRUMS;
		exports.INSTRUMENT = INSTRUMENT;
	},
	'./src/midiparser.js': function(module, exports, __webpack_require__) {
		var MidiParser = function(data) {
			this.data = new Uint8Array(data);
			this.dataLength = this.data.length;
			this.index = 0;
			this.chuckSize = 0;
			this.duration = 0;
			this.finalList = [];
			this.track = [];
			this.newList = {
				channel: [],
				instrument: [],
				noteOn: [],
				pitch: [],
				tempoSetting: [],
				tempoTick: [],
				tickOff: [],
				tickOn: [],
				volume: [],
			}
			this.channelInstrument = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			this.pitchBends = {
				channel: [],
				tickOn: [],
				pitch: [],
				release: []
			}
			this.controllers = {
				channel: [],
				tickOn: [],
				control: [],
				value: []
			};
		}
		MidiParser.prototype.parse = function() {
			// After reading through the definitions of the three different MIDI formats a number of times I have come up with the following
			// summations for the types -
			// Type 0: Everything happens on Track 1 - any others tracks in a type 0 MIDI should incur an error
			// Type 1: Track 1 contains all timing related events. All other tracks are independent of each other except that they share the timing from track 1
			// Type 2: All tracks are completely independent
			// From these, my idea for unifying the way they can all be handled in the code is as follows -
			// Type 2 is essentially multiple occurences of type 0. I.e. All tracks contain timing and everything else for that specific track
			// For type 1, if I inject the timing from track 1 into all the other tracks and then remove track 1 then it essentially becomes a type 2
			// For type 2, if I inject all the tracks into track 1 then it becomes a type 0
			// This means that I can ultimately handle the parsing by treating every post-edited file as a type 0 file
			if (!(this.readUnsignedLong() == 1297377380)) {
				throw new Error("Invalid MIDI file");
			}
			if (!(this.readUnsignedLong() == 6)) {
				throw new Error("Invalid MIDI file");
			}
			this.formatType = this.readUnsignedShort();
			this.numberTracks = this.readUnsignedShort();
			this.timeDivision = this.readUnsignedShort();
			this.track = [];
			var trackID = 0;
			var _readUnsignedLong = this.readUnsignedLong.bind(this);
			var _readVariableLength = this.readVariableLength.bind(this);
			var _readUnsignedByte = this.readUnsignedByte.bind(this);
			var _readBytes = this.readBytes.bind(this);
			var _NoteOff = this.NoteOff.bind(this);
			var _NoteOn = this.NoteOn.bind(this);
			var _Controller = this.Controller.bind(this);
			var _PitchBend = this.PitchBend.bind(this);
			var trackName = '';
			while (trackID < this.numberTracks) {
				this.dataLength = this.data.length;
				var chuckId = _readUnsignedLong();
				if (!(chuckId == 1297379947)) {
					throw new Error("MTrk not found for track number " + (trackID + 1) + " - invalid MIDI file");
				}
				this.cleanProcessAllTracksDataIncludingTempoData(this.formatType !== 1 || trackID == 0);
				this.chuckSize = _readUnsignedLong();
				this.dataLength = this.index + this.chuckSize;
				this.pulseCounter = 0;
				var eventTypeValue = 0;
				trackName = 'Untitle Track';
				while (this.index < this.dataLength) {
					this.pulseCounter += _readVariableLength();
					var value = _readUnsignedByte();
					if (value == 255) {
						switch (_readUnsignedByte()) {
							case 47:
								// This is the end-of-track meta command so force the pointer to the end of the chunk to exit gracefully
								this.index = this.dataLength;
								break;
							case 81:
								this.newList.tempoTick.push(this.pulseCounter);
								this.newList.tempoSetting.push(Math.round(_readBytes(_readVariableLength()) / this.timeDivision));
								break;
							case 3:
								var l = _readVariableLength();
								trackName = '';
								for (let i = 0; i < l; i++) {
									trackName += String.fromCharCode(_readUnsignedByte());
								}
								break;
							default:
								// Most meta events are ignored. These are -
								// 0: Sequence number
								// 1: Text event
								// 2: Copyright notice
								// 4: Instrument name
								// 5: Lyric
								// 6: Marker
								// 7: Cue point
								// 32: MIDI Channel prefix
								// 84: SMTPE offset
								// 88: Time signature
								// 89: Key signature
								// 127: Sequencer-specific meta-event
								_readBytes(_readVariableLength());
						}
					} else {
						if (value > 239) {
							var temp = _readVariableLength();
							this.index += temp;
							// All system exclusive events are ignored. These are -
							// 240: F0 Sysex event
							// 247: F7 Sysex event
						} else {
							if (value > 127) {
								this.midiChannel = value % 16;
								eventTypeValue = ((value - this.midiChannel) / 16);
							} else {
								// TODO: Ought to check the previous command was a midi one in which case this is referred to as "running status"
								this.index -= 1;
							}
							this.parameter1 = _readUnsignedByte();
							// "Program change" and "Channel pressure" don't take an extra parameter
							if (!(eventTypeValue == 12 || eventTypeValue == 13)) {
								this.parameter2 = _readUnsignedByte();
							}
							switch (eventTypeValue) {
								case 8:
									_NoteOff();
									break;
								case 9:
									if (this.parameter2 > 0) {
										_NoteOn();
									} else {
										_NoteOff();
									}
									break;
								case 11:
									_Controller();
									break;
								case 12:
									this.channelInstrument[this.midiChannel] = this.parameter1;
									break;
								case 14:
									_PitchBend();
									break;
								case 10:
								case 13:
									// Ignored MIDI Channel Voice Messages are -
									// 10: Poly key pressure
									// 13: Channel pressure
									break;
								default:
									console.log("unknowm event: " + eventTypeValue);
							}
						}
					}
				}
				if (this.index !== this.dataLength) {
					throw new Error("Track number " + (trackID + 1) + " has overrun - invalid MIDI file");
				}
				this.convertToNoteBlocks();
				this.track.push([trackID + 1, trackName, this.finalList, this.finalPitchBends, this.finalControllers]);
				trackID += 1;
			}
			this.cleanProcessAllTracksDataIncludingTempoData(true);
			return {
				"name": "Midi File",
				"tracks": this.track,
				"tempo": this.timeDivision,
				"duration": this.duration,
				"formatType": this.formatType
			}
		}
		MidiParser.prototype.NoteOff = function() {
			var newListLength = this.newList.pitch.length - 1;
			for (var i = newListLength; i !== -1; i--) {
				if (this.parameter1 == this.newList.pitch[i] && this.midiChannel == this.newList.channel[i] && this.newList.noteOn[i] == true) {
					this.newList.tickOff[i] = this.pulseCounter;
					this.newList.noteOn[i] = false;
					return;
				}
			}
		}
		MidiParser.prototype.NoteOn = function() {
			this.newList.tickOn.push(this.pulseCounter);
			this.newList.tickOff.push(0);
			this.newList.channel.push(this.midiChannel);
			if (this.midiChannel == 9) {
				if (this.parameter1 < 27 || this.parameter1 > 87) {
					// We're receiving an invalid percussion instrument for some reason. Not much we can do really. Hardly worth a warning...
				}
				this.newList.instrument.push(null);
			} else {
				this.newList.instrument.push(this.channelInstrument[this.midiChannel]);
			}
			this.newList.pitch.push(this.parameter1);
			this.newList.volume.push(this.parameter2 - 1);
			this.newList.noteOn.push(true);
		}
		MidiParser.prototype.PitchBend = function() {
			this.pitchBends.tickOn.push(this.pulseCounter);
			this.pitchBends.channel.push(this.midiChannel);
			this.pitchBends.pitch.push(this.parameter2 * 128 + this.parameter1);
			this.pitchBends.release.push(this.parameter1);
		}
		MidiParser.prototype.Controller = function() {
			this.controllers.tickOn.push(this.pulseCounter);
			this.controllers.channel.push(this.midiChannel);
			this.controllers.control.push(this.parameter1);
			this.controllers.value.push(this.parameter2);
		}
		MidiParser.prototype.convertToNoteBlocks = function() {
			// This block simply scans through all of the note and tempo information that we've recorded
			// calculating the actual note lengths (including if the tempo changes mid-note)
			// and inserts the start-tick, pitch, duration, volume, instrument, channel
			// for each note at the correct position in the lists
			var _noteLength = this.newList.tickOn.length;
			var _tempoLength = this.newList.tempoTick.length;
			var _pitchBendLength = this.pitchBends.tickOn.length;
			var totalPulses = this.pulseCounter;
			var _pulseCounter = 0;
			var index = 0;
			var tempoIndex = 0;
			var currentPulseInSeconds = 0;
			// Set a default tempo of 120 bpm
			var tempo = (500000 / this.timeDivision);
			var _newList = this.newList;
			var _pitchBends = this.pitchBends;
			var _controllers = this.controllers;
			while (!(_pulseCounter > totalPulses)) {
				// Skip to next tick of interest
				var temp = totalPulses;
				if (tempoIndex < _tempoLength) {
					temp = _newList.tempoTick[tempoIndex];
				}
				if (index < _noteLength) {
					if (_newList.tickOn[index] < temp) {
						temp = _newList.tickOn[index];
					}
				}
				if (temp == totalPulses) {
					break;
				}
				currentPulseInSeconds += (tempo * (temp - _pulseCounter));
				_pulseCounter = temp;
				while (_newList.tempoTick[tempoIndex] == _pulseCounter) {
					tempo = _newList.tempoSetting[tempoIndex];
					tempoIndex += 1;
				}
				while (_newList.tickOn[index] == _pulseCounter) {
					var lengthInMilliseconds = (_newList.tickOff[index] - _newList.tickOn[index]) * tempo;
					if (_newList.instrument[index] == null) {
						this.finalList.push([0, _newList.pitch[index], Math.floor(lengthInMilliseconds), Math.floor(currentPulseInSeconds), _newList.volume[index], _newList.channel[index]]);
					} else {
						this.finalList.push([_newList.instrument[index] + 1, _newList.pitch[index], Math.floor(lengthInMilliseconds), Math.floor(currentPulseInSeconds), _newList.volume[index], _newList.channel[index]]);
					}
					index += 1;
				}
			}
			tempo = (500000 / this.timeDivision);
			_pulseCounter = 0;
			var index = 0;
			tempoIndex = 0;
			currentPulseInSeconds = 0;
			while (!(_pulseCounter > totalPulses)) {
				var temp = totalPulses;
				if (tempoIndex < _tempoLength) {
					temp = _newList.tempoTick[tempoIndex];
				}
				if (index < _pitchBendLength) {
					if (_pitchBends.tickOn[index] < temp) {
						temp = _pitchBends.tickOn[index];
					}
				}
				if (temp == totalPulses) {
					break;
				}
				currentPulseInSeconds += (tempo * (temp - _pulseCounter));
				_pulseCounter = temp;
				while (_newList.tempoTick[tempoIndex] == _pulseCounter) {
					tempo = _newList.tempoSetting[tempoIndex];
					tempoIndex += 1;
				}
				while (_pitchBends.tickOn[index] == _pulseCounter) {
					this.finalPitchBends.push([currentPulseInSeconds, _pitchBends.channel[index], _pitchBends.pitch[index]]);
					index += 1;
				}
			}
			tempo = (500000 / this.timeDivision);
			_pulseCounter = 0;
			var index = 0;
			tempoIndex = 0;
			currentPulseInSeconds = 0;
			while (!(_pulseCounter > totalPulses)) {
				var temp = totalPulses;
				if (tempoIndex < _tempoLength) {
					temp = _newList.tempoTick[tempoIndex];
				}
				if (index < _controllers.tickOn.length) {
					if (_controllers.tickOn[index] < temp) {
						temp = _controllers.tickOn[index];
					}
				}
				if (temp == totalPulses) {
					break;
				}
				currentPulseInSeconds += (tempo * (temp - _pulseCounter));
				_pulseCounter = temp;
				while (_newList.tempoTick[tempoIndex] == _pulseCounter) {
					tempo = _newList.tempoSetting[tempoIndex];
					tempoIndex += 1;
				}
				while (_controllers.tickOn[index] == _pulseCounter) {
					this.finalControllers.push([currentPulseInSeconds, _controllers.channel[index], _controllers.control[index], _controllers.value[index]]);
					index += 1;
				}
			}
			tempo = (500000 / this.timeDivision);
			_pulseCounter = 0;
			currentPulseInSeconds = 0;
			for (let i = 0; i < _newList.tempoTick.length; i++) {
				currentPulseInSeconds += (tempo * (_newList.tempoTick[i] - _pulseCounter));
				_pulseCounter = _newList.tempoTick[i];
				tempo = _newList.tempoSetting[i];
				var value = currentPulseInSeconds;
				if (value > this.duration) {
					this.duration = value;
				}
			}
			currentPulseInSeconds += (tempo * (totalPulses - _pulseCounter));
			var value = currentPulseInSeconds;
			if (value > this.duration) {
				this.duration = value;
			}
		}
		MidiParser.prototype.cleanProcessAllTracksDataIncludingTempoData = function(includingTempo) {
			this.newList.channel = [];
			this.newList.instrument = [];
			this.newList.noteOn = [];
			this.newList.pitch = [];
			this.newList.tickOff = [];
			this.newList.tickOn = [];
			this.newList.volume = [];
			this.pitchBends.channel = [];
			this.pitchBends.tickOn = [];
			this.pitchBends.pitch = [];
			this.pitchBends.release = [];
			this.controllers.channel = [];
			this.controllers.tickOn = [];
			this.controllers.control = [];
			this.controllers.value = [];
			this.finalList = [];
			this.finalPitchBends = [];
			this.finalControllers = [];
			if (includingTempo) {
				this.newList.tempoSetting = [];
				this.newList.tempoTick = [];
			}
		}
		MidiParser.prototype.readUnsignedLong = function() {
			return this.readBytes(4);
		}
		MidiParser.prototype.readUnsignedByte = function() {
			return this.data[this.index++];
		}
		MidiParser.prototype.readUnsignedShort = function() {
			return this.readBytes(2);
		}
		MidiParser.prototype.readVariableLength = function() {
			var value = 0;
			while (true) {
				if (!(this.index < this.dataLength)) {
					throw new Error("Unexpected end of input");
				}
				var temp = this.data[this.index];
				this.index += 1;
				value = ((value * 128) + (temp % 128));
				if (temp < 128) {
					return value;
				}
			}
		}
		MidiParser.prototype.readBytes = function(byteCount) {
			var d = 0;
			for (var i = 0; i < byteCount; i++) {
				if (!(this.index < this.dataLength)) {
					throw new Error("Unexpected end of input");
				}
				d = ((d * 256) + this.data[this.index]);
				this.index += 1;
			}
			return d;
		}
		module.exports = MidiParser;
	},
	'./src/midi64parser.js': function(module, exports, __webpack_require__) {
		var BASE64 = "0123456789abcdefghijklmnopqrstuvwxyz!\"£$%^&*()-=[];'#,./_+{}:@~<";
		var MidiParserBase64 = function(data) {
			this.data = data;
			this.index = 5;
		}
		MidiParserBase64.prototype.parse = function (e) {
			var fdgdfg = [];
			var fFS = this.ReadBase64(2);
			this.index += fFS;
			var sp = 0;
			while (this.index < this.data.length) {
				var kjjh = [];
				kjjh.push(this.ReadBase64(2));
				kjjh.push(this.ReadBase64(2));
				kjjh.push(this.ReadBase64(4));
				kjjh.push(this.ReadBase64(4));
				kjjh.push(this.ReadBase64(2));
				kjjh.push(kjjh[0] % 16);
				sp += kjjh[3];
				if ((kjjh[2] > 1) || (kjjh[0] == 0)) {
					fdgdfg.push([kjjh[0], kjjh[1], kjjh[2] * 1000, sp * 1000, Math.round((kjjh[4] / 100) * 127), kjjh[5]]);
				}
			}
			return fdgdfg;
		}
		MidiParserBase64.prototype.ReadBase64 = function (e) {
			var value = 0;
			for (var i = 0; i < e; i++) {
				value = (value * 64) + BASE64.indexOf(this.data[this.index]);
				this.index += 1;
			}
			return value;
		}
		module.exports = MidiParserBase64;
	},
	'./src/track.js': function(module, exports, __webpack_require__) {
		var MidiTrack = function(mse, trackNumber, name, notes, pitchBends, controllers) {
			this.name = name;
			this.mse = mse;
			this.trackNumber = trackNumber;
			this.decodeNoteQueue = notes;
			this.decodeControllers = [];
			if (controllers) {
				this.decodeControllers = controllers;
				var controllersLast = new Array(128 * 16);
				for (let index = 0; index < (128 * 16); index++) {
					controllersLast[index] = null;
				}
				for (let index = 0; index < this.decodeControllers.length; index++) {
					const _g = this.decodeControllers[index][2] + (128 * this.decodeControllers[index][1]);
					if (this.decodeControllers[index][4] === undefined) {
						this.decodeControllers[index].push(controllersLast[_g]);
					}
					controllersLast[_g] = index;
				}
			}
			this.pitchBendsEnd = new Array(16);
			if (pitchBends) {
				this.decodePitchBends = pitchBends;
				var pitchBendsLast = new Array(128 * 16);
				for (let index = 0; index < (128 * 16); index++) {
					pitchBendsLast[index] = null;
				}
				for (let index = 0; index < this.decodePitchBends.length; index++) {
					const _g = this.decodePitchBends[index][1];
					if (this.decodePitchBends[index][3] === undefined) {
						this.decodePitchBends[index].push(pitchBendsLast[_g]);
					}
					pitchBendsLast[_g] = index;
				}
			} else {
				this.decodePitchBends = [];
			}
			this.reset();
		}
		MidiTrack.prototype.reset = function() {
			this.noteTracker = 0;
			this.controllerIndex = 0;
			this.pitchBendIndex = 0;
			this.pitchBendChannel = [8192, 8192, 8192, 8192, 8192, 8192, 8192, 8192, 8192, 8192, 8192, 8192, 8192, 8192, 8192, 8192];
			this.volumeChannel = [127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127];
			this.expressionChannel = [127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127];
			this.panChannel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			this.dataEntryMSB = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
			this.dataEntryLSB = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
			this.registeredParameterMSBchannel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			this.registeredParameterLSBchannel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			this.sustainPedalChannel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		}
		MidiTrack.prototype.update = function(time) {
			var _t = (time * 1000000);
			if (this.decodePitchBends.length > 0) {
				while (this.pitchBendIndex < this.decodePitchBends.length && _t >= this.decodePitchBends[this.pitchBendIndex][0]) {
					this.pitchBendChannel[this.decodePitchBends[this.pitchBendIndex][1]] = this.decodePitchBends[this.pitchBendIndex][2];
					this.pitchBendIndex += 1;
				}
				this.pitchBendIndex -= 1;
				while (this.pitchBendIndex >= 0 && _t <= this.decodePitchBends[this.pitchBendIndex][0]) {
					var _id = this.decodePitchBends[this.pitchBendIndex][3];
					if (_id !== null) {
						var pitchBendLast = this.decodePitchBends[_id];
						this.pitchBendChannel[pitchBendLast[1]] = pitchBendLast[2];
					} else {
						this.pitchBendChannel[this.decodePitchBends[this.pitchBendIndex][1]] = 8192;
					}
					this.pitchBendIndex -= 1;
				}
				this.pitchBendIndex += 1;
			}
			if (this.decodeControllers.length > 0) {
				while ((this.controllerIndex < this.decodeControllers.length) && (_t >= this.decodeControllers[this.controllerIndex][0])) {
					var controller = this.decodeControllers[this.controllerIndex];
					this.setController(controller[1], controller[2], controller[3], false);
					this.controllerIndex += 1;
				}
				this.controllerIndex -= 1;
				if (this.controllerIndex >= 0) {
					while ((this.controllerIndex >= 0) && (_t <= this.decodeControllers[this.controllerIndex][0])) {
						var controller = this.decodeControllers[this.controllerIndex];
						var _id = controller[4];
						if (_id !== null) {
							controller = this.decodeControllers[controller[4]];
							this.setController(controller[1], controller[2], controller[3], false);
						} else {
							controller = this.decodeControllers[this.controllerIndex];
							if (controller) {
								this.setController(controller[1], controller[2], controller[3], true);
							}
						}
						this.controllerIndex -= 1;
					}
				}
				this.controllerIndex += 1;
			}
		}
		MidiTrack.prototype.sreathController = function(channel, control) {
			var result = [];
			for (let index = 0; index < this.decodeControllers.length; index++) {
				const element = this.decodeControllers[index];
				if (channel == element[1] && control == element[2]) {
					result.push(element);
				}
			}
			return result;
		}
		MidiTrack.prototype.setController = function(channel, control, value, isEnd) {
			switch (control) {
				case 6: // Data Entry (MSB)
					this.dataEntryMSB[channel] = value;
					break;
				case 7: // Channel Volume (formerly Main Volume)
					this.volumeChannel[channel] = value;
					if (isEnd) {
						this.volumeChannel[channel] = 127;
					}
					break;
				case 10: // Pan
					this.panChannel[channel] = value;
					break;
				case 11: // Expression Controller
					this.expressionChannel[channel] = value;
					if (isEnd) {
						this.expressionChannel[channel] = 127;
					}
					break;
				case 38: // Data entry (LSB)
					this.dataEntryLSB[channel] = value;
					break;
				case 64: // Damper pedal on/off (Sustain)
					this.sustainPedalChannel[channel] = value;
					if (isEnd) {
						this.sustainPedalChannel[channel] = 0;
					}
					if (this.mse.isEffect) {
						for (let i = 0; i < this.mse.notesPlaying.length; i++) {
							const c = this.mse.notesPlaying[i];
							if ((c.track == this.trackNumber) && (c.channel == channel)) {
								if (this.sustainPedalChannel[channel] > 0) {
									c.duration = Infinity;
								} else {
									c.duration = c.dur;
									if (c.release && !c.release.ended && this.mse.getTime() - c.startTime >= c.duration) {
										c.release.ended = true;
									}
								}
							}
						}
					}
					break;
				case 100: // Registered Parameter Number LSB
					this.registeredParameterLSBchannel[channel] = value;
					break;
				case 101: // Registered Parameter Number MSB
					this.registeredParameterMSBchannel[channel] = value;
					break;
				case 0: // Bank Select (MSB)
				case 1: // Modulation wheel (MSB)
				case 2: // Breath control (MSB)
				case 4: // Foot controller (MSB)
				case 5: // Portamento time (MSB)
				case 8: // Balance (MSB)
				case 12: // Effect control 1 (MSB)
				case 13: // Effect control 2 (MSB)
				case 16: // General Purpose Controller #1 (MSB)
				case 17: // General Purpose Controller #2 (MSB)
				case 18: // General Purpose Controller #3 (MSB)
				case 19: // General Purpose Controller #4 (MSB)
				case 32: // Bank Select (LSB)
				case 33: // Modulation wheel (LSB)
				case 34: // Breath control (LSB)
				case 36: // Foot controller (LSB)
				case 37: // Portamento time (LSB)
				case 39: // Channel Volume (formerly Main Volume) (LSB)
				case 40: // Balance (LSB)
				case 42: // Pan (LSB)
				case 43: // Expression Controller (LSB)
				case 44: // Effect control 1 (LSB)
				case 45: // Effect control 2 (LSB)
				case 48: // General Purpose Controller #1 (LSB)
				case 49: // General Purpose Controller #2 (LSB)
				case 50: // General Purpose Controller #3 (LSB)
				case 51: // General Purpose Controller #4 (LSB)
				case 65: // Portamento on/off
				case 66: // Sustenuto on/off
				case 67: // Soft pedal on/off
				case 68: // Legato Footswitch
				case 69: // Hold 2
				case 70: // Sound Controller 1 (Sound Variation) (LSB)
				case 71: // Sound Controller 2 (Timbre) (LSB)
				case 72: // Sound Controller 3 (Release Time) (LSB)
				case 73: // Sound Controller 4 (Attack Time) (LSB)
				case 74: // Sound Controller 5 (Brightness) (LSB)
				case 75: // Sound Controller 6 (LSB)
				case 76: // Sound Controller 7 (LSB)
				case 77: // Sound Controller 8 (LSB)
				case 78: // Sound Controller 9 (LSB)
				case 79: // Sound Controller 10 (LSB)
				case 80: // General Purpose Controller #5 (LSB)
				case 81: // General Purpose Controller #6 (LSB)
				case 82: // General Purpose Controller #7 (LSB)
				case 83: // General Purpose Controller #8 (LSB)
				case 84: // Portamento Control
				case 91: // Effects 1 Depth (LSB)
				case 92: // Effects 2 Depth (LSB)
				case 93: // Effects 3 Depth (LSB)
				case 94: // Effects 4 Depth (LSB)
				case 95: // Effects 5 Depth (LSB)
				case 96: // Data entry +1
				case 97: // Data entry -1
				case 98: // Non-Registered Parameter Number (LSB)
				case 99: // Non-Registered Parameter Number (MSB)
				case 120: // All Sound Off
				case 121: // Reset All Controllers
				case 122: // Local control on/off
				case 123: // All notes off
				case 124: // Omni mode off (+ all notes off)
				case 125: // Omni mode on (+ all notes off)
				case 126: // Poly mode on/off (+ all notes off)
				case 127: // Poly mode on (incl mono=off +all notes off)
					break;
			}
		}
		MidiTrack.prototype.getSustainPedalChannel = function(channel) {
			return this.sustainPedalChannel[channel];
		}
		MidiTrack.prototype.getPanChannel = function(channel) {
			return (this.panChannel[channel] - 64) / 63 * 100;
		}
		MidiTrack.prototype.getVolumeChannel = function(channel) {
			return (this.volumeChannel[channel] * (this.expressionChannel[channel] / 127)) / 127;
		}
		MidiTrack.prototype.getPitchBend = function(channel) {
			if (channel == 9) {
				return 0;
			}
			var value = this.dataEntryMSB[channel];
			return (((this.pitchBendChannel[channel] - 8192) / 8192) * value);
		}
		MidiTrack.prototype.getNote = function(time, mute) {
			var GS = [];
			if (this.decodeNoteQueue.length > 0) {
				if (this.noteTracker < this.decodeNoteQueue.length && (Math.floor(time * 1000000) > this.decodeNoteQueue[this.noteTracker][3])) {
					while (!(this.noteTracker >= this.decodeNoteQueue.length || (Math.floor(time * 1000000) < this.decodeNoteQueue[this.noteTracker][3]))) {
						if (!mute) {
							GS.push(this.noteTracker);
						}
						this.noteTracker += 1;
					}
				}
				this.noteTracker -= 1;
				if (this.noteTracker >= 0 && (Math.floor(time * 1000000) <= this.decodeNoteQueue[this.noteTracker][3])) {
					while (!(this.noteTracker < 0 || (Math.floor(time * 1000000) > this.decodeNoteQueue[this.noteTracker][3]))) {
						this.noteTracker -= 1;
					}
				}
				this.noteTracker += 1;
			}
			return GS;
		}
		module.exports = MidiTrack;
	},
	'./src/player.js': function(module, exports, __webpack_require__) {
		var MidiParser = __webpack_require__("./src/midiparser.js");
		var MidiParserBase64 = __webpack_require__("./src/midi64parser.js");
		var SOUNDBANKS = __webpack_require__("./src/soundbank.js");
		var MidiTrack = __webpack_require__("./src/track.js");
		var SOUNDBANK_INFOS = SOUNDBANKS.SOUNDBANK_INFOS;
		var MIDI_INSTRUMENT = SOUNDBANKS.MIDI_INSTRUMENT;
		var DRUMS_MIDI = SOUNDBANKS.DRUMS_MIDI;
		var DRUMS = SOUNDBANKS.DRUMS;
		var INSTRUMENT = SOUNDBANKS.INSTRUMENT;
		const ASSET_URL = 'https://assets.scratch.mit.edu/internalapi/asset/$md5ext/get/';
		var MidiSoundEngine = function() {
			this.audioContext = new AudioContext();
			this.node = this.audioContext.createGain();
			this.node.gain.value = 1;
			this.node.connect(this.audioContext.destination);
			this.soundbank = {};
			this.noteTracker = 0;
			this.startTime = 0;
			this.songs = null;
			this.step = this.step.bind(this);
			this.duration = 0;
			this.muteMusicr = false;
			this.DateTime = 0;
			this.frameStart = 0;
			this.onplaynote = null;
			this.onended = null;
			this.onprogress = null;
			this.speed = 1;
			this.isEffect = true;
			this.isPaused = true;
			this.MidiTimer = 0;
			this.pauseTime = 0;
			this.notesPlaying = [];
			this.trackQueue = [];
			this._soundbank = {};
			this._soundbankLoaded = 0;
			this.frameStart = Date.now();
			this.interval = setInterval(this.step, 1000 / 60);
		}
		MidiSoundEngine.CONCURRENCY_LIMIT = 250;
		MidiSoundEngine.prototype.cleanup = function() {
			this.stop();
			this.duration = 0;
			this.trackQueue = [];
			if (this.oncleanup) {
				this.oncleanup();
			}
		}
		MidiSoundEngine.prototype.noteArrayToClass = function(s, h) {
			if (s[0] > 0) {
				return {
					instrument: s[0],
					pitch: s[1],
					duraction: s[2] / (h ? 1000000 : 1),
					times: s[3] / (h ? 1000000 : 1),
					volume: s[4] / 100,
					channel: s[5],
					type: "note"
				}
			} else {
				return {
					drum: s[1],
					duraction: s[2] / (h ? 1000000 : 1),
					times: s[3] / (h ? 1000000 : 1),
					volume: s[4] / 100,
					channel: s[5],
					type: "drum"
				}
			}
		}
		MidiSoundEngine.prototype.resetTrack = function() {
			for (var i = 0; i < this.trackQueue.length; i++) {
				this.trackQueue[i].reset();
			}
		}
		MidiSoundEngine.prototype.setCurrentTime = function(s) {
			this.muteMusicr = true;
			this.MidiTimer = s;
			this.setStartTime(this.MidiTimer);
			if (this.MidiTimer <= 0) {
				this.MidiTimer = 0;
				this.resetTrack();
				this.setStartTime(0);
			}
			if (this.MidiTimer > this.duration) {
				this.MidiTimer = this.duration;
				this.setStartTime(this.duration);
			}
			this.stopAllPlaying();
		}
		MidiSoundEngine.prototype.setStartTime = function(s) {
			this.startTime = (Date.now() - ((s / this.speed) * 1000));
		}
		MidiSoundEngine.prototype.setSpeed = function(s) {
			this.speed = s;
			this.setStartTime(this.MidiTimer);
		}
		MidiSoundEngine.prototype.decodeAudio = function(ab) {
			var _this = this;
			return new Promise(function(resolve, reject) {
				_this.audioContext.decodeAudioData(ab, function (buffer) {
					resolve(buffer);
				}, function (err2) {
					reject("Could not decode audio: " + err2);
				});
			});
		}
		MidiSoundEngine.prototype.loadSoundbankBuffer = function(name) {
			var _this = this;
			return fetch(ASSET_URL.replace('$md5ext', SOUNDBANK_INFOS[name].file)).then(function(r) { return r.arrayBuffer() }).then(function(buffer) {
				var d = new DataView(buffer);
				var data = [];
				for (var i5 = 0; i5 < buffer.byteLength; i5++) {
					data.push(d.getUint8(i5, true));
				}
				return _this.decodeAudio(buffer).then(function(o) {
					return new Promise(function(resolve, reject) {resolve({data: new Uint8Array(data), buffer: o})});
				})
			}).then(function(sound) {
				_this.soundbank[name] = sound;
			});
		}
		MidiSoundEngine.prototype.loadSoundbank = function() {
			var _this = this;
			const promises = [];
			this._soundbankLoaded = 0;
			for (const name in SOUNDBANK_INFOS) {
				if (name in this._soundbank && !this.soundbank[name]) {
					this._soundbankLoaded += 1;
					const promise = this.loadSoundbankBuffer(name);
					promises.push(promise.then(function () {
						_this.onprogress && _this.onprogress("loaded instruments " + _this._soundbankLoaded);
						_this._soundbankLoaded -= 1;
					}));
				}
			}
			return Promise.all(promises).then(function() {
				_this.onprogress && _this.onprogress("");
			});
		}
		MidiSoundEngine.prototype.loadSoundbankAll = function() {
			var _this = this;
			const promises = [];
			this._soundbankLoaded = 0;
			for (const name in SOUNDBANK_INFOS) {
				if (!this.soundbank[name]) {
					this._soundbankLoaded += 1;
					const promise = this.loadSoundbankBuffer(name);
					promises.push(promise.then(function () {
						_this.onprogress && _this.onprogress("loaded instruments " + _this._soundbankLoaded);
						_this._soundbankLoaded -= 1;
					}));
				}
			}
			_this.onprogress && _this.onprogress("loaded instruments " + _this._soundbankLoaded);
			return Promise.all(promises).then(function() {
				_this.onprogress && _this.onprogress("");
			});
		}
		MidiSoundEngine.prototype.setVolume = function(v) {
			this.node.gain.value = v;
		}
		MidiSoundEngine.prototype.play = function() {
			this.isPaused = false;
			this.setStartTime(this.MidiTimer);
			if (this.MidiTimer >= this.duration) {
				this.MidiTimer = 0;
				this.setStartTime(0);
				this.resetTrack();
			}
		}
		MidiSoundEngine.prototype.stopAllPlaying = function() {
			for (var i = 0; i < this.notesPlaying.length; i++) {
				this.notesPlaying[i].ended = true;
			}
		}
		MidiSoundEngine.prototype.stop = function() {
			this.isPaused = true;
			this.MidiTimer = 0;
			this.setStartTime(0);
			this.resetTrack();
			this.stopAllPlaying();
		}
		MidiSoundEngine.prototype.pause = function() {
			this.isPaused = true;
			this.setStartTime(this.MidiTimer);
			this.stopAllPlaying();
		}
		MidiSoundEngine.prototype.getNoteLength = function() {
			var gfg = 0;
			for (var i = 0; i < this.trackQueue.length; i++) {
				gfg += this.trackQueue[i].decodeNoteQueue.length;
			}
			return gfg;
		}
		MidiSoundEngine.prototype.getNoteTracker = function() {
			var gfg = 0;
			for (var i = 0; i < this.trackQueue.length; i++) {
				gfg += this.trackQueue[i].noteTracker;
			}
			return gfg;
		}
		MidiSoundEngine.prototype.getTime = function(s) {
			return s ? (this.MidiTimer / 1000000) : this.MidiTimer;
		}
		MidiSoundEngine.prototype.getSoundBankSize = function() {
			var result = 0;
			for (var name in this.soundbank) {
				result += this.soundbank[name].data.length;
			}
			return result;
		}
		MidiSoundEngine.prototype.vidAudio = function(samples, n) {
			if (Array.isArray(samples)) {
				for (var i = samples.length - 1; i >= 0; i--) {
					if (n >= samples[i][0]) {
						return samples[i][1];
					}
				}
				return samples[0][1];
			}
			return samples || 1;
		}
		MidiSoundEngine.prototype.playNotes = function(n) {
			// If we're playing too many sounds, do not play the note.
			if (this.notesPlaying.length >= MidiSoundEngine.CONCURRENCY_LIMIT) {
				return;
			}
			if (n.volume == 0) {
				return;
			}
			if (n.type == 'note') {
				var span = INSTRUMENT[MIDI_INSTRUMENT[n.instrument - 1]];
				if (!span) return;
				const buffer = this.soundbank[MIDI_INSTRUMENT[n.instrument - 1]].buffer;
				const source = this.audioContext.createBufferSource();
				const note = this.audioContext.createGain();
				source.buffer = buffer;
				if (source.loop = span.loop) {
					source.loopStart = 2;
					source.loopEnd = 5;
				}
				source.connect(note);
				var pitch = (span.releasePatch ? (n.pitch + (span.releasePatch - 60)) : n.pitch);
				source.playbackRate.value = Math.pow(2, ((pitch - 60) / 12));
				const gain = note.gain;
				var volume = n.volume * this.vidAudio(span.volume, n.pitch);
				gain.value = volume;
				const releaseGain = this.audioContext.createGain();
				releaseGain.gain.value = 1;
				note.connect(releaseGain);
				releaseGain.connect(this.node);
				var releaseDuration = span.releaseTime;
				if (typeof releaseDuration === 'undefined') {
					releaseDuration = 0;
				}
				var te = {
					ended: false,
					source: source,
					note: note,
					startTime: this.getTime(),
					duration: n.dur,
					dur: n.dur,
					release: {
						duration: releaseDuration,
						releaseGain: releaseGain,
						ended: false,
					},
					volume: volume,
					pitch: pitch,
					track: n.track,
					channel: n.channel
				};
				te.endedFunction = function () {
					te.ended = true;
				}
				source.addEventListener("ended", te.endedFunction);
				this._startNote(te);
				this._updateEffectNote(te);
				source.start();
				this.notesPlaying.push(te);
			} else if (n.type == 'drum') {
				var span = DRUMS[DRUMS_MIDI[n.drum - 27]];
				if (!span) return;
				const buffer = this.soundbank[DRUMS_MIDI[n.drum - 27]];
				if (!buffer) return;
				const source = this.audioContext.createBufferSource();
				const note = this.audioContext.createGain();
				source.buffer = buffer.buffer;
				source.connect(note);
				note.connect(this.node);
				const gain = note.gain;
				var volume = (n.volume * (span.volume || 1)) * 0.8;
				gain.value = volume;
				var te = {
					ended: false,
					note: note,
					volume: volume,
					pitch: 60,
					source: source,
					track: n.track,
					channel: n.channel
				};
				te.endedFunction = function () {
					te.ended = true;
				}
				source.addEventListener("ended", te.endedFunction);
				this._startNote(te);
				this._updateEffectNote(te);
				source.start();
				this.notesPlaying.push(te);
			}
		}
		MidiSoundEngine.prototype._startNote = function(n) {
			if (this.isEffect && n.track) {
				if (this.trackQueue[n.track - 1].getSustainPedalChannel(n.channel) > 0) {
					n.duration = Infinity;
				}
			}
		}
		MidiSoundEngine.prototype._updateEffectNote = function(n) {
			if (this.isEffect && n.track) {
				n.source.playbackRate.value = Math.pow(2, (((n.pitch + this.trackQueue[n.track - 1].getPitchBend(n.channel)) - 60) / 12));
				n.note.gain.value = n.volume * this.trackQueue[n.track - 1].getVolumeChannel(n.channel);
				if (n.pan) {
					const p = (this.trackQueue[n.track - 1].getPanChannel(n.channel) + 100) / 200;
					const leftVal = Math.cos(p * Math.PI / 2);
					const rightVal = Math.sin(p * Math.PI / 2);
					n.pan.leftGain.gain.setValueAtTime(leftVal, this.audioContext.currentTime);
					n.pan.rightGain.gain.setValueAtTime(rightVal, this.audioContext.currentTime);
				}
			} else {
				n.source.playbackRate.value = Math.pow(2, ((n.pitch - 60) / 12));
				n.note.gain.value = n.volume;
				n.duration = n.dur;
			}
		}
		MidiSoundEngine.prototype.step = function() {
			var newList = [];
			this.DateTime = (Date.now() - this.frameStart) / 1000;
			if (this.MidiTimer > this.duration && !this.isPaused) {
				this.MidiTimer = this.duration;
				this.setStartTime(this.duration);
				for (var i = 0; i < this.notesPlaying.length; i++) {
					var dn = this.notesPlaying[i]; 
					dn.ended = true;
				}
				if (this.onended) this.onended();
				this.isPaused = true;
			}
			if (!this.isPaused && !this.muteMusicr) {
				this.MidiTimer = ((Date.now() - this.startTime) * this.speed) / 1000;
			}
			function GS(f, s) {
				for (var i6 = 0; i6 < f.length; i6++) {
					if (f[i6].dur > 0) {
						if (f[i6].type == 'note' && s.type == 'note') {
							if (MIDI_INSTRUMENT[f[i6].instrument - 1] == MIDI_INSTRUMENT[s.instrument - 1] && f[i6].pitch == s.pitch) {
								return false;
							}
						} else if (f[i6].type == 'drum' && s.type == 'drum') {
							if (f[i6].drum == s.drum) {
								return false;
							}
						}
					}
				}
				return true;
			}
			var playNote = [];
			for (var i = 0; i < this.trackQueue.length; i++) {
				this.trackQueue[i].update(this.getTime());
				var fh = this.trackQueue[i].getNote(this.getTime(), this.muteMusicr);
				var HShh = this.trackQueue[i].decodeNoteQueue;
				for (var i1 = 0; i1 < fh.length; i1++) {
					var n = this.noteArrayToClass(HShh[fh[i1]], true);
					if (n.type == 'note') {
						if (n.duraction > 0) {
							if (this.onplaynote) {
								this.onplaynote({
									pitch: n.pitch,
									dur: n.duraction,
									instrument: n.instrument,
									volume: n.volume * 0.78,
									channel: n.channel,
									type: 1
								});
							}
							if (this.node.gain.value && n.volume) {
								playNote.push({
									type: 'note',
									instrument: n.instrument,
									pitch: n.pitch,
									isOn: true,
									volume: n.volume * 0.78,
									channel: n.channel,
									track: this.trackQueue[i].trackNumber,
									dur: n.duraction,
								});
							}
						}
					} else if (n.type == 'drum') {
						if (n.duraction > 0) {
							if (this.onplaynote) {
								this.onplaynote({
									drum: n.drum,
									volume: n.volume * 0.78,
									channel: n.channel,
									type: 0
								});
							}
							if (this.node.gain.value && n.volume) {
								playNote.push({
									type: 'drum',
									drum: n.drum,
									volume: n.volume * 0.78,
									isOn: true,
									channel: n.channel,
									track: this.trackQueue[i].trackNumber,
									dur: n.duraction,
								});
							}
						}
					}
				}
			}		
			var playNoteFix = [];
			for (var i = 0; i < playNote.length; i++) {
				if (playNote[i].dur > 0) {
					if (GS(playNoteFix, playNote[i])) {
						playNoteFix.push(playNote[i]);
					}
				}
			}
			for (var i = 0; i < playNoteFix.length; i++) {
				this.playNotes(playNoteFix[i]);
			}
			for (let i = this.notesPlaying.length; i--;) {
				var n = this.notesPlaying[i];
				if (!n.ended) {
					if (n.release) {
						if (!n.release.ended && this.getTime() - n.startTime >= n.duration) {
							n.release.ended = true;
						}
						if (n.release.ended) {
							if (!("startTime" in n.release)) {
								n.release.startTime = this.getTime();
							}
							if (n.release.duration) {
								n.release.releaseGain.gain.value = Math.max(0, (1 - ((this.getTime() - n.release.startTime) / n.release.duration)));
								if ((this.getTime() - n.release.startTime) >= n.release.duration) {
									n.ended = true;
								}
							} else {
								n.ended = true;
							}
						}
					}
					this._updateEffectNote(n);
				}
				if (!n.ended) {
					newList.push(n);
				} else {
					n.source.removeEventListener("ended", n.endedFunction);
					n.source.disconnect();
					n.note.disconnect();
				}
			}
			this.notesPlaying = newList;
			if (this.muteMusicr) {
				this.muteMusicr = false;
			}
			this.frameStart = Date.now();
		}
		MidiSoundEngine.prototype.getMidi = function(txt) {
			if (typeof txt === "string") {
				if ((txt[0] + txt[1] + txt[2] + txt[3] + txt[4]) == "mid32") {
					var dfg = new MidiParserBase64(txt);
					var d = {
						name: "MIDI BASE64",
						notes: dfg.parse()
					}
					return d;
				} else {
					var f = txt.split('\n');
					var f1 = [];
					for (var i = 0; i < f.length; i += 5) {
						f1.push([Number(f[i]) || 0, Number(f[i + 1]) || 0, Number(f[i + 2]) || 0, Number(f[i + 3]) || 0, Number(f[i + 4])]);
					}
					var d = {
						name: "MIDI TEXT",
						notes: f1
					}
					return d;	
				}
			} else {
				if ("notes" in txt || "tracks" in txt) {
					return txt;
				} else {
					return JSON.parse(txt);
				}
			}
		}
		MidiSoundEngine.prototype.loadMid = function(data) {
			this.stop();
			this.cleanup();
			var parser = new MidiParser(data);
			var gf_h = Date.now();
			var result = parser.parse();
			this.loadedTime = Date.now() - gf_h;
			this.loadMidi(result);
		}
		MidiSoundEngine.prototype.loadMidi = function(data) {
			this.stop();
			var data_1 = this.getMidi(data);
			this.songs = data_1.name;
			var tracks = data_1.tracks;
			this.trackQueue = [];
			if ("notes" in data_1) {
				for (var i1 = 0; i1 < data_1.notes.length; i1++) {
					var gf = data_1.notes[i1];
					if (gf[0] === 0) {
						gf[1] += 34;
					}
				}
				for (var i1 = 0; i1 < data_1.notes.length; i1++) {
					var gf = data_1.notes[i1];
					if (gf[2] + gf[3] > this.duration) {
						this.duration = gf[2] + gf[3];
					}
					if (gf[0] > 0) {
						if (gf[2]) {
							if (MIDI_INSTRUMENT[Math.round(gf[0]) - 1]) {
								this._soundbank[MIDI_INSTRUMENT[Math.round(gf[0]) - 1]] = {};
							}
						}
					} else {
						if (DRUMS_MIDI[Math.round(gf[1]) - 27]) {
							this._soundbank[DRUMS_MIDI[Math.round(gf[1]) - 27]] = {};
						}
					}
				}
				this.duration /= 1000000;
				this.trackQueue.push(new MidiTrack(this, 1, "", data_1.notes));
			} else {
				for (var i = 0; i < tracks.length; i++) {
					this.trackQueue.push(new MidiTrack(this, tracks[i][0], tracks[i][1], tracks[i][2], tracks[i][3], tracks[i][4]));
				}
				for (var i = 0; i < tracks.length; i++) {
					for (var i1 = 0; i1 < tracks[i][2].length; i1++) {
						var gf = tracks[i][2][i1];
						if (gf[0] > 0) {
							if (gf[2]) {
								if (MIDI_INSTRUMENT[Math.round(gf[0]) - 1]) {
									this._soundbank[MIDI_INSTRUMENT[Math.round(gf[0]) - 1]] = {};
								}
							}
						} else {
							if (DRUMS_MIDI[Math.round(gf[1]) - 27]) {
								this._soundbank[DRUMS_MIDI[Math.round(gf[1]) - 27]] = {};
							}
						}
					}
				}
				this.duration = (data_1.duration / 1000000);
			}
			if (this.onload) {
				this.onload();
			}
		}
		module.exports = MidiSoundEngine;
	},
	'./src/index.js': function(module, exports, __webpack_require__) {
		var MidiSoundEngine = __webpack_require__("./src/player.js");
		var MidiParser = __webpack_require__("./src/midiparser.js");
		var SOUNDBANKS = __webpack_require__("./src/soundbank.js");
		var SOUNDBANK_INFOS = SOUNDBANKS.SOUNDBANK_INFOS;
		var MIDI_INSTRUMENT = SOUNDBANKS.MIDI_INSTRUMENT;
		var DRUMS_MIDI = SOUNDBANKS.DRUMS_MIDI;
		var DRUMS = SOUNDBANKS.DRUMS;
		var INSTRUMENT = SOUNDBANKS.INSTRUMENT;
		exports.MidiSoundEngine = MidiSoundEngine;
		exports.MidiParser = MidiParser;
		exports.MIDI_INSTRUMENT = MIDI_INSTRUMENT;
		exports.DRUMS_MIDI = DRUMS_MIDI;
		exports.DRUMS = DRUMS;
		exports.INSTRUMENT = INSTRUMENT;
		exports.SOUNDBANK_INFOS = SOUNDBANK_INFOS;
		window.MidSE = exports;
	}
});
