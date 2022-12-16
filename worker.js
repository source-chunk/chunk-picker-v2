importScripts('https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js');
let nonValids = {};
let globalValids;
let eGlobal;
let highestOverall = {};
let dropRatesGlobal = {};
let dropTablesGlobal = {};
let tempAlwaysGlobal = {};
let xpTable = {
    "1": 0,
    "2": 83,
    "3": 174,
    "4": 276,
    "5": 388,
    "6": 512,
    "7": 650,
    "8": 801,
    "9": 969,
    "10": 1154,
    "11": 1358,
    "12": 1584,
    "13": 1833,
    "14": 2107,
    "15": 2411,
    "16": 2746,
    "17": 3115,
    "18": 3523,
    "19": 3973,
    "20": 4470,
    "21": 5018,
    "22": 5624,
    "23": 6291,
    "24": 7028,
    "25": 7842,
    "26": 8740,
    "27": 9730,
    "28": 10824,
    "29": 12031,
    "30": 13363,
    "31": 14833,
    "32": 16456,
    "33": 18247,
    "34": 20224,
    "35": 22406,
    "36": 24815,
    "37": 27473,
    "38": 30408,
    "39": 33648,
    "40": 37224,
    "41": 41171,
    "42": 45529,
    "43": 50339,
    "44": 55649,
    "45": 61512,
    "46": 67983,
    "47": 75127,
    "48": 83014,
    "49": 91721,
    "50": 101333,
    "51": 111945,
    "52": 123660,
    "53": 136594,
    "54": 150872,
    "55": 166636,
    "56": 184040,
    "57": 203254,
    "58": 224466,
    "59": 247886,
    "60": 273742,
    "61": 302288,
    "62": 333804,
    "63": 368599,
    "64": 407015,
    "65": 449428,
    "66": 496254,
    "67": 547953,
    "68": 605032,
    "69": 668051,
    "70": 737627,
    "71": 814445,
    "72": 899257,
    "73": 992895,
    "74": 1096278,
    "75": 1210421,
    "76": 1336443,
    "77": 1475581,
    "78": 1629200,
    "79": 1798808,
    "80": 1986068,
    "81": 2192818,
    "82": 2421087,
    "83": 2673114,
    "84": 2951373,
    "85": 3258594,
    "86": 3597792,
    "87": 3972294,
    "88": 4385776,
    "89": 4842295,
    "90": 5346332,
    "91": 5902831,
    "92": 6517253,
    "93": 7195629,
    "94": 7944614,
    "95": 8771558,
    "96": 9684577,
    "97": 10692629,
    "98": 11805606,
    "99": 13034431
};
let diaryTierOrder = ['Easy', 'Medium', 'Hard', 'Elite', 'Museum Camp', 'Northern Reaches', 'Southern Swamps', 'Mountainous East'];
let diaryHierarchy = ['Grandmaster', 'Master', 'Elite', 'Hard', 'Medium', 'Easy'];
let outputTasks = {};

let type;
let chunks;
let baseChunkData;
let rules;
let chunkInfo;
let skillNames;
let processingSkill;
let maybePrimary;
let combatSkills;
let monstersPlus;
let objectsPlus;
let chunksPlus;
let itemsPlus;
let mixPlus;
let npcsPlus;
let tools;
let elementalRunes;
let manualTasks;
let completeChallenges;
let backlog;
let rareDropNum;
let universalPrimary;
let elementalStaves;
let rangedItems;
let boneItems;
let highestCurrent;
let dropTables;
let questPointTotal;
let questProgress = {};
let diaryProgress = {};
let skillQuestXp = {};
let kudosTotal = 0;
let possibleSkillTotal = 0;
let randomLoot;
let magicTools;
let bossLogs;
let bossMonsters;
let minigameShops;
let manualEquipment;
let checkedChallenges;
let backloggedSources;
let altChallenges;
let manualMonsters;
let slayerLocked;
let passiveSkill;
let f2pSkills;
let assignedXpRewards;
let isDiary2Tier = false;
let manualAreas;
let secondaryPrimaryNum;
let constructionLocked;

let clueTasksPossible = {};
let areasStructure = {};
let tempChunkData = {};

onmessage = function(e) {
    try {
        eGlobal = e;
        type = eGlobal.data[0];
        chunks = eGlobal.data[1] || [];
        rules = eGlobal.data[2];
        chunkInfo = eGlobal.data[3];
        skillNames = eGlobal.data[4];
        processingSkill = eGlobal.data[5];
        maybePrimary = eGlobal.data[6];
        combatSkills = eGlobal.data[7];
        monstersPlus = eGlobal.data[8];
        objectsPlus = eGlobal.data[9];
        chunksPlus = eGlobal.data[10];
        itemsPlus = eGlobal.data[11];
        mixPlus = eGlobal.data[12];
        npcsPlus = eGlobal.data[13];
        tasksPlus = eGlobal.data[14];
        tools = eGlobal.data[15];
        elementalRunes = eGlobal.data[16];
        manualTasks = eGlobal.data[17];
        completedChallenges = eGlobal.data[18];
        backlog = eGlobal.data[19];
        rareDropNum = eGlobal.data[20];
        universalPrimary = eGlobal.data[21];
        elementalStaves = eGlobal.data[22];
        rangedItems = eGlobal.data[23];
        boneItems = eGlobal.data[24];
        highestCurrent = eGlobal.data[25];
        dropTables = eGlobal.data[26];
        possibleAreas = eGlobal.data[27];
        randomLoot = eGlobal.data[28];
        magicTools = eGlobal.data[29];
        bossLogs = eGlobal.data[30];
        bossMonsters = eGlobal.data[31];
        minigameShops = eGlobal.data[32];
        manualEquipment = eGlobal.data[33];
        checkedChallenges = eGlobal.data[34];
        backloggedSources = eGlobal.data[35];
        altChallenges = eGlobal.data[36];
        manualMonsters = eGlobal.data[37];
        slayerLocked = eGlobal.data[38];
        passiveSkill = eGlobal.data[39];
        f2pSkills = eGlobal.data[40];
        assignedXpRewards = eGlobal.data[41];
        isDiary2Tier = eGlobal.data[42];
        manualAreas = eGlobal.data[43];
        secondaryPrimaryNum = eGlobal.data[44];
        constructionLocked = eGlobal.data[45];

        if (isDiary2Tier) {
            !!chunkInfo['challenges']['Diary'] && Object.keys(chunkInfo['challenges']['Diary']).filter(task => { return !chunkInfo['challenges']['Diary'][task].hasOwnProperty('Reward') && diaryHierarchy.includes(task.split('|')[1].split('%2F')[1]) && chunkInfo['challenges']['Diary'][task].hasOwnProperty('Tasks') }).forEach(task => {
                Object.keys(chunkInfo['challenges']['Diary'][task]['Tasks']).filter(subTask => { return chunkInfo['challenges']['Diary'][task]['Tasks'][subTask] === 'Diary' && diaryHierarchy.includes(subTask.split('|')[1].split('%2F')[1]) && subTask.includes('Complete the') && (diaryHierarchy.indexOf(subTask.split('|')[1].split('%2F')[1]) - diaryHierarchy.indexOf(task.split('|')[1].split('%2F')[1]) === 1) }).forEach(subTask => {
                    let newTier = diaryHierarchy[diaryHierarchy.indexOf(subTask.split('|')[1].split('%2F')[1]) + 1];
                    !!newTier && (chunkInfo['challenges']['Diary'][task]['Tasks'][subTask.split(subTask.split('|')[1].split('%2F')[1]).join(newTier)] = 'Diary');
                    delete chunkInfo['challenges']['Diary'][task]['Tasks'][subTask];
                    if (Object.keys(chunkInfo['challenges']['Diary'][task]['Tasks']).length === 0) {
                        delete chunkInfo['challenges']['Diary'][task]['Tasks'];
                    }
                });
            });
        }

        if (rareDropNum === "1/0") {
            rareDropNum = "1/999999999999999";
        }
        if (secondaryPrimaryNum === "1/0") {
            secondaryPrimaryNum = "1/999999999999999";
        }
        if (!chunkInfo) {
            return;
        }

        dropRatesGlobal = {};
        dropTablesGlobal = {};

        chunks = getAllChunkAreas(chunks);
        postMessage('5%');
        baseChunkData = gatherChunksInfo(chunks);
        postMessage('10%');
        globalValids = calcChallenges(chunks, baseChunkData);
        baseChunkData = tempChunkData;
        postMessage('90%');
        calcBIS();
        postMessage('100%');
        //console.log(globalValids);

        let tempChallengeArr;
        type === 'current' && (tempChallengeArr = calcCurrentChallenges2());

        //console.log(nonValids);
        //console.log(baseChunkData);
        
        postMessage([type, globalValids, baseChunkData, chunkInfo, highestCurrent, tempChallengeArr, type === 'current' ? questPointTotal : 0, highestOverall, type === 'current' ? dropRatesGlobal : {}, questProgress, diaryProgress, skillQuestXp, chunks]);
    } catch (err) {
        postMessage(['error', err]);
    }
}

// replaceAll helper
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Replaces all instances of match within str with replacement
function replaceAll(str, match, replacement) {
    return str.replace(new RegExp(escapeRegExp(match), 'g'), ()=>replacement);
}

// Combines JSONs
var combineJSONs = function(a, b) {
    let temp = {};
    Object.keys(a).forEach(sub => {
        if (typeof a[sub] === 'object') {
            if (!temp[sub]) {
                temp[sub] = {};
            }
            temp[sub] = combineJSONs(temp[sub], a[sub]);
        } else {
            temp[sub] = a[sub];
        }
    });
    Object.keys(b).forEach(sub => {
        if (typeof b[sub] === 'object') {
            if (!temp[sub]) {
                temp[sub] = {};
            }
            temp[sub] = combineJSONs(temp[sub], b[sub]);
        } else {
            temp[sub] = b[sub];
        }
    });
    return temp;
}

// Returns level from input xp
var getLevelForXp = function(xp) {
    let level = 1
    while (xp >= xpTable[level + 1]) {
        level++;
    }
    return level;
}

// Calculates all the possible challenges
var calcChallenges = function(chunks, baseChunkData) {
    let valids = {};
    let outputs = {};
    let outputObjects = {};
    let newValids = {};
    let tempItemSkill = {};
    let tempMultiStepSkill = {};
    let i = 0;
    !!manualTasks && Object.keys(manualTasks).forEach(skill => {
        skill !== 'BiS' && Object.keys(manualTasks[skill]).forEach(challenge => {
            if (!!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][challenge]) {
                if (!valids[skill]) {
                    valids[skill] = {};
                }
                valids[skill][challenge] = manualTasks[skill][challenge];
                if (!newValids[skill]) {
                    newValids[skill] = {};
                }
                newValids[skill][challenge] = manualTasks[skill][challenge];
                chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && (chunkInfo['challenges'][skill][challenge]['ManualValid'] = true);
            }
        });
    });

    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Spawns'] && Object.keys(chunkInfo['taskUnlocks']['Spawns']).forEach(item => {
        Object.keys(chunkInfo['taskUnlocks']['Spawns'][item]).forEach(chunk => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Spawns'][item][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Spawns'][item][chunk].length));
            if (!chunks.hasOwnProperty(chunk)) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['items'].hasOwnProperty(item) && baseChunkData['items'][item].hasOwnProperty(chunk)) {
                !!baseChunkData['items'][item] && delete baseChunkData['items'][item][chunk];
                if (!!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).length <= 0) {
                    delete baseChunkData['items'][item];
                }
            } else if (tempValid && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                if (!baseChunkData['items'][item]) {
                    baseChunkData['items'][item] = {};
                }
                baseChunkData['items'][item][chunk] = rules['Primary Spawns'] ? 'primary-spawn' : 'secondary-spawn';
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Monsters'] && Object.keys(chunkInfo['taskUnlocks']['Monsters']).forEach(monster => {
        Object.keys(chunkInfo['taskUnlocks']['Monsters'][monster]).forEach(chunk => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Monsters'][monster][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Monsters'][monster][chunk].length));
            if (!chunks.hasOwnProperty(chunk)) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['monsters'].hasOwnProperty(monster) && baseChunkData['monsters'][monster].hasOwnProperty(chunk)) {
                !!baseChunkData['monsters'][monster] && delete baseChunkData['monsters'][monster][chunk];
                if (!!baseChunkData['monsters'][monster] && Object.keys(baseChunkData['monsters'][monster]).length === 0) {
                    delete baseChunkData['monsters'][monster];
                    let dropsObj = chunkInfo['drops'][monster];
                    if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                        dropsObj = chunkInfo['skillItems']['Slayer'][monster];
                    }
                    !!dropsObj && Object.keys(dropsObj).forEach(drop => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                            Object.keys(dropTables[drop]).forEach(item => {
                                !!baseChunkData['items'][item] && delete baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                                if (!!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).length <= 0) {
                                    delete baseChunkData['items'][item];
                                }
                                !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][item];
                                if (!!dropRatesGlobal[monster] && Object.keys(dropRatesGlobal[monster]).length <= 0) {
                                    delete dropRatesGlobal[monster];
                                }
                                !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][item];
                                if (!!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).length <= 0) {
                                    delete dropTablesGlobal[monster];
                                }
                            });
                        } else {
                            if (!!baseChunkData['items'][drop]) {
                                if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                                    let re = new RegExp(`/Slay .*\~|${monster}|\~/`,"gm");
                                    let slayerTaskName = (!!baseChunkData['items'][drop] && Object.keys(baseChunkData['items'][drop]).find(value => re.test(value))) || (!!newValids['Slayer'] && Object.keys(newValids['Slayer']).find(value => re.test(value))) || "";
                                    delete baseChunkData['items'][drop][slayerTaskName];
                                    if (newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(slayerTaskName)) {
                                        delete newValids['Slayer'][slayerTaskName];
                                    }
                                } else {
                                    delete baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                                }
                            }
                            if (!!baseChunkData['items'][drop] && Object.keys(baseChunkData['items'][drop]).length <= 0) {
                                delete baseChunkData['items'][drop];
                            }
                            !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][drop];
                            if (!!dropRatesGlobal[monster] && Object.keys(dropRatesGlobal[monster]).length <= 0) {
                                delete dropRatesGlobal[monster];
                            }
                            !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][drop];
                            if (!!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).length <= 0) {
                                delete dropTablesGlobal[monster];
                            }
                        }
                    });
                }
            } else if (tempValid && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster])) {
                if (!baseChunkData['monsters'].hasOwnProperty(monster)) {
                    baseChunkData['monsters'][monster] = {};
                }
                baseChunkData['monsters'][monster][chunk] = true;
                !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]).forEach(drop => {
                    !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach(quantity => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                            Object.keys(dropTables[drop]).forEach(item => {
                                if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                    if (!baseChunkData['items'][item]) {
                                        baseChunkData['items'][item] = {};
                                    }
                                    if (chunkInfo['drops'][monster][item] === 'Always') {
                                        baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                    } else {
                                        baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                    }
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    if (!dropTablesGlobal[monster]) {
                                        dropTablesGlobal[monster] = {};
                                    }
                                    if (!dropTablesGlobal[monster][item]) {
                                        dropTablesGlobal[monster][item] = {};
                                    }
                                    dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : dropTables[drop][item].split('@')[1] * quantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                }
                            });
                        } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                            if (!baseChunkData['items'][drop]) {
                                baseChunkData['items'][drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop] === 'Always') {
                                baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        }
                    });
                });
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['NPCs'] && Object.keys(chunkInfo['taskUnlocks']['NPCs']).forEach(npc => {
        Object.keys(chunkInfo['taskUnlocks']['NPCs'][npc]).forEach(chunk => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['NPCs'][npc][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['NPCs'][npc][chunk].length));
            if (!chunks.hasOwnProperty(chunk)) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['npcs'].hasOwnProperty(npc) && baseChunkData['npcs'][npc].hasOwnProperty(chunk)) {
                !!baseChunkData['npcs'][npc] && delete baseChunkData['npcs'][npc][chunk];
                if (!!baseChunkData['npcs'][npc] && Object.keys(baseChunkData['npcs'][npc]).length === 0) {
                    delete baseChunkData['npcs'][npc];
                }
            } else if (tempValid && (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc])) {
                if (!baseChunkData['npcs'].hasOwnProperty(npc)) {
                    baseChunkData['npcs'][npc] = {};
                }
                baseChunkData['npcs'][npc][chunk] = true;
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Objects'] && Object.keys(chunkInfo['taskUnlocks']['Objects']).forEach(object => {
        Object.keys(chunkInfo['taskUnlocks']['Objects'][object]).forEach(chunk => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Objects'][object][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Objects'][object][chunk].length));
            if (!chunks.hasOwnProperty(chunk)) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['objects'].hasOwnProperty(object) && baseChunkData['objects'][object].hasOwnProperty(chunk)) {
                !!baseChunkData['objects'][object] && delete baseChunkData['objects'][object][chunk];
                if (!!baseChunkData['objects'][object] && Object.keys(baseChunkData['objects'][object]).length === 0) {
                    delete baseChunkData['objects'][object];
                }
            } else if (tempValid && (!backloggedSources['objects'] || !backloggedSources['objects'][object])) {
                if (!baseChunkData['objects'].hasOwnProperty(object)) {
                    baseChunkData['objects'][object] = {};
                }
                baseChunkData['objects'][object][chunk] = true;
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Shops'] && Object.keys(chunkInfo['taskUnlocks']['Shops']).forEach(shop => {
        Object.keys(chunkInfo['taskUnlocks']['Shops'][shop]).forEach(chunk => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Shops'][shop][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Shops'][shop][chunk].length));
            if (!chunks.hasOwnProperty(chunk)) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['shops'].hasOwnProperty(shop) && baseChunkData['shops'][shop].hasOwnProperty(chunk)) {
                !!baseChunkData['shops'][shop] && delete baseChunkData['shops'][shop][chunk];
                if (!!baseChunkData['shops'][shop] && Object.keys(baseChunkData['shops'][shop]).length === 0) {
                    delete baseChunkData['shops'][shop];
                }
                !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return !!baseChunkData['items'][item] }).forEach(item => {
                    delete baseChunkData['items'][item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                    if (Object.keys(baseChunkData['items'][item]).length <= 0) {
                        delete baseChunkData['items'][item];
                    }
                });
            } else if (tempValid && (!backloggedSources['shops'] || !backloggedSources['shops'][shop])) {
                if (!baseChunkData['shops'].hasOwnProperty(shop)) {
                    baseChunkData['shops'][shop] = {};
                }
                baseChunkData['shops'][shop][chunk] = true;
                !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return (!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item]) }).forEach(item => {
                    if (!baseChunkData['items'][item]) {
                        baseChunkData['items'][item] = {};
                    }
                    baseChunkData['items'][item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'shop';
                });
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Items'] && Object.keys(chunkInfo['taskUnlocks']['Items']).forEach(item => {
        let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Items'][item].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Items'][item].length));
        let monster = '';
        let asterisk = '*';
        if (item.includes('^')) {
            asterisk += '^';
            monster = item.split('^')[1];
            item = item.split('^')[0];
            monster === '' && (asterisk += '^');
        }
        if (!tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
            if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return source === monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') }).forEach(source => {
                    delete baseChunkData['items'][item][source];
                    if (Object.keys(baseChunkData['items'][item]).length === 0) {
                        delete baseChunkData['items'][item];
                    }
                });
                if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                    dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                    delete dropRatesGlobal[monster][item];
                }
                if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                    dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                    delete dropTablesGlobal[monster][item];
                }
            } else if (asterisk.includes('^') && monster === '') {
                baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = JSON.parse(JSON.stringify(baseChunkData['items'][item])));
                delete baseChunkData['items'][item];
                !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item) }).forEach(monster => {
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                        dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                        delete dropRatesGlobal[monster][item];
                    }
                });
                !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item) }).forEach(monster => {
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                        dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                        delete dropTablesGlobal[monster][item];
                    }
                });
            } else if (!asterisk.includes('^')) {
                baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = JSON.parse(JSON.stringify(baseChunkData['items'][item])));
                delete baseChunkData['items'][item];
            }
        } else if (tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item + asterisk)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
            if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                if ((chunkInfo['drops'].hasOwnProperty(monster) && ((parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))) || (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster) && ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))))) {
                    if (!baseChunkData['items'].hasOwnProperty(item)) {
                        baseChunkData['items'][item] = {};
                    }
                    baseChunkData['items'][item][monster] = 'secondary-drop';
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                        dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                        delete dropRatesGlobal[monster][item + asterisk];
                    }
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                        dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                        delete dropTablesGlobal[monster][item + asterisk];
                    }
                }
            } else if (asterisk.includes('^') && monster === '') {
                baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk])));
                delete baseChunkData['items'][item + asterisk];
                !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach(monster => {
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                        dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                        delete dropRatesGlobal[monster][item + asterisk];
                    }
                });
                !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach(monster => {
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                        dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                        delete dropTablesGlobal[monster][item + asterisk];
                    }
                });
            } else if (!asterisk.includes('^')) {
                baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk])));
                delete baseChunkData['items'][item + asterisk];
            }
        }
    });
    if (rules['RDT'] && baseChunkData['items']['GemDropTable+'] && newValids && newValids['Quest'] && newValids['Quest'].hasOwnProperty("~|Legends' Quest|~ Complete the quest")) {
        Object.keys(baseChunkData['items']['GemDropTable+']).forEach(monster => {
            monster = monster.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J');
            !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]['GemDropTable+']).forEach(quantity => {
                Object.keys(dropTables['GemDropTableLegends+']).forEach(item => {
                    if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                        if (!baseChunkData['items'][item]) {
                            baseChunkData['items'][item] = {};
                        }
                        if (chunkInfo['drops'][monster][item] === 'Always') {
                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                        } else {
                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                        }
                        if (!dropRatesGlobal[monster]) {
                            dropRatesGlobal[monster] = {};
                        }
                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                    } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output'])) {
                        if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']][item] === 'Always') {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+']).forEach(quantity => {
                                dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                            });
                        }
                    }
                });
            });
            !!chunkInfo['skillItems']['Slayer'][monster] && Object.keys(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+']).forEach(quantity => {
                Object.keys(dropTables['GemDropTableLegends+']).forEach(item => {
                    if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                        if (!baseChunkData['items'][item]) {
                            baseChunkData['items'][item] = {};
                        }
                        if (chunkInfo['skillItems']['Slayer'][monster][item] === 'Always') {
                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                        } else {
                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                        }
                        if (!dropRatesGlobal[monster]) {
                            dropRatesGlobal[monster] = {};
                        }
                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                    } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output'])) {
                        if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']][item] === 'Always') {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+']).forEach(quantity => {
                                dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                            });
                        }
                    }
                });
            });
        });
    }
    if (!!chunks && Object.keys(chunks).filter(chunk => { return chunkInfo['unnotingChunks'].includes(chunk) }).length === 0) {
        !!dropTablesGlobal && Object.keys(dropTablesGlobal).forEach(monster => {
            !!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).forEach(item => {
                !!dropTablesGlobal[monster][item] && Object.keys(dropTablesGlobal[monster][item]).forEach(quantity => {
                    if (quantity.includes('(noted)')) {
                        if (!!baseChunkData['items'] && !!baseChunkData['items'][item] && !!baseChunkData['items'][item][monster.replaceAll('%2F', '#')]) {
                            delete baseChunkData['items'][item][monster.replaceAll('%2F', '#')];
                            if (!baseChunkData['items'][item] || Object.keys(baseChunkData['items'][item]).length === 0) {
                                delete baseChunkData['items'][item];
                            }
                        }
                    }
                });
            });
        });
    }

    do {
        i++;
        postMessage(((i + 1) * 7) + '%');
        valids = newValids;
        [newValids, tempItemSkill, tempMultiStepSkill] = calcChallengesWork(chunks, baseChunkData);
        !!manualTasks && Object.keys(manualTasks).forEach(skill => {
            skill !== 'BiS' && Object.keys(manualTasks[skill]).forEach(challenge => {
                if (!!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][challenge]) {
                    if (!valids[skill]) {
                        valids[skill] = {};
                    }
                    valids[skill][challenge] = manualTasks[skill][challenge];
                    if (!newValids[skill]) {
                        newValids[skill] = {};
                    }
                    newValids[skill][challenge] = manualTasks[skill][challenge];
                    chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && (chunkInfo['challenges'][skill][challenge]['ManualValid'] = true);
                }
            });
        });
        let fullyValid;
        let leftoversCount = 0;
        let savedValids = {};
        let passedByTasks = {};
        while (leftoversCount < 10 && !_.isEqual(newValids, savedValids)) {
            savedValids = JSON.parse(JSON.stringify(newValids));
            Object.keys(savedValids).filter((skill) => { return skill !== 'BiS' }).forEach(skill => {
                Object.keys(savedValids[skill]).sort(function(a, b) { return skill === 'Diary' ? ((diaryTierOrder.indexOf(a.split('|')[1].split('%2F')[1]) - diaryTierOrder.indexOf(b.split('|')[1].split('%2F')[1]) === 0) ? a.replaceAll('Task ', '').localeCompare(b.replaceAll('Task ', ''), 'en', { numeric: true }) : (diaryTierOrder.indexOf(a.split('|')[1].split('%2F')[1]) - diaryTierOrder.indexOf(b.split('|')[1].split('%2F')[1]))) : a.replaceAll('Task ', '').localeCompare(b.replaceAll('Task ', ''), 'en', { numeric: true }) }).forEach(challenge => {
                    if (!passedByTasks[skill]) {
                        passedByTasks[skill] = {};
                    }
                    passedByTasks[skill][challenge] = true;
                    let bestBoost = 0;
                    let hasCrystalSaw = false;
                    if (!!challenge && rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && (!chunkInfo['challenges'][skill].hasOwnProperty(challenge) ? !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost') : !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost')) && (!completedChallenges[skill] || !completedChallenges[skill].hasOwnProperty(challenge))) {
                        Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach(boost => {
                            if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                                if (boost !== 'Crystal saw') {
                                    if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string') {
                                        let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                                        let possibleBoost = Math.floor(newValids[skill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                        possibleBoost = Math.floor((newValids[skill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                        if (possibleBoost > bestBoost) {
                                            bestBoost = possibleBoost;
                                        }
                                    } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                                        bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                                    }
                                } else if (skill === 'Construction') {
                                    if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][skill][challenge]['Items'].includes('Saw+')) {
                                        hasCrystalSaw = true;
                                        chunkInfo['challenges'][skill][challenge]['ItemsDetails'].push('Crystal saw');
                                    }
                                }
                            }
                        });
                    }
                    if ((!checkPrimaryMethod(skill, newValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1 || (chunkInfo['challenges'][skill][challenge]['Level'] - (bestBoost + (hasCrystalSaw ? 3 : 0))) > passiveSkill[skill]) && (!skillQuestXp || !skillQuestXp.hasOwnProperty(skill) || (chunkInfo['challenges'][skill][challenge]['Level'] - (bestBoost + (hasCrystalSaw ? 3 : 0))) > skillQuestXp[skill]['level'])) && !!chunkInfo['challenges'][skill][challenge] && chunkInfo['challenges'][skill][challenge]['Level'] > 1) {
                        if (!nonValids.hasOwnProperty(challenge)) {
                            nonValids[challenge] = [];
                        }
                        nonValids[challenge] = [...nonValids[challenge], 'Passive'];
                        !!newValids[skill] && delete newValids[skill][challenge];
                        !!valids[skill] && delete valids[skill][challenge];
                    }
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return;
                    }
                    if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Skills')) {
                        Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).filter((subSkill) => { return (!checkPrimaryMethod(subSkill, newValids, baseChunkData) || (subSkill === 'Slayer' && !!slayerLocked && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level']) || ((!!passiveSkill && passiveSkill.hasOwnProperty(subSkill) && passiveSkill[subSkill] > 1 && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] <= passiveSkill[subSkill]) || (!!skillQuestXp && skillQuestXp.hasOwnProperty(subSkill) && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > skillQuestXp[subSkill]['level']))) && !chunkInfo['challenges'][skill][challenge]['ManualValid'] }).forEach(subSkill => {
                            let bestBoost = 0;
                            let hasCrystalSaw = false;
                            if (!!challenge && rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(subSkill) && (!chunkInfo['challenges'][subSkill].hasOwnProperty(challenge) ? !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost') : !chunkInfo['challenges'][subSkill][challenge].hasOwnProperty('NoBoost')) && (!completedChallenges[subSkill] || !completedChallenges[subSkill].hasOwnProperty(challenge))) {
                                Object.keys(chunkInfo['codeItems']['boostItems'][subSkill]).forEach(boost => {
                                    if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                                        if (boost !== 'Crystal saw') {
                                            if (typeof chunkInfo['codeItems']['boostItems'][subSkill][boost] === 'string') {
                                                let stringSplit = chunkInfo['codeItems']['boostItems'][subSkill][boost].split('%+');
                                                let possibleBoost = Math.floor(newValids[subSkill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                                possibleBoost = Math.floor((newValids[subSkill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                                if (possibleBoost > bestBoost) {
                                                    bestBoost = possibleBoost;
                                                }
                                            } else if (chunkInfo['codeItems']['boostItems'][subSkill][boost] > bestBoost) {
                                                bestBoost = chunkInfo['codeItems']['boostItems'][subSkill][boost];
                                            }
                                        } else if (subSkill === 'Construction' && chunkInfo['challenges'][subSkill].hasOwnProperty(challenge)) {
                                            if (chunkInfo['challenges'][subSkill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][subSkill][challenge]['Items'].includes('Saw+')) {
                                                hasCrystalSaw = true;
                                                chunkInfo['challenges'][subSkill][challenge]['ItemsDetails'].push('Crystal saw');
                                            }
                                        }
                                    }
                                });
                            }
                            if (!checkPrimaryMethod(subSkill, valids, baseChunkData) && ((subSkill !== 'Slayer' || !slayerLocked || (chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] - (bestBoost + (hasCrystalSaw ? 3 : 0))) > slayerLocked['level'])) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] <= 1 || chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > passiveSkill[subSkill])) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], subSkill];
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                            }
                        });
                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                            return;
                        }
                    }
                    if ((skill !== 'Extra' || chunkInfo['challenges'][skill][challenge].hasOwnProperty('Requirements')) && savedValids.hasOwnProperty(skill) && savedValids[skill].hasOwnProperty(challenge)) {
                        fullyValid = true;
                        !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                            if (subTask.includes('+')) {
                                if (subTask.includes('+x')) {
                                    let xNum = parseInt(subTask.split('+x')[1]);
                                    let xResults = 0;
                                    let xSubTask = subTask.split('+x')[0] + '+';
                                    if (!tasksPlus[xSubTask] && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                        if (!nonValids.hasOwnProperty(challenge)) {
                                            nonValids[challenge] = [];
                                        }
                                        nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                        fullyValid = false;
                                        !!newValids[skill] && delete newValids[skill][challenge];
                                        !!valids[skill] && delete valids[skill][challenge];
                                        !!savedValids[skill] && delete savedValids[skill][challenge];
                                        if ((!savedValids.hasOwnProperty(skill) || !savedValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                            return;
                                        }
                                    } else {
                                        let tempValid = false;
                                        tasksPlus[xSubTask].forEach(plus => {
                                            if (!(!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], savedValids, baseChunkData) || (!!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]))) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0])))) {
                                                tempValid = true;
                                                xResults++;
                                            } else if (skill === 'Diary' && chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                                tempValid = true;
                                                xResults++;
                                            }
                                        });
                                        if ((!tempValid || xResults < xNum) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                            if (!nonValids.hasOwnProperty(challenge)) {
                                                nonValids[challenge] = [];
                                            }
                                            nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                            fullyValid = false;
                                            !!newValids[skill] && delete newValids[skill][challenge];
                                            !!valids[skill] && delete valids[skill][challenge];
                                            !!savedValids[skill] && delete savedValids[skill][challenge];
                                            if ((!savedValids.hasOwnProperty(skill) || !savedValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                                return;
                                            }
                                        }
                                    }
                                } else {
                                    if (!tasksPlus[subTask]) {
                                        if (!nonValids.hasOwnProperty(challenge) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                            nonValids[challenge] = [];
                                        }
                                        nonValids[challenge] = [...nonValids[challenge], subTask];
                                        fullyValid = false;
                                        !!newValids[skill] && delete newValids[skill][challenge];
                                        !!valids[skill] && delete valids[skill][challenge];
                                        !!savedValids[skill] && delete savedValids[skill][challenge];
                                        if ((!savedValids.hasOwnProperty(skill) || !savedValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                            return;
                                        }
                                    } else {
                                        let tempValid = false;
                                        tasksPlus[subTask].forEach(plus => {
                                            if (!((!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], savedValids, baseChunkData) && !!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] !== 1) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]]) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0])) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0])))) {
                                                tempValid = true;
                                            } else if (skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                                tempValid = true;
                                            }
                                        });
                                        if (!tempValid && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                            if (!nonValids.hasOwnProperty(challenge)) {
                                                nonValids[challenge] = [];
                                            }
                                            nonValids[challenge] = [...nonValids[challenge], subTask];
                                            fullyValid = false;
                                            !!newValids[skill] && delete newValids[skill][challenge];
                                            !!valids[skill] && delete valids[skill][challenge];
                                            !!savedValids[skill] && delete savedValids[skill][challenge];
                                            if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                                return;
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (!savedValids.hasOwnProperty(skill) || !savedValids[skill].hasOwnProperty(challenge) || (!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], savedValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] <= 1 || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['Level'])) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) || (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) {
                                    if (!(skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !chunkInfo['challenges'][skill][challenge]['ManualShow'] && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                        if (!nonValids.hasOwnProperty(challenge)) {
                                            nonValids[challenge] = [];
                                        }
                                        nonValids[challenge] = [...nonValids[challenge], subTask];
                                        fullyValid = false;
                                        !!newValids[skill] && delete newValids[skill][challenge];
                                        !!valids[skill] && delete valids[skill][challenge];
                                        !!savedValids[skill] && delete savedValids[skill][challenge];
                                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                            return;
                                        }
                                    }
                                }
                            }
                        });
                        if (!!chunkInfo['challenges'][skill][challenge]['BackupParent']) {
                            if (((!!valids[skill] && (valids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']) || newValids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']))) || (backlog[skill] && backlog[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']))) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], chunkInfo['challenges'][skill][challenge]['BackupParent']];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    return;
                                }
                            }
                        }
                        !!chunkInfo['challenges'][skill][challenge]['Requirements'] && chunkInfo['challenges'][skill][challenge]['Requirements'].filter((req) => { return !checkPrimaryMethod(req, newValids, baseChunkData) && !chunkInfo['challenges'][skill][challenge]['ManualValid'] }).forEach(req => {
                            if (!nonValids.hasOwnProperty(challenge)) {
                                nonValids[challenge] = [];
                            }
                            nonValids[challenge] = [...nonValids[challenge], req];
                            fullyValid = false;
                            !!newValids[skill] && delete newValids[skill][challenge];
                            !!valids[skill] && delete valids[skill][challenge];
                            if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                return;
                            }
                        });
                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                            return;
                        }
                        if (fullyValid) {
                            !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                                if (subTask.includes('+')) {
                                    if (subTask.includes('+x')) {
                                        let xSubTask = subTask.split('+x')[0] + '+';
                                        if (!tasksPlus[xSubTask]) {
                                            if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['ManualShow']) {
                                                newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(xSubTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]] = false);
                                            }
                                        } else {
                                            tasksPlus[xSubTask].filter((plus) => { return !!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['ManualShow'] }).forEach(plus => {
                                                newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] = false);
                                            });
                                        }
                                    } else {
                                        if (!tasksPlus[subTask]) {
                                            if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['ManualShow']) {
                                                newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false);
                                            }
                                        } else {
                                            tasksPlus[subTask].filter((plus) => { return !!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['ManualShow'] }).forEach(plus => {
                                                newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] = false);
                                            });
                                        }
                                    }
                                } else {
                                    if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['ManualShow']) {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false);
                                    }
                                }
                            });
                        }
                    }
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return;
                    }
                });
                let extraSets = {};
                skill === 'Extra' && Object.keys(newValids[skill]).filter((challenge) => { return chunkInfo['challenges'][skill][challenge].hasOwnProperty('Set') }).forEach(challenge => {
                    if (!extraSets.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Set'])) {
                        extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                    } else if ((chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][extraSets[chunkInfo['challenges'][skill][challenge]['Set']]]['Priority']) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                        if (!nonValids.hasOwnProperty(extraSets[newValids[skill][challenge]['Set']])) {
                            nonValids[extraSets[newValids[skill][challenge]['Set']]] = [];
                        }
                        nonValids[extraSets[newValids[skill][challenge]['Set']]] = [...nonValids[extraSets[newValids[skill][challenge]['Set']]], 'extraSets'];
                        !!newValids[skill] && delete newValids[skill][extraSets[newValids[skill][challenge]['Set']]];
                        !!valids[skill] && delete valids[skill][extraSets[newValids[skill][challenge]['Set']]];
                        extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                    } else if (!chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                        if (!nonValids.hasOwnProperty(challenge)) {
                            nonValids[challenge] = [];
                        }
                        nonValids[challenge] = [...nonValids[challenge], 'extraSets'];
                        !!newValids[skill] && delete newValids[skill][challenge];
                        !!valids[skill] && delete valids[skill][challenge];
                    }
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return;
                    }
                });
            });
            leftoversCount++;
        }
        Object.keys(newValids).filter((skill) => { return skill !== 'BiS' }).forEach(skill => {
            if (!checkPrimaryMethod(skill, newValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1)) {
                tempValidsSkill = {};
                !!newValids[skill] && Object.keys(newValids[skill]).filter(task => { return newValids[skill][task] === 1 }).forEach(task => {
                    tempValidsSkill[task] = newValids[skill][task];
                });
                newValids[skill] = tempValidsSkill;
            }
            checkPrimaryMethod(skill, newValids, baseChunkData) && Object.keys(newValids[skill]).sort(function(a, b) { return a.localeCompare(b, 'en', { numeric: true }) }).forEach(challenge => {
                fullyValid = true;
                if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoXp') && !rules["Highest Level"] && !!baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']] && Object.keys(baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']]).length > 1) {
                    delete newValids[skill][challenge];
                    if (!newValids[skill]) {
                        delete newValids[skill];
                    }
                    delete baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']][challenge];
                    if (!baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']]) {
                        delete baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']];
                        if (!baseChunkData['items']) {
                            delete baseChunkData['items'];
                        }
                    }
                    return;
                }
                !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                    if (subTask.includes('+')) {
                        if (subTask.includes('+x')) {
                            let xNum = parseInt(subTask.split('+x')[1]);
                            let xResults = 0;
                            let xSubTask = subTask.split('+x')[0] + '+';
                            if (!tasksPlus[xSubTask] && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    return;
                                }
                            } else {
                                let tempValid = false;
                                tasksPlus[xSubTask].forEach(plus => {
                                    if (!(!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], newValids, baseChunkData) || (!!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && !newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]))) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0])))) {
                                        tempValid = true;
                                        xResults++;
                                    } else if (skill === 'Diary' && chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                        tempValid = true;
                                        xResults++;
                                    }
                                });
                                if ((!tempValid || xResults < xNum) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                    if (!nonValids.hasOwnProperty(challenge)) {
                                        nonValids[challenge] = [];
                                    }
                                    nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                    fullyValid = false;
                                    !!newValids[skill] && delete newValids[skill][challenge];
                                    !!valids[skill] && delete valids[skill][challenge];
                                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                        return;
                                    }
                                }
                            }
                        } else {
                            if (!tasksPlus[subTask]) {
                                if (!nonValids.hasOwnProperty(challenge) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], subTask];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    return;
                                }
                            } else {
                                let tempValid = false;
                                tasksPlus[subTask].forEach(plus => {
                                    if (!((!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], newValids, baseChunkData) && !!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] !== 1) || (!!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && !newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]))) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0])))) {
                                        tempValid = true;
                                    } else if (skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                        tempValid = true;
                                    }
                                });
                                if (!tempValid && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                    if (!nonValids.hasOwnProperty(challenge)) {
                                        nonValids[challenge] = [];
                                    }
                                    nonValids[challenge] = [...nonValids[challenge], subTask];
                                    fullyValid = false;
                                    !!newValids[skill] && delete newValids[skill][challenge];
                                    !!valids[skill] && delete valids[skill][challenge];
                                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                        return;
                                    }
                                }
                            }
                        }
                    } else {
                        if (!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge) || (!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], newValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] <= 1 || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['Level'])) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || !newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) || (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) {
                            if (!(skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !chunkInfo['challenges'][skill][challenge]['ManualShow'] && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], subTask];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    return;
                                }
                            }
                        }
                    }
                });
                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                    return;
                }
                if (!!chunkInfo['challenges'][skill][challenge]['BackupParent']) {
                    if (((!!valids[skill] && (valids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']) || newValids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']))) || (backlog[skill] && backlog[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']))) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                        if (!nonValids.hasOwnProperty(challenge)) {
                            nonValids[challenge] = [];
                        }
                        nonValids[challenge] = [...nonValids[challenge], chunkInfo['challenges'][skill][challenge]['BackupParent']];
                        fullyValid = false;
                        !!newValids[skill] && delete newValids[skill][challenge];
                        !!valids[skill] && delete valids[skill][challenge];
                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                            return;
                        }
                    }
                }
                !!chunkInfo['challenges'][skill][challenge]['Requirements'] && chunkInfo['challenges'][skill][challenge]['Requirements'].filter((req) => { return !checkPrimaryMethod(req, newValids, baseChunkData) && !chunkInfo['challenges'][skill][challenge]['ManualValid'] }).forEach(req => {
                    if (!nonValids.hasOwnProperty(challenge)) {
                        nonValids[challenge] = [];
                    }
                    nonValids[challenge] = [...nonValids[challenge], req];
                    fullyValid = false;
                    !!newValids[skill] && delete newValids[skill][challenge];
                    !!valids[skill] && delete valids[skill][challenge];
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return;
                    }
                });
                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                    return;
                }
                if (fullyValid) {
                    !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                        if (subTask.includes('+')) {
                            if (subTask.includes('+x')) {
                                let xSubTask = subTask.split('+x')[0] + '+';
                                if (!tasksPlus[xSubTask]) {
                                    if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['ManualShow']) {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(xSubTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]] = false);
                                    }
                                } else {
                                    tasksPlus[xSubTask].filter((plus) => { return !!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['ManualShow'] }).forEach(plus => {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] = false);
                                    });
                                }
                            } else {
                                if (!tasksPlus[subTask]) {
                                    if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['ManualShow']) {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false);
                                    }
                                } else {
                                    tasksPlus[subTask].filter((plus) => { return !!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['ManualShow'] }).forEach(plus => {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] = false);
                                    });
                                }
                            }
                        } else {
                            if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['ManualShow']) {
                                newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false);
                            }
                        }
                    });
                }
            });
            let extraSets = {};
            skill === 'Extra' && Object.keys(newValids[skill]).filter((challenge) => { return chunkInfo['challenges'][skill][challenge].hasOwnProperty('Set') }).forEach(challenge => {
                if (!extraSets.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Set'])) {
                    extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                } else if ((chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][extraSets[chunkInfo['challenges'][skill][challenge]['Set']]]['Priority']) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                    if (!nonValids.hasOwnProperty(challenge)) {
                        nonValids[challenge] = [];
                    }
                    nonValids[challenge] = [...nonValids[challenge], 'extraSets'];
                    !!newValids[skill] && delete newValids[skill][extraSets[newValids[skill][challenge]['Set']]];
                    !!valids[skill] && delete valids[skill][extraSets[newValids[skill][challenge]['Set']]];
                    extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                } else if (!chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                    if (!nonValids.hasOwnProperty(challenge)) {
                        nonValids[challenge] = [];
                    }
                    nonValids[challenge] = [...nonValids[challenge], 'extraSets'];
                    !!newValids[skill] && delete newValids[skill][challenge];
                    !!valids[skill] && delete valids[skill][challenge];
                }
                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                    return;
                }
            });
        });
        !rules["Highest Level"] && Object.keys(tempItemSkill).forEach(skill => {
            Object.keys(tempItemSkill[skill]).filter((item) => { return !!baseChunkData['items'][item] }).forEach(item => {
                let lowestItem;
                let lowestName;
                let taskIsRemoved;
                tempItemSkill[skill][item].filter((name) => { return !!chunkInfo['challenges'][skill][name] && !chunkInfo['challenges'][skill][name].hasOwnProperty('NoXp') }).forEach(name => {
                    taskIsRemoved = false;
                    let challenge = chunkInfo['challenges'][skill][name];
                    if (challenge.hasOwnProperty('Tasks')) {
                        chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).forEach(subTask => {
                            if (!newValids.hasOwnProperty(chunkInfo['challenges'][skill][name]['Tasks'][subTask]) || !newValids[chunkInfo['challenges'][skill][name]['Tasks'][subTask]].hasOwnProperty(subTask)) {
                                !!newValids[skill] && delete newValids[skill][name];
                                !!valids[skill] && delete valids[skill][name];
                                taskIsRemoved = true;
                            }
                        });
                    }
                    if (!taskIsRemoved && newValids.hasOwnProperty(skill) && checkPrimaryMethod(skill, newValids, baseChunkData) && (!backlog[skill] || !backlog[skill].hasOwnProperty(name))) {
                        if (!lowestItem || lowestItem['Level'] > challenge['Level']) {
                            lowestItem = challenge;
                            lowestName = name;
                        } else if (lowestItem['Level'] === challenge['Level'] && ((!!challenge['Priority'] && (challenge['Priority'] < lowestItem['Priority'])) || !lowestItem['Priority'])) {
                            lowestItem = challenge;
                            lowestName = name;
                        }
                    }
                });
                if (!!lowestName) {
                    !newValids[skill] && (newValids[skill] = {});
                    newValids[skill][lowestName] = chunkInfo['challenges'][skill][lowestName]['Level'];
                }
            });
        });
        !rules["Highest Level"] && Object.keys(tempItemSkill).forEach(skill => {
            let lowestName;
            let lowestLevel;
            !!newValids[skill] && Object.keys(newValids[skill]).forEach(challenge => {
                if ((!lowestLevel || (lowestLevel < newValids[skill][challenge])) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                    lowestName = challenge;
                    lowestLevel = newValids[skill][challenge];
                }
            });
            if (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && passiveSkill[skill] > 1 && passiveSkill[skill] > lowestLevel) {
                lowestLevel = passiveSkill[skill];
            } else if (!!skillQuestXp && skillQuestXp.hasOwnProperty(skill) && skillQuestXp[skill]['level'] > lowestLevel) {
                lowestLevel = skillQuestXp[skill]['level'];
            }
            !!lowestName && !!chunkInfo['challenges'][skill][lowestName] && !chunkInfo['challenges'][skill][lowestName].hasOwnProperty('Set') && (chunkInfo['challenges'][skill][lowestName]['Priority'] = -1 * i);
            !!lowestName && Object.keys(tempItemSkill[skill]).forEach(item => {
                !!baseChunkData['items'][item] && tempItemSkill[skill][item].filter((name) => { return chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(name) && (chunkInfo['challenges'][skill][name]['Level'] <= lowestLevel)}).forEach(name => {
                    let stillValid = true;
                    chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).forEach(subTask => {
                        if (!newValids.hasOwnProperty(chunkInfo['challenges'][skill][name]['Tasks'][subTask]) || !newValids[chunkInfo['challenges'][skill][name]['Tasks'][subTask]].hasOwnProperty(subTask)) {
                            stillValid = false;
                        }
                    });
                    if (stillValid) {
                        !newValids[skill] && (newValids[skill] = {});
                        newValids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                    }
                });
            });
        });
        !rules["Highest Level"] && Object.keys(tempMultiStepSkill).forEach(skill => {
            let lowestLevel;
            !!newValids[skill] && Object.keys(newValids[skill]).forEach(challenge => {
                if ((!lowestLevel || (lowestLevel < newValids[skill][challenge])) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                    lowestLevel = newValids[skill][challenge];
                }
            });
            if (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && passiveSkill[skill] > 1 && passiveSkill[skill] > lowestLevel) {
                lowestLevel = passiveSkill[skill];
            } else if (!!skillQuestXp && skillQuestXp.hasOwnProperty(skill) && skillQuestXp[skill]['level'] > lowestLevel) {
                lowestLevel = skillQuestXp[skill]['level'];
            }
            !!lowestLevel && Object.keys(tempMultiStepSkill[skill]).filter((name) => { return chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(name) && (chunkInfo['challenges'][skill][name]['Level'] <= lowestLevel)}).forEach(name => {
                let stillValid = true;
                chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).forEach(subTask => {
                    if (!newValids.hasOwnProperty(chunkInfo['challenges'][skill][name]['Tasks'][subTask]) || !newValids[chunkInfo['challenges'][skill][name]['Tasks'][subTask]].hasOwnProperty(subTask)) {
                        stillValid = false;
                    }
                });
                if (stillValid) {
                    !newValids[skill] && (newValids[skill] = {});
                    newValids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                    chunkInfo['challenges'][skill][name]['Priority'] = 999;
                }
            });
        });
        let areasAdded = {};
        let tempChunkArray = [];
        newValids.hasOwnProperty('Nonskill') && Object.keys(newValids['Nonskill']).filter((task) => { return !!chunkInfo['challenges']['Nonskill'][task] && chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('UnlocksArea') && (!manualAreas.hasOwnProperty(task) || manualAreas[task]) }).forEach(task => {
            if (chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('SkillsNeeded')) {
                let tempValidNeeded = true;
                Object.keys(chunkInfo['challenges']['Nonskill'][task]['SkillsNeeded']).forEach(taskSkill => {
                    if (!checkPrimaryMethod(taskSkill, newValids, baseChunkData) && !(!!passiveSkill && passiveSkill.hasOwnProperty(taskSkill) && passiveSkill[taskSkill] > 1 && chunkInfo['challenges']['Nonskill'][task]['SkillsNeeded'][taskSkill] <= passiveSkill[taskSkill])) {
                        tempValidNeeded = false;
                    }
                });
                if (tempValidNeeded) {
                    tempChunkArray.push(task);
                }
            } else {
                tempChunkArray.push(task);
            }
        });
        let indexCount = 0;
        let startingSize = tempChunkArray.length;
        let deadChunkArray = [];
        while (indexCount < tempChunkArray.length && indexCount < (startingSize * 2)) {
            if (!chunks.hasOwnProperty(tempChunkArray[indexCount]) && possibleAreas.hasOwnProperty(tempChunkArray[indexCount])) {
                if (Object.keys(areasStructure[tempChunkArray[indexCount]]).filter(subArea => { return chunks.hasOwnProperty(subArea) }).length > 0) {
                    chunks[tempChunkArray[indexCount]] = true;
                    areasAdded[tempChunkArray[indexCount]] = true;
                } else if (Object.keys(areasStructure[tempChunkArray[indexCount]]).filter(subArea => { return tempChunkArray.includes(subArea) && possibleAreas.hasOwnProperty(subArea) }).length > 0 && !deadChunkArray.includes(tempChunkArray[indexCount])) {
                    tempChunkArray.push(tempChunkArray[indexCount]);
                    deadChunkArray.push(tempChunkArray[indexCount]);
                }
            }
            indexCount++;
        }
        if (Object.keys(areasAdded).length > 0) {
            baseChunkData = combineJSONs(baseChunkData, gatherChunksInfo(areasAdded));
        }
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Spawns'] && Object.keys(chunkInfo['taskUnlocks']['Spawns']).forEach(item => {
            Object.keys(chunkInfo['taskUnlocks']['Spawns'][item]).forEach(chunk => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Spawns'][item][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Spawns'][item][chunk].length));
                if (!chunks.hasOwnProperty(chunk)) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['items'].hasOwnProperty(item) && baseChunkData['items'][item].hasOwnProperty(chunk)) {
                    !!baseChunkData['items'][item] && delete baseChunkData['items'][item][chunk];
                    if (!!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).length <= 0) {
                        delete baseChunkData['items'][item];
                    }
                } else if (tempValid && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                    if (!baseChunkData['items'][item]) {
                        baseChunkData['items'][item] = {};
                    }
                    baseChunkData['items'][item][chunk] = rules['Primary Spawns'] ? 'primary-spawn' : 'secondary-spawn';
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Monsters'] && Object.keys(chunkInfo['taskUnlocks']['Monsters']).forEach(monster => {
            Object.keys(chunkInfo['taskUnlocks']['Monsters'][monster]).forEach(chunk => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Monsters'][monster][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Monsters'][monster][chunk].length));
                if (!chunks.hasOwnProperty(chunk)) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['monsters'].hasOwnProperty(monster) && baseChunkData['monsters'][monster].hasOwnProperty(chunk)) {
                    !!baseChunkData['monsters'][monster] && delete baseChunkData['monsters'][monster][chunk];
                    if (!!baseChunkData['monsters'][monster] && Object.keys(baseChunkData['monsters'][monster]).length === 0) {
                        delete baseChunkData['monsters'][monster];
                        let dropsObj = chunkInfo['drops'][monster];
                        if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                            dropsObj = chunkInfo['skillItems']['Slayer'][monster];
                        }
                        !!dropsObj && Object.keys(dropsObj).forEach(drop => {
                            if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                                Object.keys(dropTables[drop]).forEach(item => {
                                    !!baseChunkData['items'][item] && delete baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                                    if (!!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).length <= 0) {
                                        delete baseChunkData['items'][item];
                                    }
                                    !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][item];
                                    if (!!dropRatesGlobal[monster] && Object.keys(dropRatesGlobal[monster]).length <= 0) {
                                        delete dropRatesGlobal[monster];
                                    }
                                    !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][item];
                                    if (!!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).length <= 0) {
                                        delete dropTablesGlobal[monster];
                                    }
                                });
                            } else {
                                if (!!baseChunkData['items'][drop]) {
                                    if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                                        let re = new RegExp(`/Slay .*\~|${monster}|\~/`,"gm");
                                        let slayerTaskName = (!!baseChunkData['items'][drop] && Object.keys(baseChunkData['items'][drop]).find(value => re.test(value))) || (!!newValids['Slayer'] && Object.keys(newValids['Slayer']).find(value => re.test(value))) || "";
                                        delete baseChunkData['items'][drop][slayerTaskName];
                                        if (newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(slayerTaskName)) {
                                            delete newValids['Slayer'][slayerTaskName];
                                        }
                                    } else {
                                        delete baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                                    }
                                }
                                if (!!baseChunkData['items'][drop] && Object.keys(baseChunkData['items'][drop]).length <= 0) {
                                    delete baseChunkData['items'][drop];
                                }
                                !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][drop];
                                if (!!dropRatesGlobal[monster] && Object.keys(dropRatesGlobal[monster]).length <= 0) {
                                    delete dropRatesGlobal[monster];
                                }
                                !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][drop];
                                if (!!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).length <= 0) {
                                    delete dropTablesGlobal[monster];
                                }
                            }
                        });
                    }
                } else if (tempValid && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster])) {
                    if (!baseChunkData['monsters'].hasOwnProperty(monster)) {
                        baseChunkData['monsters'][monster] = {};
                    }
                    baseChunkData['monsters'][monster][chunk] = true;
                    !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]).forEach(drop => {
                        !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach(quantity => {
                            if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                                Object.keys(dropTables[drop]).forEach(item => {
                                    if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                        if (!baseChunkData['items'][item]) {
                                            baseChunkData['items'][item] = {};
                                        }
                                        if (chunkInfo['drops'][monster][item] === 'Always') {
                                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                        } else {
                                            baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                        }
                                        if (!dropRatesGlobal[monster]) {
                                            dropRatesGlobal[monster] = {};
                                        }
                                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                        if (!dropTablesGlobal[monster]) {
                                            dropTablesGlobal[monster] = {};
                                        }
                                        if (!dropTablesGlobal[monster][item]) {
                                            dropTablesGlobal[monster][item] = {};
                                        }
                                        dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : dropTables[drop][item].split('@')[1] * quantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    }
                                });
                            } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                                if (!baseChunkData['items'][drop]) {
                                    baseChunkData['items'][drop] = {};
                                }
                                if (chunkInfo['drops'][monster][drop] === 'Always') {
                                    baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][drop]) {
                                    dropTablesGlobal[monster][drop] = {};
                                }
                                dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            }
                        });
                    });
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['NPCs'] && Object.keys(chunkInfo['taskUnlocks']['NPCs']).forEach(npc => {
            Object.keys(chunkInfo['taskUnlocks']['NPCs'][npc]).forEach(chunk => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['NPCs'][npc][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['NPCs'][npc][chunk].length));
                if (!chunks.hasOwnProperty(chunk)) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['npcs'].hasOwnProperty(npc) && baseChunkData['npcs'][npc].hasOwnProperty(chunk)) {
                    !!baseChunkData['npcs'][npc] && delete baseChunkData['npcs'][npc][chunk];
                    if (!!baseChunkData['npcs'][npc] && Object.keys(baseChunkData['npcs'][npc]).length === 0) {
                        delete baseChunkData['npcs'][npc];
                    }
                } else if (tempValid && (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc])) {
                    if (!baseChunkData['npcs'].hasOwnProperty(npc)) {
                        baseChunkData['npcs'][npc] = {};
                    }
                    baseChunkData['npcs'][npc][chunk] = true;
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Objects'] && Object.keys(chunkInfo['taskUnlocks']['Objects']).forEach(object => {
            Object.keys(chunkInfo['taskUnlocks']['Objects'][object]).forEach(chunk => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Objects'][object][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Objects'][object][chunk].length));
                if (!chunks.hasOwnProperty(chunk)) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['objects'].hasOwnProperty(object) && baseChunkData['objects'][object].hasOwnProperty(chunk)) {
                    !!baseChunkData['objects'][object] && delete baseChunkData['objects'][object][chunk];
                    if (!!baseChunkData['objects'][object] && Object.keys(baseChunkData['objects'][object]).length === 0) {
                        delete baseChunkData['objects'][object];
                    }
                } else if (tempValid && (!backloggedSources['objects'] || !backloggedSources['objects'][object])) {
                    if (!baseChunkData['objects'].hasOwnProperty(object)) {
                        baseChunkData['objects'][object] = {};
                    }
                    baseChunkData['objects'][object][chunk] = true;
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Shops'] && Object.keys(chunkInfo['taskUnlocks']['Shops']).forEach(shop => {
            Object.keys(chunkInfo['taskUnlocks']['Shops'][shop]).forEach(chunk => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Shops'][shop][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Shops'][shop][chunk].length));
                if (!chunks.hasOwnProperty(chunk)) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['shops'].hasOwnProperty(shop) && baseChunkData['shops'][shop].hasOwnProperty(chunk)) {
                    !!baseChunkData['shops'][shop] && delete baseChunkData['shops'][shop][chunk];
                    if (!!baseChunkData['shops'][shop] && Object.keys(baseChunkData['shops'][shop]).length === 0) {
                        delete baseChunkData['shops'][shop];
                    }
                    !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return !!baseChunkData['items'][item] }).forEach(item => {
                        delete baseChunkData['items'][item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                        if (Object.keys(baseChunkData['items'][item]).length <= 0) {
                            delete baseChunkData['items'][item];
                        }
                    });
                } else if (tempValid && (!backloggedSources['shops'] || !backloggedSources['shops'][shop])) {
                    if (!baseChunkData['shops'].hasOwnProperty(shop)) {
                        baseChunkData['shops'][shop] = {};
                    }
                    baseChunkData['shops'][shop][chunk] = true;
                    !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return (!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item]) }).forEach(item => {
                        if (!baseChunkData['items'][item]) {
                            baseChunkData['items'][item] = {};
                        }
                        baseChunkData['items'][item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'shop';
                    });
                }
            });
        });
        let slayerTaskLockedItems = {};
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Items'] && Object.keys(chunkInfo['taskUnlocks']['Items']).forEach(item => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Items'][item].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) }).length === chunkInfo['taskUnlocks']['Items'][item].length));
            let monster = '';
            let asterisk = '*';
            if (item.includes('^')) {
                asterisk += '^';
                monster = item.split('^')[1];
                item = item.split('^')[0];
                monster === '' && (asterisk += '^');
            }
            if (!tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
                if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                    if (!slayerTaskLockedItems[item]) {
                        slayerTaskLockedItems[item] = {};
                    }
                    slayerTaskLockedItems[item][monster.toLowerCase()] = true;
                    !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return (source === monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')) || (source.toLowerCase().includes(monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').toLowerCase()) && source.includes('Slay')) }).forEach(source => {
                        delete baseChunkData['items'][item][source];
                        if (Object.keys(baseChunkData['items'][item]).length === 0) {
                            delete baseChunkData['items'][item];
                        }
                    });
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                        dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                        delete dropRatesGlobal[monster][item];
                    }
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                        dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                        delete dropTablesGlobal[monster][item];
                    }
                } else if (asterisk.includes('^') && monster === '') {
                    baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = JSON.parse(JSON.stringify(baseChunkData['items'][item])));
                    delete baseChunkData['items'][item];
                    !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item) }).forEach(monster => {
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                            dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                            delete dropRatesGlobal[monster][item];
                        }
                    });
                    !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item) }).forEach(monster => {
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                            dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                            delete dropTablesGlobal[monster][item];
                        }
                    });
                } else if (!asterisk.includes('^')) {
                    baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = JSON.parse(JSON.stringify(baseChunkData['items'][item])));
                    delete baseChunkData['items'][item];
                }
            } else if (tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item + asterisk)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
                if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                    if ((chunkInfo['drops'].hasOwnProperty(monster) && ((parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))) || (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster) && ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))))) {
                        if (!baseChunkData['items'].hasOwnProperty(item)) {
                            baseChunkData['items'][item] = {};
                        }
                        baseChunkData['items'][item][monster] = 'secondary-drop';
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                            dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                            delete dropRatesGlobal[monster][item + asterisk];
                        }
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                            dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                            delete dropTablesGlobal[monster][item + asterisk];
                        }
                    }
                } else if (asterisk.includes('^') && monster === '') {
                    baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk])));
                    delete baseChunkData['items'][item + asterisk];
                    !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach(monster => {
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                            dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                            delete dropRatesGlobal[monster][item + asterisk];
                        }
                    });
                    !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach(monster => {
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                            dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                            delete dropTablesGlobal[monster][item + asterisk];
                        }
                    });
                } else if (!asterisk.includes('^')) {
                    baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk])));
                    delete baseChunkData['items'][item + asterisk];
                }
            }
        });
        if (rules['RDT'] && baseChunkData['items']['GemDropTable+'] && newValids && newValids['Quest'] && newValids['Quest'].hasOwnProperty("~|Legends' Quest|~ Complete the quest")) {
            Object.keys(baseChunkData['items']['GemDropTable+']).forEach(monster => {
                monster = monster.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J');
                !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]['GemDropTable+']).forEach(quantity => {
                    Object.keys(dropTables['GemDropTableLegends+']).forEach(item => {
                        if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if (chunkInfo['drops'][monster][item] === 'Always') {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                        } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output'])) {
                            if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                if (!baseChunkData['items'][item]) {
                                    baseChunkData['items'][item] = {};
                                }
                                if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']][item] === 'Always') {
                                    baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+']).forEach(quantity => {
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                                });
                            }
                        }
                    });
                });
                !!chunkInfo['skillItems']['Slayer'][monster] && Object.keys(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+']).forEach(quantity => {
                    Object.keys(dropTables['GemDropTableLegends+']).forEach(item => {
                        if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if (chunkInfo['skillItems']['Slayer'][monster][item] === 'Always') {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                        } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output'])) {
                            if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                if (!baseChunkData['items'][item]) {
                                    baseChunkData['items'][item] = {};
                                }
                                if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']][item] === 'Always') {
                                    baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+']).forEach(quantity => {
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster.replaceAll('#', '%2F')]['Output']]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                                });
                            }
                        }
                    });
                });
            });
        }
        if (!!chunks && Object.keys(chunks).filter(chunk => { return chunkInfo['unnotingChunks'].includes(chunk) }).length === 0) {
            !!dropTablesGlobal && Object.keys(dropTablesGlobal).forEach(monster => {
                !!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).forEach(item => {
                    !!dropTablesGlobal[monster][item] && Object.keys(dropTablesGlobal[monster][item]).forEach(quantity => {
                        if (quantity.includes('(noted)')) {
                            if (!!baseChunkData['items'] && !!baseChunkData['items'][item] && !!baseChunkData['items'][item][monster.replaceAll('%2F', '#')]) {
                                delete baseChunkData['items'][item][monster.replaceAll('%2F', '#')];
                                if (!baseChunkData['items'][item] || Object.keys(baseChunkData['items'][item]).length === 0) {
                                    delete baseChunkData['items'][item];
                                }
                            }
                        }
                    });
                });
            });
        }

        if (rules['Skilling Pets']) {
            let skillingPets = {
                'Fishing': 'Heron',
                'Mining': 'Rock golem',
                'Woodcutting': 'Beaver',
                'Agility': 'Giant squirrel',
                'Farming': 'Tangleroot',
                'Thieving': 'Rocky',
                'Runecraft': 'Rift guardian'
            }
            Object.keys(skillingPets).forEach(skill => {
                if (checkPrimaryMethod(skill, newValids, baseChunkData) && !!newValids && newValids[skill] && Object.keys(newValids[skill]).filter(task => { return chunkInfo['challenges'][skill].hasOwnProperty(task) && !chunkInfo['challenges'][skill][task].hasOwnProperty('NoPet') && !chunkInfo['challenges'][skill][task].hasOwnProperty('Description') }).length > 0) {
                    if (!baseChunkData['items'][skillingPets[skill]]) {
                        baseChunkData['items'][skillingPets[skill]] = {};
                    }
                    baseChunkData['items'][skillingPets[skill]]['Manually Added*'] = 'secondary-' + skill;
                } else {
                    !!baseChunkData['items'][skillingPets[skill]] && delete baseChunkData['items'][skillingPets[skill]]['Manually Added*'];
                    if (!!baseChunkData['items'][skillingPets[skill]] && Object.keys(baseChunkData['items'][skillingPets[skill]]).length <= 0) {
                        delete baseChunkData['items'][skillingPets[skill]];
                    }
                }
            });
        }
        let highestSoFar = {};
        Object.keys(newValids).forEach(skill => {
            highestSoFar[skill] = 0;
            !!newValids[skill] && Object.keys(newValids[skill]).forEach(challenge => {
                if (newValids[skill][challenge] > highestSoFar[skill]) {
                    highestSoFar[skill] = newValids[skill][challenge];
                }
            });
        });
        let tempChallenges = JSON.parse(JSON.stringify(newValids));
        Object.keys(extraOutputItems).forEach(skill => {
            Object.keys(extraOutputItems[skill]).forEach(challenge => {
                if (chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Level') && chunkInfo['challenges'][skill][challenge]['Level'] <= highestSoFar[skill]) {
                    if (!tempChallenges[skill]) {
                        tempChallenges[skill] = {};
                    }
                    if (!tempChallenges[skill][challenge]) {
                        tempChallenges[skill][challenge] = extraOutputItems[skill][challenge];
                    }
                }
            });
        });
        Object.keys(tempChallenges).forEach(skill => {
            Object.keys(tempChallenges[skill]).forEach(challenge => {
                let subSkillValid = !(chunkInfo['challenges'][skill][challenge].hasOwnProperty('Skills') && Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).filter((subSkill) => { return !checkPrimaryMethod(subSkill, tempChallenges, baseChunkData) || (subSkill === 'Slayer' && !!slayerLocked && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level']) }).length > 0);
                if (subSkillValid && skill !== 'BiS') {
                    if (!!chunkInfo['challenges'][skill][challenge]['Output'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                        let output = chunkInfo['challenges'][skill][challenge]['Output'];
                        let highestDropRate = 1;
                        !!chunkInfo['challenges'][skill][challenge]['Items'] && chunkInfo['challenges'][skill][challenge]['Items'].forEach(item => {
                            if (item.replaceAll(/\*/g, '').includes('+')) {
                                let lowestPlusRate = 0;
                                !!itemsPlus[item.replaceAll(/\*/g, '')] && itemsPlus[item.replaceAll(/\*/g, '')].forEach(plus => {
                                    !!baseChunkData['items'][plus] && Object.keys(baseChunkData['items'][plus]).forEach(source => {
                                        if (baseChunkData['items'][plus][source] === 'secondary-drop') {
                                            if (!!dropRatesGlobal[source] &&  !!dropRatesGlobal[source][plus] && !isNaN(dropRatesGlobal[source][plus].split('/')[0]) && ((parseFloat(dropRatesGlobal[source][plus].split('/')[0]) / parseFloat(dropRatesGlobal[source][plus].split('/')[1])) > lowestPlusRate)) {
                                                lowestPlusRate = parseFloat(dropRatesGlobal[source][plus].split('/')[0]) / parseFloat(dropRatesGlobal[source][plus].split('/')[1]);
                                            }
                                        } else if (baseChunkData['items'][plus][source].split('-').length > 1 && [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'].includes(baseChunkData['items'][plus][source].split('-')[1])) {
                                            let lowestQuantityRate = 0;
                                            !!chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]] && !!chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')] && chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus] && Object.keys(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus]).forEach(quantity => {
                                                if (!isNaN(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[0]) && ((parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[1])) > lowestQuantityRate)) {
                                                    lowestQuantityRate = parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[1]);
                                                }
                                            });
                                            if ((lowestQuantityRate < lowestPlusRate) && (lowestQuantityRate !== 0)) {
                                                lowestPlusRate = lowestQuantityRate;
                                            }
                                        }
                                    });
                                });
                                if ((lowestPlusRate < highestDropRate) && (lowestPlusRate!== 0)) {
                                    highestDropRate = lowestPlusRate;
                                }
                            } else {
                                !!baseChunkData['items'][item.replaceAll(/\*/g, '')] && Object.keys(baseChunkData['items'][item.replaceAll(/\*/g, '')]).forEach(source => {
                                    if (baseChunkData['items'][item.replaceAll(/\*/g, '')][source] === 'secondary-drop') {
                                        if (!!dropRatesGlobal[source] &&  !!dropRatesGlobal[source][item.replaceAll(/\*/g, '')] && !isNaN(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[0]) && ((parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[0]) / parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[1])) < highestDropRate)) {
                                            highestDropRate = parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[0]) / parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[1]);
                                        }
                                    } else if (baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-').length > 1 && [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'].includes(baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1])) {
                                        let lowestQuantityRate = 0;
                                        !!chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]] && !!chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')] && chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')] && Object.keys(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')]).forEach(quantity => {
                                            if (!isNaN(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[0]) && ((parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[1])) > lowestQuantityRate)) {
                                                lowestQuantityRate = parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[1]);
                                            }
                                        });
                                        if ((lowestQuantityRate < highestDropRate) && (lowestQuantityRate !== 0)) {
                                            highestDropRate = lowestQuantityRate;
                                        }
                                    }
                                });
                            }
                        });
                        !!chunkInfo['skillItems'][skill] && !!chunkInfo['skillItems'][skill][output] && Object.keys(chunkInfo['skillItems'][skill][output]).filter((item) => { return (chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/').length < 2 || isNaN(parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1])) || (parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) * highestDropRate) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossLogs.hasOwnProperty(output)) }).forEach(item => {
                            if (!outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')]) {
                                outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = {};
                            }
                            if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Source')) {
                                if (chunkInfo['challenges'][skill][challenge]['Source'] === 'shop' && (!backloggedSources['shops'] || !backloggedSources['shops'][challenge])) {
                                    outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = chunkInfo['challenges'][skill][challenge]['Source'];
                                    if (!baseChunkData['shops'].hasOwnProperty(challenge)) {
                                        baseChunkData['shops'][challenge] = {};
                                    }
                                    baseChunkData['shops'][challenge][chunkInfo['challenges'][skill][challenge].hasOwnProperty('Chunks') ? chunkInfo['challenges'][skill][challenge]['Chunks'][0] : 'Nonskill'] = true;
                                } else if (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' && (chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]] === 'Always' || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) > (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))))) && !chunkInfo['challenges'][skill][challenge]['Secondary']) {
                                    outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'primary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                } else if (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' && (chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/').length < 2 || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) <= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'secondary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                } else {
                                    delete outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')];
                                }
                            } else if (chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]] === 'Always' || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) > (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))) && !chunkInfo['challenges'][skill][challenge]['Secondary']) {
                                outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'primary-' + skill;
                            } else if ((chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/').length < 2 || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) <= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'secondary-' + skill;
                            }
                        });
                        if (!chunkInfo['skillItems'][skill] || !chunkInfo['skillItems'][skill][output]) {
                            if (!outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')]) {
                                outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = {};
                            }
                            if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Source')) {
                                if (chunkInfo['challenges'][skill][challenge]['Source'] === 'shop' && (!backloggedSources['shops'] || !backloggedSources['shops'][challenge])) {
                                    outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = chunkInfo['challenges'][skill][challenge]['Source'];
                                } else if (!chunkInfo['challenges'][skill][challenge]['Secondary'] && (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' || !backloggedSources['shops'] || !backloggedSources['shops'][challenge])) {
                                    outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'primary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                } else if (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' || !backloggedSources['shops'] || !backloggedSources['shops'][challenge]) {
                                    outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'secondary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                }
                            } else if (!chunkInfo['challenges'][skill][challenge]['Secondary']) {
                                outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'primary-' + skill;
                            } else {
                                outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = 'secondary-' + skill;
                            }
                        }
                    }
                    if (!!chunkInfo['challenges'][skill][challenge]['Output Object'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                        let outputObject = chunkInfo['challenges'][skill][challenge]['Output Object'];
                        if (!outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')]) {
                            outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = {};
                        }
                        if (!chunkInfo['challenges'][skill][challenge]['Secondary']) {
                            outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')][challenge] = true;
                        } else {
                            outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')]['Secondary-' + challenge] = true;
                        }
                    }
                }
            });
        });
        outputTasks = {};
        Object.keys(outputs).filter((output) => { return !backloggedSources['items'] || !backloggedSources['items'][output] }).forEach(output => {
            Object.keys(outputs[output]).filter((source) => { return outputs[output][source].split('-').length <= 1 || ((newValids.hasOwnProperty(outputs[output][source].split('-')[1])) || (newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(source) && (!slayerTaskLockedItems.hasOwnProperty(output) || !slayerTaskLockedItems[output].hasOwnProperty(source.split('|')[1].toLowerCase())))) || (outputs[output][source].split('-')[1] === 'drop' && !(newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(source))) }).forEach(source => {
                if (baseChunkData['items'].hasOwnProperty(output + '*')) {
                    if (!baseChunkData['items'][output + '*']) {
                        baseChunkData['items'][output + '*'] = {};
                    }
                    baseChunkData['items'][output + '*'][source] = outputs[output][source];
                    if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                        outputTasks[outputs[output][source].split('-')[1]] = {};
                    }
                    outputTasks[outputs[output][source].split('-')[1]][source] = output + '*';
                } else if (baseChunkData['items'].hasOwnProperty(output + '*^')) {
                    if (!baseChunkData['items'][output + '*^']) {
                        baseChunkData['items'][output + '*^'] = {};
                    }
                    baseChunkData['items'][output + '*^'][source] = outputs[output][source];
                    if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                        outputTasks[outputs[output][source].split('-')[1]] = {};
                    }
                    outputTasks[outputs[output][source].split('-')[1]][source] = output + '*^';
                } else if (baseChunkData['items'].hasOwnProperty(output + '*^^')) {
                    if (!baseChunkData['items'][output + '*^^']) {
                        baseChunkData['items'][output + '*^^'] = {};
                    }
                    baseChunkData['items'][output + '*^^'][source] = outputs[output][source];
                    if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                        outputTasks[outputs[output][source].split('-')[1]] = {};
                    }
                    outputTasks[outputs[output][source].split('-')[1]][source] = output + '*^^';
                } else {
                    if (!baseChunkData['items'][output]) {
                        baseChunkData['items'][output] = {};
                    }
                    baseChunkData['items'][output][source] = outputs[output][source];
                    if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                        outputTasks[outputs[output][source].split('-')[1]] = {};
                    }
                    outputTasks[outputs[output][source].split('-')[1]][source] = output;
                }
            });
            if (baseChunkData['items'][output] === {}) {
                delete baseChunkData['items'][output];
            }
        });
        Object.keys(outputObjects).forEach(output => {
            if (!baseChunkData['objects'][output]) {
                baseChunkData['objects'][output] = {};
            }
            Object.keys(outputObjects[output]).forEach(source => {
                baseChunkData['objects'][output][source] = outputObjects[output][source];
            });
        });
        Object.keys(baseChunkData['items']).forEach(item => {
            Object.keys(baseChunkData['items'][item]).filter((source) => { return baseChunkData['items'][item][source].split('-').length > 1 && [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'].includes(baseChunkData['items'][item][source].split('-')[1]) && (!newValids.hasOwnProperty(baseChunkData['items'][item][source].split('-')[1]) || !newValids[baseChunkData['items'][item][source].split('-')[1]].hasOwnProperty(source)) && baseChunkData['items'][item][source].split('-')[1] !== 'Nonskill' && source !== 'Manually Added*' }).forEach(source => {
                delete baseChunkData['items'][item][source];
                if (baseChunkData['items'][item] === {}) {
                    delete baseChunkData['items'][item];
                }
            });
        });
        Object.keys(chunkInfo['slayerEquipment']).forEach(item => {
            if (!!slayerLocked && chunkInfo['slayerEquipment'][item] > slayerLocked['level'] && baseChunkData['items'].hasOwnProperty(item)) {
                !!baseChunkData['items'] && (baseChunkData['items'][item + '*'] = {...baseChunkData['items'][item]});
                !!baseChunkData['items'] && delete baseChunkData['items'][item];
            } else if ((!slayerLocked || chunkInfo['slayerEquipment'][item] <= slayerLocked['level']) && baseChunkData['items'].hasOwnProperty(item + '*')) {
                !!baseChunkData['items'] && (baseChunkData['items'][item] = {...baseChunkData['items'][item + '*']});
                !!baseChunkData['items'] && delete baseChunkData['items'][item + '*'];
            }
        });
        Object.keys(newValids).forEach(skill => {
            Object.keys(newValids[skill]).filter((index) => { return chunkInfo['challenges'][skill][index].hasOwnProperty('Skills') && !chunkInfo['challenges'][skill][index].hasOwnProperty('ClueTier') }).forEach(name => {
                Object.keys(chunkInfo['challenges'][skill][name]['Skills']).forEach(subSkill => {
                    if (!chunkInfo['challenges'][subSkill]) {
                        chunkInfo['challenges'][subSkill] = {};
                    }
                    if (chunkInfo['challenges'][subSkill].hasOwnProperty(name)) {
                        chunkInfo['challenges'][subSkill][name] = {
                            ...chunkInfo['challenges'][subSkill][name],
                            'Level': chunkInfo['challenges'][skill][name]['Skills'][subSkill],
                            'Tasks': {
                                ...chunkInfo['challenges'][subSkill][name]['Tasks'],
                                [name + '--' + skill]: skill
                            }
                        }
                    } else {
                        if (!newValids.hasOwnProperty(subSkill)) {
                            newValids[subSkill] = {};
                        }
                        newValids[subSkill][name] = chunkInfo['challenges'][skill][name]['Skills'][subSkill];
                        chunkInfo['challenges'][subSkill][name] = {
                            ...chunkInfo['challenges'][skill][name],
                            'Level': chunkInfo['challenges'][skill][name]['Skills'][subSkill],
                            'Tasks': {
                                [name + '--' + skill]: skill
                            }
                        }
                    }
                    if (skill === 'Quest' || skill === 'Diary') {
                        delete chunkInfo['challenges'][subSkill][name]['BaseQuest'];
                        delete chunkInfo['challenges'][subSkill][name]['Skills'];
                        chunkInfo['challenges'][skill][name] = {
                            ...chunkInfo['challenges'][skill][name],
                            'Tasks': {
                                ...chunkInfo['challenges'][skill][name]['Tasks'],
                                [name + '--' + subSkill]: subSkill
                            }
                        }
                        if (chunkInfo['challenges'][subSkill][name].hasOwnProperty('SkillsBoost') && chunkInfo['challenges'][subSkill][name]['SkillsBoost'].hasOwnProperty(subSkill)) {
                            chunkInfo['challenges'][subSkill][name] = {
                                ...chunkInfo['challenges'][subSkill][name],
                                'NoBoost': true
                            }
                        }
                    }
                });
            });
        });
        Object.keys(newValids).forEach(skill => {
            Object.keys(newValids[skill]).filter(challenge => { return (chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward')) && checkPrimaryMethod(skill, newValids, baseChunkData) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) && !!chunkInfo['challenges'][skill][challenge]['Reward'] }).forEach(challenge => {
                chunkInfo['challenges'][skill][challenge]['Reward'].forEach(reward => {
                    if (!baseChunkData['items'][reward]) {
                        baseChunkData['items'][reward] = {};
                    }
                    baseChunkData['items'][reward][challenge] = skill;
                });
            });
        });
        questPointTotal = 0;
        questProgress = {};
        diaryProgress = {};
        skillQuestXp = {};
        !!newValids && !!newValids['Quest'] && Object.keys(newValids['Quest']).forEach(line => {
            if (chunkInfo['challenges']['Quest'].hasOwnProperty(line) && chunkInfo['challenges']['Quest'][line].hasOwnProperty('QuestPoints')) {
                questPointTotal += chunkInfo['challenges']['Quest'][line]['QuestPoints'];
                questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']] = 'Complete the quest';
            } else if (questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']] !== 'Complete the quest') {
                if (!questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']]) {
                    questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']] = [];
                }
                questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']].push(line);
            }
            if (chunkInfo['challenges']['Quest'].hasOwnProperty(line) && chunkInfo['challenges']['Quest'][line].hasOwnProperty('XpReward')) {
                Object.keys(chunkInfo['challenges']['Quest'][line]['XpReward']).filter((skill) => { return !passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1 }).forEach(skill => {
                    if (!skillQuestXp[skill]) {
                        skillQuestXp[skill] = {
                            xp: 0,
                            level: 1
                        };
                    }
                    skillQuestXp[skill]['xp'] += chunkInfo['challenges']['Quest'][line]['XpReward'][skill];
                    skillQuestXp[skill]['level'] = getLevelForXp(skillQuestXp[skill]['xp']);
                });
            }
        });
        !!newValids && !!newValids['Nonskill'] && Object.keys(newValids['Nonskill']).filter((line) => { return chunkInfo['challenges']['Nonskill'].hasOwnProperty(line) && chunkInfo['challenges']['Nonskill'][line].hasOwnProperty('XpReward') }).forEach(line => {
            Object.keys(chunkInfo['challenges']['Nonskill'][line]['XpReward']).filter((skill) => { return !passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1 }).forEach(skill => {
                if (!skillQuestXp[skill]) {
                    skillQuestXp[skill] = {
                        xp: 0,
                        level: 1
                    };
                }
                skillQuestXp[skill]['xp'] += chunkInfo['challenges']['Nonskill'][line]['XpReward'][skill];
                skillQuestXp[skill]['level'] = getLevelForXp(skillQuestXp[skill]['xp']);
            });
        });
        !!assignedXpRewards && Object.keys(assignedXpRewards).forEach(skill => {
            !!assignedXpRewards[skill] && Object.keys(assignedXpRewards[skill]).forEach(line => {
                !!assignedXpRewards[skill][line] && Object.keys(assignedXpRewards[skill][line]).forEach(skillOpt => {
                    if (!skillQuestXp[skillOpt]) {
                        skillQuestXp[skillOpt] = {
                            xp: 0,
                            level: 1
                        };
                    }
                    skillQuestXp[skillOpt]['xp'] += assignedXpRewards[skill][line][skillOpt];
                    skillQuestXp[skillOpt]['level'] = getLevelForXp(skillQuestXp[skillOpt]['xp']);
                });
            });
        });
        let tier;
        !!newValids && !!newValids['Diary'] && Object.keys(newValids['Diary']).forEach(line => {
            tier = line.split('|')[1].split('%2F')[1];
            if (chunkInfo['challenges']['Diary'].hasOwnProperty(line) && chunkInfo['challenges']['Diary'][line].hasOwnProperty('Reward')) {
                if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]) {
                    diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']] = {};
                }
                if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier]) {
                    diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier] = [];
                }
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier]['done'] = true;
            }
            if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]) {
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']] = {};
            }
            if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier]) {
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier] = [];
            }
            if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]['allTasks']) {
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]['allTasks'] = [];
            }
            diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier].push(line);
            diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]['allTasks'].push(line);
        });
        kudosTotal = 0;
        possibleSkillTotal = 0;
        let tempPrimarySkill = false;
        !!newValids && Object.keys(newValids).filter((skill) => { return !!newValids[skill] }).forEach(skill => {
            Object.keys(newValids[skill]).filter(challenge => { return (chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Kudos')) }).forEach(line => {
                kudosTotal += chunkInfo['challenges'][skill][line]['Kudos'];
            });
            if (skillNames.includes(skill) && skill !== 'Combat') {
                tempPrimarySkill = checkPrimaryMethod(skill, newValids, baseChunkData);
                if (skill === 'Slayer' && !!slayerLocked) {
                    possibleSkillTotal += slayerLocked['level'];
                } else if (tempPrimarySkill) {
                    possibleSkillTotal += 99;
                } else if (!!passiveSkill && passiveSkill.hasOwnProperty(skill)) {
                    possibleSkillTotal += passiveSkill[skill] === 0 ? 1 : passiveSkill[skill];
                } else if (skill === 'Hitpoints') {
                    possibleSkillTotal += 10;
                } else {
                    possibleSkillTotal += 1;
                }
            }
        });
        clueTasksPossible = {
            'beginner': true,
            'easy': true,
            'medium': true,
            'hard': true,
            'elite': true,
            'master': true
        };
        !!chunkInfo['challenges']['Nonskill'] && Object.keys(chunkInfo['challenges']['Nonskill']).filter((task) => { return !!chunkInfo['challenges']['Nonskill'][task] && chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('ClueTier') && !newValids.hasOwnProperty('Nonskill') || !newValids['Nonskill'].hasOwnProperty(task) }).forEach(task => {
            clueTasksPossible[chunkInfo['challenges']['Nonskill'][task]['ClueTier']] = false;
        });
        !!baseChunkData && !!baseChunkData['items'] && Object.keys(baseChunkData['items']).filter(item => { return Object.keys(baseChunkData['items'][item]).length === 0 }).forEach(item => {
            delete baseChunkData['items'][item];
        });
        //console.log(i);
    } while ((!_.isEqual(valids, newValids) && i < 10) || i < 3);
    valids = newValids;
    //console.log(baseChunkData);
    tempChunkData = baseChunkData;
    return valids;
}

// Gets diff between 2 objects
function diff(obj1, obj2) {
    const result = {};
    if (Object.is(obj1, obj2)) {
        return undefined;
    }
    if (!obj2 || typeof obj2 !== 'object') {
        return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
        if(obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
            result[key] = obj2[key];
        }
        if(typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
            const value = diff(obj1[key], obj2[key]);
            if (value !== undefined) {
                result[key] = value;
            }
        }
    });
    return result;
}

// Checks if every source of an item is from a shop
var onlyShop = function(sources) {
    let allShop = !(Object.keys(sources).filter((source) => { return sources[source] !== 'shop' }).length > 0);
    return allShop;
}

// Does the work to calculate all the possible challenges
var calcChallengesWork = function(chunks, baseChunkData) {
    let items = {...baseChunkData['items']};
    let objects = {...baseChunkData['objects']};
    let monsters = {...baseChunkData['monsters']};
    let npcs = {...baseChunkData['npcs']};
    let valids = {};
    extraOutputItems = {};

    let tempItemSkill = {};
    let tempMultiStepSkill = {};

    !!chunkInfo['challenges'] && !!chunkInfo['challenges']['Extra'] && Object.keys(chunkInfo['challenges']['Extra']).filter((name) => { return chunkInfo['challenges']['Extra'][name].hasOwnProperty('Permanent') && !chunkInfo['challenges']['Extra'][name]['Permanent'] }).forEach(name => {
        delete chunkInfo['challenges']['Extra'][name];
    });

    // Secondary MTA
    if (!!chunkInfo['challenges']['Magic'] && !!chunkInfo['challenges']['Magic']['Participate in all parts of the ~|Magic Training Arena|~']) {
        chunkInfo['challenges']['Magic']['Participate in all parts of the ~|Magic Training Arena|~']['forcedPrimary'] = !rules['Secondary MTA'];
    }

    // Max Cape
    if (rules['Skillcape'] && !!chunks && chunks.hasOwnProperty('11063')) {
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        valids['Extra']['Buy the ~|Max cape|~%2E Nerd%2E'] = 'Skillcapes';
        if (!chunkInfo['challenges']['Extra']) {
            chunkInfo['challenges']['Extra'] = {};
        }
        chunkInfo['challenges']['Extra']['Buy the ~|Max cape|~%2E Nerd%2E'] = {
            'Category': ['Skillcape'],
            'Chunks': ['11063'],
            'ChunksDetails': ['11063'],
            'Label': 'Skillcapes',
            'Output': 'Max cape',
            'TotalLevelNeeded': 2277,
            'Permanent': false
        }
    }

    let tempSkills;
    if (rules['F2P']) {
        tempSkills = [...f2pSkills, 'Nonskill', 'Quest', 'Extra'];
    } else {
        tempSkills = [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'];
    }

    let doneTempSkillItems = false;

    !!chunkInfo['challenges'] && tempSkills.filter(skill => { return !passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] > 0 }).forEach(skill => {
        doneTempSkillItems = false;
        tempItemSkill[skill] = {};
        tempMultiStepSkill[skill] = {};
        valids[skill] = {};
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).sort(function(a, b) { return (((chunkInfo['challenges'][skill][a].hasOwnProperty('Description') - chunkInfo['challenges'][skill][b].hasOwnProperty('Description')) === 0) ? chunkInfo['challenges'][skill][a]['Level'] - chunkInfo['challenges'][skill][b]['Level'] : (chunkInfo['challenges'][skill][a].hasOwnProperty('Description') - chunkInfo['challenges'][skill][b].hasOwnProperty('Description'))) }).forEach(name => {
            if (!chunkInfo['challenges'][skill][name].hasOwnProperty('Priority') && (skill === 'Quest' || skill === 'Diary')) {
                chunkInfo['challenges'][skill][name]['Priority'] = -1;
            }
            wrongThings = [];
            !!chunkInfo['challenges'][skill][name]['Category'] && chunkInfo['challenges'][skill][name]['Category'].filter((category) => { return maybePrimary.includes(category) }).forEach(category => {
                chunkInfo['challenges'][skill][name]['Primary'] = rules[category];
            });
            let validChallenge = true;
            let tempSecondary = false;
            if (!!chunkInfo['challenges'][skill][name]['ManualInvalid'] && chunkInfo['challenges'][skill][name]['ManualInvalid']) {
                validChallenge = false;
                wrongThings.push('Manual');
                nonValids[name] = wrongThings;
                return;
            }
            chunkInfo['challenges'][skill][name]['ItemsDetails'] = [];
            chunkInfo['challenges'][skill][name]['ObjectsDetails'] = [];
            chunkInfo['challenges'][skill][name]['MonstersDetails'] = [];
            chunkInfo['challenges'][skill][name]['NPCsDetails'] = [];
            chunkInfo['challenges'][skill][name]['ChunksDetails'] = [];
            delete chunkInfo['challenges'][skill][name]['NeverShow'];
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('Not F2P') && rules['F2P']) {
                validChallenge = false;
                wrongThings.push('F2P');
                nonValids[name] = wrongThings;
                return;
            }
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('QuestPointsNeeded')) {
                if (!questPointTotal || (questPointTotal < chunkInfo['challenges'][skill][name]['QuestPointsNeeded'])) {
                    validChallenge = false;
                    wrongThings.push('QPS');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (!!chunkInfo['challenges'][skill][name]['KudosNeeded']) {
                if (kudosTotal < chunkInfo['challenges'][skill][name]['KudosNeeded']) {
                    validChallenge = false;
                    wrongThings.push('Kudos');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('TotalLevelNeeded')) {
                if (possibleSkillTotal < chunkInfo['challenges'][skill][name]['TotalLevelNeeded']) {
                    validChallenge = false;
                    wrongThings.push('Total Level');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (skill === 'Extra' && chunkInfo['challenges'][skill][name].hasOwnProperty('Set')) {
                if (!!backlog[skill] && backlog[skill].hasOwnProperty(name)) {
                    validChallenge = false;
                    wrongThings.push('Set outclassed');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (name.includes('contract for ~|Mahogany Homes|~') && !!constructionLocked) {
                validChallenge = false;
                wrongThings.push('Mahogany Homes Locked');
                return;
            }
            !!chunkInfo['challenges'][skill][name]['Category'] && Object.keys(rules).forEach(rule => {
                if (chunkInfo['challenges'][skill][name]['Category'].includes(rule) && !maybePrimary.includes(rule) && !rules[rule] && (rule !== 'Secondary Primary' || secondaryPrimaryNum === "1/1")) {
                    validChallenge = false;
                    wrongThings.push(rule);
                    return;
                }
                if (rule === 'Collection Log Clues' && chunkInfo['challenges'][skill][name]['Category'].includes('Collection Log Clues') && rules[rule]) {
                    if (!clueTasksPossible.hasOwnProperty(name.split(' ')[0].substring(1).toLowerCase()) || !clueTasksPossible[name.split(' ')[0].substring(1).toLowerCase()]) {
                        validChallenge = false;
                        wrongThings.push('Collection Log Clues');
                        nonValids[name] = wrongThings;
                        return;
                    }
                }
                if (rule === 'Shortcut Task' && chunkInfo['challenges'][skill][name]['Category'].includes('Shortcut') && !rules[rule] && chunkInfo['challenges'][skill][name]['Level'] > 1) {
                    /*validChallenge = false;
                    wrongThings.push('Shortcut');
                    nonValids[name] = wrongThings;
                    return;*/
                    chunkInfo['challenges'][skill][name]['NeverShow'] = true;
                }
                if (rule === 'InsidePOH' && chunkInfo['challenges'][skill][name]['Category'].includes('InsidePOH Primary') && !rules[rule] && chunkInfo['challenges'][skill][name]['Level'] > 1) {
                    validChallenge = false;
                    wrongThings.push('InsidePOH Primary');
                    nonValids[name] = wrongThings;
                    return;
                }
            });
            if (!rules['Cleaning Herbs'] && (name.includes('Clean a') || name.includes('(unf)')) && skill === 'Herblore' && chunkInfo['challenges'][skill][name]['Level'] > 1) {
                chunkInfo['challenges'][skill][name]['NeverShow'] = true;
            }
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            if (!!slayerLocked && skill === 'Slayer' && chunkInfo['challenges'][skill][name]['Level'] > slayerLocked['level']) {
                let stillLocked = true;
                if (!!chunkInfo['codeItems']['slayerTasks'] && chunkInfo['codeItems']['slayerTasks'].hasOwnProperty(slayerLocked['monster'])) {
                    (!!chunkInfo['codeItems']['slayerTasks'][slayerLocked['monster']] && Object.keys(chunkInfo['codeItems']['slayerTasks'][slayerLocked['monster']]).filter((monster) => { return !!baseChunkData['monsters'] && baseChunkData['monsters'].hasOwnProperty(monster) }).length > 0) && (stillLocked = false);
                }
                if (stillLocked) {
                    validChallenge = false;
                    wrongThings.push('Slayer Locked');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (!doneTempSkillItems && chunkInfo['challenges'][skill][name].hasOwnProperty('Description')) {
                Object.keys(tempItemSkill[skill]).forEach(item => {
                    if (rules["Highest Level"]) {
                        !!items[item] && tempItemSkill[skill][item].forEach(name => {
                            valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                        });
                    } else {
                        let lowestItem;
                        let lowestName;
                        !!items[item] && tempItemSkill[skill][item].forEach(name => {
                            let challenge = chunkInfo['challenges'][skill][name];
                            if (!!challenge && !!challenge['Output']) {
                                if (!extraOutputItems[skill]) {
                                    extraOutputItems[skill] = {};
                                }
                                extraOutputItems[skill][name] = challenge['Output'];
                            }
                            if (!lowestItem || lowestItem['Level'] > challenge['Level']) {
                                lowestItem = challenge;
                                lowestName = name;
                            } else if (lowestItem['Level'] === challenge['Level'] && ((!!challenge['Priority'] && (challenge['Priority'] < lowestItem['Priority'])) || !lowestItem['Priority'])) {
                                lowestItem = challenge;
                                lowestName = name;
                            }
                        });
                        !!lowestName && (valids[skill][lowestName] = chunkInfo['challenges'][skill][lowestName]['Level']);
                    }
                });
                doneTempSkillItems = true;
            }
            !!chunkInfo['challenges'][skill][name]['Chunks'] && chunkInfo['challenges'][skill][name]['Chunks'].forEach(chunkId => {
                if (chunkId.includes('+')) {
                    if (chunkId.includes('+x')) {
                        let xNum = parseInt(chunkId.split('+x')[1]);
                        let xResults = 0;
                        let xChunkId = chunkId.split('+x')[0] + '+';
                        if (!chunksPlus[xChunkId]) {
                            validChallenge = false;
                            wrongThings.push(xChunkId);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ChunksDetails'].push(xChunkId);
                            return;
                        } else {
                            let tempValid = false;
                            Object.keys(chunks).forEach(cName => {
                                chunksPlus[xChunkId].filter((plus) => { return plus === cName }).forEach(plus => {
                                    tempValid = true;
                                    let realName = plus;
                                    if (!!chunkInfo['chunks'][plus]['Name']) {
                                        realName = chunkInfo['chunks'][plus]['Name'];
                                    } else if (!!chunkInfo['chunks'][plus]['Nickname']) {
                                        realName = chunkInfo['chunks'][plus]['Nickname'] + '(' + plus + ')';
                                    }
                                    chunkInfo['challenges'][skill][name]['ChunksDetails'].push(realName);
                                    xResults++;
                                });
                            });
                            if (!tempValid || xResults < xNum) {
                                validChallenge = false;
                                wrongThings.push(xChunkId);
                                nonValids[name] = wrongThings;
                                chunkInfo['challenges'][skill][name]['ChunksDetails'].push(xChunkId);
                                return;
                            }
                        }
                    } else {
                        if (!chunksPlus[chunkId]) {
                            validChallenge = false;
                            wrongThings.push(chunkId);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                            return;
                        } else {
                            let tempValid = false;
                            Object.keys(chunks).forEach(cName => {
                                chunksPlus[chunkId].filter((plus) => { return plus === cName }).forEach(plus => {
                                    tempValid = true;
                                    let realName = plus;
                                    if (!!chunkInfo['chunks'][plus]['Name']) {
                                        realName = chunkInfo['chunks'][plus]['Name'];
                                    } else if (!!chunkInfo['chunks'][plus]['Nickname']) {
                                        realName = chunkInfo['chunks'][plus]['Nickname'] + '(' + plus + ')';
                                    }
                                    chunkInfo['challenges'][skill][name]['ChunksDetails'].push(realName);
                                });
                            });
                            if (!tempValid) {
                                validChallenge = false;
                                wrongThings.push(chunkId);
                                nonValids[name] = wrongThings;
                                chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                                return;
                            }
                        }
                    }
                } else {
                    let tempValid = false;
                    Object.keys(chunks).filter((cName) => { return chunkId === cName }).forEach(cName => {
                        tempValid = true;
                        let realName = chunkId;
                        if (!!chunkInfo['chunks'][chunkId]['Name']) {
                            realName = chunkInfo['chunks'][chunkId]['Name'];
                        } else if (!!chunkInfo['chunks'][chunkId]['Nickname']) {
                            realName = chunkInfo['chunks'][chunkId]['Nickname'] + '(' + chunkId + ')';
                        }
                        chunkInfo['challenges'][skill][name]['ChunksDetails'].push(realName);
                    });
                    if (!tempValid) {
                        validChallenge = false;
                        wrongThings.push(chunkId);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                        return;
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            let missingItems = [];
            let savedValid = validChallenge;
            let savedSecondary = tempSecondary;
            let staffItems = {};
            !!chunkInfo['challenges'][skill][name]['Items'] && chunkInfo['challenges'][skill][name]['Items'].forEach(item => {
                let secondary = item.includes('*');
                if (item.replaceAll(/\*/g, '').includes('+')) {
                    if (item.includes('+x')) {
                        let xNum = parseInt(item.split('+x')[1]);
                        let xResults = 0;
                        let xItem = item.split('+x')[0] + '+';
                        if (!itemsPlus[xItem.replaceAll(/\*/g, '')]) {
                            validChallenge = false;
                            wrongThings.push(xItem);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                            return;
                        } else {
                            let tempValid = false;
                            let tempTempValid = false;
                            itemsPlus[xItem.replaceAll(/\*/g, '')].forEach(plus => {
                                if (!!items[plus] && (!chunkInfo['challenges'][skill][name].hasOwnProperty('NonShop') || !chunkInfo['challenges'][skill][name]['NonShop'] || !onlyShop(items[plus]))) {
                                    tempValid = true;
                                    xResults++;
                                    Object.keys(items[plus]).forEach(source => {
                                        if (xItem.includes('*')) {
                                            if (!items[plus][source].includes('secondary-') || (items[plus][source].includes('primary-') && (!items[plus][source].includes('-Farming') || rules['Farming Primary'])) || items[plus][source] === 'shop') {
                                                secondary = false;
                                            } else if (xItem === 'Air rune+*') {
                                                if (!!items['Staff of air']) {
                                                    secondary = false;
                                                }
                                            }
                                        }
                                    });
                                    if (combatSkills.includes(skill) || (chunkInfo['challenges'][skill][name].hasOwnProperty('Category') && chunkInfo['challenges'][skill][name]['Category'].includes('BIS Skilling'))) {
                                        (Object.keys(items[plus]).filter((source) => { return !items[plus][source].includes('-') || !processingSkill[items[plus][source].split('-')[1]] || chunkInfo['challenges'][skill][name]['Not Equip'] || rules['Wield Crafted Items'] || items[plus][source].split('-')[1] === 'Slayer' }).length > 0) && (tempTempValid = true);
                                    } else {
                                        tempTempValid = true;
                                    }
                                }
                            });
                            !tempTempValid && (tempValid = false);
                            if (!tempValid || xResults < xNum) {
                                validChallenge = false;
                                wrongThings.push(item);
                                nonValids[name] = wrongThings;
                                chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                                return;
                            } else {
                                chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                            }
                        }
                    } else {
                        if (!itemsPlus[item.replaceAll(/\*/g, '')]) {
                            validChallenge = false;
                            wrongThings.push(item);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                            return;
                        } else {
                            let tempValid = false;
                            let tempTempValid = false;
                            itemsPlus[item.replaceAll(/\*/g, '')].filter((plus) => { return !!items[plus] && (!chunkInfo['challenges'][skill][name].hasOwnProperty('NonShop') || !chunkInfo['challenges'][skill][name]['NonShop'] || !onlyShop(items[plus])) }).forEach(plus => {
                                tempValid = true;
                                item.includes('*') && Object.keys(items[plus]).forEach(source => {
                                    if (!items[plus][source].includes('secondary-') || (items[plus][source].includes('primary-') && (!items[item.replaceAll(/\*/g, '')][source].includes('-Farming') || rules['Farming Primary'])) || items[plus][source] === 'shop') {
                                        secondary = false;
                                    } else if (item === 'Air rune+*') {
                                        if (!!items['Staff of air']) {
                                            secondary = false;
                                        }
                                    }
                                });
                                if (combatSkills.includes(skill) || (chunkInfo['challenges'][skill][name].hasOwnProperty('Category') && chunkInfo['challenges'][skill][name]['Category'].includes('BIS Skilling'))) {
                                    (Object.keys(items[plus]).filter((source) => { return !items[plus][source].includes('-') || !processingSkill[items[plus][source].split('-')[1]] || chunkInfo['challenges'][skill][name]['Not Equip'] || rules['Wield Crafted Items'] || items[plus][source].split('-')[1] === 'Slayer' }).length > 0) && (tempTempValid = true);
                                } else {
                                    tempTempValid = true;
                                }
                            });
                            !tempTempValid && (tempValid = false);
                            if (!tempValid) {
                                validChallenge = false;
                                wrongThings.push(item);
                                nonValids[name] = wrongThings;
                                chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                                return;
                            } else {
                                chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                            }
                        }
                    }
                    if ((skill === 'Magic' && chunkInfo['challenges'][skill][name]['Primary']) || ((skill === 'Quest' || skill === 'Diary') && (chunkInfo['challenges'][skill][name].hasOwnProperty('Skills') && chunkInfo['challenges'][skill][name]['Skills'].hasOwnProperty('Magic')) && (chunkInfo['challenges'][skill][name]['Items'].some(e => /.+ rune\+/g.test(e))))) {
                        missingItems.push(item);
                    }
                } else {
                    if ((!items[item.replaceAll(/\*/g, '')] && (!items[item.replaceAll(/\*/g, '') + '*'] || combatSkills.includes(skill))) || (chunkInfo['challenges'][skill][name].hasOwnProperty('NonShop') && chunkInfo['challenges'][skill][name]['NonShop'] && onlyShop(items[item.replaceAll(/\*/g, '')]))) {
                        validChallenge = false;
                        wrongThings.push(item);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                        return;
                    } else {
                        let tempItem = item.replaceAll(/\*/g, '');
                        if (items.hasOwnProperty(item.replaceAll(/\*/g, '') + '*') && !combatSkills.includes(skill)) {
                            tempItem += '*';
                        }
                        chunkInfo['challenges'][skill][name]['ItemsDetails'].push(tempItem);
                        if (item.includes('*') && !!items[tempItem]) {
                            (Object.keys(items[tempItem]).filter((source) => { return (!items[tempItem][source].includes('-Farming') || rules['Farming Primary']) && (!items[tempItem][source].includes('secondary-') || (items[tempItem][source].includes('primary-') && !processingSkill[items[tempItem][source].split('-')[1]]) || items[tempItem][source] === 'shop' )}).length > 0) && (secondary = false);
                        }
                        if (combatSkills.includes(skill) || (chunkInfo['challenges'][skill][name].hasOwnProperty('Category') && chunkInfo['challenges'][skill][name]['Category'].includes('BIS Skilling'))) {
                            let tempTempValid = false;
                            Object.keys(items[tempItem]).forEach(source => {
                                if (!items[tempItem][source].includes('-') || !skillNames.includes(items[tempItem][source].split('-')[1]) || chunkInfo['challenges'][skill][name]['Not Equip'] || rules['Wield Crafted Items'] || items[tempItem][source].split('-')[1] === 'Slayer') {
                                    tempTempValid = true;
                                } else if (chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks')) {
                                    let questDiaryValid = false;
                                    (Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).filter((subTask) => { return subTask.split('--').length > 1 && subTask.split('--')[0] === name && (subTask.split('--')[1] === 'Quest' || subTask.split('--')[1] === 'Diary') }).length > 0) && (questDiaryValid = true);
                                    questDiaryValid && (tempTempValid = true);
                                }
                            });
                            !tempTempValid && (validChallenge = false);
                            !tempTempValid && (wrongThings.push(item));
                            if (!tempTempValid) {
                                nonValids[name] = wrongThings;
                                return
                            };
                        }
                    }
                    if ((skill === 'Magic' && chunkInfo['challenges'][skill][name]['Primary']) || ((skill === 'Quest' || skill === 'Diary') && (chunkInfo['challenges'][skill][name].hasOwnProperty('Skills') && chunkInfo['challenges'][skill][name]['Skills'].hasOwnProperty('Magic')) && (chunkInfo['challenges'][skill][name]['Items'].some(e => /.+ rune\+/g.test(e))))) {
                        missingItems.push(item);
                    }
                }
                !!secondary && (tempSecondary = true);
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            if (missingItems.length > 0) {
                let potentialValid = true;
                let potentialSecondary = false;
                let missingRunes = [];
                missingItems.forEach(it => {
                    let itSecondary = true;
                    if (it.replaceAll(/\*/g, '').includes('+')) {
                        if (!itemsPlus[it.replaceAll(/\*/g, '')]) {
                            if (elementalRunes.includes(it.replaceAll(/\*/g, '').replaceAll(/\+/g, ''))) {
                                missingRunes.push(it);
                            } else {
                                potentialValid = false;
                            }
                        } else {
                            let tempValid = false;
                            itemsPlus[it.replaceAll(/\*/g, '')].filter((plus) => { return !!items[plus] }).forEach(plus => {
                                tempValid = true;
                                if (it.includes('*')) {
                                    (Object.keys(items[plus]).filter((source) => { return !items[plus][source].includes('secondary-') || items[plus][source].includes('primary-') || items[plus][source] === 'shop' }).length > 0) && (itSecondary = false);
                                }
                            });
                            if (!tempValid) {
                                if (elementalRunes.includes(it.replaceAll(/\*/g, '').replaceAll(/\+/g, ''))) {
                                    missingRunes.push(it);
                                } else {
                                    potentialValid = false;
                                }
                            }
                        }
                    } else {
                        if (!items[it.replaceAll(/\*/g, '')]) {
                            if (elementalRunes.includes(it.replaceAll(/\*/g, '').replaceAll(/\+/g, ''))) {
                                missingRunes.push(it);
                            } else {
                                potentialValid = false;
                            }
                        } else {
                            if (it.includes('*')) {
                                (Object.keys(items[it.replaceAll(/\*/g, '')]).filter((source) => { return !items[it.replaceAll(/\*/g, '')][source].includes('secondary-') || items[it.replaceAll(/\*/g, '')][source].includes('primary-') || items[it.replaceAll(/\*/g, '')][source] === 'shop' }).length > 0) && (itSecondary = false);
                            }
                        }
                    }
                    itSecondary && (potentialSecondary = true);
                });
                if (missingRunes.length === 1) {
                    let rune = missingRunes[0].replaceAll(/\*/g, '').replaceAll(/\+/g, '');
                    let foundStaff = false;
                    Object.keys(elementalStaves).filter((staff) => { return elementalStaves[staff].includes(rune) && !!items[staff] && !foundStaff }).forEach(staff => {
                        staffItems[rune] = {};
                        staffItems[rune][staff] =  'primary-staff';
                        foundStaff = true;
                        if (staff !== 'Staff of air') {
                            potentialSecondary = true;
                        }
                    });
                    if (!foundStaff) {
                        potentialValid = false;
                        potentialSecondary = true;
                    }
                } else if (missingRunes.length === 2) {
                    let foundStaff = false;
                    Object.keys(elementalStaves).forEach(staff => {
                        let matchingStaff = true;
                        missingRunes.forEach(rune => {
                            rune = rune.replaceAll(/\*/g, '').replaceAll(/\+/g, '');
                            if (!elementalStaves[staff].includes(rune)) {
                                matchingStaff = false;
                            }
                        });
                        if (matchingStaff && !!items[staff] && !foundStaff) {
                            missingRunes.forEach(rune => {
                                staffItems[rune] = {};
                                staffItems[rune][staff] =  'primary-staff';
                            });
                            foundStaff = true;
                        }
                    });
                    if (!foundStaff) {
                        potentialValid = false;
                        potentialSecondary = true;
                    }
                }
                !potentialValid ? (validChallenge = false) : (validChallenge = savedValid);
                !potentialValid && wrongThings.push('potentialValid');
                potentialSecondary ? (tempSecondary = true) : (tempSecondary = savedSecondary);
                if (!potentialValid) {
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['Objects'] && chunkInfo['challenges'][skill][name]['Objects'].forEach(object => {
                let secondary = true;
                if (object.includes('+')) {
                    if (!objectsPlus[object]) {
                        validChallenge = false;
                        wrongThings.push(object);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                        return;
                    } else {
                        let tempValid = false;
                        objectsPlus[object].filter((plus) => { return !!objects[plus] }).forEach(plus => {
                            tempValid = true;
                            (Object.keys(objects[plus.replaceAll(/\*/g, '')]).filter((source) => { return !source.includes('secondary-') }).length > 0) && (secondary = false);
                        });
                        if (!tempValid) {
                            validChallenge = false;
                            wrongThings.push(object);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                            return;
                        } else {
                            chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                        }
                    }
                } else {
                    if (!objects[object]) {
                        validChallenge = false;
                        wrongThings.push(object);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                        return;
                    } else {
                        chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                        (Object.keys(objects[object]).filter((source) => { return !source.includes('secondary-') }).length > 0) && (secondary = false);
                    }
                }
                !!secondary && (tempSecondary = true);
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['Monsters'] && chunkInfo['challenges'][skill][name]['Monsters'].forEach(monster => {
                if (monster.includes('+')) {
                    if (!monstersPlus[monster]) {
                        if (monster !== 'Monster+') {
                            validChallenge = false;
                            wrongThings.push(monster);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                            return;
                        } else if (!monsters || Object.keys(monsters).length <= 0) {
                            validChallenge = false;
                            wrongThings.push(monster);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                            return;
                        }
                    } else {
                        let tempValid = false;
                        monstersPlus[monster].filter((plus) => { return !!monsters[plus] }).length > 0 && (tempValid = true);
                        if (!tempValid) {
                            validChallenge = false;
                            wrongThings.push(monster);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                            return;
                        } else {
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                        }
                    }
                } else {
                    if (!monsters[monster]) {
                        validChallenge = false;
                        wrongThings.push(monster);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                        return;
                    } else {
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['NPCs'] && chunkInfo['challenges'][skill][name]['NPCs'].forEach(npc => {
                if (npc.includes('+')) {
                    if (!npcsPlus[npc]) {
                        validChallenge = false;
                        wrongThings.push(npc);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                        return;
                    } else {
                        let tempValid = false;
                        npcsPlus[npc].filter((plus) => { return !!npcs[plus] }).length > 0 && (tempValid = true);
                        if (!tempValid) {
                            validChallenge = false;
                            wrongThings.push(npc);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                            return;
                        } else {
                            chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                        }
                    }
                } else {
                    if (!npcs[npc]) {
                        validChallenge = false;
                        wrongThings.push(npc);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                        return;
                    } else {
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['Mix'] && chunkInfo['challenges'][skill][name]['Mix'].forEach(mix => {
                if (mix.includes('+')) {
                    if (!mixPlus[mix]) {
                        validChallenge = false;
                        wrongThings.push(mix);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                        return;
                    } else {
                        let tempValid = false;
                        mixPlus[mix].filter((plus) => { return !!monsters[plus] || !!npcs[plus] }).length > 0 && (tempValid = true);
                        if (!tempValid) {
                            validChallenge = false;
                            wrongThings.push(mix);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                            chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                            return;
                        } else {
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                            chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                        }
                    }
                } else {
                    if (!monsters[mix] && !npcs[mix]) {
                        validChallenge = false;
                        wrongThings.push(mix);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                        return;
                    } else {
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            chunkInfo['challenges'][skill][name]['Secondary'] = tempSecondary;
            chunkInfo['challenges'][skill][name]['forcedPrimary'] && chunkInfo['challenges'][skill][name]['Secondary'] && (validChallenge = false);
            chunkInfo['challenges'][skill][name]['ManualValid'] && (validChallenge = true);
            if (validChallenge) {
                delete nonValids[name];
                if (!processingSkill.hasOwnProperty(skill) || !processingSkill[skill] || !chunkInfo['challenges'][skill][name]['Items'] || chunkInfo['challenges'][skill][name]['Items'].filter(item => { return !tools[item.replaceAll(/\*/g, '')] }).length === 0 || (chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).filter((subChallenge) => { return subChallenge.includes('--') }).length > 0)) {
                    if (skill !== 'Quest' && skill !== 'Diary') {
                        valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'] || chunkInfo['challenges'][skill][name]['Label'] || true;
                    } else {
                        valids[skill][name] = true;
                    }
                } else {
                    let itemList = [];
                    !!chunkInfo['challenges'][skill][name]['Items'] && chunkInfo['challenges'][skill][name]['Items'].forEach(item => {
                        itemList.push(item);
                    });
                    !!staffItems && Object.keys(staffItems).forEach(item => {
                        if (!tempItemSkill[skill][item]) {
                            tempItemSkill[skill][item] = [];
                        }
                        tempItemSkill[skill][item].push(name);
                    });
                    let index = 0;
                    let listDone = false;
                    let thingsAdded = false;
                    while (!listDone) {
                        let item = itemList[index++];
                        if (item.replaceAll(/\*/g, '').includes('+')) {
                            !!itemsPlus[item.replaceAll(/\*/g, '')] && itemsPlus[item.replaceAll(/\*/g, '')].filter((plus) => { return !!items[plus] && (!Object.values(items[plus]).includes('primary-Farming') || rules['Farming Primary']) && !tools[plus] && (skill !== 'Magic' || !magicTools[plus]) }).forEach(plus => {
                                let nonskill = {};
                                let tempNonValid = true;
                                !!items[plus] && Object.keys(items[plus]).forEach(source => {
                                    if (items[plus][source].includes('Nonskill') && !source.includes('*')) {
                                        if (!nonskill['Nonskill']) {
                                            nonskill['Nonskill'] = {};
                                        }
                                        nonskill['Nonskill'][source] = true;
                                    } else if ((!skillNames.includes(items[plus][source].split('-')[1]) || rules['Multi Step Processing']) && processingSkill[skill] && !source.includes('*') && processingSkill[items[plus][source].split('-')[1]]) {
                                        if (!nonskill[items[plus][source].split('-')[1]]) {
                                            nonskill[items[plus][source].split('-')[1]] = {};
                                        }
                                        nonskill[items[plus][source].split('-')[1]][source] = true;
                                    }
                                    if ((!processingSkill[items[plus][source].split('-')[1]] || rules['Multi Step Processing']) && (!items[plus][source].includes('-Farming') || rules['Farming Primary'])) {
                                        tempNonValid = false;
                                    } else if (!items[plus][source].includes('-Farming') || rules['Farming Primary']) {
                                        tempMultiStepSkill[skill][name] = true;
                                    }
                                });
                                if (Object.keys(nonskill).length > 0) {
                                    !!nonskill && Object.keys(nonskill).filter((skill) => { return !!nonskill[skill] }).forEach(skill => {
                                        Object.keys(nonskill[skill]).filter((src) => { return !!chunkInfo['challenges'][skill][src] && !!chunkInfo['challenges'][skill][src]['Items'] }).forEach(src => {
                                            chunkInfo['challenges'][skill][src]['Items'].forEach(it => {
                                                itemList.push(it);
                                            });
                                        });
                                    });
                                } else if (!tempNonValid) {
                                    if (!tempItemSkill[skill][plus]) {
                                        tempItemSkill[skill][plus] = [];
                                    }
                                    tempItemSkill[skill][plus].push(name);
                                    thingsAdded = true;
                                }
                            });
                        } else {
                            if (!!items && !tools[item.replaceAll(/\*/g, '')] && !!items[item.replaceAll(/\*/g, '')] && (skill !== 'Magic' || !magicTools[item.replaceAll(/\*/g, '')])) {
                                let nonskill = {};
                                let tempNonValid = true;
                                !!items[item.replaceAll(/\*/g, '')] && Object.keys(items[item.replaceAll(/\*/g, '')]).forEach(source => {
                                    if (items[item.replaceAll(/\*/g, '')][source].includes('Nonskill') && !source.includes('*')) {
                                        if (!nonskill['Nonskill']) {
                                            nonskill['Nonskill'] = {};
                                        }
                                        nonskill['Nonskill'][source] = true;
                                    } else if ((!skillNames.includes(items[item.replaceAll(/\*/g, '')][source].split('-')[1]) || rules['Multi Step Processing']) && processingSkill[skill] && !source.includes('*') && processingSkill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]]) {
                                        if (!nonskill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]]) {
                                            nonskill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]] = {};
                                        }
                                        nonskill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]][source] = true;
                                    }
                                    if ((!processingSkill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Multi Step Processing']) && (!items[item.replaceAll(/\*/g, '')][source].includes('-Farming') || rules['Farming Primary'])) {
                                        tempNonValid = false;
                                    } else if (!items[item.replaceAll(/\*/g, '')][source].includes('-Farming') || rules['Farming Primary']) {
                                        tempMultiStepSkill[skill][name] = true;
                                    }
                                });
                                if (Object.keys(nonskill).length > 0) {
                                    !!nonskill && Object.keys(nonskill).filter((skill) => { return !!nonskill[skill] }).forEach(skill => {
                                        Object.keys(nonskill[skill]).filter((src) => { return !!chunkInfo['challenges'][skill][src] && !!chunkInfo['challenges'][skill][src]['Items'] }).forEach(src => {
                                            chunkInfo['challenges'][skill][src]['Items'].forEach(it => {
                                                itemList.push(it);
                                            });
                                        });
                                    });
                                } else if (!tempNonValid) {
                                    if (!tempItemSkill[skill][item.replaceAll(/\*/g, '')]) {
                                        tempItemSkill[skill][item.replaceAll(/\*/g, '')] = [];
                                    }
                                    tempItemSkill[skill][item.replaceAll(/\*/g, '')].push(name);
                                    thingsAdded = true;
                                }
                            }
                        }
                        listDone = itemList.length <= index;
                    };
                    if (!thingsAdded) {
                        //valids[skill][name] = false;
                    }
                }
            } else {
                nonValids[name] = wrongThings;
                if (chunkInfo['challenges'][skill][name].hasOwnProperty('Output') && items.hasOwnProperty(chunkInfo['challenges'][skill][name]['Output'])) {
                    Object.keys(items[chunkInfo['challenges'][skill][name]['Output']]).filter((source) => { return source === name }).forEach(source => {
                        delete items[chunkInfo['challenges'][skill][name]['Output']][source];
                    });
                    if (Object.keys(items[chunkInfo['challenges'][skill][name]['Output']]).length < 1) {
                        delete items[chunkInfo['challenges'][skill][name]['Output']];
                    }
                }
            }
        });
    });
    let tempStorage = [];
    !!tempItemSkill && Object.keys(tempItemSkill).forEach(skill => {
        !!tempItemSkill[skill] && Object.keys(tempItemSkill[skill]).forEach(item => {
            tempStorage = [];
            if (rules["Highest Level"]) {
                !!items[item] && tempItemSkill[skill][item].forEach(name => {
                    valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                });
            } else {
                let lowestItem;
                let lowestName;
                !!items[item] && tempItemSkill[skill][item].forEach(name => {
                    let challenge = chunkInfo['challenges'][skill][name];
                    if (!!challenge && challenge['AlwaysValid']) {
                        tempStorage.push(name);
                    }
                    if (!!challenge && !!challenge['Output']) {
                        if (!extraOutputItems[skill]) {
                            extraOutputItems[skill] = {};
                        }
                        extraOutputItems[skill][name] = challenge['Output'];
                    }
                    if (!lowestItem || lowestItem['Level'] > challenge['Level']) {
                        lowestItem = challenge;
                        lowestName = name;
                    } else if (lowestItem['Level'] === challenge['Level'] && ((!!challenge['Priority'] && (challenge['Priority'] < lowestItem['Priority'])) || !lowestItem['Priority'])) {
                        lowestItem = challenge;
                        lowestName = name;
                    }
                });
                if (!!lowestName) {
                    valids[skill][lowestName] = chunkInfo['challenges'][skill][lowestName]['Level'];
                    if (!tempAlwaysGlobal[skill]) {
                        tempAlwaysGlobal[skill] = {};
                    }
                    if (!tempAlwaysGlobal[skill][lowestName]) {
                        tempAlwaysGlobal[skill][lowestName] = {};
                    }
                    !!tempStorage && tempStorage.forEach(tempName => {
                        tempAlwaysGlobal[skill][lowestName][tempName] = chunkInfo['challenges'][skill][tempName]['Level'];
                    });
                }
            }
        });
        doneTempSkillItems = true;
    });
    // Kill X
    if (rules['Kill X']) {
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        Object.keys(monsters).filter((monster) => { return (!chunkInfo['slayerMonsters'].hasOwnProperty(monster) || (checkPrimaryMethod('Slayer', valids, baseChunkData) && (!slayerLocked || (chunkInfo['slayerMonsters'][monster] <= slayerLocked['level']))) || (!!passiveSkill && passiveSkill.hasOwnProperty('Slayer') && passiveSkill['Slayer'] >= chunkInfo['slayerMonsters'][monster])) && (!backlog['Extra'] || !backlog['Extra']['Kill X ~|' + monster + '|~']) }).sort().forEach(monster => {
            valids['Extra']['Kill X ~|' + monster + '|~'] = 'Kill X';
            if (!chunkInfo['challenges']['Extra']) {
                chunkInfo['challenges']['Extra'] = {};
            }
            chunkInfo['challenges']['Extra']['Kill X ~|' + monster + '|~'] = {
                'Category': ['Kill X'],
                'Monsters': [monster],
                'MonstersDetails': [monster],
                'Label': 'Kill X',
                'Permanent': false
            }
        });
    }
    // Every Drop
    if (rules['Every Drop']) {
        let drops = {};
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        !!completedChallenges['Extra'] && Object.keys(completedChallenges['Extra']).filter((line) => { return line.match(/.*: ~\|.*\|~ \(.*\)/) }).forEach(line => {
            drops[line.split('|')[1]] = true;
        });
        Object.keys(items).filter((item) => { return !!items[item] }).sort().forEach(item => {
            !drops[item] && Object.keys(items[item]).filter((source) => { return (items[item][source].includes('-drop') || items[item][source].includes('-Slayer') || items[item][source].includes('-Thieving')) }).forEach(source => {
                let realSource = source.replaceAll('#', '%2F').replaceAll('.', '%2E');
                if (source.includes('Slay ')) {
                    let monster = chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                    realSource = chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                    Object.keys(chunkInfo['skillItems']['Slayer'][monster]).forEach(drop => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                            !!chunkInfo['skillItems']['Slayer'][monster][drop] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][drop]).forEach(quantityDrop => {
                                Object.keys(dropTables[drop]).filter((item) => { return (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) }).forEach(item => {
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(dropTables[drop][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('/')[1].split('@')[0]), drop.includes('GeneralSeedDropTable'));
                                });
                            });
                        } else {
                            !!chunkInfo['skillItems']['Slayer'][monster][drop] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][drop]).forEach(quantityDrop => {
                                if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster))) {
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][drop] = (chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1].replaceAll('~', '')));
                                }
                            });
                        }
                    });
                }
                if (items[item][source].includes('-Thieving') && chunkInfo['challenges']['Thieving'].hasOwnProperty(source.replaceAll('#', '%2F').replaceAll('.', '%2E')) && chunkInfo['challenges']['Thieving'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')].hasOwnProperty('Output')) {
                    let monster = chunkInfo['challenges']['Thieving'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                    realSource = chunkInfo['challenges']['Thieving'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                    !!chunkInfo['skillItems']['Thieving'][monster] && Object.keys(chunkInfo['skillItems']['Thieving'][monster]).forEach(drop => {
                        !!chunkInfo['skillItems']['Thieving'][monster][drop] && Object.keys(chunkInfo['skillItems']['Thieving'][monster][drop]).forEach(quantityDrop => {
                            if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))) {
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = (chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1].replaceAll('~', '')));
                            }
                        });
                    });
                }
                if (!drops[item] && !!dropRatesGlobal[realSource] && !!dropRatesGlobal[realSource][item] && !dropTables.hasOwnProperty(item) && !item.includes('^')) {
                    drops[item] = true;
                    valids['Extra'][realSource.replaceAll('+', '') + ': ~|' + item.replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~ (' + dropRatesGlobal[realSource][item].replaceAll('/', '%2G').replaceAll('.', '%2E').replaceAll(',', '%2I') + ')'] = 'Every Drop';
                    if (!chunkInfo['challenges']['Extra']) {
                        chunkInfo['challenges']['Extra'] = {};
                    }
                    chunkInfo['challenges']['Extra'][realSource.replaceAll('+', '') + ': ~|' + item.replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~ (' + dropRatesGlobal[realSource][item].replaceAll('/', '%2G').replaceAll('.', '%2E').replaceAll(',', '%2I') + ')'] = {
                        'Category': ['Every Drop'],
                        'Items': [item],
                        'ItemsDetails': [item],
                        'Label': 'Every Drop',
                        'Permanent': false
                    }
                }
            });
        });
    }
    // All Droptables
    if (rules['All Droptables']) {
        let drops = {};
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        !!completedChallenges['Extra'] && Object.keys(completedChallenges['Extra']).filter((line) => { return line.match(/.*: .+ ~\|.*\|~ \(.*\) \(.*\)/) }).forEach(line => {
            if (!drops[line.split(':')[0]]) {
                drops[line.split(':')[0]] = {};
            }
            if (!drops[line.split(':')[0]][line.split('|')[1]]) {
                drops[line.split(':')[0]][line.split('|')[1]] = {};
            }
            drops[line.split(':')[0]][line.split('|')[1]][line.split(' ~')[0].split(': ')[1]] = true;
        });
        Object.keys(items).filter((item) => { return !!items[item] }).sort().forEach(item => {
            Object.keys(items[item]).filter((source) => { return source.includes('Slay ') }).forEach(source => {
                let monster = chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                Object.keys(chunkInfo['skillItems']['Slayer'][monster]).forEach(drop => {
                    if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                        !!chunkInfo['skillItems']['Slayer'][monster][drop] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][drop]).forEach(quantityDrop => {
                            Object.keys(dropTables[drop]).filter((item) => { return (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) }).forEach(item => {
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][item]) {
                                    dropTablesGlobal[monster][item] = {};
                                }
                                !!dropTables[drop][item] && Object.keys(dropTables[drop][item]).forEach(quantity => {
                                    dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : dropTables[drop][item].split('@')[1] * quantity] = findFraction(parseFloat(dropTables[drop][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item][quantity].split('/')[1]), drop.includes('GeneralSeedDropTable'));
                                });
                            });
                        });
                    } else {
                        !!chunkInfo['skillItems']['Slayer'][monster][drop] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][drop]).forEach(quantityDrop => {
                            if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster))) {
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][drop]) {
                                    dropTablesGlobal[monster][drop] = {};
                                }
                                dropTablesGlobal[monster][drop][quantityDrop] = (chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][drop][quantityDrop].split('/')[1].replaceAll('~', '')));
                            }
                        });
                    }
                });
            });
            Object.keys(items[item]).filter((source) => { return items[item][source].includes('-Thieving') && chunkInfo['challenges']['Thieving'].hasOwnProperty(source.replaceAll('#', '%2F').replaceAll('.', '%2E')) && chunkInfo['challenges']['Thieving'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')].hasOwnProperty('Output') }).forEach(source => {
                let monster = chunkInfo['challenges']['Thieving'][source.replaceAll('#', '%2F').replaceAll('.', '%2E')]['Output'];
                !!chunkInfo['skillItems']['Thieving'][monster] && Object.keys(chunkInfo['skillItems']['Thieving'][monster]).forEach(drop => {
                    !!chunkInfo['skillItems']['Thieving'][monster][drop] && Object.keys(chunkInfo['skillItems']['Thieving'][monster][drop]).forEach(quantityDrop => {
                        if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))) {
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantityDrop] = (chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1].replaceAll('~', '')));
                        }
                    });
                });
            });
        });
        Object.keys(dropTablesGlobal).forEach(monster => {
            dropTablesGlobal.hasOwnProperty(monster) && Object.keys(dropTablesGlobal[monster]).filter(item => { return !item.includes('^') }).forEach(item => {
                dropTablesGlobal[monster].hasOwnProperty(item) && Object.keys(dropTablesGlobal[monster][item]).forEach(quantity => {
                    if ((!drops[monster] || !drops[monster][item] || !drops[monster][item][quantity]) && !!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item] && !!dropTablesGlobal[monster][item][quantity] && !dropTables.hasOwnProperty(item)) {
                        if (!drops[monster]) {
                            drops[monster] = {};
                        }
                        if (!drops[monster][item]) {
                            drops[monster][item] = {};
                        }
                        drops[monster][item][quantity] = true;
                        valids['Extra'][monster.replaceAll('+', '') + ': ~|' + item.replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~ (' + (quantity || 'N/A') + ') (' + dropTablesGlobal[monster][item][quantity].replaceAll('/', '%2G').replaceAll('.', '%2E').replaceAll(',', '%2I') + ')'] = 'All Droptables';
                        if (!chunkInfo['challenges']['Extra']) {
                            chunkInfo['challenges']['Extra'] = {};
                        }
                        chunkInfo['challenges']['Extra'][monster.replaceAll('+', '') + ': ~|' + item.replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~ (' + (quantity || 'N/A') + ') (' + dropTablesGlobal[monster][item][quantity].replaceAll('/', '%2G').replaceAll('.', '%2E').replaceAll(',', '%2I') + ')'] = {
                            'Category': ['All Droptables'],
                            'Items': [item],
                            'ItemsDetails': [item],
                            'Monsters': [monster],
                            'MonstersDetails': [monster],
                            'Label': 'All Droptables',
                            'Permanent': false
                        }
                    }
                });
            });
        });
    }

    // All Shops
    if (rules['All Shops']) {
        !!baseChunkData['items'] && Object.keys(baseChunkData['items']).filter(item => { return Object.values(baseChunkData['items'][item]).includes('shop') }).forEach(item => {
            !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return baseChunkData['items'][item][source] === 'shop' }).forEach(source => {
                valids['Extra'][source + ': ~|' + item.replaceAll('*', '').replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~'] = 'All Shops';
                if (!chunkInfo['challenges']['Extra']) {
                    chunkInfo['challenges']['Extra'] = {};
                }
                chunkInfo['challenges']['Extra'][source + ': ~|' + item.replaceAll('*', '').replaceAll('#', '%2F').replaceAll('.', '%2E') + '|~'] = {
                    'Category': ['All Shops'],
                    'Items': [item],
                    'ItemsDetails': [item],
                    'Label': 'All Shops',
                    'Permanent': false
                }
            });
        });
    }
    //console.log(JSON.parse(JSON.stringify(tempItemSkill)));
    console.log(JSON.parse(JSON.stringify(valids)));
    return [valids, tempItemSkill, tempMultiStepSkill];
}

// Checks if skill has primary training
var checkPrimaryMethod = function(skill, valids, baseChunkData) {
    let valid = false;
    let tempValid = false;
    !!universalPrimary[skill] && universalPrimary[skill].forEach(line => {
        let tempTempValid = true;
        if (line === 'Primary+') {
            let primaryValid = !!valids[skill] && Object.keys(valids[skill]).filter((challenge) => { return (((chunkInfo['challenges'][skill][challenge]['Primary'] && (!chunkInfo['challenges'][skill][challenge]['Secondary'])) && (chunkInfo['challenges'][skill][challenge]['Level'] === 1 || (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && passiveSkill[skill] > 1 && chunkInfo['challenges'][skill][challenge]['Level'] <= passiveSkill[skill]) || ((!!skillQuestXp && skillQuestXp.hasOwnProperty(skill) && chunkInfo['challenges'][skill][challenge]['Level'] <= skillQuestXp[skill]['level']))) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) || chunkInfo['challenges'][skill][challenge]['Manual']) && (skill !== 'Smithing' || rules['Smithing by Smelting'] || baseChunkData['objects'].hasOwnProperty('Anvil') || baseChunkData['objects'].hasOwnProperty('Rusted anvil')) }).length > 0;
            !primaryValid && (tempTempValid = false);
        } else if (line === 'Monster+') {
            let monsterExists = !!baseChunkData['monsters'] && Object.keys(baseChunkData['monsters']).length > 0;
            if (!monsterExists) {
                tempTempValid = false;
            }
        } else if (line === 'Bones+') {
            let bonesExists = !!baseChunkData['items'] && boneItems.filter((bone) => { return !!baseChunkData['items'] && Object.keys(baseChunkData['items']).includes(bone) }).length > 0;
            if (!bonesExists) {
                tempTempValid = false;
            }
        } else if (line === 'Combat+') {
            let combatExists = combatSkills.filter((skill2) => { return checkPrimaryMethod(skill2, valids, baseChunkData) }).length > 0;
            if (!combatExists) {
                tempTempValid = false;
            }
        } else if (line === 'Ranged+') {
            let validRanged = false;
            !!baseChunkData['items'] && rangedItems.forEach(set => {
                let innerValid = true;
                set.forEach(item => {
                    if (!!baseChunkData['items'] && !Object.keys(baseChunkData['items']).includes(item.replaceAll(/\*/g, ''))) {
                        innerValid = false;
                    } else if (item.includes('*')) {
                        let tempSecondary = !(!!baseChunkData['items'][item.replaceAll(/\*/g, '')] && Object.keys(baseChunkData['items'][item.replaceAll(/\*/g, '')]).filter((source) => { return (!baseChunkData['items'][item.replaceAll(/\*/g, '')][source].includes('secondary-') && (!processingSkill[baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Wield Crafted Items'])) || (baseChunkData['items'][item.replaceAll(/\*/g, '')][source]['primary-'] && (!processingSkill[baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Wield Crafted Items'])) || baseChunkData['items'][item.replaceAll(/\*/g, '')][source] === 'shop' }).length > 0);
                        tempSecondary && (innerValid = false);
                    }
                });
                innerValid && (validRanged = true);
            });
            let monsterExists = !!baseChunkData['monsters'] && Object.keys(baseChunkData['monsters']).length > 0;
            if (!validRanged || !monsterExists) {
                tempTempValid = false;
            }
        } else {
            tempTempValid = false;
        }
        if (tempTempValid) {
            tempValid = true;
        }
    });
    !universalPrimary[skill] && (tempValid = true);
    if (!!manualTasks[skill] && Object.keys(manualTasks[skill]).length > 0) {
        Object.keys(manualTasks[skill]).forEach(challenge => {
            let primaryValid = false;
            if (((chunkInfo['challenges'][skill][challenge] && chunkInfo['challenges'][skill][challenge]['Primary'] && (!chunkInfo['challenges'][skill][challenge]['Secondary'])) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) || (chunkInfo['challenges'][skill][challenge] && chunkInfo['challenges'][skill][challenge]['Manual'])) {
                if (skill !== 'Smithing' || rules['Smithing by Smelting'] || baseChunkData['objects'].hasOwnProperty('Anvil') || baseChunkData['objects'].hasOwnProperty('Rusted anvil')) {
                    primaryValid = true;
                }
            }
            primaryValid && (tempValid = true);
        });
    }
    valid = tempValid;
    return valid;
}

// Calcs the BIS gear
var calcBIS = function() {
    let combatStyles = ['Melee', 'Ranged', 'Magic'];
    let primarySkill = {};
    skillNames.forEach(skill => {
        primarySkill[skill] = checkPrimaryMethod(skill, globalValids, baseChunkData) || (!!manualTasks[skill] && Object.keys(manualTasks[skill]).length > 0);
    });
    if (rules['Show Best in Slot Prayer Tasks']) {
        combatStyles.push('Prayer');
    }
    if (rules['Show Best in Slot Defensive Tasks']) {
        combatStyles.push('Melee Tank');
        combatStyles.push('Ranged Tank');
        combatStyles.push('Magic Tank');
    }
    if (rules['Show Best in Slot Flinching Tasks']) {
        combatStyles.push('Flinch');
    }
    if (rules['Show Best in Slot Weight Tasks']) {
        combatStyles.push('Weight Reducing');
    }
    if (rules['Show Best in Slot Melee Style Tasks']) {
        combatStyles.splice(combatStyles.indexOf('Melee'), 1, 'Stab', 'Slash', 'Crush');
        if (rules['Show Best in Slot Defensive Tasks']) {
            combatStyles.splice(combatStyles.indexOf('Melee Tank'), 1, 'Stab Tank', 'Slash Tank', 'Crush Tank');
        }
        if (rules['Show Best in Slot Flinching Tasks']) {
            combatStyles.splice(combatStyles.indexOf('Flinch'), 1, 'Stab Flinch', 'Slash Flinch', 'Crush Flinch');
        }
    }
    if (!globalValids['BiS']) {
        globalValids['BiS'] = {};
    }
    let completedEquipment = {};
    !!completedChallenges['BiS'] && Object.keys(completedChallenges['BiS']).forEach(equipLine => {
        let equip = equipLine.split('|')[1].charAt(0).toUpperCase() + equipLine.split('|')[1].slice(1);
        completedEquipment[equip.replaceAll(/\%2J/g, '+')] = chunkInfo['equipment'][equip.replaceAll(/\%2J/g, '+')];
    });
    !!checkedChallenges['BiS'] && Object.keys(checkedChallenges['BiS']).forEach(equipLine => {
        let equip = equipLine.split('|')[1].charAt(0).toUpperCase() + equipLine.split('|')[1].slice(1);
        completedEquipment[equip.replaceAll(/\%2J/g, '+')] = chunkInfo['equipment'][equip.replaceAll(/\%2J/g, '+')];
    });
    let notFresh = {};
    highestOverall = {};
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    combatStyles.forEach(skill => {
        let bestEquipment = {};
        let bestEquipmentAlts = {};
        let bestAmmoSaved = {
            'weapon': null,
            '2h': null
        }
        Object.keys({...completedEquipment, ...chunkInfo['equipment']}).filter(equip => { return !!baseChunkData['items'][equip] }).forEach(equip => {
            if (!!!chunkInfo['equipment'][equip]) {
                console.error(equip + " doesn't exist in data.");
                return;
            }
            let validWearable = true;
            !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                if (!primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) {
                    validWearable = false;
                }
            });
            chunkInfo['taskUnlocks']['Items'].hasOwnProperty(equip) && chunkInfo['taskUnlocks']['Items'][equip].forEach(task => {
                if (!globalValids || !globalValids[Object.values(task)[0]] || !globalValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) {
                    validWearable = false;
                }
            });
            if (validWearable) {
                if (skill === 'Melee') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) > ((Math.max(chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) === ((Math.max(chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((Math.min(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && ((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].attack_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            ((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].attack_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab)) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            ((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].attack_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab)) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Stab') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_stab + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) > ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_stab > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_stab + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) === ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_stab > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_stab >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && (chunkInfo['equipment'][equip].attack_stab > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_stab === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_stab === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Slash') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) > ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_slash > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) === ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_slash > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_slash >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && (chunkInfo['equipment'][equip].attack_slash > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_slash === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_slash === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Crush') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) > ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_crush > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) === ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_crush > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_crush >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && (chunkInfo['equipment'][equip].attack_crush > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_crush === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_crush === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Ranged') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        let bestAmmo = null;
                        Object.keys(chunkInfo['codeItems']['ammoTools']).filter(ammo => { return chunkInfo['codeItems']['ammoTools'][ammo].hasOwnProperty(equip) && !!baseChunkData['items'][ammo] }).forEach(ammo => {
                            if (bestAmmo === null || chunkInfo['equipment'][ammo].ranged_strength > chunkInfo['equipment'][bestAmmo].ranged_strength) {
                                let tempTempValidAmmo = false;
                                Object.keys(baseChunkData['items'][ammo]).forEach(source => {
                                    if (!baseChunkData['items'][ammo][source].includes('-') || !processingSkill[baseChunkData['items'][ammo][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][ammo][source].split('-')[1] === 'Slayer') {
                                        tempTempValidAmmo = true;
                                    }
                                });
                                let articleAmmo = vowels.includes(ammo.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                articleAmmo = ammo.toLowerCase().charAt(ammo.toLowerCase().length - 1) === 's' ? ' ' : articleAmmo;
                                tempTempValidAmmo && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + ammo.toLowerCase() + '|~')) && (bestAmmo = ammo);
                            }
                        });
                        if (!(Object.keys(chunkInfo['codeItems']['ammoTools']).filter(ammo => { return chunkInfo['codeItems']['ammoTools'][ammo].hasOwnProperty(equip) }).length > 0) || bestAmmo !== null) {
                            if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_ranged + chunkInfo['equipment'][equip].ranged_strength + (!!bestAmmo ? chunkInfo['equipment'][bestAmmo].ranged_strength : 0) + 64) / chunkInfo['equipment'][equip].attack_speed) > ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength + (!!bestAmmoSaved[chunkInfo['equipment'][equip].slot] ? chunkInfo['equipment'][bestAmmoSaved[chunkInfo['equipment'][equip].slot]].ranged_strength : 0) + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_ranged > 0) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                                if (!!bestAmmo && tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    let tempTempValidAmmo = false;
                                    Object.keys(baseChunkData['items'][bestAmmo]).forEach(source => {
                                        if (!baseChunkData['items'][bestAmmo][source].includes('-') || !processingSkill[baseChunkData['items'][bestAmmo][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][bestAmmo][source].split('-')[1] === 'Slayer') {
                                            tempTempValidAmmo = true;
                                        }
                                    });
                                    let articleAmmo = vowels.includes(bestAmmo.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                    articleAmmo = bestAmmo.toLowerCase().charAt(bestAmmo.toLowerCase().length - 1) === 's' ? ' ' : articleAmmo;
                                    tempTempValidAmmo && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + bestAmmo.toLowerCase() + '|~')) && (bestAmmoSaved[chunkInfo['equipment'][equip].slot] = bestAmmo);
                                } else if (bestEquipment[chunkInfo['equipment'][equip].slot] === equip) {
                                    delete bestAmmoSaved[chunkInfo['equipment'][equip].slot];
                                }
                            } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_ranged + chunkInfo['equipment'][equip].ranged_strength + (!!bestAmmo ? chunkInfo['equipment'][bestAmmo].ranged_strength : 0) + 64) / chunkInfo['equipment'][equip].attack_speed) === ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength + (!!bestAmmoSaved[chunkInfo['equipment'][equip].slot] ? chunkInfo['equipment'][bestAmmoSaved[chunkInfo['equipment'][equip].slot]].ranged_strength : 0) + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_ranged > 0) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                    if (!!bestAmmo) {
                                        let tempTempValidAmmo = false;
                                        Object.keys(baseChunkData['items'][bestAmmo]).forEach(source => {
                                            if (!baseChunkData['items'][bestAmmo][source].includes('-') || !processingSkill[baseChunkData['items'][bestAmmo][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][bestAmmo][source].split('-')[1] === 'Slayer') {
                                                tempTempValidAmmo = true;
                                            }
                                        });
                                        let articleAmmo = vowels.includes(bestAmmo.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                        articleAmmo = bestAmmo.toLowerCase().charAt(bestAmmo.toLowerCase().length - 1) === 's' ? ' ' : articleAmmo;
                                        if (tempTempValidAmmo && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + bestAmmo.toLowerCase() + '|~'))) {
                                            if (!bestEquipmentAlts[chunkInfo['equipment'][bestAmmo].slot]) {
                                                bestEquipmentAlts[chunkInfo['equipment'][bestAmmo].slot] = {};
                                            }
                                            bestEquipmentAlts[chunkInfo['equipment'][bestAmmo].slot][bestAmmo] = bestAmmoSaved[chunkInfo['equipment'][equip].slot];
                                        }
                                    } else {
                                        delete bestEquipmentAlts['ammo'];
                                    }
                                }
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_ranged >= 0 || chunkInfo['equipment'][equip].ranged_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].ranged_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].ranged_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength) && (chunkInfo['equipment'][equip].attack_ranged > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_ranged)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].ranged_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength) &&
                            (chunkInfo['equipment'][equip].attack_ranged === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_ranged) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].ranged_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength) &&
                            (chunkInfo['equipment'][equip].attack_ranged === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_ranged) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Magic') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].attack_magic > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_magic)) && chunkInfo['equipment'][equip].attack_magic > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].attack_magic === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_magic)) && chunkInfo['equipment'][equip].attack_magic > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_magic >= 0 || chunkInfo['equipment'][equip].magic_damage > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].magic_damage > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic_damage)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].magic_damage === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic_damage) && (chunkInfo['equipment'][equip].attack_magic > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_magic)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].magic_damage === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic_damage) &&
                            (chunkInfo['equipment'][equip].attack_magic === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_magic) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].magic_damage === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic_damage) &&
                            (chunkInfo['equipment'][equip].attack_magic === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_magic) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Prayer') {
                    if (chunkInfo['equipment'][equip].prayer > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].prayer > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].prayer)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (chunkInfo['equipment'][equip].slot === 'ammo') && (bestAmmoSaved['weapon'] = equip);
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (chunkInfo['equipment'][equip].slot === 'ammo') && (bestAmmoSaved['2h'] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].prayer === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].prayer)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Melee Tank') {
                    if (Math.max(chunkInfo['equipment'][equip].defence_crush, chunkInfo['equipment'][equip].defence_slash, chunkInfo['equipment'][equip].defence_stab) > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Stab Tank') {
                    if (chunkInfo['equipment'][equip].defence_stab > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_stab > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_stab === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Slash Tank') {
                    if (chunkInfo['equipment'][equip].defence_slash > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_slash > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_slash === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Crush Tank') {
                    if (chunkInfo['equipment'][equip].defence_crush > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_crush > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_crush === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Ranged Tank') {
                    if (chunkInfo['equipment'][equip].defence_ranged > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_ranged > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_ranged === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Magic Tank') {
                    if (chunkInfo['equipment'][equip].defence_magic > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_magic > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_magic === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Flinch') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0 || chunkInfo['equipment'][equip].slot === 'shield') {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) + chunkInfo['equipment'][equip].melee_strength) > (Math.max(chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength))) && Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) + chunkInfo['equipment'][equip].melee_strength) === (Math.max(chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength))) && Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((Math.min(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && ((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].attack_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            }
                        }
                    }
                } else if (skill === 'Stab Flinch') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0 || chunkInfo['equipment'][equip].slot === 'shield') {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].attack_stab + chunkInfo['equipment'][equip].melee_strength) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength))) && chunkInfo['equipment'][equip].attack_stab > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].attack_stab + chunkInfo['equipment'][equip].melee_strength) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) && chunkInfo['equipment'][equip].attack_stab > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_stab >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && ((chunkInfo['equipment'][equip].attack_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            }
                        }
                    }
                } else if (skill === 'Slash Flinch') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0 || chunkInfo['equipment'][equip].slot === 'shield') {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].melee_strength) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength))) && chunkInfo['equipment'][equip].attack_slash > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].melee_strength) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) && chunkInfo['equipment'][equip].attack_slash > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_slash >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && ((chunkInfo['equipment'][equip].attack_slash) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            }
                        }
                    }
                } else if (skill === 'Crush Flinch') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0 || chunkInfo['equipment'][equip].slot === 'shield') {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].melee_strength) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength))) && chunkInfo['equipment'][equip].attack_crush > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].melee_strength) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) && chunkInfo['equipment'][equip].attack_crush > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_crush >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && ((chunkInfo['equipment'][equip].attack_crush) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                    if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                        tempTempValid = true;
                                    }
                                });
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            }
                        }
                    }
                } else if (skill === 'Weight Reducing') {
                    if (chunkInfo['equipment'][equip].hasOwnProperty('weight')) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].weight < chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].weight)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~')) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].weight === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].weight)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).forEach(source => {
                                if (!baseChunkData['items'][equip][source].includes('-') || !processingSkill[baseChunkData['items'][equip][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) {
                                    tempTempValid = true;
                                }
                            });
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + equip.toLowerCase() + '|~'))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                }
            }
        });
        let twoHPower = 0;
        let weaponShieldPower = 0;
        if (skill === 'Melee') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = (Math.max(chunkInfo['equipment'][bestEquipment['2h']].attack_crush, chunkInfo['equipment'][bestEquipment['2h']].attack_slash, chunkInfo['equipment'][bestEquipment['2h']].attack_stab) + chunkInfo['equipment'][bestEquipment['2h']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['2h']].attack_speed;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = (Math.max((chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['shield']].attack_crush), (chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['shield']].attack_slash), (chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['shield']].attack_stab)) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength) + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                } else {
                    weaponShieldPower = (Math.max(chunkInfo['equipment'][bestEquipment['weapon']].attack_crush, chunkInfo['equipment'][bestEquipment['weapon']].attack_slash, chunkInfo['equipment'][bestEquipment['weapon']].attack_stab) + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                }
            }
        } else if (skill === 'Stab') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = (chunkInfo['equipment'][bestEquipment['2h']].attack_stab + chunkInfo['equipment'][bestEquipment['2h']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['2h']].attack_speed;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['shield']].attack_stab) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength) + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                } else {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                }
            }
        } else if (skill === 'Slash') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = (chunkInfo['equipment'][bestEquipment['2h']].attack_slash + chunkInfo['equipment'][bestEquipment['2h']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['2h']].attack_speed;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['shield']].attack_slash) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength) + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                } else {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                }
            }
        } else if (skill === 'Crush') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = (chunkInfo['equipment'][bestEquipment['2h']].attack_crush + chunkInfo['equipment'][bestEquipment['2h']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['2h']].attack_speed;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['shield']].attack_crush) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength) + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                } else {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                }
            }
        } else if (skill === 'Ranged') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = (chunkInfo['equipment'][bestEquipment['2h']].attack_ranged + chunkInfo['equipment'][bestEquipment['2h']].ranged_strength + (!!bestAmmoSaved['2h'] ? chunkInfo['equipment'][bestAmmoSaved['2h']].ranged_strength : 0) + 64) / chunkInfo['equipment'][bestEquipment['2h']].attack_speed;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['weapon']].attack_ranged + chunkInfo['equipment'][bestEquipment['shield']].attack_ranged) + (chunkInfo['equipment'][bestEquipment['weapon']].ranged_strength + (!!bestAmmoSaved['weapon'] ? chunkInfo['equipment'][bestAmmoSaved['weapon']].ranged_strength : 0) + chunkInfo['equipment'][bestEquipment['shield']].ranged_strength) + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                } else {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_ranged + chunkInfo['equipment'][bestEquipment['weapon']].ranged_strength + (!!bestAmmoSaved['weapon'] ? chunkInfo['equipment'][bestAmmoSaved['weapon']].ranged_strength : 0) + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                }
            }
        } else if (skill === 'Magic') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].attack_magic;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].attack_magic + chunkInfo['equipment'][bestEquipment['shield']].attack_magic;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].attack_magic;
                }
            }
        } else if (skill === 'Prayer') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].prayer;
            }
            if (bestEquipment.hasOwnProperty('weapon') || bestEquipment.hasOwnProperty('shield')) {
                if (bestEquipment.hasOwnProperty('weapon') && !bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].prayer;
                } else if (bestEquipment.hasOwnProperty('shield') && !bestEquipment.hasOwnProperty('weapon')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['shield']].prayer;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].prayer + chunkInfo['equipment'][bestEquipment['shield']].prayer;
                }
            }
        } else if (skill === 'Flinch') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = Math.max(chunkInfo['equipment'][bestEquipment['2h']].attack_crush, chunkInfo['equipment'][bestEquipment['2h']].attack_slash, chunkInfo['equipment'][bestEquipment['2h']].attack_stab) + chunkInfo['equipment'][bestEquipment['2h']].melee_strength;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = Math.max((chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['shield']].attack_crush), (chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['shield']].attack_slash), (chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['shield']].attack_stab)) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength);
                } else {
                    weaponShieldPower = Math.max(chunkInfo['equipment'][bestEquipment['weapon']].attack_crush, chunkInfo['equipment'][bestEquipment['weapon']].attack_slash, chunkInfo['equipment'][bestEquipment['weapon']].attack_stab) + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength;
                }
            }
        } else if (skill === 'Stab Flinch') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].attack_stab + chunkInfo['equipment'][bestEquipment['2h']].melee_strength;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['shield']].attack_stab) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength;
                }
            }
        } else if (skill === 'Slash Flinch') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].attack_slash + chunkInfo['equipment'][bestEquipment['2h']].melee_strength;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['shield']].attack_slash) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength;
                }
            }
        } else if (skill === 'Crush Flinch') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].attack_crush + chunkInfo['equipment'][bestEquipment['2h']].melee_strength;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['shield']].attack_crush) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength;
                }
            }
        } else if (skill === 'Melee Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_crush + chunkInfo['equipment'][bestEquipment['2h']].defence_slash + chunkInfo['equipment'][bestEquipment['2h']].defence_stab;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].defence_crush + chunkInfo['equipment'][bestEquipment['shield']].defence_crush) + (chunkInfo['equipment'][bestEquipment['weapon']].defence_slash + chunkInfo['equipment'][bestEquipment['shield']].defence_slash) + (chunkInfo['equipment'][bestEquipment['weapon']].defence_stab + chunkInfo['equipment'][bestEquipment['shield']].defence_stab);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_crush + chunkInfo['equipment'][bestEquipment['weapon']].defence_slash + chunkInfo['equipment'][bestEquipment['weapon']].defence_stab;
                }
            }
        } else if (skill === 'Stab Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_stab;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_stab + chunkInfo['equipment'][bestEquipment['shield']].defence_stab;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_stab;
                }
            }
        } else if (skill === 'Slash Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_slash;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_slash + chunkInfo['equipment'][bestEquipment['shield']].defence_slash;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_slash;
                }
            }
        } else if (skill === 'Crush Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_crush;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_crush + chunkInfo['equipment'][bestEquipment['shield']].defence_crush;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_crush;
                }
            }
        } else if (skill === 'Ranged Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_ranged;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_ranged + chunkInfo['equipment'][bestEquipment['shield']].defence_ranged;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_ranged;
                }
            }
        } else if (skill === 'Magic Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_magic;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_magic + chunkInfo['equipment'][bestEquipment['shield']].defence_magic;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_magic;
                }
            }
        }
        let tempShield;
        if (twoHPower > weaponShieldPower) {
            tempShield = bestEquipment['shield'];
            delete bestEquipment['weapon'];
            delete bestEquipment['shield'];
            bestEquipment['ammo'] = bestAmmoSaved['2h'];
        } else {
            delete bestEquipment['2h'];
            bestEquipment['ammo'] = bestAmmoSaved['weapon'];
        }
        if (!bestEquipment['ammo'] || bestEquipment['ammo'] === null || bestEquipment['ammo'] === undefined) {
            delete bestEquipment['ammo'];
        }
        let bestDps = -1;
        let resultingAdditions = {};
        let validWearable;
        let tempEquipment;
        let tempWeapons;
        if (skill === 'Melee') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * .6);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * .6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak', 'Tzhaar-ket-em', 'Tzhaar-ket-om'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            let tempValidWearable = false;
            tempWeapons.forEach(weapon => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach(skill => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach(weapon => {
                    if (!bestWeapon || ((Math.max(chunkInfo['equipment'][weapon].attack_crush, chunkInfo['equipment'][weapon].attack_slash, chunkInfo['equipment'][weapon].attack_stab) + chunkInfo['equipment'][weapon].melee_strength + 64) / chunkInfo['equipment'][weapon].attack_speed) > ((Math.max(chunkInfo['equipment'][bestWeapon].attack_crush, chunkInfo['equipment'][bestWeapon].attack_slash, chunkInfo['equipment'][bestWeapon].attack_stab) + chunkInfo['equipment'][bestWeapon].melee_strength + 64) / chunkInfo['equipment'][bestWeapon].attack_speed)) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][bestWeapon].attack_speed * .6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Stab') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'stab': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['stab'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * .6);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['stab'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * .6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            let tempValidWearable = false;
            tempWeapons.forEach(weapon => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach(skill => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach(weapon => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_stab + chunkInfo['equipment'][weapon].melee_strength + 64) / chunkInfo['equipment'][weapon].attack_speed) > ((Math.max(chunkInfo['equipment'][bestWeapon].attack_crush, chunkInfo['equipment'][bestWeapon].attack_slash, chunkInfo['equipment'][bestWeapon].attack_stab) + chunkInfo['equipment'][bestWeapon].melee_strength + 64) / chunkInfo['equipment'][bestWeapon].attack_speed)) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['stab'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][bestWeapon].attack_speed * .6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Slash') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'slash': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['slash'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * .6);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'slash': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['slash'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * .6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            let tempValidWearable = false;
            tempWeapons.forEach(weapon => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach(skill => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach(weapon => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_slash + chunkInfo['equipment'][weapon].melee_strength + 64) / chunkInfo['equipment'][weapon].attack_speed) > ((chunkInfo['equipment'][bestWeapon].attack_slash + chunkInfo['equipment'][bestWeapon].melee_strength + 64) / chunkInfo['equipment'][bestWeapon].attack_speed)) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'slash': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['slash'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][bestWeapon].attack_speed * .6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Crush') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'crush': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['crush'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * .6);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['crush'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * .6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Tzhaar-ket-em', 'Tzhaar-ket-om'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            let tempValidWearable = false;
            tempWeapons.forEach(weapon => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach(skill => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach(weapon => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_crush + chunkInfo['equipment'][weapon].melee_strength + 64) / chunkInfo['equipment'][weapon].attack_speed) > ((chunkInfo['equipment'][bestWeapon].attack_crush + chunkInfo['equipment'][bestWeapon].melee_strength + 64) / chunkInfo['equipment'][bestWeapon].attack_speed)) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['crush'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][bestWeapon].attack_speed * .6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Flinch') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak', 'Tzhaar-ket-em', 'Tzhaar-ket-om'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            let tempValidWearable = false;
            tempWeapons.forEach(weapon => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach(skill => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach(weapon => {
                    if (!bestWeapon || ((Math.max(chunkInfo['equipment'][weapon].attack_crush, chunkInfo['equipment'][weapon].attack_slash, chunkInfo['equipment'][weapon].attack_stab) + chunkInfo['equipment'][weapon].melee_strength + 64)) > ((Math.max(chunkInfo['equipment'][bestWeapon].attack_crush, chunkInfo['equipment'][bestWeapon].attack_slash, chunkInfo['equipment'][bestWeapon].attack_stab) + chunkInfo['equipment'][bestWeapon].melee_strength + 64))) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Stab Flinch') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'stab': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['stab'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['stab'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            let tempValidWearable = false;
            tempWeapons.forEach(weapon => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach(skill => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach(weapon => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_stab + chunkInfo['equipment'][weapon].melee_strength + 64)) > ((Math.max(chunkInfo['equipment'][bestWeapon].attack_crush, chunkInfo['equipment'][bestWeapon].attack_slash, chunkInfo['equipment'][bestWeapon].attack_stab) + chunkInfo['equipment'][bestWeapon].melee_strength + 64))) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['stab'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Slash Flinch') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'slash': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['slash'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'slash': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['slash'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            let tempValidWearable = false;
            tempWeapons.forEach(weapon => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach(skill => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach(weapon => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_slash + chunkInfo['equipment'][weapon].melee_strength + 64)) > ((chunkInfo['equipment'][bestWeapon].attack_slash + chunkInfo['equipment'][bestWeapon].melee_strength + 64))) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'slash': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['slash'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Crush Flinch') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'crush': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['crush'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['crush'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Tzhaar-ket-em', 'Tzhaar-ket-om'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            let tempValidWearable = false;
            tempWeapons.forEach(weapon => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach(skill => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach(weapon => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_crush + chunkInfo['equipment'][weapon].melee_strength + 64)) > ((chunkInfo['equipment'][bestWeapon].attack_crush + chunkInfo['equipment'][bestWeapon].melee_strength + 64))) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach(item => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['crush'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Ranged') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'ranged': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach(slot => { equipment_bonus_att['ranged'] += chunkInfo['equipment'][bestEquipment[slot]].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].ranged_strength });
                let maxHit = Math.floor(.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['ranged'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * .6);
            }
            // Void Ranged
            validWearable = true;
            tempEquipment = ['Void ranger helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void ranger helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                let elite = false;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Elite void top')) {
                    let item = 'Elite void top';
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (tempTempValid) {
                        if (baseChunkData['items'].hasOwnProperty('Elite void robe')) {
                            let item2 = 'Elite void robe';
                            let tempTempTempValid = false;
                            Object.keys(baseChunkData['items'][item2]).forEach(source => {
                                if (!baseChunkData['items'][item2][source].includes('-') || !processingSkill[baseChunkData['items'][item2][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item2][source].split('-')[1] === 'Slayer') {
                                    let article = vowels.includes(item2.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                    article = item2.toLowerCase().charAt(item2.toLowerCase().length - 1) === 's' ? ' ' : article;
                                    (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item2.toLowerCase() + '|~')) && (tempTempTempValid = true);
                                }
                            });
                            if (tempTempTempValid) {
                                let index = itemList.indexOf('Void knight top');
                                if (index > -1) {
                                    itemList.splice(index, 1);
                                }
                                index = itemList.indexOf('Void knight robe');
                                if (index > -1) {
                                    itemList.splice(index, 1);
                                }
                                itemList.push(item);
                                itemList.push(item2);
                                elite = true;
                            }
                        }
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'ranged': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['ranged'] += chunkInfo['equipment'][bestEquipment[slot]].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].ranged_strength } });
                    itemList.forEach(item => { equipment_bonus_att['ranged'] += chunkInfo['equipment'][item].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][item].ranged_strength });
                    let maxHit = Math.floor(.5 + ((elite ? 123.75 : 121) * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor((elite ? 120.375 : 117.7) * (equipment_bonus_att['ranged'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * .6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Amulet of the damned + Karil's
            validWearable = true;
            tempEquipment = ['Amulet of the damned (full)', "Karil's coif", "Karil's crossbow", "Karil's leatherskirt", "Karil's leathertop", 'Bolt rack'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Amulet of the damned (full)', "Karil's coif", "Karil's crossbow", "Karil's leatherskirt", "Karil's leathertop", 'Bolt rack'];
                let slotMapping = {'neck': true, 'head': true, 'weapon': true, 'legs': true, 'body': true, 'ammo': true};
                let allValid = true;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'ranged': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['ranged'] += chunkInfo['equipment'][bestEquipment[slot]].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].ranged_strength } });
                    itemList.forEach(item => { equipment_bonus_att['ranged'] += chunkInfo['equipment'][item].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][item].ranged_strength });
                    let maxHit = Math.floor(Math.floor((.5 + (110 * (equipment_bonus_str + 64) / 640))) * 1.125);
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['ranged'] + 64))) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment']["Karil's crossbow"].attack_speed * .6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Crystal
            validWearable = true;
            tempEquipment = ['Crystal helm', 'Crystal body', 'Crystal legs', 'Crystal bow'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Crystal helm', 'Crystal body', 'Crystal legs', 'Crystal bow'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, '2h': true};
                let allValid = true;
                let weapon = 'Crystal bow';
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Bow of faerdhinen')) {
                    let item2 = 'Bow of faerdhinen';
                    let tempTempTempValid = false;
                    Object.keys(baseChunkData['items'][item2]).forEach(source => {
                        if (!baseChunkData['items'][item2][source].includes('-') || !processingSkill[baseChunkData['items'][item2][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item2][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item2.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item2.toLowerCase().charAt(item2.toLowerCase().length - 1) === 's' ? ' ' : article;
                            !backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item2.toLowerCase() + '|~') && (tempTempTempValid = true);
                        }
                    });
                    if (tempTempTempValid) {
                        let index = itemList.indexOf('Crystal bow');
                        if (index > -1) {
                            itemList.splice(index, 1);
                        }
                        itemList.push(item2);
                        weapon = 'Bow of faerdhinen';
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'ranged': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => { if (!slotMapping[slot]) { equipment_bonus_att['ranged'] += chunkInfo['equipment'][bestEquipment[slot]].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].ranged_strength } });
                    itemList.forEach(item => { equipment_bonus_att['ranged'] += chunkInfo['equipment'][item].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][item].ranged_strength });
                    let maxHit = Math.floor(Math.floor((.5 + (110 * (equipment_bonus_str + 64) / 640))) * 1.15);
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['ranged'] + 64)) * 1.3) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][weapon].attack_speed * .6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Magic') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'magic': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach(slot => {
                    equipment_bonus_att['magic'] += chunkInfo['equipment'][bestEquipment[slot]].attack_magic;
                    equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].magic_damage;
                });
                let maxHit = 2 * (1 + equipment_bonus_str);
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['magic'] + 64));
                let hitChance = 1 - (578 / (2 * maxAttackRoll + 1));
                bestDps = (hitChance * maxHit) / 3;
            }
            // Void Magic
            validWearable = true;
            tempEquipment = ['Void mage helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.forEach(equip => {
                !baseChunkData['items'].hasOwnProperty(equip) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).forEach(skill => {
                    if (!primarySkill[skill]) {
                        validWearable = false;
                    }
                });
            });
            if (validWearable) {
                let itemList = ['Void mage helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                let elite = false;
                itemList.forEach(item => {
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (!tempTempValid) {
                        allValid = false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Elite void top')) {
                    let item = 'Elite void top';
                    let tempTempValid = false;
                    Object.keys(baseChunkData['items'][item]).forEach(source => {
                        if (!baseChunkData['items'][item][source].includes('-') || !processingSkill[baseChunkData['items'][item][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer') {
                            let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                            (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item.toLowerCase() + '|~')) && (tempTempValid = true);
                        }
                    });
                    if (tempTempValid) {
                        if (baseChunkData['items'].hasOwnProperty('Elite void robe')) {
                            let item2 = 'Elite void robe';
                            let tempTempTempValid = false;
                            Object.keys(baseChunkData['items'][item2]).forEach(source => {
                                if (!baseChunkData['items'][item2][source].includes('-') || !processingSkill[baseChunkData['items'][item2][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item2][source].split('-')[1] === 'Slayer') {
                                    let article = vowels.includes(item2.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                    article = item2.toLowerCase().charAt(item2.toLowerCase().length - 1) === 's' ? ' ' : article;
                                    (!backlog['BiS'] || !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item2.toLowerCase() + '|~')) && (tempTempTempValid = true);
                                }
                            });
                            if (tempTempTempValid) {
                                let index = itemList.indexOf('Void knight top');
                                if (index > -1) {
                                    itemList.splice(index, 1);
                                }
                                index = itemList.indexOf('Void knight robe');
                                if (index > -1) {
                                    itemList.splice(index, 1);
                                }
                                itemList.push(item);
                                itemList.push(item2);
                                elite = true;
                            }
                        }
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'magic': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach(slot => {
                        if (!slotMapping[slot]) {
                            equipment_bonus_att['magic'] += chunkInfo['equipment'][bestEquipment[slot]].attack_magic;
                            equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].magic_damage;
                        }
                    });
                    itemList.forEach(item => {
                        equipment_bonus_att['magic'] += chunkInfo['equipment'][item].attack_magic;
                        equipment_bonus_str += chunkInfo['equipment'][item].magic_damage;
                    });
                    let maxHit = 2 * (1 + ((elite ? 2.5 : 0) + equipment_bonus_str));
                    let maxAttackRoll = Math.floor(155 * (equipment_bonus_att['magic'] + 64));
                    let hitChance = 1 - (578 / (2 * maxAttackRoll + 1));
                    let newDps = (hitChance * maxHit) / 3;
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach(item => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        }
        Object.keys(resultingAdditions).forEach(slot => {
            bestEquipment[slot] = resultingAdditions[slot];
            delete bestEquipmentAlts[slot];
        });
        if (bestEquipment.hasOwnProperty('weapon') && bestEquipment.hasOwnProperty('2h')) {
            delete bestEquipment['2h'];
            if (!bestEquipment.hasOwnProperty('shield') && !!tempShield) {
                bestEquipment['shield'] = tempShield;
            }
        }
        Object.keys(bestEquipment).forEach(slot => {
            if (slot === '2h') {
                highestOverall[skill.replaceAll(' ', '_') + '-weapon'] = bestEquipment[slot];
                highestOverall[skill.replaceAll(' ', '_') + '-shield'] = 'N/A';
            } else {
                highestOverall[skill.replaceAll(' ', '_') + '-' + slot] = bestEquipment[slot];
            }
            let article = vowels.includes(bestEquipment[slot].toLowerCase().charAt(0)) ? ' an ' : ' a ';
            article = bestEquipment[slot].toLowerCase().charAt(bestEquipment[slot].toLowerCase().length - 1) === 's' ? ' ' : article;
            if (!!globalValids['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~']) {
                globalValids['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] = skill + '/​' + globalValids['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'];
            } else {
                globalValids['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] = skill + ' BiS ' + slot;
            }
            if (!chunkInfo['challenges']['BiS']) {
                chunkInfo['challenges']['BiS'] = {};
            }
            if (!!chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] && notFresh['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~']) {
                chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] = {
                    'ItemsDetails': [bestEquipment[slot]],
                    'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span>/​' + chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~']['Label']
                }
            } else {
                chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] = {
                    'ItemsDetails': [bestEquipment[slot]],
                    'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span> BiS ' + slot
                }
                notFresh['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'] = true;
            }
        });
        Object.keys(bestEquipmentAlts).forEach(slot => {
            Object.keys(bestEquipmentAlts[slot]).forEach(item => {
                if (!!altChallenges['BiS']) {
                    if ((slot === '2h' && altChallenges['BiS'].hasOwnProperty(skill.replaceAll(' ', '_') + '-weapon') && altChallenges['BiS'][skill.replaceAll(' ', '_') + '-weapon'] === item.toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')) || (altChallenges['BiS'].hasOwnProperty(skill.replaceAll(' ', '_') + '-' + slot) && altChallenges['BiS'][skill.replaceAll(' ', '_') + '-' + slot] === item.toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))) {
                        if (slot === '2h') {
                            highestOverall[skill.replaceAll(' ', '_') + '-weapon'] = item;
                            highestOverall[skill.replaceAll(' ', '_') + '-shield'] = 'N/A';
                        } else {
                            highestOverall[skill.replaceAll(' ', '_') + '-' + slot] = item;
                        }
                    }
                }
                if (bestEquipmentAlts[slot][item] === bestEquipment[slot]) {
                    let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                    article = item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' ? ' ' : article;
                    if (type === 'current') {
                        if (!!globalValids['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~']) {
                            globalValids['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'] = skill + '/​' + globalValids['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'];
                            if (Object.values(highestOverall).includes(item)) {
                                if (slot === '2h') {
                                    highestOverall[skill.replaceAll(' ', '_') + '-weapon'] = item;
                                    highestOverall[skill.replaceAll(' ', '_') + '-shield'] = 'N/A';
                                } else {
                                    highestOverall[skill.replaceAll(' ', '_') + '-' + slot] = item;
                                }
                            }
                        } else {
                            globalValids['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'] = skill + ' BiS ' + slot;
                        }
                    }
                    if (!chunkInfo['challenges']['BiS']) {
                        chunkInfo['challenges']['BiS'] = {};
                    }
                    if (!!chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'] && notFresh['Obtain' + article + '~|' + item.toLowerCase() + '|~']) {
                        chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'] = {
                            'ItemsDetails': [item],
                            'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span>/​' + chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~']['Label']
                        }
                    } else {
                        chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + item.toLowerCase() + '|~'] = {
                            'ItemsDetails': [item],
                            'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span> BiS ' + slot
                        }
                        notFresh['Obtain' + article + '~|' + item.toLowerCase() + '|~'] = true;
                    }
                }
            });
        });
        //console.log(bestEquipment);
    });
}

// Calcs the current challenges to be displayed
var calcCurrentChallenges2 = function() {
    let tempChallengeArr = {};
    let highestChallenge = {};
    let highestChallengeLevelArr = {};
    let highestChallengeLevelBoost = {};
    let realLevel = {};

    Object.keys(globalValids).forEach(skill => {
        realLevel[skill] = [];
        if (skill !== 'Extra' && skill !== 'Quest' && skill !== 'Diary' && skill !== 'BiS') {
            highestChallengeLevelArr[skill] = 0;
            highestChallengeLevelBoost[skill] = 0;
            !!completedChallenges[skill] && Object.keys(completedChallenges[skill]).forEach(name => {
                if (chunkInfo['challenges'][skill].hasOwnProperty(name) && chunkInfo['challenges'][skill][name]['Level'] > (highestChallengeLevelArr[skill] + highestChallengeLevelBoost[skill])) {
                    if (rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && !chunkInfo['challenges'][skill][name].hasOwnProperty('NoBoost')) {
                        let bestBoost = 0;
                        let hasCrystalSaw = false;
                        Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach(boost => {
                            if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                                if (boost !== 'Crystal saw') {
                                    if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string') {
                                        let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                                        let possibleBoost = Math.floor(globalValids[skill][name] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                        possibleBoost = Math.floor((globalValids[skill][name] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                        if (possibleBoost > bestBoost) {
                                            bestBoost = possibleBoost;
                                        }
                                    } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                                        bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                                    }
                                } else if (skill === 'Construction') {
                                    if (chunkInfo['challenges'][skill][name].hasOwnProperty('Items') && chunkInfo['challenges'][skill][name]['Items'].includes('Saw+')) {
                                        hasCrystalSaw = true;
                                    }
                                }
                            }
                        });
                        highestChallengeLevelArr[skill] = chunkInfo['challenges'][skill][name]['Level'] - (bestBoost + (hasCrystalSaw ? 3 : 0));
                        highestChallengeLevelBoost[skill] = bestBoost + (hasCrystalSaw ? 3 : 0);
                        highestOverall[skill] = name + `{${(bestBoost + (hasCrystalSaw ? 3 : 0))}}`;
                    } else {
                        highestChallengeLevelArr[skill] = chunkInfo['challenges'][skill][name]['Level'];
                        highestOverall[skill] = name
                    }
                }
            });
            let isPrimary = true || checkPrimaryMethod(skill, globalValids, baseChunkData);
            Object.keys(globalValids[skill]).forEach(challenge => {
                realLevel[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'];
                if (rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost')) {
                    let bestBoost = 0;
                    let hasCrystalSaw = false;
                    Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach(boost => {
                        if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                            if (boost !== 'Crystal saw') {
                                if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string') {
                                    let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                                    let possibleBoost = Math.floor(globalValids[skill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                    possibleBoost = Math.floor((globalValids[skill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                    if (possibleBoost > bestBoost) {
                                        bestBoost = possibleBoost;
                                    }
                                } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                                    bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                                }
                            } else if (skill === 'Construction') {
                                if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][skill][challenge]['Items'].includes('Saw+')) {
                                    hasCrystalSaw = true;
                                }
                            }
                        }
                    });
                    realLevel[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'] - (bestBoost + (hasCrystalSaw ? 3 : 0));
                }
                if (isPrimary || (manualTasks.hasOwnProperty(skill) && manualTasks[skill].hasOwnProperty(challenge))) {
                    if (globalValids[skill][challenge] !== false && (realLevel[skill][challenge] > highestChallengeLevelArr[skill]) && !chunkInfo['challenges'][skill][challenge]['NeverShow'] && (!completedChallenges[skill] || !completedChallenges[skill].hasOwnProperty(challenge))) {
                        if ((!highestChallenge[skill] || (realLevel[skill][challenge] > realLevel[skill][highestChallenge[skill]])) || ((!highestChallenge[skill] || (realLevel[skill][challenge] === realLevel[skill][highestChallenge[skill]])) && (!highestChallenge[skill] || !chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'] || (!!chunkInfo['challenges'][skill][challenge]['Priority'] && chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'])))) {
                            if (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) {
                                if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                                    let tempValid = true;
                                    Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                                        if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) || (subSkill === 'Slayer' && !!slayerLocked && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) {
                                            tempValid = false;
                                        }
                                    });
                                    if (tempValid) {
                                        highestChallenge[skill] = challenge;
                                    }
                                } else {
                                    highestChallenge[skill] = challenge;
                                }
                            } else if (tempAlwaysGlobal.hasOwnProperty(skill) && tempAlwaysGlobal[skill].hasOwnProperty(challenge)) {
                                Object.keys(tempAlwaysGlobal[skill][challenge]).sort((a, b) => { return a['Level'] - b['Level'] }).forEach(tempChallenge => {
                                    if (!backlog[skill] || !backlog[skill].hasOwnProperty(tempChallenge)) {
                                        if (!!chunkInfo['challenges'][skill][tempChallenge]['Skills']) {
                                            let tempValid = true;
                                            Object.keys(chunkInfo['challenges'][skill][tempChallenge]['Skills']).forEach(subSkill => {
                                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) || (subSkill === 'Slayer' && !!slayerLocked && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) {
                                                    tempValid = false;
                                                }
                                            });
                                            if (tempValid) {
                                                highestChallenge[skill] = tempChallenge;
                                            }
                                        } else {
                                            highestChallenge[skill] = tempChallenge;
                                        }
                                    }
                                });
                            }
                        } else if ((!highestChallenge[skill] || (realLevel[skill][challenge] === realLevel[skill][highestChallenge[skill]])) && (!highestChallenge[skill] || !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Priority') || !chunkInfo['challenges'][skill][highestChallenge[skill]].hasOwnProperty('Priority') || (chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'])) && chunkInfo['challenges'][skill][challenge]['Primary']) {
                            if (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge)) {
                                if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                                    let tempValid = true;
                                    Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                                        if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) || (subSkill === 'Slayer' && !!slayerLocked && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) {
                                            tempValid = false;
                                        }
                                    });
                                    if (tempValid) {
                                        highestChallenge[skill] = challenge;
                                    }
                                } else {
                                    highestChallenge[skill] = challenge;
                                }
                            } else if (tempAlwaysGlobal.hasOwnProperty(skill) && tempAlwaysGlobal[skill].hasOwnProperty(challenge)) {
                                Object.keys(tempAlwaysGlobal[skill][challenge]).sort((a, b) => { return a['Level'] - b['Level'] }).forEach(tempChallenge => {
                                    if (!backlog[skill] || !backlog[skill].hasOwnProperty(tempChallenge)) {
                                        if (!!chunkInfo['challenges'][skill][tempChallenge]['Skills']) {
                                            let tempValid = true;
                                            Object.keys(chunkInfo['challenges'][skill][tempChallenge]['Skills']).forEach(subSkill => {
                                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) || (subSkill === 'Slayer' && !!slayerLocked && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) {
                                                    tempValid = false;
                                                }
                                            });
                                            if (tempValid) {
                                                highestChallenge[skill] = tempChallenge;
                                            }
                                        } else {
                                            highestChallenge[skill] = tempChallenge;
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            });
            (!highestChallenge[skill] || !chunkInfo['challenges'][skill][highestChallenge[skill]] || (realLevel[skill][highestChallenge[skill]] <= 1 && !chunkInfo['challenges'][skill][highestChallenge[skill]]['Primary'])) && (highestChallenge[skill] = undefined);
            tempChallengeArr[skill] = highestChallenge[skill];
            highestCurrent[skill] = highestChallenge[skill];
            if (!!highestChallenge[skill] && !!chunkInfo['challenges'][skill][highestChallenge[skill]] && !!chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills']) {
                Object.keys(chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills']).forEach(subSkill => {
                    if ((!highestChallenge[subSkill] || chunkInfo['challenges'][subSkill][highestChallenge[subSkill]]['Level'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills'][subSkill]) && Object.keys(chunkInfo['challenges'][subSkill]).length > 0 && chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills'][subSkill] > highestChallengeLevelArr[subSkill]) {
                        highestChallenge[subSkill] = highestChallenge[skill];
                        tempChallengeArr[subSkill] = highestChallenge[subSkill];
                        highestCurrent[subSkill] = highestChallenge[subSkill];
                    }
                });
            }
        } else {
            Object.keys(globalValids[skill]).forEach(challenge => {
                if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                    let tempValid = true;
                    Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                        let bestBoost = 0;
                        let hasCrystalSaw = false;
                        if (!!challenge && rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(subSkill) && !chunkInfo['challenges'][subSkill][challenge].hasOwnProperty('NoBoost') && (!completedChallenges[subSkill] || !completedChallenges[subSkill].hasOwnProperty(challenge))) {
                            Object.keys(chunkInfo['codeItems']['boostItems'][subSkill]).forEach(boost => {
                                if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                                    if (boost !== 'Crystal saw') {
                                        if (typeof chunkInfo['codeItems']['boostItems'][subSkill][boost] === 'string') {
                                            let stringSplit = chunkInfo['codeItems']['boostItems'][subSkill][boost].split('%+');
                                            let possibleBoost = Math.floor(globalValids[subSkill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                            possibleBoost = Math.floor((globalValids[subSkill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                                            if (possibleBoost > bestBoost) {
                                                bestBoost = possibleBoost;
                                            }
                                        } else if (chunkInfo['codeItems']['boostItems'][subSkill][boost] > bestBoost) {
                                            bestBoost = chunkInfo['codeItems']['boostItems'][subSkill][boost];
                                        }
                                    } else if (subSkill === 'Construction') {
                                        if (chunkInfo['challenges'][subSkill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][subSkill][challenge]['Items'].includes('Saw+')) {
                                            hasCrystalSaw = true;
                                            chunkInfo['challenges'][subSkill][challenge]['ItemsDetails'].push('Crystal saw');
                                        }
                                    }
                                }
                            });
                        }
                        if ((!checkPrimaryMethod(subSkill, globalValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] < (chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] - (bestBoost + (hasCrystalSaw ? 3 : 0))))) || (subSkill === 'Slayer' && !!slayerLocked && (chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] - (bestBoost + (hasCrystalSaw ? 3 : 0))) > slayerLocked['level'])) {
                            tempValid = false;
                        }
                    });
                    if (!tempValid) {
                        delete globalValids[skill][challenge];
                    }
                }
            });
        }
    });
    Object.keys(tempChallengeArr).forEach(skill => {
        let challenge = tempChallengeArr[skill] || highestOverall[skill];
        !!challenge && (challenge = challenge.split('{')[0]);
        if (!!challenge && rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoBoost') && (!completedChallenges[skill] || !completedChallenges[skill].hasOwnProperty(challenge))) {
            let bestBoost = 0;
            let bestBoostSource;
            let hasCrystalSaw = false;
            Object.keys(chunkInfo['codeItems']['boostItems'][skill]).forEach(boost => {
                if (baseChunkData.hasOwnProperty(boost.includes('~') ? boost.split('~')[1] : 'items') && (baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('#', '%2F')) || baseChunkData[boost.includes('~') ? boost.split('~')[1] : 'items'].hasOwnProperty(boost.split('~')[0].replaceAll('%2F', '#')))) {
                    if (boost !== 'Crystal saw') {
                        if (typeof chunkInfo['codeItems']['boostItems'][skill][boost] === 'string') {
                            let stringSplit = chunkInfo['codeItems']['boostItems'][skill][boost].split('%+');
                            let possibleBoost = Math.floor(globalValids[skill][challenge] * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                            possibleBoost = Math.floor((globalValids[skill][challenge] - possibleBoost) * stringSplit[0] / 100 + parseInt(stringSplit[1]));
                            if (possibleBoost > bestBoost) {
                                bestBoost = possibleBoost;
                                bestBoostSource = boost;
                            }
                        } else if (chunkInfo['codeItems']['boostItems'][skill][boost] > bestBoost) {
                            bestBoost = chunkInfo['codeItems']['boostItems'][skill][boost];
                            bestBoostSource = boost;
                        }
                    } else if (skill === 'Construction') {
                        if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Items') && chunkInfo['challenges'][skill][challenge]['Items'].includes('Saw+')) {
                            hasCrystalSaw = true;
                            chunkInfo['challenges'][skill][challenge]['ItemsDetails'].push('Crystal saw');
                        }
                    }
                }
            });
            if (bestBoost > 0) {
                let foundBetter = false;
                Object.keys(globalValids[skill]).forEach(name => {
                    if (chunkInfo['challenges'][skill].hasOwnProperty(name) && chunkInfo['challenges'][skill][name].hasOwnProperty('NoBoost') && chunkInfo['challenges'][skill][name]['Level'] > (globalValids[skill][challenge] - (bestBoost + (hasCrystalSaw ? 3 : 0))) && (!backlog[skill] || !backlog[skill].hasOwnProperty(name))) {
                        tempChallengeArr[skill] = name;
                        foundBetter = true;
                    }
                });
                if (!foundBetter) {
                    if (highestOverall[skill] !== challenge) {
                        if (!chunkInfo['challenges'][skill][challenge].hasOwnProperty((bestBoostSource.includes('~') ? (bestBoostSource.split('~')[1].charAt(0).toUpperCase() + bestBoostSource.split('~')[1].slice(1)) : 'Items') + 'Details')) {
                            chunkInfo['challenges'][skill][challenge][(bestBoostSource.includes('~') ? (bestBoostSource.split('~')[1].charAt(0).toUpperCase() + bestBoostSource.split('~')[1].slice(1)) : 'Items') + 'Details'] = [];
                        }
                        chunkInfo['challenges'][skill][challenge][(bestBoostSource.includes('~') ? (bestBoostSource.split('~')[1].charAt(0).toUpperCase() + bestBoostSource.split('~')[1].slice(1)) : 'Items') + 'Details'].push(bestBoostSource.replaceAll(/\*/g, ''));
                        tempChallengeArr[skill] = challenge + `{${(bestBoost + (hasCrystalSaw ? 3 : 0))}}`;
                    }
                    highestOverall[skill] = challenge + `{${(bestBoost + (hasCrystalSaw ? 3 : 0))}}`;
                } else if (!!tempChallengeArr[skill]) {
                    highestOverall[skill] = tempChallengeArr[skill];
                    if (!!completedChallenges[skill] && completedChallenges[skill].hasOwnProperty(tempChallengeArr[skill])) {
                        tempChallengeArr[skill] = null;
                    }
                }
            } else if (!!tempChallengeArr[skill]) {
                highestOverall[skill] = tempChallengeArr[skill];
            }
        } else if (!!tempChallengeArr[skill]) {
            highestOverall[skill] = tempChallengeArr[skill];
        }
    });
    !!outputTasks && Object.keys(outputTasks).forEach(skill => {
        !!outputTasks[skill] && Object.keys(outputTasks[skill]).filter(challenge => { return chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Level') && chunkInfo['challenges'][skill].hasOwnProperty(highestOverall[skill].split('{')[0]) && chunkInfo['challenges'][skill][highestOverall[skill].split('{')[0]].hasOwnProperty('Level') && chunkInfo['challenges'][skill][challenge]['Level'] <= chunkInfo['challenges'][skill][highestOverall[skill].split('{')[0]]['Level'] }).forEach(challenge => {
            if (!globalValids.hasOwnProperty(skill)) {
                globalValids[skill] = {};
            }
            globalValids[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'];
        });
    });
    return tempChallengeArr;
}

// Finds gcd
var gcd = function(a, b) {
    if (b < 0.0000001) return a;

    return gcd(b, Math.floor(a % b));
}

// Finds even fraction
var findFraction = function(fraction, isRoundedDenominator) {
    if (isNaN(fraction)) {
        return fraction;
    } else {
        var len = fraction.toString().length - 2;

        var denominator = Math.pow(10, len);
        var numerator = fraction * denominator;

        var divisor = gcd(numerator, denominator);

        numerator /= divisor;
        denominator /= divisor;
        if (isRoundedDenominator) {
            return 1 + '/' + (+(Math.floor(Math.round((denominator/numerator) + "e+2")  + "e-2"))).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        } else {
            return 1 + '/' + (+(Math.round((denominator/numerator) + "e+2")  + "e-2")).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    }
}

// Gathers item/object info on all chunk ids passed in
var gatherChunksInfo = function(chunks) {
    let items = {};
    let objects = {};
    let monsters = {};
    let npcs = {};
    let shops = {};

    !!randomLoot && Object.keys(randomLoot).forEach(item => {
        if (!items[item]) {
            items[item] = {};
        }
        items[item]['Random Event Loot'] = 'secondary-drop';
    });

    !!manualEquipment && Object.keys(manualEquipment).forEach(item => {
        if (!items[item]) {
            items[item] = {};
        }
        items[item]['Manually Added Equipment'] = 'secondary-drop';
    });

    Object.keys(chunks).forEach(num => {
        if (rules['Puro-Puro'] || num !== 'Puro-Puro') {
            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Monster'] && Object.keys(chunkInfo['chunks'][num]['Monster']).forEach(monster => {
                !!chunkInfo['drops'][monster] && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) && Object.keys(chunkInfo['drops'][monster]).forEach(drop => {
                    !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach(quantity => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT']) && drop !== 'GemDropTableLegends+') {
                            Object.keys(dropTables[drop]).forEach(item => {
                                if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                    if (!items[item]) {
                                        items[item] = {};
                                    }
                                    if ((chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always') || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                                        items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                    } else {
                                        items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                    }
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    if (!dropTablesGlobal[monster]) {
                                        dropTablesGlobal[monster] = {};
                                    }
                                    if (!dropTablesGlobal[monster][item]) {
                                        dropTablesGlobal[monster][item] = {};
                                    }
                                    dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : dropTables[drop][item].split('@')[1] * quantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                }
                            });
                        } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                            if (!items[drop]) {
                                items[drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        }
                        if (!!dropTables[drop] && ((drop === 'RareDropTable+' || drop === 'GemDropTable+'|| drop === 'GemDropTableLegends+') && rules['RDT'])) {
                            if (!items[drop]) {
                                items[drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        } 
                    });
                });
            });

            !!manualMonsters && !!manualMonsters['Monsters'] && Object.keys(manualMonsters['Monsters']).forEach(monster => {
                !!chunkInfo['drops'][monster] && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) && Object.keys(chunkInfo['drops'][monster]).forEach(drop => {
                    !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach(quantity => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                            Object.keys(dropTables[drop]).forEach(item => {
                                if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                    if (!items[item]) {
                                        items[item] = {};
                                    }
                                    if (chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always' || (((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'))) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))) {
                                        items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                                    } else {
                                        items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                                    }
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    if (!dropTablesGlobal[monster]) {
                                        dropTablesGlobal[monster] = {};
                                    }
                                    if (!dropTablesGlobal[monster][item]) {
                                        dropTablesGlobal[monster][item] = {};
                                    }
                                    dropTablesGlobal[monster][item][dropTables[drop][item].split('@')[1].includes(' (noted)') ? dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)' : dropTables[drop][item].split('@')[1] * quantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                }
                            });
                        } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                            if (!items[drop]) {
                                items[drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'primary-drop';
                            } else {
                                items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        }
                    });
                });
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Shop'] && Object.keys(chunkInfo['chunks'][num]['Shop']).forEach(shop => {
                !!chunkInfo['shopItems'][shop] && (!backloggedSources['shops'] || !backloggedSources['shops'][shop]) && Object.keys(chunkInfo['shopItems'][shop]).forEach(item => {
                    if ((!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                        if (!items[item]) {
                            items[item] = {};
                        }
                        items[item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')] = 'shop';
                    }
                });
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Spawn'] && Object.keys(chunkInfo['chunks'][num]['Spawn']).forEach(spawn => {
                if (!backloggedSources['items'] || !backloggedSources['items'][spawn]) {
                    if (!items[spawn]) {
                        items[spawn] = {};
                    }
                    items[spawn][num] = rules['Primary Spawns'] ? 'primary-spawn' : 'secondary-spawn';
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Object'] && Object.keys(chunkInfo['chunks'][num]['Object']).forEach(object => {
                if (!backloggedSources['objects'] || !backloggedSources['objects'][object]) {
                    if (!objects[object]) {
                        objects[object] = {};
                    }
                    objects[object][num] = true;
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Monster'] && Object.keys(chunkInfo['chunks'][num]['Monster']).forEach(monster => {
                if (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) {
                    if (!monsters[monster]) {
                        monsters[monster] = {};
                    }
                    monsters[monster][num] = true;
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['NPC'] && Object.keys(chunkInfo['chunks'][num]['NPC']).forEach(npc => {
                if (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc]) {
                    if (!npcs[npc]) {
                        npcs[npc] = {};
                    }
                    npcs[npc][num] = true;
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Shop'] && Object.keys(chunkInfo['chunks'][num]['Shop']).forEach(shop => {
                if (!backloggedSources['shops'] || !backloggedSources['shops'][shop]) {
                    if (!shops[shop]) {
                        shops[shop] = {};
                    }
                    shops[shop][num] = true;
                }
            });
        }
    });

    !!manualMonsters && !!manualMonsters['Items'] && Object.keys(manualMonsters['Items']).forEach(item => {
        if (!backloggedSources['items'] || !backloggedSources['items'][item]) {
            if (!items[item]) {
                items[item] = {};
            }
            items[item]['Manually Added*'] = 'primary-Nonskill';
        }
    });

    !!manualMonsters && !!manualMonsters['Monsters'] && Object.keys(manualMonsters['Monsters']).forEach(monster => {
        if (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) {
            if (!monsters[monster]) {
                monsters[monster] = {};
            }
            monsters[monster]['Manually Added*'] = true;
        }
    });

    !!manualMonsters && !!manualMonsters['NPCs'] && Object.keys(manualMonsters['NPCs']).forEach(npc => {
        if (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc]) {
            if (!npcs[npc]) {
                npcs[npc] = {};
            }
            npcs[npc]['Manually Added*'] = true;
        }
    });

    !!manualMonsters && !!manualMonsters['Objects'] && Object.keys(manualMonsters['Objects']).forEach(object => {
        if (!backloggedSources['objects'] || !backloggedSources['objects'][object]) {
            if (!objects[object]) {
                objects[object] = {};
            }
            objects[object]['Manually Added*'] = true;
        }
    });
    return {items: items, objects: objects, monsters: monsters, npcs: npcs, shops: shops};
}

// Gets all possible chunk areas
var getAllChunkAreas = function(chunks) {
    let i = 0;
    let temp = {};
    let temp2 = {};
    let tempChunks = JSON.parse(JSON.stringify(chunks));
    while (i < Object.keys(tempChunks).length) {
        !!chunkInfo['chunks'][Object.keys(tempChunks)[i]] && !!chunkInfo['chunks'][Object.keys(tempChunks)[i]]['Connect'] && Object.keys(chunkInfo['chunks'][Object.keys(tempChunks)[i]]['Connect']).forEach(id => {
            if (!!chunkInfo['chunks'][parseInt(id)]['Name']) {
                tempChunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
                temp[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = possibleAreas[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] || false;
                if (!!tempChunks[Object.keys(tempChunks)[i]]) {
                    if (!temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
                        temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = {};
                    }
                    temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')][Object.keys(tempChunks)[i]] = true;
                }
            }
            if (!!chunkInfo['chunks'][parseInt(id)]['Name'] && !tempChunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
                if (!chunkInfo['challenges']['Nonskill'] || !chunkInfo['challenges']['Nonskill'][chunkInfo['chunks'][parseInt(id)]['Name']] || Object.keys(chunkInfo['challenges']['Nonskill'][chunkInfo['chunks'][parseInt(id)]['Name']]).length <= 1) {
                    if (temp2.hasOwnProperty(chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')) && Object.keys(temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]).filter(subArea => { chunks.hasOwnProperty(subArea) }).length > 1) {
                        chunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
                    }
                }
            }
        });
        i++;
    }
    possibleAreas = temp;
    areasStructure = temp2;

    !!manualAreas && Object.keys(manualAreas).forEach(area => {
        if (manualAreas[area]) {
            chunks[area] = true;
        } else if (chunks.hasOwnProperty(area)) {
            delete chunks[area];
        }
    });

    return chunks;
}