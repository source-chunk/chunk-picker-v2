/* 
 * Created by Source Chunk
 * Revision of an idea by Amehzyn
 * With help from Slay to Stay for chunk Ids and Amehzyn for smoother zooming/url decoding
 * 07/21/2021
 */

var onMobile = typeof window.orientation !== 'undefined';                       // Is user on a mobile device
var viewOnly = false;                                                           // View only mode active
var isPicking = false;                                                          // Has the user just rolled 2 chunks and is currently picking
var autoSelectNeighbors = false;                                                // Toggle state for select neighbors button
var autoRemoveSelected = false;                                                 // Toggle state for remove selected button
var showChunkIds = false;                                                       // Toggle state for show chunk ids button
var clicked = false;                                                            // Is mouse being held down
var screenshotMode = false;                                                     // Is screenshot mode on
var testMode = false;                                                           // Is test mode on
var settingsOpen = false;                                                       // Is the settings menu open
var roll2On = false;                                                            // Is the roll2 button enabled
var unpickOn = false;                                                           // Is the unpick button enabled
var recentOn = false;                                                           // Is the recent chunks section enabled
var chunkInfoOn = false;                                                        // Is the chunk info panel enabled
var chunkTasksOn = false;                                                       // Is the chunk tasks panel enabled
var infoCollapse = false;                                                       // Is the chunk info panel collapsed
var highscoreEnabled = false;                                                   // Is highscore tracking enabled
var highVisibilityMode = false;                                                 // Is high visibility mode enabled
var recent = [];                                                                // Recently picked chunks
var recentTime = [];                                                            // Recently picked chunks time
var zoom = 350;                                                                 // Starting zoom value
var maxZoom = 550;                                                              // Furthest zoom in value
var minZoom = onMobile ? 275 : 100;                                             // Smallest zoom out value
var fontZoom = 16;                                                              // Font size zoom
var labelZoom = 96;                                                             // Selected label font size zoom
var scale = 30;                                                                 // Amount zoomed every 'zoom' action
var fullSize = 1075;                                                            // Amount of chunks present
var rowSize = 43;                                                               // Amount of chunks per row
var scrollLeft = 0;                                                             // Amount the board is scrolled left offscreen
var prevScrollLeft = 0;                                                         // Amount the board was previously scrolled left offscreen
var scrollTop = 0;                                                              // Amount the board is scrolled up offscreen
var prevScrollTop = 0;                                                          // Amount the board was previously scrolled up offscreen
var clickX;                                                                     // Spot clicked x-value
var clickY;                                                                     // Spot clicked y-value
var chunkInfo = {};                                                             // Data of all chunk info
var infoLockedId = -1;                                                          // Id of chunk locked for info
var userName = '';                                                              // Runescape Username of user

var ratio = 4800 / 8256;                                                        // Image ratio
var movedNum = 0;                                                               // Amount of times mouse is moved while dragging
var selectedNum = 1;                                                            // Current index of selected chunks
var unlockedChunks = 0;                                                         // Number of unlocked chunks
var selectedChunks = 0;                                                         // Number of selected chunks
var startingIndex = 4671;                                                       // Index to start chunk numbering at (based on ChunkLite numbers)
var skip = 213;                                                                 // Number of indices to skip between columns for chunk numbering

var prevValueMid = '';                                                          // Previous value of map id at login
var prevValuePinNew = '';                                                       // Previous value of pin at signup
var prevValuePinOld = '';                                                       // Previous value of pin at login
var prevValueLockPin = '';                                                      // Previous value of pin at map login
var prevValueMid2 = '';                                                         // Previous value of map id at pin change
var prevValuePinOld2 = '';                                                      // Previous value of pin at pin change
var prevValuePinOld2Second = '';                                                // Previous valye of pin 2 at pin change
var mid;                                                                        // Current value of map id
var pin;                                                                        // Current value of pin
var savedPin;                                                                   // Pin saved off from entry

var midGood = false;                                                            // Is the map id valid
var pinGood = true;                                                             // Is the pin valid
var mid2Good = false;                                                           // Is the map id valid (change pin)
var pin2Good = false;                                                           // Is the pin valid (change pin)
var pin2SecondGood = false;                                                     // Is the pin 2 valid (change pin)
var atHome;                                                                     // Is the user on the homepage
var locked;                                                                     // Is the user not logged in
var lockBoxOpen = false;                                                        // Is the lock box open
var inEntry = false;                                                            // Is the entry menu open
var importMenuOpen = false;                                                     // Is the import menu open
var highscoreMenuOpen = false;                                                  // Is the highscores menu open
var helpMenuOpen = false;                                                       // Is the help menu open
var helpMenuOpenSoon = false;                                                   // Will the help menu be opened once logged in
var signedIn = false;                                                           // Is the user signed in
var filterByChecked = false;                                                    // Are we filtering by checked only
var filterByCheckedEquipment = false;                                           // Are we filtering equipment by checked only
var extraOutputItems = {};                                                      // List of extra items obtainable from skill output
var baseChunkData = {};                                                         // Chunk data global list

var activeContextMenuChallenge = null;                                          // Challenge saved of active ellipsis
var activeContextMenuSkill = null;                                              // Skill saved of active ellipsis
var activeContextMenuChallengeOld = null;                                       // Challenge saved of active ellipsis old
var activeContextMenuSkillOld = null;                                           // Skill saved of active ellipsis old

var backlogContextMenuChallenge = null;                                          // Challenge saved of backlog ellipsis
var backlogContextMenuSkill = null;                                              // Skill saved of backlog ellipsis
var backlogContextMenuChallengeOld = null;                                       // Challenge saved of backlog ellipsis old
var backlogContextMenuSkillOld = null;                                           // Skill saved of backlog ellipsis old

var infoPanelVis = {
    monsters: false,
    npcs: false,
    spawns: false,
    shops: false,
    features: false,
    quests: false
};                                                                              // JSON showing state of which chunk info panels are open/closed

var challengePanelVis = {
    active: false,
    areas: false,
    backlog: false,
    completed: false
};                                                                              // JSON showing state of which challenge panels are open/closed

var activeSubTabs = {
    skill: true,
    bis: true,
    quest: true,
    diary: true,
    extra: true
}

var databaseRef = firebase.database().ref();                                    // Firebase database reference
var myRef;                                                                      // Firebase database reference for this map ID

var BASE10 = "0123456789";                                                      // Base 10 alphabet
var BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";  // Base 62 alphabet

const skillNames = [
    "Slayer",
    "Thieving",
    "Attack",
    "Defence",
    "Strength",
    "Hitpoints",
    "Ranged",
    "Prayer",
    "Magic",
    "Farming",
    "Herblore",
    "Hunter",
    "Cooking",
    "Woodcutting",
    "Firemaking",
    "Fletching",
    "Fishing",
    "Mining",
    "Runecraft",
    "Smithing",
    "Crafting",
    "Agility",
    "Construction",
    "Combat"
];                                                                              // Names of all skills
const combatSkills = [
    'Attack',
    'Strength',
    'Defence',
    'Hitpoints',
    'Ranged',
    'Magic',
    'Prayer'
];                                                                              // Names of all combat skills


// Imported data
let boneItems = [];
let rangedItems = [];
let elementalRunes = [];
let itemsPlus = {};
let objectsPlus = {};
let chunksPlus = {};
let monstersPlus = {};
let npcsPlus = {};
let mixPlus = {};
let tools = {};
let magicTools = {};
let dropTables = {};
let elementalStaves = {};

let questLastStep = {};

var hammertime = new Hammer(document.getElementsByClassName('body')[0]);        // Initialize Hammerjs [Mobile]
hammertime.get('pinch').set({ enable: true });

let rules = {
    "Skillcape": false,
    "Rare Drop": false,
    "Pouch": false,
    "InsidePOH": false,
    "Construction Milestone": false,
    "Boss": false,
    "Slayer Equipment": false,
    "Extra implings": false,
    "Normal Farming": false,
    "Raking": false,
    "CoX": false,
    "Tithe Farm": false,
    "Kill X": false,
    "Sorceress's Garden": false,
    "Show Skill Tasks": false,
    "Show Quest Tasks": false,
    "Show Diary Tasks": false,
    "Show Best in Slot Tasks": false,
    "Show Best in Slot Prayer Tasks": false,
    "Show Best in Slot Defensive Tasks": false,
    "Show Best in Slot Flinching Tasks": false,
    "Show Quest Tasks Complete": false,
    "Show Diary Tasks Complete": false,
    "Highest Level": false,
    "BIS Skilling": false,
    "Collection Log": false,
    "Minigame": false,
    "Shortcut Task": false,
    "Shortcut": false,
    "Wield Crafted Items": false,
    "Multi Step Processing": false,
    "Shooting Star": false,
    "Puro-Puro": false,
    "Random Event Loot": false,
    "Manually Add Tasks": false,
    "Collection Log Bosses": false,
    "Collection Log Raids": false,
    "Collection Log Minigames": false,
    "Collection Log Other": false,
    "Herblore Unlocked": false,
    "Farming Primary": false,
    "Tertiary Keys": false,
    "Wandering implings": false,
    "Secondary Primary": false,
    "RDT": false,
    "Untracked Uniques": false,
    "Combat and Teleport Spells": false,
    "Primary Spawns": false,
    "Smithing by Smelting": false,
    "Pets": false,
    "Stuffables": false,
    "Kill X Amount": "1",
    "Rare Drop Amount": "1000",
    "Manually Complete Tasks": false,
    "Every Drop": false,
    "Herblore Unlocked Snake Weed": false,
    "HigherLander": false,
};                                                                              // List of rules and their on/off state

let ruleNames = {
    "Skillcape": "Must obtain skillcapes",
    "Rare Drop": "Chunk tasks only use drops more common than 1/X (set to 0 to include all drops)",
    "Pouch": "Using Runecraft pouches count as chunk tasks",
    "InsidePOH": "Crafting furniture inside a POH can count as a chunk task",
    "Construction Milestone": "Miscellaneous Construction milestones (e.g. House location/style, servants, etc) can count for chunk tasks",
    "Boss": "Killing a boss can be used for a chunk task (item on droptable, Slayer level to kill, etc.)",
    "Slayer Equipment": "Using Slayer equipment can count for chunk tasks",
    "Extra implings": "Include implings that have non-guaranteed spawns in Puro-Puro as chunk tasks",
    "Normal Farming": "Allow normal farming to count as a primary method for training Farming",
    "Raking": "Allow raking patches to count as a primary method for training Farming",
    "CoX": "Allow methods inside the Chambers of Xeric to count for chunk tasks/primary training methods (Fishing, Hunter, Cooking, Woodcutting, etc.)",
    "Tithe Farm": "Allow Tithe Farm to count as a primary method for training Farming",
    "Kill X": "Kill X-amount of every new, unique monster you encounter",
    "Sorceress's Garden": "Allow Sorceress's Garden to count as primary training for training Farming",
    "Show Skill Tasks": "Show Skill Tasks (e.g. Get 43 Crafting to cut a diamond)",
    "Show Quest Tasks": "Show Quest Tasks (coming soon)",//
    "Show Diary Tasks": "Show Diary Tasks (coming soon)",//
    "Show Best in Slot Tasks": "Show Best in Slot (Accuracy + Strength, or secondarily Defense) Tasks",
    "Show Best in Slot Prayer Tasks": "Show Best in Slot Tasks for Prayer-boosting gear",
    "Show Best in Slot Defensive Tasks": "Show Best in Slot Tasks for Tank gear (Melee/Ranged/Magic)",
    "Show Best in Slot Flinching Tasks": "Show Best in Slot Tasks for Flinching weapons (pure offensive stats and strength, no speed)",
    "Show Quest Tasks Complete": "Show Quest Tasks only when the whole quest is completable",//
    "Show Diary Tasks Complete": "Show Diary Tasks only when the whole diary tier (easy, medium, etc.) is completable",//
    "Highest Level": "Require processing skill tasks to be the highest level of processing, rather than the lowest (e.g. must smith a rune bar fully into a platebody rather than just into a dagger)",
    "BIS Skilling": "Must obtain items that are best-in-slot/add quality-of-life for skilling (e.g. Dragon Pickaxe, Angler Outfit, wieldable saw, etc.)",
    "Collection Log": "Must obtain items with slots in the collection log (works in conjuction with the Rare Drop rule and the Boss Drops rule)",
    "Minigame": "Allow items obtained from minigame rewards to count towards chunk tasks",
    "Shortcut Task": "Allow agility shortcuts to count as an Agility skill task",
    "Shortcut": "Allow agility shortcuts to count as a primary method for training Agility",
    "Wield Crafted Items": "Must obtain the level to wield/wear crafted items (e.g. bows, metal armour/weapons, etc.)",
    "Multi Step Processing": "Items must be fully processed, even multiple times within the same skill if needed (e.g. Ore -> Bar -> Smithed Item)",
    "Shooting Star": "Getting the level to mine all tiers of shooting stars count as Mining skill tasks",
    "Puro-Puro": "Allow implings from Puro-Puro & their drops to count towards chunk tasks",
    "Random Event Loot": "Allow any random event rewards/bird nest loot/gems from mining/RareDropTable & GemDropTable obtained to count towards chunk tasks",
    "Manually Add Tasks": "Allow the ability to manually add active chunk tasks (useful if you decide to lamp up a skill to start training it)",
    "Collection Log Bosses": "<b>[Collection log]</b> Obtain items in the 'Bosses' tab",
    "Collection Log Raids": "<b>[Collection log]</b> Obtain items in the 'Raids' tab",
    "Collection Log Minigames": "<b>[Collection log]</b> Obtain items in the 'Minigames' tab",
    "Collection Log Other": "<b>[Collection log]</b> Obtain items in the 'Other' tab",
    "Herblore Unlocked": "Herblore tasks are automatically required once Druidic Ritual is completable",
    "Farming Primary": "Farming products (herbs, vegetables, etc.) can count as primary item sources for chunk tasks",
    "Tertiary Keys": "Allow loot from tertiary slayer keys (brimstone/larran's) to count towards chunk tasks",
    "Wandering implings": "Allow implings that randomly wander the world & their drops to count towards chunk tasks",
    "Secondary Primary": "Allow secondary training methods to count as primary training methods (e.g. allow a 1/50 drop for a bronze bar be your required way to train Smithing)",
    "RDT": "Allow items from the Rare Drop Table and the Gem Drop Table to count towards chunk tasks",
    "Untracked Uniques": "Must obtain extra uniques that are untracked on the collection log (e.g. gardening boots from Farmers)",
    "Combat and Teleport Spells": "Allow all spells to count as possible Magic skill tasks (otherwise only 'utility' spells like High Alchemy or Telegrab will count)",
    "Primary Spawns": "Item spawns count as primary access to an item, and can be used as a primary way to train a skill if needed",
    "Smithing by Smelting": "Smelting ores into bars counts as a primary method for training Smithing",
    "Pets": "Obtaining pets is included in the collection log tasks",
    "Stuffables": "Must obtain stuffable items that can be mounted in the POH (big fish, slayer heads)",
    "Manually Complete Tasks": "<b>For maps that allow manually choosing new chunks</b>, allow the ability to manually move completed active tasks",
    "Every Drop": "Must obtain every monster drop at least once",
    "Herblore Unlocked Snake Weed": "Herblore tasks are required once Druidic Ritual is completable & you have primary access to snake weed (the only primary training for Herblore in the game)",
    "HigherLander": "Accessing the intermediate and veteran landers for Pest Control are required tasks (only novice lander is required otherwise)",
};                                                                              // List of rule definitions

let rulePresets = {
    "Vanilla Chunker": {
        "Rare Drop": true,
        "Boss": true,
        "Show Skill Tasks": true,
        "Show Quest Tasks": true,
        "Show Diary Tasks": true,
        "Show Best in Slot Tasks": true,
        "Show Best in Slot Prayer Tasks": true,
        "Minigame": true,
        "Shortcut Task": true,
        "Shortcut": true,
        "Puro-Puro": true,
        "Combat and Teleport Spells": true,
        "Smithing by Smelting": true,
        "Rare Drop Amount": "0",
    },
    "Xtreme Chunker": {
        "Skillcape": true,
        "Rare Drop": true,
        "Pouch": true,
        "InsidePOH": true,
        "Construction Milestone": true,
        "Boss": true,
        "Slayer Equipment": true,
        "Extra implings": true,
        "Normal Farming": true,
        "Raking": true,
        "CoX": true,
        "Tithe Farm": true,
        "Sorceress's Garden": true,
        "Show Skill Tasks": true,
        "Show Quest Tasks": true,
        "Show Diary Tasks": true,
        "Show Best in Slot Tasks": true,
        "Show Best in Slot Prayer Tasks": true,
        "Highest Level": true,
        "Minigame": true,
        "Shortcut Task": true,
        "Shortcut": true,
        "Wield Crafted Items": true,
        "Multi Step Processing": true,
        "Shooting Star": true,
        "Puro-Puro": true,
        "Random Event Loot": true,
        "Manually Add Tasks": true,
        "Herblore Unlocked": true,
        "Farming Primary": true,
        "Tertiary Keys": true,
        "Wandering implings": true,
        "Secondary Primary": true,
        "Collection Log": true,
        "Collection Log Bosses": true,
        "Collection Log Raids": true,
        "Collection Log Minigames": true,
        "Collection Log Other": true,
        "Untracked Uniques": true,
        "Smithing by Smelting": true,
        "Pets": true,
        "Rare Drop Amount": "0",
    },
};                                                                              // List of rules that are part of each preset

let rulePresetFlavor = {
    "Vanilla Chunker": "AKA the original ruleset",
    "Xtreme Chunker": "AKA Limpwurt's ruleset"
};                                                                              // Preset flavour text

let ruleStructure = {
    "Visible Tasks": {
        "Show Skill Tasks": true,
        "Show Quest Tasks": false,
        "Show Diary Tasks": false,
        "Show Best in Slot Tasks": ["Show Best in Slot Prayer Tasks", "Show Best in Slot Defensive Tasks", "Show Best in Slot Flinching Tasks"]
    },
    "Overall Skill": {
        "Skillcape": true,
        "Highest Level": true,
        "Multi Step Processing": true,
        "Wield Crafted Items": true,
        "Secondary Primary": true,
        "CoX": true
    },
    "Agility": {
        "Shortcut": true,
        "Shortcut Task": true
    },
    "Combat": {
        "HigherLander": true
    },
    "Construction": {
        "InsidePOH": true,
        "Construction Milestone": true
    },
    "Farming": {
        "Normal Farming": true,
        "Raking": true,
        "Tithe Farm": true,
        "Sorceress's Garden": true,
        "Farming Primary": true
    },
    "Herblore": {
        "Herblore Unlocked Snake Weed": true,
        "Herblore Unlocked": true
    },
    "Hunter": {
        "Puro-Puro": ["Extra implings"],
        "Wandering implings": true
    },
    "Magic": {
        "Combat and Teleport Spells": true
    },
    "Mining": {
        "Shooting Star": true
    },
    "Runecraft": {
        "Pouch": true
    },
    "Slayer": {
        "Slayer Equipment": true
    },
    "Smithing": {
        "Smithing by Smelting": true
    },
    "Drops": {
        "Boss": true,
        "Rare Drop": true,
        "RDT": true,
        "Tertiary Keys": true,
        "Primary Spawns": true
    },
    "Miscellaneous": {
        "Minigame": true,
        "Kill X": true,
        "BIS Skilling": true,
        "Collection Log": ["Collection Log Bosses", "Collection Log Raids", "Collection Log Minigames", "Collection Log Other", "Pets"],
        "Untracked Uniques": true,
        "Stuffables": true,
        "Random Event Loot": true,
        "Manually Add Tasks": true,
        "Manually Complete Tasks": true,
        "Every Drop": true
    }
};                                                                              // Structure of rules

let subRuleDefault = {
    "Show Quest Tasks": false,
    "Show Best in Slot Tasks": false,
    "Collection Log": true,
    "Puro-Puro": false
};                                                                              // Default value of sub-rule when parent is checked

let settings = {
    "highvis": false,
    "neighbors": true,
    "remove": false,
    "roll2": false,
    "unpick": false,
    "recent": true,
    "info": true,
    "chunkTasks": true,
    "completedTaskColor": '#0D8219',
    "completedTaskStrikethrough": true,
};                                                                              // Current state of all settings

let settingNames = {
    "highvis": "Display the chunk map with higher visibility, allowing you to see better into locked chunks, with thinner chunk borders, more see-through chunk coloring, and more",
    "neighbors": "After a new chunk is rolled, automatically mark neighboring chunks as rollable",
    "remove": "After a new chunk is rolled, mark all locked chunks as not-rollable",
    "roll2": "Enable the roll 2 button, allowing you to roll two chunks and pick between the two",
    "unpick": "Enable the unpick chunk button, allowing you to unpick, and therefore re-lock, a randomly selected unlocked chunk (useful for forfeits)",
    "recent": "<b>[Recent Chunks]</b> The recent chunks panel shows you the 5 most recently rolled chunks on your map, the dates you rolled them, how long it's been (in days) since your last roll, and more",
    "info": "<b>[Chunk Info]</b> The chunk info panel shows you an array of information on every chunk in the game (monsters, npcs, item spawns, shops, and more). Hint: Right-click a chunk to bring up info on that chunk",
    "chunkTasks": "<b>[Chunk Tasks]</b> The chunk tasks panel shows you an automatically made list of active tasks you need to do to finish your chunk. This is essential for any Chunker to keep track of what needs to get done",
    "completedTaskColor": "Change the color of checked-off chunk tasks",
    "completedTaskStrikethrough": "Cross-off chunk tasks as you complete them"
};                                                                              // Descriptions of the settings

let settingStructure = {
    "Chunk Rolling Alternatives": {
        "roll2": true,
        "unpick": true
    },
    "Chunk Neighbors": {
        "neighbors": true,
        "remove": true
    },
    "Information Panels": {
        "recent": true,
        "info": true,
        "chunkTasks": true
    },
    "Customization": {
        "highvis": true,
        "completedTaskStrikethrough": true,
        "completedTaskColor": true
    }
};                                                                              // Structure of the settings

let settingsStructureConflict = {
    "neighbors": ["remove"],
    "remove": ["neighbors"]
}                                                                               // Rules that conflict with each other and can't both be checked

let maybePrimary = [
    "Normal Farming",
    "Raking",
    "Shortcut"
];                                                                              // Methods that are only primary if their respective rule is checked

let randomLootChoices = [
    "Acorn",
    "Adamant javelin",
    "Agility potion(4)",
    "Air rune",
    "Antipoison(4)",
    "Apple tree seed",
    "Attack potion(4)",
    "Banana tree seed",
    "Beer",
    "Bird nest",
    "Bird's egg",
    "Bronze arrow",
    "Calquat tree seed",
    "Celastrus seed",
    "Chaos rune",
    "Coal",
    "Cosmic talisman",
    "Curry tree seed",
    "Death rune",
    "Defence potion(4)",
    "Diamond",
    "Diamond ring",
    "Dragon med helm",
    "Dragon spear",
    "Dragonfruit tree seed",
    "Dragonstone",
    "Earth rune",
    "Emerald",
    "Emerald ring",
    "Energy potion(4)",
    "Feather",
    "Fire rune",
    "Flax",
    "Gold bar",
    "Gold necklace",
    "Gold ore",
    "Gold ring",
    "Grimy snapdragon",
    "Grimy toadflax",
    "Iron arrow",
    "Kebab",
    "Law rune",
    "Loop half of key",
    "Magic potion(4)",
    "Magic seed",
    "Mahogany seed",
    "Maple seed",
    "Mithril arrowtips",
    "Mithril ore",
    "Nature rune",
    "Nature talisman",
    "Orange tree seed",
    "Palm tree seed",
    "Papaya tree seed",
    "Pineapple seed",
    "Redwood tree seed",
    "Restore potion(4)",
    "Ruby",
    "Ruby ring",
    "Rune 2h sword",
    "Rune arrow",
    "Rune battleaxe",
    "Rune javelin",
    "Rune kiteshield",
    "Rune spear",
    "Rune sq shield",
    "Runite bar",
    "Sapphire",
    "Sapphire ring",
    "Shield left half",
    "Silver ore",
    "Spinach roll",
    "Spirit seed",
    "Stamina potion(4)",
    "Steel arrow",
    "Strength potion(4)",
    "Super attack(4)",
    "Super defence(4)",
    "Super energy(4)",
    "Super restore(4)",
    "Super strength(4)",
    "Teak seed",
    "Tooth half of key",
    "Uncut diamond",
    "Uncut emerald",
    "Uncut ruby",
    "Uncut sapphire",
    "Water rune",
    "Willow seed",
    "Yew seed"
];                                                                              // List of random event and other loot item options

// Tasks structure
let randomLoot = {};
let globalValids = {};
let challengeArr = [];
let checkedChallenges = {};
let backlog = {};
let completedChallenges = {};
let possibleAreas = {}
let areasStructure = {}
let highestCurrent = {};

let universalPrimary = {
    "Slayer": ["Primary+"],
    "Thieving": ["Primary+"],
    "Attack": ["Monster+"],
    "Defence": ["Monster+"],
    "Strength": ["Monster+"],
    "Hitpoints": ["Monster+"],
    "Ranged": ["Ranged+", "Monster+"],
    "Prayer": ["Bones+"],
    "Runecraft": ["Primary+"],
    "Magic": ["Primary+"],
    "Farming": ["Primary+"],
    "Herblore": ["Primary+"],
    "Hunter": ["Primary+"],
    "Cooking": ["Primary+"],
    "Woodcutting": ["Primary+"],
    "Firemaking": ["Primary+"],
    "Fletching": ["Primary+"],
    "Fishing": ["Primary+"],
    "Mining": ["Primary+"],
    "Smithing": ["Primary+"],
    "Crafting": ["Primary+"],
    "Agility": ["Primary+"],
    "Construction": ["Primary+"],
    "Combat": ["Combat+"]
}                                                                               // What is the primary way to train each skill

let processingSkill = {
    "Slayer": false,
    "Thieving": false,
    "Attack": false,
    "Defence": false,
    "Strength": false,
    "Hitpoints": false,
    "Ranged": false,
    "Prayer": false,
    "Runecraft": false,
    "Magic": true,
    "Farming": false,
    "Herblore": true,
    "Hunter": false,
    "Cooking": true,
    "Woodcutting": false,
    "Firemaking": true,
    "Fletching": true,
    "Fishing": false,
    "Mining": false,
    "Smithing": true,
    "Crafting": true,
    "Agility": false,
    "Construction": true,
    "Combat": true
}                                                                               // Is each skill a processing skill

let questUrl = {
    "Below Ice Mountain": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.ogtft4k2r80z",
    "Black Knights' Fortress": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.k2nxnr1kv6h9",
    "Cook's Assistant": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.myywef2ieubh",
    "The Corsair Curse": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.8y9ys139pyme",
    "Demon Slayer": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.qyo4y6mlc3vq",
    "Doric's Quest": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.2saxpsw0v61w",
    "Dragon Slayer 1": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.5f4brbkvkqj6",
    "Ernest the Chicken": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.7ov0wfyp8osz",
    "Goblin Diplomacy": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.v9clg2paatok",
    "Imp Catcher": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.2owbp6esfq72",
    "The Knight's Sword": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.xohm1c449ibl",
    "Misthalin Mystery": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.60q62fza5cu2",
    "Pirate's Treasure": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.me1nkfx10ww8",
    "Prince Ali Rescue": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.qvrd857jdc36",
    "The Restless Ghost": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.knhn2jqafzvu",
    "Romeo and Juliet": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.hoyxk4t922qc",
    "Rune Mysteries": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.4e14ov1br19q",
    "Sheep Shearer": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.r3mg5fpybg4a",
    "Shield of Arrav (Black Arm)": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.i9c0zb1x5oxs",
    "Shield of Arrav (Phoenix Gang)": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.x14j0dchi4a3",
    "Vampyre Slayer": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.r0liv11ys1xp",
    "Witch's Potion": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.3nlcj4jb8l2u",
    "X Marks the Spot": "https://docs.google.com/document/d/1weSK3xoGQiqkYPJL4JYQu_BhxVn2W06kbxuTHYR0s5o/edit#heading=h.o7jnc5ez4das"
};                                                                              // Urls for each quest that point to the Google Doc guide (thanks Nova)

// Misc. modal and task variables
let monsterExists = false;
let questChunks = [];
let manualModalOpen = false;
let manualTasks = {};
let manualEquipment = {};
let fullChallengeArr = {};
let detailsModalOpen = false;
let notesModalOpen = false;
let notesChallenge = null;
let notesSkill = null;
let rulesModalOpen = false;
let settingsModalOpen = false;
let randomModalOpen = false;
let randomListModalOpen = false;
let statsErrorModalOpen = false;
let searchModalOpen = false;
let searchDetailsModalOpen = false;
let highestModalOpen = false;
let methodsModalOpen = false;
let completeModalOpen = false;
let addEquipmentModalOpen = false;
let workerOut = 0;
let gotData = false;
let questPointTotal = 0;
let oldChallengeArr = {};
let futureChunkData = {};
let highestOverall = {};

// Patreon Test Server Data
let onTestServer = false;
let patreonMaps = {
    'test': true, // testing
    'dev': true, // testing
    'src': true, // Source Chunk
    'kaa': true, // Chagohod
    'jlo': true, // JLo
};

// ----------------------------------------------------------

// Event Listeners

// ----------------------------------------------------------

// Recieve message from worker
const myWorker = new Worker("./worker.js?v=4.4.2");
myWorker.onmessage = function(e) {
    workerOut--;
    workerOut < 0 && (workerOut = 0);
    chunkInfo = e.data[3];
    if (e.data[0] === 'future') {
        futureChunkData = e.data[2];
        let challengeStr = calcFutureChallenges2(e.data[1], e.data[2]);
        $('.panel-challenges').html(challengeStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') || 'None');
    } else if (e.data[0] === 'current') {
        globalValids = e.data[1];
        baseChunkData = e.data[2];
        highestCurrent = e.data[4];
        questPointTotal = e.data[6];
        highestOverall = e.data[7];
        calcCurrentChallenges2(e.data[5]);
        searchModalOpen && searchWithinChunks();
        highestModalOpen && openHighest();
    }
}

// Prevent caching of json get
$(document).ready(function() {
    $.ajaxSetup({ cache: false });
});

// Prevent right-click menu from showing
window.addEventListener('contextmenu', function (e) { 
    e.preventDefault();
}, false);

// [Mobile] Mobile equivalent to 'mousedown', starts drag sequence
hammertime.on('panstart', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !methodsModalOpen && !completeModalOpen && !addEquipmentModalOpen) {
        clickX = ev.changedPointers[0].pageX;
        clickY = ev.changedPointers[0].pageY;
    }
});

// [Mobile] Mobile equivalent to 'mouseup', ends drag sequence
hammertime.on('panend', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !methodsModalOpen && !completeModalOpen && !addEquipmentModalOpen) {
        prevScrollLeft = prevScrollLeft + scrollLeft;
        prevScrollTop = prevScrollTop + scrollTop;
    }
});

// [Mobile] Mobile equivalent to 'mousemove', determines amount dragged since last trigger
hammertime.on('panleft panright panup pandown', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !methodsModalOpen && !completeModalOpen && !addEquipmentModalOpen) {
        updateScrollPos(ev.changedPointers[0]);
    }
});

// Once document is loaded, create listeners on page elements
$(document).ready(function() {
    !window.location.href.split('?')[1] && $('.loading').hide();
    checkMID(window.location.href.split('?')[1]);

    $('.mid').on('input', function(e) {
        if ((!/^[a-zA-Z]+$/.test(e.target.value) && e.target.value !== '') || e.target.value.length > 4) {
            $(this).val(prevValueMid);
        } else {
            $(this).val(e.target.value.toUpperCase());
            prevValueMid = e.target.value;
            if (e.target.value.length === 3 || e.target.value.length === 4) {
                midGood = true;
                checkIfGood();
            } else {
                midGood = false;
                $('#access').prop('disabled', true);
            }
        }
    });
    
    $('.pin.new').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 8) {
            $(this).val(prevValuePinNew);
        } else {
            prevValuePinNew = e.target.value;
            if (e.target.value.length >= 4 && e.target.value.length <= 8) {
                $('#create2').prop('disabled', false);
            } else {
                $('#create2').prop('disabled', true);
            }
        }
    });
    
    $('.pin.old').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 8) {
            $(this).val(prevValuePinOld);
        } else {
            prevValuePinOld = e.target.value;
            if ((e.target.value.length >= 4 && e.target.value.length <= 8) || e.target.value.length === 0) {
                pinGood = true;
                checkIfGood();
            } else {
                pinGood = false;
                $('#access').prop('disabled', true);
            }
        }
    });
    
    $('.lock-pin').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 8) {
            $(this).val(prevValueLockPin);
        } else {
            prevValueLockPin = e.target.value;
            if (e.target.value.length >= 4 && e.target.value.length <= 8) {
                $('#lock-unlock').prop('disabled', false);
                $('.lock-pin').removeClass('wrong');
            } else {
                $('#lock-unlock').prop('disabled', true);
            }
        }
    });

    $('.pin.entry').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 8) {
            $(this).val(prevValueLockPin);
        } else {
            prevValueLockPin = e.target.value;
            if (e.target.value.length >= 4 && e.target.value.length <= 8) {
                $('#unlock-entry').prop('disabled', false);
                $('.pin.entry').removeClass('wrong');
            } else {
                $('#unlock-entry').prop('disabled', true);
            }
        }
    });

    $('.mid-old').on('input', function(e) {
        if ((!/^[a-zA-Z]+$/.test(e.target.value) && e.target.value !== '') || e.target.value.length > 4) {
            $(this).val(prevValueMid2);
        } else {
            $(this).val(e.target.value.toUpperCase());
            prevValueMid2 = e.target.value;
            if (e.target.value.length === 3 || e.target.value.length === 4) {
                mid2Good = true;
                checkIfGood2();
            } else {
                mid2Good = false;
                $('#change-pin').prop('disabled', true);
            }
        }
    });
    
    $('.pin.old2.first').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 8) {
            $(this).val(prevValuePinOld2);
        } else {
            prevValuePinOld2 = e.target.value;
            if (e.target.value.length >= 4 && e.target.value.length <= 8) {
                pin2Good = true;
                checkIfGood2();
            } else {
                pin2Good = false;
                $('#change-pin').prop('disabled', true);
            }
        }
    });

    $('.pin.old2.second').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 8) {
            $(this).val(prevValuePinOld2Second);
        } else {
            prevValuePinOld2Second = e.target.value;
            if (e.target.value.length >= 4 && e.target.value.length <= 8) {
                pin2SecondGood = true;
                checkIfGood2();
            } else {
                pin2SecondGood = false;
                $('#change-pin').prop('disabled', true);
            }
        }
    });

    $('.url').on('input', function(e) {
        if (e.target.value.length < 1) {
            $('#import2').prop('disabled', true);
        } else {
            $('#import2').prop('disabled', false);
        }
    });

    $('.username').on('input', function(e) {
        if (e.target.value.length < 1) {
            $('#highscoreoptin').prop('disabled', true);
        } else {
            $('#highscoreoptin').prop('disabled', false);
        }
    });
    
    $('.mid').on('keypress', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13'){
            $('.pin.old').select();
        }
    });
    
    $('.pin.new').on('keypress', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#create2').prop('disabled')) {
            $('#create2').click();	
        }
    });
    
    $('.pin.old').on('keypress', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#access').prop('disabled')) {
            $('#access').click();	
        }
    });
    
    $('.lock-pin').on('keypress', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#lock-unlock').prop('disabled')) {
            $('#lock-unlock').click();	
        }
    });

    $('.pin.entry').on('keypress', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#unlock-entry').prop('disabled')) {
            $('#unlock-entry').click();	
        }
    });

    $('.mid-old').on('keypress', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13'){
            $('.pin.old2.first').select();
        }
    });
    
    $('.pin.old2.first').on('keypress', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            $('.pin.old2.second').select();	
        }
    });
    
    $('.pin.old2.second').on('keypress', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#change-pin').prop('disabled')) {
            $('#change-pin').click();	
        }
    });

    $('.url').on('keypress', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#import2').prop('disabled')) {
            $('#import2').click();	
        }
    });

    $('.username').on('keypress', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' && !$('#highscoreoptin').prop('disabled')) {
            $('#highscoreoptin').click();	
        }
    });

    $('.lock-closed').hover(function () {
        $(this).removeClass('fa-lock').addClass('fa-unlock-alt');
    }, function () {
        $(this).removeClass('fa-unlock-alt').addClass('fa-lock');
    });
});

// Credit to Amehzyn
// Handles zooming
$('.body').on('scroll mousewheel DOMMouseScroll', function(e) {
    if (e.target.className.split(' ').includes('panel') || e.target.className.split(' ').includes('link') || e.target.className.split(' ').includes('noscroll')) {
        $('body').scrollTop(0);
        return;
    } else if (atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || e.target.className.split(' ').includes('noscrollhard')) {
        e.preventDefault();
        return;
    }
    e.preventDefault();
    var imageDiv = document.getElementById("imgDiv");
    // Calculate the direction of scrolling
    var dir;
    if (e.type === 'DOMMouseScroll') {
        if (e.detail < 0) {
            dir = .2;
        } else {
            dir = -.2;
        }
    } else {
        if (e.originalEvent.wheelDelta > 0) {
            dir = .2;
        } else {
            dir = -.2;
        }
    }

    // Set minimum and maximum zoom of map
    var minWidth = Math.floor(0.95 * window.innerWidth);
    var maxWidth = Math.floor(15 * window.innerWidth);
    if (imageDiv.offsetWidth <= minWidth && dir < 0) {
        // Zooming out would do nothing
        return;
    }
    else if (imageDiv.offsetWidth >= maxWidth && dir > 0) {
        // Zooming in would do nothing
        return;
    }
    else if (imageDiv.offsetWidth * (1 + dir) <= minWidth) {
        // Calculate the percent difference between the previous and new width
        dir = (minWidth - imageDiv.offsetWidth) / imageDiv.offsetWidth;
        imageDiv.style.width = minWidth + "px";
    }
    else if (imageDiv.offsetWidth * (1 + dir) >= maxWidth) {
        // Calculate the percent difference between the previous and new width
        dir = (maxWidth - imageDiv.offsetWidth) / imageDiv.offsetWidth;
        imageDiv.style.width = maxWidth + "px";
    }
    else {
        imageDiv.style.width = (imageDiv.offsetWidth * (1 + dir)) + "px";
    }
    
    // Zoom on the mouse position
    zoomOnMouse(e, dir, imageDiv);
    // Fix the location of the map because it could go off-screen
    fixMapEdges(imageDiv);
    labelZoom = $('.box').width();
    fontZoom = $('.box').width() / 6;
    $('.label').css('font-size', labelZoom + 'px');
    $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
    $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
    $('.label.extralong').css('font-size', (labelZoom * (1/2)) + 'px');
    $('.box').css('font-size', fontZoom + 'px');
});

// Prevent arrow key movement
$(document).on({
    'keydown': function(e) {
        if (e.keyCode === 27 && screenshotMode) {
            screenshotMode = false;
            $('.escape-hint').hide();
            $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .topnav, #beta').show();
            if (infoCollapse && chunkInfoOn) {
                $('.menu8').hide();
                $('.hiddenInfo').show();
            } else if (chunkInfoOn) {
                $('.menu8').show();
                $('.hiddenInfo').hide();
            }
            if (chunkTasksOn) {
                $('.menu9').show();
            }
            toggleQuestInfo();
            settingsMenu();
        } else if (e.keyCode === 27 && testMode) {
            testMode = false;
            loadData();
            $('.test-hint').hide();
        } else if ((e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !manualModalOpen && !detailsModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !methodsModalOpen && !completeModalOpen && !notesModalOpen && !addEquipmentModalOpen) {
            e.preventDefault();
        }
    }
});

// Remove recent class from boxes on mouseover
$(document).on('mouseleave', '.recent', function() {
    $(this).removeClass('recent');
});

// Handles dragging and clicks
$(document).on({
    'mousemove': function(e) {
        if (e.button !== 0 || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen) {
            return;
        }
        if (clicked) {
            updateScrollPos(e);
            $('.outer').css('cursor', 'grabbing');
            moved = true;
            movedNum++;
        }
    },
    'mousedown': function(e) {
        if (e.button !== 0 || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen) {
            return;
        }
        clicked = true;
        moved = false;
        movedNum = 0;
        clickX = e.pageX;
        clickY = e.pageY;
    },
    'mouseup': function(e) {
        if (!$(e.target).parents(".active-context-menu").length > 0) {
            activeContextMenuChallengeOld = activeContextMenuChallenge;
            activeContextMenuSkillOld = activeContextMenuSkill;
            activeContextMenuChallenge = null;
            activeContextMenuSkill = null;
            $(".active-context-menu").hide(100);
        }
        if (!$(e.target).parents(".backlog-context-menu").length > 0) {
            backlogContextMenuChallengeOld = backlogContextMenuChallenge;
            backlogContextMenuSkillOld = backlogContextMenuSkill;
            backlogContextMenuChallenge = null;
            backlogContextMenuSkill = null;
            $(".backlog-context-menu").hide(100);
        }
        let tempClicked = clicked;
        if ((e.button !== 0 && e.button !== 2) || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen) {
            return;
        } else if (e.button === 2) {
            if ($(e.target).hasClass('box')) {
                if (infoLockedId === $(e.target).children('.chunkId').text()) {
                    infoLockedId = -1;
                    $(e.target).removeClass('locked');
                    $('.icon').remove();
                } else {
                    $('.box > .chunkId:contains(' + infoLockedId + ')').parent().removeClass('locked');
                    $('.icon').remove();
                    infoLockedId = $(e.target).children('.chunkId').text();
                    $(e.target).addClass('locked').append("<span class='icon'></span>");
                    $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
                }
                updateChunkInfo();
            }
            return;
        }
        clicked = false;
        if (movedNum > 1) {
            prevScrollLeft = prevScrollLeft + scrollLeft;
            prevScrollTop = prevScrollTop + scrollTop;
        } else if ($(e.target).hasClass('box')) {
            if (locked && !testMode) {
                if (!tempClicked) {
                    return;
                }
                $('.outer').css('cursor', 'default');
                if (lockBoxOpen) {
                    closePinBox();
                }
                $('.lock-closed').addClass('animated shake').removeClass('').css({'color': 'rgb(200, 75, 75)'});
                setTimeout(function() {
                    $('.lock-closed').removeClass('animated shake').addClass('').css({'color': 'black'});
                }, 500);
                return;
            } else if (settingsOpen && !screenshotMode) {
                settingsMenu();
                return;
            } else if (checkFalseRules() && chunkTasksOn) {
                helpFunc();
                return;
            }
            if ($(e.target).hasClass('gray')) {
                if (e.ctrlKey) {
                    $(e.target).addClass('blacklisted').removeClass('gray');
                } else {
                    if (selectedNum > 999) {
                        $(e.target).addClass('selected').removeClass('gray').append('<span class="label extralong">' + selectedNum + '</span>');
                        $('.label.extralong').css('font-size', (labelZoom * (1/2)) + 'px');
                    } else if (selectedNum > 99) {
                        $(e.target).addClass('selected').removeClass('gray').append('<span class="label long">' + selectedNum + '</span>');
                        $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
                    } else {
                        $(e.target).addClass('selected').removeClass('gray').append('<span class="label">' + selectedNum + '</span>');
                        $('.label').css('font-size', labelZoom + 'px');
                    }
                    $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
                    selectedNum++;
                    $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
                    if (selectedChunks < 300) {
                        fixNums(99999);
                    }
                }
            } else if ($(e.target).hasClass('selected')) {
                if (selectedChunks < 300) {
                    fixNums($($(e.target).children('.label')).text());
                }
                $(e.target).children('.label').remove();
                $(e.target).addClass('unlocked').removeClass('selected');
                $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
                !onMobile && getChunkAreas();
                !onMobile && setupCurrentChallenges(false);
                !onMobile && setCalculating('.panel-active');
                !onMobile && setCalculating('.panel-areas');
                !onMobile && setCalculating('.panel-completed');
                calcCurrentChallenges();
            } else if ($(e.target).hasClass('potential')) {
                if (selectedChunks < 300) {
                    fixNums($($(e.target).children('.label')).text());
                }
                $(e.target).children('.label').remove();
                $(e.target).addClass('unlocked').removeClass('potential');
                $('.potential > .label').css('color', 'white');
                $('.potential').addClass('selected').removeClass('potential recent');
                autoSelectNeighbors && selectNeighbors(e.target);
                autoRemoveSelected && $('.selected > .label').remove();
                autoRemoveSelected && $('.selected').addClass('gray').removeClass('selected');
                autoRemoveSelected && (selectedChunks = 1);
                autoRemoveSelected && (selectedNum = 1);
                $('.pick').text('Pick Chunk');
                roll2On && $('.roll2').text('Roll 2');
                unpickOn && $('.unpick').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
                isPicking = false;
                $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
                let tempChunk1;
                let tempChunk2;
                let tempChunkTime1;
                let tempChunkTime2;
                if (signedIn && !onTestServer && !testMode) {
                    myRef.child('chunkOrder').child(new Date().getTime()).set((Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex), (error) => {
                        regainConnectivity(() => {
                            myRef.child('chunkOrder').child(new Date().getTime()).set((Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex));
                        });
                    });
                }
                for (let count = 1; count <= 5; count++) {
                    tempChunk1 = recent[count - 1];
                    tempChunkTime1 = recentTime[count - 1];
                    if (count === 1) {
                        recent[count - 1] = (Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex);
                        recentTime[count - 1] = new Date().getTime();
                    } else {
                        recent[count - 1] = tempChunk2;
                        recentTime[count - 1] = tempChunkTime2;
                    }
                    tempChunk2 = tempChunk1;
                    tempChunkTime2 = tempChunkTime1;
                    let tempDate = new Date();
                    tempDate.setTime(recentTime[count - 1]);
                    tempDate > 0 && $('#recentChunks' + count).html('<span class="time">' + tempDate.toDateString().split(' ')[1] + ' ' + tempDate.toDateString().split(' ')[2] + ': </span><span class="chunk' + (recent[count - 1] ? '' : 'none') + '" onclick="recentChunk(recentChunks' + count + ')">' + (recent[count - 1] ? recent[count - 1] : "-") + '</span>');
                    tempDate <= 0 && $('#recentChunks' + count).html('<span class="chunk' + (recent[count - 1] ? '' : 'none') + '" onclick="recentChunk(recentChunks' + count + ')">' + (recent[count - 1] ? recent[count - 1] : "-") + '</span>');
                }
                if (!!recentTime[0]) {
                    $('#recentChunksTitle > b').text(Math.floor((new Date().getTime() - recentTime[0]) / (1000 * 3600 * 24)) + ' days since last roll');
                }
                completeChallenges();
                !onMobile && getChunkAreas();
                !onMobile && setupCurrentChallenges(false);
                !onMobile && setCalculating('.panel-active');
                !onMobile && setCalculating('.panel-areas');
                !onMobile && setCalculating('.panel-completed');
                !onMobile && !activeSubTabs['skill'] && expandActive('skill');
                !onMobile && !activeSubTabs['bis'] && expandActive('bis');
                !onMobile && !activeSubTabs['quest'] && expandActive('quest');
                !onMobile && !activeSubTabs['diary'] && expandActive('diary');
                !onMobile && !activeSubTabs['extra'] && expandActive('extra');
                calcCurrentChallenges();
            } else if ($(e.target).hasClass('recent')) {
                // ----
            } else if ($(e.target).hasClass('blacklisted')) {
                if (e.ctrlKey) {
                    $(e.target).addClass('gray').removeClass('blacklisted');
                }
            } else {
                $(e.target).addClass('gray').removeClass('unlocked').css('border-width', 0);
                $('#chunkInfo1').text('Unlocked chunks: ' + --unlockedChunks);
                !onMobile && getChunkAreas();
                !onMobile && setupCurrentChallenges(false);
                !onMobile && setCalculating('.panel-active');
                !onMobile && setCalculating('.panel-areas');
                !onMobile && setCalculating('.panel-completed');
                calcCurrentChallenges();
            }
            if (isPicking) {
                $('.pick').text('Pick for me');
            } else if (unlockedChunks === 0 && selectedChunks === 0) {
                $('.pick').text('Random Start?');
            } else  {
                $('.pick').text('Pick Chunk');
            }
            setData();
            chunkBorders();
        }
        $('.outer').css('cursor', 'default');
    }
});

// ----------------------------------------------------------

// Button Functions

// ----------------------------------------------------------

// [Mobile] Mobile zoom capabilities
var zoomButton = function(dir) {
    let oldZoom = zoom;
    if (dir > 0) {
        zoom += scale;
        zoom > maxZoom ? zoom = maxZoom : zoom = zoom;
    } else {
        zoom -= scale;
        zoom < minZoom ? zoom = minZoom : zoom = zoom;
    }
    prevScrollLeft = -((zoom/oldZoom) * (-prevScrollLeft + window.innerWidth/2)) + window.innerWidth/2;
    prevScrollTop = -((zoom/oldZoom) * (-prevScrollTop + window.innerHeight/2)) + window.innerHeight/2;
    if (prevScrollLeft > 0) {
        prevScrollLeft = 0;
    }
    if (prevScrollTop > 0) {
        prevScrollTop = 0;
    }
    if (prevScrollLeft - window.innerWidth < -zoom / 100 * window.innerWidth) {
        prevScrollLeft = -(zoom / 100 * window.innerWidth) + window.innerWidth;
    }
    if (prevScrollTop - window.innerHeight < -zoom / 100 * window.innerWidth * ratio) {
        prevScrollTop = -(zoom / 100 * window.innerWidth * ratio) + window.innerHeight;
    }
    $('.img').css({marginLeft: prevScrollLeft, marginTop: prevScrollTop});
    $('.outer').css({marginLeft: prevScrollLeft, marginTop: prevScrollTop});
    $('.img').width(zoom + 'vw');
    $('.outer').width(zoom + 'vw');
    $('.box').css('font-size', fontZoom + 'px');
    $('.label').css('font-size', labelZoom + 'px');
    $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
    $('.label.long').css('font-size', (labelZoom *(2/3)) + 'px');
    $('.label.extralong').css('font-size', (labelZoom *(1/2)) + 'px');
}

// Pick button: picks a random chunk from selected/potential
var pick = function(both) {
    if (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || (unlockedChunks !== 0 && selectedChunks === 0)) {
        return;
    }
    if (checkFalseRules() && chunkTasksOn) {
        helpFunc();
        return;
    }
    var el;
    var rand;
    var sNum;
    let didRandomStart = false;
    if (both && isPicking) {
        for (let temp = 0; temp < 2; temp++) {
            el = $('.potential');
            rand = 0;
            sNum = $($(el[rand]).children('.label')).text();
            if ($('.potential').length <= 0) {
                fixNums(1);
                break;
            }
            $(el[rand]).children('.label').remove();
            $(el[rand]).addClass('unlocked recent').removeClass('potential');
            if (el.length < 300) {
                fixNums(sNum);
            }
            autoSelectNeighbors && selectNeighbors(el[rand]);
            autoRemoveSelected && $('.selected > .label').remove();
            autoRemoveSelected && $('.selected').addClass('gray').removeClass('selected');
            autoRemoveSelected && (selectedChunks = 1);
            autoRemoveSelected && (selectedNum = 1);
            $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
            $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
            scrollToPos(parseInt($(el[rand]).attr('id')) % rowSize, Math.floor(parseInt($(el[rand]).attr('id')) / rowSize), 0, 0, false);
            !showChunkIds && $('.chunkId').hide();
            let tempChunk1;
            let tempChunk2;
            let tempChunkTime1;
            let tempChunkTime2;
            if (signedIn && !onTestServer && !testMode) {
                myRef.child('chunkOrder').child(new Date().getTime()).set(parseInt($(el[rand]).text()), (error) => {
                    regainConnectivity(() => {
                        myRef.child('chunkOrder').child(new Date().getTime()).set(parseInt($(el[rand]).text()));
                    });
                });
            }
            for (let count = 1; count <= 5; count++) {
                tempChunk1 = recent[count - 1];
                tempChunkTime1 = recentTime[count - 1];
                if (count === 1) {
                    recent[count - 1] = parseInt($(el[rand]).text());
                    recentTime[count - 1] = new Date().getTime();
                } else {
                    recent[count - 1] = tempChunk2;
                    recentTime[count - 1] = tempChunkTime2;
                }
                tempChunk2 = tempChunk1;
                tempChunkTime2 = tempChunkTime1;
                let tempDate = new Date();
                tempDate.setTime(recentTime[count - 1]);
                tempDate > 0 && $('#recentChunks' + count).html('<span class="time">' + tempDate.toDateString().split(' ')[1] + ' ' + tempDate.toDateString().split(' ')[2] + ': </span><span class="chunk' + (recent[count - 1] ? '' : 'none') + '" onclick="recentChunk(recentChunks' + count + ')">' + (recent[count - 1] ? recent[count - 1] : "-") + '</span>');
                tempDate <= 0 && $('#recentChunks' + count).html('<span class="chunk' + (recent[count - 1] ? '' : 'none') + '" onclick="recentChunk(recentChunks' + count + ')">' + (recent[count - 1] ? recent[count - 1] : "-") + '</span>');
            }
            if (!!recentTime[0]) {
                $('#recentChunksTitle > b').text(Math.floor((new Date().getTime() - recentTime[0]) / (1000 * 3600 * 24)) + ' days since last roll');
            }
        }
        isPicking = false;
        $('.pick').text('Pick Chunk');
        roll2On && $('.roll2').text('Roll 2');
        unpickOn && $('.unpick').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
        completeChallenges();
        !onMobile && setCalculating('.panel-active');
        !onMobile && setCalculating('.panel-areas');
        !onMobile && setCalculating('.panel-completed');
        !onMobile && !activeSubTabs['skill'] && expandActive('skill');
        !onMobile && !activeSubTabs['bis'] && expandActive('bis');
        !onMobile && !activeSubTabs['quest'] && expandActive('quest');
        !onMobile && !activeSubTabs['diary'] && expandActive('diary');
        !onMobile && !activeSubTabs['extra'] && expandActive('extra');
        calcCurrentChallenges();
        setData();
        chunkBorders();
        if (el.length < 300) {
            fixNums(9999);
        }
        return;
    } else if (unlockedChunks === 0 && selectedChunks === 0) {
        chunkInfo['walkableChunks'].forEach(id => {
            $('.box:contains(' + id + ')').addClass('walkable');
        });
        el = $('.walkable');
        rand = Math.floor(Math.random() * el.length);
        sNum = $($(el[rand]).children('.label')).text();
        selectedChunks++;
        didRandomStart = true;
        $(el[rand]).children('.label').remove();
        $(el[rand]).addClass('unlocked recent').removeClass('gray walkable');
        $('.pick').text('Pick Chunk');
    } else if (!isPicking) {
        el = $('.selected');
        rand = Math.floor(Math.random() * el.length);
        sNum = $($(el[rand]).children('.label')).text();
        $(el[rand]).children('.label').remove();
        $(el[rand]).addClass('unlocked recent').removeClass('selected');
    } else {
        el = $('.potential');
        rand = Math.floor(Math.random() * el.length);
        sNum = $($(el[rand]).children('.label')).text();
        $(el[rand]).children('.label').remove();
        $(el[rand]).addClass('unlocked recent').removeClass('potential');
        $('.potential > .label').css('color', 'white');
        $('.potential').addClass('selected').removeClass('potential recent');
        isPicking = false;
        $('.pick').text('Pick Chunk');
        roll2On && $('.roll2').text('Roll 2');
        unpickOn && $('.unpick').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
    }
    if (el.length < 300) {
        fixNums(sNum);
    }
    autoSelectNeighbors && !didRandomStart && selectNeighbors(el[rand]);
    autoRemoveSelected && $('.selected > .label').remove();
    autoRemoveSelected && $('.selected').addClass('gray').removeClass('selected');
    autoRemoveSelected && (selectedChunks = 1);
    autoRemoveSelected && (selectedNum = 1);
    $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
    $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
    scrollToPos(parseInt($(el[rand]).attr('id')) % rowSize, Math.floor(parseInt($(el[rand]).attr('id')) / rowSize), 0, 0, false);
    !showChunkIds && $('.chunkId').hide();
    let tempChunk1;
    let tempChunk2;
    let tempChunkTime1;
    let tempChunkTime2;
    if (signedIn && !onTestServer && !testMode) {
        myRef.child('chunkOrder').child(new Date().getTime()).set(parseInt($(el[rand]).text()), (error) => {
            regainConnectivity(() => {
                myRef.child('chunkOrder').child(new Date().getTime()).set(parseInt($(el[rand]).text()));
            });
        });
    }
    for (let count = 1; count <= 5; count++) {
        tempChunk1 = recent[count - 1];
        tempChunkTime1 = recentTime[count - 1];
        if (count === 1) {
            recent[count - 1] = parseInt($(el[rand]).text());
            recentTime[count - 1] = new Date().getTime();
        } else {
            recent[count - 1] = tempChunk2;
            recentTime[count - 1] = tempChunkTime2;
        }
        tempChunk2 = tempChunk1;
        tempChunkTime2 = tempChunkTime1;
        let tempDate = new Date();
        tempDate.setTime(recentTime[count - 1]);
        tempDate > 0 && $('#recentChunks' + count).html('<span class="time">' + tempDate.toDateString().split(' ')[1] + ' ' + tempDate.toDateString().split(' ')[2] + ': </span><span class="chunk' + (recent[count - 1] ? '' : 'none') + '" onclick="recentChunk(recentChunks' + count + ')">' + (recent[count - 1] ? recent[count - 1] : "-") + '</span>');
        tempDate <= 0 && $('#recentChunks' + count).html('<span class="chunk' + (recent[count - 1] ? '' : 'none') + '" onclick="recentChunk(recentChunks' + count + ')">' + (recent[count - 1] ? recent[count - 1] : "-") + '</span>');
    }
    if (!!recentTime[0]) {
        $('#recentChunksTitle > b').text(Math.floor((new Date().getTime() - recentTime[0]) / (1000 * 3600 * 24)) + ' days since last roll');
    }
    completeChallenges();
    !onMobile && setCalculating('.panel-active');
    !onMobile && setCalculating('.panel-areas');
    !onMobile && setCalculating('.panel-completed');
    !onMobile && !activeSubTabs['skill'] && expandActive('skill');
    !onMobile && !activeSubTabs['bis'] && expandActive('bis');
    !onMobile && !activeSubTabs['quest'] && expandActive('quest');
    !onMobile && !activeSubTabs['diary'] && expandActive('diary');
    !onMobile && !activeSubTabs['extra'] && expandActive('extra');
    calcCurrentChallenges();
    setData();
    chunkBorders();
}

// Roll 2 button: rolls 2 chunks from all selected chunks
var roll2 = function() {
    if (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || (($('.selected').length < 1 && !isPicking) || ($('.potential').length < 1 && isPicking))) {
        return;
    }
    if (checkFalseRules() && chunkTasksOn) {
        helpFunc();
        return;
    }
    if (isPicking) {
        pick(true);
        return;
    }
    isPicking = true;
    var el = $('.selected');
    var rand;
    if (el.length > 0) {
        $('.unpick').css({'opacity': 0, 'cursor': 'default'}).prop('disabled', true).hide();
        $('.pick').text('Pick for me');
        $('.roll2').text('Unlock both');
    }
    for (var i = 0; i < 2; i++) {
        el = $('.selected');
        rand = Math.floor(Math.random() * el.length);
        $(el[rand]).addClass('potential recent').removeClass('selected');
        $('.potential > .label').css('color', 'black');
    }
    !showChunkIds && $('.chunkId').hide();
    setData();
}

// Toggle functionality for if neighbors are to be selected on chunk pick
var toggleNeighbors = function(value, extra) {
    if (locked && extra !== 'startup') {
        return;
    }
    autoSelectNeighbors = value;
    extra !== 'startup' && !locked && setData();
}

// Toggle functionality for if other selected chunks are set to unlocked after chunk pick
var toggleRemove = function(value, extra) {
    if (locked && extra !== 'startup') {
        return;
    }
    autoRemoveSelected = value;
    extra !== 'startup' && !locked && setData();
}

// Toggle functionality for showing chunk ids
var toggleIds = function() {
    showChunkIds = !showChunkIds;
    setCookies();
    $('#toggleIds').toggleClass('on off');
    if ($('#toggleIds').hasClass('on')) {
        $('.chunkId').show();
        $('#toggleIds').text('ON');
        $('.box').css('color', 'rgba(255, 255, 255, 255)').addClass('quality');
    } else {
        $('.chunkId').hide();
        $('#toggleIds').text('OFF');
        $('.box').css('color', 'rgba(255, 255, 255, 0)').removeClass('quality');
    }
}

// Centers on average position of all unlocked chunks
var center = function(extra) {
    let arr = $('.box.unlocked');
    if (arr.length < 1) {
        scrollToPos(parseInt($('#591').attr('id')) % rowSize, Math.floor(parseInt($('#591').attr('id')) / rowSize), 0, 0, extra === 'quick');
        return;
    }
    let sumX = 0;
    let sumY = 0;
    let num = 0;
    arr.each(function(index) {
        sumX += parseInt($(this).attr('id')) % rowSize;
        sumY += Math.floor(parseInt($(this).attr('id')) / rowSize);
        num++;
    });
    scrollToPos(Math.floor(sumX/num), Math.floor(sumY/num), sumX/num - Math.floor(sumX/num), sumY/num - Math.floor(sumY/num), extra === 'quick');
}

// Opens the lock box
var unlock = function() {
    lockBoxOpen = true;
    $('.lock-box').show();
    $('.lock-closed').hide();
    $('.lock-pin').val('').removeClass('wrong').focus();
}

// Opens the import menu
var importFunc = function() {
    $('#import-menu').show();
    $('.url').focus();
    importMenuOpen = true;
    $('#import-menu').css('opacity', 1).show();
    settingsMenu();
}

// Checks if URL is formatted correctly, then imports it into the map
var importFromURL = function() {
    $('#import2').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    $('.url').removeClass('wrong');
    $('.url-err').css('visibility', 'hidden');
    var url = $('.url').val();
    if (url.split('?')[0] === 'https://gitgeddes.github.io/ChunkPicker/' || url.split('?')[0] === 'gitgeddes.github.io/ChunkPicker/') {
        setTimeout(function() {
            var chunkStrSplit = url.split('?')[1].split(';');
            var unlocked = stringToChunkIndexes(chunkStrSplit[0]);
            var selected = chunkStrSplit[1] ? stringToChunkIndexes(chunkStrSplit[1]) : null;
            $('.box').removeClass('selected potential unlocked recent').addClass('gray').css('border-width', 0);
            $('.label').remove();
            roll2On && $('.roll2').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
            unpickOn && $('.unpick').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
            recentOn && $('.menu7').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
            chunkInfoOn && $('.menu8').css({'opacity': 1}).show();
            chunkTasksOn && $('.menu9').css({'opacity': 1}).show();
            isPicking = false;
            selectedChunks = 0;
            unlockedChunks = 0;
            selectedNum = 1;
            
            $('#chunkInfo1').text('Unlocked chunks: ' + unlockedChunks);
            $('#chunkInfo2').text('Selected chunks: ' + selectedChunks);

            selected && selected.sort(function(a, b){return b-a}).forEach(function(id) {
                while (id.startsWith('0') && id.length > 1) {
                    id = id.substr(1);
                }
                $('#' + id).addClass('selected').removeClass('gray potential unlocked blacklisted').append('<span class="label">' + selectedNum++ + '</span>');
                $('.label').css('font-size', labelZoom + 'px');
                $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
                $('.label.long').css('font-size', (labelZoom *(2/3)) + 'px');
                $('.label.extralong').css('font-size', (labelZoom *(1/2)) + 'px');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            });

            unlocked && unlocked.forEach(function(id) {
                while (id.startsWith('0') && id.length > 1) {
                    id = id.substr(1);
                }
                $('#' + id).addClass('unlocked').removeClass('gray selected potential blacklisted');
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
            });
            !showChunkIds && $('.chunkId').hide();
            for (let count = 1; count <= 5; count++) {
                recent[count - 1] = null;
                recentTime[count - 1] = null;
                $('#recentChunks' + count).html('<span class="chunknone" onclick="recentChunk(recentChunks' + count + ')">-</span>');
            }
            setData();
            chunkBorders();
            $('#import-menu').css({'opacity': 0}).hide();
            $('.import').css('opacity', 0).show();
            $('.import').animate({'opacity': 1});
            if (unlockedChunks === 0 && selectedChunks === 0) {
                $('.pick').text('Random Start?');
            } else {
                $('.pick').text('Pick Chunk');
            }
            calcCurrentChallenges();
            setTimeout(function() {
                $('#import-menu').css('opacity', 1);
                $('#import2').prop('disabled', true).html('Unlock');
                $('.url').val('');
                importMenuOpen = false;
            }, 500);
        }, 1000);
    } else {
        setTimeout(function() {
            $('.url-err').css('visibility', 'visible');
            $('.url').addClass('wrong').select();
            $('#import2').text('Import');
        }, 1000);
    }
}

// Exits the import menu
var exitImportMenu = function() {
    $('#import-menu').css({'opacity': 0}).hide();
    setTimeout(function() {
        $('#import-menu').css('opacity', 1);
        $('#import2').prop('disabled', true).html('Unlock');
        $('.url').val('');
        $('.url').removeClass('wrong');
        $('.url-err').css('visibility', 'hidden');
        importMenuOpen = false;
    }, 500);
}

// Opens the highscores menu
var highscoreFunc = function() {
    $('.username').focus();
    highscoreMenuOpen = true;
    $('#highscore-menu').css('opacity', 1).show();
    settingsMenu();
}

// Sets username for the highscores
var highscoreOptIn = function() {
    $('#highscoreoptin').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    let oldUsername = userName;
    userName = $('.username').val();
    databaseRef.child('highscores/players').once('value', function(snap) {
        if (snap.val().hasOwnProperty(userName.toLowerCase())) {
            $('#myModal9').show();
            $('#highscoreoptin').prop('disabled', true).html('Save Username');
        } else {
            setTimeout(function() {
                setUsername(oldUsername);
                $('.highscoretoggle').text('Change chunk stats username');
                $('#highscore-menu').css({'opacity': 0}).hide();
                $('#highscore-menu2').css({'opacity': 1}).show();
                $('#populateButton').attr({'href': 'https://chunk-stats.web.app/user/' + userName});
                setTimeout(function() {
                    $('#highscore-menu').css('opacity', 1);
                    $('#highscoreoptin').prop('disabled', true).html('Save Username');
                    $('.username').val('');
                }, 500);
            }, 1000);
        }
    });
}

// Exits the highscores menu
var exitHighscoreMenu = function() {
    $('#highscore-menu').css({'opacity': 0}).hide();
    setTimeout(function() {
        $('#highscore-menu').css('opacity', 1);
        $('#highscoreoptin').prop('disabled', true).html('Save Username');
        $('.username').val('');
        highscoreMenuOpen = false;
    }, 500);
}

// Exits the highscores menu2
var exitHighscoreMenu2 = function() {
    $('#highscore-menu2').css({'opacity': 0}).hide();
    setTimeout(function() {
        $('#highscore-menu2').css('opacity', 1);
        $('#highscoreoptin').prop('disabled', true).html('Save Username');
        $('.username').val('');
        highscoreMenuOpen = false;
    }, 500);
}

// Opens the help menu
var helpFunc = function() {
    helpMenuOpen = true;
    $('#help-menu').css('opacity', 1).show();
}

// Exits the help menu
var dismissHelp = function() {
    $('#help-menu').css({'opacity': 0}).hide();
    helpMenuOpen = false;
    helpMenuOpenSoon = false;
    !locked && setData();
}

// Confirms if the pin entered is correct for the current map id
var checkPin = function() {
    savedPin = $('.lock-pin').val();
    myRef.once('value', function(snap) {
        changeLocked();
    });
}

// Confirms if the pin is entered correctly in the entry menu, and acts accordingly
var unlockEntry = function() {
    savedPin = $('.pin.entry').val();
    $('#unlock-entry').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    firebase.auth().fetchSignInMethodsForEmail('sourcechunk+' + mid + '@yandex.com').then((methods) => {
        if (!!methods && methods.length > 0) {
            setTimeout(function() {
                firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                    signedIn = true;
                    $('.center').css('margin-top', '15px');
                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .taskstoggle, .open-rules-container, .highest').css('opacity', 0).show();
                    roll2On && $('.roll2').css('opacity', 0).show();
                    !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                    rules['Manually Add Tasks'] && $('.open-manual-container').css('opacity', 0).show();
                    rules['Random Event Loot'] && $('.open-random-container').css('opacity', 0).show();
                    rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                    $('#entry-menu').animate({'opacity': 0});
                    setTimeout(function() {
                        $('#entry-menu').css('opacity', 1).hide();
                        $('.pin.entry').val('');
                        $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .taskstoggle, .open-rules-container, .highest').animate({'opacity': 1});
                        roll2On && $('.roll2').animate({'opacity': 1});
                        !isPicking && unpickOn && $('.unpick').animate({'opacity': 1});
                        rules['Manually Add Tasks'] && $('.open-manual-container').animate({'opacity': 1});
                        rules['Random Event Loot'] && $('.open-random-container').animate({'opacity': 1});
                        rules['Manually Complete Tasks'] && $('.open-complete-container').animate({'opacity': 1});
                        $('#unlock-entry').prop('disabled', false).html('Unlock');
                        locked = false;
                        inEntry = false;
                        helpMenuOpenSoon && helpFunc();
                        !onMobile && unlockChallenges();
                    }, 500);
                }).catch((error) => {
                    $('.pin.entry').addClass('animated shake wrong').select();
                    $('#unlock-entry').prop('disabled', true).html('Unlock');
                });
                setTimeout(function() {
                    $('.pin.entry').removeClass('animated shake');
                }, 500);
            }, 1000);
        } else {
            myRef.once('value', function(snap) {
                if ((snap.val() && snap.val()['pin'] === savedPin)) {
                    setTimeout(function() {
                        firebase.auth().createUserWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                            signedIn = true;
                            myRef.child('uid').set(userCredential.user.uid, function(error) {
                                if (error) {
                                    regainConnectivity(() => {
                                        myRef.child('pin').remove();
                                    });
                                } else {
                                    myRef.child('pin').remove();
                                }
                            });
                            userCredential.user.updateProfile({
                                displayName: mid
                            });
                            $('.center').css('margin-top', '15px');
                            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .taskstoggle, .open-rules-container, .highest').css('opacity', 0).show();
                            roll2On && $('.roll2').css('opacity', 0).show();
                            !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                            rules['Manually Add Tasks'] && $('.open-manual-container').css('opacity', 0).show();
                            rules['Random Event Loot'] && $('.open-random-container').css('opacity', 0).show();
                            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                            $('#entry-menu').animate({'opacity': 0});
                            setTimeout(function() {
                                $('#entry-menu').css('opacity', 1).hide();
                                $('.pin.entry').val('');
                                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .taskstoggle, .open-rules-container, .highest').animate({'opacity': 1});
                                roll2On && $('.roll2').animate({'opacity': 1});
                                !isPicking && unpickOn && $('.unpick').animate({'opacity': 1});
                                rules['Manually Add Tasks'] && $('.open-manual-container').animate({'opacity': 1});
                                rules['Random Event Loot'] && $('.open-random-container').animate({'opacity': 1});
                                rules['Manually Complete Tasks'] && $('.open-complete-container').animate({'opacity': 1});
                                $('#unlock-entry').prop('disabled', false).html('Unlock');
                                locked = false;
                                inEntry = false;
                                helpMenuOpenSoon && helpFunc();
                                !onMobile && unlockChallenges();
                            }, 500);
                        }).catch((error) => {
                            $('.pin.entry').addClass('animated shake wrong').select();
                            $('#unlock-entry').prop('disabled', true).html('Unlock');
                        });
                    }, 1000);
                    setTimeout(function() {
                        $('.pin.entry').removeClass('animated shake');
                    }, 500);
                } else {
                    setTimeout(function() {
                        $('.pin.entry').addClass('animated shake wrong').select();
                        $('#unlock-entry').prop('disabled', true).html('Unlock');
                        setTimeout(function() {
                            $('.pin.entry').removeClass('animated shake');
                        }, 500);
                    }, 1000);
                }
            });
        }
    });
}

// Hides the entry menu and displays map in locked mode
var proceed = function() {
    $('#entry-menu').animate({'opacity': 0});
    $('.lock-closed').css('opacity', 0).show();
    setTimeout(function() {
        $('#entry-menu').css('opacity', 1).hide();
        !viewOnly ? $('.lock-closed').animate({'opacity': 1}) : $('.lock-closed').hide();
        $('#unlock-entry').prop('disabled', false).html('Unlock');
        locked = true;
        inEntry = false;
    }, 500);
}

// On the home page, advances to the next screen
var nextPage = function(page) {
    if (page === 'create') {
        $('#create2').prop('disabled', true);
        $('#page1, #page1extra').hide();
        $('#page2a').show();
        $('.pin').focus();
    } else if (page === 'create2') {
        $('#create2').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
        pin = $('.pin.new').val();
        setTimeout(function() {
            $('#page2a').hide();
            $('#page3a').show();
        }, 500);
        !mid && rollMID();
    } else if (page === 'mid') {
        midGood = false;
        pinGood = true;
        $('#access').prop('disabled', true);
        $('#page1, #page1extra').hide();
        $('#page2b').show();
        $('.mid').focus();
    }
}

// On the home page, goes back to the previous page
var prevPage = function(page) {
    if (page === 'create2') {
        $('#page2a').hide();
        $('#page1, #page1extra').show();
        pin = '';
        $('.pin').val('');
    } else if (page === 'create3') {
        $('#page3a').hide();
        $('#page2a').show();
        $('.pin').focus();
    } else if (page === 'mid') {
        $('#page2b').hide();
        $('#page1, #page1extra').show();
        $('.mid').removeClass('wrong').val('');
        $('.pin.old').removeClass('wrong').val('');
        $('.mid-err').css('visibility', 'hidden');
        $('.pin-err').css('visibility', 'hidden');
    }
}

// Confirms that the map id exists, and that the pin is correct for that map id (if pin is filled in), and then advances to the map if all is correct
var accessMap = function() {
    $('#access').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    mid = $('.mid').removeClass('wrong').val().toLowerCase();
    savedPin = $('.pin.old').removeClass('wrong').val();
    databaseRef.child('maps/' + mid).once('value', function(snap) {
        if (!snap.val()) {
            setTimeout(function() {
                $('.mid-err').css('visibility', 'visible');
                $('.mid').addClass('wrong').select();
                $('#access').text('Access my map');
            }, 1000);
            return;
        }
        if ($('.pin.old').val()) {
            firebase.auth().fetchSignInMethodsForEmail('sourcechunk+' + mid + '@yandex.com').then((methods) => {
                myRef = firebase.database().ref('maps/' + mid);
                if (!!methods && methods.length > 0) {
                    setTimeout(function() {
                        firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                            signedIn = true;
                            window.history.replaceState(window.location.href.split('?')[0], mid.toUpperCase() + ' - Chunk Picker V2', '?' + mid);
                            document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker V2';
                            $('#entry-menu').hide();
                            $('.lock-opened').show();
                            $('.lock-closed').hide();
                            locked = false;
                            helpMenuOpenSoon && helpFunc();
                            atHome = false;
                            $('.loading').show();
                            $('#page2b').hide();
                            $('.background-img').hide();
                            $('.center').css('margin-top', '15px');
                            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .taskstoggle, .open-rules-container, .highest').css('opacity', 1).show();
                            roll2On && $('.roll2').css('opacity', 1).show();
                            !isPicking && unpickOn && $('.unpick').css('opacity', 1).show();
                            rules['Manually Add Tasks'] && $('.open-manual-container').css('opacity', 1).show();
                            rules['Random Event Loot'] && $('.open-random-container').css('opacity', 1).show();
                            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 1).show();
                            setupMap();
                        }).catch((error) => {
                            $('.pin-err').css('visibility', 'visible');
                            $('.pin.old').addClass('wrong').select();
                            $('#access').text('Access my map');
                        });
                        setTimeout(function() {
                            $('.pin.entry').removeClass('animated shake');
                        }, 500);
                    }, 1000);
                } else {
                    myRef.once('value', function(snap) {
                        if ((snap.val() && snap.val()['pin'] === savedPin)) {
                            setTimeout(function() {
                                firebase.auth().createUserWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                                    signedIn = true;
                                    myRef.child('uid').set(userCredential.user.uid, function(error) {
                                        if (error) {
                                            regainConnectivity(() => {
                                                myRef.child('pin').remove();
                                            });
                                        } else {
                                            myRef.child('pin').remove();
                                        }
                                    });
                                    userCredential.user.updateProfile({
                                        displayName: mid
                                    });
                                    window.history.replaceState(window.location.href.split('?')[0], mid.toUpperCase() + ' - Chunk Picker V2', '?' + mid);
                                    document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker V2';
                                    $('#entry-menu').hide();
                                    $('.lock-opened').show();
                                    $('.lock-closed').hide();
                                    locked = false;
                                    helpMenuOpenSoon && helpFunc();
                                    myRef = firebase.database().ref('maps/' + mid);
                                    atHome = false;
                                    $('.loading').show();
                                    $('#page2b').hide();
                                    $('.background-img').hide();
                                    $('.center').css('margin-top', '15px');
                                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .taskstoggle, .open-rules-container, .highest').css('opacity', 1).show();
                                    roll2On && $('.roll2').css('opacity', 1).show();
                                    !isPicking && unpickOn && $('.unpick').css('opacity', 1).show();
                                    rules['Manually Add Tasks'] && $('.open-manual-container').css('opacity', 1).show();
                                    rules['Random Event Loot'] && $('.open-random-container').css('opacity', 1).show();
                                    rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 1).show();
                                    setupMap();
                                }).catch((error) => {
                                    $('.pin-err').css('visibility', 'visible');
                                    $('.pin.old').addClass('wrong').select();
                                    $('#access').text('Access my map');
                                });
                            }, 1000);
                            setTimeout(function() {
                                $('.pin.entry').removeClass('animated shake');
                            }, 500);
                        } else {
                            setTimeout(function() {
                                $('.pin-err').css('visibility', 'visible');
                                $('.pin.old').addClass('wrong').select();
                                $('#access').text('Access my map');
                                setTimeout(function() {
                                    $('.pin.entry').removeClass('animated shake');
                                }, 500);
                            }, 1000);
                        }
                    });
                }
            });
        } else {
            window.history.replaceState(window.location.href.split('?')[0], mid.toUpperCase() + ' - Chunk Picker V2', '?' + mid);
            document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker V2';
            $('.lock-closed, .lock-opened').hide();
            locked = true;
            inEntry = true;
            myRef = firebase.database().ref('maps/' + mid);
            atHome = false;
            $('.loading').show();
            $('#page2b').hide();
            $('.background-img').hide();
            setupMap();
        }
    });
}

// Confirms that the map id exists, and that the pin is correct for that map id (if pin is filled in), then changes the pin, and then finally advances to the map if all is correct
var changePin = function() {
    $('#change-pin').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    var mid = $('.mid-old').removeClass('wrong').val().toLowerCase();
    var pinOld = $('.pin.old2.first').removeClass('wrong').val();
    var pinNew = $('.pin.old2.second').val();
    databaseRef.child('maps/' + mid).once('value', function(snap) {
        if (!snap.val()) {
            setTimeout(function() {
                $('.mid-err').css('visibility', 'visible');
                $('.mid-old').addClass('wrong').select();
                $('#change-pin').text('Change PIN');
            }, 1000);
            return;
        }

        firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', pinOld + mid).then((userCredential) => {
            if (onTestServer || testMode) {
                return;
            }
            signedIn = true;
            myRef = firebase.database().ref('maps/' + mid);
            if (!onTestServer && !testMode) {
                firebase.auth().currentUser.updatePassword(pinNew + mid).then(() => {
                    window.history.replaceState(window.location.href.split('?')[0], mid.toUpperCase() + ' - Chunk Picker V2', '?' + mid);
                    document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker V2';
                    $('.lock-closed, .lock-opened').hide();
                    locked = true;
                    inEntry = true;
                    atHome = false;
                    helpMenuOpenSoon && helpFunc();
                    $('.loading').show();
                    $('#page8').hide();
                    $('.background-img').hide();
                    setupMap();
                }).catch((error) => {console.log(error)});
            }
        }).catch((error) => {
            $('.pin-err').css('visibility', 'visible');
            $('.pin.old2.first').addClass('wrong').select();
            $('#change-pin').text('Change PIN');
            return;
        });
    });
}

// Unpicks a random unlocked chunk
var unpick = function() {
    if (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || $('.unlocked').length < 1) {
        return;
    }
    if (checkFalseRules() && chunkTasksOn) {
        helpFunc();
        return;
    }
    var el = $('.unlocked');
    if (el.length <= 0) {
        return;
    }
    var rand = Math.floor(Math.random() * el.length);
    if (selectedNum > 999) {
        $(el[rand]).append('<span class="label extralong">' + selectedNum + '</span>');
        $(el[rand]).addClass('selected').removeClass('unlocked').addClass('recent');
        $('.label.extralong').css('font-size', (labelZoom * (1/2)) + 'px');
    } else if (selectedNum > 99) {
        $(el[rand]).append('<span class="label long">' + selectedNum + '</span>');
        $(el[rand]).addClass('selected').removeClass('unlocked').addClass('recent');
        $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
    } else {
        $(el[rand]).append('<span class="label">' + selectedNum + '</span>');
        $(el[rand]).addClass('selected').removeClass('unlocked').addClass('recent');
        $('.label').css('font-size', labelZoom + 'px');
    }
    if (el.length < 300) {
        fixNums(selectedNum);
    }
    $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
    selectedNum++;
    $('#chunkInfo1').text('Unlocked chunks: ' + --unlockedChunks);
    $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
    scrollToPos(parseInt($(el[rand]).attr('id')) % rowSize, Math.floor(parseInt($(el[rand]).attr('id')) / rowSize), 0, 0, false);
    !showChunkIds && $('.chunkId').hide();
    setData();
    chunkBorders();
    $(el[rand]).css('border-width', '0px');
}

// Opens/closes the settings menu
var settingsMenu = function() {
    settingsOpen = !settingsOpen;
    if (settingsOpen) {
        $('.settings-menu').show();
        $('.settings').css({'color': 'rgb(150, 150, 150)'});
    } else {
        $('.settings-menu').hide();
        $('.settings').css({'color': 'black'});
    }
}

// Enables screenshot mode
var enableScreenshotMode = function() {
    $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .menu10, .settings-menu, .topnav, #beta, .hiddenInfo').hide();
    screenshotMode = true;
    $('.escape-hint').css('opacity', 1).show();
    setTimeout(function() {
        $('.escape-hint').animate({'opacity': 0});
        setTimeout(function() {
            $('.escape-hint').hide();
        }, 500);
    }, 1000);
}

// Toggles test mode
var enableTestMode = function() {
    testMode = !testMode;
    testMode ? $('.test-hint').css('opacity', 1).show() : $('.test-hint').css('opacity', 0).hide();
    if (!testMode) {
        loadData();
    }
    settingsMenu();
}

// Toggles high visibility mode
var toggleVisibility = function(value) {
    highVisibilityMode = value;
    setCookies();
    highVisibilityMode ? $('.box').addClass('visible') : $('.box').removeClass('visible');
}

// Toggles the chunk info panel
var toggleChunkInfo = function(value, extra) {
    chunkInfoOn = value;
    setCookies();
    chunkInfoOn ? $('.menu8').show() : $('.menu8').hide();
    $('.hiddenInfo').hide();
    extra !== 'startup' && $('menu8').css('opacity', 1);
    updateChunkInfo();
}

// Temporarily hides chunk info panel
var hideChunkInfo = function(extra) {
    chunkInfoOn && $('.menu8').hide();
    chunkInfoOn && $('.hiddenInfo').show();
    $('.box.locked').removeClass('locked');
    $('.icon').remove();
    infoLockedId = -1;
    infoCollapse = true;
    extra !== 'startup' && setCookies();
}

// Re-shows chunk info panel
var showChunkInfo = function(extra) {
    chunkInfoOn && $('.menu8').show();
    chunkInfoOn && $('.hiddenInfo').hide();
    infoLockedId = -1;
    infoCollapse = false;
    updateChunkInfo();
    extra !== 'startup' && setCookies();
}

// Toggles the chunk tasks panel
var toggleChunkTasks = function(value, extra) {
    chunkTasksOn = value;
    chunkTasksOn ? $('.menu9').show() : $('.menu9').hide();
    extra !== 'startup' && $('menu9').css('opacity', 1);
    extra !== 'startup' && !locked && setData();
}

// Toggles the visibility of the roll2 button
var toggleRoll2 = function(value, extra) {
    roll2On = value;
    roll2On ? $('.roll2').show() : $('.roll2').hide();
    extra !== 'startup' && $('.roll2').css('opacity', 1);
    extra !== 'startup' && !locked && setData();
}

// Toggles the visibility of the unpick button
var toggleUnpick = function(value, extra) {
    unpickOn = value;
    unpickOn && !isPicking ? $('.unpick').show() : $('.unpick').hide();
    extra !== 'startup' && $('.unpick').css('opacity', 1);
    extra !== 'startup' && !locked && setData();
}

// Toggles the visibility of the recent chunks section
var toggleRecent = function(value, extra) {
    recentOn = value;
    recentOn ? $('.menu7').show() : $('.menu7').hide();
    extra !== 'startup' && $('.menu7').css('opacity', 1);
    extra !== 'startup' && !locked && setData();
}

// Enabled highscore tracking
var enableHighscore = function(extra) {
    if (!highscoreEnabled) {
        highscoreEnabled = true;
        extra !== 'startup' && !locked && setData();
    }
}

// Centers on the clicked recent chunk and highlights it
var recentChunk = function(el) {
    if ($($(el).children('.chunk')).text() === '-' || inEntry) {
        return;
    }
    let id = parseInt($($(el).children('.chunk')).text());
    let box = $('.box:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).addClass('recent');
    scrollToPos(parseInt(box.attr('id')) % rowSize, Math.floor(parseInt(box.attr('id')) / rowSize), 0, 0, false);
}

// Toggles the accordion panels of the chunk info panel
var toggleInfoPanel = function(pnl) {
    infoPanelVis[pnl] = !infoPanelVis[pnl];
    Object.keys(infoPanelVis).forEach(uniqKey => {
        if (uniqKey === pnl) {
            infoPanelVis[pnl] ? $('.panel-' + pnl).addClass('visible') : $('.panel-' + pnl).removeClass('visible');
            infoPanelVis[pnl] ? $('#info' + uniqKey + ' > .exp').html('<i class="pic fas fa-minus"></i>') : $('#info' + uniqKey + ' > .exp').html('<i class="pic fas fa-plus"></i>');
        } else {
            $('.panel-' + uniqKey).removeClass('visible');
            $('#info' + uniqKey + ' > .exp').html('<i class="pic fas fa-plus"></i>');
            infoPanelVis[uniqKey] = false;
        }
    });
}

// Toggles the accordion panels of the challenges panel
var toggleChallengesPanel = function(pnl) {
    challengePanelVis[pnl] = !challengePanelVis[pnl];
    Object.keys(challengePanelVis).forEach(uniqKey => {
        if (uniqKey === pnl) {
            challengePanelVis[pnl] ? $('.panel-' + pnl).addClass('visible') : $('.panel-' + pnl).removeClass('visible');
            challengePanelVis[pnl] ? $('#challenges' + uniqKey + ' > .exp').html('<i class="pic fas fa-minus"></i>') : $('#challenges' + uniqKey + ' > .exp').html('<i class="pic fas fa-plus"></i>');
        } else {
            $('.panel-' + uniqKey).removeClass('visible');
            $('#challenges' + uniqKey + ' > .exp').html('<i class="pic fas fa-plus"></i>');
            challengePanelVis[uniqKey] = false;
        }
    });
}

// ----------------------------------------------------------

// Other Functions

// ----------------------------------------------------------

// Once page has loaded, page is centered and initial chunks are selected/unlocked (from url)
var doneLoading = function() {
    if (onMobile) {
        $('.center').css({'height': '40px', 'width': '90px', 'font-size': '12px'});
        $('.pick, .roll2, .unpick').css({'height': '20px', 'width': '90px', 'font-size': '12px'});
        $('.menu2, .menu6, .menu7, .menu8, .menu9, .menu10, .settings, .gohighscore, .gobugreport, .godiscord, .help-button, .toptitle2-outer').hide().remove();
        $('.hr').css({'width': '25px'});
        $('.gohighscore').css({'right': '3vw', 'left': 'auto'});
        $('.block, .block > .title').css({'font-size': '18px'});
        $('.block > button').css({'font-size': '10px'});
        $('.menu3').css({'width': '110px', 'height': '15px'});
        $('#chunkInfo1, #chunkInfo2, .or').css({'font-size': '12px'});
        $('.box').addClass('mobile').css({'min-height': '96px', 'min-width': '96px', 'max-height': '96px', 'max-width': '96px'});
        center('quick');
    }
    $('.potential > .label').css('color', 'black');
    $('.loading').remove();
}

// Creates board of boxes, sets initial sizes of scalable elements, and hides certain elements if needed
var setupMap = function() {
    if (!atHome) {
        $('.body').show();
        $('#page1, #page1extra, #import-menu, #highscore-menu, #highscore-menu2, #help-menu').hide();
        if (locked) {
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .taskstoggle, .open-rules-container, .highest').css('opacity', 0).hide();
            !isPicking && $('.roll2, .unpick').css('opacity', 0).hide();
            $('.center').css('margin-top', '0px');
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            rules['Manually Add Tasks'] && $('.open-manual-container').css('opacity', 0).hide();
            rules['Random Event Loot'] && $('.open-random-container').css('opacity', 0).hide();
            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).hide();
            $('.pin.entry').focus();
        } else {
            $('.center').css('margin-top', '15px');
        }
        if (locked === undefined || locked) {
            locked = true;
            $('.lock-closed, .lock-opened').hide();
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .taskstoggle, .open-rules-container, .highest').css('opacity', 0).hide();
            $('.center').css('margin-top', '0px');
            !isPicking && $('.roll2, .unpick').css('opacity', 0).hide();
            rules['Manually Add Tasks'] && $('.open-manual-container').css('opacity', 0).hide();
            rules['Random Event Loot'] && $('.open-random-container').css('opacity', 0).hide();
            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).hide();
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            $('.pin.entry').focus();
        }
        for (var i = 0; i < fullSize; i++) {
            $('.btnDiv').append(`<div id=${i} class='box gray'><span class='chunkId'>${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex}</span></div>`);
        }
        $('.box').css('font-size', fontZoom + 'px');
        $('.label').css('font-size', labelZoom + 'px');
        $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
        $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
        $('.label.extralong').css('font-size', (labelZoom * (1/2)) + 'px');
        !mid && (mid = window.location.href.split('?')[1]);
        document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker V2';
        $('.toptitle2').text(mid.split('-')[0].toUpperCase());
        !onMobile && toggleChallengesPanel('active');
        loadData(true);
    }
}

// Sets all neighbors of recently unlocked chunk to selected
var selectNeighbors = function(el) {
    var ops = ['-x', '+x', '-y', '+y'];
    var num;
    for (var i = 0; i < 4; i++) {
        if (ops[i].substring(1,2) === 'x') {
            num = (i - 1) * 2 + 1;
            if (Math.floor((parseInt(el.id) + num) / rowSize) === Math.floor(parseInt(el.id) / rowSize) && $(`#${parseInt(el.id)  + num}`).hasClass('gray')) {
                if (selectedNum > 999) {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label extralong">' + selectedNum + '</span>');
                    $('.label.extralong').css('font-size', (labelZoom * (1/2)) + 'px');
                } else if (selectedNum > 99) {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label long">' + selectedNum + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
                } else {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label">' + selectedNum + '</span>');
                    $('.label').css('font-size', labelZoom + 'px'); 
                }
                $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
                selectedNum++;
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            }
        } else {
            num = ((i - 3) * 2 + 1) * rowSize;
            if (parseInt(el.id) + num >= 0 && parseInt(el.id) + num < fullSize && $(`#${parseInt(el.id)  + num}`).hasClass('gray')) {
                if (selectedNum > 999) {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label extralong">' + selectedNum + '</span>');
                    $('.label.extralong').css('font-size', (labelZoom * (1/2)) + 'px');
                } else if (selectedNum > 99) {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label long">' + selectedNum + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
                } else {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label">' + selectedNum + '</span>');
                    $('.label').css('font-size', labelZoom + 'px'); 
                }
                $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
                selectedNum++;
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            }
        }
    }
}

// Scroll to new position (for panning/dragging)
var updateScrollPos = function(e) {
    if (clickX === undefined) {
        return;
    }
    let newScrollLeft = prevScrollLeft - (clickX - e.pageX);
    let newScrollTop = prevScrollTop - (clickY - e.pageY);
    if (newScrollLeft > 300) {
        newScrollLeft = 300;
        prevScrollLeft = 300;
        clickX = e.pageX;
    }
    if (newScrollTop > 350) {
        newScrollTop = 350;
        prevScrollTop = 350;
        clickY = e.pageY;
    }
    if (newScrollLeft + $('.imgDiv').width() + 300 < window.innerWidth) {
        newScrollLeft = -$('.imgDiv').width() + window.innerWidth - 300;
        prevScrollLeft = -$('.imgDiv').width() + window.innerWidth - 300;
        clickX = e.pageX;
    }
    if (newScrollTop + $('.imgDiv').height() + 300 < window.innerHeight) {
        newScrollTop = -$('.imgDiv').height() + window.innerHeight - 300;
        prevScrollTop = -$('.imgDiv').height() + window.innerHeight - 300;
        clickY = e.pageY;
    }
    $('.imgDiv').css({left: newScrollLeft, top: newScrollTop});
    scrollLeft = - (clickX - e.pageX);
    scrollTop = - (clickY - e.pageY);
}

// Scrolls to position x.xPart, y.yPart
var scrollToPos = function(x, y, xPart, yPart, doQuick) {
    zoom = $('.imgDiv').width();
    prevScrollLeft = -$('#' + (y * rowSize + x)).position().left + window.innerWidth / 2 - $('#' + (rowSize + 1)).position().left * (xPart + .5);
    prevScrollTop = -$('#' + (y * rowSize + x)).position().top + window.innerHeight / 2 - $('#' + (rowSize + 1)).position().top * (yPart + .5);
    if (prevScrollLeft > 100) {
        prevScrollLeft = 100;
    }
    if (prevScrollTop > 150) {
        prevScrollTop = 150;
    }
    if (prevScrollLeft + $('.imgDiv').width() + 100 < window.innerWidth) {
        prevScrollLeft = -$('.imgDiv').width() + window.innerWidth - 100;
    }
    if (prevScrollTop + $('.imgDiv').height() + 100 < window.innerHeight) {
        prevScrollTop = -$('.imgDiv').height() + window.innerHeight - 100;
    }
    doQuick ? $('.imgDiv').css({left: prevScrollLeft, top: prevScrollTop}) : $('.imgDiv').animate({left: prevScrollLeft, top: prevScrollTop});
}

// Decreases selected number values on change
var fixNums = function(num) {
    num = parseInt(num);
    let isBroken = false;
    let nums = {};
    let innerLooped = false;
    $('.label').each(function(index) {
        if (parseInt($(this).text()) > num) {
            innerLooped = true;
            if (parseInt($(this).text()) === 1000) {
                $(this).text(parseInt($(this).text()) - 1).removeClass('extralong').addClass('long');
            } else if (parseInt($(this).text()) === 100) {
                $(this).text(parseInt($(this).text()) - 1).removeClass('long');
            } else {
                $(this).text(parseInt($(this).text()) - 1);
            }
            $('.label').css('font-size', labelZoom + 'px');
            $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
            $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
            $('.label.extralong').css('font-size', (labelZoom * (1/2)) + 'px');
        }
        if (parseInt($(this).text()) !== num) {
            if (parseInt($(this).text()) <= 0 || nums.hasOwnProperty(parseInt($(this).text()))) {
                isBroken = true;
            }
            nums[parseInt($(this).text())] = true;
        } else {
            innerLooped = true;
        }
    });
    innerLooped && selectedNum--;
    if (isBroken || Object.keys(nums).filter(num => num > selectedChunks).length > 0 || Object.keys(nums).length === 0) {
        resetNums();
    }
}

// Resets selected number values if they are broken
var resetNums = function() {
    let num = 1;
    $('.label').each(function(index) {
        $(this).removeClass('extralong long');
        $(this).text(num);
        if (num >= 1000) {
            $(this).addClass('extralong');
        } else if (num >= 100) {
            $(this).addClass('long');
        }
        num++;
    });
    $('.label').css('font-size', labelZoom + 'px');
    $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
    $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
    $('.label.extralong').css('font-size', (labelZoom * (1/2)) + 'px');
    selectedNum = num;
    selectedChunks = num - 1;
}

// Update chunk info
var updateChunkInfo = function() {
    if (infoCollapse) {
        $('.menu8').hide();
        $('.hiddenInfo').show();
    }
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !onMobile && !helpMenuOpen) {
        let id = -1;
        if (infoLockedId !== -1) {
            id = infoLockedId.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G');
        }
        let visible = '';
        Object.keys(infoPanelVis).forEach(id => {
            if (infoPanelVis[id]) {
                visible = id;
            }
        });
        if (chunkInfoOn) {
            $('.menu8').show();
            $('.hiddenInfo').hide();
        }
        if ($('.infoid').is(':hidden') && id > 0) {
            $('.infostartup').hide();
            $('.infoid').show();
            $('#infoname').show();
            $('#infomonsters').show();
            $('#infonpcs').show();
            $('#infospawns').show();
            $('#infoshops').show();
            $('#infofeatures').show();
            $('#infoquests').show();
            $('#infodiaries').show();
            $('#infoconnections').show();
            $('#infochallenges').show();
            if (visible !== '') {
                $('.panel-' + visible).show();
            }
        } else if (id === -1) {
            $('.infostartup').show();
            $('.infoid').hide();
            $('#infoname').hide();
            $('#infomonsters').hide();
            $('#infonpcs').hide();
            $('#infospawns').hide();
            $('#infoshops').hide();
            $('#infofeatures').hide();
            $('#infoquests').hide();
            $('#infodiaries').hide();
            $('#infoconnections').hide();
            $('#infochallenges').hide();
            if (visible !== '') {
                $('.panel-' + visible).hide();
            }
            if (infoCollapse) {
                $('.menu8').hide();
                $('.hiddenInfo').show();
            }
            return;
        }
        let monsterStr = '';
        let npcStr = '';
        let objectStr = '';
        let spawnStr = '';
        let shopStr = '';
        let questStr = '';
        let diaryStr = '';
        let connectStr = '';
        if (!!chunkInfo['chunks'][id]) {
            !!chunkInfo['chunks'][id]['Monster'] && Object.keys(chunkInfo['chunks'][id]['Monster']).forEach(name => {
                monsterStr += (chunkInfo['chunks'][id]['Monster'][name] === 1 ? '' : chunkInfo['chunks'][id]['Monster'][name] + ' ') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name + '</a>, ';
            });
            monsterStr.length > 0 && (monsterStr = monsterStr.substring(0, monsterStr.length - 2));
            !!chunkInfo['chunks'][id]['NPC'] && Object.keys(chunkInfo['chunks'][id]['NPC']).forEach(name => {
                npcStr += (chunkInfo['chunks'][id]['NPC'][name] === 1 ? '' : chunkInfo['chunks'][id]['NPC'][name] + ' ') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name + '</a>, ';
            });
            npcStr.length > 0 && (npcStr = npcStr.substring(0, npcStr.length - 2));
            !!chunkInfo['chunks'][id]['Spawn'] && Object.keys(chunkInfo['chunks'][id]['Spawn']).forEach(name => {
                spawnStr += (chunkInfo['chunks'][id]['Spawn'][name] === 1 ? '' : chunkInfo['chunks'][id]['Spawn'][name] + ' ') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name + '</a>, ';
            });
            spawnStr.length > 0 && (spawnStr = spawnStr.substring(0, spawnStr.length - 2));
            !!chunkInfo['chunks'][id]['Shop'] && Object.keys(chunkInfo['chunks'][id]['Shop']).forEach(name => {
                shopStr += `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name + '</a>, ';
            });
            shopStr.length > 0 && (shopStr = shopStr.substring(0, shopStr.length - 2));
            !!chunkInfo['chunks'][id]['Object'] && Object.keys(chunkInfo['chunks'][id]['Object']).forEach(name => {
                objectStr += (chunkInfo['chunks'][id]['Object'][name] === 1 ? '' : chunkInfo['chunks'][id]['Object'][name] + ' ') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name + '</a>, ';
            });
            objectStr.length > 0 && (objectStr = objectStr.substring(0, objectStr.length - 2));
            !!chunkInfo['chunks'][id]['Quest'] && Object.keys(chunkInfo['chunks'][id]['Quest']).forEach(name => {
                questStr += `<a class='${(chunkInfo['chunks'][id]['Quest'][name] === 'first' ? 'bold link' : 'link')}' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name + `</a> <span onclick="getQuestInfo('` + name.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\'/g, '%2H') + `')"><i class="quest-icon fas fa-info-circle"></i></span>, `;
            });
            questStr.length > 0 && (questStr = questStr.substring(0, questStr.length - 2));
            !!chunkInfo['chunks'][id]['Diary'] && Object.keys(chunkInfo['chunks'][id]['Diary']).forEach(name => {
                diaryStr += `<a class='bold link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name + ' Diary').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name + ' Diary</a>' + ': ' + chunkInfo['chunks'][id]['Diary'][name];
            });
            let namesList = {};
            !!chunkInfo['chunks'][id]['Connect'] && Object.keys(chunkInfo['chunks'][id]['Connect']).forEach(name => {
                let realName = name;
                let passedName = name;
                if (!!chunkInfo['chunks'][name]['Name']) {
                    realName = chunkInfo['chunks'][name]['Name'];
                    passedName = chunkInfo['chunks'][name]['Name'];
                } else if (!!chunkInfo['chunks'][name]['Nickname']) {
                    realName = chunkInfo['chunks'][name]['Nickname'] + '(' + name + ')';
                }
                if (namesList[realName] !== realName) {
                    namesList[realName] = realName;
                    connectStr += `<span class='link' onclick=redirectPanel('${encodeURI(passedName.replaceAll(/\'/g, '%2H'))}')>${realName.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')}</span>` + ', ';
                }
            });
            connectStr.length > 0 && (connectStr = connectStr.substring(0, connectStr.length - 2));
            connectStr = connectStr.split(', ').sort((a,b) => {
                return $(a).text() > $(b).text() ? 1 : -1;
            });
            connectStr = connectStr.join(', ');
        }
        $('.infoid-content').html((!!chunkInfo['chunks'][id] && !!chunkInfo['chunks'][id]['Nickname']) ? (chunkInfo['chunks'][id]['Nickname'] + ' (' + id + ')') : id.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'));
        $('.panel-monsters').html(monsterStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') || 'None');
        $('.panel-npcs').html(npcStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') || 'None');
        $('.panel-spawns').html(spawnStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') || 'None');
        $('.panel-shops').html(shopStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') || 'None');
        $('.panel-features').html(objectStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') || 'None');
        $('.panel-quests').html(questStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') || 'None');
        $('.panel-diaries').html(diaryStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') || 'None');
        $('.panel-connections').html(connectStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') || 'None');
        $('.panel-challenges').html('Calculating...');
        calcFutureChallenges();
    }
}

// Checks if skill has primary training
var checkPrimaryMethod = function(skill, valids, baseChunkData, wantMethods) {
    let valid = false;
    let methods = [];
    let hardValid = false;
    if (!!manualTasks[skill] && Object.keys(manualTasks[skill]).length > 0) {
        hardValid = true;
        methods.push('Manually added skill');
    } else if (!!completedChallenges[skill] && Object.keys(completedChallenges[skill]).length > 0) {
        hardValid = true;
    }
    let tempValid = true;
    !!universalPrimary[skill] && universalPrimary[skill].forEach(line => {
        if (line === 'Primary+') {
            let primaryValid = false;
            !!valids[skill] && Object.keys(valids[skill]).forEach(challenge => {
                if (((chunkInfo['challenges'][skill][challenge]['Primary'] && (!chunkInfo['challenges'][skill][challenge]['Secondary'] || rules['Secondary Primary'])) && chunkInfo['challenges'][skill][challenge]['Level'] === 1 && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) || chunkInfo['challenges'][skill][challenge]['Manual']) {
                    if (skill !== 'Smithing' || rules['Smithing by Smelting'] || baseChunkData['objects'].hasOwnProperty('Anvil')) {
                        primaryValid = true;
                        methods.push(challenge);
                    }
                }
            });
            !primaryValid && (tempValid = false);
        } else if (line === 'Monster+') {
            let monsterExists = !!baseChunkData['monsters'] && Object.keys(baseChunkData['monsters']).length > 0;
            if (!monsterExists) {
                tempValid = false;
            } else {
                methods.push('Attack monsters');
            }
        } else if (line === 'Bones+') {
            let bonesExists = false;
            !!baseChunkData['items'] && boneItems.forEach(bone => {
                if (!!baseChunkData['items'] && Object.keys(baseChunkData['items']).includes(bone)) {
                    bonesExists = true;
                }
            });
            if (!bonesExists) {
                tempValid = false;
            } else {
                methods.push('Bury bones');
            }
        } else if (line === 'Combat+') {
            let combatExists = false;
            combatSkills.forEach(skill2 => {
                if (checkPrimaryMethod(skill2, valids, baseChunkData)) {
                    combatExists = true;
                }
            });
            if (!combatExists) {
                tempValid = false;
            } else {
                methods.push('Train combat');
            }
        } else if (line === 'Ranged+') {
            let validRanged = false;
            !!baseChunkData['items'] && rangedItems.forEach(set => {
                let innerValid = true;
                set.forEach(item => {
                    if (!!baseChunkData['items'] && !Object.keys(baseChunkData['items']).includes(item.replaceAll(/\*/g, ''))) {
                        innerValid = false;
                    } else if (item.includes('*')) {
                        let tempSecondary = true;
                        item.includes('*') && !!baseChunkData['items'][item.replaceAll(/\*/g, '')] && Object.keys(baseChunkData['items'][item.replaceAll(/\*/g, '')]).forEach(source => {
                            if ((!baseChunkData['items'][item.replaceAll(/\*/g, '')][source].includes('secondary-') && !processingSkill[baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]]) || (baseChunkData['items'][item.replaceAll(/\*/g, '')][source].includes('primary-') && !processingSkill[baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]]) || baseChunkData['items'][item.replaceAll(/\*/g, '')][source] === 'shop' || rules['Secondary Primary']) {
                                tempSecondary = false;
                            }
                        });
                        tempSecondary && (innerValid = false);
                    }
                });
                innerValid && (validRanged = true);
                innerValid && methods.push(set);
            });
            if (!validRanged) {
                tempValid = false;
            }
        } else {
            tempValid = false;
        }
    });
    if (Array.isArray(methods[0])) {
        let tempMethods = [];
        let i = 0;
        methods.forEach(method => {
            if (Array.isArray(method)) {
                tempMethods[i] = '';
                method.forEach(it => {
                    tempMethods[i] += it.replaceAll('*', '') + ' + ';
                });
                tempMethods[i] += methods[methods.length - 1];
                i++;
            }
        });
        methods = tempMethods;
    }
    valid = tempValid;
    if (hardValid) {
        valid = true;
    }
    if (!valid) {
        methods = [];
    }
    if (wantMethods) {
        return methods;
    } else {
        return valid;
    }
}

// Finds the current challenge in each skill
var calcCurrentChallenges = function() {
    if (gotData) {
        let chunks = {};
        $('.unlocked').each(function() {
            chunks[parseInt($(this).text())] = true;
        });
        myWorker.postMessage(['current', chunks, rules, chunkInfo, skillNames, processingSkill, maybePrimary, combatSkills, monstersPlus, objectsPlus, chunksPlus, itemsPlus, mixPlus, npcsPlus, tools, elementalRunes, manualTasks, completedChallenges, backlog, "1/" + rules['Rare Drop Amount'], universalPrimary, elementalStaves, rangedItems, boneItems, highestCurrent, dropTables, possibleAreas, randomLoot, magicTools, bossLogs, bossMonsters, minigameShops, manualEquipment, checkedChallenges]);
        workerOut++;
    }
}

// Finds the current challenge in each skill 2
var calcCurrentChallenges2 = function(tempChallengeArr) {
    setupCurrentChallenges(tempChallengeArr);
    checkOffChallenges();
    updateChunkInfo();
};

// Sets up data for displaying
setupCurrentChallenges = function(tempChallengeArr) {
    !rules['Show Skill Tasks'] && challengeArr.forEach(line => {
        skillNames.forEach(skill => {
            if (line.includes(skill + '-challenge')) {
                let index = challengeArr.indexOf(line);
                challengeArr.splice(index, 1);
            }
        });
    });
    if (tempChallengeArr !== false) {
        oldChallengeArr = tempChallengeArr;
        challengeArr = [];
        rules['Show Skill Tasks'] && challengeArr.push(`<div class="marker marker-skill noscroll" onclick="expandActive('skill')"><i class="expand-button fas ${activeSubTabs['skill'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">Skill Tasks</span></div>`);
        rules['Show Skill Tasks'] && Object.keys(tempChallengeArr).sort().forEach(skill => {
            !!tempChallengeArr[skill] && challengeArr.push(`<div class="challenge skill-challenge noscroll ${skill + '-challenge'} ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][tempChallengeArr[skill]]) && 'hide-backlog'} ${!activeSubTabs['skill'] ? 'stay-hidden' : ''}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][tempChallengeArr[skill]]) ? "checked" : ""} onclick="checkOffChallenges()" ${(viewOnly || inEntry || locked) ? "disabled" : ""} /><b class="noscroll">[` + chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level'] + '] <span class="inner noscroll">' + skill + '</b>: ' + tempChallengeArr[skill].split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((tempChallengeArr[skill].split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + tempChallengeArr[skill].split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + tempChallengeArr[skill].split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + tempChallengeArr[skill] + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
        });
        rules['Show Skill Tasks'] && Object.keys(highestCurrent).forEach(skill => {
            if (!!checkedChallenges[skill] && Object.keys(checkedChallenges[skill])[0] === highestCurrent[skill]) {
                $('.' + skill + '-challenge > input').prop('checked', true);
            }
        });
    }
    challengeArr = challengeArr.filter(line => !line.includes('Extra-') && !line.includes('BiS-') && !line.includes('Quest-') && !line.includes('marker-extra') && !line.includes('marker-bis') && !line.includes('marker-quest'));
    !!globalValids['BiS'] && Object.keys(globalValids['BiS']).length > 0 && rules['Show Best in Slot Tasks'] && challengeArr.push(`<div class="marker marker-bis noscroll" onclick="expandActive('bis')"><i class="expand-button fas ${activeSubTabs['bis'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">BiS Tasks</span></div>`);
    !!globalValids['BiS'] && rules['Show Best in Slot Tasks'] && Object.keys(globalValids['BiS']).forEach(challenge => {
        if ((!backlog['BiS'] || !backlog['BiS'].hasOwnProperty(challenge)) && (!completedChallenges['BiS'] || !completedChallenges['BiS'][challenge])) {
            challengeArr.push(`<div class="challenge bis-challenge noscroll ${'BiS-' + challenge.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'} ${(!!checkedChallenges['BiS'] && !!checkedChallenges['BiS'][challenge]) && 'hide-backlog'} ${!activeSubTabs['bis'] ? 'stay-hidden' : ''}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges['BiS'] && !!checkedChallenges['BiS'][challenge]) && "checked"} onclick="checkOffChallenges()" ${(viewOnly || inEntry || locked) && "disabled"} /><b class="noscroll">[` + chunkInfo['challenges']['BiS'][challenge]['Label'] + ']</b> <span class="inner noscroll">' + challenge.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((challenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'BiS' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
        }
    });
    !!globalValids['Quest'] && Object.keys(globalValids['Quest']).length > 0 && rules['Show Quest Tasks'] && challengeArr.push(`<div class="marker marker-quest noscroll" onclick="expandActive('quest')"><i class="expand-button fas ${activeSubTabs['quest'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">Quest Tasks</span></div>`);
    !!globalValids['Quest'] && rules['Show Quest Tasks'] && Object.keys(globalValids['Quest']).forEach(challenge => {
        if ((!backlog['Quest'] || !backlog['Quest'].hasOwnProperty(challenge)) && (!completedChallenges['Quest'] || !completedChallenges['Quest'][challenge]) && globalValids['Quest'][challenge]) {
            if (chunkInfo['challenges']['Quest'][challenge].hasOwnProperty('QuestPoints')) {
                challengeArr.push(`<div class="challenge quest-challenge noscroll ${'Quest-' + challenge.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'} ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) && 'hide-backlog'} ${!activeSubTabs['quest'] ? 'stay-hidden' : ''}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) && "checked"} onclick="checkOffChallenges()" ${(viewOnly || inEntry || locked) && "disabled"} />` + '<span class="inner noscroll">' + `<b class="noscroll">[Quest] ` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</b>: <a class="link" href="' + questUrl[chunkInfo['challenges']['Quest'][challenge]['BaseQuest']] + '" target="_blank">Complete the quest</a>' + (viewOnly || inEntry || locked ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'Quest' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            } else if (!rules['Show Quest Tasks Complete']) {
                challengeArr.push(`<div class="challenge quest-challenge noscroll ${'Quest-' + challenge.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'} ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) && 'hide-backlog'} ${!activeSubTabs['quest'] ? 'stay-hidden' : ''}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) && "checked"} onclick="checkOffChallenges()" ${(viewOnly || inEntry || locked) && "disabled"} />` + '<span class="inner noscroll">' + `<b class="noscroll">[Quest] ` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</b>: <a class="link" href="' + questUrl[chunkInfo['challenges']['Quest'][challenge]['BaseQuest']] + '" target="_blank">Up to step ' + challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + (viewOnly || inEntry || locked ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'Quest' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            }
        }
    });
    !!globalValids['Diary'] && Object.keys(globalValids['Diary']).length > 0 && rules['Show Diary Tasks'] && challengeArr.push(`<div class="marker marker-diary noscroll" onclick="expandActive('diary')"><i class="expand-button fas ${activeSubTabs['diary'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">Diary Tasks</span></div>`);
    !!globalValids['Diary'] && rules['Show Diary Tasks'] && Object.keys(globalValids['Diary']).forEach(challenge => {
        if ((!backlog['Diary'] || !backlog['Diary'].hasOwnProperty(challenge)) && (!completedChallenges['Diary'] || !completedChallenges['Diary'][challenge]) && globalValids['Diary'][challenge]) {
            challengeArr.push(`<div class="challenge diary-challenge noscroll ${'Diary-' + challenge.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'} ${(!!checkedChallenges['Diary'] && !!checkedChallenges['Diary'][challenge]) && 'hide-backlog'} ${!activeSubTabs['diary'] ? 'stay-hidden' : ''}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges['Diary'] && !!checkedChallenges['Diary'][challenge]) && "checked"} onclick="checkOffChallenges()" ${(viewOnly || inEntry || locked) && "disabled"} />` + `<b class="noscroll">[Diary]</b> ` + '<span class="inner noscroll">' + '<b class="noscroll"><a class="link" href="' + `${"https://oldschool.runescape.wiki/w/" + encodeURI(challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))}` + `" target="_blank">` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a></b>: ' + `${challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')}` + (viewOnly || inEntry || locked ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'Diary' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
        }
    });
    !!globalValids['Extra'] && Object.keys(globalValids['Extra']).length > 0 && challengeArr.push(`<div class="marker marker-extra noscroll" onclick="expandActive('extra')"><i class="expand-button fas ${activeSubTabs['extra'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">Other Tasks</span></div>`);
    !!globalValids['Extra'] && Object.keys(globalValids['Extra']).sort().forEach(challenge => {
        if ((!backlog['Extra'] || !backlog['Extra'].hasOwnProperty(challenge)) && (!completedChallenges['Extra'] || !completedChallenges['Extra'][challenge])) {
            if (!!chunkInfo['challenges']['Extra'][challenge] && chunkInfo['challenges']['Extra'][challenge]['Label'] === 'Kill X') {
                challengeArr.push(`<div class="challenge extra-challenge noscroll ${'Extra-' + challenge.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'} ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) && 'hide-backlog'} ${!activeSubTabs['extra'] ? 'stay-hidden' : ''}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) && "checked"} onclick="checkOffChallenges()" ${(viewOnly || inEntry || locked) && "disabled"} /><b class="noscroll">[` + chunkInfo['challenges']['Extra'][challenge]['Label'] + ']</b> <span class="inner noscroll">' + challenge.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(' X ', ' ' + rules['Kill X Amount'] + ' ') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((challenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'Extra' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            } else {
                challengeArr.push(`<div class="challenge extra-challenge noscroll ${'Extra-' + challenge.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'} ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) && 'hide-backlog'} ${!activeSubTabs['extra'] ? 'stay-hidden' : ''}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) && "checked"} onclick="checkOffChallenges()" ${(viewOnly || inEntry || locked) && "disabled"} />` + `<b class="noscroll">[` + (!!chunkInfo['challenges']['Extra'][challenge] ? (chunkInfo['challenges']['Extra'][challenge]['Label'] + `]</b> `) : '') + '<span class="inner noscroll">' + challenge.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((challenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'Extra' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            }
        }
    });
    if (challengeArr.length < 1) {
        challengeArr = [];
    }
    let backlogArr = [];
    Object.keys(backlog).forEach(skill => {
        if (skill === 'Extra') {
            Object.keys(backlog[skill]).forEach(name => {
                backlogArr.push(`<div class="challenge noscroll ${'Extra-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : ' <span class="burger noscroll" onclick="openBacklogContextMenu(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'Quest') {
            Object.keys(backlog[skill]).forEach(name => {
                backlogArr.push(`<div class="challenge noscroll ${'Quest-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<b class='noscroll'>[Quest] ` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</b>: <a class="link" href="' + questUrl[chunkInfo['challenges']['Quest'][name]['BaseQuest']] + '" target="_blank">Up to step ' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + (viewOnly || inEntry || locked ? '' : ' <span class="burger noscroll" onclick="openBacklogContextMenu(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'Diary') {
            Object.keys(backlog[skill]).forEach(name => {
                backlogArr.push(`<div class="challenge noscroll ${'Diary-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<b class='noscroll'>[Diary]</b> ` + '<b class="noscroll"><a class="link" href="' + `${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))}` + '" target="_blank">' + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a></b>: ' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : ' <span class="burger noscroll" onclick="openBacklogContextMenu(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'BiS') {
            Object.keys(backlog[skill]).forEach(name => {
                backlogArr.push(`<div class="challenge noscroll ${'BiS-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'}"><b class='noscroll'>[${!!chunkInfo['challenges']['BiS'] && !!chunkInfo['challenges']['BiS'][name] ? chunkInfo['challenges']['BiS'][name]['Label'] : 'BiS'}]</b> ` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : ' <span class="burger noscroll" onclick="openBacklogContextMenu(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            });
        } else {
            !!chunkInfo['challenges'][skill] && Object.keys(backlog[skill]).forEach(name => {
                !!chunkInfo['challenges'][skill][name] && backlogArr.push(`<div class="challenge noscroll ${skill + '-challenge'}"> <b class="noscroll">[` + chunkInfo['challenges'][skill][name]['Level'] + '] ' + skill + '</b>: ' + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : ' <span class="burger noscroll" onclick="openBacklogContextMenu(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            });
        }
    });
    if (backlogArr.length < 1) {
        backlogArr.push('No challenges currently backlogged.');
    }
    let completedArr = [];
    Object.keys(completedChallenges).forEach(skill => {
        if (skill === 'Extra') {
            Object.keys(completedChallenges[skill]).forEach(name => {
                completedArr.push(`<div class="challenge noscroll ${'Extra-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-undo-alt noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'Quest') {
            Object.keys(completedChallenges[skill]).forEach(name => {
                let questStepName = questLastStep.hasOwnProperty(name) ? questLastStep[name] : name;
                completedArr.push(`<div class="challenge noscroll ${'Quest-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<b class='noscroll'>[Quest] ` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</b>: <a class="link" href="' + questUrl[chunkInfo['challenges']['Quest'][questStepName]['BaseQuest']] + '" target="_blank">' + (name === questStepName ? 'Up to step ' : ' ') + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + (viewOnly || inEntry || locked ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-undo-alt noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'Diary') {
            Object.keys(completedChallenges[skill]).forEach(name => {
                completedArr.push(`<div class="challenge noscroll ${'Diary-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<b class='noscroll'>[Diary]</b> ` + '<b class="noscroll"><a class="link" href="' + `${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))}` + '" target="_blank">' + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a></b>: ' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-undo-alt noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'BiS') {
            Object.keys(completedChallenges[skill]).forEach(name => {
                completedArr.push(`<div class="challenge noscroll ${'BiS-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '') + '-challenge'}"><b class='noscroll'>[BiS]</b> ` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-undo-alt noscroll"></i></span>') + '</div>');
            });
        } else {
            !!chunkInfo['challenges'][skill] && Object.keys(completedChallenges[skill]).forEach(name => {
                !!chunkInfo['challenges'][skill][name] && completedArr.push(`<div class="challenge noscroll ${skill + '-challenge'}"> <b class="noscroll">[` + chunkInfo['challenges'][skill][name]['Level'] + '] ' + skill + '</b>: ' + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-undo-alt noscroll"></i></span>') + '</div>');
            });
        }
    });
    if (completedArr.length < 1) {
        completedArr.push('No challenges currently completed.');
    }
    setCurrentChallenges(backlogArr, completedArr);
    changeChallengeColor();
}

// Toggles the subtabs for the active tasks tab
var expandActive = function(subTab) {
    activeSubTabs[subTab] = !activeSubTabs[subTab];
    if (activeSubTabs[subTab]) {
        $('.marker-' + subTab + ' .expand-button').addClass('fa-caret-down').removeClass('fa-caret-right');
        $('.challenge.' + subTab + '-challenge').removeClass('stay-hidden');
    } else {
        $('.marker-' + subTab + ' .expand-button').addClass('fa-caret-right').removeClass('fa-caret-down');
        $('.challenge.' + subTab + '-challenge').addClass('stay-hidden');
    }
}

// Finds the future challenge in each skill given a possible new chunk
var calcFutureChallenges = function() {
    let chunks = {};
    let challengeStr = '';
    $('.unlocked > .chunkId').each(function() {
        chunks[parseInt($(this).text())] = true;
    });
    if (chunks[infoLockedId.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]) {
        $('.panel-challenges').html(challengeStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') || 'None (chunk is already unlocked)');
        return;
    }
    chunks[infoLockedId.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = true;
    let i = 0;
    while (i < Object.keys(chunks).length) {
        !!chunkInfo['chunks'][Object.keys(chunks)[i]] && !!chunkInfo['chunks'][Object.keys(chunks)[i]]['Connect'] && Object.keys(chunkInfo['chunks'][Object.keys(chunks)[i]]['Connect']).forEach(id => {
            if (!!chunkInfo['chunks'][parseInt(id)]['Name'] && possibleAreas[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]) {
                chunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = true;
            }
        });
        i++;
    }
    myWorker.postMessage(['future', chunks, rules, chunkInfo, skillNames, processingSkill, maybePrimary, combatSkills, monstersPlus, objectsPlus, chunksPlus, itemsPlus, mixPlus, npcsPlus, tools, elementalRunes, manualTasks, completedChallenges, backlog, "1/" + rules['Rare Drop Amount'], universalPrimary, elementalStaves, rangedItems, boneItems, highestCurrent, dropTables, possibleAreas, randomLoot, magicTools, bossLogs, bossMonsters, minigameShops, manualEquipment, checkedChallenges]);
    workerOut++;
}

// Finds the future challenge in each skill given a possible new chunk 2
var calcFutureChallenges2 = function(valids, baseChunkDataLocal) {
    let highestChallenge = {};
    let challengeStr = '';

    Object.keys(valids).forEach(skill => {
        let highestCompletedLevel = 0;
        !!completedChallenges[skill] && Object.keys(completedChallenges[skill]).forEach(name => {
            if (!!chunkInfo['challenges'][skill][name] && chunkInfo['challenges'][skill][name]['Level'] > highestCompletedLevel) {
                highestCompletedLevel = chunkInfo['challenges'][skill][name]['Level'];
            }
        });
        if (!!highestCurrent[skill]) {
            if (globalValids[skill][highestCurrent[skill]] > highestCompletedLevel) {
                highestCompletedLevel = globalValids[skill][highestCurrent[skill]];
            }
        }
        checkPrimaryMethod(skill, valids, baseChunkDataLocal) && Object.keys(valids[skill]).forEach(challenge => {
            if (skill === 'Quest' || skill === 'Diary' || skill === 'BiS' || skill === 'Extra') {
                if (!globalValids[skill].hasOwnProperty(challenge) && valids[skill][challenge]) {
                    if ((skill === 'Quest' && rules["Show Quest Tasks"] && (chunkInfo['challenges'][skill][challenge].hasOwnProperty('QuestPoints') || !rules["Show Quest Tasks Complete"])) || (skill === 'BiS' && rules["Show Best in Slot Tasks"]) || (skill === 'Extra')) {
                        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                            let tempValid = true;
                            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkDataLocal)) {
                                    tempValid = false;
                                }
                            });
                            if (tempValid) {
                                challengeStr += `<span class="challenge ${skill + '-challenge'} noscroll">` + challenge.split('~')[0] + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((challenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + challenge.split('~')[1].split('|').join('') + '</a>' + (chunkInfo['challenges'][skill][challenge].hasOwnProperty('QuestPoints') ? ' complete quest' : challenge.split('~')[2])  + ` <span class='noscroll' onclick="showDetails('` + challenge.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\'/g, '%2H') + `', '` + skill + `', 'future')"><i class="challenge-icon fas fa-info-circle noscroll"></i></span>` + '</span>, '
                            }
                        } else {
                            challengeStr += `<span class="challenge ${skill + '-challenge'} noscroll">` + challenge.split('~')[0] + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((challenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + challenge.split('~')[1].split('|').join('') + '</a>' + (chunkInfo['challenges'][skill][challenge].hasOwnProperty('QuestPoints') ? ' complete quest' : challenge.split('~')[2])  + ` <span class='noscroll' onclick="showDetails('` + challenge.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\'/g, '%2H') + `', '` + skill + `', 'future')"><i class="challenge-icon fas fa-info-circle noscroll"></i></span>` + '</span>, '
                        }
                    }
                }
            } else {
                if (valids[skill][challenge] !== false && (chunkInfo['challenges'][skill][challenge]['Level'] > highestCompletedLevel || (highestCompletedLevel < 1))) {
                    if (((!highestChallenge[skill] || (chunkInfo['challenges'][skill][challenge]['Level'] > chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'])) || ((!highestChallenge[skill] || (chunkInfo['challenges'][skill][challenge]['Level'] === chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'])) && (!highestChallenge[skill] || !chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'] || (!!chunkInfo['challenges'][skill][challenge]['Priority'] && chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'])))) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                            let tempValid = true;
                            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkDataLocal)) {
                                    tempValid = false;
                                }
                            });
                            if (tempValid) {
                                highestChallenge[skill] = challenge;
                            }
                        } else {
                            highestChallenge[skill] = challenge;
                        }
                    } else if ((!highestChallenge[skill] || (chunkInfo['challenges'][skill][challenge]['Level'] === chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'])) && chunkInfo['challenges'][skill][challenge]['Primary'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                            let tempValid = true;
                            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkDataLocal)) {
                                    tempValid = false;
                                }
                            });
                            if (tempValid) {
                                highestChallenge[skill] = challenge;
                            }
                        } else {
                            highestChallenge[skill] = challenge;
                        }
                    }
                }
            }
        });
        !highestChallenge[skill] || (chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'] <= 1 && !chunkInfo['challenges'][skill][highestChallenge[skill]]['Primary']) && (highestChallenge[skill] = undefined);
        if (!!highestChallenge[skill] && skill !== 'Quest' && skill !== 'Nonskill') { 
            if (skill !== 'Quest' && skill !== 'Diary' && skill !== 'BiS' && skill !== 'Extra' && rules["Show Skill Tasks"]) {
                challengeStr += `<span class="challenge ${skill + '-challenge'} noscroll">` + highestChallenge[skill].split('~')[0] + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((highestChallenge[skill].split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + highestChallenge[skill].split('~')[1].split('|').join('') + '</a>' + highestChallenge[skill].split('~')[2] + ` <span class='noscroll' onclick="showDetails('` + highestChallenge[skill].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\'/g, '%2H') + `', '` + skill + `', 'future')"><i class="challenge-icon fas fa-info-circle noscroll"></i></span>` + '</span>, ';
            }
        }
    });
    challengeStr.length > 0 && (challengeStr = challengeStr.substring(0, challengeStr.length - 2));
    return challengeStr;
};

// Prints all items from all tasks (debug)
var printTaskItems = function() {
    let taskItems = {};

    !!chunkInfo['challenges'] && skillNames.forEach(skill => {
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).sort(function(a, b){return chunkInfo['challenges'][skill][a]['Level']-chunkInfo['challenges'][skill][b]['Level']}).forEach(name => {
            !!chunkInfo['challenges'][skill][name]['Items'] && chunkInfo['challenges'][skill][name]['Items'].forEach(item => {
                if (item.replaceAll(/\*/g, '').includes('+')) {
                    if (itemsPlus[item.replaceAll(/\*/g, '')]) {
                        itemsPlus[item.replaceAll(/\*/g, '')].forEach(plus => {
                            taskItems[plus] = true;
                        });
                    }
                } else {
                    taskItems[item.replaceAll(/\*/g, '')] = true;
                }
            });
        });
    });
    console.log(taskItems);
}

// Prints all levels for tasks (debug)
var printTaskLevels = function() {
    let taskLevels = {};

    !!chunkInfo['challenges'] && skillNames.forEach(skill => {
        taskLevels[skill] = {};
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).sort(function(a, b){return chunkInfo['challenges'][skill][a]['Level']-chunkInfo['challenges'][skill][b]['Level']}).forEach(name => {
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('Level')) {
                if (!taskLevels[skill][chunkInfo['challenges'][skill][name]['Level']]) {
                    taskLevels[skill][chunkInfo['challenges'][skill][name]['Level']] = [];
                }
                taskLevels[skill][chunkInfo['challenges'][skill][name]['Level']].push(name);
            }
        });
        Object.keys(taskLevels[skill]).forEach(level => {
            let fullPriority = true;
            taskLevels[skill][level].forEach(name => {
                if (!chunkInfo['challenges'][skill][name].hasOwnProperty('Priority')) {
                    fullPriority = false;
                }
            });
            if (taskLevels[skill][level].length < 2 || fullPriority) {
                delete taskLevels[skill][level];
            }
        });
    });
    console.log(taskLevels);
}

// Sets given panel to a loading screen
var setCalculating = function(panelClass) {
    if ($(panelClass).height() > 0) {
        $(panelClass).css({'min-height': $(panelClass).height() - 5 + 'px', 'font-size': 'max(min(10.4vw, 18px), ' + $(panelClass).height()/5 + 'px)'}).addClass('calculating').html('<i class="fas fa-spinner fa-spin"></i>');
        $(panelClass + ' > i').css('line-height', $(panelClass).height() + 'px');
    }
}

// Opens the add random event loot modal
var openRandomAdd = function() {
    randomModalOpen = true;
    $('#random-data').html('<div><div class="random-list" onclick="openRandomList()">Show Added Items</div><div class="random-cancel" onclick="addRandomLoot(true)">Cancel</div><div class="random-proceed disabled" onclick="addRandomLoot()">Add item</div></div>');
    $('#random-dropdown').empty().append(`<option value='${'Select an item'}'>${'Select an item'}</option>`);
    randomLootChoices.forEach(loot => {
        $('#random-dropdown').append(`<option value="${loot}">${loot}</option>`);
    });
    $('#myModal6').show();
}

// Opens the list of random items added modal
var openRandomList = function() {
    randomListModalOpen = true;
    $('#randomlist-data').empty();
    Object.keys(randomLoot).sort().forEach(loot => {
        $('#randomlist-data').append(`<div class='randomlist-item ${loot.replaceAll("'", "").replaceAll(" ", "_").replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-loot'} noscroll'>${loot}<span class='noscroll' onclick="removeRandomLoot('${loot}')"><i class="fas fa-times noscroll"></i></span></div>`);
    });
    if ($('#randomlist-data').children().length === 0) {
        $('#randomlist-data').append(`<div class="noscroll results"><span class="noscroll">No items</span></div>`);
    }
    $('#myModal8').show();
}

// Removes passed item from added random loot
var removeRandomLoot = function(item) {
    if (randomLoot.hasOwnProperty(item)) {
        delete randomLoot[item];
        $('#randomlist-data').children('.' + item.replaceAll("'", "").replaceAll(" ", "_").replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-loot').remove();
        if ($('#randomlist-data').children().length === 0) {
            $('#randomlist-data').append(`<div class="noscroll results"><span class="noscroll">No items</span></div>`);
        }
        !onMobile && setCalculating('.panel-active');
        calcCurrentChallenges();
        setData();
    }
}

// Triggers onchange of random selection to validate submit button
var randomChange = function() {
    let val = $('#random-dropdown').val();
    if (val !== 'Select an item') {
        $('.random-proceed').removeClass('disabled');
    } else {
        $('.random-proceed').addClass('disabled');
    }
}

// Submits picked random loot if one is chosen, then closes modal either way
var addRandomLoot = function(close) {
    if (close) {
        $('#myModal6').hide();
        randomModalOpen = false;
    } else {
        let loot = $('#random-dropdown').val();
        if (loot !== 'Select an item') {
            if (loot !== '') {
                randomLoot[loot] = true;
                !onMobile && setCalculating('.panel-active');
                calcCurrentChallenges();
                setData();
            }
            $('#myModal6').hide();
            randomModalOpen = false;
        }
    }
}

// Opens the manual add tasks modal
var openManualAdd = function() {
    fullChallengeArr = {};
    Object.keys(chunkInfo['challenges']).forEach(skill => {
        if (skill !== 'Nonskill') {
            Object.keys(chunkInfo['challenges'][skill]).forEach(challenge => {
                if (!fullChallengeArr[challenge]) {
                    fullChallengeArr[challenge] = [];
                }
                fullChallengeArr[challenge].push(skill);
            });
        }
    });
    manualModalOpen = true;
    $('.challenge-data').empty();
    if (Object.keys(fullChallengeArr).length <= 100) {
        Object.keys(fullChallengeArr).sort().forEach(challenge => {
            if (!filterByChecked || (!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge])) {
                $('.challenge-data').append(`<div class="noscroll"><input class="noscroll" ${!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge] && "checked"} type="checkbox" onclick="addManualTask('` + challenge.replaceAll(/\'/g, '-2H') + `')" />` + challenge.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '') + `</div>`);
            }
        });
    } else {
        $('.challenge-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(fullChallengeArr).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
    }
    if ($('.challenge-data').children().length === 0) {
        $('.challenge-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
    $('#myModal').show();
    $('#searchManual').val('').focus();
}

// Filters the full list of challenges
var searchManualTasks = function() {
    let searchTemp = $('#searchManual').val().toLowerCase();
    $('.challenge-data').empty();
    if (Object.keys(fullChallengeArr).filter(challenge => challenge.toLowerCase().replaceAll('~', '').replaceAll('|', '').includes(searchTemp)).length <= 100 || filterByChecked) {
        Object.keys(fullChallengeArr).filter(challenge => challenge.toLowerCase().replaceAll('~', '').replaceAll('|', '').includes(searchTemp)).sort().forEach(challenge => {
            if (!filterByChecked || (!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge])) {
                $('.challenge-data').append(`<div class="noscroll"><input class="noscroll" ${!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge] && "checked"} type="checkbox" onclick="addManualTask('` + challenge.replaceAll(/\'/g, '-2H') + `')" />` + challenge.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '') + `</div>`);
            }
        });
    } else {
        $('.challenge-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(fullChallengeArr).filter(challenge => challenge.toLowerCase().replaceAll('~', '').replaceAll('|', '').includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
    }
    if ($('.challenge-data').children().length === 0) {
        $('.challenge-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Toggle filtering by checked-only
var changeFilterBy = function() {
    filterByChecked = !filterByChecked;
    searchManualTasks();
}

// Adds the given challenge to the manual list
var addManualTask = function(challenge) {
    challenge = challenge.replaceAll(/\-2H/g, "'");
    fullChallengeArr[challenge].forEach(skill => {
        if (!manualTasks[skill] || !manualTasks[skill][challenge]) {
            if (!manualTasks[skill]) {
                manualTasks[skill] = {};
            }
            manualTasks[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'] || true;
            chunkInfo['challenges'][skill][challenge]['Manual'] = true;
        } else {
            delete manualTasks[skill][challenge];
            delete chunkInfo['challenges'][skill][challenge]['Manual'];
            if (Object.keys(manualTasks[skill]).length === 0) {
                delete manualTasks[skill];
            }
        }
    });
    !onMobile && setCalculating('.panel-active');
    calcCurrentChallenges();
}

// Opens the manual complete tasks modal
var openManualComplete = function() {
    completeModalOpen = true;
    $('#myModal14').show();
}

// Opens the search within my chunks modal
var openSearch = function() {
    searchModalOpen = true;
    $('#myModal10').show();
    $('#searchChunks').val('').focus();
    searchWithinChunks();
}

// Searches for matching names within chunk data
var searchWithinChunks = function() {
    let searchTemp = $('#searchChunks').val().toLowerCase();
    $('.searchchunks-data').empty();
    if (Object.keys(baseChunkData).length > 0 && Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length <= 200) {
        Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Items</b></div>`);
        Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach(item => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("items", "${item.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</span></div>`);
        });
        Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Monsters</b></div>`);
        Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach(monster => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("monsters", "${monster.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</span></div>`);
        });
        Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Npcs</b></div>`);
        Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach(npc => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("npcs", "${npc.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</span></div>`);
        });
        Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Objects</b></div>`);
        Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach(object => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("objects", "${object.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${object.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</span></div>`);
        });
    } else if (Object.keys(baseChunkData).length > 0) {
        $('.searchchunks-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
    }
    if ($('.searchchunks-data').children().length === 0) {
        $('.searchchunks-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

var openSearchDetails = function(category, name) {
    name = name.replaceAll(/\%2X/g, "'").replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")");
    searchDetailsModalOpen = true;
    $('.searchdetails-data').empty();
    $('.searchdetails-title').text(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\|\~/g, '').replaceAll(/\~\|/g, ''));
    let skills = [...skillNames];
    skills.push('Nonskill');
    let formattedSources = [];
    Object.keys(baseChunkData[category][name]).forEach(source => {
        let formattedSource = '';
        if (typeof baseChunkData[category][name][source] === "boolean" || !skills.includes(baseChunkData[category][name][source].split('-')[1])) {
            if (chunkInfo['chunks'].hasOwnProperty(source)) {
                let realName = source;
                if (!!chunkInfo['chunks'][source]['Name']) {
                    realName = chunkInfo['chunks'][source]['Name'];
                } else if (!!chunkInfo['chunks'][source]['Nickname']) {
                    realName = chunkInfo['chunks'][source]['Nickname'] + '(' + source + ')';
                }
                formattedSource += realName.replaceAll(/\~\|/g, '').replaceAll(/\|\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2H/g, "'").replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")");
            } else {
                let shownSource = source;
                if (shownSource.includes('|')) {
                    shownSource = shownSource.split('|')[1].charAt(0).toUpperCase() + shownSource.split('|')[1].slice(1);
                }
                formattedSource += `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(shownSource.replaceAll(/\~\|/g, '').replaceAll(/\|\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2H/g, "'").replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")").replaceAll(/\*/g, ''))} target="_blank">${shownSource.replaceAll(/\~\|/g, '').replaceAll(/\|\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2H/g, "'").replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")").replaceAll(/\*/g, '')}</a>`
            }
        }
        if (typeof baseChunkData[category][name][source] !== "boolean" && skills.includes(baseChunkData[category][name][source].split('-')[1])) {
            formattedSource += baseChunkData[category][name][source].split('-')[1].replaceAll(/\*/g, '');
            formattedSource += ` (${source.replaceAll(/\~\|/g, '').replaceAll(/\|\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\*/g, '').replaceAll(/\%2H/g, "'").replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")").replaceAll(/\*/g, '')})`
        } else if (typeof baseChunkData[category][name][source] !== "boolean" && !baseChunkData[category][name][source].includes('primary') && !baseChunkData[category][name][source].includes('secondary') && !baseChunkData[category][name][source] === 'shop') {
            formattedSource += `-${baseChunkData[category][name][source].replaceAll(/\*/g, '')}`;
        } else if (typeof baseChunkData[category][name][source] !== "boolean") {
            formattedSource += ` (${baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '')})`;
        }
        formattedSources.push(formattedSource);
    });
    formattedSources.sort().forEach(formattedSource => {
        $('.searchdetails-data').append(`<div class="noscroll results">${formattedSource.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\|\~/g, '').replaceAll(/\~\|/g, '').replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")")}</div>`);
    });
    $('#myModal11').show();
    document.getElementById('searchdetails-data').scrollTop = 0;
}

// Opens the highest modal
var openHighest = function() {
    highestModalOpen = true;
    let combatStyles = [];
    let primarySkill = [];
    if (rules['Show Skill Tasks']) {
        combatStyles.push('Skills');
        skillNames.forEach(skill => {
            primarySkill[skill] = checkPrimaryMethod(skill, globalValids, baseChunkData);
        });
    }
    if (rules['Show Best in Slot Tasks']) {
        combatStyles.push('Melee');
        combatStyles.push('Ranged');
        combatStyles.push('Magic');
    }
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
    let slots = ['Head', 'Neck', 'Cape', 'Body', 'Legs', 'Weapon', 'Shield', 'Ammo', 'Hands', 'Feet', 'Ring'];
    $('.highest-title').empty();
    $('.highest-data').empty();
    combatStyles.forEach(combatStyle => {
        $('.highest-title').append(`<div class='noscroll style-button ${combatStyle.replaceAll(' ', '_')}-button' onclick='switchHighestTab("${combatStyle.replaceAll(' ', '_')}")' title='${combatStyle}'><span class='noscroll'><img class='noscroll slot-icon' src='./resources/${combatStyle.replaceAll(' ', '_')}_combat.png' /></span></div>`);
        $('.highest-data').append(`<div class='noscroll style-body ${combatStyle.replaceAll(' ', '_')}-body'><div class='highest-subtitle noscroll'>${combatStyle} ${combatStyle !== 'Skills' ? `<div class='noscroll'><span class='noscroll addEquipment' onclick='addEquipment()'>Add additional equipment</span></div>` : ''}</div></div>`);
        if (combatStyle === 'Skills') {
            $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row row-header'><span class='noscroll icon-table-header'>Skill</span><span class='noscroll text-table-header'>Highest Task</span><span class='noscroll button-table-header'>Primary Training</span></div>`);
            skillNames.filter(skill => {return skill !== 'Combat'}).sort().forEach(skill => {
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><span class='noscroll skill-icon-wrapper'><img class='noscroll skill-icon' src='./resources/${skill}_skill.png' title='${skill}' /></span><span class='noscroll skill-text'>${(!!highestOverall[skill] ? '<b class="noscroll">[' + chunkInfo['challenges'][skill][highestOverall[skill]]['Level'] +']</b> ' : '') + (highestOverall[skill] || 'None').replaceAll('~', '').replaceAll('|', '')}</span><span class='noscroll skill-button ${(primarySkill[skill] ? 'active' : '')}'>${primarySkill[skill] ? `<div class='noscroll' onclick='viewPrimaryMethods("${skill}")'>View Methods</div></span>` : `<div class='noscroll'>None</div></span>`}</div>`);
            });
        } else {
            slots.forEach(slot => {
                if (highestOverall.hasOwnProperty(combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()) && highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()] !== 'N/A') {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><img class='noscroll slot-icon' src='./resources/${slot}_slot.png' title='${slot}' /><span class='noscroll slot-text'><a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">${highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]}</a></span></div>`);
                } else if (highestOverall.hasOwnProperty(combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()) && highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()] === 'N/A') {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><img class='noscroll slot-icon' src='./resources/${slot}_slot.png' title='${slot}' /><span class='noscroll slot-text'>${highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]}</span></div>`);
                } else if (slot === 'Weapon' || slot === 'Shield' || combatStyle !== 'Flinch') {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><img class='noscroll slot-icon' src='./resources/${slot}_slot.png' title='${slot}' /><span class='noscroll slot-text'>None</span></div>`);
                }
            });
        }
    });
    $('.style-body').hide();
    $(`.${combatStyles[0]}-button`).addClass('active-tab');
    $(`.${combatStyles[0]}-body`).show();
    $('#myModal12').show();
    document.getElementById('highest-data').scrollTop = 0;
}

// Opens the add equipment modal
var addEquipment = function() {
    addEquipmentModalOpen = true;
    $('#myModal15').show();
    $('#searchAddEquipment').val('').focus();
    searchAddEquipment();
}

// Searches for matching names within equipment data
var searchAddEquipment = function() {
    let searchTemp = $('#searchAddEquipment').val().toLowerCase();
    $('.add-equipment-data').empty();
    if ((Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length <= 200) || filterByCheckedEquipment) {
        Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedEquipment || !!manualEquipment[item])).length > 0 && Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedEquipment || !!manualEquipment[item])).sort().forEach(item => {
            $('.add-equipment-data').append(`<div class="search-equipment-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualEquipment && !!manualEquipment[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '')] && "checked"} type="checkbox" onclick="addManualEquipment('` + item.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '-2P').replaceAll(/\)/g, '-2Q') + `')" /><a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replace(/[!'()*]/g, escape))}' target='_blank'>${item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
    } else if (Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0) {
        $('.add-equipment-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
    }
    if ($('.add-equipment-data').children().length === 0) {
        $('.add-equipment-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Toggle filtering of equipment by checked-only
var changeEquipmentFilterBy = function() {
    filterByCheckedEquipment = !filterByCheckedEquipment;
    searchAddEquipment();
}

// Adds the given equipment to the manual list
var addManualEquipment = function(equip) {
    equip = equip.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll('_', ' ').replaceAll(/\-2H/g, "'").replaceAll(/\-2Z/g, '&').replaceAll(/\-2P/g, '(').replaceAll(/\-2Q/g, ')');
    if (!manualEquipment[equip]) {
        manualEquipment[equip] = true;
    } else {
        delete manualEquipment[equip];
    }
    !onMobile && setCalculating('.panel-active');
    calcCurrentChallenges();
}

// Opens the methods modal
var viewPrimaryMethods = function(skill) {
    methodsModalOpen = true;
    let methods = checkPrimaryMethod(skill, globalValids, baseChunkData, true);
    $('.methods-data').empty();
    methods.forEach(method => {
        $('.methods-data').append(`<div class='noscroll skill-method'>${method.replaceAll('~', '').replaceAll('|', '')}</div>`)
    });
    $('#myModal13').show();
    document.getElementById('methods-data').scrollTop = 0;
}

// Switches Highest Tab
var switchHighestTab = function(tab) {
    $('.style-body').hide();
    $(`.style-button`).removeClass('active-tab');
    $(`.${tab}-button`).addClass('active-tab');
    $(`.${tab}-body`).show();
}

// Closes the manual add tasks modal
var closeManualAdd = function() {
    manualModalOpen = false;
    $('#myModal').hide();
}

// Closes the challenge details modal
var closeChallengeDetails = function() {
    detailsModalOpen = false;
    $('#myModal2').hide();
}

// Closes the challenge notes modal
var closeChallengeNotes = function() {
    notesModalOpen = false;
    $('#myModal3').hide();
}

// Closes the rules modal
var closeRules = function() {
    rulesModalOpen = false;
    $('#myModal4').hide();
}

// Closes the settings modal
var closeSettings = function() {
    settingsModalOpen = false;
    $('#myModal7').hide();
}

// Closes the random list modal
var closeRandomList = function() {
    randomListModalOpen = false;
    $('#myModal8').hide();
}

// Closes the stats error modal
var closeStatsError = function() {
    statsErrorModalOpen = false;
    $('#myModal9').hide();
}

// Closes the search modal
var closeSearch = function() {
    searchModalOpen = false;
    $('#myModal10').hide();
}

// Closes the search details modal
var closeSearchDetails = function() {
    searchDetailsModalOpen = false;
    $('#myModal11').hide();
}

// Closes the highest modal
var closeHighest = function() {
    highestModalOpen = false;
    $('#myModal12').hide();
}

// Closes the methods modal
var closeMethods = function() {
    methodsModalOpen = false;
    $('#myModal13').hide();
}

// Closes the complete modal
var closeComplete = function() {
    completeModalOpen = false;
    $('#myModal14').hide();
}

// Closes the add equipment modal
var closeAddEquipment = function() {
    addEquipmentModalOpen = false;
    $('#myModal15').hide();
}

// Manually completes checked-off tasks
var submitCompleteTasks = function() {
    completeChallenges();
    !onMobile && setCalculating('.panel-active');
    completeModalOpen = false;
    $('#myModal14').hide();
}

// Unlocks various parts of the chunk tasks panel
var unlockChallenges = function() {
    (workerOut === 0) && setupCurrentChallenges(highestCurrent);
}

// Displays the current challenges, areas, backlog, and completed challenges
var setCurrentChallenges = function(backlogArr, completedArr) {
    (challengeArr.length > 0 || workerOut === 0) && $('.panel-active').css({'min-height': '', 'font-size': ''}).removeClass('calculating').empty();
    (challengeArr.length > 0 || workerOut === 0) && $('.panel-active > i').css('line-height', '');
    (challengeArr.length > 0 || workerOut === 0) && challengeArr.forEach(line => {
        $('.panel-active').append(line);
    });
    if ($('.panel-active .skill-challenge').length === 0) {
        $('.marker-skill').remove();
    }
    if ($('.panel-active .bis-challenge').length === 0) {
        $('.marker-bis').remove();
    }
    if ($('.panel-active .quest-challenge').length === 0) {
        $('.marker-quest').remove();
    }
    if ($('.panel-active .diary-challenge').length === 0) {
        $('.marker-diary').remove();
    }
    if ($('.panel-active .extra-challenge').length === 0) {
        $('.marker-extra').remove();
    }
    if ($('.panel-active').children().length === 0) {
        if (checkFalseRules()) {
            $('.panel-active').append('Please select your Chunk Rules.');
        } else {
            $('.panel-active').append('No current chunk tasks.');
        }
    }
    getChunkAreas();
    setAreas();
    $('.panel-backlog').css({'min-height': '', 'font-size': ''}).removeClass('calculating').empty();
    $('.panel-backlog > i').css('line-height', '');
    backlogArr.forEach(line => {
        $('.panel-backlog').append(line);
    });
    $('.panel-completed').css({'min-height': '', 'font-size': ''}).removeClass('calculating').empty();
    $('.panel-completed > i').css('line-height', '');
    completedArr.forEach(line => {
        $('.panel-completed').append(line);
    });
}

// Check if all rules are off
var checkFalseRules = function() {
    var all_false = true;
    for (var s in rules) {
        if (rules[s] === true) {
            all_false = false;
            break;
        }
    }
    return all_false;
}

// Get all possible areas within unlocked chunks
var getChunkAreas = function() {
    let chunks = {};
    $('.unlocked').each(function() {
        chunks[parseInt($(this).text())] = true;
    });
    let i = 0;
    let temp = {};
    let temp2 = {};
    while (i < Object.keys(chunks).length) {
        !!chunkInfo['chunks'][Object.keys(chunks)[i]] && !!chunkInfo['chunks'][Object.keys(chunks)[i]]['Connect'] && Object.keys(chunkInfo['chunks'][Object.keys(chunks)[i]]['Connect']).forEach(id => {
            if (!!chunkInfo['chunks'][parseInt(id)]['Name'] && possibleAreas[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] && !chunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]) {
                chunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = true;
                temp[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = possibleAreas[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] || false;
                if (!!possibleAreas[Object.keys(chunks)[i]]) {
                    if (!temp2[Object.keys(chunks)[i]] || !temp2[Object.keys(chunks)[i]][chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]) {
                        if (!temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]) {
                            temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = {};
                        }
                        temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')][Object.keys(chunks)[i]] = true;
                    }
                }
            } else if (!!chunkInfo['chunks'][parseInt(id)]['Name']) {
                temp[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = possibleAreas[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] || false;
                if (!!possibleAreas[Object.keys(chunks)[i]]) {
                    if (!temp2[Object.keys(chunks)[i]] || !temp2[Object.keys(chunks)[i]][chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]) {
                        if (!temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]) {
                            temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = {};
                        }
                        temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')][Object.keys(chunks)[i]] = true;
                    }
                }
            }
        });
        i++;
    }
    possibleAreas = temp;
    areasStructure = temp2;
    return chunks;
}

// Sets areas in the area tab
var setAreas = function() {
    $('.panel-areas').css({'min-height': '', 'font-size': ''}).removeClass('calculating').empty();
    $('.panel-areas > i').css('line-height', '');
    let newAreas = [];
    !!possibleAreas && Object.keys(possibleAreas).length > 0 && Object.keys(possibleAreas).sort(function(a, b) { return a.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').localeCompare(b.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')) }).forEach(area => {
        if (!!areasStructure && !!areasStructure[area.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]) {
            newAreas.push(area);
        }
        !areasStructure.hasOwnProperty(area) && $('.panel-areas').append(`<div data-depth="0" class="base area ${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-area'} noscroll"><input class="noscroll" type='checkbox' ${possibleAreas[area] && "checked"} onclick="checkOffAreas(this, ${"`" + area + "`"})" ${(viewOnly || inEntry || locked) && "disabled"} /> <a class='link' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(area.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))}' target="_blank">` + area.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a></div>');
    });
    let counter = 0;
    newAreas = newAreas.sort(function(a, b) { return b.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').localeCompare(a.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')) });
    if (!!possibleAreas && !!areasStructure && !!newAreas) {
        while (counter < newAreas.length) {
            let area = newAreas[counter++];
            Object.keys(areasStructure[area.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]).forEach(parent => {
                if ($(`.area.${parent.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`).length < 1 && areasStructure.hasOwnProperty(area)) {
                    newAreas.push(area);
                    if ($(`.area.${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`).length > 0) {
                        $(`.area.${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area:not(.base)`).remove();
                    }
                } else if (areasStructure.hasOwnProperty(area)) {
                    let num = parseInt($(`.area.${parent.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`).attr('data-depth')) + 1;
                    $(`.area.${parent.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`).append(`<div data-depth="${num}" class="area ${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-area'} noscroll"><input class="noscroll" type='checkbox' ${possibleAreas[area] && "checked"} onclick="checkOffAreas(this, ${"`" + area + "`"})" ${(viewOnly || inEntry || locked) && "disabled"} /> <a class='link' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(area.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))}' target="_blank">` + area.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a></div>');
                }
            });
        }
    }
    if (!possibleAreas || Object.keys(possibleAreas).length <= 0) {
        $('.panel-areas').append('No areas currently available.');
    }
}

// Firefox functionality for browser dimensions
function getBrowserDim() {
    if (window.innerHeight) {
        return { w: window.innerWidth, h: window.innerHeight};
    } else {
        return { w: document.body.clientWidth, h: document.body.clientHeight };
    }
}

// Opens the context menu for an active challenge
var openActiveContextMenu = function(challenge, skill) {
    if (activeContextMenuChallengeOld !== challenge) {
        activeContextMenuChallenge = challenge;
        activeContextMenuSkill = skill;
        let dims = getBrowserDim();
        let x = event.pageX + $(".active-context-menu").width() + 5 > dims['w'] ? dims['w'] - $(".active-context-menu").width() - 5 : event.pageX - 5;
        let y = event.pageY + $(".active-context-menu").height() + 5 > dims['h'] ? dims['h'] - $(".active-context-menu").height() - 5 : event.pageY - 5;
        $(".active-context-menu").finish().toggle(100).css({
            top: y + "px",
            left: x + "px"
        });
    }
}

// Opens the context menu for a backlogged challenge
var openBacklogContextMenu = function(challenge, skill) {
    if (backlogContextMenuChallengeOld !== challenge) {
        backlogContextMenuChallenge = challenge;
        backlogContextMenuSkill = skill;
        let dims = getBrowserDim();
        let x = event.pageX + $(".backlog-context-menu").width() + 5 > dims['w'] ? dims['w'] - $(".backlog-context-menu").width() - 5 : event.pageX - 5;
        let y = event.pageY + $(".backlog-context-menu").height() + 5 > dims['h'] ? dims['h'] - $(".backlog-context-menu").height() - 5 : event.pageY - 5;
        $(".backlog-context-menu").finish().toggle(100).css({
            top: y + "px",
            left: x + "px"
        });
    }
}

// Shows challenge details
var showDetails = function(challenge, skill, type) {
    let baseChunkDataIn = type === 'future' ? futureChunkData : baseChunkData;
    let detailsKeys = ['ItemsDetails', 'ObjectsDetails', 'MonstersDetails', 'NPCsDetails', 'ChunksDetails'];
    let skills = [...skillNames];
    skills.push('Nonskill');
    detailsModalOpen = true;
    $('#details-data').empty();
    $('#details-title').html(`<b class="noscroll">${challenge.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2H/g, "'")}</b>`);
    chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'")].hasOwnProperty('Description') && $('#details-data').append(`<span class="details-subtitle noscroll"><i class="noscroll">${chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'")]['Description']}</i></span><br />`);
    detailsKeys.forEach(key => {
        $('#details-data').append(`<span class="details-subtitle noscroll"><u class="noscroll"><b class="noscroll">${key.split('Details')[0].toLowerCase()}</b></u></span><br />`);
        !!chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'")][key] && chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'")][key].forEach(el => {
            let formattedSource = '';
            if (key === 'ChunksDetails') {
                formattedSource = '   ';
            } else if (!!baseChunkDataIn[key.split('Details')[0].toLowerCase()]) {
                formattedSource = ': ';
                !!baseChunkDataIn[key.split('Details')[0].toLowerCase()][el] && Object.keys(baseChunkDataIn[key.split('Details')[0].toLowerCase()][el]).forEach(source => {
                    if ((!chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'")].hasOwnProperty('NonShop') || !chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'")]['NonShop'] || baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source] !== 'shop') && (rules['Wield Crafted Items'] || ![...combatSkills, 'BiS', 'Extra'].includes(skill) || !processingSkill[baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].split('-')[1]])) {
                        if (typeof baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source] === "boolean" || !skills.includes(baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].split('-')[1])) {
                            if (chunkInfo['chunks'].hasOwnProperty(source)) {
                                let realName = source;
                                if (!!chunkInfo['chunks'][source]['Name']) {
                                    realName = chunkInfo['chunks'][source]['Name'];
                                } else if (!!chunkInfo['chunks'][source]['Nickname']) {
                                    realName = chunkInfo['chunks'][source]['Nickname'] + '(' + source + ')';
                                }
                                formattedSource += realName.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2H/g, "'").replaceAll(/\*/g, '');
                            } else {
                                let shownSource = source;
                                if (shownSource.includes('|')) {
                                    shownSource = shownSource.split('|')[1].charAt(0).toUpperCase() + shownSource.split('|')[1].slice(1);
                                }
                                formattedSource += `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(shownSource.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2H/g, "'").replaceAll(/\*/g, ''))} target="_blank">${shownSource.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2H/g, "'").replaceAll(/\*/g, '')}</a>`;
                            }
                        }
                        if (typeof baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source] !== "boolean" && skills.includes(baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].split('-')[1])) {
                            formattedSource += baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].split('-')[1].replaceAll(/\*/g, '');
                            formattedSource += ` (${source.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\*/g, '').replaceAll(/\%2H/g, "'")})`
                        } else if (typeof baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source] !== "boolean" && !baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].includes('primary') && !baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].includes('secondary') && !baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source] === 'shop') {
                            formattedSource += `-${baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].replaceAll(/\*/g, '')}`;
                        } else if (typeof baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source] !== "boolean") {
                            formattedSource += ` (${baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '')})`;
                        }
                        formattedSource += ', ';
                    }
                });
            }
            formattedSource = formattedSource.slice(0, -2);
            if (Object.keys(baseChunkDataIn[key.split('Details')[0].toLowerCase()][el]).length > 10) {
                formattedSource = ': <span class="noscroll tosearchdetails" onclick="openSearchDetails(`' + key.split('Details')[0].toLowerCase().replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\'/g, '%2H') + '`, `' + el.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\'/g, '%2H') + '`)">' +  'Many sources (' + Object.keys(baseChunkDataIn[key.split('Details')[0].toLowerCase()][el]).length + ')</span>';
            }
            if (formattedSource !== '') {
                $('#details-data').append(`<span class="noscroll"><b class="noscroll">${el.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2H/g, "'")}</b></span><span class="noscroll">${formattedSource}</span><br />`);
            }
        });
        if (!chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'")][key] || chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'")][key].length === 0) {
            $('#details-data').append('<span class="noscroll">None</span><br />');
        }
    });
    $('#myModal2').show();
    document.getElementById('details-data').scrollTop = 0;
}

// Shows challenge notes
var showNotes = function(challenge, skill, note) {
    if (note === true) {
        note = '';
    }
    $('#notes-title').html(`<b class="noscroll">Add note to:</b><br />${challenge.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')}`);
    notesModalOpen = true;
    $('#myModal3').show();
    $('#notes-data > textarea').val(note).focus();
    notesChallenge = challenge;
    notesSkill = skill;
}

// Submit notes for challenge
var submitNotes = function() {
    backlogChallenge(notesChallenge, notesSkill, $('#notes-data > textarea').val());
    closeChallengeNotes();
}

// Apply the given rule preset
var applyPreset = function(preset) {
    $('#myModal5').hide();
    !!rulePresets && !!rulePresets[preset] && Object.keys(rules).forEach(rule => {
        if (rule === 'Kill X Amount') {
            rules[rule] = rulePresets[preset][rule];
            $('.x-num-input').val(rulePresets[preset][rule]);
        } else if (rule === 'Rare Drop Amount') {
            rules[rule] = rulePresets[preset][rule];
            $('.rare-num-input').val(rulePresets[preset][rule]);
        } else {
            rules[rule] = rulePresets[preset].hasOwnProperty(rule);
            $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule > input').prop('checked', rulePresets[preset].hasOwnProperty(rule));
        }
    });
    !!rulePresets && !!rulePresets[preset] && checkOffRules();
}

// Shows warning modal for applying a preset
var warnPreset = function(preset) {
    $('#preset-data').empty();
    $('#preset-title').text('Apply the ' + preset + ' preset?');
    $('.specific-preset').text(preset);
    $('#preset-data').html('<div><div class="preset-cancel" onclick="applyPreset(``)">Cancel</div><div class="preset-proceed" onclick="applyPreset(`' + preset + '`)">Yes, proceed</div></div>');
    $('#myModal5').show();
}

// Shows challenge details
var showRules = function() {
    rulesModalOpen = true;
    $('#rules-data').empty();
    $('#rules-data').append(`<div class="rule-category presets-category noscroll">Rule Presets</div><div class="rule-subcategory presets-subcategory noscroll">Pick a preset to get started, and then turn on and off different rules to suit your playstyle!</div><div id="rules-presets" class="rules-presets noscroll"></div>`);
    Object.keys(rulePresets).forEach(preset => {
        $('#rules-presets').append(`<div class="preset-button noscroll" onclick="warnPreset('${preset}')">${preset}<br /><span>${rulePresetFlavor[preset]}</span></div>`);
    });
    Object.keys(ruleStructure).forEach(category => {
        $('#rules-data').append(`<div class="rule-category ${category.replaceAll(/\ /g, '_')}-category noscroll">${category}</div>`);
        !!ruleStructure[category] && Object.keys(ruleStructure[category]).forEach(rule => {
            if (rule !== 'Kill X Amount' && rule !== 'Rare Drop Amount') {
                if (rule === 'Kill X') {
                    $('.' + category.replaceAll(/\ /g, '_') + '-category').append(`<div class="rule ${rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule'} noscroll"><input class="noscroll" type='checkbox' ${rules[rule] && "checked"} onclick="checkOffRules()" ${(viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "disabled" : ''} /><span class='noscroll'>` + ruleNames[rule].split('X-amount')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<input type='number' class='x-num-input' min='1' value="${rules['Kill X Amount']}" onchange="checkOffRules()" /> ` + ruleNames[rule].split('X-amount')[1].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</span></div>');
                } else if (rule === 'Rare Drop') {
                    $('.' + category.replaceAll(/\ /g, '_') + '-category').append(`<div class="rule ${rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule'} noscroll"><span class='noscroll'>` + ruleNames[rule].split('/X')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + ` / <input type='number' class='rare-num-input' min='0' value="${rules['Rare Drop Amount']}" onchange="checkOffRules()" /> ` + ruleNames[rule].split('/X')[1].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</span></div>');
                } else {
                    $('.' + category.replaceAll(/\ /g, '_') + '-category').append(`<div class="rule ${rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule'} noscroll"><input class="noscroll" type='checkbox' ${rules[rule] && "checked"} onclick="checkOffRules()" ${(viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "disabled" : ''} /><span class='noscroll'>` + ruleNames[rule].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</span></div>');
                }
                Array.isArray(ruleStructure[category][rule]) && ruleStructure[category][rule].forEach(subRule => {
                    $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').append(`<div class="rule ${subRule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule subrule'} noscroll"><input class="noscroll" type='checkbox' ${rules[subRule] && "checked"} onclick="checkOffRules()" ${(viewOnly || inEntry || locked || ruleStructure[category][subRule] === false) ? "disabled" : ''} /><span class='noscroll'>` + ruleNames[subRule].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</span></div>');
                });
            }
        });
    });
    document.getElementById('rules-data').scrollTop = 0;
    checkOffRules(false, true);
    $('#myModal4').show();
}

// Shows settings details
var showSettings = function() {
    settingsModalOpen = true;
    $('#settings-data').empty();
    Object.keys(settingStructure).forEach(category => {
        $('#settings-data').append(`<div class="setting-category ${category.replaceAll(/\ /g, '_')}-category noscroll">${category}</div>`);
        !!settingStructure[category] && Object.keys(settingStructure[category]).forEach(setting => {
            if (setting === 'completedTaskColor') {
                $('.' + category.replaceAll(/\ /g, '_') + '-category').append(`<div class="setting ${setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting'} noscroll"><input class="challenge-color-rule" type="color" value="${settings[setting]}" onchange="changeChallengeColor()" /><i class="fas fa-undo-alt noscroll reset-challenge-color" title="Reset Color" onclick="resetChallengeColor()"></i><span class='noscroll extraspace'>` + settingNames[setting].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</span></div>');
            } else {
                $('.' + category.replaceAll(/\ /g, '_') + '-category').append(`<div class="setting ${setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting'} noscroll"><input class="noscroll" type='checkbox' ${settings[setting] && "checked"} onclick="checkOffSettings()" ${(viewOnly || inEntry || locked || settingStructure[category][setting] === false) ? "disabled" : ''} /><span class='noscroll'>` + settingNames[setting].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</span></div>');
            }
        });
    });
    document.getElementById('settings-data').scrollTop = 0;
    checkOffSettings('startup');
    $('#myModal7').show();
    settingsMenu();
}

// Changes the active challenges color
var changeChallengeColor = function() {
    $('.challenge-color-rule').length && (settings['completedTaskColor'] = $('.challenge-color-rule').val());
    $('.challenge.hide-backlog').css({'color': settings['completedTaskColor'], 'text-decoration': settings['completedTaskStrikethrough'] ? 'line-through' : 'none'});
    $('.challenge.hide-backlog a').css({'color': settings['completedTaskColor'], 'text-decoration': settings['completedTaskStrikethrough'] ? 'line-through' : 'underline'});
    $('.challenge:not(.hide-backlog)').css({'color': 'black', 'text-decoration': 'none'});
    $('.challenge:not(.hide-backlog) a').css({'color': 'black', 'text-decoration': 'underline'});
    setData();
}

// Resets the active challenges color
var resetChallengeColor = function() {
    $('.challenge-color-rule').val('#0D8219');
    changeChallengeColor();
}

// Selects correct active context menu item
var switchActiveContext = function(opt) {
    switch(opt) {
        case "backlog": backlogChallenge(activeContextMenuChallenge, activeContextMenuSkill, ''); break;
        case "backlog note": showNotes(activeContextMenuChallenge, activeContextMenuSkill, ''); break;
        case "details": showDetails(activeContextMenuChallenge, activeContextMenuSkill, ''); break;
    }
    $(".active-context-menu").hide(100);
}

// Selects correct backlog context menu item
var switchBacklogContext = function(opt) {
    switch(opt) {
        case "unbacklog": unbacklogChallenge(backlogContextMenuChallenge, backlogContextMenuSkill); break;
        case "edit note": showNotes(backlogContextMenuChallenge, backlogContextMenuSkill, backlog[backlogContextMenuSkill][backlogContextMenuChallenge]); break;
        case "details": showDetails(backlogContextMenuChallenge, backlogContextMenuSkill, ''); break;
    }
    $(".backlog-context-menu").hide(100);
}

// Sends a challenge to the backlog
var backlogChallenge = function(challenge, skill, note) {
    if (!backlog[skill]) {
        backlog[skill] = {};
    }
    if (skill === 'Extra' || skill === 'Quest' || skill === 'Diary' || skill === 'BiS') {
        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                if (!backlog[subSkill]) {
                    backlog[subSkill] = {};
                }
                backlog[subSkill][challenge] = note;
            });
        }
        backlog[skill][challenge] = note;
        challengeArr = challengeArr.filter(function(line) {
            return !line.includes(skill + '-');
        });
        !!globalValids[skill] && Object.keys(globalValids[skill]).forEach(challenge => {
            globalValids[skill][challenge] = true;
        });
        !!globalValids[skill] && Object.keys(globalValids[skill]).forEach(challenge => {
            fullyValid = true;
            !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                if (!globalValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask) || (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask))) {
                    fullyValid = false;
                }
            });
            if (fullyValid) {
                !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                    if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                        globalValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask] = false;
                    }
                });
            }
        });
    } else {
        backlog[skill][challenge] = note;
        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                if (!backlog[subSkill]) {
                    backlog[subSkill] = {};
                }
                backlog[subSkill][challenge] = note;
            });
        }
        let highestCompletedLevel = 0;
        !!completedChallenges[skill] && Object.keys(completedChallenges[skill]).forEach(name => {
            if (chunkInfo['challenges'][skill][name]['Level'] > highestCompletedLevel) {
                highestCompletedLevel = chunkInfo['challenges'][skill][name]['Level'];
            }
        });
        let highestChallenge;
        let highestChallengeLevel = 0;
        Object.keys(globalValids[skill]).forEach(chal => {
            if ((!backlog[skill] || !backlog[skill].hasOwnProperty(chal)) && globalValids[skill][chal] > highestChallengeLevel && globalValids[skill][chal] > highestCompletedLevel) {
                highestChallenge = chal;
                highestChallengeLevel = globalValids[skill][chal];
            } else if ((!backlog[skill] || !backlog[skill].hasOwnProperty(chal)) && globalValids[skill][chal] === highestChallengeLevel && globalValids[skill][chal] > highestCompletedLevel && (!highestChallenge || !chunkInfo['challenges'][skill][highestChallenge]['Priority'] || (!!chunkInfo['challenges'][skill][chal]['Priority'] && chunkInfo['challenges'][skill][chal]['Priority'] < chunkInfo['challenges'][skill][highestChallenge]['Priority']))) {
                highestChallenge = chal;
                highestChallengeLevel = globalValids[skill][chal];
            }
        });
        challengeArr.forEach(line => {
            if (line.includes(skill + '-challenge')) {
                let index = challengeArr.indexOf(line);
                challengeArr.splice(index, 1);
                if (highestChallengeLevel > 0) {
                    oldChallengeArr[skill] = highestChallenge;
                    challengeArr.splice(index, 0, `<div class="challenge noscroll ${skill + '-challenge'}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][highestChallenge]) && "checked"} onclick="checkOffChallenges()" ${(viewOnly || inEntry || locked) && "disabled"} /><b class="noscroll">[` + chunkInfo['challenges'][skill][highestChallenge]['Level'] + '] <span class="inner noscroll">' + skill + '</b>: ' + highestChallenge.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((highestChallenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + highestChallenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + highestChallenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry || locked ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + highestChallenge + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
                }
            }
        });
        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                challengeArr.forEach(line => {
                    if (line.includes(subSkill + '-challenge')) {
                        let index = challengeArr.indexOf(line);
                        challengeArr.splice(index, 1);
                    } 
                });
            });
        }
    }
    calcCurrentChallenges();
    !onMobile && setupCurrentChallenges(oldChallengeArr);
    checkOffChallenges();
    setData();
}

// Removes a challenge from the backlog
var unbacklogChallenge = function(challenge, skill) {
    delete backlog[skill][challenge];
    if (backlog[skill] === {}) {
        delete backlog[skill];
    }
    if (skill !== 'Extra') {
        if (!!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][challenge] && !!chunkInfo['challenges'][skill][challenge]['Skills']) {
            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                delete backlog[subSkill][challenge];
                if (backlog[subSkill] === {}) {
                    delete backlog[subSkill];
                }
            });
        }
    }
    !onMobile && setupCurrentChallenges(false);
    !onMobile && setCalculating('.panel-active');
    calcCurrentChallenges();
    checkOffChallenges();
    setData();
}

// Removes a challenge from completed
var uncompleteChallenge = function(challenge, skill) {
    delete completedChallenges[skill][challenge];
    if (completedChallenges[skill] === {}) {
        delete completedChallenges[skill];
    }
    if (skill !== 'Extra' && skill !== 'BiS') {
        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
            !!chunkInfo['challenges'][skill][challenge]['Skills'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                !!completedChallenges[subSkill] && delete completedChallenges[subSkill][challenge];
                if (completedChallenges[subSkill] === {}) {
                    delete completedChallenges[subSkill];
                }
            });
        }
    }
    !onMobile && setupCurrentChallenges(false);
    !onMobile && setCalculating('.panel-active');
    calcCurrentChallenges();
    setData();
}

// Marks checked off challenges to save for later
var checkOffChallenges = function() {
    checkedChallenges = {};
    Object.keys(highestCurrent).forEach(skill => {
        if ($('.' + skill + '-challenge > input').prop('checked')) {
            $('.panel-active > .' + skill + '-challenge').addClass('hide-backlog');
            if (!checkedChallenges[skill]) {
                checkedChallenges[skill] = {};
            }
            checkedChallenges[skill][highestCurrent[skill].replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = true;
        } else {
            $('.panel-active > .' + skill + '-challenge').removeClass('hide-backlog');
        }
    });
    !!challengeArr && challengeArr.forEach(line => {
        if (line !== "No current chunk tasks.") {
            $(line).attr('class').split(/\s+/).forEach(cl => {
                if (cl.includes('BiS-')) {
                    let skillLine = cl;
                    if ($('.' + skillLine + ' > input').prop('checked')) {
                        $('.panel-active > .' + skillLine).addClass('hide-backlog');
                        if (!checkedChallenges['BiS']) {
                            checkedChallenges['BiS'] = {};
                        }
                        checkedChallenges['BiS'][$(line).find('.inner').text().split($(line).find('a.link').text()).join('~|' + $(line).find('a.link').text() + '|~').replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = true;
                    } else {
                        $('.panel-active > .' + skillLine).removeClass('hide-backlog');
                    }
                } else if (cl.includes('Quest-')) {
                    let skillLine = cl;
                    if ($('.' + skillLine + ' > input').prop('checked')) {
                        $('.panel-active > .' + skillLine).addClass('hide-backlog');
                        if (!checkedChallenges['Quest']) {
                            checkedChallenges['Quest'] = {};
                        }
                        let questStepName = questLastStep.hasOwnProperty('~|' + $(line).find('.inner').text().replaceAll(/\[.*] /g, '').replaceAll(': ', '').split($(line).find('a.link').text()).join('|~' + $(line).find('a.link').text()).replaceAll('Up to step ', '')) ? questLastStep['~|' + $(line).find('.inner').text().replaceAll(/\[.*] /g, '').replaceAll(': ', '').split($(line).find('a.link').text()).join('|~' + $(line).find('a.link').text()).replaceAll('Up to step ', '')] : '~|' + $(line).find('.inner').text().replaceAll(/\[.*] /g, '').replaceAll(': ', '').split($(line).find('a.link').text()).join('|~' + $(line).find('a.link').text()).replaceAll('Up to step ', '');
                        checkedChallenges['Quest'][questStepName.replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = true;
                    } else {
                        $('.panel-active > .' + skillLine).removeClass('hide-backlog');
                    }
                } else if (cl.includes('Diary-')) {
                    let skillLine = cl;
                    if ($('.' + skillLine + ' > input').prop('checked')) {
                        $('.panel-active > .' + skillLine).addClass('hide-backlog');
                        if (!checkedChallenges['Diary']) {
                            checkedChallenges['Diary'] = {};
                        }
                        checkedChallenges['Diary'][$(line).find('.inner').text().split($(line).find('a.link').text()).join('~|' + $(line).find('a.link').text() + '|~').replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\: /g, '')] = true;
                    } else {
                        $('.panel-active > .' + skillLine).removeClass('hide-backlog');
                    }
                } else if (cl.includes('Extra-')) {
                    let skillLine = cl;
                    if ($('.' + skillLine + ' > input').prop('checked')) {
                        $('.panel-active > .' + skillLine).addClass('hide-backlog');
                        if (!checkedChallenges['Extra']) {
                            checkedChallenges['Extra'] = {};
                        }
                        if ($(line).find('.inner').text().split($(line).find('a.link').text()).join('~|' + $(line).find('a.link').text() + '|~').match(/Kill .* ~|.*|~/)) {
                            checkedChallenges['Extra'][$(line).find('.inner').text().split($(line).find('a.link').text()).join('~|' + $(line).find('a.link').text() + '|~').replace(/Kill .* ~/, 'Kill X ~').replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = true;
                        } else {
                            checkedChallenges['Extra'][$(line).find('.inner').text().split($(line).find('a.link').text()).join('~|' + $(line).find('a.link').text() + '|~').replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')] = true;
                        }
                    } else {
                        $('.panel-active > .' + skillLine).removeClass('hide-backlog');
                    }
                }
            });
        }
    });
    changeChallengeColor();
    setData();
}

// Marks checked off areas to unlock
var checkOffAreas = function(obj, area) {
    possibleAreas[area] = obj.checked;
    !onMobile && setCalculating('.panel-active');
    getChunkAreas();
    setAreas();
    calcCurrentChallenges();
    setData();
}

// Marks checked off rules
var checkOffRules = function(didRedo, startup) {
    let redo = false;
    Object.keys(rules).forEach(rule => {
        if (subRuleDefault[rule] && rules[rule] !== $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule > input').prop('checked')) {
            $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').children('.subrule').children('input').prop('checked', subRuleDefault[rule]);
            redo = true;
        }
        if (rule === 'Kill X Amount') {
            if ($('.x-num-input').val() < 1) {
                $('.x-num-input').val(1);
            }
            rules[rule] = $('.x-num-input').val();
        } else if (rule === 'Rare Drop Amount') {
            if ($('.rare-num-input').val() < 0) {
                $('.rare-num-input').val(0);
            }
            rules[rule] = $('.rare-num-input').val();
        } else {
            rules[rule] = $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule > input').prop('checked');
        }
        if ($('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').children('.subrule').length) {
            $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').children('.subrule').children('input').prop('disabled', !rules[rule]);
            if (!rules[rule]) {
                $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').children('.subrule').children('input').prop('checked', false);
                redo = true;
            }
        }
    });
    if (redo && !didRedo) {
        checkOffRules(true, startup);
        return;
    }
    if (!startup) {
        setupCurrentChallenges(false);
        !onMobile && setCalculating('.panel-active');
        calcCurrentChallenges();
        rules['Manually Add Tasks'] && $('.open-manual-container').css('opacity', 1).show();
        rules['Random Event Loot'] && $('.open-random-container').css('opacity', 1).show();
        rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 1).show();
        !rules['Manually Add Tasks'] && $('.open-manual-container').css('opacity', 0).hide();
        !rules['Random Event Loot'] && $('.open-random-container').css('opacity', 0).hide();
        !rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).hide();
        setData();
    }
}

// Marks checked off settings
var checkOffSettings = function(startup) {
    Object.keys(settings).forEach(setting => {
        if (setting !== 'completedTaskColor' && settingNames.hasOwnProperty(setting)) {
            settings[setting] = $('.' + setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting > input').prop('checked');
        }
    });
    !!settingsStructureConflict && Object.keys(settingsStructureConflict).forEach(setting => {
        Array.isArray(settingsStructureConflict[setting]) && settingsStructureConflict[setting].forEach(subSetting => {
            $('.' + subSetting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting > input').prop('disabled', settings[setting]);
        });
    });
    toggleVisibility(settings['highvis'], startup);
    toggleNeighbors(settings['neighbors'], startup);
    toggleRemove(settings['remove'], startup);
    toggleRoll2(settings['roll2'], startup);
    toggleUnpick(settings['unpick'], startup);
    toggleRecent(settings['recent'], startup);
    toggleChunkInfo(settings['info'], startup);
    toggleChunkTasks(settings['chunkTasks'], startup);
    changeChallengeColor();
    if (!startup) {
        setData();
    }
}

// Moves checked off challenges to completed
var completeChallenges = function() {
    Object.keys(checkedChallenges).forEach(skill => {
        Object.keys(checkedChallenges[skill]).forEach(name => {
            if (!completedChallenges[skill]) {
                completedChallenges[skill] = {};
            }
            if (skill === 'Extra' && name.match(/Kill .* ~|.*|~/)) {
                completedChallenges[skill][name.replace(/Kill .* ~/, 'Kill X ~')] = checkedChallenges[skill][name];
            } else {
                completedChallenges[skill][name] = checkedChallenges[skill][name];
            }
        });
    });
    checkedChallenges = {};
    !onMobile && setCalculating('.panel-completed');
    calcCurrentChallenges();
}

// Gets and displays info on the gievn quest
var getQuestInfo = function(quest) {
    $('.menu10').css('opacity', 1).show();
    quest = quest.replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G');
    $('.questname-content').html(quest.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'));
    $('.panel-questdata').empty();
    let unlocked = {...possibleAreas};
    $('.unlocked').each(function() {
        unlocked[parseInt($(this).text())] = true;
    });
    questChunks = [];
    chunkInfo['quests'][quest].split(', ').forEach(chunkId => {
        let chunkName = chunkId.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/');
        let aboveground = false;
        !!chunkInfo['chunks'][chunkName.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replace("'", "’")] && !!chunkInfo['chunks'][chunkName.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replace("'", "’")]['Nickname'] && (aboveground = true);
        if (aboveground) {
            questChunks.push(chunkName);
            chunkName = chunkInfo['chunks'][chunkName.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replace("'", "’")]['Nickname'] + ' (' + chunkName + ')';
        }
        $('.panel-questdata').append(`<b><div class="noscroll ${!!unlocked[chunkId.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')] && ' + valid-chunk'}">` + `<span onclick="redirectPanel(encodeURI('` + chunkId.replaceAll(/\'/g, "%2H") + `'))"><i class="quest-icon fas fa-crosshairs"></i></span> ` + `<span class="noscroll ${aboveground && ' + click'}" ${aboveground && `onclick="scrollToChunk(${chunkId})"`}>` + chunkName + '</span></div></b>')
    });
}

// Toggles the quest info panel on and off
var toggleQuestInfo = function() {
    if (parseInt($('.menu10').css('opacity')) === 1) {
        $('.menu10').css('opacity', 0).hide();
        $('.questname-content').html('');
    } else if (!!$('.questname-content').html() && $('.questname-content').html().length > 0) {
        $('.menu10').css('opacity', 1).show();
    }
}

// Highlights array of chunk ids for current quest
var highlightAllQuest = function() {
    questChunks.forEach(id => {
        $('.box:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).addClass('recent');
    });
}

// Scrolls to chunk with given id
var scrollToChunk = function(id) {
    let box = $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('recent');
    scrollToPos(parseInt(box.attr('id')) % rowSize, Math.floor(parseInt(box.attr('id')) / rowSize), 0, 0, false);
}

// Re-update chunk info panel
var redirectPanel = function(name) {
    let realName = decodeURI(name).replaceAll(/\%2H/g, "'");
    $('.box > .chunkId:contains(' + infoLockedId + ')').parent().removeClass('locked');
    $('.icon').remove();
    $('.box > .chunkId:contains(' + realName + ')').parent().addClass('locked').append("<span class='icon'></span>");
    $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
    ((realName % 256) < 65) && scrollToPos(parseInt($('.box > .chunkId:contains(' + realName + ')').parent().attr('id')) % rowSize, Math.floor(parseInt($('.box > .chunkId:contains(' + realName + ')').parent().attr('id')) / rowSize), 0, 0);
    infoLockedId = realName.toString().replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G');
    updateChunkInfo();
    $('.infoid').addClass('new');
    setTimeout(function() {
        $('.infoid').removeClass('new');
        setTimeout(function() {
            $('.infoid').addClass('new');
            setTimeout(function() {
                $('.infoid').removeClass('new');
            }, 1000);
        }, 1000);
    }, 1000);
}

// Checks the MID from the url
var checkMID = function(mid) {
    if (mid === 'change-pin') {
        atHome = true;
        $('.loading, .ui-loader-header').remove();
        $('#home-menu').hide();
        $('#pin-menu').show();
        $('.mid-old').focus();
    } else if (mid === 'about') {
            atHome = true;
            $('.loading, .ui-loader-header').remove();
            $('#home-menu').hide();
            $('#about-menu').show();
    } else if (mid) {
        if (mid.split('-')[1] === 'view') {
            mid = mid.split('-')[0];
            viewOnly = true;
            proceed();
        }
        databaseRef.child('maps/' + mid).once('value', function(snap) {
            if (snap.val() && (!onTestServer || patreonMaps[mid])) {
                myRef = firebase.database().ref('maps/' + mid);
                atHome = false;
                $('.background-img').hide();
                inEntry = true && !viewOnly;
            } else {
                window.history.replaceState(window.location.href.split('?')[0], 'Chunk Picker V2', window.location.href.split('?')[0]);
                atHome = true;
                $('.loading, .ui-loader-header').remove();
            }
            setupMap();
        });
    } else {
        atHome = true;
        $('.loading, .ui-loader-header').remove();
        setupMap();
    }
}

// Regains connectivity to firebase
var regainConnectivity = function(_callback) {
    firebase.auth().signOut();
    firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then(() => {
        _callback();
    });
}

// Loads data from codeItems into various data structures
var setCodeItems = function() {
    let codeItems = chunkInfo['codeItems'];
    boneItems = codeItems['boneItems'];
    rangedItems = codeItems['rangedItems'];
    elementalRunes = codeItems['elementalRunes'];
    itemsPlus = codeItems['itemsPlus'];
    objectsPlus = codeItems['objectsPlus'];
    chunksPlus = codeItems['chunksPlus'];
    monstersPlus = codeItems['monstersPlus'];
    npcsPlus = codeItems['npcsPlus'];
    mixPlus = codeItems['mixPlus'];
    tools = codeItems['tools'];
    magicTools = codeItems['magicTools'];
    dropTables = codeItems['dropTables'];
    elementalStaves = codeItems['elementalStaves'];
    bossLogs = codeItems['bossLogs'];
    bossMonsters = codeItems['bossMonsters'];
    minigameShops = codeItems['minigameShops'];
}

// Loads data from Firebase
var loadData = function(startup) {
    $.getJSON('./chunkpicker-chunkinfo-export.json', function(data) {
        gotData = true;
        chunkInfo = data;
        setCodeItems();
        skillNames.forEach(skill => {
            if (!chunkInfo['challenges'][skill]) {
                chunkInfo['challenges'][skill] = {};
            }
        });
        !!chunkInfo['challenges']['Quest'] && Object.keys(chunkInfo['challenges']['Quest']).forEach(name => {
            if (chunkInfo['challenges']['Quest'][name].hasOwnProperty('QuestPoints')) {
                questLastStep['~|' + chunkInfo['challenges']['Quest'][name]['BaseQuest'] + '|~Complete the quest'] = name
            }
        });
        myRef.once('value', function(snap) {
            var picking = false;
            var settingsTemp = snap.val()['settings'];
            var rulesTemp = snap.val()['rules'];
            randomLoot = snap.val()['randomLoot'] || {};
            var chunks = snap.val()['chunks'];
            recent = snap.val()['recent'] || [];
            recentTime = snap.val()['recentTime'] || [];
            settingsTemp['highvis'] = document.cookie.split(';').filter(function(item) {
                return item.indexOf('highvis=true') >= 0
            }).length > 0;
            settingsTemp['info'] = !document.cookie.split(';').filter(function(item) {
                return item.indexOf('newinfo=false') >= 0
            }).length > 0;
            settingsTemp['ids'] = document.cookie.split(';').filter(function(item) {
                return item.indexOf('ids=true') >= 0
            }).length > 0;
            settingsTemp['infocollapse'] = document.cookie.split(';').filter(function(item) {
                return item.indexOf('infocollapse=true') >= 0
            }).length > 0;
            
            for (let count = 1; count <= 5; count++) {
                !recent[count - 1] && (recent[count - 1] = null);
                !recentTime[count - 1] && (recentTime[count - 1] = null);
                let tempDate = new Date();
                tempDate.setTime(recentTime[count - 1]);
                tempDate > 0 && $('#recentChunks' + count).html('<span class="time">' + tempDate.toDateString().split(' ')[1] + ' ' + tempDate.toDateString().split(' ')[2] + ': </span><span class="chunk' + (recent[count - 1] ? '' : 'none') + '" onclick="recentChunk(recentChunks' + count + ')">' + (recent[count - 1] ? recent[count - 1] : "-") + '</span>');
                tempDate <= 0 && $('#recentChunks' + count).html('<span class="chunk' + (recent[count - 1] ? '' : 'none') + '" onclick="recentChunk(recentChunks' + count + ')">' + (recent[count - 1] ? recent[count - 1] : "-") + '</span>');
            }
            if (!!recentTime[0]) {
                $('#recentChunksTitle > b').text(Math.floor((new Date().getTime() - recentTime[0]) / (1000 * 3600 * 24)) + ' days since last roll');
            }
    
            checkedChallenges = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['checkedChallenges'] ? snap.val()['chunkinfo']['checkedChallenges'] : {};
            completedChallenges = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['completedChallenges'] ? snap.val()['chunkinfo']['completedChallenges'] : {};
            backlog = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['backlog'] ? snap.val()['chunkinfo']['backlog'] : {};
            possibleAreas = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['possibleAreas'] ? snap.val()['chunkinfo']['possibleAreas'] : {};
            manualTasks = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['manualTasks'] ? snap.val()['chunkinfo']['manualTasks'] : {};
            manualEquipment = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['manualEquipment'] ? snap.val()['chunkinfo']['manualEquipment'] : {};

            settingsTemp['highscoreEnabled'] && enableHighscore('startup');
            settingsTemp['ids'] && toggleIds() && $('.box').addClass('quality');
            !settingsTemp['ids'] && $('.chunkId').hide();
            settingsTemp['infocollapse'] && hideChunkInfo('startup');
            infoCollapse = settingsTemp['infocollapse'];
            if (settingsTemp['recent'] === undefined) {
                settingsTemp['recent'] = true;
            }
            if (settingsTemp['help'] === undefined) {
                settingsTemp['help'] = true;
            }
            if (settingsTemp['chunkTasks'] === undefined) {
                settingsTemp['chunkTasks'] = true;
            }
            settingsTemp['help'] && (helpMenuOpenSoon = true);
    
            if (settingsTemp['highscoreEnabled']) {
                userName = snap.val()['userName'];
                $('.highscoretoggle').text('Change chunk stats username');
            }

            !!rulesTemp && Object.keys(rulesTemp).forEach(rule => {
                rules[rule] = rulesTemp[rule];
            });

            Object.keys(settingsTemp).forEach(setting => {
                settings[setting] = settingsTemp[setting];
            });
            toggleVisibility(settings['highvis'], 'startup');
            toggleNeighbors(settings['neighbors'], 'startup');
            toggleRemove(settings['remove'], 'startup');
            toggleRoll2(settings['roll2'], 'startup');
            toggleUnpick(settings['unpick'], 'startup');
            toggleRecent(settings['recent'], 'startup');
            toggleChunkInfo(settings['info'], 'startup');
            toggleChunkTasks(settings['chunkTasks'], 'startup');
    
            $('.box').removeClass('selected potential unlocked recent').addClass('gray').css('border-width', 0);
            $('.label').remove();
            selectedChunks = 0;
            unlockedChunks = 0;
            selectedNum = 1;
            
            $('#chunkInfo1').text('Unlocked chunks: ' + unlockedChunks);
            $('#chunkInfo2').text('Selected chunks: ' + selectedChunks);
            chunks && chunks['potential'] && Object.keys(chunks['potential']).sort(function(a, b){return b-a}).forEach(function(id) {
                picking = true;
                if (selectedNum > 999) {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('potential').removeClass('gray selected unlocked').append('<span class="label extralong">' + selectedNum++ + '</span>');
                    $('.label.extralong').css('font-size', (labelZoom * (1/2)) + 'px');
                } else if (selectedNum > 99) {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('potential').removeClass('gray selected unlocked').append('<span class="label long">' + selectedNum++ + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
                } else {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('potential').removeClass('gray selected unlocked').append('<span class="label">' + selectedNum++ + '</span>');
                    $('.label').css('font-size', labelZoom + 'px');
                }
                $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            });
    
            chunks && chunks['selected'] && Object.keys(chunks['selected']).sort(function(a, b){return b-a}).forEach(function(id) {
                if (selectedNum > 999) {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('selected').removeClass('gray potential unlocked blacklisted').append('<span class="label extralong">' + selectedNum++ + '</span>');
                    $('.label.extralong').css('font-size', (labelZoom * (1/2))+ 'px');
                } else if (selectedNum > 99) {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('selected').removeClass('gray potential unlocked blacklisted').append('<span class="label long">' + selectedNum++ + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2/3))+ 'px');
                } else {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('selected').removeClass('gray potential unlocked blacklisted').append('<span class="label">' + selectedNum++ + '</span>');
                    $('.label').css('font-size', labelZoom + 'px');
                }
                $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            });
    
            chunks && chunks['unlocked'] && Object.keys(chunks['unlocked']).forEach(function(id) {
                $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('unlocked').removeClass('gray selected potential blacklisted');
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
            });

            chunks && chunks['blacklisted'] && Object.keys(chunks['blacklisted']).forEach(function(id) {
                $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('blacklisted').removeClass('gray selected potential');
            });
    
            if (picking) {
                $('.unpick').css({'opacity': 0, 'cursor': 'default'}).prop('disabled', true).hide();
                $('.pick').text('Pick for me');
                $('.roll2').text('Unlock both');
                isPicking = true;
            } else if (unlockedChunks === 0 && selectedChunks === 0) {
                $('.pick').text('Random Start?');
            }
            chunkBorders();
            chunkTasksOn && calcCurrentChallenges();
            startup && center('quick');
            doneLoading();
        });
    });
}

// Sets browser cookie
var setCookies = function() {
    if (onTestServer || testMode) {
        return;
    }
    document.cookie = "ids=" + showChunkIds;
    document.cookie = "highvis=" + highVisibilityMode;
    document.cookie = "newinfo=" + chunkInfoOn;
    document.cookie = "infocollapse=" + infoCollapse;
}

// Stores data in Firebase
var setUsername = function(old) {
    if (onTestServer || testMode) {
        return;
    }
    signedIn && firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then(function() {
        myRef.child('userName').set(userName.toLowerCase());
        if (!!old && old !== '') {
            databaseRef.child('highscores/players/' + old.toLowerCase()).set(null);
        }
        databaseRef.child('highscores/players/' + userName.toLowerCase()).set(mid);
        highscoreEnabled = true;
        setData();
    }).catch(function(error) {
        regainConnectivity(() => {
            myRef.child('userName').set(userName.toLowerCase());
            if (!!old && old !== '') {
                databaseRef.child('highscores/players/' + old.toLowerCase()).set(null);
            }
            databaseRef.child('highscores/players/' + userName.toLowerCase()).set(mid);
            highscoreEnabled = true;
            setData();
        });
    });
}

// Stores data in Firebase
var setData = function() {
    if (onTestServer || testMode) {
        return;
    }
    if (signedIn && firebase.auth().currentUser) {
        myRef.child('test').set(null, (error) => {
            if (error) {
                regainConnectivity(() => {
                    setData();
                    return;
                });
            } else {
                myRef.child('settings').update({'neighbors': autoSelectNeighbors, 'remove': autoRemoveSelected, 'roll2': roll2On, 'unpick': unpickOn, 'recent': recentOn, 'highscoreEnabled': highscoreEnabled, 'chunkTasks': chunkTasksOn, 'completedTaskColor': settings['completedTaskColor'], 'completedTaskStrikethrough': settings['completedTaskStrikethrough']});
                Object.keys(rules).forEach(rule => {
                    if (rules[rule] === undefined) {
                        rules[rule] = false;
                    }
                });
                myRef.update({rules});
                if (!helpMenuOpen && !helpMenuOpenSoon) {
                    myRef.child('settings').update({'help': false});
                }
                myRef.update({recent});
                myRef.update({recentTime});
                myRef.update({randomLoot});
                myRef.child('chunkinfo').update({checkedChallenges});
                myRef.child('chunkinfo').update({completedChallenges});
                myRef.child('chunkinfo').update({backlog});
                myRef.child('chunkinfo').update({possibleAreas});
                myRef.child('chunkinfo').update({manualTasks});
                myRef.child('chunkinfo').update({manualEquipment});

                var tempJson = {};
                Array.prototype.forEach.call(document.getElementsByClassName('unlocked'), function(el) {
                    tempJson[el.childNodes[0].childNodes[0].nodeValue] = el.childNodes[0].childNodes[0].nodeValue;
                });
                myRef.child('chunks/unlocked').set(tempJson);

                tempJson = {};
                Array.prototype.forEach.call(document.getElementsByClassName('selected'), function(el) {
                    tempJson[el.childNodes[0].childNodes[0].nodeValue] = el.childNodes[0].childNodes[0].nodeValue;
                });
                myRef.child('chunks/selected').set(tempJson);

                tempJson = {};
                Array.prototype.forEach.call(document.getElementsByClassName('potential'), function(el) {
                    tempJson[el.childNodes[0].childNodes[0].nodeValue] = el.childNodes[0].childNodes[0].nodeValue;
                });
                myRef.child('chunks/potential').set(tempJson);

                tempJson = {};
                Array.prototype.forEach.call(document.getElementsByClassName('blacklisted'), function(el) {
                    tempJson[el.childNodes[0].childNodes[0].nodeValue] = el.childNodes[0].childNodes[0].nodeValue;
                });
                myRef.child('chunks/blacklisted').set(tempJson);

                highscoreEnabled && databaseRef.child('highscores/skills/Unlocked Chunks/' + mid).update({
                    mid: mid,
                    name: userName.toLowerCase(),
                    score: unlockedChunks,
                });
            }
        });
    } else if (signedIn && !firebase.auth().currentUser) {
        firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then(function() {
            myRef.child('settings').update({'neighbors': autoSelectNeighbors, 'remove': autoRemoveSelected, 'roll2': roll2On, 'unpick': unpickOn, 'recent': recentOn, 'highscoreEnabled': highscoreEnabled, 'chunkTasks': chunkTasksOn, 'completedTaskColor': settings['completedTaskColor'], 'completedTaskStrikethrough': settings['completedTaskStrikethrough']});
            Object.keys(rules).forEach(rule => {
                if (rules[rule] === undefined) {
                    rules[rule] = false;
                }
            });
            myRef.update({rules});
            if (!helpMenuOpen && !helpMenuOpenSoon) {
                myRef.child('settings').update({'help': false});
            }
            myRef.update({recent});
            myRef.update({recentTime});
            myRef.update({randomLoot});
            myRef.child('chunkinfo').update({checkedChallenges});
            myRef.child('chunkinfo').update({completedChallenges});
            myRef.child('chunkinfo').update({backlog});
            myRef.child('chunkinfo').update({possibleAreas});
            myRef.child('chunkinfo').update({manualTasks});
            myRef.child('chunkinfo').update({manualEquipment});

            var tempJson = {};
            Array.prototype.forEach.call(document.getElementsByClassName('unlocked'), function(el) {
                tempJson[el.childNodes[0].childNodes[0].nodeValue] = el.childNodes[0].childNodes[0].nodeValue;
            });
            myRef.child('chunks/unlocked').set(tempJson);

            tempJson = {};
            Array.prototype.forEach.call(document.getElementsByClassName('selected'), function(el) {
                tempJson[el.childNodes[0].childNodes[0].nodeValue] = el.childNodes[0].childNodes[0].nodeValue;
            });
            myRef.child('chunks/selected').set(tempJson);

            tempJson = {};
            Array.prototype.forEach.call(document.getElementsByClassName('potential'), function(el) {
                tempJson[el.childNodes[0].childNodes[0].nodeValue] = el.childNodes[0].childNodes[0].nodeValue;
            });
            myRef.child('chunks/potential').set(tempJson);

            highscoreEnabled && databaseRef.child('highscores/skills/Unlocked Chunks/' + mid).update({
                mid: mid,
                name: userName.toLowerCase(),
                score: unlockedChunks,
            });
        }).catch(function(error) {console.log(error)});
    }
}

// Credit to Amehzyn
// Shifts offset to zoom in on mouse location 
function zoomOnMouse(event, dir, imageDiv) {
    // Pull number out of string, cut "px" off end
    var leftNumber = Number(imageDiv.style.left.slice(0, -2));
    var topNumber = Number(imageDiv.style.top.slice(0, -2));

    var currentMouseX = Math.round(event.clientX);
    var currentMouseY = Math.round(event.clientY);

    // As image zooms, shift top-left corner closer to or further from mouse position
    var offsetX = (currentMouseX - leftNumber) * dir;
    var offsetY = (currentMouseY - topNumber) * dir;

    prevScrollLeft = leftNumber - offsetX;
    prevScrollTop = topNumber - offsetY;

    imageDiv.style.left = prevScrollLeft + "px";
    imageDiv.style.top = prevScrollTop + "px";
}

// Credit to Amehzyn
// Prevents zooming from pulling map too off-center screen
function fixMapEdges(imageDiv) {
	// Take the "px" off the end and cast from a String to a Number
	var leftNumber = Number(imageDiv.style.left.slice(0, -2));
	var topNumber = Number(imageDiv.style.top.slice(0, -2));
	var rightEdge = leftNumber + imageDiv.offsetWidth;
	var bottomEdge = topNumber + imageDiv.offsetHeight;

	var margins = [150, 100, 100, 100];
	if (topNumber > margins[0]) {
        prevScrollTop = margins[0];
		imageDiv.style.top = prevScrollTop + "px";
	}
	if (rightEdge < window.innerWidth - margins[1]) {
        prevScrollLeft = (window.innerWidth - margins[1]) - imageDiv.offsetWidth;
		imageDiv.style.left = prevScrollLeft + "px";
	}
	if (bottomEdge < window.innerHeight - margins[2]) {
        prevScrollTop = (window.innerHeight - margins[2]) - imageDiv.offsetHeight;
		imageDiv.style.top = prevScrollTop + "px";
	}
	if (leftNumber > margins[3]) {
        prevScrollLeft = margins[3];
		imageDiv.style.left = prevScrollLeft + "px";
    }
}


// Rolls until a new, unique map id is found
var rollMID = function() {
    var char1, char2, char3, char4, charSet;
    var badNums = true;
    var rollCount = 0;
    savedPin = pin;
    if (onTestServer || testMode) {
        return;
    }
    databaseRef.once('value', function(snap) {
        while (badNums) {
            char1 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            char2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            char3 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            char4 = rollCount > 10 ? String.fromCharCode(97 + Math.floor(Math.random() * 26)) : '';
            charSet = char1 + char2 + char3 + char4;
            !snap.val()['maps'][charSet] && (badNums = false);
            rollCount++;
        }
        mid = charSet;
        firebase.auth().createUserWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
            signedIn = true;
            userCredential.user.updateProfile({
                displayName: mid
            }).then(() => {
                var temp = snap.val()['template'];
                temp.uid = userCredential.user.uid;
                databaseRef.child('maps/' + charSet).set(temp);
            });
        }).catch((error) => {console.log(error)});
        
        $('#newmid').text(charSet.toUpperCase());
        $('.link').prop('href', 'https://source-chunk.github.io/chunk-picker-v2/?' + charSet).text('https://source-chunk.github.io/chunk-picker-v2/?' + charSet);
    }).catch((error) => {console.log(error)});
}

// Checks if both the map id and pin are correct, and hides their respective error messages/allows button clicks if so
var checkIfGood = function() {
    if (midGood && pinGood) {
        $('#access').prop('disabled', false);
        $('.mid-err').css('visibility', 'hidden');
        $('.pin-err').css('visibility', 'hidden');
    }
}

// Checks if the map id, the old pin, and the new pid are valid, and hides their respective error messages/allows button clicks if so
var checkIfGood2 = function() {
    if (mid2Good && pin2Good && pin2SecondGood) {
        $('#change-pin').prop('disabled', false);
        $('.mid-err').css('visibility', 'hidden');
        $('.pin-err').css('visibility', 'hidden');
    }
}

// Changes the lock state if pin is correct, otherwise displays error
var changeLocked = function() {
    $('#lock-unlock').prop('disabled', true).html('<i class="spin fas fa-spinner"></i>');
    firebase.auth().fetchSignInMethodsForEmail('sourcechunk+' + mid + '@yandex.com').then((methods) => {
        if (!!methods && methods.length > 0) {
            setTimeout(function() {
                firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                    signedIn = true;
                    $('.center').css('margin-top', '15px');
                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .open-rules-container, .highest').css('opacity', 0).show();
                    roll2On && $('.roll2').css('opacity', 0).show();
                    !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                    rules['Manually Add Tasks'] && $('.open-manual-container').css('opacity', 0).show();
                    rules['Random Event Loot'] && $('.open-random-container').css('opacity', 0).show();
                    rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                    $('.lock-box').animate({'opacity': 0});
                    setTimeout(function() {
                        $('.lock-box').css('opacity', 1).hide();
                        $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .open-rules-container, .highest').animate({'opacity': 1});
                        roll2On && $('.roll2').animate({'opacity': 1});
                        !isPicking && unpickOn && $('.unpick').animate({'opacity': 1});
                        rules['Manually Add Tasks'] && $('.open-manual-container').animate({'opacity': 1});
                        rules['Random Event Loot'] && $('.open-random-container').animate({'opacity': 1});
                        rules['Manually Complete Tasks'] && $('.open-complete-container').animate({'opacity': 1});
                        $('#lock-unlock').prop('disabled', false).html('Unlock');
                        locked = false;
                        helpMenuOpenSoon && helpFunc();
                        unlockChallenges();
                        lockBoxOpen = false;
                    }, 500);
                }).catch((error) => {
                    $('.lock-pin').addClass('animated shake wrong').select();
                    $('#lock-unlock').prop('disabled', true).html('Unlock');
                });
                setTimeout(function() {
                    $('.lock-pin').removeClass('animated shake');
                }, 500);
            }, 1000);
        } else {
            myRef.once('value', function(snap) {
                if ((snap.val() && snap.val()['pin'] === savedPin)) {
                    setTimeout(function() {
                        firebase.auth().createUserWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
                            signedIn = true;
                            signedIn && myRef.child('uid').set(userCredential.user.uid, function(error) {
                                if (error) {
                                    regainConnectivity(() => {
                                        myRef.child('pin').remove();
                                    });
                                } else {
                                    myRef.child('pin').remove();
                                }
                            });
                            userCredential.user.updateProfile({
                                displayName: mid
                            });
                            $('.center').css('margin-top', '15px');
                            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .open-rules-container, .highest').css('opacity', 0).show();
                            roll2On && $('.roll2').css('opacity', 0).show();
                            !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                            rules['Manually Add Tasks'] && $('.open-manual-container').css('opacity', 0).show();
                            rules['Random Event Loot'] && $('.open-random-container').css('opacity', 0).show();
                            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                            $('.lock-box').animate({'opacity': 0});
                            setTimeout(function() {
                                $('.lock-box').css('opacity', 1).hide();
                                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .open-rules-container, .highest').animate({'opacity': 1});
                                roll2On && $('.roll2').animate({'opacity': 1});
                                !isPicking && unpickOn && $('.unpick').animate({'opacity': 1});
                                rules['Manually Add Tasks'] && $('.open-manual-container').animate({'opacity': 1});
                                rules['Random Event Loot'] && $('.open-random-container').animate({'opacity': 1});
                                rules['Manually Complete Tasks'] && $('.open-complete-container').animate({'opacity': 1});
                                $('#lock-unlock').prop('disabled', false).html('Unlock');
                                locked = false;
                                helpMenuOpenSoon && helpFunc();
                                unlockChallenges();
                                lockBoxOpen = false;
                            }, 500);
                        }).catch((error) => {
                            $('.lock-pin').addClass('animated shake wrong').select();
                            $('#lock-unlock').prop('disabled', true).html('Unlock');
                        });
                    }, 1000);
                    setTimeout(function() {
                        $('.lock-pin').removeClass('animated shake');
                    }, 500);
                } else {
                    setTimeout(function() {
                        $('.lock-pin').addClass('animated shake wrong').select();
                        $('#lock-unlock').prop('disabled', true).html('Unlock');
                        setTimeout(function() {
                            $('.lock-pin').removeClass('animated shake');
                        }, 500);
                    }, 1000);
                }
            });
        }
    });
}

// Closes the lock box
var closePinBox = function() {
    $('.lock-box').animate({'opacity': 0});
    $('.lock-' + (locked ? 'closed' : 'opened')).css('opacity', 0).show();
    setTimeout(function() {
        $('.lock-box').css('opacity', 1).hide();
        $('.lock-' + (locked ? 'closed' : 'opened')).animate({'opacity': 1});
        $('#lock-unlock').prop('disabled', false).html('Unlock');
        lockBoxOpen = false;
    }, 500);
}

// Taken from https://rot47.net/base.html
// Convert between two different number bases
function convert(src, srctable, desttable) {
    var srclen = srctable.length;
    var destlen = desttable.length;
    var val = 0;
    var numlen = src.length;
    for(var i = 0; i < numlen; i++) {
        val = val * srclen + srctable.indexOf(src.charAt(i));
    }
    if (val < 0) {
        return 0;
    }
    var r = val % destlen;
    var res = desttable.charAt(r);
    var q = Math.floor(val / destlen);
    while(q) {
        r = q % destlen;
        q = Math.floor(q / destlen);
        res = desttable.charAt(r) + res;
    }
    return res;
}

// stringToChunkIndexes() sourced from: https://gitgeddes.github.io/ChunkPicker/
// Thanks @GitGeddes/Amehzyn and @Joeytje50

// Take in the string from the URL and unpack the chunk indexes
function stringToChunkIndexes(request) {
    var gap = 4;
    var chunks = [];
    request = request.split(",");
    // Unpack every chunk index
    for (var i = 0; i < request.length; i++) {
        // Convert the indexes from base 62 to base 10
        request[i] = convert(request[i], BASE62, BASE10);
        // Use modulo using the gap to check for indexes less than 1000
        var mod = request[i].length % gap;
        if (mod != 0) {
            // Add 0s to the start of the string
            for (var j = 4; j > mod; j--) {
                request[i] = "0" + request[i];
            }
        }
        // Split the string into the chunk indexes
        for (var k = 0; k < request[i].length - 3; k += 4) {
            chunks.push(request[i].slice(k, k + 4));
        }
    }
    return chunks;
}

// Highlights outside borders of unlocked areas
var chunkBorders = function() {
    $('.unlocked').each(function() {
        var num = parseInt($(this).prop('id'));
        var skipp = 43;
        !$('#' + (num - skipp)).hasClass('unlocked') ? $(this).css('border-top', '.175vw solid red') : $(this).css('border-top-width', '0px');
        !$('#' + (num + skipp)).hasClass('unlocked') ? $(this).css('border-bottom', '.175vw solid red') : $(this).css('border-bottom-width', '0px');
        !$('#' + (num - 1)).hasClass('unlocked') ? $(this).css('border-left', '.175vw solid red') : $(this).css('border-left-width', '0px');
        !$('#' + (num + 1)).hasClass('unlocked') ? $(this).css('border-right', '.175vw solid red') : $(this).css('border-right-width', '0px');
    });
}