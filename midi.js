/*
Midi Sound Engine

my custom sound engine

https://scratch.mit.edu/projects/718048299/

2022/12/18 Anim Tred
*/

var MidSE = (function(){
	var audioContext = new AudioContext();
	var BASE64 = "0123456789abcdefghijklmnopqrstuvwxyz!\"£$%^&*()-=[];'#,./_+{}:@~<";
	var DRUMS = {
		"snare drum": {},
		"side stick": { volume: 0.7 },
		"crash cymbal": {},
		"open hi hat": { volume: 0.5 },
		"closed hi hat": { volume: 0.5 },
		"low floor tom": {},
		"high floor tom": {},
		"low tom": {},
		"low mid tom": {},
		"hi mid tom": {},
		"high tom": {},
		"tambourine": { volume: 0.35 },
		"hand": {},
		"claves": { volume: 0.7 },
		"wood": { volume: 0.9 },
		"cowbell": { volume: 0.7 },
		"triangle": {},
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
		"mute triangle": {},
		"high agogo": { volume: 0.7 },
		"low agogo": { volume: 0.7 },
		"conga": {},
		"open conga": {},
		"mute conga": {},
		"acoustic bass drum": {},
	}
	var INSTRUMENT = {
		"piano": { releaseTime: 0.5, volume: [[36, 0.8], [48, 0.65], [60, 0.4], [72, 0.3]] },
		"electric piano": { releaseTime: 0.5, volume: 0.7 },
		"organ": { releaseTime: 0.5, volume: 0.85, releasePatch: 52 },
		"guitar": { releaseTime: 0.5, volume: 0.66 },
		"electric guitar": { releaseTime: 0.5, releasePatch: 60, volume: 0.6 },
		"bass": { releaseTime: 0.25, volume: [[36, 0.75], [48, 0.65]] },
		"pizzicato": { releaseTime: 0.25, volume: [[48, 0.55], [60, 0.45]], releasePatch: 47 },
		"harmonica": { loop: true, loopStart: 2, loopEnd: 25, volume: 0.5 },
		"clarinet": { loop: true, loopStart: 2, loopEnd: 25, volume: 0.7 },
		"saxophone": { loop: true, loopStart: 2, loopEnd: 25, volume: 0.6 },
		"violin": { releaseTime: 0.1, loop: true, loopStart: 2, loopEnd: 25, volume: 0.7 },
		"violin_2": { releaseTime: 0.5, loop: true, loopStart: 2, loopEnd: 25, volume: 0.7 },
		"overdriven guitar": { releasePatch: 61, loop: true, loopStart: 2, loopEnd: 4, volume: [[48, 1], [60, 0.8]] },
		"flute": { loop: true, loopStart: 2, loopEnd: 25, volume: [[60, 0.6], [72, 0.4]] },
		"wooden flute": { releasePatch: 58, loop: true, loopStart: 2, loopEnd: 25, volume: [[60, 0.8], [72, 0.7]]},
		"bassoon": { loop: true, loopStart: 2, loopEnd: 25, volume: [[36, 0.65], [48, 0.55], [60, 0.4]] },
		"choir": { releaseTime: 0.25, loop: true, loopStart: 2, loopEnd: 25, volume: 0.7 },
		"vibraphone": { releaseTime: 0.25, releasePatch: 58, volume: [[60, 0.52], [72, 0.4]] },
		"music box": { releaseTime: 0.5, releasePatch: 61, volume: 0.56 },
		"steel drum": { releaseTime: 0.25, releasePatch: 57.5, volume: 0.6 },
		"marimba": { volume: 0.62 },
		"synth lead": { releaseTime: 0.1, loop: true, loopStart: 2, loopEnd: 25, volume: 0.7 },
		"synth pad": { releaseTime: 0.25, loop: true, loopStart: 2, loopEnd: 25, volume: 0.67 },
		"timpani": { releaseTime: 0.1 },
		"whistle": { loop: true, loopStart: 2, loopEnd: 25, volume: 0.55 },
		"accordion": { loop: true, loopStart: 2, releasePatch: 59, loopEnd: 25, volume: [[48, 0.45], [60, 0.4]] },
		"orchestra hit": { releaseTime: 1, releasePatch: 63 },
		"melodic tom": { releaseTime: 0.25, releasePatch: 60 },
		"church organ": { loop: true, releasePatch: 51, loopStart: 2, loopEnd: 5, volume: 0.85 },
		"trumpet": { volume: [[48, 0.8], [60, 0.7], [72, 0.6]], loop: true },
		"trumbone": { volume: 0.55, loop: true },
		"taiko drum": { releaseTime: 0.25, releasePatch: 62, volume: 0.8 },
		"reverse cymbal": {},
		"gumshot": {},
		"agogo": { releaseTime: 0.25 },
		"warm": { releaseTime: 0.5, loop: true, volume: 0.55 },
	}
	var SOUNDBANK_INFOS = {
		// drums
		"snare drum": {
			title: "Pinkie the Babysitter (Baby Cakes) | MLP: FiM [HD]",
			file: "3ccb997345760c2e8fca680ec2b687b8.wav"
		},
		"side stick": {
			title: "MLP: PONY LIFE CAPITULO 18 REACCIÓN! DERPYY!!",
			file: "06f1484566bb6149673c05ee9c14f5f6.wav"
		},
		"crash cymbal": {
			title: "Pinkie the Babysitter (Baby Cakes) | MLP: FiM [HD]",
			file: "f9175143922762430d0e3dc670320019.wav"
		},
		"open hi hat": {
			title: "My little pony-season 8 episode 10:The Break Up Breakdown",
			file: "46cbebfbac0b11dc76c2e738b78120e4.wav"
		},
		"closed hi hat": {
			title: "My little pony-season 8 episode 10:The Break Up Breakdown",
			file: "d7ada32c710b0a883266f4b94b1db43c.wav"
		},
		"low floor tom": {
			title: "My Little Pony Season 5 Episode 9",
			file: "4c76166ce0d9b4853e0715f107b01c28.wav"
		},
		"high floor tom":{
			title: "My Little Pony Season 5 Episode 9",
			file: "5266b9988ee896bc2bab9cd496c42a98.wav"
		},
		"low tom": {
			title: "My Little Pony Season 5 Episode 9",
			file: "8555d813e84048f781c4ff44c6430739.wav"
		},
		"low mid tom": {
			title: "My Little Pony Season 5 Episode 9",
			file: "3b3fced980db142e737e15321a7eb7ef.wav"
		},
		"hi mid tom": {
			title: "My Little Pony Season 5 Episode 9",
			file: "3e3c032e6bc334b7294310585f79662b.wav"
		},
		"high tom": {
			title: "My Little Pony Season 5 Episode 9",
			file: "f57d7b55ae028fb6691530bb3c54bdb2.wav"
		},
		"tambourine": {
			title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			file: "4fbbc63e66e4fd7b8611c11343f91fd2.wav"
		},
		"hand": {
			title: "When I'm Sweeping",
			file: "8158cc2e2219fb6f7cbfdfd051a3ed72.wav"
		},
		"claves": {
			title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			file: "ef64be4f8da4730868cc931f3a15656f.wav"
		},
		"wood": {
			title: "Friendship is Randomly Musical 1",
			file: "1a281eba5780f4db5f27f2c14eb17f7f.wav"
		},
		"cowbell": {
			title: "_",
			file: "1760020eb37fe3709c40f60d2a8ef544.wav"
		},
		"triangle": {
			title: "[Tridashie] Friendship is Randomly Musical 2 [REUPLOAD]",
			file: "0728baf0b82d32221fe6916c34b0daf4.wav"
		},
		"bongo": {
			title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			file: "80e79d890c48c67c5f7946c28f2eee1f.wav"
		},
		"conga": {
			title: "My Little Pony Friendship is Magic season 2 episode 19 \"Putting Your Hoof Down\"",
			file: "fd5036ce507cd959596e9770efe62415.wav"
		},
		"cabasa": {
			title: "My little pony season 8 episode 4(Fake it 'Til you make it)",
			file: "8b5d05fd13d7e56d91a92690a45d03a2.wav"
		},
		"long guiro": {
			title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			file: "601103abf81fc9385f36dd9b47c703ee.wav"
		},
		"vibraslap": {
			title: "My little pony-season 8 episode 10:The Break Up Breakdown",
			file: "3934ec317365ad390c5c87c633b189b0.wav"
		},
		"cuica": {
			title: "Friendship is Randomly Musical 8",
			file: "b1ebe9cbd60498d3c28ff97ffd26bcdb.wav"
		},
		"short whistle": {
			title: "My Little Pony friendship is magic season 2 episode 7 \"May the Best Pet Win!\"",
			file: "66eeb991358947dc9354c4fe75254dca.wav"
		},
		"long whistle": {
			title: "My Little Pony friendship is magic season 2 episode 7 \"May the Best Pet Win!\"",
			file: "545ba524892f481b16633483a19ca963.wav"
		},
		"short guiro": {
			title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			file: "f7b53554ebdd758c615cdc574bad7ea5.wav"
		},
		"low wood": {
			title: "Friendship is Randomly Musical 1",
			file: "884616631cd9920b9c896570bec589e2.wav"
		},
		"hi bongo": {
			title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			file: "51ead80d8ffa3bd6e048c34e39b713a0.wav"
		},
		"low cuica": {
			title: "Friendship is Randomly Musical 8",
			file: "2373fc1cf3ff5352b7ece3603999927a.wav"
		},
		"mute triangle": {
			title: "[Tridashie] Friendship is Randomly Musical 2 [REUPLOAD]",
			file: "ad3188f25a4fa9a7744c40bbb36f5d36.wav"
		},
		"high agogo": {
			title: "My Little Pony: FIM Season 9 Episode 15 (2,4,6 Greaaat)",
			file: "14a03edc9dcaa6099e8def15bc187e10.wav"
		},
		"low agogo": {
			title: "My Little Pony: FIM Season 9 Episode 15 (2,4,6 Greaaat)",
			file: "f0379c9ab60a09f8f7cccb1cc32ac378.wav"
		},
		"open conga": {
			title: "Peppa Pig Makes Music Instrument with Marbles | Peppa Pig Official Family Kids Cartoon",
			file: "d72b6434f890338a4c336148113ce279.wav"
		},
		"mute conga": {
			title: "Peppa Pig Makes Music Instrument with Marbles | Peppa Pig Official Family Kids Cartoon",
			file: "3d23ec3563709eb3b437c1d075d61706.wav"
		},
		"acoustic bass drum": {
			title: "Friendship is Musical Compilation",
			file: "a639a88d1c502adf8a3fd9889ee9ae77.wav"
		},
		// instruments 
		"piano": {
			title: "Friendship is Musical | Season 1 Episode 17-18",
			file: "39237faddf2e6c7d3d8f6d39ae30d8e6.wav"
		},
		"electric piano": {
			title: "My Little Pony: Friendship is Magic - Season 4 Episode 3",
			file: "e67a71ed35e84aef0957c6bf8c03826d.wav"
		},
		"organ": {
			title: "My Little Pony : Friendship is Magic Season 1 Episode 22",
			file: "dc54c4335b9b365320ce2f0b5a3096ff.wav"
		},
		"guitar": {
			title: "Bright Mac and Pear Butter's Love Story (The Perfect Pear) | MLP: FiM [HD]",
			file: "0328765961864d1ff2bc8aa2003489b0.wav"
		},
		"electric guitar": {
			title: "Friendship is Musical VGM #1",
			file: "ace30ecd40b0ee7e7d77361e53e1f607.wav"
		},
		"bass": {
			title: "Friendship is Musical Season 2 First Half",
			file: "83b41306810309b0efd63ca5fa01dd1c.wav"
		},
		"pizzicato": {
			title: "Friendship is Musical | Season 3",
			file: "f527e3719ee8b7b64062e5f9a4b33169.wav"
		},
		"harmonica": {
			title: "Crescend Cinnamon on Twitter: \"https://t.co/zNTcb7oUSz\" / Twitter",
			file: "c7b1809c6bb6b0cbf1928d796d1d5eea.wav"
		},
		"clarinet": {
			title: "My Little Pony Friendship Is Magic Season 4 Episode 21 Testing, 1, 2, 3 HD",
			file: "aa7745aa93786edb05f32e7d38d4303b.wav"
		},
		"saxophone": {
			title: "My Little Pony Friendship is Magic season 2 episode 22 \"Hurricane Fluttershy\"",
			file: "cc6241a12f4f0917220f0316daf1b257.wav"
		},
		"violin": {
			title: "Peppa Pig - Musical Instruments (full episode)",
			file: "9f121cecc17a68610598587467cfc149.wav"
		},
		"violin_2": {
			title: "Peppa Pig - Musical Instruments (full episode)",
			file: "f20c97f5b8369555f1f78e6c2040a8d3.wav"
		},
		"overdriven guitar": {
			title: "Friendship is Musical VGM #1",
			file: "801432e4c52b659d64cf78f2f6334c85.wav"
		},
		"flute": {
			title: "Friendship is Musical | Season 5 (First Half)",
			file: "a0633268d3a66f5dadafba086c06347d.wav"
		},
		"wooden flute": {
			title: "Peppa Pig Makes Music Instrument with Marbles | Peppa Pig Official Family Kids Cartoon",
			file: "0e2654aa4377850f6e0323d55e67c023.wav"
		},
		"bassoon": {
			title: "Friendship is Randomly Musical 5",
			file: "9efcb0828d69d54ce42171aacb6d9394.wav"
		},
		"choir": {
			title: "Friendship is Musical | Season 1 Episode 21-22",
			file: "0ed00326b9f9ac8b1d7b02676c828c35.wav"
		},
		"vibraphone": {
			title: "My Little Pony friendship is magic season 2 episode 10 \"Secret of My Excess\"",
			file: "a71d232a31c3d19efe8634c40829c795.wav"
		},
		"music box": {
			title: "Friendship is Randomly Musical 3 [REUPLOAD]",
			file: "e66135be886992bd1be58f1c6eefb8e2.wav"
		},
		"steel drum": {
			title: "Friendship is Musical | Season 3",
			file: "98fa3eefd30afd2377db250f33dffe5d.wav"
		},
		"marimba": {
			title: "Friendship is Musical | Season 1 Episode 17-18",
			file: "6cd419ece71c9f64ecabdd8d9ee64c10.wav"
		},
		"synth lead": {
			title: "Friendship is Musical | Season 1 Episode 21-22",
			file: "2a891694b76e6f08e6e19029fd3a4485.wav"
		},
		"synth pad": {
			title: "Friendship is Musical | Season 1 Episode 13-14",
			file: "a5b6cdc3cfbd0012af4495a769c58b11.wav"
		},
		"timpani": {
			title: "Peppa Pig - Musical Instruments (full episode)",
			file: "c4bad1057968e352c835bd5c805f911c.wav"
		},
		"whistle": {
			title: "Whistling Competition Between Peppa Pig and Suzy Sheep",
			file: "1d83be8a2f77baae0f03277ea629ee93.wav"
		},
		"orchestra hit": {
			title: "Friendship is Musical | Season 1 Episode 5-6",
			file: "fa9face4394c48fcfab45983a36cba14.wav"
		},
		"melodic tom": {
			title: "My Little Pony Season 5 Episode 9",
			file: "3b3fced980db142e737e15321a7eb7ef.wav"
		},
		"church organ": {
			title: "My Little Pony: Friendship is Magic - Season 4 Episode 3",
			file: "b24cce3fd0b5be42a6fece8a364a37f2.wav"
		},
		"trumpet": {
			title: "[1080p] My little Pony Friendship is Magic Season 6 Episode 14 The Cart Before the Ponies",
			file: "33090cbd8df0f949151239545a9a03a2.wav"
		},
		"trumbone": {
			title: "___",
			file: "08dc1297b19bd5cb42e27816513e994b.wav"
		},
		"taiko drum": {
			title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			file: "52676535c7f309dbc4c771d733bbc0a4.wav"
		},
		"reverse cymbal": {
			title: "MLP FIM: Season 8 Episode 26",
			file: "551922398f65d32746585a34757a83bf.wav"
		},
		"accordion": {
			title: "Peppa Pig - Musical Instruments (full episode)",
			file: "fe46c8a93d0e5582b73297defe513f1e.wav"
		},
		"gumshot": {
			title: "[Midi Player Gumshot]",
			file: "997b210b9cd72734b14e71d28c666894.wav"
		},
		"agogo": {
			title: "My Little Pony: FIM Season 9 Episode 15 (2,4,6 Greaaat)",
			file: "196ddd23bcd309117e60626d3bcb17dd.wav"
		},
		"warm": {
			title: "My Little Pony Season 5 Episode 9",
			file: "15cdf2d6f901c0e27de298d845e4718d.wav"
		},
	}
	var MIDI_INSTRUMENT = [
		// 1-10
		"piano", "piano", "piano", "piano", "electric piano",
		"electric piano", "piano", "piano", "marimba", "vibraphone",
		// 11-20
		"music box", "vibraphone", "marimba", "marimba", "vibraphone",
		"guitar", "organ", "organ", "organ", "church organ",
		// 21-30
		"violin", "accordion", "harmonica", "accordion", "guitar",
		"guitar", "electric guitar", "electric guitar", "electric guitar", "overdriven guitar",
		// 31-40
		"overdriven guitar", "overdriven guitar", "bass", "bass", "bass",
		"bass", "bass", "bass", "bass", "bass",
		// 41-50
		"violin", "violin", "violin", "violin", "violin",
		"pizzicato", "bass", "timpani", "violin", "violin_2",
		// 51-60
		"violin", "violin", "choir", "choir", "choir",
		"orchestra hit", "trumbone", "trumbone", "trumbone", "trumbone",
		// 61-70
		"trumpet", "trumbone", "trumbone", "trumbone", "saxophone",
		"saxophone", "saxophone", "saxophone", "bassoon", "clarinet",
		// 71-80
		"bassoon", "clarinet", "flute", "flute", "wooden flute",
		"wooden flute", "wooden flute", "wooden flute", "whistle", "wooden flute",
		// 81-90
		"synth lead", "synth lead", "wooden flute", "synth lead", "synth lead",
		"choir", "synth lead", "synth lead", "synth pad", "warm",
		// 91-100
		"synth pad", "choir", "violin", "violin", "choir",
		"violin", "synth pad", "violin", "wooden flute", "choir",
		// 101-110
		"vibraphone", "warm", "choir", "harmonica", "overdriven guitar",
		"pizzicato", "marimba", "bass", "marimba", "bassoon",
		// 111-120
		"violin",  "bassoon", "vibraphone", "agogo", "steel drum",
		"marimba", "taiko drum", "melodic tom", "melodic tom", "reverse cymbal",
		// 121-128
		"electric guitar", "wooden flute", "steel drum", "wooden flute",
		"vibraphone", "steel drum", "choir", "gumshot"
	]
	var DRUMS_MIDI = [
		"acoustic bass drum", // 1-35: Acoustic Bass Drum
		"acoustic bass drum", // 2-36: Electric Bass Drum
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
	];
	var mod = function (x, y) {
		var r = x % y;
		if (r / y < 0) {
			r += y;
		}
		return r;
	};
	var nullist = function (x, y) {
		if (x === undefined || x === null) {
			return y;
		}
		return x;
	};
	var listIndex = function (list, index, length) {
		var i = index | 0;
		if (i === index) return i > 0 && i <= length ? i - 1 : -1;
		if (index === 'random' || index === 'any') {
			return Math.random() * length | 0;
		}
		if (index === 'last') {
			return length - 1;
		}
		return i > 0 && i <= length ? i - 1 : -1;
	};
	var insertInList = function (list, index, value) {
		var i = listIndex(list, index, list.length + 1);
		if (i === list.length) {
			list.push(value);
		} else if (i !== -1) {
			list.splice(i, 0, value);
		}
	};
	const ASSET_URL = 'https://assets.scratch.mit.edu/internalapi/asset/$md5ext/get/';
	function loadSoundbankFile(src) {
		return fetch(src).then(function(r) { return r.arrayBuffer() });
	}
	function settled(promise) {
		return new Promise(function(resolve, _reject) {
			return promise.then(function() {resolve()}).catch(function() {resolve()});
		});
	}
	const ADPCM_STEPS = [7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767];
	const ADPCM_INDEX = [-1, -1, -1, -1, 2, 4, 6, 8, -1, -1, -1, -1, 2, 4, 6, 8];
	function decodeADPCMAudio(ab, cb) {
		var dv = new DataView(ab);
		if (dv.getUint32(0) !== 0x52494646 || dv.getUint32(8) !== 0x57415645) {
			return cb(new Error('Unrecognized audio format'));
		}
	    var blocks = {};
	    var i = 12, l = dv.byteLength - 8;
		while (i < l) {
			blocks[String.fromCharCode(dv.getUint8(i), dv.getUint8(i + 1), dv.getUint8(i + 2), dv.getUint8(i + 3))] = i;
			i += 8 + dv.getUint32(i + 4, true);
		}
	    var format = dv.getUint16(20, true);
	    var channels = dv.getUint16(22, true);
	    var sampleRate = dv.getUint32(24, true);
	    var byteRate = dv.getUint32(28, true);
	    var blockAlign = dv.getUint16(32, true);
	    var bitsPerSample = dv.getUint16(34, true);
	    if (format === 17) {
	        var samplesPerBlock = dv.getUint16(38, true);
	        var blockSize = ((samplesPerBlock - 1) / 2) + 4;
	        var frameCount = dv.getUint32(blocks.fact + 8, true);
	        var buffer = audio.context.createBuffer(1, frameCount, sampleRate);
	        var channel = buffer.getChannelData(0);
	        var sample, index = 0;
	        var step, code, delta;
	        var lastByte = -1;
	        var offset = blocks.data + 8;
	        i = offset;
	        var j = 0;
	        while (true) {
	            if ((((i - offset) % blockSize) == 0) && (lastByte < 0)) {
	                if (i >= dv.byteLength) break;
	                sample = dv.getInt16(i, true);
	                i += 2;
	                index = dv.getUint8(i);
	                i += 1;
	                i++;
	                if (index > 88) index = 88;
	                channel[j++] = sample / 32767;
	            } else {
	                if (lastByte < 0) {
	                    if (i >= dv.byteLength) break;
	                    lastByte = dv.getUint8(i);
	                    i += 1;
	                    code = lastByte & 0xf;
	                } else {
	                    code = (lastByte >> 4) & 0xf;
	                    lastByte = -1;
	                }
	                step = ADPCM_STEPS[index];
	                delta = 0;
	                if (code & 4) delta += step;
	                if (code & 2) delta += step >> 1;
	                if (code & 1) delta += step >> 2;
	                delta += step >> 3;
	                index += ADPCM_INDEX[code];
	                if (index > 88) index = 88;
	                if (index < 0) index = 0;
	                sample += (code & 8) ? -delta : delta;
	                if (sample > 32767) sample = 32767;
	                if (sample < -32768) sample = -32768;
	                channel[j++] = sample / 32768;
	            }
	        }
	        return cb(null, buffer);
	    }
	    cb(new Error('Unrecognized WAV format ' + format));
	}
	function decodeAudio(ab) {
		return new Promise(function(resolve, reject) {
		    decodeADPCMAudio(ab, function (err1, buffer) {
		        if (buffer) {
		            resolve(buffer);
		            return;
		        }
		        audioContext.decodeAudioData(ab, function (buffer) {
		            resolve(buffer);
		        }, function (err2) {
		            reject("Could not decode audio: " + err1 + " | " + err2);
		        });
		    });
		});
	}
	const soundbank = {};
	function loadSoundbankBuffer(name) {
		return loadSoundbankFile(ASSET_URL.replace('$md5ext', SOUNDBANK_INFOS[name].file)).then(function(buffer) {
			var gdfgdfg = new DataView(buffer);
			var dfgdfg = [];
			for (var i5 = 0; i5 < buffer.byteLength; i5++) {
				dfgdfg.push(gdfgdfg.getUint8(i5, true));
			}
			return decodeAudio(buffer).then(function(o) {
				return new Promise(function(resolve, reject) {resolve({data: new Uint8Array(dfgdfg), buffer: o})});
			})
		}).then(function(sound) {
			soundbank[name] = sound;
		});
	}
	var Note = function(e) {
		this.duraction = e.duraction;
		this.times = e.times;
		this.pitch = e.pitch;
		this.instrument = e.instrument;
		this.volume = e.volume;
		this.type = "note";
		this.channel = 0;
	}
	var Drum = function(e) {
		this.duraction = e.duraction;
		this.times = e.times;
		this.drum = e.drum;
		this.volume = e.volume;
		this.type = "drum";
		this.channel = 0;
	}
	var MidiLoader = function(data) {
		this.data = new Uint8Array(data);
		this.index = 0;
		this.tracks = [];
		this.tempo = 0;
		this.chuckSize = 0;
		this.finalList = {
			duration: [],
			instrument: [],
			pitch: [],
			start: [],
			channel: [],
			volume: []
		}
		this.newList = {
			channel: [],
			instrument: [],
			noteOn: [],
			pitch: [],
			tempoSetting: [],
			tempoTick: [],
			tickOff: [],
			tickOn: [],
			trackNumber: [],
			volume: [],
		}
	}
	MidiLoader.prototype.load = function() {
		this.ReadHeader();
		this.splitTracks();
		this.processAllTracks();
		this.MunchData();
	}
	MidiLoader.prototype.CompressAndStore = function() {
		var fgf = []
		var index = 0;
		for (var i = 0; i < this.finalList.start.length; i++) {
			if (this.finalList.instrument[index] < 128) {
				fgf.push([this.finalList.instrument[index] + 1, this.finalList.pitch[index], this.finalList.duration[index], this.finalList.start[index], this.finalList.volume[index]]);
			} else {
				fgf.push([0, this.finalList.instrument[index] - 127, this.finalList.duration[index], this.finalList.start[index], this.finalList.volume[index]]);
			}
			index += 1;
		}
		return {
			"name": "Midi File",
			"notes": fgf
		}
	}
	MidiLoader.prototype.MunchData = function() {
		var index = 0;
		var gh = this.finalList.start.length;
		for (var i = 0; i < gh; i++) {
			this.finalList.start[index] = Math.round((this.finalList.start[index]) / 1000) / 1000;
			this.finalList.duration[index] = Math.round(this.finalList.duration[index] / 1000) / 1000;
			index += 1;
		}
	}
	MidiLoader.prototype.splitTracks = function() {
		this.tracks = [];
		var trackNumber = 1;
		while (!(trackNumber > this.numberTracks)) {
			var fdg = this.ReadUnsignedLong();
			if (!(fdg == 1297379947)) {
				throw new Error("MTrk not found for track number " + trackNumber + " - invalid MIDI file");
			}
			var chuckSize = this.ReadUnsignedLong();
			var trackData = [];
			for (var i = 0; i < chuckSize; i++) {
				trackData.push(this.data[this.index]);
				this.index += 1;
			}
			this.tracks.push(trackData);
			trackNumber += 1;
		}
		this.data.length = 0;
	}
	MidiLoader.prototype.processAllTracks = function() {
		for (var i = 0; i < this.tracks.length; i++) {
			this.cleanProcessAllTracksDataIncludingTempoData(((!(this.formatType == 1)) || i == 0));
			this.trackNumber = (i + 1);
			this.ProcessTrackNumber(i);
			this.convertToNoteBlocks();
		}
		this.cleanProcessAllTracksDataIncludingTempoData(true);
	}
	MidiLoader.prototype.ProcessTrackNumber = function(trackNumber) {
		this.tempo = (500000 / this.timeDivision);
		this.data = this.tracks[trackNumber];
		this.chuckSize = this.data.length;
		this.pulseCounter = 0;
		this.eventType = '';
		this.index = 0;
		while (!(this.index > (this.chuckSize - 1))) {
			var hgg = this.ReadVariableLength();
			this.pulseCounter += hgg;
			this.ReadMidiEvent();
			if (this.eventType == "midi") {
				this.ProcessMidiControlEvent();
			} else {
				if (this.eventType == "meta") {
					this.ProcessMetaEvent();
				} else {
					if (this.eventType == "system") {
						this.ProcessSystemExclusiveEvent();
					} else {
					}
				}
			}
		}
		if (!(this.index == this.chuckSize)) {
			throw new Error("Track number " + this.trackNumber + " has overrun - invalid MIDI file");
		}
	}
	MidiLoader.prototype.ProcessMidiControlEvent = function() {
		if (this.eventTypeValue == 8) {
			this.NoteOff();
		}
		if (this.eventTypeValue == 9) {
			if (this.parameter2 > 0) {
				this.NoteOn();
			} else {
				this.NoteOff();
			}
		}
		if (this.eventTypeValue == 12) {
			this.SetInstrument();
		}
	}
	MidiLoader.prototype.NoteOff = function() {
		var temp = this.newList.pitch.length - 1;
		var f = this.newList.pitch.length;
		for (var i = 0; i < f; i++) {
			if (((this.trackNumber == nullist(this.newList.trackNumber[temp], 0) && this.parameter1 == nullist(this.newList.pitch[temp], 0)) && (this.midiChannel == nullist(this.newList.channel[temp], 0) && this.newList.noteOn[temp] == true))) {
				this.newList.tickOff[temp] = this.pulseCounter;
				this.newList.noteOn[temp] = false;
				return;
			}
			temp -= 1;
		}
	}
	MidiLoader.prototype.NoteOn = function() {
		this.newList.tickOn.push(this.pulseCounter);
		this.newList.tickOff.push(0);
		this.newList.trackNumber.push(this.trackNumber);
		this.newList.channel.push(this.midiChannel);
		if (this.midiChannel == 9) {
			if (this.parameter1 < 35 || this.parameter1 > 81) {
			} else {
				if (typeof DRUMS_MIDI[this.parameter1 - 35] == "undefined") {
					console.warn("Assign percussion instrument number " + this.parameter1 + " (" + DRUMS_MIDI[this.parameter1 - 35] + ")");
				}
			}
			this.newList.instrument.push((128 + (this.parameter1 - 35)));
		} else {
			this.newList.instrument.push(this.instrumentName || 0);
		}
		this.newList.pitch.push(this.parameter1);
		this.newList.volume.push(Math.round(((this.parameter2 * 100) / 127)));
		this.newList.noteOn.push(true);
	}
	MidiLoader.prototype.SetInstrument = function() {
		if (typeof MIDI_INSTRUMENT[this.parameter1] == "undefined") {
			console.warn("Assign musical instrument for group " + (Math.floor(this.parameter1 / 8) + 1) + " instrument " + this.parameter1 + " (" + MIDI_INSTRUMENT[this.parameter1] + ")")
		}
		this.instrumentName = this.parameter1;
	}
	MidiLoader.prototype.ProcessMetaEvent = function() {
		if (this.command == 47) {
			this.index = this.chuckSize;
		}
		if (this.command == 81) {
			this.SetTempo();
		}
	}
	MidiLoader.prototype.SetTempo = function() {
		this.newList.tempoTick.push(this.pulseCounter);
		this.newList.tempoSetting.push((this.parameter1 / this.timeDivision));
	}
	MidiLoader.prototype.ProcessSystemExclusiveEvent = function() {
	}
	MidiLoader.prototype.convertToNoteBlocks = function() {
		var totalPulses = this.pulseCounter;
		this.pulseCounter = 0;
		var index = 0;
		this.tempoIndex = 0;
		this.targetIndex = 1;
		this.currentPulseInSeconds = 0;
		while ((!(this.pulseCounter > totalPulses)) && (!(index > (this.newList.tickOn.length - 1)))) {
			var temp = totalPulses;
			if (!(this.tempoIndex > (this.newList.tempoTick.length - 1))) {
				temp = nullist(this.newList.tempoTick[this.tempoIndex], 0);
			}
			if (!(index > (this.newList.tickOn.length - 1))) {
				if (nullist(this.newList.tickOn[index], 0) < temp) {
					temp = nullist(this.newList.tickOn[index], 0);
				}
			}
			if (temp == totalPulses) {
				return;
			}
			this.currentPulseInSeconds += (this.tempo * (temp - this.pulseCounter));
			this.pulseCounter = temp;
			while (!((!(this.newList.tempoTick[this.tempoIndex] == this.pulseCounter)) || this.tempoIndex > (this.newList.tempoSetting.length - 1))) {
				this.tempo = nullist(this.newList.tempoSetting[this.tempoIndex], 0);
				this.tempoIndex += 1;
			}
			while (!((!(this.newList.tickOn[index] == this.pulseCounter)) || index > this.newList.tickOff.length - 1)) {
				this.insertNoteCurrentlyAtIndex(index);
				index += 1;
			}
		}
	}
	MidiLoader.prototype.insertNoteCurrentlyAtIndex = function(index) {
		while (!((this.targetIndex > this.finalList.pitch.length) || (this.currentPulseInSeconds < this.finalList.start[this.targetIndex - 1]))) {
			this.targetIndex += 1;
		}
		var lengthInMilliseconds = 0;
		var pulseForCalculating = this.pulseCounter;
		var pulsesRemainingForCalculating = (this.newList.tickOff[index] - this.newList.tickOn[index]);
		var tempoForCalculating = this.tempo;
		var tempoIndexForCalculating = this.tempoIndex;
		while (!(pulsesRemainingForCalculating == 0)) {
			if ((tempoIndexForCalculating > (this.newList.tempoTick.length - 1) || !((pulseForCalculating + pulsesRemainingForCalculating) > this.newList.tempoTick[tempoIndexForCalculating]))) {
				lengthInMilliseconds += (pulsesRemainingForCalculating * tempoForCalculating);
				pulsesRemainingForCalculating = 0;
			} else {
				lengthInMilliseconds += ((this.newList.tempoTick[tempoIndexForCalculating] - pulseForCalculating) * (tempoForCalculating / this.timeDivision));
				pulseForCalculating += (this.newList.tempoTick[tempoIndexForCalculating] - pulseForCalculating);
				pulsesRemainingForCalculating += (pulseForCalculating - this.newList.tempoTick[tempoIndexForCalculating]);
				tempoForCalculating = this.newList.tempoSetting[tempoIndexForCalculating];
				tempoIndexForCalculating += 1;
			}
		}
		insertInList(this.finalList.duration, this.targetIndex, Math.max(0, lengthInMilliseconds));
		insertInList(this.finalList.instrument, this.targetIndex, this.newList.instrument[index]);
		insertInList(this.finalList.pitch, this.targetIndex, this.newList.pitch[index]);
		insertInList(this.finalList.start, this.targetIndex, this.currentPulseInSeconds);
		insertInList(this.finalList.channel, this.targetIndex, ((this.newList.trackNumber[index] * 16) + this.newList.channel[index]));
		insertInList(this.finalList.volume, this.targetIndex, this.newList.volume[index]);
	}
	MidiLoader.prototype.cleanProcessAllTracksDataIncludingTempoData = function(includingTempo) {
		this.newList.channel.length = 0;
		this.newList.instrument.length = 0;
		this.newList.noteOn.length = 0;
		this.newList.pitch.length = 0;
		this.newList.tickOff.length = 0;
		this.newList.tickOn.length = 0;
		this.newList.trackNumber.length = 0;
		this.newList.volume.length = 0;
		if (includingTempo) {
			this.newList.tempoSetting.length = 0;
			this.newList.tempoTick.length = 0;
		}
	}
	MidiLoader.prototype.ReadMidiEvent = function() {
		var fd = this.ReadUnsignedByte();
		if (fd == 255) {
			this.eventType = 'meta';
			this.command = this.ReadUnsignedByte();
			this.ParseMetaData();
		} else {
			if (fd > 239) {
				this.eventType = 'system';
				this.ParseSystemEvent();
			} else {
				if (fd > 127) {
					this.eventType = 'midi';
					this.midiChannel = mod(fd, 16);
					this.eventTypeValue = ((fd - this.midiChannel) / 16)
					this.ParseMidi();
				} else {
					this.index -= 1;
					this.ParseMidi();
				}
			}
		}
	}
	MidiLoader.prototype.ParseMidi = function() {
		this.parameter1 = this.ReadUnsignedByte();
		if (this.eventTypeValue == 12 || this.eventTypeValue == 13) {
			return;
		}
		this.parameter2 = this.ReadUnsignedByte();
	}
	MidiLoader.prototype.ParseSystemEvent = function() {
		var rf = this.ReadVariableLength();
		this.index += rf;
	}
	MidiLoader.COMMANDS = {
		0: "Sequence number",
		1: "Text event",
		2: "Copyright notice",
		3: "Sequence/Track name",
		4: "Instrument name",
		5: "Lyric",
		6: "Marker",
		7: "Cue point",
		32: "MIDI Channel prefix",
		84: "SMTPE offset",
		88: "Time signature",
		89: "Key signature",
		127: "Sequencer-specific meta-event"
	}
	MidiLoader.prototype.ParseMetaData = function() {
		switch (this.command) {
			case 47:
				this.ReadVariableLength();
				return;
			case 81:
				var d = this.ReadVariableLength();
				var g = this.ReadBytes(d);
				this.parameter1 = g;
				return;
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 9:
			case 32:
			case 33:
			case 84:
			case 88:
			case 89:
			case 127:
				var count = this.ReadVariableLength();
				var g = '';
				while (count--) {
					g += String.fromCharCode(this.ReadBytes(1));
				}
				this.parameter1 = g;
				this.eventType = undefined;
				return;
			default:
				console.log("unknown command: " + this.command);
				break;
		}
		var count = this.ReadVariableLength();
		var g = '';
		while (count--) {
			g += String.fromCharCode(this.ReadBytes(1));
		}
		console.log(g);
		this.eventType = undefined;
	}
	MidiLoader.prototype.ReadHeader = function() {
		if (!(this.ReadUnsignedLong() == 1297377380)) {
			throw new Error("Invalid MIDI file");
		}
		if (!(this.ReadUnsignedLong() == 6)) {
			throw new Error("Invalid MIDI file");
		}
		this.formatType = this.ReadUnsignedShort();
		this.numberTracks = this.ReadUnsignedShort();
		this.timeDivision = this.ReadUnsignedShort();
		this.pulsesPerQuarterBeat = this.timeDivision;
		if (this.timeDivision > 32767) {
			throw new Error("Timecode timing intervals not currently supported");
		}
	}
	MidiLoader.prototype.ReadUnsignedLong = function() {
		return this.ReadBytes(4);
	}
	MidiLoader.prototype.ReadUnsignedByte = function() {
		return this.ReadBytes(1);
	}
	MidiLoader.prototype.ReadUnsignedShort = function() {
		return this.ReadBytes(2);
	}
	MidiLoader.prototype.ReadVariableLength = function() {
		var value = 0;
		while (true) {
			if (this.index > (this.data.length - 1)) {
				throw new Error("Unexpected end of input");
			}
			var temp = Math.round(this.data[this.index]);
			this.index += 1;
			value = ((value * 128) + mod(temp, 128));
			if (temp < 128) {
				return value;
			}
		}
	}
	MidiLoader.prototype.ReadBytes = function(byteCount) {
		var d = 0;
		for (var i = 0; i < byteCount; i++) {
			if (this.index > (this.data.length - 1)) {
				throw new Error("Unexpected end of input");
			}
			d = ((d * 256) + Math.round(this.data[this.index]));
			this.index += 1;
		}
		return d;
	}
	var MidiLoaderBase64 = function(data) {
		this.data = data;
		this.index = 5;
	}
	MidiLoaderBase64.prototype.load = function (e) {
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
			sp += kjjh[3];

			fdgdfg.push([kjjh[0], kjjh[1], kjjh[2] / 1000, sp / 1000, kjjh[4]])
		}
		return fdgdfg;

	}
	MidiLoaderBase64.prototype.ReadBase64 = function (e) {
		var value = 0;
		for (var i = 0; i < e; i++) {
			value = (value * 64) + BASE64.indexOf(this.data[this.index]);
			this.index += 1;
		}
		return value;
	}
	var MidiSoundEngine = function() {
		this.node = audioContext.createGain();
		this.node.gain.value = 1;
	    this.node.connect(audioContext.destination);
	    this.node2 = audioContext.createGain();
	    this.node2.connect(this.node);
		this.decodeNoteQueue = [];
		this.soundbank = soundbank;
		this.noteTracker = 0;
		this.startTime = 0;
		this.songs = null;
		this.step = this.step.bind(this);
		this.duration = 0;
		this.muteMusicr = false;
		this.frameStart = 0;
		this.DateTime = 0;
		this.onplaynote = null;
		this.onended = null;
		this.onprogress = null;
		this.speed = 1;
		this.isPaused = true;
		this.MidiTimer = 0;
		this.pauseTime = 0;
		this._soundbank = {};
		this._soundbankLoaded = 0;
		this.frameStart = Date.now();
		this.interval = setInterval(this.step, 1000 / 60);
	}
	MidiSoundEngine.prototype.setCurrentTime = function(s) {
		MSE.muteMusicr = true;
		this.MidiTimer = s;
		this.setStartTime(s);
		if (this.MidiTimer < 0) {
			this.MidiTimer = 0;
			this.noteTracker = 0;
			this.setStartTime(0);
		}
		if (this.MidiTimer > this.duration) {
			this.MidiTimer = this.duration;
			this.setStartTime(this.duration);
		}
		if (this.node2) {
			this.node2.disconnect();
			this.node2 = null;
		}
		this.node2 = audioContext.createGain();
	    this.node2.connect(this.node);
	}
	MidiSoundEngine.prototype.setStartTime = function(s) {
		this.startTime = (Date.now() - (s * 1000));
	}
	MidiSoundEngine.prototype.loadSoundbank = function() {
		var _this = this;
		const promises = [];
		this._soundbankLoaded = 0;
	    for (const name in SOUNDBANK_INFOS) {
	        if (name in this._soundbank && !soundbank[name]) {
				this._soundbankLoaded += 1;
	            const promise = loadSoundbankBuffer(name);
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
	        if (!soundbank[name]) {
				this._soundbankLoaded += 1;
	            const promise = loadSoundbankBuffer(name);
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
	MidiSoundEngine.prototype.play = function() {
		this.isPaused = false;
		this.setStartTime(this.MidiTimer);
		if (this.MidiTimer >= this.duration) {
			this.MidiTimer = 0;
			this.setStartTime(0);
			this.noteTracker = 0;
		}
	}
	MidiSoundEngine.prototype.stop = function() {
		this.isPaused = true;
		this.MidiTimer = 0;
		this.setStartTime(0);
		this.noteTracker = 0;
		if (this.node2) {
			this.node2.disconnect();
			this.node2 = null;
		}
		this.node2 = audioContext.createGain();
	    this.node2.connect(this.node);
	}
	MidiSoundEngine.prototype.pause = function() {
		this.isPaused = true;
		this.setStartTime(this.MidiTimer);
		if (this.node2) {
			this.node2.disconnect();
			this.node2 = null;
		}
		this.node2 = audioContext.createGain();
	    this.node2.connect(this.node);
	}
	MidiSoundEngine.prototype.getTime = function() {
		return this.MidiTimer;
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
		if (n.type == 'note') {
			var span = INSTRUMENT[MIDI_INSTRUMENT[n.instrument - 1]];
			if (!span) return;
			const buffer = soundbank[MIDI_INSTRUMENT[n.instrument - 1]].buffer;
			const source = audioContext.createBufferSource();
			const note = audioContext.createGain();
			source.buffer = buffer;
			if (source.loop = span.loop) {
				source.loopStart = 2;
				source.loopEnd = 5;
			}
			source.connect(note);
			source.playbackRate.value = Math.pow(2, (((span.releasePatch ? (n.pitch + (this.vidAudio(span.releasePatch, n.pitch) - 60)) : n.pitch) - 60) / 12));
			const gain = note.gain;
			gain.setValueAtTime(this.vidAudio(span.volume, n.pitch) * n.volume, audioContext.currentTime);
			const releaseGain = audioContext.createGain();
			note.connect(releaseGain);
			releaseGain.connect(this.node2);
			var releaseDuration = span.releaseTime;
			if (typeof releaseDuration === 'undefined') {
			    releaseDuration = 0.01;
			}
			const releaseStart = audioContext.currentTime + (n.dur / this.speed);
			const releaseEnd = releaseStart + releaseDuration;
			releaseGain.gain.setValueAtTime(1, releaseStart);
			releaseGain.gain.linearRampToValueAtTime(0.0001, releaseEnd);
			var _this = this;
			source.start();
			source.stop(releaseEnd);
		} else if (n.type == 'drum') {
			var span = DRUMS[DRUMS_MIDI[n.drum - 1]];
			if (!span) return;
			const buffer = soundbank[DRUMS_MIDI[n.drum - 1]].buffer;
			if (!buffer) return;
			const source = audioContext.createBufferSource();
			const note = audioContext.createGain();
			source.buffer = buffer;
			source.connect(note);
			note.connect(this.node2);
			const gain = note.gain;
			gain.value = (n.volume * (span.volume || 1)) * 0.85;
			var _this = this;
			source.start();
		}
	}
	MidiSoundEngine.prototype.step = function() {
		this.DateTime = (Date.now() - this.frameStart) / 1000;
		if (this.MidiTimer > this.duration && !this.isPaused) {
			this.MidiTimer = this.duration;
			this.setStartTime(this.duration);
			if (this.onended) this.onended();
			this.isPaused = true;
		}
		if (!this.isPaused) {
			this.MidiTimer = (Date.now() - this.startTime) / 1000;
		}
		function GS(f, s) {
			for (var i6 = 0; i6 < f.length; i6++) {
				if (f[i6].type == 'note' && s.type == 'note') {
					if ((MIDI_INSTRUMENT[f[i6].instrument - 1] == MIDI_INSTRUMENT[s.instrument - 1] && f[i6].pitch == s.pitch)) {
						return false;
					}
				} else if (f[i6].type == 'drum' && s.type == 'drum') {
					if (f[i6].drum == s.drum) {
						return false;
					}
				}
			}
			return true;
		}
		var playNote = [];
		if (this.decodeNoteQueue[this.noteTracker] && (this.getTime() > this.decodeNoteQueue[this.noteTracker].times)) {
			while (!(!this.decodeNoteQueue[this.noteTracker] || (this.decodeNoteQueue[this.noteTracker] && (this.getTime() < this.decodeNoteQueue[this.noteTracker].times)))) {
				if (!this.muteMusicr && this.decodeNoteQueue[this.noteTracker]) {
					var n = this.decodeNoteQueue[this.noteTracker];
					if (n.type == 'note') {
						if (n.duraction > 0) {
							if (this.onplaynote) {
								this.onplaynote({
									pitch: n.pitch,
									dur: n.duraction,
									instrument: n.instrument,
									volume: n.volume,
									type: 1
								});
							}
							playNote.push({
								type: 'note',
								instrument: n.instrument,
								pitch: n.pitch,
								isOn: true,
								volume: n.volume,
								dur: n.duraction,
							});
						}
					} else if (n.type == 'drum') {
						if (n.duraction > 0) {
							if (this.onplaynote) {
								this.onplaynote({
									drum: n.drum,
									volume: n.volume,
									type: 0
								});
							}
							playNote.push({
								type: 'drum',
								drum: n.drum,
								volume: n.volume,
								isOn: true,
								dur: n.duraction,
							});	
						}
					}
				}
				this.noteTracker += 1;
			}
		}
		this.noteTracker -= 1;
		if (this.decodeNoteQueue[this.noteTracker] && (this.getTime() < this.decodeNoteQueue[this.noteTracker].times)) {
			while (!(!this.decodeNoteQueue[this.noteTracker] || (this.decodeNoteQueue[this.noteTracker] && (this.getTime() > this.decodeNoteQueue[this.noteTracker].times)))) {
				this.noteTracker -= 1;
			}
		}
		this.noteTracker += 1;
		var playNoteFix = [];
		for (var i = 0; i < playNote.length; i++) {
			if (GS(playNoteFix, playNote[i])) {
				playNoteFix.push(playNote[i]);
			}
		}
		for (var i = 0; i < playNoteFix.length; i++) {
			this.playNotes(playNoteFix[i]);
		}
		if (this.muteMusicr) {
			this.muteMusicr = false;
		}
		this.frameStart = Date.now();
	}
	MidiSoundEngine.prototype.getMidi = function(txt) {
		try {
			return JSON.parse(txt);
		} catch (e) {
			if ((txt[0] + txt[1] + txt[2] + txt[3] + txt[4]) == "mid32") {
				var dfg = new MidiLoaderBase64(txt);
				var d = {
					name: "MIDI BASE64",
					notes: dfg.load()
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
		}
	}
	MidiSoundEngine.prototype.loadMid = function(data) {
		MSE.stop();
		var loader = new MidiLoader(data);
		loader.load();
		this.loadMidi(JSON.stringify(loader.CompressAndStore()));

	}
	MidiSoundEngine.prototype.loadMidi = function(data) {
		MSE.stop();
		var data_1 = this.getMidi(data);
		this.decodeNoteQueue = [];
		this.songs = data_1.name;
		var notes = data_1.notes;
		var fdg = notes[0][3];
		var gfd = 100;
		var fdgdfgdfggdg = 0;
		for (var i = 0; i < notes.length; i++) {
			if (fdgdfgdfggdg < notes[i][3] - fdg + notes[i][2]) {
				fdgdfgdfggdg = notes[i][3] - fdg + notes[i][2];
			}
			if (notes[i][0] > 0) {
				if (notes[i][2]) {
					this.decodeNoteQueue.push(new Note({
						duraction: notes[i][2],
						times: notes[i][3] - fdg,
						pitch: notes[i][1],
						instrument: Math.round(notes[i][0]),
						volume: (notes[i][4] / gfd)
					}));
					if (MIDI_INSTRUMENT[Math.round(notes[i][0]) - 1]) {
						this._soundbank[MIDI_INSTRUMENT[Math.round(notes[i][0]) - 1]] = {};
					}
				}
			} else {
				if (notes[i][2]) {
					this.decodeNoteQueue.push(new Drum({
						duraction: notes[i][2],
						times: notes[i][3] - fdg,
						drum: Math.round(notes[i][1]),
						volume: (notes[i][4] / gfd)
					}));
					if (DRUMS_MIDI[Math.round(notes[i][1]) - 1]) {
						this._soundbank[DRUMS_MIDI[Math.round(notes[i][1]) - 1]] = {};
					}
				}
			}
		}
		this.duration = fdgdfgdfggdg;
	}
	return {
		MidiLoader: MidiLoader,
		MidiSoundEngine: MidiSoundEngine,
		SOUNDBANK_INFOS,
		MIDI_INSTRUMENT,
		DRUMS_MIDI,
		DRUMS,
		INSTRUMENT
	}
}());