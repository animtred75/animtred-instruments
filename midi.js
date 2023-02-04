/*
Midi Sound Engine v2.2.6

my custom sound engine

2023/02/02 Anim Tred
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
		"hand": { volume: 0.8 },
		"claves": { volume: 0.35 },
		"wood": { volume: 0.9 },
		"cowbell": { volume: 0.63 },
		"triangle": { volume: 0.9 },
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
		"acoustic bass drum": { volume: 0.8 },
	}
	var INSTRUMENT = {
		"piano": { releaseTime: 0.15, volume: [[36, 0.8], [48, 0.65], [60, 0.4], [72, 0.3]] },
		"electric piano": { releaseTime: 0.15, volume: 0.7 },
		"organ": { releaseTime: 0.15, volume: 0.63, releasePatch: 52 },
		"guitar": { releaseTime: 0.15, volume: 0.57 },
		"electric guitar": { releaseTime: 0.15, releasePatch: 60, volume: 0.5 },
		"bass": { releaseTime: 0.25, volume: [[36, 0.75], [48, 0.65]] },
		"pizzicato": { releaseTime: 0.25, volume: [[48, 0.5], [60, 0.42]], releasePatch: 47 },
		"harmonica": { loop: true, loopStart: 2, loopEnd: 25, volume: 0.5 },
		"clarinet": { loop: true, loopStart: 2, loopEnd: 25, volume: 0.6 },
		"saxophone": { loop: true, loopStart: 2, loopEnd: 25, volume: 0.6, releasePatch: 59.75 },
		"violin": { releaseTime: 0.15, loop: true, loopStart: 2, loopEnd: 25, volume: 0.62 },
		"violin_2": { releaseTime: 0.5, loop: true, loopStart: 2, loopEnd: 25, volume: 0.58 },
		"overdriven guitar": { releasePatch: 61, loop: true, loopStart: 2, loopEnd: 4, volume: 0.67 },
		"flute": { loop: true, loopStart: 2, loopEnd: 25, volume: [[60, 0.6], [72, 0.5]] },
		"wooden flute": { releasePatch: 58, loop: true, loopStart: 2, loopEnd: 25, volume: [[60, 0.8], [72, 0.7]]},
		"bassoon": { loop: true, loopStart: 2, loopEnd: 25, volume: [[36, 0.76], [48, 0.64], [60, 0.52]] },
		"choir": { releaseTime: 0.25, loop: true, loopStart: 2, loopEnd: 25, volume: 0.56 },
		"vibraphone": { releaseTime: 0.2, releasePatch: 58, volume: [[60, 0.5], [72, 0.45]] },
		"music box": { releaseTime: 0.5, releasePatch: 61, volume: 0.52 },
		"steel drum": { releaseTime: 0.2, releasePatch: 57.5, volume: 0.55 },
		"marimba": { volume: 0.62 },
		"synth lead": { releaseTime: 0.1, loop: true, loopStart: 2, loopEnd: 25, volume: 0.67 },
		"synth pad": { releaseTime: 0.15, loop: true, loopStart: 2, loopEnd: 25, volume: 0.6 },
		"timpani": { releaseTime: 0.1, volume: 0.8 },
		"whistle": { loop: true, loopStart: 2, loopEnd: 25, volume: 0.55 },
		"accordion": { loop: true, loopStart: 2, releasePatch: 59, loopEnd: 25, volume: [[48, 0.4], [60, 0.34]] },
		"orchestra hit": { releaseTime: 1, releasePatch: 63, volume: 0.75 },
		"melodic tom": { releaseTime: 0.25, releasePatch: 60 },
		"church organ": { loop: true, releasePatch: 51, loopStart: 2, loopEnd: 5, volume: [[36, 1], [48, 0.9], [60, 0.8]] },
		"trumpet": { volume: [[48, 0.78], [60, 0.66], [72, 0.58]], loop: true },
		"trumbone": { volume: [[48, 0.6], [60, 0.5], [60, 0.43]], loop: true },
		"taiko drum": { releaseTime: 0.25, releasePatch: 62, volume: 0.8 },
		"reverse cymbal": { volume: 0.55 },
		"gumshot": { releaseTime: 1 },
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
			title: "My little pony-season 8 episode 10:The Break Up Breakdown",
			file: "ef64be4f8da4730868cc931f3a15656f.wav"
		},
		"wood": {
			title: "Friendship is Randomly Musical 1",
			file: "94bf611190e55266b6250b8bbc17ed24.wav"
		},
		"cowbell": {
			title: "Chicken Little",
			file: "1760020eb37fe3709c40f60d2a8ef544.wav"
		},
		"triangle": {
			title: "[Tridashie] Friendship is Randomly Musical 2 [REUPLOAD]",
			file: "0728baf0b82d32221fe6916c34b0daf4.wav"
		},
		"bongo": {
			title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			file: "336220063f686b0f245430f76cbceb4d.wav"
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
			file: "28050489c468fd887d1b45812d183bd3.wav"
		},
		"hi bongo": {
			title: "Daddy Pig Plays The Drums!  | @Peppa Pig - Official Channel",
			file: "8bb317a1069d04e13c23af27f2fdb76c.wav"
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
			file: "41ff2db5a55a45496d63fb0dbdbedd7c.wav"
		},
		"mute conga": {
			title: "Peppa Pig Makes Music Instrument with Marbles | Peppa Pig Official Family Kids Cartoon",
			file: "66c02912796e3b9f56a6d60081b96931.wav"
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
			file: "086fb0c3d8dfab35aaba3c8e1dfb05af.wav"
		},
		"saxophone": {
			title: "My Little Pony Friendship is Magic season 2 episode 22 \"Hurricane Fluttershy\"",
			file: "aa878420c089b36eab7064b70ac27818.wav"
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
			file: "578d9cba77e8d6f578b31d5f4a31c151.wav"
		},
		"flute": {
			title: "Friendship is Musical | Season 5 (First Half)",
			file: "24843dba9bbe011857c33f1cdfaedab7.wav"
		},
		"wooden flute": {
			title: "Peppa Pig Makes Music Instrument with Marbles | Peppa Pig Official Family Kids Cartoon",
			file: "49589ee679b86fb05a411ebc302d407d.wav"
		},
		"bassoon": {
			title: "Friendship is Randomly Musical 5",
			file: "925bc0db0ad640181cbbd961c326d1fd.wav"
		},
		"choir": {
			title: "Friendship is Musical | Season 1 Episode 21-22",
			file: "5ac45c5d9602af8cbd8d57f17d7c7538.wav"
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
			file: "361deaf705ebda27e0bb0be9184fb397.wav"
		},
		"synth pad": {
			title: "Friendship is Musical | Season 1 Episode 13-14",
			file: "6dd9834236dfc66bea70e387c1481941.wav"
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
			file: "baa611917d9f86ec22b1240a0df9e509.wav"
		},
		"church organ": {
			title: "My Little Pony: Friendship is Magic - Season 4 Episode 3",
			file: "9bfed56d3d764247e6a1e74694ae1865.wav"
		},
		"trumpet": {
			title: "[1080p] My little Pony Friendship is Magic Season 6 Episode 14 The Cart Before the Ponies",
			file: "33090cbd8df0f949151239545a9a03a2.wav"
		},
		"trumbone": {
			title: "My Little Pony: friendship is magic | Swarm of the Century | FULL EPISODE | MLP",
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
		"electric guitar", "wooden flute", "steel drum", "steel drum",
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
	var MidiParser = function(data) {
		this.data = new Uint8Array(data);
		this.index = 0;
		this.tracks = [];
		this.tempo = 0;
		this.chuckSize = 0;
		this.duration = 0;
		this.finalList = [];
		this.finalPitchBend = [];
		this.trackNote = [];
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
	MidiParser.prototype.load = function() {
		this.ReadHeader();
		this.splitTracks();
		this.processAllTracks();
	}
	MidiParser.prototype.ReadHeader = function() {
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
	MidiParser.prototype.splitTracks = function() {
		// Store byte data for all tracks separately
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
	MidiParser.prototype.CompressAndStore = function() {
		return {
			"name": "Midi File",
			"tracks": this.trackNote,
			"tempo": this.timeDivision,
			"duration": this.duration,
			"formatType": this.formatType
		}
	}
	MidiParser.prototype.processAllTracks = function() {
		this.trackNote = [];
		for (var i = 0; i < this.tracks.length; i++) {
			this.cleanProcessAllTracksDataIncludingTempoData(((!(this.formatType == 1)) || i == 0));
			this.trackNumber = i;
			this.ProcessTrackNumber(i);
			this.convertToNoteBlocks();
			this.trackNote.push([i + 1, this.finalList, this.finalPitchBend]);
		}
		this.cleanProcessAllTracksDataIncludingTempoData(true);
	}
	MidiParser.prototype.ProcessTrackNumber = function(trackNumber) {
		//Set a default tempo of 120 bpm
		this.tempo = (500000 / this.timeDivision);
		this.data = this.tracks[trackNumber];
		this.chuckSize = this.data.length;
		this.pulseCounter = 0;
		this.eventType = '';
		this.index = 0;
		while (!(this.index > (this.chuckSize - 1))) {
			this.pulseCounter += this.ReadVariableLength();
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
						// This is probably a non-standard meta event or similar
					}
				}
			}
		}
		if (!(this.index == this.chuckSize)) {
			throw new Error("Track number " + (this.trackNumber + 1) + " has overrun - invalid MIDI file");
		}
	}
	MidiParser.prototype.ProcessMidiControlEvent = function() {
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
		// Ignored MIDI Channel Voice Messages are -
		// 10: Poly key pressure
		// 11: Controller change
		// 13: Channel pressure / Pitch bend
	}
	MidiParser.prototype.NoteOff = function() {
		var temp = this.newList.pitch.length - 1;
		for (var i = 0; i < this.newList.pitch.length; i++) {
			if (((this.trackNumber == this.newList.trackNumber[temp] && this.parameter1 == this.newList.pitch[temp]) && (this.midiChannel == this.newList.channel[temp] && this.newList.noteOn[temp] == true))) {
				this.newList.tickOff[temp] = this.pulseCounter;
				this.newList.noteOn[temp] = false;
				return;
			}
			temp -= 1;
		}
	}
	MidiParser.prototype.NoteOn = function() {
		this.newList.tickOn.push(this.pulseCounter);
		this.newList.tickOff.push(0);
		this.newList.trackNumber.push(this.trackNumber);
		this.newList.channel.push(this.midiChannel);
		if (this.midiChannel == 9) {
			if (this.parameter1 < 35 || this.parameter1 > 81) {
				// We're receiving an invalid percussion instrument for some reason. Not much we can do really. Hardly worth a warning...
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
		this.newList.volume.push(Math.round((((this.parameter2 - 1) * 100) / 127)));
		this.newList.noteOn.push(true);
	}
	MidiParser.prototype.SetInstrument = function() {
		if (typeof MIDI_INSTRUMENT[this.parameter1] == "undefined") {
			console.warn("Assign musical instrument for group " + (Math.floor(this.parameter1 / 8) + 1) + " instrument " + this.parameter1 + " (" + MIDI_INSTRUMENT[this.parameter1] + ")")
		}
		this.instrumentName = this.parameter1;
	}
	MidiParser.prototype.ProcessMetaEvent = function() {
		if (this.command == 47) {
			// This is the end-of-track meta command so force the pointer to the end of the chunk to exit gracefully
			this.index = this.chuckSize;
		}
		if (this.command == 81) {
			this.SetTempo();
		}
		// Most meta events are ignored. These are -
		// 0: Sequence number
		// 1: Text event
		// 2: Copyright notice
		// 3: Sequence/Track name
		// 4: Instrument name
		// 5: Lyric
		// 6: Marker
		// 7: Cue point
		// 32: MIDI Channel prefix
		// 84: SMTPE offset
		// 88: Time signature
		// 89: Key signature
		// 127: Sequencer-specific meta-event
	}
	MidiParser.prototype.SetTempo = function() {
		this.newList.tempoTick.push(this.pulseCounter);
		this.newList.tempoSetting.push((this.parameter1 / this.timeDivision));
	}
	MidiParser.prototype.ProcessSystemExclusiveEvent = function() {
		// All system exclusive events are ignored. These are -
		// 240: F0 Sysex event
		// 247: F7 Sysex event
	}
	MidiParser.prototype.convertToNoteBlocks = function() {
		// This block simply scans through all of the note and tempo information that we've recorded
		// calculating the actual note lengths (including if the tempo changes mid-note)
		// and inserts the start-tick, pitch, duration, volume, instrument, channel and track
		// for each note at the correct position in the lists
		var totalPulses = this.pulseCounter;
		this.pulseCounter = 0;
		var index = 0;
		var pitchBendIndex = 0;
		this.tempoIndex = 0;
		this.targetIndex = 0;
		this.currentPulseInSeconds = 0;
		while ((!(this.pulseCounter > totalPulses)) && (!(index >= this.newList.tickOn.length))) {
			var temp = totalPulses;
			if (!(this.tempoIndex >= this.newList.tempoTick.length)) {
				temp = this.newList.tempoTick[this.tempoIndex];
			}
			if (!(index > (this.newList.tickOn.length - 1))) {
				if (this.newList.tickOn[index] < temp) {
					temp = this.newList.tickOn[index];
				}
			}
			if (temp >= totalPulses) {
				return;
			}
			this.currentPulseInSeconds += (this.tempo * (temp - this.pulseCounter));
			this.pulseCounter = temp;
			while (!((!(this.newList.tempoTick[this.tempoIndex] == this.pulseCounter)) || this.tempoIndex >= this.newList.tempoSetting.length)) {
				this.tempo = this.newList.tempoSetting[this.tempoIndex];
				this.tempoIndex += 1;
			}
			while (!((!(this.newList.tickOn[index] == this.pulseCounter)) || index >= this.newList.tickOff.length)) {
				this.insertNoteCurrentlyAtIndex(index);
				index += 1;
			}
		}
	}
	MidiParser.prototype.insertNoteCurrentlyAtIndex = function(index) {
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
		if (lengthInMilliseconds > 0) {
			if (this.newList.instrument[index] < 128) {
				this.finalList.push([this.newList.instrument[index] + 1, this.newList.pitch[index], Math.round(lengthInMilliseconds), Math.round(this.currentPulseInSeconds), this.newList.volume[index], this.newList.channel[index]]);
			} else {
				this.finalList.push([0, this.newList.instrument[index] - 127, Math.round(lengthInMilliseconds), Math.round(this.currentPulseInSeconds), this.newList.volume[index], this.newList.channel[index]]);
			}
			if (Math.round(lengthInMilliseconds) + Math.round(this.currentPulseInSeconds) > this.duration) {
				this.duration = Math.round(lengthInMilliseconds) + Math.round(this.currentPulseInSeconds);
			}
		}
	}
	MidiParser.prototype.cleanProcessAllTracksDataIncludingTempoData = function(includingTempo) {
		this.newList.channel.length = 0;
		this.newList.instrument.length = 0;
		this.newList.noteOn.length = 0;
		this.newList.pitch.length = 0;
		this.newList.tickOff.length = 0;
		this.newList.tickOn.length = 0;
		this.newList.trackNumber.length = 0;
		this.newList.volume.length = 0;
		this.finalList = [];
		this.finalPitchBend = [];
		if (includingTempo) {
			this.newList.tempoSetting.length = 0;
			this.newList.tempoTick.length = 0;
		}
	}
	MidiParser.prototype.ReadMidiEvent = function() {
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
					this.midiChannel = fd % 16;
					this.eventTypeValue = ((fd - this.midiChannel) / 16);
					this.ParseMidi();
				} else {
					// TODO: Ought to check the previous command was a midi one in which case this is referred to as "running status"
					this.index -= 1;
					this.ParseMidi();
				}
			}
		}
	}
	MidiParser.prototype.ParseMidi = function() {
		this.parameter1 = this.ReadUnsignedByte();
		if (this.eventTypeValue == 12 || this.eventTypeValue == 13) {
			// "Program change" and "Channel pressure" don't take an extra parameter
			return;
		}
		this.parameter2 = this.ReadUnsignedByte();
	}
	MidiParser.prototype.ParseSystemEvent = function() {
		var temp = this.ReadVariableLength();
		this.index += temp;
	}
	MidiParser.prototype.ParseMetaData = function() {
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
			case 75:
			case 84:
			case 88:
			case 89:
			case 93:
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
		this.eventType = undefined;
	}
	MidiParser.prototype.ReadUnsignedLong = function() {
		return this.ReadBytes(4);
	}
	MidiParser.prototype.ReadUnsignedByte = function() {
		return this.ReadBytes(1);
	}
	MidiParser.prototype.ReadUnsignedShort = function() {
		return this.ReadBytes(2);
	}
	MidiParser.prototype.ReadVariableLength = function() {
		var value = 0;
		while (true) {
			if (this.index > (this.data.length - 1)) {
				throw new Error("Unexpected end of input");
			}
			var temp = Math.round(this.data[this.index]);
			this.index += 1;
			value = ((value * 128) + (temp % 128));
			if (temp < 128) {
				return value;
			}
		}
	}
	MidiParser.prototype.ReadBytes = function(byteCount) {
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
			kjjh.push(kjjh[0] % 16);
			sp += kjjh[3];
			if (kjjh[2] > 0) {
				fdgdfg.push([kjjh[0], kjjh[1], kjjh[2] / 1000, sp / 1000, kjjh[4]]);
			}
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
	var MidiTrack = function(notes, trackNumber) {
		this.noteTracker = 0;
		this.trackNumber = trackNumber;
		this.decodeNoteQueue = notes;
	}
	MidiTrack.prototype.getNote = function(time, mute) {
		var GS = [];
		if (this.decodeNoteQueue.length > 0) {
			if (this.decodeNoteQueue[this.noteTracker] && ((time * 1000000) > this.decodeNoteQueue[this.noteTracker][3])) {
				while (!(!this.decodeNoteQueue[this.noteTracker] || (this.decodeNoteQueue[this.noteTracker] && ((time * 1000000) < this.decodeNoteQueue[this.noteTracker][3])))) {
					if (!mute) {
						GS.push(this.noteTracker);
					}
					this.noteTracker += 1;
				}
			}
			this.noteTracker -= 1;
			if (this.decodeNoteQueue[this.noteTracker] && ((time * 1000000) < this.decodeNoteQueue[this.noteTracker][3])) {
				while (!(!this.decodeNoteQueue[this.noteTracker] || (this.decodeNoteQueue[this.noteTracker] && ((time * 1000000) > this.decodeNoteQueue[this.noteTracker][3])))) {
					this.noteTracker -= 1;
				}
			}
			this.noteTracker += 1;
		}
		return GS;
	}
	var MidiSoundEngine = function() {
		this.node = audioContext.createGain();
		this.node.gain.value = 1;
	    this.node.connect(audioContext.destination);
	    this.node2 = audioContext.createGain();
	    this.node2.connect(this.node);
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
		this.concurrencyCounter = 0;
		this.trackQueue = [];
		this._soundbank = {};
		this._soundbankLoaded = 0;
		this.frameStart = Date.now();
		this.interval = setInterval(this.step, 1000 / 60);
	}
	MidiSoundEngine.prototype.cleanup = function() {
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
	MidiSoundEngine.prototype.resetNoteTracker = function() {
		for (var i = 0; i < this.trackQueue.length; i++) {
			this.trackQueue[i].noteTracker = 0;
		}
	}
	MidiSoundEngine.prototype.setCurrentTime = function(s) {
		this.muteMusicr = true;
		this.MidiTimer = s;
		this.setStartTime(s);
		if (this.MidiTimer < 0) {
			this.MidiTimer = 0;
			this.resetNoteTracker();
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
		_this.onprogress && _this.onprogress("loaded instruments " + _this._soundbankLoaded);
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
			this.resetNoteTracker();
		}
	}
	MidiSoundEngine.prototype.stop = function() {
		this.isPaused = true;
		this.MidiTimer = 0;
		this.setStartTime(0);
		this.resetNoteTracker();
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
		if (n.volume == 0) {
			return;
		}
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
			var pitch = (span.releasePatch ? (n.pitch + (this.vidAudio(span.releasePatch, n.pitch) - 60)) : n.pitch);
			source.playbackRate.value = Math.pow(2, ((pitch - 60) / 12));
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
			gain.value = (n.volume * (span.volume || 1)) * 0.8;
			source.start();
		}
	}
	MidiSoundEngine.prototype.step = function() {
		var newList = [];
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
		for (var i = 0; i < this.trackQueue.length; i++) {
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
								volume: n.volume,
								type: 1
							});
						}
						if (this.node.gain.value) {
							playNote.push({
								type: 'note',
								instrument: n.instrument,
								pitch: n.pitch,
								isOn: true,
								volume: n.volume,
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
								volume: n.volume,
								type: 0
							});
						}
						if (this.node.gain.value) {
							playNote.push({
								type: 'drum',
								drum: n.drum,
								volume: n.volume,
								isOn: true,
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
			if ("notes" in txt || "tracks" in txt) {
				return txt;
			} else {
				return JSON.parse(txt);
			}
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
		this.stop();
		var loader = new MidiParser(data);
		var gf_h = Date.now();
		loader.load();
		this.loadedTime = Date.now() - gf_h;
		this.loadMidi(loader.CompressAndStore());
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
				gf[2] *= 1000000;
				gf[3] *= 1000000;
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
					if (DRUMS_MIDI[Math.round(gf[1]) - 1]) {
						this._soundbank[DRUMS_MIDI[Math.round(gf[1]) - 1]] = {};
					}
				}
			}
			this.duration /= 1000000;
			this.trackQueue.push(new MidiTrack(data_1.notes, 0));
		} else {
			for (var i = 0; i < tracks.length; i++) {
				this.trackQueue.push(new MidiTrack(tracks[i][1], tracks[i][0]));
			}
			for (var i = 0; i < tracks.length; i++) {
				for (var i1 = 0; i1 < tracks[i][1].length; i1++) {
					var gf = tracks[i][1][i1];
					if (gf[0] > 0) {
						if (gf[2]) {
							if (MIDI_INSTRUMENT[Math.round(gf[0]) - 1]) {
								this._soundbank[MIDI_INSTRUMENT[Math.round(gf[0]) - 1]] = {};
							}
						}
					} else {
						if (DRUMS_MIDI[Math.round(gf[1]) - 1]) {
							this._soundbank[DRUMS_MIDI[Math.round(gf[1]) - 1]] = {};
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
	return {
		MidiParser: MidiParser,
		MidiSoundEngine: MidiSoundEngine,
		SOUNDBANK_INFOS,
		MIDI_INSTRUMENT,
		DRUMS_MIDI,
		DRUMS,
		INSTRUMENT
	}
}());
