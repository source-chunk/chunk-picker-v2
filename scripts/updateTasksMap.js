const fs = require('fs');
const path = require('path');

const TASKSMAP_FILE = path.join(__dirname, '../tasksMap.json');

function formatEquip(equip, chunkInfo) {
    if (!chunkInfo['equipment'][equip] || !chunkInfo['equipment'][equip].hasOwnProperty('formatted_name')) {
        return equip.toLowerCase();
    } else {
        return chunkInfo['equipment'][equip]['formatted_name'];
    }
}

function gcd(a, b) {
    if (b < 0.0000001) return a;

    return gcd(b, Math.floor(a % b));
}

function findFraction(fraction, isRoundedDenominator) {
    if (isNaN(fraction)) {
        return fraction;
    } else {
        let len = fraction.toString().length - 2;

        let denominator = Math.pow(10, len);
        let numerator = fraction * denominator;

        let divisor = gcd(numerator, denominator);

        numerator /= divisor;
        denominator /= divisor;
        if (isRoundedDenominator) {
            return 1 + '/' + (+(Math.floor(Math.round((denominator/numerator) + "e+2")  + "e-2"))).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        } else {
            return 1 + '/' + (+(Math.round((denominator/numerator) + "e+2")  + "e-2")).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    }
}

function loadTasks() {
	return JSON.parse(fs.readFileSync(path.join(__dirname, '../chunkpicker-chunkinfo-export.json'), 'utf-8'));
}

function loadTaskMap() {
	if (!fs.existsSync(TASKSMAP_FILE)) return {};
	return JSON.parse(fs.readFileSync(TASKSMAP_FILE, 'utf-8'));
}

function saveTaskMap(map) {
	fs.writeFileSync(TASKSMAP_FILE, JSON.stringify(map, null, 2));
}

function run() {
	const chunkinfo = loadTasks();
	let allTaskNames = [];
	// Standard tasks
	chunkinfo.hasOwnProperty('challenges') && Object.keys(chunkinfo['challenges']).filter((skill) => skill !== 'Nonskill').forEach((skill) => {
		allTaskNames.push(...Object.keys(chunkinfo['challenges'][skill]));
	});
	// BiS tasks
	const vowels = ['a', 'e', 'i', 'o', 'u'];
	chunkinfo.hasOwnProperty('equipment') && allTaskNames.push(...Object.keys(chunkinfo['equipment']).map((equip) => {
		let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
		article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
		return 'Obtain' + article + '~|' + formatEquip(equip, chunkinfo).replaceAll('#', '/') + '|~';
	}));
	const monsters = [];
	chunkinfo.hasOwnProperty('chunks') && Object.keys(chunkinfo['chunks']).forEach((chunk) => {
		if (chunkinfo['chunks'][chunk].hasOwnProperty('Sections')) {
			Object.keys(chunkinfo['chunks'][chunk]['Sections']).forEach((section) => {
				if (chunkinfo['chunks'][chunk]['Sections'][section].hasOwnProperty('Monster')) {
					monsters.push(...Object.keys(chunkinfo['chunks'][chunk]['Sections'][section]['Monster']));
				}
			});
		} else {
			if (chunkinfo['chunks'][chunk].hasOwnProperty('Monster')) {
				monsters.push(...Object.keys(chunkinfo['chunks'][chunk]['Monster']));
			}
		}
	});
	// Kill X tasks
	allTaskNames.push(...monsters.map((monster) => {
		return 'Kill X ~|' + monster + '|~';
	}));
	const drops = [];
	const monsterDrops = [];
	chunkinfo.hasOwnProperty('drops') && Object.keys(chunkinfo['drops']).forEach((monster) => {
		Object.keys(chunkinfo['drops'][monster]).forEach((drop) => {
			if (chunkinfo['codeItems']['dropTables'].hasOwnProperty(drop)) {
				drops.push(...Object.keys(chunkinfo['codeItems']['dropTables'][drop]));
				Object.keys(chunkinfo['drops'][monster][drop]).forEach((quantity) => {
					Object.keys(chunkinfo['codeItems']['dropTables'][drop]).forEach((droptableDrop) => {					
						let calcedQuantity;
						if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (noted)')) {
							if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (F2P)')) {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) + ' (noted) (F2P)';
							} else {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) + ' (noted)';
							}
						} else {
							if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (F2P)')) {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] * quantity) + ' (F2P)';
							} else {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] * quantity);
							}
						}
						monsterDrops.push(`${monster.replace('[+]', '')}: ~|${droptableDrop}|~ (${calcedQuantity}) (${isNaN(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '') * chunkinfo['drops'][monster][drop][quantity].split('/')[0]) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1] * chunkinfo['drops'][monster][drop][quantity].split('/')[1])) ? findFraction(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1]), drop.includes('GeneralSeedDropTable')) : findFraction(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '') * chunkinfo['drops'][monster][drop][quantity].split('/')[0]) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1] * chunkinfo['drops'][monster][drop][quantity].split('/')[1]), drop.includes('GeneralSeedDropTable'))})`);
					});
				});
			} else {
				drops.push(drop);
				Object.keys(chunkinfo['drops'][monster][drop]).forEach((quantity) => {
					monsterDrops.push(`${monster.replace('[+]', '')}: ~|${drop}|~ (${quantity}) (${isNaN(chunkinfo['drops'][monster][drop][quantity].split('/')[0] / chunkinfo['drops'][monster][drop][quantity].split('/')[1]) ? chunkinfo['drops'][monster][drop][quantity] : findFraction(chunkinfo['drops'][monster][drop][quantity].split('/')[0] / chunkinfo['drops'][monster][drop][quantity].split('/')[1])})`);
				});
			}
		});
	});
	chunkinfo.hasOwnProperty('skillItems') && chunkinfo['skillItems'].hasOwnProperty('Slayer') && Object.keys(chunkinfo['skillItems']['Slayer']).forEach((monster) => {
		Object.keys(chunkinfo['skillItems']['Slayer'][monster]).forEach((drop) => {
			if (chunkinfo['codeItems']['dropTables'].hasOwnProperty(drop)) {
				drops.push(...Object.keys(chunkinfo['codeItems']['dropTables'][drop]));
				Object.keys(chunkinfo['skillItems']['Slayer'][monster][drop]).forEach((quantity) => {
					Object.keys(chunkinfo['codeItems']['dropTables'][drop]).forEach((droptableDrop) => {					
						let calcedQuantity;
						if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (noted)')) {
							if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (F2P)')) {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) + ' (noted) (F2P)';
							} else {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) + ' (noted)';
							}
						} else {
							if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (F2P)')) {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] * quantity) + ' (F2P)';
							} else {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] * quantity);
							}
						}
						monsterDrops.push(`${monster.replace('[+]', '')}: ~|${droptableDrop}|~ (${calcedQuantity}) (${isNaN(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '') * chunkinfo['skillItems']['Slayer'][monster][drop][quantity].split('/')[0]) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1] * chunkinfo['skillItems']['Slayer'][monster][drop][quantity].split('/')[1])) ? findFraction(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1]), drop.includes('GeneralSeedDropTable')) : findFraction(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '') * chunkinfo['skillItems']['Slayer'][monster][drop][quantity].split('/')[0]) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1] * chunkinfo['skillItems']['Slayer'][monster][drop][quantity].split('/')[1]), drop.includes('GeneralSeedDropTable'))})`);
					});
				});
			} else {
				drops.push(drop);
				Object.keys(chunkinfo['skillItems']['Slayer'][monster][drop]).forEach((quantity) => {
					monsterDrops.push(`${monster.replace('[+]', '')}: ~|${drop}|~ (${quantity}) (${isNaN(chunkinfo['skillItems']['Slayer'][monster][drop][quantity].split('/')[0] / chunkinfo['skillItems']['Slayer'][monster][drop][quantity].split('/')[1]) ? chunkinfo['skillItems']['Slayer'][monster][drop][quantity] : findFraction(chunkinfo['skillItems']['Slayer'][monster][drop][quantity].split('/')[0] / chunkinfo['skillItems']['Slayer'][monster][drop][quantity].split('/')[1])})`);
				});
			}
		});
	});
	chunkinfo.hasOwnProperty('skillItems') && chunkinfo['skillItems'].hasOwnProperty('Thieving') && Object.keys(chunkinfo['skillItems']['Thieving']).forEach((outputName) => {
		Object.keys(chunkinfo['skillItems']['Thieving'][outputName]).forEach((drop) => {
			if (chunkinfo['codeItems']['dropTables'].hasOwnProperty(drop)) {
				drops.push(...Object.keys(chunkinfo['codeItems']['dropTables'][drop]));
				Object.keys(chunkinfo['skillItems']['Thieving'][outputName][drop]).forEach((quantity) => {
					Object.keys(chunkinfo['codeItems']['dropTables'][drop]).forEach((droptableDrop) => {					
						let calcedQuantity;
						if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (noted)')) {
							if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (F2P)')) {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) + ' (noted) (F2P)';
							} else {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) + ' (noted)';
							}
						} else {
							if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (F2P)')) {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] * quantity) + ' (F2P)';
							} else {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] * quantity);
							}
						}
						monsterDrops.push(`[Thieving] ${outputName.replace('[+]', '')}: ~|${droptableDrop}|~ (${calcedQuantity}) (${isNaN(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '') * chunkinfo['skillItems']['Thieving'][outputName][drop][quantity].split('/')[0]) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1] * chunkinfo['skillItems']['Thieving'][outputName][drop][quantity].split('/')[1])) ? findFraction(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1]), drop.includes('GeneralSeedDropTable')) : findFraction(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '') * chunkinfo['skillItems']['Thieving'][outputName][drop][quantity].split('/')[0]) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1] * chunkinfo['skillItems']['Thieving'][outputName][drop][quantity].split('/')[1]), drop.includes('GeneralSeedDropTable'))})`);
					});
				});
			} else {
				drops.push(drop);
				Object.keys(chunkinfo['skillItems']['Thieving'][outputName][drop]).forEach((quantity) => {
					monsterDrops.push(`[Thieving] ${outputName.replace('[+]', '')}: ~|${drop}|~ (${quantity}) (${isNaN(chunkinfo['skillItems']['Thieving'][outputName][drop][quantity].split('/')[0] / chunkinfo['skillItems']['Thieving'][outputName][drop][quantity].split('/')[1]) ? chunkinfo['skillItems']['Thieving'][outputName][drop][quantity] : findFraction(chunkinfo['skillItems']['Thieving'][outputName][drop][quantity].split('/')[0] / chunkinfo['skillItems']['Thieving'][outputName][drop][quantity].split('/')[1])})`);
				});
			}
		});
	});
	chunkinfo.hasOwnProperty('skillItems') && chunkinfo['skillItems'].hasOwnProperty('Hunter') && Object.keys(chunkinfo['skillItems']['Hunter']).filter((outputName) => outputName.includes('impling')).forEach((outputName) => {
		Object.keys(chunkinfo['skillItems']['Hunter'][outputName]).forEach((drop) => {
			if (chunkinfo['codeItems']['dropTables'].hasOwnProperty(drop)) {
				drops.push(...Object.keys(chunkinfo['codeItems']['dropTables'][drop]));
				Object.keys(chunkinfo['skillItems']['Hunter'][outputName][drop]).forEach((quantity) => {
					Object.keys(chunkinfo['codeItems']['dropTables'][drop]).forEach((droptableDrop) => {					
						let calcedQuantity;
						if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (noted)')) {
							if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (F2P)')) {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) + ' (noted) (F2P)';
							} else {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (noted)')[0] * quantity) + ' (noted)';
							}
						} else {
							if (chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].includes(' (F2P)')) {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1].split(' (F2P)')[0] * quantity) + ' (F2P)';
							} else {
								calcedQuantity = (isNaN(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] * quantity) ? chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] : chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[1] * quantity);
							}
						}
						monsterDrops.push(`${outputName.replace('[+]', '')}: ~|${droptableDrop}|~ (${calcedQuantity}) (${isNaN(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '') * chunkinfo['skillItems']['Hunter'][outputName][drop][quantity].split('/')[0]) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1] * chunkinfo['skillItems']['Hunter'][outputName][drop][quantity].split('/')[1])) ? findFraction(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1]), drop.includes('GeneralSeedDropTable')) : findFraction(parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[0].replaceAll('~', '') * chunkinfo['skillItems']['Hunter'][outputName][drop][quantity].split('/')[0]) / parseFloat(chunkinfo['codeItems']['dropTables'][drop][droptableDrop].split('@')[0].split('/')[1] * chunkinfo['skillItems']['Hunter'][outputName][drop][quantity].split('/')[1]), drop.includes('GeneralSeedDropTable'))})`);
					});
				});
			} else {
				drops.push(drop);
				Object.keys(chunkinfo['skillItems']['Hunter'][outputName][drop]).forEach((quantity) => {
					monsterDrops.push(`${outputName.replace('[+]', '')}: ~|${drop}|~ (${quantity}) (${isNaN(chunkinfo['skillItems']['Hunter'][outputName][drop][quantity].split('/')[0] / chunkinfo['skillItems']['Hunter'][outputName][drop][quantity].split('/')[1]) ? chunkinfo['skillItems']['Hunter'][outputName][drop][quantity] : findFraction(chunkinfo['skillItems']['Hunter'][outputName][drop][quantity].split('/')[0] / chunkinfo['skillItems']['Hunter'][outputName][drop][quantity].split('/')[1])})`);
				});
			}
		});
	});
	const birdNests = ["Bird nest (Wyson)", "Bird nest (seeds)", "Bird nest (ring)", "Bird nest (egg)"]
	birdNests.forEach((nest) => {
		chunkinfo['skillItems']['Nonskill'].hasOwnProperty(nest + ' loot') && chunkinfo['challenges']['Nonskill'].hasOwnProperty(nest + ' loot') && Object.keys(chunkinfo['skillItems']['Nonskill'][nest + ' loot']).forEach(drop => {
			chunkinfo['skillItems']['Nonskill'][nest + ' loot'].hasOwnProperty(drop) && Object.keys(chunkinfo['skillItems']['Nonskill'][nest + ' loot'][drop]).forEach(quantity => {
				monsterDrops.push(nest.replaceAll('[+]', '') + ': ~|' + drop + '|~ (' + (quantity || 'N/A') + ') (' + chunkinfo['skillItems']['Nonskill'][nest + ' loot'][drop][quantity] + ')');
			});
		});
	});
	// Every Drop tasks
	allTaskNames.push(...drops);
	// All Droptables tasks
	allTaskNames.push(...monsterDrops);
	const shopItems = [];
	chunkinfo.hasOwnProperty('shopItems') && Object.keys(chunkinfo['shopItems']).forEach((shop) => {
		shopItems.push(...Object.keys(chunkinfo['shopItems'][shop]).map((item) => {
			return `${shop}: ~|${item}|~`;
		}));
	});
	chunkinfo.hasOwnProperty('challenges') && chunkinfo['challenges'].hasOwnProperty('Nonskill') && Object.keys(chunkinfo['challenges']['Nonskill']).filter((name) => chunkinfo['challenges']['Nonskill'][name].hasOwnProperty('Source') && chunkinfo['challenges']['Nonskill'][name]['Source'] === 'shop' && chunkinfo['challenges']['Nonskill'][name].hasOwnProperty('Output')).forEach((name) => {
		let output = chunkinfo['challenges']['Nonskill'][name]['Output'];
		if (chunkinfo['skillItems']['Nonskill'].hasOwnProperty(output)) {
			shopItems.push(...Object.keys(chunkinfo['skillItems']['Nonskill'][output]).map((item) => {
				return `${name.split('|')[1]}: ~|${item}|~`;
			}));
		} else {
			shopItems.push(`${name.split('|')[1]}: ~|${output}|~`);
		}
	});
	// All Shops tasks
	allTaskNames.push(...shopItems);
	const taskMap = loadTaskMap();
	const newTasks = {};
	let nextId = 1;
	if (taskMap.hasOwnProperty('currentNextIndex')) {
		nextId = taskMap['currentNextIndex'];
	}
	!!allTaskNames && allTaskNames.forEach((taskName) => {
		if (taskMap.hasOwnProperty(taskName)) {
			newTasks[taskName] = taskMap[taskName];
		} else if (!newTasks.hasOwnProperty(taskName)) {
			console.log(`New task: "${taskName}"`);
			newTasks[taskName] = `t_${nextId}`;
			nextId++;
		}
	});
	newTasks['currentNextIndex'] = nextId;
	saveTaskMap(newTasks);
}

try {
	run();
} catch (err) {
	console.error('Error updating task map:', err);
	process.exit(1);
}
