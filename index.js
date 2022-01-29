/* 
 * Created by Source Chunk
 * Revision of an idea by Amehzyn
 * With help from Slay to Stay for chunk Ids and Amehzyn for smoother zooming/url decoding
 * 01/28/2022
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
var darkMode = false;                                                           // Is dark mode enabled
var recent = [];                                                                // Recently picked chunks
var recentTime = [];                                                            // Recently picked chunks time
var chunkOrder = [];                                                            // Full picked chunks order
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
var prevValueMidFriend = '';                                                    // Previous value of map id at friend change
var mid;                                                                        // Current value of map id
var pin;                                                                        // Current value of pin
var savedPin;                                                                   // Pin saved off from entry

var midGood = false;                                                            // Is the map id valid
var pinGood = true;                                                             // Is the pin valid
var mid2Good = false;                                                           // Is the map id valid (change pin)
var pin2Good = false;                                                           // Is the pin valid (change pin)
var pin2SecondGood = false;                                                     // Is the pin 2 valid (change pin)
var midFriendGood = false;                                                      // Is the map id valid (friend)
var nameFriendGood = false;                                                     // Is the name valid (friend)
var atHome;                                                                     // Is the user on the homepage
var locked;                                                                     // Is the user not logged in
var lockBoxOpen = false;                                                        // Is the lock box open
var inEntry = false;                                                            // Is the entry menu open
var importMenuOpen = false;                                                     // Is the import menu open
var highscoreMenuOpen = false;                                                  // Is the highscores menu open
var helpMenuOpen = false;                                                       // Is the help menu open
var helpMenuOpenSoon = false;                                                   // Will the help menu be opened once logged in
var patchNotesOpen = false;                                                     // Are the patch notes open
var patchNotesOpenSoon = false;                                                 // Will the patche notes be opened once logged in
var signedIn = false;                                                           // Is the user signed in
var filterByChecked = false;                                                    // Are we filtering by checked only
var filterByCheckedEquipment = false;                                           // Are we filtering equipment by checked only
var filterByCheckedSources = false;                                             // Are we filtering sources by checked only
var filterByCheckedMonsters = false;                                            // Are we filtering monsters by checked only
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
const clueTiers = [
    'Beginner',
    'Easy',
    'Medium',
    'Hard',
    'Elite',
    'Master'
];
const clueStepAmounts = {
    'Beginner': {
        '1': .1,
        '2': .45,
        '3': .45
    },
    'Easy': {
        '2': .33,
        '3': .34,
        '4': .33
    },
    'Medium': {
        '3': .33,
        '4': .34,
        '5': .33
    },
    'Hard': {
        '4': .33,
        '5': .34,
        '6': .33
    },
    'Elite': {
        '5': .33,
        '6': .34,
        '7': .33
    },
    'Master': {
        '6': .33,
        '7': .34,
        '8': .33
    }
};


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
let tasksPlus = {};
let tools = {};
let magicTools = {};
let dropTables = {};
let elementalStaves = {};
let bossLogs = {};
let bossMonsters = {};
let minigameShops = {};
let slayerTasks = {};

let questLastStep = {};

var hammertime = new Hammer(document.getElementsByClassName('body')[0]);        // Initialize Hammerjs [Mobile]
hammertime.get('pinch').set({ enable: true });

let rules = {
    "Skillcape": false,
    "Rare Drop": false,
    "Pouch": false,
    "InsidePOH": false,
    "InsidePOH Primary": false,
    "Construction Milestone": false,
    "Boss": false,
    "Slayer Equipment": false,
    "Extra implings": false,
    "Normal Farming": false,
    "Raking": false,
    "Sulphurous Fertiliser": false,
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
    "Show Best in Slot Weight Tasks": false,
    "Show Quest Tasks Complete": false,
    "Show Diary Tasks Complete": false,
    "Show Diary Tasks Any": false,
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
    "Collection Log Bosses": false,
    "Collection Log Raids": false,
    "Collection Log Clues": false,
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
    "Jars": false,
    "Stuffables": false,
    "Kill X Amount": "1",
    "Rare Drop Amount": "1000",
    "Manually Complete Tasks": false,
    "Every Drop": false,
    "Herblore Unlocked Snake Weed": false,
    "HigherLander": false,
    "Starting Items": false,
    "Tutor Ammo": false,
    "Secondary MTA": false,
    "Fossil Island Tasks": false,
    "PVP-Only Spells": false,
    "Skilling Pets": false,
    "Money Unlockables": false,
    "Prayers": false,
    "All Droptables": false,
};                                                                              // List of rules and their on/off state

let ruleNames = {
    "Skillcape": "Must obtain skillcapes <span class='rule-asterisk noscroll'>*</span>",
    "Rare Drop": "Chunk tasks only use drops more common than 1/X (set to 0 to include all drops)",
    "Pouch": "Using Runecraft pouches count as chunk tasks",
    "InsidePOH": "Crafting furniture inside a POH can count as a chunk task",
    "InsidePOH Primary": "Crafting furniture inside a POH counts as a primary training method for Construction",
    "Construction Milestone": "Miscellaneous Construction milestones (e.g. House location/style, servants, etc) can count for chunk tasks",
    "Boss": "Killing a boss can be used for a chunk task (item on droptable, Slayer level to kill, etc.)",
    "Slayer Equipment": "Using Slayer equipment can count for chunk tasks",
    "Extra implings": "Include implings that have non-guaranteed spawns in Puro-Puro as chunk tasks",
    "Normal Farming": "Allow normal farming to count as a primary method for training Farming",
    "Raking": "Allow raking patches to count as a primary method for training Farming <span class='rule-asterisk noscroll'>*</span>",
    "Sulphurous Fertiliser": "Allow making sulphurous fertiliser (2xp each) to count as a primary method for training Farming",
    "CoX": "Allow methods inside the Chambers of Xeric to count for chunk tasks/primary training methods (Fishing, Hunter, Cooking, Woodcutting, etc.)",
    "Tithe Farm": "Allow Tithe Farm to count as a primary method for training Farming",
    "Kill X": "Kill X-amount of every new, unique monster you encounter",
    "Sorceress's Garden": "Allow Sorceress's Garden to count as primary training for training Farming",
    "Show Skill Tasks": "Show Skill Tasks (e.g. Get 43 Crafting to cut a diamond)",
    "Show Quest Tasks": "Show Quest Tasks",
    "Show Diary Tasks": "Show Diary Tasks",
    "Show Best in Slot Tasks": "Show Best in Slot (Accuracy + Strength, or secondarily Defense) Tasks",
    "Show Best in Slot Prayer Tasks": "Show Best in Slot Tasks for Prayer-boosting gear",
    "Show Best in Slot Defensive Tasks": "Show Best in Slot Tasks for Tank gear (Melee/Ranged/Magic)",
    "Show Best in Slot Flinching Tasks": "Show Best in Slot Tasks for Flinching weapons (pure offensive stats and strength, no speed)",
    "Show Best in Slot Weight Tasks": "Show Best in Slot Tasks for weight-reducing gear (only pieces with negative weight)",
    "Show Quest Tasks Complete": "Show Quest Tasks only when the whole quest is completable",
    "Show Diary Tasks Complete": "Show Diary Tasks only when the whole diary tier (easy, medium, etc.) is completable",
    "Show Diary Tasks Any": "Show all diary tasks possible, regardless of tier <span class='rule-asterisk noscroll'>*</span>",
    "Highest Level": "Require processing skill tasks to be the highest level of processing, rather than the lowest (e.g. must smith a rune bar fully into a platebody rather than just into a dagger) <span class='rule-asterisk noscroll'>*</span>",
    "BIS Skilling": "Must obtain items that are best-in-slot/add quality-of-life for skilling (e.g. Dragon Pickaxe, Angler Outfit, wieldable saw, etc.)",
    "Collection Log": "Must obtain items with slots in the collection log (works in conjuction with the Rare Drop rule and the Boss Drops rule)",
    "Minigame": "Allow items obtained from minigame rewards to count towards chunk tasks",
    "Shortcut Task": "Allow agility shortcuts to count as an Agility skill task",
    "Shortcut": "Allow agility shortcuts to count as a primary method for training Agility",
    "Wield Crafted Items": "Crafted items (e.g. bows, metal armour/weapons, etc.) can count as BiS gear <span class='rule-asterisk noscroll'>*</span>",
    "Multi Step Processing": "Items must be fully processed, even multiple times within the same skill if needed (e.g. Ore -> Bar -> Smithed Item) <span class='rule-asterisk noscroll'>*</span>",
    "Shooting Star": "Getting the level to mine all tiers of shooting stars count as Mining skill tasks <span class='rule-asterisk noscroll'>*</span>",
    "Puro-Puro": "Allow implings from Puro-Puro & their drops to count towards chunk tasks",
    "Collection Log Bosses": "<b class='noscroll'>[Collection log]</b> Obtain items in the 'Bosses' tab",
    "Collection Log Raids": "<b class='noscroll'>[Collection log]</b> Obtain items in the 'Raids' tab",
    "Collection Log Clues": "<b class='noscroll'>[Collection log]</b> Obtain items in the 'Clues' tab when each tier of clue is 100% completable within your chunks <span class='rule-asterisk noscroll'>†</span>",
    "Collection Log Minigames": "<b class='noscroll'>[Collection log]</b> Obtain items in the 'Minigames' tab",
    "Collection Log Other": "<b class='noscroll'>[Collection log]</b> Obtain items in the 'Other' tab",
    "Herblore Unlocked": "Herblore tasks are automatically required once Druidic Ritual is completable",
    "Farming Primary": "Farming products (herbs, vegetables, etc.) can count as primary item sources for chunk tasks <span class='rule-asterisk noscroll'>*</span>",
    "Tertiary Keys": "Allow loot from tertiary slayer keys (brimstone/larran's) to count towards chunk tasks <span class='rule-asterisk noscroll'>*</span>",
    "Wandering implings": "Allow implings that randomly wander the world & their drops to count towards chunk tasks <span class='rule-asterisk noscroll'>*</span>",
    "Secondary Primary": "Allow secondary training methods to count as primary training methods (e.g. allow a 1/50 drop for a bronze bar be your required way to train Smithing) <span class='rule-asterisk noscroll'>*</span>",
    "RDT": "Allow items from the Rare Drop Table and the Gem Drop Table to count towards chunk tasks",
    "Untracked Uniques": "Must obtain extra uniques that are untracked on the collection log (e.g. gardening boots from Farmers)",
    "Combat and Teleport Spells": "Allow all spells to count as possible Magic skill tasks (otherwise only 'utility' spells like High Alchemy or Telegrab will count)",
    "Primary Spawns": "Item spawns count as primary access to an item, and can be used as a primary way to train a skill if needed <span class='rule-asterisk noscroll'>*</span>",
    "Smithing by Smelting": "Smelting ores into bars counts as a primary method for training Smithing",
    "Pets": "Obtaining pets is included in the collection log tasks <span class='rule-asterisk noscroll'>*</span>",
    "Jars": "Obtaining jars is included in the collection log tasks <span class='rule-asterisk noscroll'>*</span>",
    "Stuffables": "Must obtain stuffable items that can be mounted in the POH (big fish, slayer heads)",
    "Manually Complete Tasks": "<b class='noscroll'>For maps that allow manually choosing new chunks</b>, allow the ability to manually move completed active tasks",
    "Every Drop": "Must obtain every monster drop at least once",
    "Herblore Unlocked Snake Weed": "Herblore tasks are required once Druidic Ritual is completable & you have primary access to any level 3 herbs (Guam, Snake weed, Ardrigal, Sito foil, Rogue's purse, Volencia moss)",
    "HigherLander": "Accessing the intermediate and veteran landers for Pest Control are required tasks (only novice lander is required otherwise)",
    "Starting Items": "Allow tools gained from leaving Tutorial Island to be used within your chunks (aka not dropping your starting items). Includes: bronze axe, bronze pickaxe, tinderbox, small fishing net, shortbow, bronze dagger, bronze sword, wooden shield",
    "Tutor Ammo": "Items from the Magic/Ranged Combat Tutors in Lumbridge count as a way to train those respective skills (Air/Mind runes and Training bow/arrows)",
    "Secondary MTA": "Allow MTA to be required with secondary sources of nature/law/cosmic runes",
    "Fossil Island Tasks": "Require the Fossil Island Mini-Task List be completed, similar to diary tasks",
    "PVP-Only Spells": "Require spells that can only be cast on PVP Worlds/in the Wilderness (Teleother/Teleblock)",
    "Skilling Pets": "Require skilling pets be obtained as soon as the relevant skill is trainable <span class='rule-asterisk noscroll'>†</span>",
    "Money Unlockables": "Require money-unlockable options be bought (money crest in POH, angelic gravestone, additional bank space) <span class='rule-asterisk noscroll'>†</span>",
    "Prayers": "Must be able to activate all prayers possible <span class='rule-asterisk noscroll'>†</span>",
    "All Droptables": "Must obtain every drop from every unique monster's droptable <span class='rule-asterisk noscroll'>†</span>",
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
        "PVP-Only Spells": true,
        "Smithing by Smelting": true,
        "Rare Drop Amount": "0",
    },
    "Xtreme Chunker": {
        "Skillcape": true,
        "Rare Drop": true,
        "Pouch": true,
        "InsidePOH": true,
        "InsidePOH Primary": true,
        "Construction Milestone": true,
        "Boss": true,
        "Slayer Equipment": true,
        "Extra implings": true,
        "Normal Farming": true,
        "Raking": true,
        "Sulphurous Fertiliser": true,
        "CoX": true,
        "Tithe Farm": true,
        "Sorceress's Garden": true,
        "Show Skill Tasks": true,
        "Show Quest Tasks": true,
        "Show Diary Tasks": true,
        "Show Diary Tasks Any": true,
        "Fossil Island Tasks": true,
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
        "Jars": true,
        "Rare Drop Amount": "0",
        "HigherLander": true,
        "Secondary MTA": true,
        "Primary Spawns": true,
        "Tutor Ammo":  true,
    },
    "Supreme Chunker": {
        "Skillcape": true,
        "Rare Drop": true,
        "Pouch": true,
        "InsidePOH": true,
        "InsidePOH Primary": true,
        "Construction Milestone": true,
        "Boss": true,
        "Slayer Equipment": true,
        "Extra implings": true,
        "Normal Farming": true,
        "Raking": true,
        "Sulphurous Fertiliser": true,
        "CoX": true,
        "Tithe Farm": true,
        "Sorceress's Garden": true,
        "Show Skill Tasks": true,
        "Show Quest Tasks": true,
        "Show Diary Tasks": true,
        "Show Diary Tasks Any": true,
        "Fossil Island Tasks": true,
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
        "Jars": true,
        "Collection Log Clues": true,
        "Rare Drop Amount": "0",
        "HigherLander": true,
        "Secondary MTA": true,
        "Combat and Teleport Spells": true,
        "PVP-Only Spells": true,
        "Skilling Pets": true,
        "Primary Spawns": true,
        "Tutor Ammo":  true,
        "Money Unlockables": true,
        "Prayers": true,
        "All Droptables": true,
    },
};                                                                              // List of rules that are part of each preset

let rulePresetFlavor = {
    "Vanilla Chunker": "AKA the original ruleset",
    "Xtreme Chunker": "AKA Limpwurt's ruleset",
    "Supreme Chunker": "AKA Buz's ruleset"
};                                                                              // Preset flavour text

let ruleStructure = {
    "Visible Tasks": {
        "Show Skill Tasks": true,
        "Show Quest Tasks": ["Show Quest Tasks Complete"],
        "Show Diary Tasks": ["Show Diary Tasks Complete", "Show Diary Tasks Any", "Fossil Island Tasks"],
        "Show Best in Slot Tasks": ["Show Best in Slot Prayer Tasks", "Show Best in Slot Defensive Tasks", "Show Best in Slot Flinching Tasks", "Show Best in Slot Weight Tasks"]
    },
    "Overall Skill": {
        "Starting Items": true,
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
        "InsidePOH Primary": true,
        "InsidePOH": true,
        "Construction Milestone": true
    },
    "Farming": {
        "Normal Farming": true,
        "Raking": true,
        "Tithe Farm": true,
        "Sorceress's Garden": true,
        "Sulphurous Fertiliser": true,
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
        "Combat and Teleport Spells": true,
        "PVP-Only Spells": true,
        "Secondary MTA": true
    },
    "Mining": {
        "Shooting Star": true
    },
    "Prayer": {
        "Prayers": true
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
    "Item Sources": {
        "Boss": true,
        "Rare Drop": true,
        "RDT": true,
        "Tertiary Keys": true,
        "Primary Spawns": true,
        "Tutor Ammo": true
    },
    "Miscellaneous": {
        "Minigame": true,
        "Kill X": true,
        "BIS Skilling": true,
        "Collection Log": ["Collection Log Bosses", "Collection Log Raids", "Collection Log Minigames", "Collection Log Other", "Pets", "Jars", "Collection Log Clues"],
        "Untracked Uniques": true,
        "Skilling Pets": true,
        "Stuffables": true,
        "Money Unlockables": true,
        "Manually Complete Tasks": true,
        "Every Drop": true,
        "All Droptables": true
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
    "randomStartAlways": false,
    "darkmode": false,
    "defaultStickerColor": '#000000',
    "walkableRollable": true,
    "cinematicRoll": true,
    "taskSidebar": false,
    "ids": false,
};                                                                              // Current state of all settings

let settingNames = {
    "highvis": "Display the chunk map with higher visibility, allowing you to see better into locked chunks, with thinner chunk borders, more see-through chunk coloring, and more",
    "neighbors": "After a new chunk is rolled, automatically mark neighboring chunks as rollable",
    "remove": "After a new chunk is rolled, mark all locked chunks as not-rollable",
    "roll2": "Enable the roll 2 button, allowing you to roll two chunks and pick between the two",
    "unpick": "Enable the unpick chunk button, allowing you to unpick, and therefore re-lock, a randomly selected unlocked chunk (useful for forfeits)",
    "recent": "<b class='noscroll'>[Recent Chunks]</b> The recent chunks panel shows you the 5 most recently rolled chunks on your map, the dates you rolled them, how long it's been (in days) since your last roll, and more",
    "info": "<b class='noscroll'>[Chunk Info]</b> The chunk info panel shows you an array of information on every chunk in the game (monsters, npcs, item spawns, shops, and more). Hint: Right-click a chunk to bring up info on that chunk",
    "chunkTasks": "<b class='noscroll'>[Chunk Tasks]</b> The chunk tasks panel shows you an automatically made list of active tasks you need to do to finish your chunk. This is essential for any Chunker to keep track of what needs to get done",
    "completedTaskColor": "Change the color of checked-off chunk tasks",
    "completedTaskStrikethrough": "Cross-off chunk tasks as you complete them",
    "randomStartAlways": "Change the 'Pick Chunk' button to always be a 'Random Start' button; every chunk roll picks a random walkable chunk (that isn't already unlocked)",
    "darkmode": "Enable <b class='noscroll'>Dark Mode</b>",
    "defaultStickerColor": "Change the default color of chunk stickers",
    "walkableRollable": "Only automatically mark <b class='noscroll'>walkable</b> chunks",
    "cinematicRoll": "Enable fancier rolling of chunks",
    "taskSidebar": "Expand the task panel into a large sidebar, to show more tasks at once",
    "ids": "Show an overlay of Chunk ID's for each chunk",
};                                                                              // Descriptions of the settings

let settingStructure = {
    "Chunk Rolling Alternatives": {
        "roll2": true,
        "unpick": true,
        "randomStartAlways": true
    },
    "Chunk Neighbors": {
        "neighbors": ["walkableRollable"],
        "remove": true
    },
    "Information Panels": {
        "recent": true,
        "info": true,
        "chunkTasks": ["taskSidebar"]
    },
    "Customization": {
        "ids": true,
        "cinematicRoll": true,
        "highvis": true,
        "darkmode": true,
        "completedTaskStrikethrough": true,
        "completedTaskColor": true,
        "defaultStickerColor": true
    }
};                                                                              // Structure of the settings

let subSettingDefault = {
    "neighbors": true,
    "chunkTasks": false
};                                                                              // Default value of sub-setting when parent is checked

let settingsStructureConflict = {
    "neighbors": ["remove"],
    "remove": ["neighbors"]
}                                                                               // Rules that conflict with each other and can't both be checked

let maybePrimary = [
    "Normal Farming",
    "Raking",
    "Sulphurous Fertiliser",
    "Shortcut",
    "InsidePOH Primary"
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
    "Body rune",
    "Bronze arrow",
    "Bucket",
    "Cabbage",
    "Calquat tree seed",
    "Casket",
    "Celastrus seed",
    "Chaos rune",
    "Chaos talisman",
    "Chocolate bar",
    "Clue scroll (easy)",
    "Clue scroll (hard)",
    "Clue scroll (medium)",
    "Coal",
    "Coins",
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
    "Flyer",
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
    "Meat pie",
    "Mithril arrowtips",
    "Mithril bar",
    "Mithril ore",
    "Mithril scimitar",
    "Nature rune",
    "Nature talisman",
    "Old boot",
    "Onion",
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
    "Stale baguette",
    "Stamina potion(4)",
    "Steel arrow",
    "Steel bar",
    "Steel platebody",
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
let friends = {};
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
    "Ranged": ["Ranged+"],
    "Prayer": ["Primary+", "Bones+"],
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
};                                                                                  // What is the primary way to train each skill

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
};                                                                                  // Is each skill a processing skill

let diaryTierAbr = {
    'Easy': 'EA',
    'Medium': 'MD',
    'Hard': 'HD',
    'Elite': 'EL',
    'Museum Camp': 'MC',
    'Northern Reaches': 'NR',
    'Southern Swamps': 'SS',
    'Mountainous East': 'ME'
};                                                                                  // Abbreviations for diary tiers

// Misc. modal and task variables
let monsterExists = false;
let questChunks = [];
let manualModalOpen = false;
let manualTasks = {};
let manualEquipment = {};
let backloggedSources = {};
let fullChallengeArr = {};
let manualMonsters = {};
let slayerLocked = null;
let passiveSkill = {};
let detailsModalOpen = false;
let notesModalOpen = false;
let notesChallenge = null;
let notesSkill = null;
let rulesModalOpen = false;
let settingsModalOpen = false;
let chunkHistoryModalOpen = false;
let challengeAltsModalOpen = false;
let randomModalOpen = false;
let randomListModalOpen = false;
let statsErrorModalOpen = false;
let searchModalOpen = false;
let searchDetailsModalOpen = false;
let highestModalOpen = false;
let highest2ModalOpen = false;
let methodsModalOpen = false;
let completeModalOpen = false;
let addEquipmentModalOpen = false;
let stickerModalOpen = false;
let backlogSourcesModalOpen = false;
let manualOuterModalOpen = false;
let monsterModalOpen = false;
let slayerLockedModalOpen = false;
let passiveSkillModalOpen = false;
let rollChunkModalOpen = false;
let questStepsModalOpen = false;
let friendsListModalOpen = false;
let friendsAddModalOpen = false;
let workerOut = 0;
let gotData = false;
let questPointTotal = 0;
let oldChallengeArr = {};
let futureChunkData = {};
let highestOverall = {};
let savedBox = null;
let stickered = {};
let stickeredNotes = {};
let stickeredColors = {};
let stickerChoices = ['unset', 'skull', 'skull-crossbones', 'bomb', 'exclamation-circle', 'dice', 'poo', 'frown', 'grin-alt', 'heart', 'star', 'gem', 'award', 'crown', 'flag', 'asterisk', 'clock', 'hourglass', 'link', 'map-marker-alt', 'radiation-alt', 'shoe-prints', 'thumbs-down', 'thumbs-up', 'crow'];
let stickerChoicesOsrs = ['attack', 'hitpoints', 'mining', 'strength', 'agility', 'smithing', 'defence', 'herblore', 'fishing', 'ranged', 'thieving', 'cooking', 'prayer', 'fletching', 'firemaking', 'magic', 'crafting', 'woodcutting', 'runecraft', 'slayer', 'farming', 'construction', 'hunter', 'quest', 'diary'];
let savedStickerId;
let savedStickerSticker;
let altChallenges = {};
let numClueTasks = {};
let numClueTasksPossible = {};
let pickedNum;
let highestTab;
let highestTab2;
let dropRatesGlobal = {};
let currentVersion = '4.12.0';

// Patreon Test Server Data
let onTestServer = false;
let patreonMaps = {
    'test': true, // testing
    'temp': true, // testing
    'dev': true, // testing
    'yvl': true, // testing
    'src': true, // Source Chunk
    'kaa': true, // Chagohod
    'jlo': true, // JLo
    'pri': true, // invalidCards
};

let roll5Mid = 'rfr'; //Semanari

// ----------------------------------------------------------

// Event Listeners

// ----------------------------------------------------------

// Recieve message from worker
const myWorker = new Worker("./worker.js?v=4.12.2");
myWorker.onmessage = function(e) {
    workerOut--;
    workerOut < 0 && (workerOut = 0);
    chunkInfo = e.data[3];
    if (e.data[0] === 'future') {
        futureChunkData = e.data[2];
        let challengeStr = calcFutureChallenges2(e.data[1], e.data[2]);
        $('.panel-challenges').html(challengeStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') || 'None');
    } else if (e.data[0] === 'current') {
        globalValids = e.data[1];
        baseChunkData = e.data[2];
        highestCurrent = e.data[4];
        questPointTotal = e.data[6];
        highestOverall = e.data[7];
        dropRatesGlobal = e.data[8];
        calcCurrentChallenges2(e.data[5]);
        numClueTasks = {
            'beginner': 0,
            'easy': 0,
            'medium': 0,
            'hard': 0,
            'elite': 0,
            'master': 0
        };
        numClueTasksPossible = {
            'beginner': 0,
            'easy': 0,
            'medium': 0,
            'hard': 0,
            'elite': 0,
            'master': 0
        };
        !!chunkInfo['challenges']['Nonskill'] && Object.keys(chunkInfo['challenges']['Nonskill']).forEach(task => {
            if (!!chunkInfo['challenges']['Nonskill'][task] && chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('ClueTier')) {
                numClueTasks[chunkInfo['challenges']['Nonskill'][task]['ClueTier']]++;
                if (globalValids.hasOwnProperty('Nonskill') && globalValids['Nonskill'].hasOwnProperty(task)) {
                    numClueTasksPossible[chunkInfo['challenges']['Nonskill'][task]['ClueTier']]++;
                }
            }
        });
        searchModalOpen && searchWithinChunks();
        highestModalOpen && openHighest();
        highest2ModalOpen && openHighest2();
        checkSlayerLocked();
    }
}

// Prevent caching of json get
$(document).ready(function() {
    $.ajaxSetup({ cache: false });
});

// Prevent right-click menu from showing
window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);

// keydown listener
window.addEventListener('keydown', function(e) {
    if (e.key === 'Control' && (signedIn || testMode) && savedBox !== null) {
        let i = savedBox.id;
        let stickerExists = false;
        savedBox.childNodes.forEach(el => {
            if (!!el.className && el.className.includes('chunk-sticker')) {
                stickerExists = true;
            }
        });
        !stickerExists && $(savedBox).append(`<span class='chunk-sticker hidden-sticker' onclick="openStickers(${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex})"><i class="fas fa-tag" style="transform: scaleX(-1)"></i></span>`);
        $('.hidden-sticker').show();
        $('.chunk-sticker').addClass('clicky signedIn').css('font-size', fontZoom * (3 / 2) + 'px');
        if (savedBox.className.includes('gray')) {
            let blacklistLabelExists = false;
            savedBox.childNodes.forEach(el => {
                if (el.className.includes('blacklist-label')) {
                    blacklistLabelExists = true;
                    if ($(el).text() === 'Un-Blacklist') {
                        $(el).remove();
                        $(savedBox).append(`<span class='blacklist-label hidden-blacklist-label' onclick="blacklist(${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex})">Blacklist</span>`);
                    }
                }
            });
            !blacklistLabelExists && $(savedBox).append(`<span class='blacklist-label hidden-blacklist-label' onclick="blacklist(${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex})">Blacklist</span>`);
            $('.hidden-blacklist-label').show();
        } else if (savedBox.className.includes('blacklisted')) {
            let blacklistLabelExists = false;
            savedBox.childNodes.forEach(el => {
                if (el.className.includes('blacklist-label')) {
                    blacklistLabelExists = true;
                    if ($(el).text() === 'Blacklist') {
                        $(el).remove();
                        $(savedBox).append(`<span class='blacklist-label hidden-blacklist-label' onclick="unblacklist(${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex})">Un-Blacklist</span>`);
                    }
                }
            });
            !blacklistLabelExists && $(savedBox).append(`<span class='blacklist-label hidden-blacklist-label' onclick="unblacklist(${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex})">Un-Blacklist</span>`);
            $('.hidden-blacklist-label').show();
        } else {
            $('.hidden-blacklist-label').hide().remove();
        }
    } else if (e.key === 'Control' && !signedIn && savedBox !== null) {
        $('.chunk-sticker').addClass('clicky').css('font-size', fontZoom * (3 / 2) + 'px');
    }
}, false);

// keyup listener
window.addEventListener('keyup', function(e) {
    if (e.key === 'Control' && (signedIn || testMode)) {
        $('.hidden-sticker').hide().remove();
        $('.chunk-sticker.clicky').removeClass('clicky signedIn');
        $('.hidden-blacklist-label').hide().remove();
    } else if (e.key === 'Control') {
        $('.chunk-sticker.clicky').removeClass('clicky');
    }
}, false);

jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchend = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchend", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.wheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("wheel", handle, { passive: false });
    }
};
jQuery.event.special.mousewheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("mousewheel", handle, { passive: false });
    }
};

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
        if (keycode == '13') {
            //$('.pin.old').select();
            $('#access').click();
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
        if (keycode == '13') {
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

    $('.lock-closed').hover(function() {
        $(this).removeClass('fa-lock').addClass('fa-unlock-alt');
    }, function() {
        $(this).removeClass('fa-unlock-alt').addClass('fa-lock');
    });

    $('.mid-friend').on('input', function(e) {
        if ((!/^[a-zA-Z]+$/.test(e.target.value) && e.target.value !== '') || e.target.value.length > 4) {
            $(this).val(prevValueMidFriend);
        } else {
            $(this).val(e.target.value.toUpperCase());
            prevValueMidFriend = e.target.value;
            if (e.target.value.length === 3 || e.target.value.length === 4) {
                midFriendGood = true;
                checkIfGoodFriend();
            } else {
                midFriendGood = false;
                $('#submit-friend-button').prop('disabled', true);
            }
        }
    });

    $('.name-friend').on('input', function(e) {
        prevValueMidFriend = e.target.value;
        if (e.target.value.length > 0) {
            nameFriendGood = true;
            checkIfGoodFriend();
        } else {
            nameFriendGood = false;
            $('#submit-friend-button').prop('disabled', true);
        }
    });
});

// [Mobile] Mobile equivalent to 'mousedown', starts drag sequence
$('body').on('touchstart', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !patchNotesOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !highest2ModalOpen && !methodsModalOpen && !completeModalOpen && !addEquipmentModalOpen && !stickerModalOpen && !backlogSourcesModalOpen && !chunkHistoryModalOpen && !challengeAltsModalOpen && !manualOuterModalOpen && !monsterModalOpen && !slayerLockedModalOpen && !rollChunkModalOpen && !questStepsModalOpen && !friendsListModalOpen && !friendsAddModalOpen && !passiveSkillModalOpen) {
        ev.preventDefault();
        clickX = ev.changedTouches[0].pageX;
        clickY = ev.changedTouches[0].pageY;
    }
});

// [Mobile] Mobile equivalent to 'mouseup', ends drag sequence
$('body').on('touchend', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !patchNotesOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !highest2ModalOpen && !methodsModalOpen && !completeModalOpen && !addEquipmentModalOpen && !stickerModalOpen && !backlogSourcesModalOpen && !chunkHistoryModalOpen && !challengeAltsModalOpen && !manualOuterModalOpen && !monsterModalOpen && !slayerLockedModalOpen && !rollChunkModalOpen && !questStepsModalOpen && !friendsListModalOpen && !friendsAddModalOpen && !passiveSkillModalOpen) {
        ev.preventDefault();
        prevScrollLeft = prevScrollLeft + scrollLeft;
        prevScrollTop = prevScrollTop + scrollTop;
    }
});

// [Mobile] Mobile equivalent to 'mousemove', determines amount dragged since last trigger
$('body').on('touchmove', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !patchNotesOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !highest2ModalOpen && !methodsModalOpen && !completeModalOpen && !addEquipmentModalOpen && !stickerModalOpen && !backlogSourcesModalOpen && !chunkHistoryModalOpen && !challengeAltsModalOpen && !manualOuterModalOpen && !monsterModalOpen && !slayerLockedModalOpen && !rollChunkModalOpen && !questStepsModalOpen && !friendsListModalOpen && !friendsAddModalOpen && !passiveSkillModalOpen) {
        ev.preventDefault();
        updateScrollPos(ev.changedTouches[0]);
    }
});

// Credit to Amehzyn
// Handles zooming
$('body').on('scroll mousewheel DOMMouseScroll', function(e) {
    if (!e.target.className || typeof e.target.className !== 'string' || e.target.className.split(' ').includes('panel') || e.target.className.split(' ').includes('link') || e.target.className.split(' ').includes('noscroll')) {
        $('body').scrollTop(0);
        return;
    } else if (atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen || e.target.className.split(' ').includes('noscrollhard')) {
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
    $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
    $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
    $('.box').css('font-size', fontZoom + 'px');
    $('.chunk-sticker').css('font-size', fontZoom * (3 / 2) + 'px');
    $('.chunk-sticker > img').parent().css('width', fontZoom * (3 / 2) + 'px');
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
        } else if (e.keyCode === 27 && testMode && !rollChunkModalOpen) {
            testMode = false;
            locked && $('.open-manual-outer-container').css('opacity', 0).hide();
            loadData();
            $('.test-hint').hide();
        } else if ((e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !patchNotesOpen && !manualModalOpen && !detailsModalOpen && !rulesModalOpen && !settingsModalOpen && !randomModalOpen && !randomListModalOpen && !statsErrorModalOpen && !searchModalOpen && !searchDetailsModalOpen && !highestModalOpen && !highest2ModalOpen && !methodsModalOpen && !completeModalOpen && !notesModalOpen && !addEquipmentModalOpen && !stickerModalOpen && !backlogSourcesModalOpen && !chunkHistoryModalOpen && !challengeAltsModalOpen && !manualOuterModalOpen && !monsterModalOpen && !slayerLockedModalOpen && !rollChunkModalOpen && !questStepsModalOpen && !friendsListModalOpen && !friendsAddModalOpen && !passiveSkillModalOpen) {
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
        if (e.button !== 0 || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen) {
            return;
        }
        if (clicked) {
            if (!e.buttons && !e.which) {
                clicked = false;
                if (movedNum > 1) {
                    prevScrollLeft = prevScrollLeft + scrollLeft;
                    prevScrollTop = prevScrollTop + scrollTop;
                }
            } else {
                updateScrollPos(e);
                $('.outer').css('cursor', 'grabbing');
                moved = true;
                movedNum++;
            }
        } else if (!!e.target.className && typeof e.target.className === 'string' && e.target.className.includes('box')) {
            savedBox = e.target;
        }
    },
    'mousedown': function(e) {
        if (e.button !== 0 || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen) {
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
        if ((e.button !== 0 && e.button !== 2) || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen) {
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
                $('.lock-closed').addClass('animated shake').removeClass('').css({ 'color': 'rgb(200, 75, 75)' });
                setTimeout(function() {
                    $('.lock-closed').removeClass('animated shake').addClass('').css({ 'color': 'black' });
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
                if (selectedNum > 999) {
                    $(e.target).addClass('selected').removeClass('gray').append('<span draggable="false" class="label extralong">' + selectedNum + '</span>');
                    $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
                } else if (selectedNum > 99) {
                    $(e.target).addClass('selected').removeClass('gray').append('<span draggable="false" class="label long">' + selectedNum + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
                } else {
                    $(e.target).addClass('selected').removeClass('gray').append('<span draggable="false" class="label">' + selectedNum + '</span>');
                    $('.label').css('font-size', labelZoom + 'px');
                }
                $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
                selectedNum++;
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
                if (selectedChunks < 300) {
                    fixNums(99999);
                }
            } else if ($(e.target).hasClass('selected')) {
                if (e.shiftKey) {
                    if (selectedChunks < 300) {
                        fixNums($($(e.target).children('.label')).text());
                    }
                    $(e.target).children('.label').remove();
                    $(e.target).addClass('gray').removeClass('selected');
                    $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
                } else {
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
                    !onMobile && calcCurrentChallenges();
                }
            } else if ($(e.target).hasClass('potential')) {
                let savedNum = $($(e.target).children('.label')).text();
                $(e.target).children('.label').remove();
                $(e.target).addClass('unlocked').removeClass('potential');
                $('.potential > .label').css('color', 'white');
                $('.potential').addClass('selected').removeClass('potential recent');
                autoSelectNeighbors && selectNeighbors(e.target);
                autoRemoveSelected && $('.selected > .label').remove();
                autoRemoveSelected && $('.selected').addClass('gray').removeClass('selected');
                autoRemoveSelected && (selectedChunks = 1);
                autoRemoveSelected && (selectedNum = 1);
                if (selectedChunks < 300) {
                    fixNums(savedNum);
                }
                if (isPicking) {
                    $('.pick').text('Pick for me');
                } else if ((unlockedChunks === 0 && selectedChunks === 0) || settings['randomStartAlways']) {
                    $('.pick').text('Random Start?');
                } else {
                    $('.pick').text('Pick Chunk');
                }
                roll2On && $('.roll2').text('Roll 2');
                roll2On && mid === roll5Mid && $('.roll2').text('Roll 5');
                unpickOn && $('.unpick').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
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
                !onMobile && calcCurrentChallenges();
            } else if ($(e.target).hasClass('recent')) {
                // ----
            } else if ($(e.target).hasClass('blacklisted')) {
                // ----
            } else {
                $(e.target).addClass('gray').removeClass('unlocked').css('border-width', 0);
                $('#chunkInfo1').text('Unlocked chunks: ' + --unlockedChunks);
                !onMobile && getChunkAreas();
                !onMobile && setupCurrentChallenges(false);
                !onMobile && setCalculating('.panel-active');
                !onMobile && setCalculating('.panel-areas');
                !onMobile && setCalculating('.panel-completed');
                !onMobile && calcCurrentChallenges();
            }
            if (isPicking) {
                $('.pick').text('Pick for me');
            } else if ((unlockedChunks === 0 && selectedChunks === 0) || settings['randomStartAlways']) {
                $('.pick').text('Random Start?');
            } else {
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
    prevScrollLeft = -((zoom / oldZoom) * (-prevScrollLeft + window.innerWidth / 2)) + window.innerWidth / 2;
    prevScrollTop = -((zoom / oldZoom) * (-prevScrollTop + window.innerHeight / 2)) + window.innerHeight / 2;
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
    $('.img').css({ marginLeft: prevScrollLeft, marginTop: prevScrollTop });
    $('.outer').css({ marginLeft: prevScrollLeft, marginTop: prevScrollTop });
    $('.img').width(zoom + 'vw');
    $('.outer').width(zoom + 'vw');
    $('.box').css('font-size', fontZoom + 'px');
    $('.chunk-sticker').css('font-size', fontZoom * (3 / 2) + 'px');
    $('.chunk-sticker > img').parent().css('width', fontZoom * (3 / 2) + 'px');
    $('.label').css('font-size', labelZoom + 'px');
    $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
    $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
    $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
}

// Pick button: picks a random chunk from selected/potential
var pick = function(both) {
    if (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen || (unlockedChunks !== 0 && selectedChunks === 0 && !settings['randomStartAlways'])) {
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
        let numToRoll = mid === roll5Mid ? 5 : 2;
        for (let temp = 0; temp < numToRoll; temp++) {
            el = $('.potential');
            rand = 0;
            sNum = $($(el[rand]).children('.label')).text();
            if ($('.potential').length <= 0) {
                fixNums(1);
                break;
            }
            $(el[rand]).children('.label').remove();
            $(el[rand]).addClass('unlocked recent').removeClass('potential');
            autoSelectNeighbors && selectNeighbors(el[rand]);
            autoRemoveSelected && $('.selected > .label').remove();
            autoRemoveSelected && $('.selected').addClass('gray').removeClass('selected');
            autoRemoveSelected && (selectedChunks = 1);
            autoRemoveSelected && (selectedNum = 1);
            if (el.length < 300) {
                fixNums(sNum);
            }
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
        if (isPicking) {
            $('.pick').text('Pick for me');
        } else if ((unlockedChunks === 0 && selectedChunks === 0) || settings['randomStartAlways']) {
            $('.pick').text('Random Start?');
        } else {
            $('.pick').text('Pick Chunk');
        }
        roll2On && $('.roll2').text('Roll 2');
        roll2On && mid === roll5Mid && $('.roll2').text('Roll 5');
        unpickOn && $('.unpick').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
        completeChallenges();
        !onMobile && setCalculating('.panel-active');
        !onMobile && setCalculating('.panel-areas');
        !onMobile && setCalculating('.panel-completed');
        !onMobile && !activeSubTabs['skill'] && expandActive('skill');
        !onMobile && !activeSubTabs['bis'] && expandActive('bis');
        !onMobile && !activeSubTabs['quest'] && expandActive('quest');
        !onMobile && !activeSubTabs['diary'] && expandActive('diary');
        !onMobile && !activeSubTabs['extra'] && expandActive('extra');
        !onMobile && calcCurrentChallenges();
        setData();
        chunkBorders();
        if (el.length < 300) {
            fixNums(9999);
        }
        return;
    } else if ((unlockedChunks === 0 && selectedChunks === 0) || settings['randomStartAlways']) {
        chunkInfo['walkableChunks'].forEach(id => {
            $('.box:contains(' + id + ')').addClass('walkable');
        });
        el = $('.walkable:not(.unlocked)');
        rand = Math.floor(Math.random() * el.length);
        sNum = $($(el[rand]).children('.label')).text();
        if (settings['cinematicRoll'] && !onMobile) {
            openRollChunk(el, rand, sNum);
        }
        selectedChunks++;
        didRandomStart = true;
        $(el[rand]).children('.label').remove();
        $(el[rand]).addClass('unlocked recent').removeClass('gray selected potential walkable');
        if (isPicking) {
            $('.pick').text('Pick for me');
        } else if ((unlockedChunks === 0 && selectedChunks === 0) || settings['randomStartAlways']) {
            $('.pick').text('Random Start?');
        } else {
            $('.pick').text('Pick Chunk');
        }
    } else if (!isPicking) {
        el = $('.selected');
        rand = Math.floor(Math.random() * el.length);
        sNum = $($(el[rand]).children('.label')).text();
        if (settings['cinematicRoll'] && !onMobile) {
            openRollChunk(el, rand, sNum);
        }
        $(el[rand]).children('.label').remove();
        $(el[rand]).addClass('unlocked recent').removeClass('selected');
    } else {
        el = $('.potential');
        rand = Math.floor(Math.random() * el.length);
        sNum = $($(el[rand]).children('.label')).text();
        if (settings['cinematicRoll'] && !onMobile) {
            openRollChunk(el, rand, sNum);
        }
        $(el[rand]).children('.label').remove();
        $(el[rand]).addClass('unlocked recent').removeClass('potential');
        $('.potential > .label').css('color', 'white');
        $('.potential').addClass('selected').removeClass('potential recent');
        isPicking = false;
        if (isPicking) {
            $('.pick').text('Pick for me');
        } else if ((unlockedChunks === 0 && selectedChunks === 0) || settings['randomStartAlways']) {
            $('.pick').text('Random Start?');
        } else {
            $('.pick').text('Pick Chunk');
        }
        roll2On && $('.roll2').text('Roll 2');
        roll2On && mid === roll5Mid && $('.roll2').text('Roll 5');
        unpickOn && $('.unpick').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
    }
    autoSelectNeighbors && !didRandomStart && selectNeighbors(el[rand]);
    autoRemoveSelected && $('.selected > .label').remove();
    autoRemoveSelected && $('.selected').addClass('gray').removeClass('selected');
    autoRemoveSelected && (selectedChunks = 1);
    autoRemoveSelected && (selectedNum = 1);
    if (el.length < 300) {
        fixNums(sNum);
    }
    $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
    $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
    (!settings['cinematicRoll'] || onMobile) && scrollToPos(parseInt($(el[rand]).attr('id')) % rowSize, Math.floor(parseInt($(el[rand]).attr('id')) / rowSize), 0, 0, false);
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
    completeChallenges(true);
    !onMobile && setCalculating('.panel-active');
    !onMobile && setCalculating('.panel-areas');
    !onMobile && setCalculating('.panel-completed');
    !onMobile && !activeSubTabs['skill'] && expandActive('skill');
    !onMobile && !activeSubTabs['bis'] && expandActive('bis');
    !onMobile && !activeSubTabs['quest'] && expandActive('quest');
    !onMobile && !activeSubTabs['diary'] && expandActive('diary');
    !onMobile && !activeSubTabs['extra'] && expandActive('extra');
    !onMobile && !settings['cinematicRoll'] && calcCurrentChallenges();
    setData();
    chunkBorders();
}

// Roll 2 button: rolls 2 chunks from all selected chunks
var roll2 = function() {
    if (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen || (($('.selected').length < 1 && !isPicking) || ($('.potential').length < 1 && isPicking))) {
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
        $('.unpick').css({ 'opacity': 0, 'cursor': 'default' }).prop('disabled', true).hide();
        $('.pick').text('Pick for me');
        $('.roll2').text('Unlock both');
        mid === roll5Mid && $('.roll2').text('Unlock all');
    }
    let numToRoll = mid === roll5Mid ? 5 : 2;
    for (var i = 0; i < numToRoll; i++) {
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
var toggleIds = function(value) {
    showChunkIds = value;
    setCookies();
    if (showChunkIds) {
        $('.chunkId').show();
        $('.box').css('color', 'rgba(255, 255, 255, 255)').addClass('quality');
    } else {
        $('.chunkId').hide();
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
    scrollToPos(Math.floor(sumX / num), Math.floor(sumY / num), sumX / num - Math.floor(sumX / num), sumY / num - Math.floor(sumY / num), extra === 'quick');
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
    settingsOpen = false;
    $('.settings-menu').hide();
    $('.settings').css({ 'color': 'var(--colorText)' });
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
            $('.box').removeClass('selected potential unlocked recent blacklisted').addClass('gray').css('border-width', 0);
            $('.label').remove();
            roll2On && $('.roll2').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
            unpickOn && $('.unpick').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
            recentOn && $('.menu7').css({ 'opacity': 1, 'cursor': 'pointer' }).prop('disabled', false).show();
            chunkInfoOn && $('.menu8').css({ 'opacity': 1 }).show();
            chunkTasksOn && $('.menu9').css({ 'opacity': 1 }).show();
            isPicking = false;
            selectedChunks = 0;
            unlockedChunks = 0;
            selectedNum = 1;

            $('#chunkInfo1').text('Unlocked chunks: ' + unlockedChunks);
            $('#chunkInfo2').text('Selected chunks: ' + selectedChunks);

            selected && selected.sort(function(a, b) { return b - a }).forEach(function(id) {
                while (id.startsWith('0') && id.length > 1) {
                    id = id.substr(1);
                }
                $('#' + id).addClass('selected').removeClass('gray potential unlocked blacklisted').append('<span draggable="false" class="label">' + selectedNum++ + '</span>');
                $('.label').css('font-size', labelZoom + 'px');
                $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
                $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
                $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
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
            $('#import-menu').css({ 'opacity': 0 }).hide();
            $('.import').css('opacity', 0).show();
            $('.import').animate({ 'opacity': 1 });
            if ((unlockedChunks === 0 && selectedChunks === 0) || settings['randomStartAlways']) {
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
    $('#import-menu').css({ 'opacity': 0 }).hide();
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
    settingsOpen = false;
    $('.settings-menu').hide();
    $('.settings').css({ 'color': 'var(--colorText)' });
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
                $('.highscoretoggle').html('Change chunk stats username<i class="pic fas fa-trophy"></i>');
                $('#highscore-menu').css({ 'opacity': 0 }).hide();
                $('#highscore-menu2').css({ 'opacity': 1 }).show();
                $('#populateButton').attr({ 'href': 'https://chunk-stats.web.app/user/' + userName });
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
    $('#highscore-menu').css({ 'opacity': 0 }).hide();
    setTimeout(function() {
        $('#highscore-menu').css('opacity', 1);
        $('#highscoreoptin').prop('disabled', true).html('Save Username');
        $('.username').val('');
        highscoreMenuOpen = false;
    }, 500);
}

// Exits the highscores menu2
var exitHighscoreMenu2 = function() {
    $('#highscore-menu2').css({ 'opacity': 0 }).hide();
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
    $('#help-menu').css({ 'opacity': 0 }).hide();
    helpMenuOpen = false;
    helpMenuOpenSoon = false;
    !locked && setData();
}

// Opens the patch notes
var openPatchNotesModal = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !onMobile && !helpMenuOpen) {
        patchNotesOpen = true;
        $('#myModal24').show();
    }
}

// Exits the patch notes
var dismissPatchNotes = function() {
    $('#myModal24').hide();
    patchNotesOpen = false;
    patchNotesOpenSoon = false;
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
                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 0).show();
                    roll2On && $('.roll2').css('opacity', 0).show();
                    !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                    $('.open-manual-outer-container').css('opacity', 0).show();
                    rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                    $('#entry-menu').animate({ 'opacity': 0 });
                    setTimeout(function() {
                        $('#entry-menu').css('opacity', 1).hide();
                        $('.pin.entry').val('');
                        $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').animate({ 'opacity': 1 });
                        roll2On && $('.roll2').animate({ 'opacity': 1 });
                        !isPicking && unpickOn && $('.unpick').animate({ 'opacity': 1 });
                        $('.open-manual-outer-container').animate({ 'opacity': 1 });
                        rules['Manually Complete Tasks'] && $('.open-complete-container').animate({ 'opacity': 1 });
                        $('#unlock-entry').prop('disabled', false).html('Unlock');
                        locked = false;
                        inEntry = false;
                        helpMenuOpenSoon && helpFunc();
                        patchNotesOpenSoon && openPatchNotesModal();
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
                            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 0).show();
                            roll2On && $('.roll2').css('opacity', 0).show();
                            !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                            $('.open-manual-outer-container').css('opacity', 0).show();
                            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                            $('#entry-menu').animate({ 'opacity': 0 });
                            setTimeout(function() {
                                $('#entry-menu').css('opacity', 1).hide();
                                $('.pin.entry').val('');
                                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').animate({ 'opacity': 1 });
                                roll2On && $('.roll2').animate({ 'opacity': 1 });
                                !isPicking && unpickOn && $('.unpick').animate({ 'opacity': 1 });
                                $('.open-manual-outer-container').animate({ 'opacity': 1 });
                                rules['Manually Complete Tasks'] && $('.open-complete-container').animate({ 'opacity': 1 });
                                $('#unlock-entry').prop('disabled', false).html('Unlock');
                                locked = false;
                                inEntry = false;
                                helpMenuOpenSoon && helpFunc();
                                patchNotesOpenSoon && openPatchNotesModal();
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
    $('#entry-menu').animate({ 'opacity': 0 });
    $('.lock-closed').css('opacity', 0).show();
    setTimeout(function() {
        $('#entry-menu').css('opacity', 1).hide();
        !viewOnly ? $('.lock-closed').animate({ 'opacity': 1 }) : $('.lock-closed').hide();
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
                            patchNotesOpenSoon && openPatchNotesModal();
                            atHome = false;
                            $('.loading').show();
                            $('#page2b').hide();
                            $('.background-img').hide();
                            $('.center').css('margin-top', '15px');
                            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 1).show();
                            $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, #outerImgDiv').show();
                            roll2On && $('.roll2').css('opacity', 1).show();
                            !isPicking && unpickOn && $('.unpick').css('opacity', 1).show();
                            $('.open-manual-outer-container').css('opacity', 1).show();
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
                                    patchNotesOpenSoon && openPatchNotesModal();
                                    myRef = firebase.database().ref('maps/' + mid);
                                    atHome = false;
                                    $('.loading').show();
                                    $('#page2b').hide();
                                    $('.background-img').hide();
                                    $('.center').css('margin-top', '15px');
                                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 1).show();
                                    $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, #outerImgDiv').show();
                                    roll2On && $('.roll2').css('opacity', 1).show();
                                    !isPicking && unpickOn && $('.unpick').css('opacity', 1).show();
                                    $('.open-manual-outer-container').css('opacity', 1).show();
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
            window.location.href = window.location.href.split('?')[0] + '?' + mid;
            /*document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker V2';
            $('.lock-closed, .lock-opened').hide();
            locked = true;
            inEntry = true;
            myRef = firebase.database().ref('maps/' + mid);
            atHome = false;
            $('.loading').show();
            $('#page2b').hide();
            $('.background-img').hide();
            setupMap();*/
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
                    $('.loading').show();
                    $('#page8').hide();
                    $('.background-img').hide();
                    $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, #outerImgDiv').show();
                    setupMap();
                }).catch((error) => { console.log(error) });
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
    if (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || patchNotesOpen || manualModalOpen || detailsModalOpen || notesModalOpen || rulesModalOpen || settingsModalOpen || randomModalOpen || randomListModalOpen || statsErrorModalOpen || searchModalOpen || searchDetailsModalOpen || highestModalOpen || highest2ModalOpen || methodsModalOpen || completeModalOpen || addEquipmentModalOpen || stickerModalOpen || backlogSourcesModalOpen || chunkHistoryModalOpen || challengeAltsModalOpen || manualOuterModalOpen || monsterModalOpen || slayerLockedModalOpen || rollChunkModalOpen || questStepsModalOpen || friendsListModalOpen || friendsAddModalOpen || passiveSkillModalOpen || $('.unlocked').length < 1) {
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
        $(el[rand]).append('<span draggable="false" class="label extralong">' + selectedNum + '</span>');
        $(el[rand]).addClass('selected').removeClass('unlocked').addClass('recent');
        $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
    } else if (selectedNum > 99) {
        $(el[rand]).append('<span draggable="false" class="label long">' + selectedNum + '</span>');
        $(el[rand]).addClass('selected').removeClass('unlocked').addClass('recent');
        $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
    } else {
        $(el[rand]).append('<span draggable="false" class="label">' + selectedNum + '</span>');
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
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !onMobile && !helpMenuOpen) {
        settingsOpen = !settingsOpen;
        if (settingsOpen) {
            $('.settings-menu').show();
            $('.settings').css({ 'color': 'rgb(150, 150, 150)' });
        } else {
            $('.settings-menu').hide();
            $('.settings').css({ 'color': 'var(--colorText)' });
        }
    }
}

// Enables screenshot mode
var enableScreenshotMode = function() {
    $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .menu10, .settings-menu, .topnav, #beta, .hiddenInfo').hide();
    screenshotMode = true;
    $('.escape-hint').css('opacity', 1).show();
    setTimeout(function() {
        $('.escape-hint').animate({ 'opacity': 0 });
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
        $('.open-manual-outer-container').css('opacity', 0).hide();
    } else {
        unlockChallenges();
        $('.open-manual-outer-container').css('opacity', 1).show();
        rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 1).show();
    }
    settingsMenu();
}

// Toggles high visibility mode
var toggleVisibility = function(value) {
    highVisibilityMode = value;
    setCookies();
    highVisibilityMode ? $('.box').addClass('visible') : $('.box').removeClass('visible');
}

// Toggles dark mode
var toggleDarkMode = function(value) {
    darkMode = value;
    setCookies();
    if (darkMode) {
        $("body").get(0).style.setProperty("--color1", "rgb(22, 27, 34)");
        $("body").get(0).style.setProperty("--color2", "rgb(13, 17, 23)");
        $("body").get(0).style.setProperty("--color3", "rgb(46, 50, 59)");
        $("body").get(0).style.setProperty("--color4", "rgb(56, 60, 69)");
        $("body").get(0).style.setProperty("--color5", "rgb(46, 50, 59)");
        $("body").get(0).style.setProperty("--color6", "rgb(22, 27, 34)");
        $("body").get(0).style.setProperty("--color7", "rgb(46, 50, 59)");
        $("body").get(0).style.setProperty("--color8", "rgb(61, 65, 74)");
        $("body").get(0).style.setProperty("--color9", "rgb(46, 50, 59)");
        $("body").get(0).style.setProperty("--colorText", "rgb(201, 209, 217)");
        $("body").get(0).style.setProperty("--colorTextAlt", "rgb(181, 189, 197)");
        $("body").get(0).style.setProperty("--colorLink", "rgb(88, 166, 255)");
        $("body").get(0).style.setProperty("--colorFlash", "rgba(150, 150, 0, 0.7)");
        $("body").get(0).style.setProperty("--colorBox", "rgba(50, 50, 50, .6)");
        $("body").get(0).style.setProperty("--colorBoxLight", "rgba(50, 50, 50, .4)");
        $("body").get(0).style.setProperty("--colorBackgroundSidebar", "rgba(22, 27, 34, .75)");
        $(".btnDiv").addClass('dark');
    } else {
        $("body").get(0).style.setProperty("--color1", "rgb(200, 200, 200)");
        $("body").get(0).style.setProperty("--color2", "rgb(180, 180, 180)");
        $("body").get(0).style.setProperty("--color3", "rgb(220, 220, 220)");
        $("body").get(0).style.setProperty("--color4", "rgb(230, 230, 230)");
        $("body").get(0).style.setProperty("--color5", "rgb(200, 200, 100)");
        $("body").get(0).style.setProperty("--color6", "rgb(255, 255, 255)");
        $("body").get(0).style.setProperty("--color7", "rgb(240, 240, 240)");
        $("body").get(0).style.setProperty("--color8", "rgb(150, 150, 150)");
        $("body").get(0).style.setProperty("--color9", "rgb(120, 120, 120)");
        $("body").get(0).style.setProperty("--colorText", "rgb(0, 0, 0)");
        $("body").get(0).style.setProperty("--colorTextAlt", "rgb(30, 30, 30)");
        $("body").get(0).style.setProperty("--colorLink", "rgb(0, 0, 255)");
        $("body").get(0).style.setProperty("--colorFlash", "rgba(255, 255, 0, 0.7)");
        $("body").get(0).style.setProperty("--colorBox", "rgba(150, 150, 150, .6)");
        $("body").get(0).style.setProperty("--colorBoxLight", "rgba(150, 150, 150, .4)");
        $("body").get(0).style.setProperty("--colorBackgroundSidebar", "rgba(200, 200, 200, .4)");
        $(".btnDiv").removeClass('dark');
    }
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

// Toggles the task sidebar
var toggleTaskSidebar = function(value, extra) {
    $('.menu9 .background-sidebar').remove();
    value ? $('.menu9').addClass('sidebar') : $('.menu9').removeClass('sidebar');
    value ? $('.menu9').append(`<span class='noscroll background-sidebar'></span>`) : $('.menu9 .background-sidebar').remove();
    toggleRecent(recentOn, extra);
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
    (recentOn && !settings['taskSidebar']) ? $('.menu7').show() : $('.menu7').hide();
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
    let box = $('.box:contains(' + id + ')').filter(function() { return parseInt($(this).children('.chunkId').text()) === parseInt(id); }).addClass('recent');
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
        $('.center').css({ 'height': '40px', 'width': '90px', 'font-size': '12px' });
        $('.pick, .roll2, .unpick').css({ 'height': '20px', 'width': '90px', 'font-size': '12px' });
        $('.menu2, .menu6, .menu7, .menu8, .menu9, .menu10, .settings, .gohighscore, .gobugreport, .godiscord, .gopatreon, .godocumentation, .gosearch, .hiddenInfo, .help-button, .toptitle2-outer').hide().remove();
        $('.hr').css({ 'width': '25px' });
        $('.gohighscore').css({ 'right': '3vw', 'left': 'auto' });
        $('.block, .block > .title').css({ 'font-size': '18px' });
        $('.block > button').css({ 'font-size': '10px' });
        $('.menu3').css({ 'width': '110px', 'height': '15px' });
        $('#chunkInfo1, #chunkInfo2, .or').css({ 'font-size': '12px' });
        $('.box').addClass('mobile').css({ 'min-height': '96px', 'min-width': '96px', 'max-height': '96px', 'max-width': '96px' });
        center('quick');
    }
    $('.potential > .label').css('color', 'black');
    $('.loading').fadeOut(1000);
}

// Creates board of boxes, sets initial sizes of scalable elements, and hides certain elements if needed
var setupMap = function() {
    if (!atHome) {
        $('.body').show();
        $('#page1, #page1extra, #import-menu, #highscore-menu, #highscore-menu2, #help-menu').hide();
        if (locked) {
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 0).hide();
            !isPicking && $('.roll2, .unpick').css('opacity', 0).hide();
            $('.center').css('margin-top', '0px');
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            $('.open-manual-outer-container').css('opacity', 0).hide();
            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).hide();
            $('.pin.entry').focus();
        } else {
            $('.center').css('margin-top', '15px');
        }
        if (locked === undefined || locked) {
            locked = true;
            $('.lock-closed, .lock-opened').hide();
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .settingstoggle, .friendslist, .taskstoggle').css('opacity', 0).hide();
            $('.center').css('margin-top', '0px');
            !isPicking && $('.roll2, .unpick').css('opacity', 0).hide();
            $('.open-manual-outer-container').css('opacity', 0).hide();
            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).hide();
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            $('.pin.entry').focus();
        }
        for (var i = 0; i < fullSize; i++) {
            $('.btnDiv').append(`<div id=${i} class='box gray'><span class='chunkId'>${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex}</span></div>`);
        }
        labelZoom = $('.box').width();
        fontZoom = $('.box').width() / 6;
        $('.label').css('font-size', labelZoom + 'px');
        $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
        $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
        $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
        $('.box').css('font-size', fontZoom + 'px');
        $('.chunk-sticker').css('font-size', fontZoom * (3 / 2) + 'px');
        $('.chunk-sticker > img').parent().css('width', fontZoom * (3 / 2) + 'px');
        !mid && (mid = window.location.href.split('?')[1]);
        document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker V2';
        $('.toptitle2').text(mid.split('-')[0].toUpperCase());
        if (mid === 'jvb') { // Chunky Boys
            $('.toptitle2').text('(not a sponsor)');
        }
        !onMobile && toggleChallengesPanel('active');
        loadData(true);
    }
}

// Sets all neighbors of recently unlocked chunk to selected
var selectNeighbors = function(el) {
    var ops = ['-x', '+x', '-y', '+y'];
    var num;
    for (var i = 0; i < 4; i++) {
        if (ops[i].substring(1, 2) === 'x') {
            num = (i - 1) * 2 + 1;
            if (Math.floor((parseInt(el.id) + num) / rowSize) === Math.floor(parseInt(el.id) / rowSize) && $(`#${parseInt(el.id) + num}`).hasClass('gray') && (!settings['walkableRollable'] || chunkInfo['walkableChunks'].includes($($(`#${parseInt(el.id) + num}`).children('.chunkId')[0]).text()))) {
                if (selectedNum > 999) {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span draggable="false" class="label extralong">' + selectedNum + '</span>');
                    $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
                } else if (selectedNum > 99) {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span draggable="false" class="label long">' + selectedNum + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
                } else {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span draggable="false" class="label">' + selectedNum + '</span>');
                    $('.label').css('font-size', labelZoom + 'px');
                }
                $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
                selectedNum++;
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            }
        } else {
            num = ((i - 3) * 2 + 1) * rowSize;
            if (parseInt(el.id) + num >= 0 && parseInt(el.id) + num < fullSize && $(`#${parseInt(el.id) + num}`).hasClass('gray') && (!settings['walkableRollable'] || chunkInfo['walkableChunks'].includes($($(`#${parseInt(el.id) + num}`).children('.chunkId')[0]).text()))) {
                if (selectedNum > 999) {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span draggable="false" class="label extralong">' + selectedNum + '</span>');
                    $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
                } else if (selectedNum > 99) {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span draggable="false" class="label long">' + selectedNum + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
                } else {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span draggable="false" class="label">' + selectedNum + '</span>');
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
    if (newScrollLeft > 400) {
        newScrollLeft = 400;
        prevScrollLeft = 400;
        clickX = e.pageX;
    }
    if (newScrollTop > 450) {
        newScrollTop = 450;
        prevScrollTop = 450;
        clickY = e.pageY;
    }
    if (newScrollLeft + $('.imgDiv').width() + 400 < window.innerWidth) {
        newScrollLeft = -$('.imgDiv').width() + window.innerWidth - 400;
        prevScrollLeft = -$('.imgDiv').width() + window.innerWidth - 400;
        clickX = e.pageX;
    }
    if (newScrollTop + $('.imgDiv').height() + 400 < window.innerHeight) {
        newScrollTop = -$('.imgDiv').height() + window.innerHeight - 400;
        prevScrollTop = -$('.imgDiv').height() + window.innerHeight - 400;
        clickY = e.pageY;
    }
    $('.imgDiv').css({ left: newScrollLeft, top: newScrollTop });
    scrollLeft = - (clickX - e.pageX);
    scrollTop = - (clickY - e.pageY);
}

// Scrolls to position x.xPart, y.yPart
var scrollToPos = function(x, y, xPart, yPart, doQuick) {
    zoom = $('.imgDiv').width();
    prevScrollLeft = -$('#' + (y * rowSize + x)).position().left + window.innerWidth / 2 - $('#' + (rowSize + 1)).position().left * (xPart + .5);
    prevScrollTop = -$('#' + (y * rowSize + x)).position().top + window.innerHeight / 2 - $('#' + (rowSize + 1)).position().top * (yPart + .5);
    if (prevScrollLeft > 400) {
        prevScrollLeft = 400;
    }
    if (prevScrollTop > 450) {
        prevScrollTop = 450;
    }
    if (prevScrollLeft + $('.imgDiv').width() + 400 < window.innerWidth) {
        prevScrollLeft = -$('.imgDiv').width() + window.innerWidth - 400;
    }
    if (prevScrollTop + $('.imgDiv').height() + 400 < window.innerHeight) {
        prevScrollTop = -$('.imgDiv').height() + window.innerHeight - 400;
    }
    doQuick ? $('.imgDiv').css({ left: prevScrollLeft, top: prevScrollTop }) : $('.imgDiv').animate({ left: prevScrollLeft, top: prevScrollTop });
}

// Decreases selected number values on change
var fixNums = function(num) {
    num = parseInt(num);
    let isBroken = false;
    let nums = {};
    let innerLooped = false;
    $('.label').each(function(index) {
        if (parseInt($(this).text()) !== num) {
            if (parseInt($(this).text()) <= 0 || nums.hasOwnProperty(parseInt($(this).text()))) {
                isBroken = true;
            }
            nums[parseInt($(this).text())] = true;
        } else {
            innerLooped = true;
        }
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
            $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
            $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
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
    $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
    $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
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
            id = infoLockedId.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q');
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
            $('#infoclues').show();
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
            $('#infoclues').hide();
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
        let clueStr = '';
        if (!!chunkInfo['chunks'][id]) {
            !!chunkInfo['chunks'][id]['Monster'] && Object.keys(chunkInfo['chunks'][id]['Monster']).forEach(name => {
                monsterStr += (chunkInfo['chunks'][id]['Monster'][name] === 1 ? '' : chunkInfo['chunks'][id]['Monster'][name] + ' ') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name + '</a>, ';
            });
            monsterStr.length > 0 && (monsterStr = monsterStr.substring(0, monsterStr.length - 2));
            !!chunkInfo['chunks'][id]['NPC'] && Object.keys(chunkInfo['chunks'][id]['NPC']).forEach(name => {
                npcStr += (chunkInfo['chunks'][id]['NPC'][name] === 1 ? '' : chunkInfo['chunks'][id]['NPC'][name] + ' ') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name + '</a>, ';
            });
            npcStr.length > 0 && (npcStr = npcStr.substring(0, npcStr.length - 2));
            !!chunkInfo['chunks'][id]['Spawn'] && Object.keys(chunkInfo['chunks'][id]['Spawn']).forEach(name => {
                spawnStr += (chunkInfo['chunks'][id]['Spawn'][name] === 1 ? '' : chunkInfo['chunks'][id]['Spawn'][name] + ' ') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name + '</a>, ';
            });
            spawnStr.length > 0 && (spawnStr = spawnStr.substring(0, spawnStr.length - 2));
            !!chunkInfo['chunks'][id]['Shop'] && Object.keys(chunkInfo['chunks'][id]['Shop']).forEach(name => {
                shopStr += `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name + '</a>, ';
            });
            shopStr.length > 0 && (shopStr = shopStr.substring(0, shopStr.length - 2));
            !!chunkInfo['chunks'][id]['Object'] && Object.keys(chunkInfo['chunks'][id]['Object']).forEach(name => {
                objectStr += (chunkInfo['chunks'][id]['Object'][name] === 1 ? '' : chunkInfo['chunks'][id]['Object'][name] + ' ') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name + '</a>, ';
            });
            objectStr.length > 0 && (objectStr = objectStr.substring(0, objectStr.length - 2));
            !!chunkInfo['chunks'][id]['Quest'] && Object.keys(chunkInfo['chunks'][id]['Quest']).forEach(name => {
                questStr += `<a class='${(chunkInfo['chunks'][id]['Quest'][name] === 'first' ? 'bold link' : 'link')}' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name + `</a> <span onclick="getQuestInfo('` + name.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\'/g, '%2H') + `')"><i class="quest-icon fas fa-info-circle"></i></span>, `;
            });
            questStr.length > 0 && (questStr = questStr.substring(0, questStr.length - 2));
            !!chunkInfo['chunks'][id]['Diary'] && Object.keys(chunkInfo['chunks'][id]['Diary']).forEach(name => {
                diaryStr += `<a class='bold link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name + ' Diary').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name + ' Diary</a>' + ': ' + chunkInfo['chunks'][id]['Diary'][name];
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
                    connectStr += `<span class='link' onclick=redirectPanel('${encodeURI(passedName.replaceAll(/\'/g, '%2H'))}')>${realName.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')}</span>` + ', ';
                }
            });
            connectStr.length > 0 && (connectStr = connectStr.substring(0, connectStr.length - 2));
            connectStr = connectStr.split(', ').sort((a, b) => {
                return $(a).text() > $(b).text() ? 1 : -1;
            });
            connectStr = connectStr.join(', ');
            !!chunkInfo['chunks'][id]['Clue'] && clueTiers.forEach(tier => {
                if (chunkInfo['chunks'][id]['Clue'].hasOwnProperty(tier.toLowerCase())) {
                    clueStr += chunkInfo['chunks'][id]['Clue'][tier.toLowerCase()] + ' ' + tier + ', ';
                }
            });
            clueStr.length > 0 && (clueStr = clueStr.substring(0, clueStr.length - 2));
        }
        $('.infoid-content').html((!!chunkInfo['chunks'][id] && !!chunkInfo['chunks'][id]['Nickname']) ? (chunkInfo['chunks'][id]['Nickname'] + ' (' + id + ')') : id.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'));
        $('.panel-monsters').html(monsterStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') || 'None');
        $('.panel-npcs').html(npcStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') || 'None');
        $('.panel-spawns').html(spawnStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') || 'None');
        $('.panel-shops').html(shopStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') || 'None');
        $('.panel-features').html(objectStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') || 'None');
        $('.panel-quests').html(questStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') || 'None');
        $('.panel-clues').html(clueStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') || 'None');
        $('.panel-connections').html(connectStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') || 'None');
        $('.panel-challenges').html('Calculating...');
        calcFutureChallenges();
    }
}

// Checks if skill has primary training
var checkPrimaryMethod = function(skill, valids, baseChunkData, wantMethods) {
    let valid = false;
    let methods = {};
    let hardValid = false;
    if (!!manualTasks[skill] && Object.keys(manualTasks[skill]).length > 0) {
        hardValid = true;
        methods['Manually added skill'] = 1;
    } else if (!!completedChallenges[skill] && Object.keys(completedChallenges[skill]).length > 0) {
        hardValid = true;
    }
    let tempValid = false;
    !!universalPrimary[skill] && universalPrimary[skill].forEach(line => {
        let tempTempValid = true;
        if (line === 'Primary+') {
            let primaryValid = false;
            !!valids[skill] && Object.keys(valids[skill]).forEach(challenge => {
                if (((chunkInfo['challenges'][skill][challenge]['Primary'] && (!chunkInfo['challenges'][skill][challenge]['Secondary'] || rules['Secondary Primary'])) && (chunkInfo['challenges'][skill][challenge]['Level'] === 1 || wantMethods) && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) || chunkInfo['challenges'][skill][challenge]['Manual']) {
                    if (skill !== 'Smithing' || rules['Smithing by Smelting'] || baseChunkData['objects'].hasOwnProperty('Anvil')) {
                        primaryValid = true;
                        methods[challenge] = chunkInfo['challenges'][skill][challenge]['Level'];
                    }
                }
            });
            !primaryValid && (tempTempValid = false);
        } else if (line === 'Monster+') {
            let monsterExists = !!baseChunkData['monsters'] && Object.keys(baseChunkData['monsters']).length > 0;
            if (!monsterExists) {
                tempTempValid = false;
            } else {
                methods['Attack monsters'] = 1;
            }
        } else if (line === 'Bones+') {
            let bonesExists = false;
            !!baseChunkData['items'] && boneItems.forEach(bone => {
                if (!!baseChunkData['items'] && Object.keys(baseChunkData['items']).includes(bone)) {
                    bonesExists = true;
                }
            });
            if (!bonesExists) {
                tempTempValid = false;
            } else {
                methods['Bury bones'] = 1;
            }
        } else if (line === 'Combat+') {
            let combatExists = false;
            combatSkills.forEach(skill2 => {
                if (checkPrimaryMethod(skill2, valids, baseChunkData)) {
                    combatExists = true;
                }
            });
            if (!combatExists) {
                tempTempValid = false;
            } else {
                methods['Train combat'] = 1;
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
                if (innerValid) {
                    let tempIt = '';
                    set.forEach(it => {
                        if (tempIt !== '') {
                            tempIt += ' + ';
                        }
                        tempIt += it;
                    });
                    methods[tempIt] = 1;
                }
            });
            let monsterExists = !!baseChunkData['monsters'] && Object.keys(baseChunkData['monsters']).length > 0;
            if (!validRanged || !monsterExists) {
                tempTempValid = false;
                methods = {};
            }
        } else {
            tempTempValid = false;
        }
        if (tempTempValid) {
            tempValid = true;
        }
    });
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
            chunks[parseInt($($(this).children('.chunkId')[0]).text())] = true;
        });
        myWorker.postMessage(['current', chunks, rules, chunkInfo, skillNames, processingSkill, maybePrimary, combatSkills, monstersPlus, objectsPlus, chunksPlus, itemsPlus, mixPlus, npcsPlus, tasksPlus, tools, elementalRunes, manualTasks, completedChallenges, backlog, "1/" + rules['Rare Drop Amount'], universalPrimary, elementalStaves, rangedItems, boneItems, highestCurrent, dropTables, possibleAreas, randomLoot, magicTools, bossLogs, bossMonsters, minigameShops, manualEquipment, checkedChallenges, backloggedSources, altChallenges, manualMonsters, slayerLocked, passiveSkill]);
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
            if (!!tempChallengeArr[skill] && !!altChallenges[skill] && altChallenges[skill].hasOwnProperty(chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level'])) {
                !!altChallenges[skill][chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level']] && challengeArr.push(`<div class="challenge skill-challenge noscroll ${skill + '-challenge'} ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][altChallenges[skill][chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level']]]) && 'hide-backlog'} ${!activeSubTabs['skill'] ? 'stay-hidden' : ''}"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][altChallenges[skill][chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level']]]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenges()" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[` + chunkInfo['challenges'][skill][altChallenges[skill][chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level']]]['Level'] + '] <span class="inner noscroll">' + skill + '</b>: ' + altChallenges[skill][chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level']].split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((altChallenges[skill][chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level']].split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + altChallenges[skill][chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level']].split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + altChallenges[skill][chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level']].split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `</span></span></label>` + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + altChallenges[skill][chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level']] + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + `</div>`);
            } else {
                !!tempChallengeArr[skill] && challengeArr.push(`<div class="challenge skill-challenge noscroll ${skill + '-challenge'} ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][tempChallengeArr[skill]]) && 'hide-backlog'} ${!activeSubTabs['skill'] ? 'stay-hidden' : ''}"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][tempChallengeArr[skill]]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenges()" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[` + chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level'] + '] <span class="inner noscroll">' + skill + '</b>: ' + tempChallengeArr[skill].split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((tempChallengeArr[skill].split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + tempChallengeArr[skill].split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + tempChallengeArr[skill].split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `</span></span></label>` + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + tempChallengeArr[skill] + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + `</div>`);
            }
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
        challenge = challenge.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I');
        if ((!backlog['BiS'] || !backlog['BiS'].hasOwnProperty(challenge)) && (!completedChallenges['BiS'] || !completedChallenges['BiS'][challenge.replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) && Object.values(highestOverall).map(function(y) { return y.toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') }).includes(challenge.split('|')[1].toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))) {
            challengeArr.push(`<div class="challenge bis-challenge noscroll ${'BiS-' + challenge.replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'} ${(!!checkedChallenges['BiS'] && !!checkedChallenges['BiS'][challenge.replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) && 'hide-backlog'} ${!activeSubTabs['bis'] ? 'stay-hidden' : ''}"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['BiS'] && !!checkedChallenges['BiS'][challenge.replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenges()" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[` + chunkInfo['challenges']['BiS'][challenge.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',')]['Label'] + ']</b> <span class="inner noscroll">' + challenge.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((challenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `</span></span></label>` + (!testMode && (viewOnly || inEntry || locked) ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'BiS' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
        }
    });
    !!globalValids['Quest'] && Object.keys(globalValids['Quest']).length > 0 && rules['Show Quest Tasks'] && challengeArr.push(`<div class="marker marker-quest noscroll" onclick="expandActive('quest')"><i class="expand-button fas ${activeSubTabs['quest'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">Quest Tasks</span></div>`);
    !!globalValids['Quest'] && rules['Show Quest Tasks'] && Object.keys(globalValids['Quest']).sort(function(a, b) { return a.replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll('A_', '').replaceAll('The_', '').localeCompare(b.replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll('A_', '').replaceAll('The_', '')) }).forEach(challenge => {
        if ((!backlog['Quest'] || !backlog['Quest'].hasOwnProperty(challenge)) && (!completedChallenges['Quest'] || !completedChallenges['Quest'][challenge]) && globalValids['Quest'][challenge]) {
            challenge = challenge.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I');
            if (chunkInfo['challenges']['Quest'][challenge].hasOwnProperty('QuestPoints')) {
                challengeArr.push(`<div class="challenge quest-challenge noscroll ${'Quest-' + challenge.replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'} ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) && 'hide-backlog'} ${!activeSubTabs['quest'] ? 'stay-hidden' : ''}"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenges()" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[Quest] <span class="inner noscroll"><a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a></b>: ' + challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').substring(1) + `</span></span></label>` + (!testMode && (viewOnly || inEntry || locked) ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'Quest' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            } else if (!rules['Show Quest Tasks Complete']) {
                challengeArr.push(`<div class="challenge quest-challenge noscroll ${'Quest-' + challenge.replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'} ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) && 'hide-backlog'} ${!activeSubTabs['quest'] ? 'stay-hidden' : ''}"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Quest'] && !!checkedChallenges['Quest'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenges()" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[Quest] <span class="inner noscroll"><a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a></b>: ' + `Up to <a href='javascript:openQuestSteps("Quest", "${challenge.replaceAll(/\%/g, '-').replaceAll(/\./g, '-2E').replaceAll(/\,/g, '-2I').replaceAll(/\#/g, '-2F').replaceAll(/\//g, '-2G').replaceAll(/\+/g, '-2J').replaceAll(/\!/g, '-2Q').replaceAll(/\'/g, '-2H')}")' class='internal-link noscroll'>step ` + challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `</a></span></span></label>` + (!testMode && (viewOnly || inEntry || locked) ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'Quest' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            }
        }
    });
    !!globalValids['Diary'] && Object.keys(globalValids['Diary']).length > 0 && rules['Show Diary Tasks'] && challengeArr.push(`<div class="marker marker-diary noscroll" onclick="expandActive('diary')"><i class="expand-button fas ${activeSubTabs['diary'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">Diary Tasks</span></div>`);
    !!globalValids['Diary'] && rules['Show Diary Tasks'] && Object.keys(globalValids['Diary']).forEach(challenge => {
        challenge = challenge.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I');
        if ((!backlog['Diary'] || !backlog['Diary'].hasOwnProperty(challenge)) && (!completedChallenges['Diary'] || !completedChallenges['Diary'][challenge]) && globalValids['Diary'][challenge] && (!rules['Show Diary Tasks Complete'] || chunkInfo['challenges']['Diary'][challenge].hasOwnProperty('ManualShow'))) {
            challengeArr.push(`<div class="challenge diary-challenge noscroll ${'Diary-' + challenge.replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'} ${(!!checkedChallenges['Diary'] && !!checkedChallenges['Diary'][challenge]) && 'hide-backlog'} ${!activeSubTabs['diary'] ? 'stay-hidden' : ''}"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Diary'] && !!checkedChallenges['Diary'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenges()" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[Diary] <span class="inner noscroll"><a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a></b>: ' + `<a href='javascript:openQuestSteps("Diary", "${challenge.replaceAll(/\%/g, '-').replaceAll(/\./g, '-2E').replaceAll(/\,/g, '-2I').replaceAll(/\#/g, '-2F').replaceAll(/\//g, '-2G').replaceAll(/\+/g, '-2J').replaceAll(/\!/g, '-2Q').replaceAll(/\'/g, '-2H')}")' class='internal-link noscroll'>` + challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `</a></span></span></label>` + (!testMode && (viewOnly || inEntry || locked) ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'Diary' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
        }
    });
    !!globalValids['Extra'] && Object.keys(globalValids['Extra']).length > 0 && challengeArr.push(`<div class="marker marker-extra noscroll" onclick="expandActive('extra')"><i class="expand-button fas ${activeSubTabs['extra'] ? 'fa-caret-down' : 'fa-caret-right'} noscroll"></i><span class="noscroll">Other Tasks</span></div>`);
     !!globalValids['Extra'] && Object.keys(globalValids['Extra']).sort(function(a, b) { return (/\d/.test(a) && /\d/.test(b) && a.split('(')[0].localeCompare(b.split('(')[0]) === 0) ? a.match(/\d+/)[0] - b.match(/\d+/)[0] : a.split('(')[0].localeCompare(b.split('(')[0]) }).forEach(challenge => {
        challenge = challenge.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I');
        if ((!backlog['Extra'] || !backlog['Extra'].hasOwnProperty(challenge)) && (!completedChallenges['Extra'] || !completedChallenges['Extra'][challenge])) {
            if (!!chunkInfo['challenges']['Extra'][challenge] && chunkInfo['challenges']['Extra'][challenge]['Label'] === 'Kill X') {
                challengeArr.push(`<div class="challenge extra-challenge noscroll ${'Extra-' + challenge.replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'} ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) && 'hide-backlog'} ${!activeSubTabs['extra'] ? 'stay-hidden' : ''}"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenges()" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">[${chunkInfo['challenges']['Extra'][challenge]['Label']}]</b> <span class="inner noscroll">${challenge.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(' X ', ' ' + rules['Kill X Amount'] + ' ')}<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `</span></span></label>` + (!testMode && (viewOnly || inEntry || locked) ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'Extra' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            } else {
                challengeArr.push(`<div class="challenge extra-challenge noscroll ${'Extra-' + challenge.replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'} ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) && 'hide-backlog'} ${!activeSubTabs['extra'] ? 'stay-hidden' : ''}"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) ? "checked" : ''} class='noscroll' onclick="checkOffChallenges()" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${(!!chunkInfo['challenges']['Extra'][challenge] ? ('<b class="noscroll">[' + chunkInfo['challenges']['Extra'][challenge]['Label'] + `]</b> `) : '')} <span class="inner noscroll">${challenge.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')}<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `</span></span></label>` + (!testMode && (viewOnly || inEntry || locked) ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + challenge + "`, " + "`" + 'Extra' + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
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
                backlogArr.push(`<div class="challenge noscroll ${'Extra-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="burger noscroll" onclick="openBacklogContextMenu(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'Quest') {
            Object.keys(backlog[skill]).forEach(name => {
                backlogArr.push(`<div class="challenge noscroll ${'Quest-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<b class='noscroll'>[Quest]</b> ` + '<b class="noscroll"><a class="link" href="' + `${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))}` + '" target="_blank">' + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `</a></b>: ${name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') === ' Complete the quest' ? '' : 'Up to step'} ` + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '' + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="burger noscroll" onclick="openBacklogContextMenu(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'Diary') {
            Object.keys(backlog[skill]).forEach(name => {
                backlogArr.push(`<div class="challenge noscroll ${'Diary-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<b class='noscroll'>[Diary]</b> ` + '<b class="noscroll"><a class="link" href="' + `${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))}` + '" target="_blank">' + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a></b>: ' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="burger noscroll" onclick="openBacklogContextMenu(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'BiS') {
            Object.keys(backlog[skill]).forEach(name => {
                backlogArr.push(`<div class="challenge noscroll ${'BiS-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'}"><b class='noscroll'>[${!!chunkInfo['challenges']['BiS'] && !!chunkInfo['challenges']['BiS'][name] ? chunkInfo['challenges']['BiS'][name]['Label'] : 'BiS'}]</b> ` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="burger noscroll" onclick="openBacklogContextMenu(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
            });
        } else {
            !!chunkInfo['challenges'][skill] && Object.keys(backlog[skill]).forEach(name => {
                !!chunkInfo['challenges'][skill][name] && backlogArr.push(`<div class="challenge noscroll ${skill + '-challenge'}"> <b class="noscroll">[` + chunkInfo['challenges'][skill][name]['Level'] + '] ' + skill + '</b>: ' + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="burger noscroll" onclick="openBacklogContextMenu(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
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
                completedArr.push(`<div class="challenge noscroll ${'Extra-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='noscroll link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-undo-alt noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'Quest') {
            Object.keys(completedChallenges[skill]).forEach(name => {
                completedArr.push(`<div class="challenge noscroll ${'Quest-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<b class='noscroll'>[Quest] <a class="noscroll link" href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `</a></b>: ` + (!name.includes('Complete the quest') ? 'Up to step ' : ' ') + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-undo-alt noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'Diary') {
            Object.keys(completedChallenges[skill]).forEach(name => {
                completedArr.push(`<div class="challenge noscroll ${'Diary-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<b class='noscroll'>[Diary]</b> ` + '<b class="noscroll"><a class="noscroll link" href="' + `${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))}` + '" target="_blank">' + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a></b>: ' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-undo-alt noscroll"></i></span>') + '</div>');
            });
        } else if (skill === 'BiS') {
            Object.keys(completedChallenges[skill]).forEach(name => {
                completedArr.push(`<div class="challenge noscroll ${'BiS-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '').replaceAll(/\./g, '').replaceAll(/\:/g, '').replaceAll(/\//g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',') + '-challenge'}"><b class='noscroll'>[BiS]</b> ` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='noscroll link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-undo-alt noscroll"></i></span>') + '</div>');
            });
        } else {
            !!chunkInfo['challenges'][skill] && Object.keys(completedChallenges[skill]).forEach(name => {
                !!chunkInfo['challenges'][skill][name] && completedArr.push(`<div class="challenge noscroll ${skill + '-challenge'}"> <b class="noscroll">[` + chunkInfo['challenges'][skill][name]['Level'] + '] ' + skill + '</b>: ' + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + (!testMode && (viewOnly || inEntry || locked) ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="fas fa-undo-alt noscroll"></i></span>') + '</div>');
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
    let clueStr = '';
    $('.unlocked').each(function() {
        chunks[parseInt($($(this).children('.chunkId')[0]).text())] = true;
    });
    if (chunks[infoLockedId.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
        $('.panel-challenges').html(challengeStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') || 'None (chunk is already unlocked)');
        return;
    }
    chunks[infoLockedId.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
    let i = 0;
    while (i < Object.keys(chunks).length) {
        !!chunkInfo['chunks'][Object.keys(chunks)[i]] && !!chunkInfo['chunks'][Object.keys(chunks)[i]]['Connect'] && Object.keys(chunkInfo['chunks'][Object.keys(chunks)[i]]['Connect']).forEach(id => {
            if (!!chunkInfo['chunks'][parseInt(id)]['Name'] && possibleAreas[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
                chunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
            }
        });
        i++;
    }
    myWorker.postMessage(['future', chunks, rules, chunkInfo, skillNames, processingSkill, maybePrimary, combatSkills, monstersPlus, objectsPlus, chunksPlus, itemsPlus, mixPlus, npcsPlus, tasksPlus, tools, elementalRunes, manualTasks, completedChallenges, backlog, "1/" + rules['Rare Drop Amount'], universalPrimary, elementalStaves, rangedItems, boneItems, highestCurrent, dropTables, possibleAreas, randomLoot, magicTools, bossLogs, bossMonsters, minigameShops, manualEquipment, checkedChallenges, backloggedSources, altChallenges, manualMonsters, slayerLocked, passiveSkill]);
    workerOut++;
}

// Finds the future challenge in each skill given a possible new chunk 2
var calcFutureChallenges2 = function(valids, baseChunkDataLocal) {
    let highestChallenge = {};
    let challengeStr = '';
    let clueData = {
        'beginner': 0,
        'easy': 0,
        'medium': 0,
        'hard': 0,
        'elite': 0,
        'master': 0
    };

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
                if ((!globalValids.hasOwnProperty(skill) || !globalValids[skill].hasOwnProperty(challenge)) && valids[skill][challenge]) {
                    if ((skill === 'Quest' && rules["Show Quest Tasks"] && (chunkInfo['challenges'][skill][challenge].hasOwnProperty('QuestPoints') || !rules["Show Quest Tasks Complete"])) || (skill === 'Diary' && rules["Show Diary Tasks"] && (chunkInfo['challenges'][skill][challenge].hasOwnProperty('ManualShow') || !rules["Show Diary Tasks Complete"])) || (skill === 'BiS' && rules["Show Best in Slot Tasks"]) || (skill === 'Extra')) {
                        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                            let tempValid = true;
                            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkDataLocal)) {
                                    tempValid = false;
                                }
                            });
                            if (tempValid) {
                                challengeStr += `<span class="challenge ${skill + '-challenge'} noscroll">` + challenge.split('~')[0] + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((challenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + challenge.split('~')[1].split('|').join('') + '</a>' + (chunkInfo['challenges'][skill][challenge].hasOwnProperty('QuestPoints') ? ' complete quest' : challenge.split('~')[2]) + ` <span class='noscroll' onclick="showDetails('` + challenge.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\'/g, '%2H') + `', '` + skill + `', 'future')"><i class="challenge-icon fas fa-info-circle noscroll"></i></span>` + '</span>, '
                            }
                        } else {
                            challengeStr += `<span class="challenge ${skill + '-challenge'} noscroll">` + challenge.split('~')[0] + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((challenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + challenge.split('~')[1].split('|').join('') + '</a>' + (chunkInfo['challenges'][skill][challenge].hasOwnProperty('QuestPoints') ? ' complete quest' : challenge.split('~')[2]) + ` <span class='noscroll' onclick="showDetails('` + challenge.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\'/g, '%2H') + `', '` + skill + `', 'future')"><i class="challenge-icon fas fa-info-circle noscroll"></i></span>` + '</span>, '
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
                                if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('ClueTier') && !globalValids[skill].hasOwnProperty(challenge) && valids[skill][challenge]) {
                                    clueData[chunkInfo['challenges'][skill][challenge]['ClueTier']]++;
                                }
                            }
                        } else {
                            highestChallenge[skill] = challenge;
                            if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('ClueTier') && !globalValids[skill].hasOwnProperty(challenge) && valids[skill][challenge]) {
                                clueData[chunkInfo['challenges'][skill][challenge]['ClueTier']]++;
                            }
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
                challengeStr += `<span class="challenge ${skill + '-challenge'} noscroll">` + highestChallenge[skill].split('~')[0] + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((highestChallenge[skill].split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + highestChallenge[skill].split('~')[1].split('|').join('') + '</a>' + highestChallenge[skill].split('~')[2] + ` <span class='noscroll' onclick="showDetails('` + highestChallenge[skill].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\'/g, '%2H') + `', '` + skill + `', 'future')"><i class="challenge-icon fas fa-info-circle noscroll"></i></span>` + '</span>, ';
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
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).sort(function(a, b) { return chunkInfo['challenges'][skill][a]['Level'] - chunkInfo['challenges'][skill][b]['Level'] }).forEach(name => {
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
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).sort(function(a, b) { return chunkInfo['challenges'][skill][a]['Level'] - chunkInfo['challenges'][skill][b]['Level'] }).forEach(name => {
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
        $(panelClass).css({ 'min-height': $(panelClass).height() - 5 + 'px', 'font-size': 'max(min(10.4vw, 18px), ' + $(panelClass).height() / 5 + 'px)' }).addClass('calculating').html('<i class="fas fa-spinner fa-spin"></i>');
        $(panelClass + ' > i').css('line-height', $(panelClass).height() + 'px');
    }
}

// Opens the add random event loot modal
var openRandomAdd = function() {
    manualOuterModalOpen = false;
    $('#myModal20').hide();
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
        !onMobile && calcCurrentChallenges();
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
                !onMobile && calcCurrentChallenges();
                setData();
            }
            $('#myModal6').hide();
            randomModalOpen = false;
        }
    }
}

// Shuffles the inputted array
var shuffle = function(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Opens the roll chunk modal
var openRollChunk = function(el, rand, sNum) {
    rollChunkModalOpen = true;
    $('.roll-chunk-title').text('Rolling your next chunk...');
    $('.roll-chunk-subtitle').text('');
    $('.roll-chunk-outer').empty().css('top', '0');
    $('#submit-roll-chunk-button').hide();
    pickedNum = rand;
    let numSlots = 500;
    let elArr = [...el];
    let topNum;
    let xCoord;
    let yCoord;
    let chosen = $($(el[rand]).children('.chunkId')[0]).text();
    elArr = shuffle(elArr);
    xCoord = (parseInt($(elArr[elArr.length - 1]).attr('id')) % rowSize) + 1;
    yCoord = Math.floor(parseInt($(elArr[elArr.length - 1]).attr('id')) / rowSize) + 1;
    $('.roll-chunk-outer').append(`<div class='noscroll roll-chunk-inner roll-chunk-${$($(elArr[elArr.length - 1]).children('.chunkId')[0]).text()}'><span class='noscroll roll-chunk-num'><img class='noscroll' src='${'./resources/chunk_images/row-' + yCoord + '-column-' + xCoord + '.png'}'/></span></div>`);
    for (let i = 0; i < Math.ceil(numSlots / elArr.length); i++) {
        for (let j = 0; j < elArr.length; j++) {
            let num = $($(elArr[j]).children('.chunkId')[0]).text();
            xCoord = (parseInt($(elArr[j]).attr('id')) % rowSize) + 1;
            yCoord = Math.floor(parseInt($(elArr[j]).attr('id')) / rowSize) + 1;
            $('.roll-chunk-outer').append(`<div class='noscroll roll-chunk-inner roll-chunk-${num}'><span class='noscroll roll-chunk-num'><img class='noscroll' src='${'./resources/chunk_images/row-' + yCoord + '-column-' + xCoord + '.png'}'/></span></div>`);
            if (num === chosen && i + 1 >= Math.ceil(numSlots / elArr.length)) {
                topNum = (-15.998 * ((i * elArr.length) + j)) + 'vh';
            }
        };
    };
    xCoord = (parseInt($(elArr[0]).attr('id')) % rowSize) + 1;
    yCoord = Math.floor(parseInt($(elArr[0]).attr('id')) / rowSize) + 1;
    let randomDuration = (3 + Math.floor(Math.random() * 6)) * 1000;
    $('.roll-chunk-outer').append(`<div class='noscroll roll-chunk-inner roll-chunk-${$($(elArr[0]).children('.chunkId')[0]).text()}'><span class='noscroll roll-chunk-num'><img class='noscroll' src='${'./resources/chunk_images/row-' + yCoord + '-column-' + xCoord + '.png'}'/></span></div>`);
    setTimeout(function() {
        $('.roll-chunk-outer').animate({
            top: topNum
        }, {
            duration: randomDuration,
            easing: "easeOutCubic",
            complete: function() {
                $('.roll-chunk-title').text((chunkInfo['chunks'].hasOwnProperty(chosen) && chunkInfo['chunks'][chosen].hasOwnProperty('Nickname') ? chunkInfo['chunks'][chosen]['Nickname'] : 'Unknown') + '(' + chosen + ')');
                !!sNum && !isNaN(sNum) && $('.roll-chunk-subtitle').text('[Rolled number: ' + sNum + ']');
                $('#submit-roll-chunk-button').show();
            }
        });
    }, 1000);
    setData();
    $('#myModal23').show();
}

// Delayed pick chunk after cinematic
var takeMeToChunk = function() {
    rollChunkModalOpen = false;
    scrollToPos(parseInt($('.box.recent').attr('id')) % rowSize, Math.floor(parseInt($('.box.recent').attr('id')) / rowSize), 0, 0, false);
    $('.recent').removeClass('recent');
    !onMobile && calcCurrentChallenges();
    $('.roll-chunk-title').text('Rolling your next chunk...');
    $('.roll-chunk-subtitle').text('');
    $('.roll-chunk-outer').empty().css('top', '0');
    $('#submit-roll-chunk-button').hide();
    $('#myModal23').hide();
}

// Opens the quest steps modal
var openQuestSteps = function(skill, challenge) {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !onMobile && !helpMenuOpen) {
        challenge = challenge.replaceAll('-', '%').replaceAll('/', '%2G').replaceAll('%2Q', '!').replaceAll('%2H', "'");
        questStepsModalOpen = true;
        let quest = skill === 'Diary' ? challenge.split('~')[1].split('|').join('').split('%2F')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll('_', ' ').replaceAll(/\-2H/g, "'").replaceAll(/\%2H/g, "'").replaceAll(/\-2Z/g, '&').replaceAll(/\-2P/g, '(').replaceAll(/\-2Q/g, ')') : challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll('_', ' ').replaceAll(/\-2H/g, "'").replaceAll(/\%2H/g, "'").replaceAll(/\-2Z/g, '&').replaceAll(/\-2P/g, '(').replaceAll(/\-2Q/g, ')');
        $('.quest-steps-title').html(`<a class='noscroll link' href="${"https://oldschool.runescape.wiki/w/" + encodeURI(quest)}" target='_blank'>${quest}</a>`);
        $('.quest-steps-data').empty();
        $('.quest-steps-data').append(`<div class='noscroll step step-header'><span class='noscroll step-table-header'>Step</span><span class='noscroll description-table-header'>Description</span></div>`);
        Object.keys(chunkInfo['challenges'][skill]).filter(line => chunkInfo['challenges'][skill][line]['BaseQuest'] === quest.replaceAll('/', '%2G') && chunkInfo['challenges'][skill][line].hasOwnProperty('Description')).forEach(line => {
            $('.quest-steps-data').append(`<div class='noscroll step${line === challenge.replaceAll(/\-2H/g, "'").replaceAll(/\%2H/g, "'") ? ' highlighted' : ''}'><span class='noscroll step-step'>${skill === 'Diary'? line.split('|~')[1].replaceAll('Task ', diaryTierAbr[line.split('~')[1].split('|').join('').split('%2F')[1]]) : line.split('|~')[1]}</span><span class='noscroll step-description'>${chunkInfo['challenges'][skill][line]['Description']}</span></div>`);
        });
        $('#myModal25').show();
        $('.quest-steps-data .highlighted')[0].scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }
}

// Opens the friends list modal
var openFriendsList = function() {
    friendsListModalOpen = true;
    $('.friends-list-data').empty();
    $('.friends-list-data').append(`<div class='addEntry noscroll' onclick='openFriendsListAdd()'>Add Map Entry</div>`);
    Object.keys(friends).forEach(friendMid => {
        $('.friends-list-data').append(`<div class='noscroll friend-item'><a class='noscroll link' href='https://source-chunk.github.io/chunk-picker-v2/?${friendMid.toLowerCase()}' target='_blank'>${friends[friendMid]} (${friendMid})</a><i class="friend-item-x fas fa-times noscrollhard" onclick="removeFriend('${friendMid}')"></i></div>`);
    });
    $('#myModal26').show();
    document.getElementById('friends-list-data').scrollTop = 0;
    settingsOpen && settingsMenu();
}

// Opens the friends add modal
var openFriendsListAdd = function() {
    friendsAddModalOpen = true;
    $('#submit-friend-button').prop('disabled', true);
    $('.mid-friend').val('');
    $('.name-friend').val('');
    $('#myModal27').show();
    $('.mid-friend').focus();
}

var removeFriend = function(friendMid) {
    if (friends.hasOwnProperty(friendMid)) {
        delete friends[friendMid];
    }
    setData();
    openFriendsList();
}

// Opens the add locked slayer task modal
var openSlayerLocked = function() {
    slayerLockedModalOpen = true;
    $('#slayer-locked-input').val('');
    $('#slayer-locked-data').html('<div><div class="slayer-locked-cancel" onclick="addSlayerLocked(true)">Cancel</div><div class="slayer-locked-proceed disabled" onclick="addSlayerLocked()">Lock Slayer</div></div>');
    $('#slayer-locked-dropdown').empty().append(`<option value='${'Select a task'}'>${'Select a task'}</option>`);
    $('#slayer-locked-dropdown').append(`<option value="${'Manually Locked'}">${"Manually Locked"}</option>`);
    Object.keys(slayerTasks).forEach(task => {
        $('#slayer-locked-dropdown').append(`<option value="${task}">${task}</option>`);
    });
    $('#myModal22').show();
}

// Triggers onchange of slayer locked selection to validate submit button
var slayerLockedChange = function() {
    let val = $('#slayer-locked-dropdown').val();
    let val2 = $('#slayer-locked-input').val();
    if (val !== 'Select a task') {
        if (!!val2 && parseInt(val2) !== NaN && parseInt(val2) >= 0 && parseInt(val2) <= 99 && parseInt(val2) % 1 === 0) {
            $('.slayer-locked-proceed').removeClass('disabled');
        } else {
            $('.slayer-locked-proceed').addClass('disabled');
        }
    } else {
        $('.slayer-locked-proceed').addClass('disabled');
    }
}

// Submits picked slayer task/level if one is chosen, then closes modal either way
var addSlayerLocked = function(close) {
    if (close) {
        $('#myModal22').hide();
        slayerLockedModalOpen = false;
    } else {
        let task = $('#slayer-locked-dropdown').val();
        let level = !!$('#slayer-locked-input').val() ? parseInt($('#slayer-locked-input').val()) : NaN;
        if (task !== 'Select a task' && level !== NaN && level >= 0 && level <= 99 && level % 1 === 0) {
            if (task !== '') {
                slayerLocked = {};
                slayerLocked['monster'] = task;
                slayerLocked['level'] = level;
                !onMobile && setCalculating('.panel-active');
                !onMobile && calcCurrentChallenges();
                setData();
            }
            $('#myModal22').hide();
            slayerLockedModalOpen = false;
        }
    }
}

// Opens the outer manual modal
var openManualAddOuter = function() {
    manualOuterModalOpen = true;
    $('#myModal20').show();
}

// Opens the manual add monsters modal
var openMonstersAdd = function() {
    manualOuterModalOpen = false;
    $('#myModal20').hide();
    monsterModalOpen = true;
    $('#myModal21').show();
    $('#searchMonsters').val('').focus();
    searchMonsters();
}

// Searches for matching names within monsters
var searchMonsters = function() {
    let searchTemp = $('#searchMonsters').val().toLowerCase();
    $('.monsters-data').empty();
    baseChunkDataTotal = {
        'Items': {},
        'Monsters': {},
        'NPCs': {},
        'Objects': {}
    };
    Object.keys(chunkInfo['challenges']).forEach(skill => {
        Object.keys(chunkInfo['challenges'][skill]).forEach(challenge => {
            Object.keys(baseChunkDataTotal).forEach(section => {
                chunkInfo['challenges'][skill][challenge].hasOwnProperty(section) && chunkInfo['challenges'][skill][challenge][section].forEach(el => {
                    if (!chunkInfo['codeItems'][section.toLowerCase() + 'Plus'].hasOwnProperty(el)) {
                        baseChunkDataTotal[section][el.replaceAll('*', '')] = true;
                    } else {
                        chunkInfo['codeItems'][section.toLowerCase() + 'Plus'][el].forEach(plus => {
                            baseChunkDataTotal[section][plus.replaceAll('*', '')] = true;
                        });
                    }
                });
            });
        });
    });
    let monstersList = {...chunkInfo['drops'], ...chunkInfo['skillItems']['Slayer']};
    Object.keys(monstersList).forEach(monster => {
        baseChunkDataTotal['Monsters'][monster] = true;
    });
    if (Object.keys(baseChunkDataTotal).length > 0 && Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length <= 200 || filterByCheckedMonsters) {
        Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Items'] && !!manualMonsters['Items'][item]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Items</b></div>`);
        Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Items'] && !!manualMonsters['Items'][item]))).length > 0 && Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Items'] && !!manualMonsters['Items'][item]))).sort().forEach(item => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['Items'] && !!manualMonsters['Items'][item] && "checked"} type="checkbox" onclick="checkOffMonster('` + item.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '-2P').replaceAll(/\)/g, '-2Q') + `', 'Items')" /><a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replace(/[!'()*]/g, escape))}' target='_blank'>${item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
        Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Monsters</b></div>`);
        Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster]))).length > 0 && Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster]))).sort().forEach(monster => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['Monsters'] && !!manualMonsters['Monsters'][monster] && "checked"} type="checkbox" onclick="checkOffMonster('` + monster.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '-2P').replaceAll(/\)/g, '-2Q') + `', 'Monsters')" /><a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replace(/[!'()*]/g, escape))}' target='_blank'>${monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
        Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Npcs</b></div>`);
        Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc]))).length > 0 && Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc]))).sort().forEach(npc => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['NPCs'] && !!manualMonsters['NPCs'][npc] && "checked"} type="checkbox" onclick="checkOffMonster('` + npc.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '-2P').replaceAll(/\)/g, '-2Q') + `', 'NPCs')" /><a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replace(/[!'()*]/g, escape))}' target='_blank'>${npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
        Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Objects'] && !!manualMonsters['Objects'][object]))).length > 0 && $('.monsters-data').append(`<div class="search-header noscroll"><b class="noscroll">Objects</b></div>`);
        Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Objects'] && !!manualMonsters['Objects'][object]))).length > 0 && Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedMonsters || (!!manualMonsters['Objects'] && !!manualMonsters['Objects'][object]))).sort().forEach(object => {
            $('.monsters-data').append(`<div class="search-monsters-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualMonsters && !!manualMonsters['Objects'] && !!manualMonsters['Objects'][object] && "checked"} type="checkbox" onclick="checkOffMonster('` + object.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '-2P').replaceAll(/\)/g, '-2Q') + `', 'Objects')" /><a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replace(/[!'()*]/g, escape))}' target='_blank'>${object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
    } else if (Object.keys(baseChunkDataTotal).length > 0) {
        $('.monsters-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(baseChunkDataTotal['Items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['Monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['NPCs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkDataTotal['Objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
    }
    if ($('.monsters-data').children().length === 0) {
        $('.monsters-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Toggle filtering of monsters by checked-only
var changeMonstersFilterBy = function() {
    filterByCheckedMonsters = !filterByCheckedMonsters;
    searchMonsters();
}

// Checks off the given monster
var checkOffMonster = function(monster, type) {
    monster = monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll('_', ' ').replaceAll(/\-2H/g, "'").replaceAll(/\-2Z/g, '&').replaceAll(/\-2P/g, '(').replaceAll(/\-2Q/g, ')');
    if (!manualMonsters[type]) {
        manualMonsters[type] = {};
    }
    if (!manualMonsters[type][monster.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
        manualMonsters[type][monster.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
    } else {
        delete manualMonsters[type][monster.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')];
        if (!manualMonsters[type]) {
            delete manualMonsters[type];
        }
    }
    setData();
    !onMobile && setCalculating('.panel-active');
    !onMobile && calcCurrentChallenges();
}

// Opens the manual add tasks modal
var openManualAdd = function() {
    manualOuterModalOpen = false;
    $('#myModal20').hide();
    fullChallengeArr = {};
    Object.keys(chunkInfo['challenges']).forEach(skill => {
        if (skill !== 'Nonskill' && skill !== 'BiS') {
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
                $('.challenge-data').append(`<div class="noscroll result-item"><input class="noscroll" ${!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge] && "checked"} type="checkbox" onclick="addManualTask('` + challenge.replaceAll(/\'/g, '-2H') + `')" />` + challenge.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '') + `<span onclick="showDetails('` + challenge.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '') + `', '`+ fullChallengeArr[challenge][0] + `', '')"><i class="info-icon fas fa-info-circle"></i></span></div>`);
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
                $('.challenge-data').append(`<div class="noscroll result-item"><input class="noscroll" ${!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge] && "checked"} type="checkbox" onclick="addManualTask('` + challenge.replaceAll(/\'/g, '-2H') + `')" />` + challenge.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '') + `<span onclick="showDetails('` + challenge.replaceAll(/\'/g, '-2H') + `', '`+ fullChallengeArr[challenge][0] + `', '')"><i class="info-icon fas fa-info-circle"></i></span></div>`);
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
        if (skill !== 'BiS' && (!manualTasks[skill] || !manualTasks[skill][challenge])) {
            if (!manualTasks[skill]) {
                manualTasks[skill] = {};
            }
            manualTasks[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'] || true;
            chunkInfo['challenges'][skill][challenge]['Manual'] = true;
        } else if (skill !== 'BiS') {
            delete manualTasks[skill][challenge];
            delete chunkInfo['challenges'][skill][challenge]['Manual'];
            delete chunkInfo['challenges'][skill][challenge]['ManualValid'];
            if (Object.keys(manualTasks[skill]).length === 0) {
                delete manualTasks[skill];
            }
        }
    });
    !onMobile && setCalculating('.panel-active');
    !onMobile && calcCurrentChallenges();
}

// Opens the manual complete tasks modal
var openManualComplete = function() {
    completeModalOpen = true;
    $('#myModal14').show();
}

// Opens the search within my chunks modal
var openSearch = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !onMobile && !helpMenuOpen) {
        searchModalOpen = true;
        $('#myModal10').show();
        $('#searchChunks').val('').focus();
        searchWithinChunks();
    }
}

// Searches for matching names within chunk data
var searchWithinChunks = function() {
    let searchTemp = $('#searchChunks').val().toLowerCase();
    $('.searchchunks-data').empty();
    if (searchTemp.startsWith('~')) {
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Items') && Object.keys(baseChunkData['items']).filter(item => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Items'].hasOwnProperty(item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['items']).filter(item => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Items'].hasOwnProperty(item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Items</b></div>`);
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Items') && Object.keys(baseChunkData['items']).filter(item => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Items'].hasOwnProperty(item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['items']).filter(item => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Items'].hasOwnProperty(item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))).sort().forEach(item => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("items", "${item.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Monsters') && Object.keys(baseChunkData['monsters']).filter(monster => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Monsters'].hasOwnProperty(monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['monsters']).filter(monster => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Monsters'].hasOwnProperty(monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Monsters</b></div>`);
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Monsters') && Object.keys(baseChunkData['monsters']).filter(monster => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Monsters'].hasOwnProperty(monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['monsters']).filter(monster => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Monsters'].hasOwnProperty(monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))).sort().forEach(monster => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("monsters", "${monster.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|NPCs') && Object.keys(baseChunkData['npcs']).filter(npc => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|NPCs'].hasOwnProperty(npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['npcs']).filter(npc => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|NPCs'].hasOwnProperty(npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">NPCs</b></div>`);
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|NPCs') && Object.keys(baseChunkData['npcs']).filter(npc => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|NPCs'].hasOwnProperty(npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['npcs']).filter(npc => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|NPCs'].hasOwnProperty(npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))).sort().forEach(npc => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("npcs", "${npc.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Objects') && Object.keys(baseChunkData['objects']).filter(object => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Objects'].hasOwnProperty(object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['objects']).filter(object => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Objects'].hasOwnProperty(object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Objects</b></div>`);
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Objects') && Object.keys(baseChunkData['objects']).filter(object => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Objects'].hasOwnProperty(object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['objects']).filter(object => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Objects'].hasOwnProperty(object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))).sort().forEach(object => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("objects", "${object.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Shops') && Object.keys(baseChunkData['shops']).filter(shop => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Shops'].hasOwnProperty(shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['shops']).filter(shop => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Shops'].hasOwnProperty(shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Shops</b></div>`);
        chunkInfo['searchTerms'].hasOwnProperty(searchTemp.substring(1).toLowerCase() + '|Shops') && Object.keys(baseChunkData['shops']).filter(shop => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Shops'].hasOwnProperty(shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))) && Object.keys(baseChunkData['shops']).filter(shop => chunkInfo['searchTerms'][searchTemp.substring(1).toLowerCase() + '|Shops'].hasOwnProperty(shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, ''))).sort().forEach(shop => {
            $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("shops", "${shop.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
        });
    } else {
        if (Object.keys(baseChunkData).length > 0 && Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && !item.includes('^')).length + Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['shops']).filter(shop => shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length <= 200) {
            Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && !item.includes('^')).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Items</b></div>`);
            Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && !item.includes('^')).length > 0 && Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && !item.includes('^')).sort().forEach(item => {
                $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("items", "${item.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
            });
            Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Monsters</b></div>`);
            Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach(monster => {
                $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("monsters", "${monster.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</span></div>`);
            });
            Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Npcs</b></div>`);
            Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach(npc => {
                $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("npcs", "${npc.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</span></div>`);
            });
            Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Objects</b></div>`);
            Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach(object => {
                $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("objects", "${object.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</span></div>`);
            });
            Object.keys(baseChunkData['shops']).filter(shop => shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && $('.searchchunks-data').append(`<div class="search-header noscroll"><b class="noscroll">Shops</b></div>`);
            Object.keys(baseChunkData['shops']).filter(shop => shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(baseChunkData['shops']).filter(shop => shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).sort().forEach(shop => {
                $('.searchchunks-data').append(`<div class="search-result noscroll"><span class='noscroll' onclick='openSearchDetails("shops", "${shop.replaceAll(/\'/g, '%2X').replaceAll(/\(/g, '%2Y').replaceAll(/\)/g, '%2Z')}")'>${shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</span></div>`);
            });
        } else if (Object.keys(baseChunkData).length > 0) {
            $('.searchchunks-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(baseChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['shops']).filter(shop => shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
        }
    }
    if ($('.searchchunks-data').children().length === 0) {
        $('.searchchunks-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Finds gcd
var gcd = function(a, b) {
    if (b < 0.0000001) return a;

    return gcd(b, Math.floor(a % b));
};

// Finds even fraction
var findFraction = function(fraction) {
    var len = fraction.toString().length - 2;

    var denominator = Math.pow(10, len);
    var numerator = fraction * denominator;

    var divisor = gcd(numerator, denominator);

    numerator /= divisor;
    denominator /= divisor;
    return 1 + '/' + (+(Math.round((denominator/numerator) + "e+2")  + "e-2")).toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// Opens the search details modal
var openSearchDetails = function(category, name) {
    name = name.replaceAll(/\%2X/g, "'").replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")");
    searchDetailsModalOpen = true;
    $('.searchdetails-data').empty();
    $('.searchdetails-title').text(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\|\~/g, '').replaceAll(/\~\|/g, '').replaceAll(/\*/g, '').replaceAll(/\*/g, ''));
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
                formattedSource += realName.replaceAll(/\~\|/g, '').replaceAll(/\|\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\%2H/g, "'").replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")");
            } else {
                let shownSource = source;
                if (shownSource.includes('|')) {
                    shownSource = shownSource.split('|')[1].charAt(0).toUpperCase() + shownSource.split('|')[1].slice(1);
                }
                formattedSource += `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(shownSource.replaceAll(/\~\|/g, '').replaceAll(/\|\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\%2H/g, "'").replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")").replaceAll(/\*/g, ''))} target="_blank">${shownSource.replaceAll(/\~\|/g, '').replaceAll(/\|\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\%2H/g, "'").replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")").replaceAll(/\*/g, '')}</a>`
            }
        }
        if (typeof baseChunkData[category][name][source] !== "boolean" && skills.includes(baseChunkData[category][name][source].split('-')[1])) {
            formattedSource += baseChunkData[category][name][source].split('-')[1].replaceAll(/\*/g, '');
            formattedSource += ` (${source.replaceAll(/\~\|/g, '').replaceAll(/\|\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\*/g, '').replaceAll(/\%2H/g, "'").replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")").replaceAll(/\*/g, '')})`
        } else if (typeof baseChunkData[category][name][source] !== "boolean" && !baseChunkData[category][name][source].includes('primary') && !baseChunkData[category][name][source].includes('secondary') && !baseChunkData[category][name][source] === 'shop') {
            formattedSource += `-${baseChunkData[category][name][source].replaceAll(/\*/g, '')}`;
        } else if (typeof baseChunkData[category][name][source] !== "boolean") {
            if (baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '') === 'drop' && dropRatesGlobal.hasOwnProperty(source.replaceAll(/\#/g, '%2F')) && dropRatesGlobal[source.replaceAll(/\#/g, '%2F')].hasOwnProperty(name)) {
                formattedSource += ` (${baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '')}, ${dropRatesGlobal[source.replaceAll(/\#/g, '%2F')][name]})`;
            } else if (baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '') === 'drop' && chunkInfo['challenges']['Slayer'].hasOwnProperty(source.replaceAll('#', '%2F')) && chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F')].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F')]['Output']) && chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F')]['Output']].hasOwnProperty(name)) {
                let dropRate = isNaN(Object.values(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F')]['Output']][name])[0]) ? Object.values(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F')]['Output']][name])[0] : findFraction(parseFloat(Object.values(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F')]['Output']][name])[0].split('/')[0].replaceAll('~', '')) / parseFloat(Object.values(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][source.replaceAll('#', '%2F')]['Output']][name])[0].split('/')[1]));
                formattedSource += ` (${baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '')}, ${dropRate})`;
            } else {
                formattedSource += ` (${baseChunkData[category][name][source].replaceAll('primary-', '').replaceAll('secondary-', '').replaceAll(/\*/g, '')})`;
            }
        }
        formattedSources.push(formattedSource);
    });
    formattedSources.sort().forEach(formattedSource => {
        $('.searchdetails-data').append(`<div class="noscroll results">${formattedSource.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\|\~/g, '').replaceAll(/\~\|/g, '').replaceAll(/\%2Y/g, "(").replaceAll(/\%2Z/g, ")")}</div>`);
    });
    $('#myModal11').show();
    document.getElementById('searchdetails-data').scrollTop = 0;
}

// Opens the highest modal
var openHighest = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !onMobile && !helpMenuOpen) {
        highestModalOpen = true;
        let combatStyles = [];
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
        if (rules['Show Best in Slot Weight Tasks']) {
            combatStyles.push('Weight Reducing');
        }
        let slots = ['Head', 'Neck', 'Cape', 'Body', 'Legs', 'Weapon', 'Shield', 'Ammo', 'Hands', 'Feet', 'Ring'];
        $('.highest-title').empty();
        $('.highest-data').empty();
        combatStyles.forEach(combatStyle => {
            $('.highest-title').append(`<div class='noscroll style-button ${combatStyle.replaceAll(' ', '_')}-button' onclick='switchHighestTab("${combatStyle.replaceAll(' ', '_')}")' title='${combatStyle}'><span class='noscroll'><img class='noscroll slot-icon' src='./resources/${combatStyle.replaceAll(' ', '_')}_combat.png' /></span></div>`);
            $('.highest-data').append(`<div class='noscroll style-body ${combatStyle.replaceAll(' ', '_')}-body'><div class='highest-subtitle noscroll'>${combatStyle} ${(testMode || !(viewOnly || inEntry || locked)) && combatStyle !== 'Skills' && combatStyle !== 'Slayer' ? `<div class='noscroll'><span class='noscroll addEquipment' onclick='addEquipment()'>Add additional equipment</span></div>` : ''}</div></div>`);
            slots.forEach(slot => {
                if (highestOverall.hasOwnProperty(combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()) && highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()] !== 'N/A') {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><img class='noscroll slot-icon' src='./resources/${slot}_slot.png' title='${slot}' /><span class='noscroll slot-text'><a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">${highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]}</a></span></div>`);
                } else if (highestOverall.hasOwnProperty(combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()) && highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()] === 'N/A') {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><img class='noscroll slot-icon' src='./resources/${slot}_slot.png' title='${slot}' /><span class='noscroll slot-text'>${highestOverall[combatStyle.replaceAll(' ', '_') + '-' + slot.toLowerCase()]}</span></div>`);
                } else if (slot === 'Weapon' || slot === 'Shield' || combatStyle !== 'Flinch') {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><img class='noscroll slot-icon' src='./resources/${slot}_slot.png' title='${slot}' /><span class='noscroll slot-text'>None</span></div>`);
                }
            });
        });
        if (highestTab === undefined) {
            highestTab = combatStyles[0];
        }
        $('.style-body').hide();
        $(`.${highestTab}-button`).addClass('active-tab');
        $(`.${highestTab}-body`).show();
        $('#myModal12').show();
        document.getElementById('highest-data').scrollTop = 0;
    }
}

// Opens the highest2 modal
var openHighest2 = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !onMobile && !helpMenuOpen) {
        highest2ModalOpen = true;
        let combatStyles = [];
        let primarySkill = [];
        if (rules['Show Skill Tasks']) {
            combatStyles.push('Skills');
            combatStyles.push('Slayer');
            skillNames.forEach(skill => {
                primarySkill[skill] = checkPrimaryMethod(skill, globalValids, baseChunkData);
            });
        }
        combatStyles.push('Clues');
        $('.highest2-title').empty();
        $('.highest2-data').empty();
        combatStyles.forEach(combatStyle => {
            $('.highest2-title').append(`<div class='noscroll style-button ${combatStyle.replaceAll(' ', '_')}-button' onclick='switchHighest2Tab("${combatStyle.replaceAll(' ', '_')}")' title='${combatStyle}'><span class='noscroll'><img class='noscroll slot-icon' src='./resources/${combatStyle.replaceAll(' ', '_')}_combat.png' /></span></div>`);
            $('.highest2-data').append(`<div class='noscroll style-body ${combatStyle.replaceAll(' ', '_')}-body'><div class='highest-subtitle noscroll'>${combatStyle}</div></div>`);
            if (combatStyle === 'Skills') {
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll qps'>Quest Points: ${questPointTotal}</div>`);
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row row-header'><span class='noscroll icon-table-header'>Skill</span><span class='noscroll text-table-header'>Highest Task</span><span class='noscroll button-table-header'>Primary Training</span></div>`);
                skillNames.filter(skill => { return skill !== 'Combat' }).sort().forEach(skill => {
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><span class='noscroll skill-icon-wrapper'><img class='noscroll skill-icon' src='./resources/${skill}_skill.png' title='${skill}' /></span><span class='noscroll skill-text'>${(testMode || !(viewOnly || inEntry || locked)) ? `<span class='noscroll edit-highest' onclick='openPassiveModal("${skill}")'><i class="noscroll fas fa-edit"></i></span>` : ''}${(!!highestOverall[skill] ? '<b class="noscroll">[' + chunkInfo['challenges'][skill][highestOverall[skill]]['Level'] + ']</b> ' : '') + (highestOverall[skill] || 'None').replaceAll('~', '').replaceAll('|', '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')}</span><span class='noscroll skill-button ${(primarySkill[skill] ? 'active' : '')}'>${primarySkill[skill] ? `<div class='noscroll methods-button' onclick='viewPrimaryMethods("${skill}")'>View Methods</div></span>` : `<div class='noscroll'>None</div></span>`}</div>`);
                });
            } else if (combatStyle === 'Slayer') {
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll slayer-header'>Slayer is currently <b class='noscroll slayer-locked-status ${!!slayerLocked ? 'red' : 'green'}'>${!!slayerLocked ? '<i class="fas fa-lock"></i>' : '<i class="fas fa-unlock"></i>'} ${!!slayerLocked ? 'LOCKED' : 'UNLOCKED'}</b> ${!!slayerLocked ? '(' + `<a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(slayerLocked['monster'].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replace(/[!'()*]/g, escape))}' target='_blank'>${slayerLocked['monster'].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</a>` + ')' : ''} ${!!slayerLocked ? ' at Level ' + slayerLocked['level'] : ''}</div>`);
                (testMode || !(viewOnly || inEntry || locked)) && !!slayerLocked && $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll slayer-unlock-container'><span class='noscroll slayer-unlock-button' onclick='unlockSlayer()'><i class="fas fa-unlock"></i>Manually Unlock</span></div>`);
                (testMode || !(viewOnly || inEntry || locked)) && $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll slayer-lock-container'><span class='noscroll slayer-lock-button' onclick='openSlayerLocked()'>${!!slayerLocked ? '<i class="fas fa-edit"></i>' : '<i class="fas fa-lock"></i>'}${!!slayerLocked ? 'Change Locked Monster' : 'Lock Slayer'}</span></div>`);
            } else if (combatStyle === 'Clues') {
                $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row row-header'><span class='noscroll tier-table-header'>Tier</span><span class='noscroll possible-table-header'>Possible Steps</span><span class='noscroll percent-table-header'>% to Complete a Clue</span></div>`);
                clueTiers.forEach(tier => {
                    let chance = 0;
                    let baseChance = (numClueTasksPossible[tier.toLowerCase()] / numClueTasks[tier.toLowerCase()]);
                    Object.keys(clueStepAmounts[tier]).forEach(numSteps => {
                        chance += Math.pow(baseChance, parseInt(numSteps)) * clueStepAmounts[tier][numSteps];
                    });
                    $(`.${combatStyle.replaceAll(' ', '_')}-body`).append(`<div class='noscroll row'><span class='noscroll clue-tier'><img class='noscroll tier-icon' src='./resources/${tier}_clue.png' title='${tier}' />${tier}</span><span class='noscroll clue-possible'>${numClueTasksPossible[tier.toLowerCase()]} / ${numClueTasks[tier.toLowerCase()]} (${Math.round((baseChance * 100) * 100) / 100}%)</span><span class='noscroll clue-percent'> ${(Math.round((chance * 100) * 100) / 100).toLocaleString(undefined, {minimumIntegerDigits: 2, minimumFractionDigits: 2})}%</span></div>`);
                });
            }
        });
        if (highestTab2 === undefined) {
            highestTab2 = combatStyles[0];
        }
        $('.style-body').hide();
        $(`.${highestTab2}-button`).addClass('active-tab');
        $(`.${highestTab2}-body`).show();
        $('#myModal12_2').show();
        document.getElementById('highest2-data').scrollTop = 0;
    }
}

// Opens the add passive skill modal
var openPassiveModal = function(skill) {
    passiveSkillModalOpen = true;
    $('#passive-skill-input').val('');
    $('.passive-skill-name').text(skill);
    $('#passive-skill-data').html(`<div><div class="passive-skill-cancel" onclick="addPassiveSkill(true)">Cancel</div><div class="passive-skill-proceed disabled" onclick="addPassiveSkill(false, '${skill}')">Add Passive Levels</div></div>`);
    $('#myModal28').show();
    $('#passive-skill-input').focus();
}

// Triggers onchange of passive skill selection to validate submit button
var passiveLockedChange = function() {
    let val = $('#passive-skill-input').val();
    if (!!val && parseInt(val) !== NaN && parseInt(val) >= 0 && parseInt(val) <= 99 && parseInt(val) % 1 === 0) {
        $('.passive-skill-proceed').removeClass('disabled');
    } else {
        $('.passive-skill-proceed').addClass('disabled');
    }
}

// Adds passive skill
var addPassiveSkill = function(close, skill) {
    if (close) {
        $('#myModal28').hide();
        passiveSkillModalOpen = false;
    } else {
        let level = !!$('#passive-skill-input').val() ? parseInt($('#passive-skill-input').val()) : NaN;
        if (level !== NaN && level >= 0 && level <= 99 && level % 1 === 0) {
            if (!passiveSkill) {
                passiveSkill = {};
            }
            passiveSkill[skill] = level;
            !onMobile && setCalculating('.panel-active');
            !onMobile && calcCurrentChallenges();
            setData();
            $('#myModal28').hide();
            passiveSkillModalOpen = false;
        }
    }
}

// Unlocks training Slayer
var unlockSlayer = function() {
    slayerLocked = null;
    setData();
    !onMobile && setCalculating('.panel-active');
    !onMobile && calcCurrentChallenges();
}

// Checks if slayer locked monster is unlocked
var checkSlayerLocked = function() {
    if (!!slayerLocked && !!slayerTasks && slayerTasks.hasOwnProperty(slayerLocked['monster'])) {
        !!slayerTasks[slayerLocked['monster']] && Object.keys(slayerTasks[slayerLocked['monster']]).forEach(monster => {
            if (!!baseChunkData['monsters'] && baseChunkData['monsters'].hasOwnProperty(monster)) {
                unlockSlayer();
                return;
            }
        });
    }
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
    if ((Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0 && Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length <= 200) || filterByCheckedEquipment) {
        Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedEquipment || !!manualEquipment[item])).length > 0 && Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedEquipment || !!manualEquipment[item])).sort().forEach(item => {
            $('.add-equipment-data').append(`<div class="search-equipment-result noscroll"><span class='noscroll'><input class="noscroll" ${!!manualEquipment && !!manualEquipment[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')] && "checked"} type="checkbox" onclick="addManualEquipment('` + item.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '-2P').replaceAll(/\)/g, '-2Q') + `')" /><a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replace(/[!'()*]/g, escape))}' target='_blank'>${item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
        });
    } else if (Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length > 0) {
        $('.add-equipment-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(chunkInfo['equipment']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(baseChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
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
    equip = equip.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll('_', ' ').replaceAll(/\-2H/g, "'").replaceAll(/\-2Z/g, '&').replaceAll(/\-2P/g, '(').replaceAll(/\-2Q/g, ')');
    if (!manualEquipment[equip]) {
        manualEquipment[equip] = true;
    } else {
        delete manualEquipment[equip];
    }
    setData();
    !onMobile && setCalculating('.panel-active');
    !onMobile && calcCurrentChallenges();
}

// Opens the backlog sources modal
var backlogSources = function() {
    backlogSourcesModalOpen = true;
    $('#myModal17').show();
    $('#searchBacklogSources').val('').focus();
    searchBacklogSources();
}

// Searches for matching names within sources
var searchBacklogSources = function() {
    let searchTemp = $('#searchBacklogSources').val().toLowerCase();
    $('.backlog-sources-data').empty();
    let localChunkData = {...baseChunkData};
    !!backloggedSources && Object.keys(backloggedSources).forEach(category => {
        localChunkData[category] = {...localChunkData[category], ...backloggedSources[category]};
    });
    if ((Object.keys(localChunkData).length > 0 && Object.keys(localChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['shops']).filter(shop => shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length <= 200) || filterByCheckedSources) {
        let tempValid = false;
        Object.keys(localChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || !!backloggedSources['items'])).length > 0 && $('.backlog-sources-data').append(`<div class="search-header header-items noscroll"><b class="noscroll">Items</b></div>`);
        Object.keys(localChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['items'] && !!backloggedSources['items'][item]))).length > 0 && Object.keys(localChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['items'] && !!backloggedSources['items'][item]))).sort().forEach(item => {
            $('.backlog-sources-data').append(`<div class="search-sources-result noscroll"><span class='noscroll'><input class="noscroll" ${!!backloggedSources && !!backloggedSources['items'] && !!backloggedSources['items'][item] && "checked"} type="checkbox" onclick="backlogManualSource('items' , '` + item.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '-2P').replaceAll(/\)/g, '-2Q') + `')" /><a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replace(/[!'()*]/g, escape))}' target='_blank'>${item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
            tempValid = true;
        });
        if (!tempValid) {
            $('.header-items').remove();
        }
        tempValid = false;
        Object.keys(localChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || !!backloggedSources['monsters'])).length > 0 && $('.backlog-sources-data').append(`<div class="search-header header-monsters noscroll"><b class="noscroll">Monsters</b></div>`);
        Object.keys(localChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['monsters'] && !!backloggedSources['monsters'][monster]))).length > 0 && Object.keys(localChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['monsters'] && !!backloggedSources['monsters'][monster]))).sort().forEach(monster => {
            $('.backlog-sources-data').append(`<div class="search-sources-result noscroll"><span class='noscroll'><input class="noscroll" ${!!backloggedSources && !!backloggedSources['monsters'] && !!backloggedSources['monsters'][monster] && "checked"} type="checkbox" onclick="backlogManualSource('monsters' , '` + monster.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '-2P').replaceAll(/\)/g, '-2Q') + `')" /><a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replace(/[!'()*]/g, escape))}' target='_blank'>${monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
            tempValid = true;
        });
        if (!tempValid) {
            $('.header-monsters').remove();
        }
        tempValid = false;
        Object.keys(localChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || !!backloggedSources['npcs'])).length > 0 && $('.backlog-sources-data').append(`<div class="search-header header-npcs noscroll"><b class="noscroll">Npcs</b></div>`);
        Object.keys(localChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['npcs'] && !!backloggedSources['npcs'][npc]))).length > 0 && Object.keys(localChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['npcs'] && !!backloggedSources['npcs'][npc]))).sort().forEach(npc => {
            $('.backlog-sources-data').append(`<div class="search-sources-result noscroll"><span class='noscroll'><input class="noscroll" ${!!backloggedSources && !!backloggedSources['npcs'] && !!backloggedSources['npcs'][npc] && "checked"} type="checkbox" onclick="backlogManualSource('npcs' , '` + npc.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '-2P').replaceAll(/\)/g, '-2Q') + `')" /><a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replace(/[!'()*]/g, escape))}' target='_blank'>${npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
            tempValid = true;
        });
        if (!tempValid) {
            $('.header-npcs').remove();
        }
        tempValid = false;
        Object.keys(localChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || !!backloggedSources['objects'])).length > 0 && $('.backlog-sources-data').append(`<div class="search-header header-objects noscroll"><b class="noscroll">Objects</b></div>`);
        Object.keys(localChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['objects'] && !!backloggedSources['objects'][object]))).length > 0 && Object.keys(localChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['objects'] && !!backloggedSources['objects'][object]))).sort().forEach(object => {
            $('.backlog-sources-data').append(`<div class="search-sources-result noscroll"><span class='noscroll'><input class="noscroll" ${!!backloggedSources && !!backloggedSources['objects'] && !!backloggedSources['objects'][object] && "checked"} type="checkbox" onclick="backlogManualSource('objects' , '` + object.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '-2P').replaceAll(/\)/g, '-2Q') + `')" /><a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replace(/[!'()*]/g, escape))}' target='_blank'>${object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '')}</a></span></div>`);
            tempValid = true;
        });
        if (!tempValid) {
            $('.header-objects').remove();
        }
        tempValid = false;
        Object.keys(localChunkData['shops']).filter(shop => shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || !!backloggedSources['shops'])).length > 0 && $('.backlog-sources-data').append(`<div class="search-header header-shops noscroll"><b class="noscroll">Shops</b></div>`);
        Object.keys(localChunkData['shops']).filter(shop => shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['shops'] && !!backloggedSources['shops'][shop]))).length > 0 && Object.keys(localChunkData['shops']).filter(shop => shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp) && (!filterByCheckedSources || (!!backloggedSources['shops'] && !!backloggedSources['shops'][shop]))).sort().forEach(shop => {
            $('.backlog-sources-data').append(`<div class="search-sources-result noscroll"><span class='noscroll'><input class="noscroll" ${!!backloggedSources && !!backloggedSources['shops'] && !!backloggedSources['shops'][shop] && "checked"} type="checkbox" onclick="backlogManualSource('shops' , '` + shop.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(' ', '_').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '-2P').replaceAll(/\)/g, '-2Q') + `')" /><a class='noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replace(/[!'()*]/g, escape))}' target='_blank'>${shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').replaceAll(/\*/g, '')}</a></span></div>`);
            tempValid = true;
        });
        if (!tempValid) {
            $('.header-shops').remove();
        }
    } else if (Object.keys(localChunkData).length > 0) {
        $('.backlog-sources-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">Too many results (${Object.keys(localChunkData['items']).filter(item => item.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['monsters']).filter(monster => monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['npcs']).filter(npc => npc.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['objects']).filter(object => object.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length + Object.keys(localChunkData['shops']).filter(shop => shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\~/g, '').replaceAll(/\|/g, '').toLowerCase().includes(searchTemp)).length})</span><br /><span class="noscroll bottomline">Try refining your search to narrow down the results.</span></span></div>`);
    }
    if ($('.backlog-sources-data').children().length === 0) {
        $('.backlog-sources-data').append(`<div class="noscroll results"><span class="noscroll holder"><span class="noscroll topline">No results found (0)</span></span></div>`);
    }
}

// Toggle filtering of sources by checked-only
var changeSourcesFilterBy = function() {
    filterByCheckedSources = !filterByCheckedSources;
    searchBacklogSources();
}

// Backlogs the given source
var backlogManualSource = function(category, source) {
    source = source.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll('_', ' ').replaceAll(/\-2H/g, "'").replaceAll(/\-2Z/g, '&').replaceAll(/\-2P/g, '(').replaceAll(/\-2Q/g, ')');
    if (!backloggedSources[category]) {
        backloggedSources[category] = {};
    }
    if (!backloggedSources[category][source.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
        backloggedSources[category][source.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
    } else {
        delete backloggedSources[category][source.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')];
        if (!backloggedSources[category]) {
            delete backloggedSources[category];
        }
    }
    setData();
    !onMobile && setCalculating('.panel-active');
    !onMobile && calcCurrentChallenges();
}

// Opens the sticker menu
var openStickers = function(id) {
    if (signedIn || testMode) {
        stickerModalOpen = true;
        $('.sticker-data').empty();
        $('#myModal16').show();
        document.getElementById('sticker-data').scrollTop = 0;
        let chunkNickname = chunkInfo['chunks'].hasOwnProperty(id) ? chunkInfo['chunks'][id]['Nickname'] + ' ' : '';
        $('.sticker-chunk').text(chunkNickname + '(' + id + ')');
        $('#sticker-notes-data > textarea').val(stickeredNotes[id]);
        $('.sticker-color-picker').val(stickeredColors[id] || settings['defaultStickerColor']);
        stickerChoices.forEach(sticker => {
            let stickerName = sticker.split('-alt').join('').split('-').join(' ');
            if (sticker !== 'unset') {
                $('.sticker-data').append(`<span style='color:${$('.sticker-color-picker').val()}' class='noscroll sticker-option-container ${sticker}-tag' title='${stickerName.charAt(0).toUpperCase() + stickerName.slice(1)}' onclick="setSticker('${id}', '${sticker}')"><i class="noscroll fas fa-${sticker}" style="transform: scaleX(-1)"></i></span>`);
            } else {
                $('.sticker-data').append(`<span class='noscroll sticker-option-container unset-option' title='${stickerName.charAt(0).toUpperCase() + stickerName.slice(1)}' onclick="setSticker('${id}', '${sticker}')"><i class="noscroll fas fa-ban" style="transform: scaleX(-1)"></i></span>`);
            }
        });
        $('.sticker-data').append(`<div class='noscroll sticker-data-subheader'>OSRS Stickers</div>`);
        stickerChoicesOsrs.forEach(sticker => {
            let stickerName = sticker.split('-').join(' ');
            $('.sticker-data').append(`<span class='noscroll sticker-option-container ${sticker}-tag' title='${stickerName.charAt(0).toUpperCase() + stickerName.slice(1)}' onclick="setSticker('${id}', '${sticker}')"><img class="noscroll" src="./resources/SVG/${sticker}-osrs.svg"></span>`);
        });
        savedStickerId = id;
        if (stickered.hasOwnProperty(id)) {
            $(`.sticker-data > .sticker-option-container.${stickered[id]}-tag`).addClass('selected-sticker');
            savedStickerSticker = stickered[id];
        } else {
            savedStickerSticker = 'unset';
        }
    }
}

var submitSticker = function() {
    let id = savedStickerId;
    let sticker = savedStickerSticker;
    if (sticker !== 'unset') {
        $('.hidden-sticker').hide().remove();
        $('.chunk-sticker.clicky').removeClass('clicky signedIn');
        if (stickered.hasOwnProperty(id)) {
            $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().children('.chunk-sticker').remove();
        }
        if (stickerChoices.includes(sticker)) {
            $('.box > .chunkId:contains(' + id + ')').parent().append(`<span style='color:${$('.sticker-color-picker').val()}' class='chunk-sticker permanent-sticker' onclick="openStickers(${id})"><i class="fas fa-${sticker}" style="transform: scaleX(-1)"></i>${!!$('#sticker-notes-data > textarea').val() && $('#sticker-notes-data > textarea').val().length > 0 ? `<span class="tooltiptext-sticker">${$('#sticker-notes-data > textarea').val()}</span>` : ''}</span>`);
        } else if (stickerChoicesOsrs.includes(sticker)) {
            $('.box > .chunkId:contains(' + id + ')').parent().append(`<span class='chunk-sticker permanent-sticker' onclick="openStickers(${id})"><img src="./resources/SVG/${sticker}-osrs.svg">${!!$('#sticker-notes-data > textarea').val() && $('#sticker-notes-data > textarea').val().length > 0 ? `<span class="tooltiptext-sticker">${$('#sticker-notes-data > textarea').val()}</span>` : ''}</span>`);
        }
        stickered[id] = sticker;
        stickeredNotes[id] = $('#sticker-notes-data > textarea').val();
        stickeredColors[id] = $('.sticker-color-picker').val();
    } else {
        $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().children('.chunk-sticker').remove();
        delete stickered[id];
        delete stickeredNotes[id];
        delete stickeredColors[id];
        $('.box > .chunkId:contains(' + id + ')').parent().append(`<span class='chunk-sticker hidden-sticker' onclick="openStickers(${id})"><i class="fas fa-tag" style="transform: scaleX(-1)"></i></span>`);
    }
    $('.chunk-sticker').css('font-size', fontZoom * (3 / 2) + 'px');
    $('.chunk-sticker > img').parent().css('width', fontZoom * (3 / 2) + 'px');
    setData();
    closeSticker();
}

// Sets the given sticker on the given chunk
var setSticker = function(id, sticker) {
    savedStickerId = id;
    savedStickerSticker = sticker;
    $('.selected-sticker').removeClass('selected-sticker');
    if (sticker !== 'unset') {
        $(`.sticker-data > .sticker-option-container.${sticker}-tag`).addClass('selected-sticker');
    }
}

// Changes the sticker options color
var changeCurrentStickerColor = function() {
    $('.sticker-option-container:not(.unset-option)').css('color', $('.sticker-color-picker').val());
}

// Opens the methods modal
var viewPrimaryMethods = function(skill) {
    methodsModalOpen = true;
    let methods = checkPrimaryMethod(skill, globalValids, baseChunkData, true);
    $('.methods-data').empty();
    Object.keys(methods).sort(function(a, b) { return methods[a] - methods[b] }).forEach(method => {
        $('.methods-data').append(`<div class='noscroll skill-method'>[${methods[method]}]: ${method.replaceAll('~', '').replaceAll('|', '').replaceAll('*', '')}</div>`)
    });
    $('#myModal13').show();
    document.getElementById('methods-data').scrollTop = 0;
}

// Switches Highest Tab
var switchHighestTab = function(tab) {
    highestTab = tab;
    $('.style-body').hide();
    $(`.style-button`).removeClass('active-tab');
    $(`.${tab}-button`).addClass('active-tab');
    $(`.${tab}-body`).show();
}

// Switches Highest Tab
var switchHighest2Tab = function(tab) {
    highestTab2 = tab;
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

// Closes the highest modal
var closeHighest2 = function() {
    highest2ModalOpen = false;
    $('#myModal12_2').hide();
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

// Closes the sticker modal
var closeSticker = function() {
    stickerModalOpen = false;
    $('#myModal16').hide();
}

// Closes the backlog sources modal
var closeBacklogSources = function() {
    backlogSourcesModalOpen = false;
    $('#myModal17').hide();
}

// Closes the chunk history modal
var closeChunkHistory = function() {
    chunkHistoryModalOpen = false;
    $('#myModal18').hide();
}

// Closes the challenge alts modal
var closeChallengeAlts = function() {
    challengeAltsModalOpen = false;
    $('#myModal19').hide();
}

// Closes the outer add modal
var closeOuterAdd = function() {
    manualOuterModalOpen = false;
    $('#myModal20').hide();
}

// Closes the monsters add modal
var closeMonstersAdd = function() {
    monsterModalOpen = false;
    $('#myModal21').hide();
}

// Closes the quest steps modal
var closeQuestSteps = function() {
    questStepsModalOpen = false;
    $('#myModal25').hide();
}

// Closes the friends list modal
var closeFriendsList = function() {
    friendsListModalOpen = false;
    $('#myModal26').hide();
}

// Closes the friends list add modal
var closeFriendsListAdd = function() {
    friendsAddModalOpen = false;
    $('#myModal27').hide();
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
    (challengeArr.length > 0 || workerOut === 0) && $('.panel-active').css({ 'min-height': '', 'font-size': '' }).removeClass('calculating').empty();
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
    $('.panel-backlog').css({ 'min-height': '', 'font-size': '' }).removeClass('calculating').empty();
    $('.panel-backlog > i').css('line-height', '');
    (testMode || !(viewOnly || inEntry || locked)) && $('.panel-backlog').append(`<div class='noscroll backlogSources-container'><span class='noscroll backlogSources' onclick='backlogSources()'><i class="fas fa-archive"></i>Backlog Sources</span></div>`);
    backlogArr.forEach(line => {
        $('.panel-backlog').append(line);
    });
    $('.panel-completed').css({ 'min-height': '', 'font-size': '' }).removeClass('calculating').empty();
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

// Blacklists the given chunk
var blacklist = function(chunkId) {
    $('.box > .chunkId:contains(' + chunkId + ')').filter(function() { return parseInt($(this).text()) === parseInt(chunkId); }).parent().addClass('blacklisted').removeClass('gray');
    setData();
}

// Un-Blacklists the given chunk
var unblacklist = function(chunkId) {
    $('.box > .chunkId:contains(' + chunkId + ')').filter(function() { return parseInt($(this).text()) === parseInt(chunkId); }).parent().addClass('gray').removeClass('blacklisted');
    setData();
}

// Get all possible areas within unlocked chunks
var getChunkAreas = function() {
    let chunks = {};
    $('.unlocked').each(function() {
        chunks[parseInt($($(this).children('.chunkId')[0]).text())] = true;
    });
    let i = 0;
    let temp = {};
    let temp2 = {};
    while (i < Object.keys(chunks).length) {
        !!chunkInfo['chunks'][Object.keys(chunks)[i]] && !!chunkInfo['chunks'][Object.keys(chunks)[i]]['Connect'] && Object.keys(chunkInfo['chunks'][Object.keys(chunks)[i]]['Connect']).forEach(id => {
            if (!!chunkInfo['chunks'][parseInt(id)]['Name'] && possibleAreas[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] && !chunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
                chunks[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
                temp[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = possibleAreas[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] || false;
                if (!!possibleAreas[Object.keys(chunks)[i]]) {
                    if (!temp2[Object.keys(chunks)[i]] || !temp2[Object.keys(chunks)[i]][chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
                        if (!temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
                            temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = {};
                        }
                        temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')][Object.keys(chunks)[i]] = true;
                    }
                }
            } else if (!!chunkInfo['chunks'][parseInt(id)]['Name']) {
                temp[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = possibleAreas[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] || false;
                if (!!possibleAreas[Object.keys(chunks)[i]]) {
                    if (!temp2[Object.keys(chunks)[i]] || !temp2[Object.keys(chunks)[i]][chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
                        if (!temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
                            temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = {};
                        }
                        temp2[chunkInfo['chunks'][parseInt(id)]['Name'].replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')][Object.keys(chunks)[i]] = true;
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
    $('.panel-areas').css({ 'min-height': '', 'font-size': '' }).removeClass('calculating').empty();
    $('.panel-areas > i').css('line-height', '');
    let newAreas = [];
    !!possibleAreas && Object.keys(possibleAreas).length > 0 && Object.keys(possibleAreas).sort(function(a, b) { return a.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').localeCompare(b.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')) }).forEach(area => {
        if (!!areasStructure && !!areasStructure[area.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]) {
            newAreas.push(area);
        }
        !areasStructure.hasOwnProperty(area) && $('.panel-areas').append(`<div data-depth="0" class="base area ${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-area'} noscroll"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${possibleAreas[area] ? "checked" : ''} class='noscroll' onclick="checkOffAreas(this, ${"`" + area + "`"})" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><a class='link' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(area.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))}' target="_blank">` + area.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a></span></label></div>');
    });
    let counter = 0;
    newAreas = newAreas.sort(function(a, b) { return b.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').localeCompare(a.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')) });
    if (!!possibleAreas && !!areasStructure && !!newAreas) {
        while (counter < newAreas.length) {
            let area = newAreas[counter++];
            Object.keys(areasStructure[area.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')]).forEach(parent => {
                if ($(`.area.${parent.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`).length < 1 && areasStructure.hasOwnProperty(area)) {
                    newAreas.push(area);
                    if ($(`.area.${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`).length > 0) {
                        $(`.area.${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area:not(.base)`).remove();
                    }
                } else if (areasStructure.hasOwnProperty(area)) {
                    let num = parseInt($(`.area.${parent.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`).attr('data-depth')) + 1;
                    $(`<div data-depth="${num}" class="area ${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-area'} noscroll"><label class="checkbox noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${possibleAreas[area] ? "checked" : ''} class='noscroll' onclick="checkOffAreas(this, ${"`" + area + "`"})" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll"><a class='link' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(area.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))}' target="_blank">` + area.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a></span></label></div>').insertAfter($(`.area.${parent.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`).children('label.checkbox')[0]);
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
        return { w: window.innerWidth, h: window.innerHeight };
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
    $('#details-title').html(`<b class="noscroll">${challenge.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\%2H/g, "'")}</b>`);
    if (!chunkInfo['challenges'].hasOwnProperty(skill)) {
        chunkInfo['challenges'][skill] = {};
    }
    if (!chunkInfo['challenges'][skill].hasOwnProperty(challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F'))) {
        if (skill === 'BiS') {
            chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F')] = {
                'ItemsDetails': [challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F').split('|')[1].charAt(0).toUpperCase() + challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F').split('|')[1].slice(1)],
                'Label': skill
            }
        } else if (skill === 'Extra') {
            if (challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F').includes('Kill X')) {
                chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F')] = {
                    'MonstersDetails': [challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F').split('|')[1].charAt(0).toUpperCase() + challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F').split('|')[1].slice(1)],
                    'Label': skill
                }
            } else if (challenge.match(/.*: ~\|.*\|~ \(.*\)/g)) {
                chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F')] = {
                    'ItemsDetails': [challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F').split('|')[1].charAt(0).toUpperCase() + challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F').split('|')[1].slice(1)],
                    'Label': skill
                }
            }
        }
    }
    chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F')].hasOwnProperty('Description') && $('#details-data').append(`<span class="details-subtitle noscroll"><i class="noscroll">${chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F')]['Description']}</i></span><br />`);
    detailsKeys.forEach(key => {
        let written = false;
        $('#details-data').append(`<span class="details-subtitle noscroll"><u class="noscroll"><b class="noscroll">${key.split('Details')[0].toLowerCase()}</b></u></span><br />`);
        !!chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F')][key] && chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F')][key].forEach(el => {
            let formattedSource = '';
            if (key === 'ChunksDetails') {
                if (!!el.match(/[0-9]+/g) && $('.box > .chunkId:contains(' + el.match(/[0-9]+/g)[0] + ')').filter(function() { return parseInt($(this).text()) === parseInt(el.match(/[0-9]+/g)[0]); }).parent().hasClass('unlocked')) {
                    formattedSource = '   ';
                } else if (possibleAreas[el]) {
                    formattedSource = '   ';
                }
            } else if (!!baseChunkDataIn[key.split('Details')[0].toLowerCase()]) {
                formattedSource = ': ';
                !!baseChunkDataIn[key.split('Details')[0].toLowerCase()][el] && Object.keys(baseChunkDataIn[key.split('Details')[0].toLowerCase()][el]).forEach(source => {
                    if ((!chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F')].hasOwnProperty('NonShop') || !chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F')]['NonShop'] || baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source] !== 'shop') && (rules['Wield Crafted Items'] || ![...combatSkills, 'BiS', 'Extra'].includes(skill) || (typeof baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source] !== 'string' || !processingSkill[baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].split('-')[1]]))) {
                        if (typeof baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source] === "boolean" || !skills.includes(baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].split('-')[1])) {
                            if (chunkInfo['chunks'].hasOwnProperty(source)) {
                                let realName = source;
                                if (!!chunkInfo['chunks'][source]['Name']) {
                                    realName = chunkInfo['chunks'][source]['Name'];
                                } else if (!!chunkInfo['chunks'][source]['Nickname']) {
                                    realName = chunkInfo['chunks'][source]['Nickname'] + '(' + source + ')';
                                }
                                formattedSource += realName.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\%2H/g, "'").replaceAll(/\*/g, '');
                            } else {
                                let shownSource = source;
                                if (shownSource.includes('|')) {
                                    shownSource = shownSource.split('|')[1].charAt(0).toUpperCase() + shownSource.split('|')[1].slice(1);
                                }
                                formattedSource += `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(shownSource.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\%2H/g, "'").replaceAll(/\*/g, ''))} target="_blank">${shownSource.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\%2H/g, "'").replaceAll(/\*/g, '')}</a>`;
                            }
                        }
                        if (typeof baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source] !== "boolean" && skills.includes(baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].split('-')[1])) {
                            formattedSource += baseChunkDataIn[key.split('Details')[0].toLowerCase()][el][source].split('-')[1].replaceAll(/\*/g, '');
                            formattedSource += ` (${source.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\*/g, '').replaceAll(/\%2H/g, "'")})`
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
            if (!!baseChunkDataIn[key.split('Details')[0].toLowerCase()] && !!baseChunkDataIn[key.split('Details')[0].toLowerCase()][el] && Object.keys(baseChunkDataIn[key.split('Details')[0].toLowerCase()][el]).length > 10) {
                formattedSource = ': <span class="noscroll tosearchdetails" onclick="openSearchDetails(`' + key.split('Details')[0].toLowerCase().replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\'/g, '%2H') + '`, `' + el.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replaceAll(/\'/g, '%2H') + '`)">' + 'Many sources (' + Object.keys(baseChunkDataIn[key.split('Details')[0].toLowerCase()][el]).length + ')</span>';
            }
            if (formattedSource !== '') {
                written = true;
                $('#details-data').append(`<span class="noscroll"><b class="noscroll">${el.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\%2H/g, "'")}</b></span><span class="noscroll">${formattedSource}</span><br />`);
            } else {
                written = true;
                $('#details-data').append(`<span class="noscroll red"><b class="noscroll">${el.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+').replaceAll(/\%2H/g, "'")}</b></span><br />`);
            }
        });
        if (!chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F')][key] || chunkInfo['challenges'][skill][challenge.replaceAll(/\%2H/g, "'").replaceAll('#', '%2F')][key].length === 0 || !written) {
            $('#details-data').append('<span class="noscroll">None</span><br />');
        }
    });
    $('#myModal2').show();
    document.getElementById('details-data').scrollTop = 0;
}

// Shows challenge alternatives
var showAlternatives = function(challenge, skill, type) {
    challengeAltsModalOpen = true;
    $('#alts-data').empty();
    !!globalValids[skill] && Object.keys(globalValids[skill]).forEach(chal => {
        if (globalValids[skill][chal] === globalValids[skill][challenge]) {
            if (skill === 'BiS') {
                $('#alts-data').append(`<div class="alt-challenge noscroll ${skill + '-alt-challenge'}"><label class="radio noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "radio--disabled" : ''}"><span class="radio__input noscroll"><input type="radio" name="radio" ${(!!highestOverall && Object.values(highestOverall).map(function(y) { return y.toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') }).includes(chal.split('|')[1].toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))) ? "checked" : ''} class='noscroll' onclick="checkOffAltChallenge('${skill}', '${chal}', '${challenge}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="radio__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='currentColor' stroke='currentColor' d='M 12 12 m -7.5 0 a 7.5 7.5 90 1 0 15 0 a 7.5 7.5 90 1 0 -15 0' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">` + '<span class="inner noscroll">' + skill + '</b>: ' + chal.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((chal.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + chal.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + chal.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `</span></span></label></div>`);
            } else if (skill !== 'Quest' && skill !== 'Diary' && skill !== 'Extra') {
                $('#alts-data').append(`<div class="alt-challenge noscroll ${skill + '-alt-challenge'}"><label class="radio noscroll ${(!testMode && (viewOnly || inEntry || locked)) ? "radio--disabled" : ''}"><span class="radio__input noscroll"><input type="radio" name="radio" ${(chal === challenge) ? "checked" : ''} class='noscroll' onclick="checkOffAltChallenge('${skill}', '${chal}', '${challenge}')" ${(!testMode && (viewOnly || inEntry || locked)) ? "disabled" : ''}><span class="radio__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='currentColor' stroke='currentColor' d='M 12 12 m -7.5 0 a 7.5 7.5 90 1 0 15 0 a 7.5 7.5 90 1 0 -15 0' /></svg></span></span><span class="radio__label noscroll"><b class="noscroll">` + '<span class="inner noscroll">' + skill + '</b>: ' + chal.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((chal.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + chal.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + chal.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `</span></span></label></div>`);
            } else {
                $('#alts-data').empty();
                $('#alts-data').append(`<div class="alt-challenge noscroll ${skill + '-alt-challenge'}"><div class='noscroll results'><span class='noscroll holder'><span class='noscroll topline'>No Alternatives</span></span></div></div>`);
            }
        }
    });
    if (!$('#alts-data').children() || $('#alts-data').children().length < 2) {
        $('#alts-data').empty();
        $('#alts-data').append(`<div class='noscroll results'><span class='noscroll holder'><span class='noscroll topline'>No Alternatives</span></span></div>`);
    }
    $('#myModal19').show();
}

// Switches active challenge to alt
var checkOffAltChallenge = function(skill, chal, mainChal) {
    if (!altChallenges[skill]) {
        altChallenges[skill] = {};
    }
    if (skill === 'BiS') {
        Object.keys(highestOverall).forEach(key => {
            if (highestOverall[key].toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') === mainChal.split('|')[1].toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')) {
                altChallenges[skill][key] = chal.split('|')[1].toLowerCase().replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+');
            }
        });
    } else {
        !!chunkInfo['challenges'][skill][chal] && (altChallenges[skill][chunkInfo['challenges'][skill][chal]['Level']] = chal);
    }
    !onMobile && setCalculating('.panel-active');
    !onMobile && calcCurrentChallenges();
    setData();
}

// Shows challenge notes
var showNotes = function(challenge, skill, note) {
    if (note === true) {
        note = '';
    }
    $('#notes-title').html(`<b class="noscroll">Add note to:</b><br />${challenge.replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')}`);
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

// Submit friend map
var submitFriend = function() {
    friends[$('.mid-friend').val()] = $('.name-friend').val();
    setData();
    closeFriendsListAdd();
    openFriendsList();
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
            $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule input').prop('checked', rulePresets[preset].hasOwnProperty(rule));
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
    if (!inEntry && !importMenuOpen && !manualModalOpen && !detailsModalOpen && !notesModalOpen && !highscoreMenuOpen && !onMobile && !helpMenuOpen) {
        rulesModalOpen = true;
        $('#rules-data').empty();
        $('#rules-data').append(`<div class="rule-category intro-category noscroll">Basic Rules</div><div class="rule-subcategory intro-subcategory noscroll">If you're unfamiliar with the basic rules of a OneChunkMan account, check out a basic description of the rules and guidelines <a class='noscroll' href='https://docs.google.com/document/d/1ia1wiRSYs8GznzHM5D7SynNG-PWM9-9Jv3JKGV6Y28Q' target='_blank'>here</a>!</div>`);
        if ((!viewOnly && !inEntry && !locked) || testMode) {
            $('#rules-data').append(`<div class="rule-category presets-category noscroll">Rule Presets</div><div class="rule-subcategory presets-subcategory noscroll">Pick a preset to get started, and then turn on and off different rules to suit your playstyle!</div><div id="rules-presets" class="rules-presets noscroll"></div>`);
            Object.keys(rulePresets).forEach(preset => {
                $('#rules-presets').append(`<div class="preset-button noscroll" onclick="warnPreset('${preset}')">${preset}<br /><span>${rulePresetFlavor[preset]}</span></div>`);
            });
        }
        $('#rules-data').append(`<hr class="noscroll" />`);
        $('#rules-data').append(`<div class="rule-category noscroll">Rules</div>`);
        $('#rules-data').append(`<div class="rule-key noscroll"><b class='noscroll'><u class='noscroll'>KEY</u></b><br /><span class='rule-asterisk noscroll'>*</span> - Xtreme/Supreme Rule<br /><span class='rule-asterisk noscroll'>†</span> - Supreme Rule</div>`);
        Object.keys(ruleStructure).forEach(category => {
            $('#rules-data').append(`<div class="rule-minicategory ${category.replaceAll(/\ /g, '_')}-category noscroll">${category}</div>`);
            !!ruleStructure[category] && Object.keys(ruleStructure[category]).forEach(rule => {
                if (rule !== 'Kill X Amount' && rule !== 'Rare Drop Amount') {
                    if (rule === 'Kill X') {
                        $('.' + category.replaceAll(/\ /g, '_') + '-category').append(`<div class="rule ${rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule'} noscroll"><label class="checkbox noscroll ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${rules[rule] ? "checked" : ''} class='noscroll' onclick="checkOffRules()" ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${ruleNames[rule].split('X-amount')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')}<input type='number' class='x-num-input' min='1' value="${rules['Kill X Amount']}" onchange="checkOffRules()" ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "disabled" : ''} /> ${ruleNames[rule].split('X-amount')[1].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')}</span></label></div>`);
                    } else if (rule === 'Rare Drop') {
                        $('.' + category.replaceAll(/\ /g, '_') + '-category').append(`<div class="rule ${rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule'} noscroll"><span class='noscroll ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "checkbox--disabled" : ''}'>` + ruleNames[rule].split('/X')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + ` / <input type='number' class='rare-num-input' min='0' value="${rules['Rare Drop Amount']}" onchange="checkOffRules()" ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "disabled" : ''} /> ` + ruleNames[rule].split('/X')[1].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</span></div>');
                    } else {
                        $('.' + category.replaceAll(/\ /g, '_') + '-category').append(`<div class="rule ${rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule'} noscroll"><label class="checkbox noscroll ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${rules[rule] ? "checked" : ''} class='noscroll' onclick="checkOffRules()" ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][rule] === false) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${ruleNames[rule].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')}</span></label></div>`);
                    }
                    Array.isArray(ruleStructure[category][rule]) && ruleStructure[category][rule].forEach(subRule => {
                        $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').append(`<div class="rule ${subRule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule subrule'} noscroll"><label class="checkbox noscroll ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][subRule] === false) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${rules[subRule] ? "checked" : ''} class='noscroll' onclick="checkOffRules()" ${!testMode && (viewOnly || inEntry || locked || ruleStructure[category][subRule] === false) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${ruleNames[subRule].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')}</span></label></div>`);
                    });
                }
            });
        });
        document.getElementById('rules-data').scrollTop = 0;
        checkOffRules(false, true);
        $('#myModal4').show();
    }
}

// Shows settings details
var showSettings = function() {
    settingsModalOpen = true;
    $('#settings-data').empty();
    Object.keys(settingStructure).forEach(category => {
        $('#settings-data').append(`<div class="setting-category ${category.replaceAll(/\ /g, '_')}-category noscroll">${category}</div>`);
        !!settingStructure[category] && Object.keys(settingStructure[category]).forEach(setting => {
            if (setting === 'completedTaskColor') {
                $('.' + category.replaceAll(/\ /g, '_') + '-category').append(`<div class="setting ${setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting'} noscroll"><input class="challenge-color-rule" type="color" value="${settings[setting]}" onchange="changeChallengeColor()" /><i class="fas fa-undo-alt noscroll reset-challenge-color" title="Reset Color" onclick="resetChallengeColor()"></i><span class='noscroll extraspace'>` + settingNames[setting].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</span></div>');
            } else if (setting === 'defaultStickerColor') {
                $('.' + category.replaceAll(/\ /g, '_') + '-category').append(`<div class="setting ${setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting'} noscroll"><input class="sticker-color-rule" type="color" value="${settings[setting]}" onchange="changeDefaultStickerColor()" /><i class="fas fa-undo-alt noscroll reset-default-sticker-color" title="Reset Color" onclick="resetDefaultStickerColor()"></i><span class='noscroll extraspace'>` + settingNames[setting].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</span></div>');
            } else {
                $('.' + category.replaceAll(/\ /g, '_') + '-category').append(`<div class="setting ${setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting'} noscroll"><label class="checkbox noscroll ${(viewOnly || inEntry || locked || settingStructure[category][setting] === false) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${settings[setting] ? "checked" : ''} class='noscroll' onclick="checkOffSettings()" ${(viewOnly || inEntry || locked || settingStructure[category][setting] === false) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${settingNames[setting].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')}</span></label></div>`);
            }
            Array.isArray(settingStructure[category][setting]) && settingStructure[category][setting].forEach(subSetting => {
                $('.' + setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting').append(`<div class="setting ${subSetting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting subsetting'} noscroll"><label class="checkbox noscroll ${!testMode && (viewOnly || inEntry || locked || settingStructure[category][subSetting] === false) ? "checkbox--disabled" : ''}"><span class="checkbox__input noscroll"><input type="checkbox" name="checkbox" ${settings[subSetting] ? "checked" : ''} class='noscroll' onclick="checkOffSettings()" ${!testMode && (viewOnly || inEntry || locked || settingStructure[category][subSetting] === false) ? "disabled" : ''}><span class="checkbox__control noscroll"><svg viewBox='0 0 24 24' aria-hidden="true" focusable="false"><path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg></span></span><span class="radio__label noscroll">${settingNames[subSetting].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')}</span></label></div>`);
            });
        });
    });
    document.getElementById('settings-data').scrollTop = 0;
    checkOffSettings(false, 'startup');
    $('#myModal7').show();
    settingsMenu();
}

// Changes the active challenges color
var changeChallengeColor = function() {
    $('.challenge-color-rule').length && (settings['completedTaskColor'] = $('.challenge-color-rule').val());
    $('.challenge.hide-backlog .checkbox').css({ 'color': settings['completedTaskColor'], 'text-decoration': settings['completedTaskStrikethrough'] ? 'line-through' : 'none' });
    $('.challenge.hide-backlog a').css({ 'text-decoration': settings['completedTaskStrikethrough'] ? 'none' : 'underline' });
    $('.challenge:not(.hide-backlog) .checkbox').css({ 'color': 'var(--colorText)', 'text-decoration': 'none' });
    $('.challenge:not(.hide-backlog) a').css({ 'text-decoration': 'underline' });
    setData();
}

// Resets the active challenges color
var resetChallengeColor = function() {
    $('.challenge-color-rule').val('#0D8219');
    changeChallengeColor();
}

// Changes the default sticker color
var changeDefaultStickerColor = function() {
    $('.sticker-color-rule').length && (settings['defaultStickerColor'] = $('.sticker-color-rule').val());
    setData();
}

// Resets the default sticker color
var resetDefaultStickerColor = function() {
    $('.sticker-color-rule').val('#000000');
    changeDefaultStickerColor();
}


// Shows chunk history
var showChunkHistory = function() {
    chunkHistoryModalOpen = true;
    $('#chunkhistory-data').empty();
    let tempDate = new Date();
    let newChunkOrder = {};
    Object.keys(chunkOrder).sort(function(a, b) { return b - a }).forEach(time => {
        if (!newChunkOrder.hasOwnProperty(chunkOrder[time])) {
            newChunkOrder[chunkOrder[time]] = time;
            tempDate.setTime(time);
            $('#chunkhistory-data').append(`<div class="history-item ${chunkOrder[time] + '-chunk-history-item'} noscroll"><span class='noscroll item1'>${"<b class='noscroll'>" + tempDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: '2-digit' }) + '</b> (' + tempDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }) + ') '}</span><span class='noscroll item2'>${"<b class='noscroll'>" + ((chunkInfo['chunks'].hasOwnProperty(parseInt(chunkOrder[time])) && chunkInfo['chunks'][parseInt(chunkOrder[time])].hasOwnProperty('Nickname')) ? chunkInfo['chunks'][parseInt(chunkOrder[time])]['Nickname'] : 'Unknown chunk') + '</b>' + ' (' + chunkOrder[time] + ')'}</span></div>`);
        }
    });
    document.getElementById('chunkhistory-data').scrollTop = 0;
    $('#myModal18').show();
    settingsMenu();
}

// Selects correct active context menu item
var switchActiveContext = function(opt) {
    switch (opt) {
        case "backlog": backlogChallenge(activeContextMenuChallenge, activeContextMenuSkill, ''); break;
        case "backlog note": showNotes(activeContextMenuChallenge, activeContextMenuSkill, ''); break;
        case "alternatives": showAlternatives(activeContextMenuChallenge, activeContextMenuSkill, ''); break;
        case "details": showDetails(activeContextMenuChallenge, activeContextMenuSkill, ''); break;
    }
    $(".active-context-menu").hide(100);
}

// Selects correct backlog context menu item
var switchBacklogContext = function(opt) {
    switch (opt) {
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
        if (!!chunkInfo['challenges'][skill][challenge] && !!chunkInfo['challenges'][skill][challenge]['Skills']) {
            skill !== 'Quest' && skill !== 'Diary' && Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
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
                if (!globalValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) || (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) {
                    fullyValid = false;
                }
            });
            if (fullyValid) {
                !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach(subTask => {
                    if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && (!backlog[skill] || !backlog[skill].hasOwnProperty(challenge))) {
                        globalValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false;
                    }
                });
            }
        });
    } else {
        backlog[skill][challenge] = note;
        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
            skill !== 'Quest' && skill !== 'Diary' && Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                if (!backlog[subSkill]) {
                    backlog[subSkill] = {};
                }
                backlog[subSkill][challenge] = note;
            });
        }
        let highestCompletedLevel = 0;
        !!completedChallenges[skill] && Object.keys(completedChallenges[skill]).forEach(name => {
            if (chunkInfo['challenges'][skill][name] && chunkInfo['challenges'][skill][name]['Level'] > highestCompletedLevel) {
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
                    // Needs to be converted still TODO
                    challengeArr.splice(index, 0, `<div class="challenge noscroll ${skill + '-challenge'}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][highestChallenge]) && "checked"} onclick="checkOffChallenges()" ${(!testMode && (viewOnly || inEntry || locked)) && "disabled"} /><b class="noscroll">[` + chunkInfo['challenges'][skill][highestChallenge]['Level'] + '] <span class="inner noscroll">' + skill + '</b>: ' + highestChallenge.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((highestChallenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))} target="_blank">` + highestChallenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + '</a>' + highestChallenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+') + (!testMode && (viewOnly || inEntry || locked) ? '' : '</span> <span class="burger noscroll" onclick="openActiveContextMenu(' + "`" + highestChallenge + "`, " + "`" + skill + "`" + ')"><i class="fas fa-sliders-h noscroll"></i></span>') + '</div>');
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
    !onMobile && calcCurrentChallenges();
    !onMobile && setupCurrentChallenges(oldChallengeArr);
    !onMobile && checkOffChallenges();
    setData();
}

// Removes a challenge from the backlog
var unbacklogChallenge = function(challenge, skill) {
    delete backlog[skill][challenge];
    if (backlog[skill] === {}) {
        !!backlog[skill] && delete backlog[skill];
    }
    if (skill !== 'Extra') {
        if (!!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][challenge] && !!chunkInfo['challenges'][skill][challenge]['Skills']) {
            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                !!backlog[subSkill] && delete backlog[subSkill][challenge];
                if (!!backlog[subSkill] && backlog[subSkill] === {}) {
                    delete backlog[subSkill];
                }
            });
        }
    }
    !onMobile && setupCurrentChallenges(false);
    !onMobile && setCalculating('.panel-active');
    !onMobile && calcCurrentChallenges();
    !onMobile && checkOffChallenges();
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
    !onMobile && calcCurrentChallenges();
    setData();
}

// Marks checked off challenges to save for later
var checkOffChallenges = function() {
    checkedChallenges = {};
    Object.keys(highestCurrent).forEach(skill => {
        if ($('.' + skill + '-challenge input').prop('checked')) {
            $('.panel-active > .' + skill + '-challenge').addClass('hide-backlog');
            if (!checkedChallenges[skill]) {
                checkedChallenges[skill] = {};
            }
            checkedChallenges[skill][highestCurrent[skill].replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
        } else {
            $('.panel-active > .' + skill + '-challenge').removeClass('hide-backlog');
        }
    });
    !!challengeArr && challengeArr.forEach(line => {
        if (line !== "No current chunk tasks.") {
            $(line).attr('class').split(/\s+/).forEach(cl => {
                if (cl.includes('BiS-')) {
                    let skillLine = cl;
                    if ($('.' + skillLine + ' input').prop('checked')) {
                        $('.panel-active > .' + skillLine).addClass('hide-backlog');
                        if (!checkedChallenges['BiS']) {
                            checkedChallenges['BiS'] = {};
                        }
                        checkedChallenges['BiS'][$(line).find('.inner').text().split($(line).find('a.link').text()).join('~|' + $(line).find('a.link').text() + '|~').replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
                    } else {
                        $('.panel-active > .' + skillLine).removeClass('hide-backlog');
                    }
                } else if (cl.includes('Quest-')) {
                    let skillLine = cl;
                    if ($('.' + skillLine + ' input').prop('checked')) {
                        $('.panel-active > .' + skillLine).addClass('hide-backlog');
                        if (!checkedChallenges['Quest']) {
                            checkedChallenges['Quest'] = {};
                        }
                        let questStepName = '~|' + $(line).find('a.link').text() + '|~' + ($(line).find('a.internal-link').length ? $(line).find('a.internal-link').text().replaceAll('step ', '').replaceAll('  ', ' ') : ' ' + $(line).text().split(': ')[1].trim());
                        checkedChallenges['Quest'][questStepName.replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J')] = true;
                    } else {
                        $('.panel-active > .' + skillLine).removeClass('hide-backlog');
                    }
                } else if (cl.includes('Diary-')) {
                    let skillLine = cl;
                    if ($('.' + skillLine + ' input').prop('checked')) {
                        $('.panel-active > .' + skillLine).addClass('hide-backlog');
                        if (!checkedChallenges['Diary']) {
                            checkedChallenges['Diary'] = {};
                        }
                        let diaryStepName = '~|' + $(line).find('a.link').text() + '|~' + ($(line).find('a.internal-link').length ? $(line).find('a.internal-link').text().replaceAll('  ', ' ') : ' ' + $(line).text().split(': ')[1].trim());
                        checkedChallenges['Diary'][diaryStepName.replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J')] = true;
                    } else {
                        $('.panel-active > .' + skillLine).removeClass('hide-backlog');
                    }
                } else if (cl.includes('Extra-')) {
                    let skillLine = cl;
                    if ($('.' + skillLine + ' input').prop('checked')) {
                        $('.panel-active > .' + skillLine).addClass('hide-backlog');
                        if (!checkedChallenges['Extra']) {
                            checkedChallenges['Extra'] = {};
                        }
                        if ($(line).find('.inner').text().split($(line).find('a.link').text()).join('~|' + $(line).find('a.link').text() + '|~').match(/Kill .* \~\|.*\|\~/)) {
                            checkedChallenges['Extra'][$(line).find('.inner').text().split($(line).find('a.link').text()).join('~|' + $(line).find('a.link').text() + '|~').replace(/Kill .* \~/, 'Kill X ~').replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
                        } else {
                            checkedChallenges['Extra'][$(line).find('.inner').text().split($(line).find('a.link').text()).join('~|' + $(line).find('a.link').text() + '|~').replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q')] = true;
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
    !onMobile && calcCurrentChallenges();
    setData();
}

// Marks checked off rules
var checkOffRules = function(didRedo, startup) {
    let redo = false;
    Object.keys(rules).forEach(rule => {
        if (subRuleDefault[rule] && rules[rule] !== $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule input').prop('checked')) {
            $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').children('.subrule').children('.checkbox').children('.checkbox__input').children('input').prop('checked', subRuleDefault[rule]);
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
            rules[rule] = $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule input').prop('checked');
        }
        if ($('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').children('.subrule').length) {
            if (rules[rule] && (!(viewOnly || inEntry || locked) || testMode)) {
                $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').children('.subrule').children('.checkbox').removeClass('checkbox--disabled');
                $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').children('.subrule').children('.checkbox').children('.checkbox__input').children('input').prop('disabled', false);
            } else {
                $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').children('.subrule').children('.checkbox').addClass('checkbox--disabled');
                $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').children('.subrule').children('.checkbox').children('.checkbox__input').children('input').prop('disabled', true);
            }
            if (!rules[rule]) {
                $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule').children('.subrule').children('.checkbox').children('.checkbox__input').children('input').prop('checked', false);
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
        !onMobile && calcCurrentChallenges();
        rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 1).show();
        !rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).hide();
        setData();
    }
}

// Marks checked off settings
var checkOffSettings = function(didRedo, startup) {
    let redo = false;
    Object.keys(settings).forEach(setting => {
        if (subSettingDefault[setting] && settings[setting] !== $('.' + setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting input').prop('checked')) {
            $('.' + setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting').children('.subsetting').children('.checkbox').children('.checkbox__input').children('input').prop('checked', subSettingDefault[setting]);
            redo = true;
        }
        if (setting !== 'completedTaskColor' && setting !== 'defaultStickerColor' && settingNames.hasOwnProperty(setting)) {
            settings[setting] = $('.' + setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting input').prop('checked');
        }
        if ($('.' + setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting').children('.subsetting').length) {
            if (settings[setting] && (!(viewOnly || inEntry || locked) || testMode)) {
                $('.' + setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting').children('.subsetting').children('.checkbox').removeClass('checkbox--disabled');
                $('.' + setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting').children('.subsetting').children('.checkbox').children('.checkbox__input').children('input').prop('disabled', false);
            } else {
                $('.' + setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting').children('.subsetting').children('.checkbox').addClass('checkbox--disabled');
                $('.' + setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting').children('.subsetting').children('.checkbox').children('.checkbox__input').children('input').prop('disabled', true);
            }
            if (!settings[setting]) {
                $('.' + setting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting').children('.subsetting').children('.checkbox').children('.checkbox__input').children('input').prop('checked', false);
                redo = true;
            }
        }
    });
    !!settingsStructureConflict && Object.keys(settingsStructureConflict).forEach(setting => {
        Array.isArray(settingsStructureConflict[setting]) && settingsStructureConflict[setting].forEach(subSetting => {
            $('.' + subSetting.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-setting input').prop('disabled', settings[setting]);
        });
    });
    if (redo && !didRedo) {
        checkOffSettings(true, startup);
        return;
    }
    toggleIds(settings['ids'], startup);
    toggleVisibility(settings['highvis'], startup);
    toggleDarkMode(settings['darkmode'], startup);
    toggleNeighbors(settings['neighbors'], startup);
    toggleRemove(settings['remove'], startup);
    toggleRoll2(settings['roll2'], startup);
    toggleUnpick(settings['unpick'], startup);
    toggleRecent(settings['recent'], startup);
    toggleChunkInfo(settings['info'], startup);
    toggleChunkTasks(settings['chunkTasks'], startup);
    toggleTaskSidebar(settings['taskSidebar'], startup);
    changeChallengeColor();
    if (!startup) {
        setData();
    }
    if (isPicking) {
        $('.pick').text('Pick for me');
    } else if ((unlockedChunks === 0 && selectedChunks === 0) || settings['randomStartAlways']) {
        $('.pick').text('Random Start?');
    } else {
        $('.pick').text('Pick Chunk');
    }
}

// Moves checked off challenges to completed
var completeChallenges = function(noCalc) {
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
    !onMobile && !noCalc && calcCurrentChallenges();
}

// Gets and displays info on the gievn quest
var getQuestInfo = function(quest) {
    $('.menu10').css('opacity', 1).show();
    quest = quest.replaceAll(/\%2H/g, "'").replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q');
    $('.questname-content').html(`<a class='link noscroll' href='${"https://oldschool.runescape.wiki/w/" + encodeURI(quest.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+'))}' target='_blank'>${quest.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+')}</a>`);
    $('.panel-questdata').empty();
    let unlocked = { ...possibleAreas };
    $('.unlocked').each(function() {
        unlocked[parseInt($($(this).children('.chunkId')[0]).text())] = true;
    });
    questChunks = [];
    chunkInfo['quests'][quest].split(', ').forEach(chunkId => {
        let chunkName = chunkId.replaceAll(/\%2E/g, '.').replaceAll(/\%2I/g, ',').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\%2J/g, '+');
        let aboveground = false;
        !!chunkInfo['chunks'][chunkName.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replace("'", "’")] && !!chunkInfo['chunks'][chunkName.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replace("'", "’")]['Nickname'] && (aboveground = true);
        if (aboveground) {
            questChunks.push(chunkName);
            chunkName = chunkInfo['chunks'][chunkName.replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q').replace("'", "’")]['Nickname'] + ' (' + chunkName + ')';
        }
        $('.panel-questdata').append(`<b class="noscroll"><div class="noscroll ${!!unlocked[chunkId] && ' + valid-chunk'}">` + `<span onclick="redirectPanel(encodeURI('` + chunkId.replaceAll(/\'/g, "%2H") + `'))"><i class="quest-icon fas fa-crosshairs"></i></span> ` + `<span class="noscroll ${aboveground && ' + click'}" ${aboveground && `onclick="scrollToChunk(${chunkId})"`}>` + chunkName + '</span></div></b>')
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
        $('.box:contains(' + id + ')').filter(function() { return parseInt($(this).children('.chunkId').text()) === parseInt(id); }).addClass('recent');
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
    infoLockedId = realName.toString().replaceAll(/\./g, '%2E').replaceAll(/\,/g, '%2I').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\+/g, '%2J').replaceAll(/\!/g, '%2Q');
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
        $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .menu10, .settings-menu, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, #outerImgDiv').hide();
        $('#home-menu').hide();
        $('#pin-menu').show();
        $('.mid-old').focus();
    } else if (mid === 'about') {
        atHome = true;
        $('.loading, .ui-loader-header').remove();
        $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .menu10, .settings-menu, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, #outerImgDiv').hide();
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
                $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .menu10, .settings-menu, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, #outerImgDiv').hide();
                $('.loading, .ui-loader-header').remove();
            }
            setupMap();
        });
    } else {
        atHome = true;
        $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .menu7, .menu8, .menu9, .menu10, .settings-menu, .topnav, #beta, .hiddenInfo, #entry-menu, #highscore-menu, #highscore-menu2, #import-menu, #help-menu, #outerImgDiv').hide();
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
    tasksPlus = codeItems['tasksPlus'];
    tools = codeItems['tools'];
    magicTools = codeItems['magicTools'];
    dropTables = codeItems['dropTables'];
    elementalStaves = codeItems['elementalStaves'];
    bossLogs = codeItems['bossLogs'];
    bossMonsters = codeItems['bossMonsters'];
    minigameShops = codeItems['minigameShops'];
    slayerTasks = codeItems['slayerTasks'];
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
            var rulesTemp = snap.val()['rules'] || {};
            randomLoot = snap.val()['randomLoot'] || {};
            var chunks = snap.val()['chunks'];
            recent = snap.val()['recent'] || [];
            recentTime = snap.val()['recentTime'] || [];
            chunkOrder = snap.val()['chunkOrder'] || [];
            friends = snap.val()['friends'] || {};
            settingsTemp['highvis'] = document.cookie.split(';').filter(function(item) {
                return item.indexOf('highvis=true') >= 0
            }).length > 0;
            settingsTemp['darkmode'] = document.cookie.split(';').filter(function(item) {
                return item.indexOf('darkmode=true') >= 0
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
            backloggedSources = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['backloggedSources'] ? snap.val()['chunkinfo']['backloggedSources'] : {};
            altChallenges = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['altChallenges'] ? snap.val()['chunkinfo']['altChallenges'] : {};
            manualMonsters = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['manualMonsters'] ? snap.val()['chunkinfo']['manualMonsters'] : {};
            slayerLocked = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['slayerLocked'] ? snap.val()['chunkinfo']['slayerLocked'] : null;
            passiveSkill = !!snap.val()['chunkinfo'] && !!snap.val()['chunkinfo']['passiveSkill'] ? snap.val()['chunkinfo']['passiveSkill'] : null;
            settingsTemp['highscoreEnabled'] && enableHighscore('startup');
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
            (!settingsTemp['patchNotes'] || (settingsTemp['patchNotes'] !== currentVersion)) && (patchNotesOpenSoon = true);

            if (settingsTemp['highscoreEnabled']) {
                userName = snap.val()['userName'];
                $('.highscoretoggle').html('Change chunk stats username<i class="pic fas fa-trophy"></i>');
            }

            // Rule extenders

            if (!rulesTemp.hasOwnProperty('Show Diary Tasks Any')) {
                rulesTemp['Show Diary Tasks Any'] = rulesTemp.hasOwnProperty('Skillcape') ? rulesTemp['Skillcape'] : false;
            }

            if (!rulesTemp.hasOwnProperty('Jars')) {
                rulesTemp['Jars'] = rulesTemp.hasOwnProperty('Pets') ? rulesTemp['Pets'] : false;
            }

            if (!rulesTemp.hasOwnProperty('InsidePOH Primary')) {
                rulesTemp['InsidePOH Primary'] = rulesTemp.hasOwnProperty('InsidePOH') ? rulesTemp['InsidePOH'] : false;
            }

            !!rulesTemp && Object.keys(rulesTemp).forEach(rule => {
                rules[rule] = rulesTemp[rule];
            });

            Object.keys(settingsTemp).forEach(setting => {
                settings[setting] = settingsTemp[setting];
            });
            toggleIds(settings['ids'], 'startup');
            toggleVisibility(settings['highvis'], 'startup');
            toggleDarkMode(settings['darkmode'], 'startup');
            toggleNeighbors(settings['neighbors'], 'startup');
            toggleRemove(settings['remove'], 'startup');
            toggleRoll2(settings['roll2'], 'startup');
            toggleUnpick(settings['unpick'], 'startup');
            toggleRecent(settings['recent'], 'startup');
            toggleChunkInfo(settings['info'], 'startup');
            toggleChunkTasks(settings['chunkTasks'], 'startup');
            toggleTaskSidebar(settings['taskSidebar'], 'startup');

            $('.box').removeClass('selected potential unlocked recent blacklisted').addClass('gray').css('border-width', 0);
            $('.label').remove();
            selectedChunks = 0;
            unlockedChunks = 0;
            selectedNum = 1;

            $('#chunkInfo1').text('Unlocked chunks: ' + unlockedChunks);
            $('#chunkInfo2').text('Selected chunks: ' + selectedChunks);
            chunks && chunks['potential'] && Object.keys(chunks['potential']).sort(function(a, b) { return b - a }).forEach(function(id) {
                picking = true;
                if (selectedNum > 999) {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('potential').removeClass('gray selected unlocked').append('<span draggable="false" class="label extralong">' + selectedNum++ + '</span>');
                    $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
                } else if (selectedNum > 99) {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('potential').removeClass('gray selected unlocked').append('<span draggable="false" class="label long">' + selectedNum++ + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
                } else {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('potential').removeClass('gray selected unlocked').append('<span draggable="false" class="label">' + selectedNum++ + '</span>');
                    $('.label').css('font-size', labelZoom + 'px');
                }
                $('.box.locked .icon').css('font-size', labelZoom * (.9) + 'px');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            });

            chunks && chunks['selected'] && Object.keys(chunks['selected']).sort(function(a, b) { return b - a }).forEach(function(id) {
                if (selectedNum > 999) {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('selected').removeClass('gray potential unlocked blacklisted').append('<span draggable="false" class="label extralong">' + selectedNum++ + '</span>');
                    $('.label.extralong').css('font-size', (labelZoom * (1 / 2)) + 'px');
                } else if (selectedNum > 99) {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('selected').removeClass('gray potential unlocked blacklisted').append('<span draggable="false" class="label long">' + selectedNum++ + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2 / 3)) + 'px');
                } else {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('selected').removeClass('gray potential unlocked blacklisted').append('<span draggable="false" class="label">' + selectedNum++ + '</span>');
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
                $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().addClass('blacklisted').removeClass('gray selected potential unlocked');
            });

            $('.chunk-sticker').remove();
            chunks && chunks['stickered'] && Object.keys(chunks['stickered']).forEach(function(id) {
                if (stickerChoices.includes(chunks['stickered'][id])) {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().append(`<span style='color:${(chunks.hasOwnProperty('stickeredColors') && chunks['stickeredColors'][id]) || settings['defaultStickerColor'] || '#000000'}' class='chunk-sticker permanent-sticker' onclick="openStickers(${id})"><i class="fas fa-${chunks['stickered'][id]}" style="transform: scaleX(-1)"></i>${chunks.hasOwnProperty('stickeredNotes') && chunks['stickeredNotes'].hasOwnProperty(id) && chunks['stickeredNotes'][id].length > 0 ? `<span class="tooltiptext-sticker">${chunks['stickeredNotes'][id]}</span>` : ''}</span>`);
                } else if (stickerChoicesOsrs.includes(chunks['stickered'][id])) {
                    $('.box > .chunkId:contains(' + id + ')').filter(function() { return parseInt($(this).text()) === parseInt(id); }).parent().append(`<span class='chunk-sticker permanent-sticker' onclick="openStickers(${id})"><img src="./resources/SVG/${chunks['stickered'][id]}-osrs.svg">${!!chunks['stickeredNotes'][id] && chunks['stickeredNotes'][id].length > 0 ? `<span class="tooltiptext-sticker">${chunks['stickeredNotes'][id]}</span>` : ''}</span>`);
                }
            });
            $('.chunk-sticker').css('font-size', fontZoom * (3 / 2) + 'px');
            $('.chunk-sticker > img').parent().css('width', fontZoom * (3 / 2) + 'px');

            stickered = (chunks ? chunks['stickered'] : {}) || {};
            stickeredNotes = (chunks ? chunks['stickeredNotes'] : {}) || {};
            stickeredColors = (chunks ? chunks['stickeredColors'] : {}) || {};

            mid === roll5Mid && $('.roll2').text('Roll 5');
            if (picking) {
                $('.unpick').css({ 'opacity': 0, 'cursor': 'default' }).prop('disabled', true).hide();
                $('.pick').text('Pick for me');
                $('.roll2').text('Unlock both');
                mid === roll5Mid && $('.roll2').text('Unlock all');
                isPicking = true;
            } else if ((unlockedChunks === 0 && selectedChunks === 0) || settings['randomStartAlways']) {
                $('.pick').text('Random Start?');
            }
            chunkBorders();
            chunkTasksOn && !onMobile && setCalculating('.panel-active');
            chunkTasksOn && !onMobile && calcCurrentChallenges();
            startup && center('quick');
            rulesModalOpen && showRules();
            if (!startup) {
                rules['Manually Complete Tasks'] && !viewOnly && !inEntry && !locked ? $('.open-complete-container').css('opacity', 1).show() : $('.open-complete-container').css('opacity', 0).hide();
            }
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
    document.cookie = "darkmode=" + darkMode;
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
                myRef.child('settings').update({ 'neighbors': autoSelectNeighbors, 'remove': autoRemoveSelected, 'roll2': roll2On, 'unpick': unpickOn, 'recent': recentOn, 'highscoreEnabled': highscoreEnabled, 'chunkTasks': chunkTasksOn, 'completedTaskColor': settings['completedTaskColor'], 'completedTaskStrikethrough': settings['completedTaskStrikethrough'], 'randomStartAlways': settings['randomStartAlways'], 'defaultStickerColor': settings['defaultStickerColor'], 'walkableRollable': settings['walkableRollable'], 'cinematicRoll': settings['cinematicRoll'], 'taskSidebar': settings['taskSidebar'] });
                Object.keys(rules).forEach(rule => {
                    if (rules[rule] === undefined) {
                        rules[rule] = false;
                    }
                });
                myRef.update({ rules });
                if (!helpMenuOpen && !helpMenuOpenSoon) {
                    myRef.child('settings').update({ 'help': false });
                }
                if (!patchNotesOpen && !patchNotesOpenSoon) {
                    myRef.child('settings').update({ 'patchNotes': currentVersion });
                }
                myRef.update({ recent });
                myRef.update({ recentTime });
                myRef.update({ randomLoot });
                myRef.update({ friends });
                myRef.child('chunkinfo').update({ checkedChallenges });
                myRef.child('chunkinfo').update({ completedChallenges });
                myRef.child('chunkinfo').update({ backlog });
                myRef.child('chunkinfo').update({ possibleAreas });
                myRef.child('chunkinfo').update({ manualTasks });
                myRef.child('chunkinfo').update({ manualEquipment });
                myRef.child('chunkinfo').update({ backloggedSources });
                myRef.child('chunkinfo').update({ altChallenges });
                myRef.child('chunkinfo').update({ manualMonsters });
                myRef.child('chunkinfo').update({ slayerLocked });
                myRef.child('chunkinfo').update({ passiveSkill });

                var tempJson = {};
                Array.prototype.forEach.call(document.getElementsByClassName('unlocked'), function(el) {
                    tempJson[el.childNodes[0].childNodes[0].nodeValue] = el.childNodes[0].childNodes[0].nodeValue;
                });
                myRef.child('chunks/unlocked').set(tempJson);
                let walkableUnlockedChunks;
                if (highscoreEnabled || true) {
                    walkableUnlockedChunks = 0;
                    chunkInfo['walkableChunks'].forEach(chunkId => {
                        if (tempJson.hasOwnProperty(chunkId)) {
                            walkableUnlockedChunks++;
                        }
                    });
                }

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

                myRef.child('chunks/stickered').set(stickered);
                myRef.child('chunks/stickeredNotes').set(stickeredNotes);
                myRef.child('chunks/stickeredColors').set(stickeredColors);

                highscoreEnabled && databaseRef.child('highscores/skills/Unlocked Chunks/' + mid).update({
                    mid: mid,
                    name: userName.toLowerCase(),
                    score: walkableUnlockedChunks,
                });
            }
        });
    } else if (signedIn && !firebase.auth().currentUser) {
        firebase.auth().signInWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then(function() {
            myRef.child('settings').update({ 'neighbors': autoSelectNeighbors, 'remove': autoRemoveSelected, 'roll2': roll2On, 'unpick': unpickOn, 'recent': recentOn, 'highscoreEnabled': highscoreEnabled, 'chunkTasks': chunkTasksOn, 'completedTaskColor': settings['completedTaskColor'], 'completedTaskStrikethrough': settings['completedTaskStrikethrough'], 'taskSidebar': settings['taskSidebar'] });
            Object.keys(rules).forEach(rule => {
                if (rules[rule] === undefined) {
                    rules[rule] = false;
                }
            });
            myRef.update({ rules });
            if (!helpMenuOpen && !helpMenuOpenSoon) {
                myRef.child('settings').update({ 'help': false });
            }
            if (!patchNotesOpen && !patchNotesOpenSoon) {
                myRef.child('settings').update({ 'patchNotes': currentVersion });
            }
            myRef.update({ recent });
            myRef.update({ recentTime });
            myRef.update({ randomLoot });
            myRef.update({ friends });
            myRef.child('chunkinfo').update({ checkedChallenges });
            myRef.child('chunkinfo').update({ completedChallenges });
            myRef.child('chunkinfo').update({ backlog });
            myRef.child('chunkinfo').update({ possibleAreas });
            myRef.child('chunkinfo').update({ manualTasks });
            myRef.child('chunkinfo').update({ manualEquipment });
            myRef.child('chunkinfo').update({ backloggedSources });
            myRef.child('chunkinfo').update({ altChallenges });
            myRef.child('chunkinfo').update({ manualMonsters });
            myRef.child('chunkinfo').update({ slayerLocked });
            myRef.child('chunkinfo').update({ passiveSkill });

            var tempJson = {};
            Array.prototype.forEach.call(document.getElementsByClassName('unlocked'), function(el) {
                tempJson[el.childNodes[0].childNodes[0].nodeValue] = el.childNodes[0].childNodes[0].nodeValue;
            });
            myRef.child('chunks/unlocked').set(tempJson);
            let walkableUnlockedChunks;
            if (highscoreEnabled || true) {
                walkableUnlockedChunks = 0;
                chunkInfo['walkableChunks'].forEach(chunkId => {
                    if (tempJson.hasOwnProperty(chunkId)) {
                        walkableUnlockedChunks++;
                    }
                });
            }

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

            myRef.child('chunks/stickered').set(stickered);
            myRef.child('chunks/stickeredNotes').set(stickeredNotes);
            myRef.child('chunks/stickeredColors').set(stickeredColors);

            highscoreEnabled && databaseRef.child('highscores/skills/Unlocked Chunks/' + mid).update({
                mid: mid,
                name: userName.toLowerCase(),
                score: walkableUnlockedChunks,
            });
        }).catch(function(error) { console.log(error) });
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

    var margins = [450, 400, 400, 400];
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
    databaseRef.child('mapids').once('value', function(snap) {
        while (badNums) {
            char1 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            char2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            char3 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            char4 = rollCount > 10 ? String.fromCharCode(97 + Math.floor(Math.random() * 26)) : '';
            charSet = char1 + char2 + char3 + char4;
            !snap.val()[charSet] && (badNums = false);
            rollCount++;
        }
        mid = charSet;
        firebase.auth().createUserWithEmailAndPassword('sourcechunk+' + mid + '@yandex.com', savedPin + mid).then((userCredential) => {
            signedIn = true;
            userCredential.user.updateProfile({
                displayName: mid
            }).then(() => {
                databaseRef.child('template').once('value', function(snap2) {
                    var temp = snap2.val();
                    temp.uid = userCredential.user.uid;
                    databaseRef.child('maps/' + charSet).set(temp);
                    databaseRef.child('mapids/' + charSet).set(true);
                });
            });
        }).catch((error) => { console.log(error) });

        $('#newmid').text(charSet.toUpperCase());
        $('.link').prop('href', 'https://source-chunk.github.io/chunk-picker-v2/?' + charSet).text('https://source-chunk.github.io/chunk-picker-v2/?' + charSet);
    }).catch((error) => { console.log(error) });
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

// Checks if the map id is good and there is a friend name
var checkIfGoodFriend = function() {
    if (midFriendGood && nameFriendGood) {
        $('#submit-friend-button').prop('disabled', false);
    } else {
        $('#submit-friend-button').prop('disabled', true);
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
                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .friendslist').css('opacity', 0).show();
                    roll2On && $('.roll2').css('opacity', 0).show();
                    !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                    $('.open-manual-outer-container').css('opacity', 0).show();
                    rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                    $('.lock-box').animate({ 'opacity': 0 });
                    setTimeout(function() {
                        $('.lock-box').css('opacity', 1).hide();
                        $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .friendslist').animate({ 'opacity': 1 });
                        roll2On && $('.roll2').animate({ 'opacity': 1 });
                        !isPicking && unpickOn && $('.unpick').animate({ 'opacity': 1 });
                        $('.open-manual-outer-container').animate({ 'opacity': 1 });
                        rules['Manually Complete Tasks'] && $('.open-complete-container').animate({ 'opacity': 1 });
                        $('#lock-unlock').prop('disabled', false).html('Unlock');
                        locked = false;
                        helpMenuOpenSoon && helpFunc();
                        patchNotesOpenSoon && openPatchNotesModal();
                        !onMobile && unlockChallenges();
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
                            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .friendslist').css('opacity', 0).show();
                            roll2On && $('.roll2').css('opacity', 0).show();
                            !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                            $('.open-manual-outer-container').css('opacity', 0).show();
                            rules['Manually Complete Tasks'] && $('.open-complete-container').css('opacity', 0).show();
                            $('.lock-box').animate({ 'opacity': 0 });
                            setTimeout(function() {
                                $('.lock-box').css('opacity', 1).hide();
                                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .settingstoggle, .friendslist').animate({ 'opacity': 1 });
                                roll2On && $('.roll2').animate({ 'opacity': 1 });
                                !isPicking && unpickOn && $('.unpick').animate({ 'opacity': 1 });
                                $('.open-manual-outer-container').animate({ 'opacity': 1 });
                                rules['Manually Complete Tasks'] && $('.open-complete-container').animate({ 'opacity': 1 });
                                $('#lock-unlock').prop('disabled', false).html('Unlock');
                                locked = false;
                                helpMenuOpenSoon && helpFunc();
                                patchNotesOpenSoon && openPatchNotesModal();
                                !onMobile && unlockChallenges();
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
    $('.lock-box').animate({ 'opacity': 0 });
    $('.lock-' + (locked ? 'closed' : 'opened')).css('opacity', 0).show();
    setTimeout(function() {
        $('.lock-box').css('opacity', 1).hide();
        $('.lock-' + (locked ? 'closed' : 'opened')).animate({ 'opacity': 1 });
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
    for (var i = 0; i < numlen; i++) {
        val = val * srclen + srctable.indexOf(src.charAt(i));
    }
    if (val < 0) {
        return 0;
    }
    var r = val % destlen;
    var res = desttable.charAt(r);
    var q = Math.floor(val / destlen);
    while (q) {
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