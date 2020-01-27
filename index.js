/* 
 * Created by Source Link AKA Source Chunk
 * Revision of an idea by Amehzyn
 * With help from Slay to Stay for chunk Id's and Amehzyn for smoother zooming/url decoding
 * 10/24/2019
 */

var onMobile = typeof window.orientation !== 'undefined';                       // Is user on a mobile device
var isPicking = false;                                                          // Has the user just rolled 2 chunks and is currently picking
var autoSelectNeighbors = false;                                                // Toggle state for select neighbors button
var autoRemoveSelected = false;                                                 // Toggle state for remove selected button
var showChunkIds = false;                                                       // Toggle state for show chunk ids button
var clicked = false;                                                            // Is mouse being held down
var screenshotMode = false;                                                     // Is screenshot mode on
var settingsOpen = false;                                                       // Is the settings menu open
var roll2On = false;                                                            // Is the roll2 button enabled
var unpickOn = false;                                                           // Is the unpick button enabled
var highVisibilityMode = false;                                                 // Is high visibility mode enabled
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

var databaseRef = firebase.database().ref();                                    // Firebase database reference
var myRef;                                                                      // Firebase database reference for this map ID

var BASE10 = "0123456789";                                                      // Base 10 alphabet
var BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";  // Base 62 alphabet

var hammertime = new Hammer(document.getElementsByClassName('body')[0]);        // Initialize Hammerjs [Mobile]
hammertime.get('pinch').set({ enable: true });

// ----------------------------------------------------------

// Event Listeners

// ----------------------------------------------------------

// [Mobile] Prevents normal mobile zooming methods
hammertime.on('pinchin pinchout doubletap', function(ev) {
    if (onMobile) {
        ev.preventDefault();
    }
});

// [Mobile] Mobile equivalent to 'mousedown', starts drag sequence
hammertime.on('panstart', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen) {
        clickX = ev.changedPointers[0].pageX;
        clickY = ev.changedPointers[0].pageY;
    }
});

// [Mobile] Mobile equivalent to 'mouseup', ends drag sequence
hammertime.on('panend', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen) {
        prevScrollLeft = prevScrollLeft + scrollLeft;
        prevScrollTop = prevScrollTop + scrollTop;
    }
});

// [Mobile] Mobile equivalent to 'mousemove', determines amount dragged since last trigger
hammertime.on('panleft panright panup pandown', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen) {
        updateScrollPos(ev.changedPointers[0]);
    }
});

//[Mobile] Handles mobile 'clicks'
hammertime.on('tap', function(ev) {
    if (onMobile && !atHome && !inEntry && !importMenuOpen && $(ev.target).hasClass('box') && !locked) {
        if ($(ev.target).hasClass('gray')) {
            $(ev.target).toggleClass('gray selected').append('<span class="label">' + selectedNum + '</span>');
            selectedNum++;
            $('.label').css('font-size', labelZoom + 'px');
            $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
        } else if ($(ev.target).hasClass('selected')) {
            fixNums($($(ev.target).children()[1]).text());
            $(ev.target).toggleClass('selected unlocked').empty().append("<span class='chunkId'>" + (Math.floor(ev.target.id % rowSize) * (skip + rowSize) - Math.floor(ev.target.id / rowSize) + startingIndex) + "</span>");
            $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
            $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
        } else if ($(ev.target).hasClass('potential')) {
            fixNums($($(ev.target).children()[1]).text());
            $(ev.target).toggleClass('potential unlocked').empty().append("<span class='chunkId'>" + (Math.floor(ev.target.id % rowSize) * (skip + rowSize) - Math.floor(ev.target.id / rowSize) + startingIndex) + "</span>");
            $('.potential > .label').css('color', 'white');
            $('.potential').toggleClass('selected potential');
            autoSelectNeighbors && selectNeighbors(ev.target);
            autoRemoveSelected && $('.selected').toggleClass('selected gray').empty().append("<span class='chunkId'>" + (Math.floor(ev.target.id % rowSize) * (skip + rowSize) - Math.floor(ev.target.id / rowSize) + startingIndex) + "</span>") && (selectedChunks = 1) && (selectedNum = 1);
            $('.pick').text('Pick Chunk');
            $('.roll2').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
            isPicking = false;
            $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
            $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
        } else {
            $(ev.target).toggleClass('gray unlocked');
            $('#chunkInfo1').text('Unlocked chunks: ' + --unlockedChunks);
        }
        !showChunkIds && $('.chunkId').hide();
        setData();
        chunkBorders();
    }
});

// Once document is loaded, create listeners on page elements
$(document).ready(function() {
    !window.location.href.split('?')[1] && $('.loading').hide();
    checkMID(window.location.href.split('?')[1]);

    $('.mid').on('input', function(e) {
        if ((!/^[a-zA-Z]+$/.test(e.target.value) && e.target.value !== '') || e.target.value.length > 3) {
            $(this).val(prevValueMid);
        } else {
            $(this).val(e.target.value.toUpperCase());
            prevValueMid = e.target.value;
            if (e.target.value.length === 3) {
                midGood = true;
                checkIfGood();
            } else {
                midGood = false;
                $('#access').prop('disabled', true);
            }
        }
    });
    
    $('.pin.new').on('input', function(e) {
        if (isNaN(e.target.value) || e.target.value.length > 4) {
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
        if (isNaN(e.target.value) || e.target.value.length > 4) {
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
        if (isNaN(e.target.value) || e.target.value.length > 4) {
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
        if (isNaN(e.target.value) || e.target.value.length > 4) {
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
        if ((!/^[a-zA-Z]+$/.test(e.target.value) && e.target.value !== '') || e.target.value.length > 3) {
            $(this).val(prevValueMid2);
        } else {
            $(this).val(e.target.value.toUpperCase());
            prevValueMid2 = e.target.value;
            if (e.target.value.length === 3) {
                mid2Good = true;
                checkIfGood2();
            } else {
                mid2Good = false;
                $('#change-pin').prop('disabled', true);
            }
        }
    });
    
    $('.pin.old2.first').on('input', function(e) {
        if (isNaN(e.target.value) || e.target.value.length > 4) {
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
        if (isNaN(e.target.value) || e.target.value.length > 4) {
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
    
    $('.mid').on('keypress', function(e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13'){
            $('.pin.old').select();
        }
    });
    
    $('.pin.new').on('keypress', function(e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && !$('#create2').prop('disabled')) {
            $('#create2').click();	
        }
    });
    
    $('.pin.old').on('keypress', function(e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && !$('#access').prop('disabled')) {
            $('#access').click();	
        }
    });
    
    $('.lock-pin').on('keypress', function(e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && !$('#lock-unlock').prop('disabled')) {
            $('#lock-unlock').click();	
        }
    });

    $('.pin.entry').on('keypress', function(e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && !$('#unlock-entry').prop('disabled')) {
            $('#unlock-entry').click();	
        }
    });

    $('.mid-old').on('keypress', function(e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13'){
            $('.pin.old2.first').select();
        }
    });
    
    $('.pin.old2.first').on('keypress', function(e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('.pin.old2.second').select();	
        }
    });
    
    $('.pin.old2.second').on('keypress', function(e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && !$('#change-pin').prop('disabled')) {
            $('#change-pin').click();	
        }
    });

    $('.url').on('keypress', function(e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && !$('#import2').prop('disabled')) {
            $('#import2').click();	
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
    if (atHome || inEntry || importMenuOpen) {
        e.preventDefault();
        return;
    }
    e.preventDefault();
    var imageDiv = document.getElementById("imgDiv");
    // Calculate the direction of scrolling
    var dir;
    if (e.type === 'DOMMouseScroll') {
        if (e.detail < 0) {
            dir = .1
        } else {
            dir = -.1;
        }
    } else {
        if (e.originalEvent.wheelDelta > 0) {
            dir = .1
        } else {
            dir = -.1;
        }
    }

    // Set minimum and maximum zoom of map
    var minWidth = Math.floor(0.95 * window.innerWidth);
    var maxWidth = Math.floor(10 * window.innerWidth);
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
    $('.box').css('font-size', fontZoom + 'px');
});

// Prevent arrow key movement
$(document).on({
    'keydown': function(e) {
        if (e.keyCode === 27 && screenshotMode) {
            screenshotMode = false;
            $('.escape-hint').hide();
            $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .topnav, #beta').show();
            settings();
        } else if ((e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32)) {
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
        if (e.button !== 0 || atHome || inEntry || importMenuOpen) {
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
        if (e.button !== 0 || atHome || inEntry || importMenuOpen) {
            return;
        }
        clicked = true;
        moved = false;
        movedNum = 0;
        clickX = e.pageX;
        clickY = e.pageY;
    },
    'mouseup': function(e) {
        if (e.button !== 0 || atHome || inEntry || importMenuOpen) {
            return;
        }
        clicked = false;
        if (movedNum > 1) {
            prevScrollLeft = prevScrollLeft + scrollLeft;
            prevScrollTop = prevScrollTop + scrollTop;
        } else if ($(e.target).hasClass('box')) {
            if (onMobile) {
                return;
            } else if (locked) {
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
                $(e.target).addClass('selected').removeClass('gray').append('<span class="label">' + selectedNum + '</span>');
                selectedNum++;
                $('.label').css('font-size', labelZoom + 'px');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            } else if ($(e.target).hasClass('selected')) {
                fixNums($($(e.target).children()[1]).text());
                $(e.target).addClass('unlocked').removeClass('selected').empty().append("<span class='chunkId'>" + (Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex) + "</span>");
                $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
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
            } else if ($(e.target).hasClass('recent')) {
                // ----
            } else {
                $(e.target).addClass('gray').removeClass('unlocked').css('border-width', 0);
                $('#chunkInfo1').text('Unlocked chunks: ' + --unlockedChunks);
                
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
}

// Pick button: picks a random chunk from selected/potential
var pick = function() {
    if (locked || importMenuOpen) {
        return;
    }
    var el;
    var rand;
    var sNum;
    if (!isPicking) {
        el = $('.selected');
        rand = Math.floor(Math.random() * el.length);
        sNum = $(el[rand]).children().text();
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
    setData();
    chunkBorders();
}

// Roll 2 button: rolls 2 chunks from all selected chunks
var roll2 = function() {
    if (locked || importMenuOpen) {
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
    $('#toggleNeighbors').toggleClass('on off');
    if ($('#toggleNeighbors').hasClass('on')) {
        $('#toggleNeighbors').text('ON');
    } else {
        $('#toggleNeighbors').text('OFF');
    }
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
    $('#toggleRemove').toggleClass('on off');
    if ($('#toggleRemove').hasClass('on')) {
        $('#toggleRemove').text('ON');
    } else {
        $('#toggleRemove').text('OFF');
    }
    if (autoSelectNeighbors && autoRemoveSelected) {
        toggleNeighbors();
    }
    extra !== 'startup' && !locked && setData();
}

// Toggle functionality for showing chunk ids
var toggleIds = function() {
    showChunkIds = !showChunkIds;
    document.cookie = "ids=" + showChunkIds;
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
            isPicking = false;
            selectedChunks = 0;
            unlockedChunks = 0;
            selectedNum = 1;

            selected && selected.sort(function(a, b){return b-a}).forEach(function(id) {
                id.startsWith('0') && (id = id.substr(1));
                $('#' + id).addClass('selected').removeClass('gray potential unlocked').append('<span class="label">' + selectedNum++ + '</span>');
                $('.label').css('font-size', labelZoom + 'px');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            });

            unlocked && unlocked.forEach(function(id) {
                id.startsWith('0') && (id = id.substr(1));
                $('#' + id).addClass('unlocked').removeClass('gray selected potential');
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
            });
            !showChunkIds && $('.chunkId').hide();
            setData();
            chunkBorders();
            $('#import-menu').css({'opacity': 0}).hide();
            $('.import').css('opacity', 0).show();
            $('.import').animate({'opacity': 1});
            setTimeout(function() {
                $('#import-menu').css('opacity', 1);
                $('#import2').prop('disabled', false).html('Unlock');
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
        $('#import2').prop('disabled', false).html('Unlock');
        $('.url').val('');
        $('.url').removeClass('wrong');
        $('.url-err').css('visibility', 'hidden');
        importMenuOpen = false;
    }, 500);
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
                firebase.auth().signInAnonymously().catch(function(error) {console.log(error)});
                $('.center').css('top', '15vw');
                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .roll2toggle, .unpicktoggle').css('opacity', 0).show();
                !isPicking && roll2On && $('.roll2').css('opacity', 0).show();
                !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
                $('#entry-menu').animate({'opacity': 0});
                setTimeout(function() {
                    $('#entry-menu').css('opacity', 1).hide();
                    $('.pin.entry').val('');
                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .roll2toggle, .unpicktoggle').animate({'opacity': 1});
                    !isPicking && roll2On && $('.roll2').animate({'opacity': 1});
                    !isPicking && unpickOn && $('.unpick').animate({'opacity': 1});
                    $('#unlock-entry').prop('disabled', false).html('Unlock');
                    locked = false;
                    inEntry = false;
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
        $('.lock-closed').animate({'opacity': 1});
        $('#unlock-entry').prop('disabled', false).html('Unlock');
        locked = true;
        inEntry = false;
    }, 500);
}

// On the home page, advances to the next screen
var nextPage = function(page) {
    if (page === 'create') {
        $('#create2').prop('disabled', true);
        $('#page1').hide();
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
        $('#page1').hide();
        $('#page2b').show();
        $('.mid').focus();
    }
}

// On the home page, goes back to the previous page
var prevPage = function(page) {
    if (page === 'create2') {
        $('#page2a').hide();
        $('#page1').show();
        pin = '';
        $('.pin').val('');
    } else if (page === 'create3') {
        $('#page3a').hide();
        $('#page2a').show();
        $('.pin').focus();
    } else if (page === 'mid') {
        $('#page2b').hide();
        $('#page1').show();
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
            firebase.auth().signInAnonymously().catch(function(error) {console.log(error)});
            window.history.replaceState(window.location.href.split('?')[0], 'Chunk Picker V2', '?' + mid);
            $('#entry-menu').hide();
            $('.lock-opened').show();
            $('.lock-closed').hide();
            locked = false;
        } else {
            window.history.replaceState(window.location.href.split('?')[0], 'Chunk Picker V2', '?' + mid);
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
            myRef = firebase.database().ref('maps/' + mid);
            myRef.child('pin').set(pinNew);
            window.history.replaceState(window.location.href.split('?')[0], 'Chunk Picker V2', '?' + mid);
            $('.lock-closed, .lock-opened').hide();
            locked = true;
            inEntry = true;
            atHome = false;
            $('.loading').show();
            $('#page8').hide();
            $('.background-img').hide();
            setupMap();
        }).catch(function(error) {console.log(error)});
    });
}

// Unpicks a random unlocked chunk
var unpick = function() {
    if (locked || importMenuOpen) {
        return;
    }
    var el = $('.unlocked');
    if (el.length <= 0) {
        return;
    }
    var rand = Math.floor(Math.random() * el.length);
    $(el[rand]).addClass('selected').removeClass('unlocked').addClass('recent').empty().append("<span class='chunkId'>" + (Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex) + "</span>").append('<span class="label">' + selectedNum + '</span>');
    $('.label').css('font-size', labelZoom + 'px');
    selectedNum++;
    $('#chunkInfo1').text('Unlocked chunks: ' + --unlockedChunks);
    $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
    scrollToPos(parseInt($(el[rand]).attr('id')) % rowSize, Math.floor(parseInt($(el[rand]).attr('id')) / rowSize), 0, 0, false);
    !showChunkIds && $('.chunkId').hide();
    setData();
    chunkBorders();
    $(el[rand]).css('border-width', '0px');
}

// Opens the settings menu
var settings = function() {
    settingsOpen = !settingsOpen;
    if (settingsOpen) {
        $('.settings-menu').css('opacity', 0).show();
        $('.settings-menu').animate({'opacity': 1});
        $('.settings').addClass('whirl').animate({'color': 'rgb(150, 150, 150)'});
    } else {
        $('.settings-menu').animate({'opacity': 0});
        $('.settings').removeClass('whirl').addClass('smallspin').animate({'color': 'black'});
        setTimeout(function() {
            $('.settings-menu').hide();
            $('.settings').removeClass('smallspin')
        }, 500);
    }
}

// Enables screenshot mode
var enableScreenshotMode = function() {
    $('.menu, .menu2, .menu3, .menu4, .menu5, .menu6, .settings-menu, .topnav, #beta').hide();
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
var toggleVisibility = function(extra) {
    highVisibilityMode = !highVisibilityMode;
    highVisibilityMode ? $('.box').addClass('visible') : $('.box').removeClass('visible');
    $('.visibilitytoggle').toggleClass('item-off item-on');
    extra !== 'startup' && !locked && setData();
}

// Toggles the visibility of the roll2 button
var toggleRoll2 = function(extra) {
    roll2On = !roll2On;
    roll2On ? $('.roll2').show() : $('.roll2').hide();
    extra !== 'startup' && $('.roll2').css('opacity', 1);
    $('.roll2toggle').toggleClass('item-off item-on');
    $('.roll2toggle > .pic').toggleClass('zmdi-plus zmdi-minus');
    extra !== 'startup' && !locked && setData();
}

// Toggles the visibility of the unpick button
var toggleUnpick = function(extra) {
    unpickOn = !unpickOn;
    unpickOn ? $('.unpick').show() : $('.unpick').hide();
    extra !== 'startup' && $('.unpick').css('opacity', 1);
    $('.unpicktoggle').toggleClass('item-off item-on');
    $('.unpicktoggle > .pic').toggleClass('zmdi-plus zmdi-minus');
    extra !== 'startup' && !locked && setData();
}

// ----------------------------------------------------------

// Other Functions

// ----------------------------------------------------------

// Once page has loaded, page is centered and initial chunks are selected/unlocked (from url)
var doneLoading = function() {
    if (onMobile) {
        console.log('mobile');
        $('.pick, .roll2, .unpick, .center').css({'height': '40px', 'font-size': zoom/fontZoom*1.5 + 'px'});
        $('.text, .toggle').css('font-size', zoom/fontZoom + 'px');
        $('.box').addClass('mobile').css({'height': zoom/rowSize + 'vw', 'width': zoom/rowSize + 'vw'});
        $('.body').append(`<div class='menu4'>
            <button id='zoomIn' class='icon' onclick="zoomButton(1)">+</button>
            <button id='zoomOut' class='icon' onclick="zoomButton(-1)">-</button>
        </div>`);
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
        $('#page1, #import-menu').hide();
        if (locked) {
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .roll2toggle, .unpicktoggle').css('opacity', 0).hide();
            !isPicking && $('.roll2, .unpick').css('opacity', 0).hide();
            $('.center').css('top', '0vw');
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            $('.pin.entry').focus();
        } else {
            $('.center').css('top', '15vw');
        }
        if (locked === undefined) {
            locked = true;
            $('.lock-closed, .lock-opened').hide();
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .roll2toggle, .unpicktoggle').css('opacity', 0).hide();
            $('.center').css('top', '0vw');
            !isPicking && $('.roll2, .unpick').css('opacity', 0).hide();
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            $('.pin.entry').focus();
        }
        for (var i = 0; i < fullSize; i++) {
            $('.btnDiv').append(`<div id=${i} class='box gray'><span class='chunkId'>${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex}</span></div>`);
        }
        $('.box').css('font-size', fontZoom + 'px');
        $('.label').css('font-size', labelZoom + 'px');
        !mid && (mid = window.location.href.split('?')[1]);
        $('.toptitle2').text(mid.toUpperCase());
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
                $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label">' + selectedNum + '</span>');
                selectedNum++;
                $('.label').css('font-size', labelZoom + 'px');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            }
        } else {
            num = ((i - 3) * 2 + 1) * rowSize;
            if (parseInt(el.id) + num >= 0 && parseInt(el.id) + num < fullSize && $(`#${parseInt(el.id)  + num}`).hasClass('gray')) {
                $(`#${parseInt(el.id) + num}`).addClass('selected').removeClass('gray').append('<span class="label">' + selectedNum + '</span>');
                selectedNum++;
                $('.label').css('font-size', labelZoom + 'px');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            }
        }
    }
}

// Scroll to new position (for panning/dragging)
var updateScrollPos = function(e) {
    let newScrollLeft = prevScrollLeft - (clickX - e.pageX);
    let newScrollTop = prevScrollTop - (clickY - e.pageY);
    if (newScrollLeft > 100) {
        newScrollLeft = 100;
        prevScrollLeft = 100;
        clickX = e.pageX;
    }
    if (newScrollTop > 150) {
        newScrollTop = 150;
        prevScrollTop = 150;
        clickY = e.pageY;
    }
    if (newScrollLeft + $('.imgDiv').width() + 100 < window.innerWidth) {
        newScrollLeft = -$('.imgDiv').width() + window.innerWidth - 100;
        prevScrollLeft = -$('.imgDiv').width() + window.innerWidth - 100;
        clickX = e.pageX;
    }
    if (newScrollTop + $('.imgDiv').height() + 100 < window.innerHeight) {
        newScrollTop = -$('.imgDiv').height() + window.innerHeight - 100;
        prevScrollTop = -$('.imgDiv').height() + window.innerHeight - 100;
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
            $(this).text(parseInt($(this).text()) - 1);
        }
    });
    selectedNum--;
}

var checkMID = function(mid) {
    if (mid === 'change-pin') {
        atHome = true;
        $('.loading, .ui-loader-header').remove();
        $('#home-menu').hide();
        $('#pin-menu').show();
        $('.mid-old').focus();
    } else if (mid) {
        databaseRef.child('maps/' + mid).once('value', function(snap) {
            if (snap.val()) {
                myRef = firebase.database().ref('maps/' + mid);
                atHome = false;
                $('.background-img').hide();
                inEntry = true;
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

// Loads data from Firebase
var loadData = function() {
    myRef.once('value', function(snap) {
        var picking = false;
        var settings = snap.val()['settings'];
        var chunks = snap.val()['chunks'];
        settings['ids'] = document.cookie.split(';').filter(function(item) {
            return item.indexOf('ids=true') >= 0
        }).length > 0;

        settings['neighbors'] && toggleNeighbors('startup');
        settings['remove'] && toggleRemove('startup');
        settings['ids'] && toggleIds() && $('.box').addClass('quality');
        !settings['ids'] && $('.chunkId').hide();
        settings['roll2'] && toggleRoll2('startup');
        settings['unpick'] && toggleUnpick('startup');

        chunks && chunks['potential'] && Object.keys(chunks['potential']).sort(function(a, b){return b-a}).forEach(function(id) {
            picking = true;
            $('.box:contains(' + id + ')').addClass('potential').removeClass('gray selected unlocked').append('<span class="label">' + selectedNum++ + '</span>');
            $('.label').css('font-size', labelZoom + 'px');
            $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
        });

        chunks && chunks['selected'] && Object.keys(chunks['selected']).sort(function(a, b){return b-a}).forEach(function(id) {
            $('.box:contains(' + id + ')').addClass('selected').removeClass('gray potential unlocked').append('<span class="label">' + selectedNum++ + '</span>');
            $('.label').css('font-size', labelZoom + 'px');
            $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
        });

        chunks && chunks['unlocked'] && Object.keys(chunks['unlocked']).forEach(function(id) {
            $('.box:contains(' + id + ')').addClass('unlocked').removeClass('gray selected potential');
            $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
        });

        if (picking) {
            $('.roll2, .unpick').css({'opacity': 0, 'cursor': 'default'}).prop('disabled', true).hide();
            $('.pick').text('Pick for me');
            isPicking = true;
        }
        chunkBorders();
        center('quick');
    });
}

// Stores data in Firebase
var setData = function() {
    myRef.child('settings').update({'neighbors': autoSelectNeighbors, 'remove': autoRemoveSelected, 'roll2': roll2On, 'unpick': unpickOn});
    document.cookie = "ids=" + showChunkIds;

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
    var char1, char2, char3, charSet;
    var badNums = true;
    databaseRef.once('value', function(snap) {
        while (badNums) {
            char1 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            char2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            char3 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            charSet = char1 + char2 + char3;
            !snap.val()['maps'][charSet] && (badNums = false);
        }
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var temp = snap.val()['template'];
                temp.pin = pin;
                databaseRef.child('maps/' + charSet).set(temp);
            }
        });
        firebase.auth().signInAnonymously().catch(function(error) {console.log(error)});
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
            firebase.auth().signInAnonymously().catch(function(error) {console.log(error)});
            $('.center').css('top', '15vw');
            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .roll2toggle, .unpicktoggle').css('opacity', 0).show();
            !isPicking && roll2On && $('.roll2').css('opacity', 0).show();
            !isPicking && unpickOn && $('.unpick').css('opacity', 0).show();
            $('.lock-box').animate({'opacity': 0});
            setTimeout(function() {
                $('.lock-box').css('opacity', 1).hide();
                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text, .import, .pinchange, .roll2toggle, .unpicktoggle').animate({'opacity': 1});
                !isPicking && roll2On && $('.roll2').animate({'opacity': 1});
                !isPicking && unpickOn && $('.unpick').animate({'opacity': 1});
                $('#lock-unlock').prop('disabled', false).html('Unlock');
                locked = lock;
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