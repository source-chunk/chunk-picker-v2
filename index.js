/* 
 * Created by Source Link AKA Source Chunk
 * Revision of an idea by Amehzyn
 * With help from Slay to Stay for chunk Ids and Amehzyn for smoother zooming/url decoding
 * 02/20/2021
 */

var onMobile = typeof window.orientation !== 'undefined';                       // Is user on a mobile device
var viewOnly = false;                                                           // View only mode active
var isPicking = false;                                                          // Has the user just rolled 2 chunks and is currently picking
var autoSelectNeighbors = false;                                                // Toggle state for select neighbors button
var autoRemoveSelected = false;                                                 // Toggle state for remove selected button
var showChunkIds = false;                                                       // Toggle state for show chunk ids button
var clicked = false;                                                            // Is mouse being held down
var screenshotMode = false;                                                     // Is screenshot mode on
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
var extraOutputItems = {};                                                      // List of extra items obtainable from skill output

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
    completed: false,
    rules: false
};                                                                              // JSON showing state of which challenge panels are open/closed

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
let dropTables = {};
let elementalStaves = {};

var hammertime = new Hammer(document.getElementsByClassName('body')[0]);        // Initialize Hammerjs [Mobile]
hammertime.get('pinch').set({ enable: true });


//TEST VARS

let rareDropNum = "1/1000";
let rules = {
    "Skillcape": false,
    "Rare Drop": false,
    "Pouch": false,
    "InsidePOH": false,
    "Construction Milestone": false,
    "Boss": true,
    "Slayer Equipment": false,
    "Extra implings": false,
    "Normal Farming": false,
    "Raking": false,
    "CoX": false,
    "Tithe Farm": false,
    "Kill X": false,
    "Sorceress's Garden": false,
}
let ruleNames = {
    "Skillcape": "Must obtain skillcapes",
    "Rare Drop": "Drops greater than " + rareDropNum + " can count for chunk tasks",
    "Pouch": "Using Runecraft pouches count as chunk tasks",
    "InsidePOH": "Construction tasks can be pulled from crafting furniture inside a POH",
    "Construction Milestone": "Construction tasks can be pulled from various milestone tasks",
    "Boss": "Killing a boss can be used for a chunk task, either from an item the boss drops or otherwise",
    "Slayer Equipment": "Using Slayer equipment can count for chunk tasks",
    "Extra implings": "Include implings that have non-guaranteed spawns in Puro-Puro as chunk tasks",
    "Normal Farming": "Allow normal farming to count as a primary method for training",
    "Raking": "Allow raking patches to count as a primary method for training",
    "CoX": "Allow methods inside the Chambers of Xeric to count for chunk tasks/primary training methods",
    "Tithe Farm": "Allow Tithe Farm to count as a primary method of training",
    "Kill X": "Kill X-amount of every unique monster",
    "Sorceress's Garden": "Allow Sorceress's Garden to count as primary training for Farming"
}
let maybePrimary = [
    "Normal Farming",
    "Raking"
];
let globalValids = {};
let challengeArr = [];
let checkedChallenges = {};
let backlog = {
};
let completedChallenges = {
};
let possibleAreas = {
}
let areasStructure = {
}
let highestCurrent = {
};
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
}
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
    "Combat": false
}
let monsterExists = false;
let questChunks = [];
let manualModalOpen = false;
let manualTasks = {};
let fullChallengeArr = {};

// ----------------------------------------------------------

// Event Listeners

// ----------------------------------------------------------

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
    if (onMobile && !atHome && !inEntry && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !manualModalOpen) {
        clickX = ev.changedPointers[0].pageX;
        clickY = ev.changedPointers[0].pageY;
    }
});

// [Mobile] Mobile equivalent to 'mouseup', ends drag sequence
hammertime.on('panend', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !manualModalOpen) {
        prevScrollLeft = prevScrollLeft + scrollLeft;
        prevScrollTop = prevScrollTop + scrollTop;
    }
});

// [Mobile] Mobile equivalent to 'mousemove', determines amount dragged since last trigger
hammertime.on('panleft panright panup pandown', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !manualModalOpen) {
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
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 4) {
            $(this).val(prevValuePinNew);
        } else {
            prevValuePinNew = e.target.value;
            if (e.target.value.length === 4) {
                $('#create2').prop('disabled', false);
            } else {
                $('#create2').prop('disabled', true);
            }
        }
    });
    
    $('.pin.old').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 4) {
            $(this).val(prevValuePinOld);
        } else {
            prevValuePinOld = e.target.value;
            if (e.target.value.length === 4 || e.target.value.length === 0) {
                pinGood = true;
                checkIfGood();
            } else {
                pinGood = false;
                $('#access').prop('disabled', true);
            }
        }
    });
    
    $('.lock-pin').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 4) {
            $(this).val(prevValueLockPin);
        } else {
            prevValueLockPin = e.target.value;
            if (e.target.value.length === 4) {
                $('#lock-unlock').prop('disabled', false);
                $('.lock-pin').removeClass('wrong');
            } else {
                $('#lock-unlock').prop('disabled', true);
            }
        }
    });

    $('.pin.entry').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 4) {
            $(this).val(prevValueLockPin);
        } else {
            prevValueLockPin = e.target.value;
            if (e.target.value.length === 4) {
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
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 4) {
            $(this).val(prevValuePinOld2);
        } else {
            prevValuePinOld2 = e.target.value;
            if (e.target.value.length === 4) {
                pin2Good = true;
                checkIfGood2();
            } else {
                pin2Good = false;
                $('#change-pin').prop('disabled', true);
            }
        }
    });

    $('.pin.old2.second').on('input', function(e) {
        if (!e.target.value.match(/^[a-z0-9]*$/i) || e.target.value.length > 4) {
            $(this).val(prevValuePinOld2Second);
        } else {
            prevValuePinOld2Second = e.target.value;
            if (e.target.value.length === 4) {
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
        $(this).removeClass('zmdi-lock').addClass('zmdi-lock-open');
    }, function () {
        $(this).removeClass('zmdi-lock-open').addClass('zmdi-lock');
    });
});

// Credit to Amehzyn
// Handles zooming
$('.body').on('scroll mousewheel DOMMouseScroll', function(e) {
    if (e.target.className.split(' ').includes('panel') || e.target.className.split(' ').includes('link') || e.target.className.split(' ').includes('noscroll')) {
        $('body').scrollTop(0);
        return;
    } else if (atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen || e.target.className.split(' ').includes('noscrollhard')) {
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
    $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
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
            settings();
        } else if ((e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) && !importMenuOpen && !highscoreMenuOpen && !helpMenuOpen && !manualModalOpen) {
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
        if (e.button !== 0 || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen) {
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
        if (e.button !== 0 || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen) {
            return;
        }
        clicked = true;
        moved = false;
        movedNum = 0;
        clickX = e.pageX;
        clickY = e.pageY;
    },
    'mouseup': function(e) {
        let tempClicked = clicked;
        if ((e.button !== 0 && e.button !== 2) || atHome || inEntry || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen) {
            return;
        } else if (e.button === 2) {
            if ($(e.target).hasClass('box')) {
                if (infoLockedId === $(e.target).children()[0].innerHTML) {
                    infoLockedId = -1;
                    $(e.target).removeClass('locked');
                } else {
                    $('.box > .chunkId:contains(' + infoLockedId + ')').parent().removeClass('locked');
                    infoLockedId = $(e.target).children()[0].innerHTML;
                    $(e.target).addClass('locked');
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
            if (locked) {
                if (!tempClicked) {
                    return;
                }
                $('.outer').css('cursor', 'default');
                if (lockBoxOpen) {
                    closePinBox();
                }
                $('.lock-closed').addClass('animated shake zmdi-hc-5x').removeClass('zmdi-hc-3x').css({'color': 'rgb(200, 75, 75)'});
                setTimeout(function() {
                    $('.lock-closed').removeClass('animated shake zmdi-hc-5x').addClass('zmdi-hc-3x').css({'color': 'black'});
                }, 500);
                return;
            } else if (settingsOpen && !screenshotMode) {
                settings();
                return;
            }
            if ($(e.target).hasClass('gray')) {
                if (selectedNum > 99) {
                    $(e.target).addClass('selected').removeClass('gray').append('<span class="label long">' + selectedNum + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
                } else {
                    $(e.target).addClass('selected').removeClass('gray').append('<span class="label">' + selectedNum + '</span>');
                    $('.label').css('font-size', labelZoom + 'px');
                }
                selectedNum++;
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            } else if ($(e.target).hasClass('selected')) {
                fixNums($($(e.target).children()[1]).text());
                $(e.target).addClass('unlocked').removeClass('selected').empty().append("<span class='chunkId'>" + (Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex) + "</span>");
                $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
                $('.panel-active').html('Calculating...');
                challengePanelVis['active'] && toggleChallengesPanel('active');
            } else if ($(e.target).hasClass('potential')) {
                fixNums($($(e.target).children()[1]).text());
                $(e.target).addClass('unlocked').removeClass('potential').empty().append("<span class='chunkId'>" + (Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex) + "</span>");
                $('.potential > .label').css('color', 'white');
                $('.potential').addClass('selected').removeClass('potential recent');
                autoSelectNeighbors && selectNeighbors(e.target);
                autoRemoveSelected && $('.selected').addClass('gray').removeClass('selected').empty().append("<span class='chunkId'>" + (Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex) + "</span>") && (selectedChunks = 1) && (selectedNum = 1);
                $('.pick').text('Pick Chunk');
                roll2On && $('.roll2').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
                unpickOn && $('.unpick').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
                isPicking = false;
                $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
                let tempChunk1;
                let tempChunk2;
                let tempChunkTime1;
                let tempChunkTime2;
                signedIn && firebase.auth().signInAnonymously().then(function() {
                    myRef.child('chunkOrder').child(new Date().getTime()).set((Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex));
                }).catch(function(error) {console.log(error)});
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
                $('.panel-active').html('Calculating...');
                challengePanelVis['active'] && toggleChallengesPanel('active');
            } else if ($(e.target).hasClass('recent')) {
                // ----
            } else {
                $(e.target).addClass('gray').removeClass('unlocked').css('border-width', 0);
                $('#chunkInfo1').text('Unlocked chunks: ' + --unlockedChunks);
                $('.panel-active').html('Calculating...');
                challengePanelVis['active'] && toggleChallengesPanel('active');
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
    $('.label.long').css('font-size', (labelZoom *(2/3)) + 'px');
}

// Pick button: picks a random chunk from selected/potential
var pick = function() {
    if (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen || $('.selected').length < 1) {
        return;
    }
    var el;
    var rand;
    var sNum;
    if (!isPicking) {
        el = $('.selected');
        rand = Math.floor(Math.random() * el.length);
        sNum = $($(el[rand]).children()[1]).text();
        $(el[rand]).addClass('unlocked recent').removeClass('selected').empty().append("<span class='chunkId'>" + (Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex) + "</span>");
    } else {
        el = $('.potential');
        var rand = Math.floor(Math.random() * el.length);
        sNum = $($(el[rand]).children()[1]).text();
        $(el[rand]).addClass('unlocked recent').removeClass('potential').empty().append("<span class='chunkId'>" + (Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex) + "</span>");
        $('.potential > .label').css('color', 'white');
        $('.potential').addClass('selected').removeClass('potential recent');
        isPicking = false;
        $('.pick').text('Pick Chunk');
        roll2On && $('.roll2').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
        unpickOn && $('.unpick').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
    }
    fixNums(sNum);
    autoSelectNeighbors && selectNeighbors(el[rand]);
    autoRemoveSelected && $('.selected').addClass('gray').removeClass('selected').empty().append("<span class='chunkId'>" + (Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex) + "</span>") && (selectedChunks = 1) && (selectedNum = 1);
    $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
    $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
    scrollToPos(parseInt($(el[rand]).attr('id')) % rowSize, Math.floor(parseInt($(el[rand]).attr('id')) / rowSize), 0, 0, false);
    !showChunkIds && $('.chunkId').hide();
    let tempChunk1;
    let tempChunk2;
    let tempChunkTime1;
    let tempChunkTime2;
    signedIn && firebase.auth().signInAnonymously().then(function() {
        myRef.child('chunkOrder').child(new Date().getTime()).set(parseInt($(el[rand]).text()));
    }).catch(function(error) {console.log(error)});
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
    $('.panel-active').html('Calculating...');
    challengePanelVis['active'] && toggleChallengesPanel('active');
    setData();
    chunkBorders();
}

// Roll 2 button: rolls 2 chunks from all selected chunks
var roll2 = function() {
    if (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen || $('.selected').length < 1) {
        return;
    }
    isPicking = true;
    var el = $('.selected');
    var rand;
    if (el.length > 0) {
        $('.roll2, .unpick').css({'opacity': 0, 'cursor': 'default'}).prop('disabled', true).hide();
        $('.pick').text('Pick for me');
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
var toggleNeighbors = function(extra) {
    if (locked && extra !== 'startup') {
        return;
    }
    autoSelectNeighbors = !autoSelectNeighbors;
    $('.toggleNeighbors').toggleClass('item-off item-on');
    $('.toggleNeighbors > .pic').toggleClass('zmdi-plus zmdi-minus');
    if (autoRemoveSelected && autoSelectNeighbors) {
        toggleRemove();
    }
    extra !== 'startup' && !locked && setData();
}

// Toggle functionality for if other selected chunks are set to unlocked after chunk pick
var toggleRemove = function(extra) {
    if (locked && extra !== 'startup') {
        return;
    }
    autoRemoveSelected = !autoRemoveSelected;
    $('.toggleRemove').toggleClass('item-off item-on');
    $('.toggleRemove > .pic').toggleClass('zmdi-plus zmdi-minus');
    if (autoSelectNeighbors && autoRemoveSelected) {
        toggleNeighbors();
    }
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
    $('.import').hide();
    importMenuOpen = true;
    $('.import').animate({'opacity': 0});
    $('#import-menu').css('opacity', 1).show();
    setTimeout(function() {
        $('.import').css('opacity', 1).hide();
    }, 500);
}

// Checks if URL is formatted correctly, then imports it into the map
var importFromURL = function() {
    $('#import2').prop('disabled', true).html('<i class="spin zmdi zmdi-spinner"></i>');
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
                $('#' + id).addClass('selected').removeClass('gray potential unlocked').append('<span class="label">' + selectedNum++ + '</span>');
                $('.label').css('font-size', labelZoom + 'px');
                $('.label').css('font-size', (labelZoom * (2/3)) + 'px');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            });

            unlocked && unlocked.forEach(function(id) {
                while (id.startsWith('0') && id.length > 1) {
                    id = id.substr(1);
                }
                $('#' + id).addClass('unlocked').removeClass('gray selected potential');
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
    $('.import').css('opacity', 0).show();
    $('.import').animate({'opacity': 1});
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
    settings();
}

// Sets username for the highscores
var highscoreOptIn = function() {
    $('#highscoreoptin').prop('disabled', true).html('<i class="spin zmdi zmdi-spinner"></i>');
    let oldUsername = userName;
    userName = $('.username').val();
    setTimeout(function() {
        setUsername(oldUsername);
        $('.highscoretoggle').text('Change highscores username');
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
    var pin = $('.lock-pin').val();
    myRef.once('value', function(snap) {
        changeLocked(!(snap.val() && snap.val()['pin'] === pin));
    });
}

// Confirms if the pin is entered correctly in the entry menu, and acts accordingly
var unlockEntry = function() {
    var pin = $('.pin.entry').val();
    myRef.once('value', function(snap) {
        $('#unlock-entry').prop('disabled', true).html('<i class="spin zmdi zmdi-spinner"></i>');
        setTimeout(function() {
            if ((snap.val() && snap.val()['pin'] !== pin)) {
                $('.pin.entry').addClass('animated shake wrong').select();
                $('#unlock-entry').prop('disabled', true).html('Unlock');
            } else {
                firebase.auth().signInAnonymously().then(function() {signedIn = true}).catch(function(error) {console.log(error)});
                $('.center').css('margin-top', '15px');
                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .taskstoggle, .open-manual-container').css('opacity', 0).show();
                !isPicking && roll2On && $('.roll2').css('opacity', 0).show();
                !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                $('#entry-menu').animate({'opacity': 0});
                setTimeout(function() {
                    $('#entry-menu').css('opacity', 1).hide();
                    $('.pin.entry').val('');
                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .taskstoggle, .open-manual-container').animate({'opacity': 1});
                    !isPicking && roll2On && $('.roll2').animate({'opacity': 1});
                    !isPicking && unpickOn && $('.unpick').animate({'opacity': 1});
                    $('#unlock-entry').prop('disabled', false).html('Unlock');
                    locked = false;
                    inEntry = false;
                    helpMenuOpenSoon && helpFunc();
                    unlockChallenges();
                }, 500);
            }
            setTimeout(function() {
                $('.pin.entry').removeClass('animated shake');
            }, 500);
        }, 1000);
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
        $('#create2').prop('disabled', true).html('<i class="spin zmdi zmdi-spinner"></i>');
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
    $('#access').prop('disabled', true).html('<i class="spin zmdi zmdi-spinner"></i>');
    mid = $('.mid').removeClass('wrong').val().toLowerCase();
    var pin = $('.pin.old').removeClass('wrong').val();
    databaseRef.child('maps/' + mid).once('value', function(snap) {
        if (!snap.val()) {
            setTimeout(function() {
                $('.mid-err').css('visibility', 'visible');
                $('.mid').addClass('wrong').select();
                $('#access').text('Access my map');
            }, 1000);
            return;
        }
        if (pin && snap.val()['pin'] !== pin) {
            setTimeout(function() {
                $('.pin-err').css('visibility', 'visible');
                $('.pin.old').addClass('wrong').select();
                $('#access').text('Access my map');
            }, 1000);
            return;
        }
        if (pin) {
            firebase.auth().signInAnonymously().then(function() {signedIn = true}).catch(function(error) {console.log(error)});
            window.history.replaceState(window.location.href.split('?')[0], mid.toUpperCase() + ' - Chunk Picker V2', '?' + mid);
            document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker V2';
            $('#entry-menu').hide();
            $('.lock-opened').show();
            $('.lock-closed').hide();
            locked = false;
            helpMenuOpenSoon && helpFunc();
        } else {
            window.history.replaceState(window.location.href.split('?')[0], mid.toUpperCase() + ' - Chunk Picker V2', '?' + mid);
            document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker V2';
            $('.lock-closed, .lock-opened').hide();
            locked = true;
            inEntry = true;
        }
        myRef = firebase.database().ref('maps/' + mid);
        atHome = false;
        $('.loading').show();
        $('#page2b').hide();
        $('.background-img').hide();
        setupMap();
    });
}

// Confirms that the map id exists, and that the pin is correct for that map id (if pin is filled in), then changes the pin, and then finally advances to the map if all is correct
var changePin = function() {
    $('#change-pin').prop('disabled', true).html('<i class="spin zmdi zmdi-spinner"></i>');
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
        if (pinOld && snap.val()['pin'] !== pinOld) {
            setTimeout(function() {
                $('.pin-err').css('visibility', 'visible');
                $('.pin.old2.first').addClass('wrong').select();
                $('#change-pin').text('Change PIN');
            }, 1000);
            return;
        }
        firebase.auth().signInAnonymously().then(function() {
            signedIn = true;
            myRef = firebase.database().ref('maps/' + mid);
            myRef.child('pin').set(pinNew);
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
        }).catch(function(error) {console.log(error)});
    });
}

// Unpicks a random unlocked chunk
var unpick = function() {
    if (locked || importMenuOpen || highscoreMenuOpen || helpMenuOpen || manualModalOpen || $('.unlocked').length < 1) {
        return;
    }
    var el = $('.unlocked');
    if (el.length <= 0) {
        return;
    }
    var rand = Math.floor(Math.random() * el.length);
    if (selectedNum > 99) {
        $(el[rand]).addClass('selected').removeClass('unlocked').addClass('recent').empty().append("<span class='chunkId'>" + (Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex) + "</span>").append('<span class="label long">' + selectedNum + '</span>');
        $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
    } else {
        $(el[rand]).addClass('selected').removeClass('unlocked').addClass('recent').empty().append("<span class='chunkId'>" + (Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex) + "</span>").append('<span class="label">' + selectedNum + '</span>');
        $('.label').css('font-size', labelZoom + 'px');
    }
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
var settings = function() {
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

// Toggles high visibility mode
var toggleVisibility = function() {
    highVisibilityMode = !highVisibilityMode;
    setCookies();
    highVisibilityMode ? $('.box').addClass('visible') : $('.box').removeClass('visible');
    $('.visibilitytoggle').toggleClass('item-off item-on');
}

// Toggles the chunk info panel
var toggleChunkInfo = function(extra) {
    chunkInfoOn = !chunkInfoOn;
    setCookies();
    chunkInfoOn ? $('.menu8').show() : $('.menu8').hide();
    $('.hiddenInfo').hide();
    extra !== 'startup' && $('menu8').css('opacity', 1);
    $('.infotoggle').toggleClass('item-off item-on');
    $('.infotoggle > .pic').toggleClass('zmdi-plus zmdi-minus');
    updateChunkInfo();
}

// Temporarily hides chunk info panel
var hideChunkInfo = function(extra) {
    chunkInfoOn && $('.menu8').hide();
    chunkInfoOn && $('.hiddenInfo').show();
    $('.box.locked').removeClass('locked');
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
var toggleChunkTasks = function(extra) {
    chunkTasksOn = !chunkTasksOn;
    chunkTasksOn ? $('.menu9').show() : $('.menu9').hide();
    extra !== 'startup' && $('menu9').css('opacity', 1);
    $('.taskstoggle').toggleClass('item-off item-on');
    $('.taskstoggle > .pic').toggleClass('zmdi-plus zmdi-minus');
    extra !== 'startup' && !locked && setData();
}

// Toggles the visibility of the roll2 button
var toggleRoll2 = function(extra) {
    roll2On = !roll2On;
    roll2On && !isPicking ? $('.roll2').show() : $('.roll2').hide();
    extra !== 'startup' && $('.roll2').css('opacity', 1);
    $('.roll2toggle').toggleClass('item-off item-on');
    $('.roll2toggle > .pic').toggleClass('zmdi-plus zmdi-minus');
    extra !== 'startup' && !locked && setData();
}

// Toggles the visibility of the unpick button
var toggleUnpick = function(extra) {
    unpickOn = !unpickOn;
    unpickOn && !isPicking ? $('.unpick').show() : $('.unpick').hide();
    extra !== 'startup' && $('.unpick').css('opacity', 1);
    $('.unpicktoggle').toggleClass('item-off item-on');
    $('.unpicktoggle > .pic').toggleClass('zmdi-plus zmdi-minus');
    extra !== 'startup' && !locked && setData();
}

// Toggles the visibility of the recent chunks section
var toggleRecent = function(extra) {
    recentOn = !recentOn;
    recentOn ? $('.menu7').show() : $('.menu7').hide();
    extra !== 'startup' && $('.menu7').css('opacity', 1);
    $('.recenttoggle').toggleClass('item-off item-on');
    $('.recenttoggle > .pic').toggleClass('zmdi-plus zmdi-minus');
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
    let box = $('.box:contains(' + id + ')').addClass('recent');
    scrollToPos(parseInt(box.attr('id')) % rowSize, Math.floor(parseInt(box.attr('id')) / rowSize), 0, 0, false);
}

// Toggles the accordion panels of the chunk info panel
var toggleInfoPanel = function(pnl) {
    infoPanelVis[pnl] = !infoPanelVis[pnl];
    Object.keys(infoPanelVis).forEach(uniqKey => {
        if (uniqKey === pnl) {
            infoPanelVis[pnl] ? $('.panel-' + pnl).addClass('visible') : $('.panel-' + pnl).removeClass('visible');
            infoPanelVis[pnl] ? $('#info' + uniqKey + ' > .exp').html('<i class="pic zmdi zmdi-minus zmdi-hc-lg"></i>') : $('#info' + uniqKey + ' > .exp').html('<i class="pic zmdi zmdi-plus zmdi-hc-lg"></i>');
            if (infoPanelVis[pnl] && pnl === 'challenges' && $('.panel-challenges').html() === 'Calculating...') {
                setTimeout(function() {
                    let challengeStr = calcFutureChallenges();
                    $('.panel-challenges').html(challengeStr.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') || 'None');
                }, 10);
            }
        } else {
            $('.panel-' + uniqKey).removeClass('visible');
            $('#info' + uniqKey + ' > .exp').html('<i class="pic zmdi zmdi-plus zmdi-hc-lg"></i>');
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
            challengePanelVis[pnl] ? $('#challenges' + uniqKey + ' > .exp').html('<i class="pic zmdi zmdi-minus zmdi-hc-lg"></i>') : $('#challenges' + uniqKey + ' > .exp').html('<i class="pic zmdi zmdi-plus zmdi-hc-lg"></i>');
            if (challengePanelVis[pnl] && pnl === 'active' && $('.panel-active').html() === 'Calculating...') {
                setTimeout(function() {
                    calcCurrentChallenges();
                }, 10);
            } // TEMP
        } else {
            $('.panel-' + uniqKey).removeClass('visible');
            $('#challenges' + uniqKey + ' > .exp').html('<i class="pic zmdi zmdi-plus zmdi-hc-lg"></i>');
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
        $('.menu2, .menu6, .menu7, .menu8, .menu9, .menu10, .settings').hide().remove();
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
    firebase.auth().signOut();
    if (!atHome) {
        setTimeout(doneLoading, 1500);
        $('.body').show();
        $('#page1, #page1extra, #import-menu, #highscore-menu, #highscore-menu2, #help-menu').hide();
        if (locked) {
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .taskstoggle, .open-manual-container').css('opacity', 0).hide();
            !isPicking && $('.roll2, .unpick').css('opacity', 0).hide();
            $('.center').css('margin-top', '0px');
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            $('.pin.entry').focus();
        } else {
            $('.center').css('margin-top', '15px');
        }
        if (locked === undefined || locked) {
            locked = true;
            $('.lock-closed, .lock-opened').hide();
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .highscoretoggle, .taskstoggle, .open-manual-container').css('opacity', 0).hide();
            $('.center').css('margin-top', '0px');
            !isPicking && $('.roll2, .unpick').css('opacity', 0).hide();
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            $('.pin.entry').focus();
        }
        for (var i = 0; i < fullSize; i++) {
            $('.btnDiv').append(`<div id=${i} class='box gray'><span class='chunkId'>${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex}</span></div>`);
        }
        $('.box').css('font-size', fontZoom + 'px');
        $('.label').css('font-size', labelZoom + 'px');
        $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
        !mid && (mid = window.location.href.split('?')[1]);
        document.title = mid.split('-')[0].toUpperCase() + ' - Chunk Picker V2';
        $('.toptitle2').text(mid.split('-')[0].toUpperCase());
        toggleChallengesPanel('active');
        loadData();
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
                if (selectedNum > 99) {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label long">' + selectedNum + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
                } else {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label">' + selectedNum + '</span>');
                    $('.label').css('font-size', labelZoom + 'px'); 
                }
                selectedNum++;
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            }
        } else {
            num = ((i - 3) * 2 + 1) * rowSize;
            if (parseInt(el.id) + num >= 0 && parseInt(el.id) + num < fullSize && $(`#${parseInt(el.id)  + num}`).hasClass('gray')) {
                if (selectedNum > 99) {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label long">' + selectedNum + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
                } else {
                    $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label">' + selectedNum + '</span>');
                    $('.label').css('font-size', labelZoom + 'px'); 
                }
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
    $('.label').each(function(index) {
        if (parseInt($(this).text()) >= num) {
            if (parseInt($(this).text()) === 100) {
                $(this).text(parseInt($(this).text()) - 1).removeClass('long');
            } else {
                $(this).text(parseInt($(this).text()) - 1);
            }
            $('.label').css('font-size', labelZoom + 'px');
            $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
        }
    });
    selectedNum--;
}

// Update chunk info
var updateChunkInfo = function() {
    if (!inEntry && !importMenuOpen && !manualModalOpen && !highscoreMenuOpen && !helpMenuOpen) {
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
        if (id === -1 && infoCollapse) {
            return;
        } else {
            infoCollapse = false;
        }
        chunkInfoOn && $('.menu8').show();
        chunkInfoOn && $('.hiddenInfo').hide();
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
        let challengeStr = '';
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
                questStr += `<a class='${(chunkInfo['chunks'][id]['Quest'][name] === 'first' ? 'bold link' : 'link')}' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(name.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name + `</a> <span onclick="getQuestInfo('` + name.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G').replaceAll(/\'/g, '%2H') + `')"><i class="quest-icon zmdi zmdi-collection-text"></i></span>, `;
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
        infoPanelVis['challenges'] && toggleInfoPanel('challenges');
    }
}

// Checks if skill has primary training
var checkPrimaryMethod = function(skill, valids, baseChunkData) {
    let valid = false;
    if (!!completedChallenges[skill] && Object.keys(completedChallenges[skill]).length > 0) {
        valid = true;
    } else if (!!manualTasks[skill] && Object.keys(manualTasks[skill]).length > 0) {
        valid = true;
    } else {
        let tempValid = true;
        !!universalPrimary[skill] && universalPrimary[skill].forEach(line => {
            if (line === 'Primary+') {
                let primaryValid = false;
                !!valids[skill] && Object.keys(valids[skill]).forEach(challenge => {
                    if ((chunkInfo['challenges'][skill][challenge]['Primary'] && !chunkInfo['challenges'][skill][challenge]['Secondary'] && chunkInfo['challenges'][skill][challenge]['Level'] === 1 && (!backlog[skill] || !backlog[skill][challenge])) || chunkInfo['challenges'][skill][challenge]['Manual']) {
                        primaryValid = true;
                    }
                });
                !primaryValid && (tempValid = false);
            } else if (line === 'Monster+') {
                let monsterExists = !!baseChunkData['monsters'] && Object.keys(baseChunkData['monsters']).length > 0;
                if (!monsterExists) {
                    tempValid = false;
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
                }
            } else if (line === 'Ranged+') {
                let validRanged = false;
                !!baseChunkData['items'] && rangedItems.forEach(set => {
                    let innerValid = true;
                    set.forEach(item => {
                        if (!!baseChunkData['items'] && !Object.keys(baseChunkData['items']).includes(item.replaceAll(/\*/g, ''))) {
                            innerValid = false;
                        } else {
                            let tempSecondary = true;
                            item.includes('*') && !!baseChunkData['items'][item.replaceAll(/\*/g, '')] && Object.keys(baseChunkData['items'][item.replaceAll(/\*/g, '')]).forEach(source => {
                                if (!baseChunkData['items'][item.replaceAll(/\*/g, '')][source].includes('secondary-') || baseChunkData['items'][item.replaceAll(/\*/g, '')][source].includes('primary-') || baseChunkData['items'][item.replaceAll(/\*/g, '')][source] === 'shop') {
                                    tempSecondary = false;
                                }
                            });
                            tempSecondary && (innerValid = false);
                        }
                    });
                    innerValid && (validRanged = true);
                });
                if (!validRanged) {
                    tempValid = false;
                }
            } else {
                tempValid = false;
            }
        });
        valid = tempValid;
    }
    return valid;
}

// Finds the current challenge in each skill
var calcCurrentChallenges = function() {
    let chunks = getChunkAreas();
    let baseChunkData = gatherChunksInfo(chunks);
    globalValids = calcChallenges(chunks, baseChunkData);

    let tempChallengeArr = {};
    let highestChallenge = {};

    Object.keys(globalValids).forEach(skill => {
        if (skill !== 'Extra') {
            let highestCompletedLevel = 0;
            !!completedChallenges[skill] && Object.keys(completedChallenges[skill]).forEach(name => {
                if (chunkInfo['challenges'][skill][name]['Level'] > highestCompletedLevel) {
                    highestCompletedLevel = chunkInfo['challenges'][skill][name]['Level'];
                }
            });
            checkPrimaryMethod(skill, globalValids, baseChunkData) && Object.keys(globalValids[skill]).forEach(challenge => {
                if (chunkInfo['challenges'][skill][challenge]['Level'] > highestCompletedLevel) {
                    if ((!highestChallenge[skill] || (chunkInfo['challenges'][skill][challenge]['Level'] > chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'])) && (!backlog[skill] || !backlog[skill][challenge])) {
                        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                            let tempValid = true;
                            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData)) {
                                    tempValid = false;
                                }
                            });
                            if (tempValid) {
                                highestChallenge[skill] = challenge;
                            }
                        } else {
                            highestChallenge[skill] = challenge;
                        }
                    } else if ((!highestChallenge[skill] || (chunkInfo['challenges'][skill][challenge]['Level'] === chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'])) && chunkInfo['challenges'][skill][challenge]['Primary'] && (!backlog[skill] || !backlog[skill][challenge])) {
                        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                            let tempValid = true;
                            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                                if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData)) {
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
            });
            (!highestChallenge[skill] || !chunkInfo['challenges'][skill][highestChallenge[skill]] || (chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'] <= 1 && !chunkInfo['challenges'][skill][highestChallenge[skill]]['Primary'])) && (highestChallenge[skill] = undefined);
            tempChallengeArr[skill] = highestChallenge[skill];
            highestCurrent[skill] = highestChallenge[skill];
            if (!!highestChallenge[skill] && !!chunkInfo['challenges'][skill][highestChallenge[skill]] && !!chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills']) {
                Object.keys(chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills']).forEach(subSkill => {
                    if ((!highestChallenge[subSkill] || chunkInfo['challenges'][subSkill][highestChallenge[subSkill]]['Level'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills'][subSkill]) && Object.keys(chunkInfo['challenges'][subSkill]).length > 0) {
                        highestChallenge[subSkill] = highestChallenge[skill];
                        tempChallengeArr[subSkill] = highestChallenge[subSkill];
                        highestCurrent[subSkill] = highestChallenge[subSkill];
                    }
                });
            }
        }
    });
    setupCurrentChallenges(tempChallengeArr);
    checkOffChallenges();
    updateChunkInfo();
};

// Sets up data for displaying
setupCurrentChallenges = function(tempChallengeArr) {
    if (tempChallengeArr !== false) {
        challengeArr = [];
        Object.keys(tempChallengeArr).sort().forEach(skill => {
            !!tempChallengeArr[skill] && challengeArr.push(`<div class="challenge noscroll ${skill + '-challenge'}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][tempChallengeArr[skill]]) && "checked"} onclick="checkOffChallenges()" ${(viewOnly || inEntry) && "disabled"} /><b>[` + chunkInfo['challenges'][skill][tempChallengeArr[skill]]['Level'] + '] <span class="inner noscroll">' + skill + '</b>: ' + tempChallengeArr[skill].split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((tempChallengeArr[skill].split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + tempChallengeArr[skill].split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + tempChallengeArr[skill].split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry ? '' : '</span> <span class="arrow noscroll" onclick="backlogChallenge(' + "`" + tempChallengeArr[skill] + "`, " + "`" + skill + "`" + ')"><i class="zmdi zmdi-long-arrow-down zmdi-hc-lg noscroll"></i></span>') + '</div>');
        });
        Object.keys(highestCurrent).forEach(skill => {
            if (!!checkedChallenges[skill] && Object.keys(checkedChallenges[skill])[0] === highestCurrent[skill]) {
                $('.' + skill + '-challenge > input').prop('checked', true);
            }
        });
        !!globalValids['Extra'] && Object.keys(globalValids['Extra']).forEach(challenge => {
            if ((!backlog['Extra'] || !backlog['Extra'][challenge]) && (!completedChallenges['Extra'] || !completedChallenges['Extra'][challenge])) {
                challengeArr.push(`<div class="challenge noscroll ${'extra-' + challenge.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '') + '-challenge'}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges['Extra'] && !!checkedChallenges['Extra'][challenge]) && "checked"} onclick="checkOffChallenges()" ${(viewOnly || inEntry) && "disabled"} />` + '<span class="inner noscroll">' + challenge.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((challenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + challenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + challenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry ? '' : '</span> <span class="arrow noscroll" onclick="backlogChallenge(' + "`" + challenge + "`, " + "`" + 'Extra' + "`" + ')"><i class="zmdi zmdi-long-arrow-down zmdi-hc-lg noscroll"></i></span>') + '</div>');
            }
        });
        if (challengeArr.length < 1) {
            challengeArr.push('No current challenges.');
        }
    }
    let backlogArr = [];
    Object.keys(backlog).forEach(skill => {
        if (skill !== 'Extra') {
            !!chunkInfo['challenges'][skill] && Object.keys(backlog[skill]).forEach(name => {
                !!chunkInfo['challenges'][skill][name] && backlogArr.push(`<div class="challenge noscroll ${skill + '-challenge'}"> <b>[` + chunkInfo['challenges'][skill][name]['Level'] + '] ' + skill + '</b>: ' + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry ? '' : ' <span class="arrow noscroll" onclick="unbacklogChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="zmdi zmdi-long-arrow-up zmdi-hc-lg noscroll"></i></span>') + '</div>');
            });
        } else {
            Object.keys(backlog[skill]).forEach(name => {
                backlogArr.push(`<div class="challenge noscroll ${'extra-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry ? '' : ' <span class="arrow noscroll" onclick="unbacklogChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="zmdi zmdi-long-arrow-up zmdi-hc-lg noscroll"></i></span>') + '</div>');
            });
        }
    });
    if (backlogArr.length < 1) {
        backlogArr.push('No challenges currently backlogged.');
    }
    let completedArr = [];
    Object.keys(completedChallenges).forEach(skill => {
        if (skill !== 'Extra') {
            !!chunkInfo['challenges'][skill] && Object.keys(completedChallenges[skill]).forEach(name => {
                !!chunkInfo['challenges'][skill][name] && completedArr.push(`<div class="challenge noscroll ${skill + '-challenge'}"> <b>[` + chunkInfo['challenges'][skill][name]['Level'] + '] ' + skill + '</b>: ' + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="zmdi zmdi-long-arrow-up zmdi-hc-lg noscroll"></i></span>') + '</div>');
            });
        } else {
            Object.keys(completedChallenges[skill]).forEach(name => {
                completedArr.push(`<div class="challenge noscroll ${'extra-' + name.replaceAll(/\ /g, '_').replaceAll(/\|/g, '').replaceAll(/\~/g, '').replaceAll(/\%/g, '').replaceAll(/\(/g, '').replaceAll(/\)/g, '').replaceAll(/\'/g, '') + '-challenge'}">` + name.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((name.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + name.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + name.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry ? '' : ' <span class="arrow noscroll" onclick="uncompleteChallenge(' + "`" + name + "`, " + "`" + skill + "`" + ')"><i class="zmdi zmdi-long-arrow-up zmdi-hc-lg noscroll"></i></span>') + '</div>');
            });
        }
    });
    if (completedArr.length < 1) {
        completedArr.push('No challenges currently completed.');
    }
    setCurrentChallenges(backlogArr, completedArr);
}

// Finds the future challenge in each skill given a possible new chunk
var calcFutureChallenges = function() {
    let chunks = {};
    let challengeStr = '';
    $('.unlocked > .chunkId').each(function() {
        chunks[parseInt($(this).text())] = true;
    });
    if (chunks[infoLockedId.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]) {
        return challengeStr;
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
    let baseChunkData = gatherChunksInfo(chunks);
    let valids = calcChallenges(chunks, baseChunkData);
    let highestChallenge = {};

    Object.keys(valids).forEach(skill => {
        let highestCompletedLevel = 0;
        !!completedChallenges[skill] && Object.keys(completedChallenges[skill]).forEach(name => {
            if (chunkInfo['challenges'][skill][name]['Level'] > highestCompletedLevel) {
                highestCompletedLevel = chunkInfo['challenges'][skill][name]['Level'];
            }
        });
        if (!!highestCurrent[skill]) {
            if (globalValids[skill][highestCurrent[skill]] > highestCompletedLevel) {
                highestCompletedLevel = globalValids[skill][highestCurrent[skill]];
            }
        }
        checkPrimaryMethod(skill, valids, baseChunkData) && Object.keys(valids[skill]).forEach(challenge => {
            if (chunkInfo['challenges'][skill][challenge]['Level'] > highestCompletedLevel || (highestCompletedLevel < 1)) {
                if ((!highestChallenge[skill] || (chunkInfo['challenges'][skill][challenge]['Level'] > chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'])) && (!backlog[skill] || !backlog[skill][challenge])) {
                    if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                        let tempValid = true;
                        Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                            if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData)) {
                                tempValid = false;
                            }
                        });
                        if (tempValid) {
                            highestChallenge[skill] = challenge;
                        }
                    } else {
                        highestChallenge[skill] = challenge;
                    }
                } else if ((!highestChallenge[skill] || (chunkInfo['challenges'][skill][challenge]['Level'] === chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'])) && chunkInfo['challenges'][skill][challenge]['Primary'] && (!backlog[skill] || !backlog[skill][challenge])) {
                    if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                        let tempValid = true;
                        Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                            if (!checkPrimaryMethod(subSkill, globalValids, baseChunkData)) {
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
        });
        !highestChallenge[skill] || (chunkInfo['challenges'][skill][highestChallenge[skill]]['Level'] <= 1 && !chunkInfo['challenges'][skill][highestChallenge[skill]]['Primary']) && (highestChallenge[skill] = undefined);
        !!highestChallenge[skill] && skill !== 'Nonskill' && (challengeStr += `<span class="challenge ${skill + '-challenge'}">` + highestChallenge[skill].split('~')[0] + `<a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((highestChallenge[skill].split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + highestChallenge[skill].split('~')[1].split('|').join('') + '</a>' + highestChallenge[skill].split('~')[2] + '</span>, ');
    });
    challengeStr.length > 0 && (challengeStr = challengeStr.substring(0, challengeStr.length - 2));
    return challengeStr;
};

// Calculates all the possible challenges
var calcChallenges = function(chunks, baseChunkData) {
    let valids = calcChallengesWork(chunks, baseChunkData);
    Object.keys(manualTasks).forEach(skill => {
        Object.keys(manualTasks[skill]).forEach(challenge => {
            if (!valids[skill]) {
                valids[skill] = {};
            }
            valids[skill][challenge] = manualTasks[skill][challenge];
        });
    });
    let outputs = {};
    let outputObjects = {};
    let newValids = valids;
    let i = 0;

    do {
        i++;
        valids = newValids;
        let tempChallenges = {...valids};
        Object.keys(extraOutputItems).forEach(skill => {
            Object.keys(extraOutputItems[skill]).forEach(challenge => {
                if (!tempChallenges[skill]) {
                    tempChallenges[skill] = {};
                }
                if (!tempChallenges[skill][challenge]) {
                    tempChallenges[skill][challenge] = extraOutputItems[skill][challenge];
                }
            });
        });
        Object.keys(tempChallenges).forEach(skill => {
            checkPrimaryMethod(skill, tempChallenges, baseChunkData) && Object.keys(tempChallenges[skill]).forEach(challenge => {
                if (skill !== 'Extra') {
                    if (!!chunkInfo['challenges'][skill][challenge]['Output'] && (!backlog[skill] || !backlog[skill][challenge])) {
                        let output = chunkInfo['challenges'][skill][challenge]['Output'];
                        !!chunkInfo['skillItems'][skill] && !!chunkInfo['skillItems'][skill][output] && Object.keys(chunkInfo['skillItems'][skill][output]).forEach(item => {
                            if (rules['Rare Drop'] || isNaN(parseInt(chunkInfo['skillItems'][skill][output][item].split('/')[0].replaceAll('~', '')) / parseInt(chunkInfo['skillItems'][skill][output][item].split('/')[1])) || (parseInt(chunkInfo['skillItems'][skill][output][item].split('/')[0].replaceAll('~', '')) / parseInt(chunkInfo['skillItems'][skill][output][item].split('/')[1])) > (parseInt(rareDropNum.split('/')[0].replaceAll('~', '')) / parseInt(rareDropNum.split('/')[1]))) {
                                if (!outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')]) {
                                    outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')] = {};
                                }
                                if (chunkInfo['skillItems'][skill][output][item] === 'Always' && !chunkInfo['challenges'][skill][challenge]['Secondary']) {
                                    outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')][challenge] = 'primary-' + skill;
                                } else {
                                    outputs[item.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')][challenge] = 'secondary-' + skill;
                                }
                            }
                        });
                        if (!chunkInfo['skillItems'][skill] || !chunkInfo['skillItems'][skill][output]) {
                            if (!outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')]) {
                                outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')] = {};
                            }
                            if (!chunkInfo['challenges'][skill][challenge]['Secondary']) {
                                outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')][challenge] = 'primary-' + skill;
                            } else {
                                outputs[output.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')][challenge] = 'secondary-' + skill;
                            }
                        }
                    }
                    if (!!chunkInfo['challenges'][skill][challenge]['Output Object'] && (!backlog[skill] || !backlog[skill][challenge])) {
                        let outputObject = chunkInfo['challenges'][skill][challenge]['Output Object'];
                        if (!outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')]) {
                            outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')] = {};
                        }
                        if (!chunkInfo['challenges'][skill][challenge]['Secondary']) {
                            outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')][challenge] = true;
                        } else {
                            outputObjects[outputObject.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')]['Secondary-' + challenge] = true;
                        }
                    }
                }
            });
        });
        
        Object.keys(outputs).forEach(output => {
            if (!baseChunkData['items'][output]) {
                baseChunkData['items'][output] = {};
            }
            Object.keys(outputs[output]).forEach(source => {
                baseChunkData['items'][output][source] = outputs[output][source];
            });
        });
        Object.keys(outputObjects).forEach(output => {
            if (!baseChunkData['objects'][output]) {
                baseChunkData['objects'][output] = {};
            }
            Object.keys(outputObjects[output]).forEach(source => {
                baseChunkData['objects'][output][source] = outputObjects[output][source];
            });
        });
        newValids = calcChallengesWork(chunks, baseChunkData);
        Object.keys(manualTasks).forEach(skill => {
            Object.keys(manualTasks[skill]).forEach(challenge => {
                if (!newValids[skill]) {
                    newValids[skill] = {};
                }
                newValids[skill][challenge] = manualTasks[skill][challenge];
            });
        });
    } while (!_.isEqual(valids, newValids) && i < 5);
    valids = newValids;
    return valids;
}

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

// Does the work to calculate all the possible challenges
var calcChallengesWork = function(chunks, baseChunkData) {
    let items = {...baseChunkData['items']};
    let objects = baseChunkData['objects'];
    let monsters = baseChunkData['monsters'];
    let npcs = baseChunkData['npcs'];
    let valids = {};
    extraOutputItems = {};

    let tempItemSkill = {};

    // Kill X
    if (rules['Kill X']) {
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        Object.keys(monsters).sort().forEach(monster => {
            valids['Extra']['Kill ~|' + monster + '|~'] = true;
        });
    }

    !!chunkInfo['challenges'] && [...skillNames, 'Nonskill'].forEach(skill => {
        tempItemSkill[skill] = {};
        valids[skill] = {};
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).sort(function(a, b){return chunkInfo['challenges'][skill][a]['Level']-chunkInfo['challenges'][skill][b]['Level']}).forEach(name => {
            !!chunkInfo['challenges'][skill][name]['Category'] && chunkInfo['challenges'][skill][name]['Category'].forEach(category => {
                if (maybePrimary.includes(category)) {
                    chunkInfo['challenges'][skill][name]['Primary'] = rules[category];
                }
            });
            let validChallenge = true;
            let tempSecondary = false;
            if (!!chunkInfo['challenges'][skill][name]['ManualInvalid'] && chunkInfo['challenges'][skill][name]['ManualInvalid']) {
                validChallenge = false;
            }
            !!chunkInfo['challenges'][skill][name]['Chunks'] && chunkInfo['challenges'][skill][name]['Chunks'].forEach(chunkId => {
                if (chunkId.includes('+')) {
                    if (!chunksPlus[chunkId]) {
                        validChallenge = false;
                    } else {
                        let tempValid = false;
                        Object.keys(chunks).forEach(name => {
                            chunksPlus[chunkId].forEach(plus => {
                                if (plus === name) {
                                    tempValid = true;
                                }
                            });
                        });
                        if (!tempValid) {
                            validChallenge = false;
                        }
                    }
                } else {
                    let tempValid = false;
                    Object.keys(chunks).forEach(name => {
                        if (chunkId === name) {
                            tempValid = true;
                        }
                    });
                    if (!tempValid) {
                        validChallenge = false;
                    }
                }
            });
            let missingItems = [];
            let savedValid = validChallenge;
            let savedSecondary = tempSecondary;
            let staffItems = {};
            !!chunkInfo['challenges'][skill][name]['Items'] && chunkInfo['challenges'][skill][name]['Items'].forEach(item => {
                let secondary = item.includes('*');
                if (item.replaceAll(/\*/g, '').includes('+')) {
                    if (!itemsPlus[item.replaceAll(/\*/g, '')]) {
                        validChallenge = false;
                    } else {
                        let tempValid = false;
                        itemsPlus[item.replaceAll(/\*/g, '')].forEach(plus => {
                            if (!!items[plus]) {
                                tempValid = true;
                                if (item.includes('*')) {
                                    Object.keys(items[plus]).forEach(source => {
                                        if (!items[plus.replaceAll(/\*/g, '')][source].includes('secondary-') || items[plus.replaceAll(/\*/g, '')][source].includes('primary-') || items[plus.replaceAll(/\*/g, '')][source] === 'shop') {
                                            secondary = false;
                                        } else if (item === 'Air rune+*') {
                                            if (!!items['Staff of air']) {
                                                secondary = false;
                                            }
                                        }
                                    });
                                }
                                if (combatSkills.includes(skill)) {
                                    let tempTempValid = false;
                                    Object.keys(items[plus]).forEach(source => {
                                        if (!items[plus.replaceAll(/\*/g, '')][source].includes('-') || !skillNames.includes(items[plus.replaceAll(/\*/g, '')][source].split('-')[1])) {
                                            tempTempValid = true;
                                        }
                                    });
                                    !tempTempValid && (tempValid = false);
                                }
                            }
                        });
                        if (!tempValid) {
                            validChallenge = false;
                        }
                        if (skill === 'Magic' && chunkInfo['challenges'][skill][name]['Primary']) {
                            missingItems.push(item);
                        }
                    }
                } else {
                    if (!items[item.replaceAll(/\*/g, '')]) {
                        validChallenge = false;
                    } else {
                        if (item.includes('*') && !!items[item.replaceAll(/\*/g, '')]) {
                            Object.keys(items[item.replaceAll(/\*/g, '')]).forEach(source => {
                                if (!items[item.replaceAll(/\*/g, '')][source].includes('secondary-') || items[item.replaceAll(/\*/g, '')][source].includes('primary-') || items[item.replaceAll(/\*/g, '')][source] === 'shop') {
                                    secondary = false;
                                }
                            });
                        }
                        if (combatSkills.includes(skill)) {
                            let tempTempValid = false;
                            Object.keys(items[item.replaceAll(/\*/g, '')]).forEach(source => {
                                if (!items[item.replaceAll(/\*/g, '')][source].includes('-') || !skillNames.includes(items[item.replaceAll(/\*/g, '')][source].split('-')[1])) {
                                    tempTempValid = true;
                                }
                            });
                            !tempTempValid && (validChallenge = false);
                        }
                    }
                    if (skill === 'Magic' && chunkInfo['challenges'][skill][name]['Primary']) {
                        missingItems.push(item);
                    }
                }
                !!secondary && (tempSecondary = true);
            });
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
                            }
                        } else {
                            let tempValid = false;
                            itemsPlus[it.replaceAll(/\*/g, '')].forEach(plus => {
                                if (!!items[plus]) {
                                    tempValid = true;
                                    if (it.includes('*')) {
                                        Object.keys(items[plus]).forEach(source => {
                                            if (!items[plus.replaceAll(/\*/g, '')][source].includes('secondary-') || items[plus.replaceAll(/\*/g, '')][source].includes('primary-') || items[plus.replaceAll(/\*/g, '')][source] === 'shop') {
                                                itSecondary = false;
                                            }
                                        });
                                    }
                                    if (combatSkills.includes(skill)) {
                                        let tempTempValid = false;
                                        Object.keys(items[plus]).forEach(source => {
                                            if (!items[plus.replaceAll(/\*/g, '')][source].includes('-') || !skillNames.includes(items[plus.replaceAll(/\*/g, '')][source].split('-')[1])) {
                                                tempTempValid = true;
                                            }
                                        });
                                        !tempTempValid && (tempValid = false);
                                    }
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
                                Object.keys(items[it.replaceAll(/\*/g, '')]).forEach(source => {
                                    if (!items[it.replaceAll(/\*/g, '')][source].includes('secondary-') || items[it.replaceAll(/\*/g, '')][source].includes('primary-') || items[it.replaceAll(/\*/g, '')][source] === 'shop') {
                                        itSecondary = false;
                                    }
                                });
                            }
                            if (combatSkills.includes(skill)) {
                                let tempTempValid = false;
                                Object.keys(items[it.replaceAll(/\*/g, '')]).forEach(source => {
                                    if (!items[it.replaceAll(/\*/g, '')][source].includes('-') || !skillNames.includes(items[it.replaceAll(/\*/g, '')][source].split('-')[1])) {
                                        tempTempValid = true;
                                    }
                                });
                                !tempTempValid && (potentialValid = false);
                            }
                        }
                    }
                    itSecondary && (potentialSecondary = true);
                });
                if (missingRunes.length === 1) {
                    let rune = missingRunes[0].replaceAll(/\*/g, '').replaceAll(/\+/g, '');
                    let foundStaff = false;
                    Object.keys(elementalStaves).forEach(staff => {
                        if (elementalStaves[staff].includes(rune) && !!items[staff] && !foundStaff) {
                            staffItems[rune] = {};
                            staffItems[rune][staff] =  'primary-staff';
                            foundStaff = true;
                            if (staff !== 'Staff of air') {
                                potentialSecondary = true;
                            }
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
                potentialSecondary ? (tempSecondary = true) : (tempSecondary = savedSecondary);
            }
            !!chunkInfo['challenges'][skill][name]['Objects'] && chunkInfo['challenges'][skill][name]['Objects'].forEach(object => {
                let secondary = true;
                if (object.includes('+')) {
                    if (!objectsPlus[object]) {
                        validChallenge = false;
                    } else {
                        let tempValid = false;
                        objectsPlus[object].forEach(plus => {
                            if (!!objects[plus]) {
                                tempValid = true;
                                Object.keys(objects[plus.replaceAll(/\*/g, '')]).forEach(source => {
                                    if (!source.includes('secondary-')) {
                                        secondary = false;
                                    }
                                });
                            }
                        });
                        if (!tempValid) {
                            validChallenge = false;
                        }
                    }
                } else {
                    if (!objects[object]) {
                        validChallenge = false;
                    } else {
                        Object.keys(objects[object]).forEach(source => {
                            if (!source.includes('secondary-')) {
                                secondary = false;
                            }
                        });
                    }
                }
                !!secondary && (tempSecondary = true);
            });
            !!chunkInfo['challenges'][skill][name]['Monsters'] && chunkInfo['challenges'][skill][name]['Monsters'].forEach(monster => {
                if (monster.includes('+')) {
                    if (!monstersPlus[monster]) {
                        if (monster !== 'Monster+') {
                            validChallenge = false;
                        } else if (!monsters || Object.keys(monsters).length <= 0) {
                            validChallenge = false;
                        }
                    } else {
                        let tempValid = false;
                        monstersPlus[monster].forEach(plus => {
                            if (!!monsters[plus]) {
                                tempValid = true;
                            }
                        });
                        if (!tempValid) {
                            validChallenge = false;
                        }
                    }
                } else {
                    if (!monsters[monster]) {
                        validChallenge = false;
                    }
                }
            });
            !!chunkInfo['challenges'][skill][name]['NPCs'] && chunkInfo['challenges'][skill][name]['NPCs'].forEach(npc => {
                if (npc.includes('+')) {
                    if (!npcsPlus[npc]) {
                        validChallenge = false;
                    } else {
                        let tempValid = false;
                        npcsPlus[npc].forEach(plus => {
                            if (!!npcs[plus]) {
                                tempValid = true;
                            }
                        });
                        if (!tempValid) {
                            validChallenge = false;
                        }
                    }
                } else {
                    if (!npcs[npc]) {
                        validChallenge = false;
                    }
                }
            });
            !!chunkInfo['challenges'][skill][name]['Mix'] && chunkInfo['challenges'][skill][name]['Mix'].forEach(mix => {
                if (mix.includes('+')) {
                    if (!mixPlus[mix]) {
                        validChallenge = false;
                    } else {
                        let tempValid = false;
                        mixPlus[mix].forEach(plus => {
                            if (!!monsters[plus] || !!npcs[plus]) {
                                tempValid = true;
                            }
                        });
                        if (!tempValid) {
                            validChallenge = false;
                        }
                    }
                } else {
                    if (!monsters[mix] && !npcs[mix]) {
                        validChallenge = false;
                    }
                }
            });
            chunkInfo['challenges'][skill][name]['Secondary'] = tempSecondary;
            !!chunkInfo['challenges'][skill][name]['Category'] && Object.keys(rules).forEach(rule => {
                if (chunkInfo['challenges'][skill][name]['Category'].includes(rule) && !maybePrimary.includes(rule) && !rules[rule]) {
                    validChallenge = false;
                }
            });
            if (validChallenge) {
                if (!processingSkill[skill] || !chunkInfo['challenges'][skill][name]['Items']) {
                    valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
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
                    while (!listDone) {
                        let item = itemList[index++];
                        if (item.replaceAll(/\*/g, '').includes('+')) {
                            !!itemsPlus[item.replaceAll(/\*/g, '')] && itemsPlus[item.replaceAll(/\*/g, '')].forEach(plus => {
                                if (!!items[plus] && !Object.values(items[plus]).includes('primary-' + skill) && !Object.values(items[plus]).includes('secondary-' + skill) && !Object.values(items[plus]).includes('primary-Farming')) {
                                    if (!tools[plus]) {
                                        let nonskill = "";
                                        let tempNonValid = true;
                                        !!items[plus] && Object.keys(items[plus]).forEach(source => {
                                            if (items[plus][source].includes('Nonskill') && !source.includes('*')) {
                                                nonskill = source;
                                            }
                                            if (!(items[plus][source] === ('primary-' + skill)) && !(items[plus][source] === ('secondary-' + skill)) && !(items[plus][source] === ('primary-Farming'))) {
                                                tempNonValid = false;
                                            }
                                        });
                                        if (nonskill.length > 0) {
                                            !!chunkInfo['challenges']['Nonskill'][nonskill]['Items'] && chunkInfo['challenges']['Nonskill'][nonskill]['Items'].forEach(it => {
                                                itemList.push(it);
                                            });
                                        } else if (!tempNonValid) {
                                            if (!tempItemSkill[skill][plus]) {
                                                tempItemSkill[skill][plus] = [];
                                            }
                                            tempItemSkill[skill][plus].push(name);
                                        }
                                    }
                                }
                            });
                        } else {
                            if (!!items && !tools[item.replaceAll(/\*/g, '')] && !!items[item.replaceAll(/\*/g, '')]) {
                                let nonskill = "";
                                let tempNonValid = true;
                                !!items[item.replaceAll(/\*/g, '')] && Object.keys(items[item.replaceAll(/\*/g, '')]).forEach(source => {
                                    if (items[item.replaceAll(/\*/g, '')][source].includes('Nonskill') && !source.includes('*')) {
                                        nonskill = source;
                                    }
                                    if (!(items[item.replaceAll(/\*/g, '')][source] === ('primary-' + skill)) && !(items[item.replaceAll(/\*/g, '')][source] === ('secondary-' + skill)) && !(items[item.replaceAll(/\*/g, '')][source] === ('primary-Farming'))) {
                                        tempNonValid = false;
                                    }
                                });
                                if (nonskill.length > 0) {
                                    !!chunkInfo['challenges']['Nonskill'][nonskill]['Items'] && chunkInfo['challenges']['Nonskill'][nonskill]['Items'].forEach(it => {
                                        itemList.push(it);
                                    });
                                } else if (!tempNonValid) {
                                    if (!tempItemSkill[skill][item.replaceAll(/\*/g, '')]) {
                                        tempItemSkill[skill][item.replaceAll(/\*/g, '')] = [];
                                    }
                                    tempItemSkill[skill][item.replaceAll(/\*/g, '')].push(name);
                                }
                            }
                        }
                        listDone = itemList.length <= index;
                    };
                }
            }
        });
    });
    Object.keys(tempItemSkill).forEach(skill => {
        Object.keys(tempItemSkill[skill]).forEach(item => {
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
                }
            });
            !!lowestName && (valids[skill][lowestName] = chunkInfo['challenges'][skill][lowestName]['Level']);
        });
    });
    return valids;
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
    Object.keys(fullChallengeArr).sort().forEach(challenge => {
        if (!filterByChecked || (!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge])) {
            $('.challenge-data').append(`<div class="noscroll"><input class="noscroll" ${!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge] && "checked"} type="checkbox" onclick="addManualTask('` + challenge.replaceAll(/\'/g, '-2H') + `')" />` + challenge.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '') + `</div>`);
        }
    });
    $('#myModal').show();
    $('#searchManual').val('').focus();
}

// Filters the full list of challenges
var searchManualTasks = function() {
    let searchTemp = $('#searchManual').val().toLowerCase();
    $('.challenge-data').empty();
    Object.keys(fullChallengeArr).filter(challenge => challenge.toLowerCase().includes(searchTemp)).sort().forEach(challenge => {
        if (!filterByChecked || (!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge])) {
            $('.challenge-data').append(`<div class="noscroll"><input class="noscroll" ${!!manualTasks[fullChallengeArr[challenge][0]] && !!manualTasks[fullChallengeArr[challenge][0]][challenge] && "checked"} type="checkbox" onclick="addManualTask('` + challenge.replaceAll(/\'/g, '-2H') + `')" />` + challenge.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').replaceAll(/\~/g, '').replaceAll(/\|/g, '') + `</div>`);
        }
    });
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
            manualTasks[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'];
            chunkInfo['challenges'][skill][challenge]['Manual'] = true;
        } else {
            delete manualTasks[skill][challenge];
            delete chunkInfo['challenges'][skill][challenge]['Manual'];
            if (Object.keys(manualTasks[skill]).length === 0) {
                delete manualTasks[skill];
            }
        }
    });
    $('.panel-active').html('Calculating...');
    challengePanelVis['active'] && toggleChallengesPanel('active');
}

// Closes the manual add tasks modal
var closeManualAdd = function() {
    manualModalOpen = false;
    $('#myModal').hide();
}

// Unlocks various parts of the chunk tasks panel
var unlockChallenges = function() {
    setupCurrentChallenges(highestCurrent);
}

// Displays the current challenges, areas, backlog, and completed challenges
var setCurrentChallenges = function(backlogArr, completedArr) {
    $('.panel-active').empty();
    challengeArr.forEach(line => {
        $('.panel-active').append(line);
    });
    setAreas();
    $('.panel-backlog').empty();
    backlogArr.forEach(line => {
        $('.panel-backlog').append(line);
    });
    $('.panel-completed').empty();
    completedArr.forEach(line => {
        $('.panel-completed').append(line);
    });
    $('.panel-rules').empty();
    !!rules && Object.keys(rules).length > 0 && Object.keys(rules).sort(function(a, b) { return a.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').localeCompare(b.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')) }).forEach(rule => {
        $('.panel-rules').append(`<div class="rule ${rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule'} noscroll"><input class="noscroll" type='checkbox' ${rules[rule] && "checked"} onclick="checkOffRules()" ${(viewOnly || inEntry) && "disabled"} />` + ruleNames[rule].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</div>');
    });
}

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
                        let depth = 1;
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

var setAreas = function() {
    $('.panel-areas').empty();
    let newAreas = [];
    !!possibleAreas && Object.keys(possibleAreas).length > 0 && Object.keys(possibleAreas).sort(function(a, b) { return a.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').localeCompare(b.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')) }).forEach(area => {
        if (!!areasStructure && !!areasStructure[area.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]) {
            newAreas.push(area);
        }
        $('.panel-areas').append(`<div data-depth="0" class="base area ${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-area'} noscroll"><input class="noscroll" type='checkbox' ${possibleAreas[area] && "checked"} onclick="checkOffAreas(this, ${"`" + area + "`"})" ${(viewOnly || inEntry) && "disabled"} /> <a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI(area.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + area.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a></div>');
    });
    let counter = 0;
    newAreas = newAreas.sort(function(a, b) { return b.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/').localeCompare(a.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')) });
    if (!!possibleAreas && !!areasStructure && !!newAreas) {
        while (counter < newAreas.length) {
            let area = newAreas[counter++];
            Object.keys(areasStructure[area.replaceAll(/\./g, '%2E').replaceAll(/\#/g, '%2F').replaceAll(/\//g, '%2G')]).forEach(parent => {
                if ($(`.area.${parent.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`).length < 1) {
                    newAreas.push(area);
                    if ($(`.area.${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`).length > 0) {
                        $(`.area.${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area:not(.base)`).remove();
                    }
                } else {
                    let num = parseInt($(`.area.${parent.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`).attr('data-depth')) + 1;
                    if (num > 0) {
                        num = 1;
                        let spacing = '';
                        for (let i = 0; i < num; i++) {
                            spacing += '&nbsp;&nbsp;';
                        }
                        $(`<div data-depth="${num}" class="area ${area.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-area'} noscroll">${spacing}<input class="noscroll" type='checkbox' ${possibleAreas[area] && "checked"} onclick="checkOffAreas(this, ${"`" + area + "`"})" ${(viewOnly || inEntry) && "disabled"} /> <a class='link' href=${"https://oldschool.runescape.wiki/w/" + encodeURI('area'.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + area.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a></div>').insertAfter(`.base.area.${parent.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '')}-area`);
                    }
                }
            });
        }
    }
    if (!possibleAreas || Object.keys(possibleAreas).length <= 0) {
        $('.panel-areas').append('No areas currently available.');
    }
}

// Sends a challenge to the backlog
var backlogChallenge = function(challenge, skill) {
    if (!backlog[skill]) {
        backlog[skill] = {};
    }
    if (skill !== 'Extra') {
        backlog[skill][challenge] = true;
        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                if (!backlog[subSkill]) {
                    backlog[subSkill] = {};
                }
                backlog[subSkill][challenge] = true;
            });
        }
    } else {
        backlog[skill][challenge] = true;
    }
    let highestChallenge;
    let highestChallengeLevel = 0;
    Object.keys(globalValids[skill]).forEach(challenge => {
        if ((!backlog[skill] || !backlog[skill][challenge]) && globalValids[skill][challenge] > highestChallengeLevel) {
            highestChallenge = challenge;
            highestChallengeLevel = globalValids[skill][challenge];
        }
    });
    challengeArr.forEach(line => {
        if (line.includes(skill + '-challenge')) {
            let index = challengeArr.indexOf(line);
            challengeArr.splice(index, 1);
            if (highestChallengeLevel > 0) {
                challengeArr.splice(index, 0, `<div class="challenge noscroll ${skill + '-challenge'}"><input class="noscroll" type='checkbox' ${(!!checkedChallenges[skill] && !!checkedChallenges[skill][highestChallenge]) && "checked"} onclick="checkOffChallenges()" ${(viewOnly || inEntry) && "disabled"} /><b>[` + chunkInfo['challenges'][skill][highestChallenge]['Level'] + '] <span class="inner noscroll">' + skill + '</b>: ' + highestChallenge.split('~')[0].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + `<a class='link noscroll' href=${"https://oldschool.runescape.wiki/w/" + encodeURI((highestChallenge.split('|')[1]).replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/'))} target="_blank">` + highestChallenge.split('~')[1].split('|').join('').replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + '</a>' + highestChallenge.split('~')[2].replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/') + (viewOnly || inEntry ? '' : '</span> <span class="arrow noscroll" onclick="backlogChallenge(' + "`" + highestChallenge + "`, " + "`" + skill + "`" + ')"><i class="zmdi zmdi-long-arrow-down zmdi-hc-lg noscroll"></i></span>') + '</div>');
            }
        } 
    });
    setupCurrentChallenges(false);
    setData();
}

// Removes a challenge from the backlog
var unbacklogChallenge = function(challenge, skill) {
    delete backlog[skill][challenge];
    if (backlog[skill] === {}) {
        delete backlog[skill];
    }
    if (skill !== 'Extra') {
        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                delete backlog[subSkill][challenge];
                if (backlog[subSkill] === {}) {
                    delete backlog[subSkill];
                }
            });
        }
    }
    setupCurrentChallenges(false);
    $('.panel-active').html('Calculating...');
    setData();
}

// Removes a challenge from completed
var uncompleteChallenge = function(challenge, skill) {
    delete completedChallenges[skill][challenge];
    if (completedChallenges[skill] === {}) {
        delete completedChallenges[skill];
    }
    if (skill !== 'Extra') {
        if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
            Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach(subSkill => {
                delete completedChallenges[subSkill][challenge];
                if (completedChallenges[subSkill] === {}) {
                    delete completedChallenges[subSkill];
                }
            });
        }
    }
    setupCurrentChallenges(false);
    $('.panel-active').html('Calculating...');
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
            checkedChallenges[skill][highestCurrent[skill]] = true;
        } else {
            $('.panel-active > .' + skill + '-challenge').removeClass('hide-backlog');
        }
    });
    setData();
}

// Marks checked off areas to unlock
var checkOffAreas = function(obj, area) {
    possibleAreas[area] = obj.checked;
    $('.panel-active').html('Calculating...');
    getChunkAreas();
    setAreas();
    setData();
}

// Marks checked off rules
var checkOffRules = function() {
    Object.keys(rules).forEach(rule => {
        rules[rule] = $('.' + rule.replaceAll(' ', '_').replaceAll('%', '').replaceAll(/\'/g, '-2H').replaceAll(/\&/g, '-2Z').replaceAll(/\(/g, '').replaceAll(/\)/g, '') + '-rule > input').prop('checked');
    });
    setupCurrentChallenges(false);
    $('.panel-active').html('Calculating...');
    setData();
}

// Moves checked off challenges to completed
var completeChallenges = function() {
    Object.keys(checkedChallenges).forEach(skill => {
        Object.keys(checkedChallenges[skill]).forEach(name => {
            if (!completedChallenges[skill]) {
                completedChallenges[skill] = {};
            }
            completedChallenges[skill][name] = checkedChallenges[skill][name];
        });
    });
    checkedChallenges = {};
}

// Gathers item/object info on all chunk ids passed in
var gatherChunksInfo = function(chunks) {
    let items = {};
    let objects = {};
    let monsters = {};
    let npcs = {};

    Object.keys(chunks).forEach(num => {
        !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Monster'] && Object.keys(chunkInfo['chunks'][num]['Monster']).forEach(monster => {
            !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]).forEach(drop => {
                if (!!dropTables[drop]) {
                    Object.keys(dropTables[drop]).forEach(item => {
                        if (rules['Rare Drop'] || isNaN(parseInt(chunkInfo['drops'][monster][drop].split('/')[0].replaceAll('~', '')) / parseInt(chunkInfo['drops'][monster][drop].split('/')[1])) || ((parseInt(chunkInfo['drops'][monster][drop].split('/')[0].replaceAll('~', '')) / parseInt(chunkInfo['drops'][monster][drop].split('/')[1]) * parseInt(dropTables[drop][item].split('/')[0].replaceAll('~', '')) / parseInt(dropTables[drop][item].split('/')[1]))) > (parseInt(rareDropNum.split('/')[0].replaceAll('~', '')) / parseInt(rareDropNum.split('/')[1]))) {
                            if (!items[item]) {
                                items[item] = {};
                            }
                            if (chunkInfo['drops'][monster][item] === 'Always') {
                                items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')] = 'primary-drop';
                            } else {
                                items[item][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')] = 'secondary-drop';
                            }
                        }
                    });
                } else if (rules['Rare Drop'] || isNaN(parseInt(chunkInfo['drops'][monster][drop].split('/')[0].replaceAll('~', '')) / parseInt(chunkInfo['drops'][monster][drop].split('/')[1])) || (parseInt(chunkInfo['drops'][monster][drop].split('/')[0].replaceAll('~', '')) / parseInt(chunkInfo['drops'][monster][drop].split('/')[1])) > (parseInt(rareDropNum.split('/')[0].replaceAll('~', '')) / parseInt(rareDropNum.split('/')[1]))) {
                    if (!items[drop]) {
                        items[drop] = {};
                    }
                    if (chunkInfo['drops'][monster][drop] === 'Always') {
                        items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')] = 'primary-drop';
                    } else {
                        items[drop][monster.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')] = 'secondary-drop';
                    }
                }
            });
        });

        !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Shop'] && Object.keys(chunkInfo['chunks'][num]['Shop']).forEach(shop => {
            !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).forEach(item => {
                if (!items[item]) {
                    items[item] = {};
                }
                items[item][shop.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')] = 'shop';
            });
        });

        !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Spawn'] && Object.keys(chunkInfo['chunks'][num]['Spawn']).forEach(spawn => {
            if (!items[spawn]) {
                items[spawn] = {};
            }
            items[spawn][num] = 'secondary-spawn';
        });

        !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Object'] && Object.keys(chunkInfo['chunks'][num]['Object']).forEach(object => {
            if (!objects[object]) {
                objects[object] = {};
            }
            objects[object][num] = true;
        });

        !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Monster'] && Object.keys(chunkInfo['chunks'][num]['Monster']).forEach(monster => {
            if (!monsters[monster]) {
                monsters[monster] = {};
            }
            monsters[monster][num] = true;
        });
        !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['NPC'] && Object.keys(chunkInfo['chunks'][num]['NPC']).forEach(npc => {
            if (!npcs[npc]) {
                npcs[npc] = {};
            }
            npcs[npc][num] = true;
        });
    });
    return {items: items, objects: objects, monsters: monsters, npcs: npcs};
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
        $('.panel-questdata').append(`<b><div class="noscroll ${!!unlocked[chunkId.replaceAll(/\%2E/g, '.').replaceAll(/\%2F/g, '#').replaceAll(/\%2G/g, '/')] && ' + valid-chunk'}">` + `<span onclick="redirectPanel(encodeURI('` + chunkId.replaceAll(/\'/g, "%2H") + `'))"><i class="quest-icon zmdi zmdi-collection-text"></i></span> ` + `<span class="noscroll ${aboveground && ' + click'}" ${aboveground && `onclick="scrollToChunk(${chunkId})"`}>` + chunkName + '</span></div></b>')
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
        $('.box:contains(' + id + ')').addClass('recent');
    });
}

// Scrolls to chunk with given id
var scrollToChunk = function(id) {
    let box = $('.box:contains(' + id + ')').addClass('recent');
    scrollToPos(parseInt(box.attr('id')) % rowSize, Math.floor(parseInt(box.attr('id')) / rowSize), 0, 0, false);
}

// Re-update chunk info panel
var redirectPanel = function(name) {
    let realName = decodeURI(name).replaceAll(/\%2H/g, "'");
    $('.box > .chunkId:contains(' + infoLockedId + ')').parent().removeClass('locked');
    $('.box > .chunkId:contains(' + realName + ')').parent().addClass('locked');
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
            if (snap.val()) {
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
    dropTables = codeItems['dropTables'];
    elementalStaves = codeItems['elementalStaves'];
}

// Loads data from Firebase
var loadData = function() {
    $.getJSON('./chunkpicker-chunkinfo-export.json', function(data) {
        chunkInfo = data;
        setCodeItems();
        skillNames.forEach(skill => {
            if (!chunkInfo['challenges'][skill]) {
                chunkInfo['challenges'][skill] = {};
            }
        });
        myRef.once('value', function(snap) {
            var picking = false;
            var settings = snap.val()['settings'];
            var chunks = snap.val()['chunks'];
            recent = snap.val()['recent'] || [];
            recentTime = snap.val()['recentTime'] || [];
            settings['ids'] = document.cookie.split(';').filter(function(item) {
                return item.indexOf('ids=true') >= 0
            }).length > 0;
            settings['highvis'] = document.cookie.split(';').filter(function(item) {
                return item.indexOf('highvis=true') >= 0
            }).length > 0;
            settings['info'] = !document.cookie.split(';').filter(function(item) {
                return item.indexOf('newinfo=false') >= 0
            }).length > 0;
            settings['infocollapse'] = document.cookie.split(';').filter(function(item) {
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
    
            settings['neighbors'] && toggleNeighbors('startup');
            settings['remove'] && toggleRemove('startup');
            settings['highscoreEnabled'] && enableHighscore('startup');
            settings['ids'] && toggleIds() && $('.box').addClass('quality');
            settings['highvis'] && toggleVisibility();
            !settings['ids'] && $('.chunkId').hide();
            settings['info'] && toggleChunkInfo('startup');
            settings['infocollapse'] && hideChunkInfo();
            settings['roll2'] && toggleRoll2('startup');
            settings['unpick'] && toggleUnpick('startup');
            (settings['chunkTasks'] !== false) && toggleChunkTasks('startup');
            if (settings['recent'] === undefined) {
                settings['recent'] = true;
            }
            settings['recent'] && toggleRecent('startup');
            if (settings['help'] === undefined) {
                settings['help'] = true;
            }
            settings['help'] && (helpMenuOpenSoon = true);
    
            if (settings['highscoreEnabled']) {
                userName = snap.val()['userName'];
                $('.highscoretoggle').text('Change highscores username');
            }
    
            chunks && chunks['potential'] && Object.keys(chunks['potential']).sort(function(a, b){return b-a}).forEach(function(id) {
                picking = true;
                if (selectedNum > 99) {
                    $('.box > .chunkId:contains(' + id + ')').parent().addClass('potential').removeClass('gray selected unlocked').append('<span class="label long">' + selectedNum++ + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2/3)) + 'px');
                } else {
                    $('.box > .chunkId:contains(' + id + ')').parent().addClass('potential').removeClass('gray selected unlocked').append('<span class="label">' + selectedNum++ + '</span>');
                    $('.label').css('font-size', labelZoom + 'px');
                }
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            });
    
            chunks && chunks['selected'] && Object.keys(chunks['selected']).sort(function(a, b){return b-a}).forEach(function(id) {
                if (selectedNum > 99) {
                    $('.box > .chunkId:contains(' + id + ')').parent().addClass('selected').removeClass('gray potential unlocked').append('<span class="label long">' + selectedNum++ + '</span>');
                    $('.label.long').css('font-size', (labelZoom * (2/3))+ 'px');
                } else {
                    $('.box > .chunkId:contains(' + id + ')').parent().addClass('selected').removeClass('gray potential unlocked').append('<span class="label">' + selectedNum++ + '</span>');
                    $('.label').css('font-size', labelZoom + 'px');
                }
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            });
    
            chunks && chunks['unlocked'] && Object.keys(chunks['unlocked']).forEach(function(id) {
                $('.box > .chunkId:contains(' + id + ')').parent().addClass('unlocked').removeClass('gray selected potential');
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
            });
    
            if (picking) {
                $('.roll2, .unpick').css({'opacity': 0, 'cursor': 'default'}).prop('disabled', true).hide();
                $('.pick').text('Pick for me');
                isPicking = true;
            }
            chunkBorders();
            calcCurrentChallenges();
            center('quick');
        });
    });
}

// Sets browser cookie
var setCookies = function() {
    document.cookie = "ids=" + showChunkIds;
    document.cookie = "highvis=" + highVisibilityMode;
    document.cookie = "newinfo=" + chunkInfoOn;
    document.cookie = "infocollapse=" + infoCollapse;
}

// Stores data in Firebase
var setUsername = function(old) {
    signedIn && firebase.auth().signInAnonymously().then(function() {
        myRef.child('userName').set(userName.toLowerCase());
        if (!!old && old !== '') {
            databaseRef.child('highscores/players/' + old.toLowerCase()).set(null);
        }
        databaseRef.child('highscores/players/' + userName.toLowerCase()).set(mid);
        highscoreEnabled = true;
        setData();
    }).catch(function(error) {console.log(error)});
}

// Stores data in Firebase
var setData = function() {
    signedIn && firebase.auth().signInAnonymously().then(function() {
        myRef.child('settings').update({'neighbors': autoSelectNeighbors, 'remove': autoRemoveSelected, 'roll2': roll2On, 'unpick': unpickOn, 'recent': recentOn, 'highscoreEnabled': highscoreEnabled, 'chunkTasks': chunkTasksOn});
        if (!helpMenuOpen && !helpMenuOpenSoon) {
            myRef.child('settings').update({'help': false});
        }
        myRef.update({recent});
        myRef.update({recentTime});
        myRef.child('chunkinfo').update({checkedChallenges});
        myRef.child('chunkinfo').update({completedChallenges});
        myRef.child('chunkinfo').update({backlog});
        myRef.child('chunkinfo').update({possibleAreas});
        myRef.child('chunkinfo').update({manualTasks});

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
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var temp = snap.val()['template'];
                temp.pin = pin;
                databaseRef.child('maps/' + charSet).set(temp);
            }
        });
        firebase.auth().signInAnonymously().then(function() {signedIn = true}).catch(function(error) {console.log(error)});
        mid = charSet;
        $('#newmid').text(charSet.toUpperCase());
        $('.link').prop('href', 'https://source-chunk.github.io/chunk-picker-v2/?' + charSet).text('https://source-chunk.github.io/chunk-picker-v2/?' + charSet);
    });
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
var changeLocked = function(lock) {
    $('#lock-unlock').prop('disabled', true).html('<i class="spin zmdi zmdi-spinner"></i>');
    setTimeout(function() {
        if (lock) {
            $('.lock-pin').addClass('animated shake wrong').select();
            $('#lock-unlock').prop('disabled', true).html('Unlock');
        } else {
            firebase.auth().signInAnonymously().then(function() {signedIn = true}).catch(function(error) {console.log(error)});
            $('.center').css('margin-top', '15px');
            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .open-manual-container').css('opacity', 0).show();
            !isPicking && roll2On && $('.roll2').css('opacity', 0).show();
            !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
            $('.lock-box').animate({'opacity': 0});
            setTimeout(function() {
                $('.lock-box').css('opacity', 1).hide();
                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .toggleNeighbors, .toggleRemove, .roll2toggle, .unpicktoggle, .recenttoggle, .taskstoggle, .highscoretoggle, .open-manual-container').animate({'opacity': 1});
                !isPicking && roll2On && $('.roll2').animate({'opacity': 1});
                !isPicking && unpickOn && $('.unpick').animate({'opacity': 1});
                $('#lock-unlock').prop('disabled', false).html('Unlock');
                locked = lock;
                helpMenuOpenSoon && helpFunc();
                unlockChallenges();
                lockBoxOpen = false;
            }, 500);
        }
        setTimeout(function() {
            $('.lock-pin').removeClass('animated shake');
            locked = lock;
        }, 500);
    }, 1000);
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