/* 
 * Created by Source Link AKA Source Chunk
 * Revision of an idea by Amehzyn
 * With help from Slay to Stay for chunk Id's
 * 9/11/2019
 */

var onMobile = typeof window.orientation !== 'undefined';                   // Is user on a mobile device
var isPicking = false;                                                      // Has the user just rolled 2 chunks and is currently picking
var autoSelectNeighbors = false;                                            // Toggle state for select neighbors button
var autoRemoveSelected = false;                                             // Toggle state for remove selected button
var showChunkIds = false;                                                   // Toggle state for show chunk ids button
var clicked = false;                                                        // Is mouse being held down

var zoom = 350;                                                             // Starting zoom value
var maxZoom = 550;                                                          // Furthest zoom in value
var minZoom = onMobile ? 275 : 100;                                         // Smallest zoom out value
var fontZoom = 175;                                                         // Font size zoom
var labelZoom = 60;                                                         // Selected label font size zoom
var scale = 30;                                                             // Amount zoomed every 'zoom' action
var fullSize = 1075;                                                        // Amount of chunks present
var rowSize = 43;                                                           // Amount of chunks per row
var scrollLeft = 0;                                                         // Amount the board is scrolled left offscreen
var prevScrollLeft = 0;                                                     // Amount the board was previously scrolled left offscreen
var scrollTop = 0;                                                          // Amount the board is scrolled up offscreen
var prevScrollTop = 0;                                                      // Amount the board was previously scrolled up offscreen

var ratio = 4800 / 8256;                                                    // Image ratio
var movedNum = 0;                                                           // Amount of times mouse is moved while dragging
var selectedNum = 1;                                                        // Current index of selected chunks
var unlockedChunks = 0;                                                     // Number of unlocked chunks
var selectedChunks = 0;                                                     // Number of selected chunks
var startingIndex = 4671;                                                   // Index to start chunk numbering at (based on ChunkLite numbers)
var skip = 213;                                                             // Number of indices to skip between columns for chunk numbering

var prevValueMid = '';                                                      // Preview value of map id at login
var prevValuePinNew = '';                                                   // Preview value of pin id at signup
var prevValuePinOld = '';                                                   // Preview value of pin id at login
var prevValueLockPin = '';                                                  // Preview value of pin id at map login
var mid;                                                                    // Current value of map id
var pin;                                                                    // Current value of pin

var midGood = false;                                                        // Is the map id valid
var pinGood = true;                                                         // Is the pin valid
var atHome;                                                                 // Is the user on the homepage
var locked;                                                                 // Is the user not logged in
var lockBoxOpen = false;                                                    // Is the lock box open
var inEntry = false;                                                        // Is the entry menu open

var databaseRef = firebase.database().ref();                                // Firebase database reference
var myRef;                                                                  // Firebase database reference for this map ID

var hammertime = new Hammer(document.getElementsByClassName('body')[0]);    // Initialize Hammerjs [Mobile]
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
    if (onMobile && !atHome && !inEntry) {
        clickX = ev.changedPointers[0].pageX;
        clickY = ev.changedPointers[0].pageY;
    }
});

// [Mobile] Mobile equivalent to 'mouseup', ends drag sequence
hammertime.on('panend', function(ev) {
    if (onMobile && !atHome && !inEntry) {
        prevScrollLeft = prevScrollLeft + scrollLeft;
        prevScrollTop = prevScrollTop + scrollTop;
    }
});

// [Mobile] Mobile equivalent to 'mousemove', determines amount dragged since last trigger
hammertime.on('panleft panright panup pandown', function(ev) {
    if (onMobile && !atHome && !inEntry) {
        updateScrollPos(ev.changedPointers[0]);
    }
});

//[Mobile] Handles mobile 'clicks'
hammertime.on('tap', function(ev) {
    if (onMobile && !atHome && !inEntry && $(ev.target).hasClass('box') && !locked) {
        if ($(ev.target).hasClass('gray')) {
            $(ev.target).toggleClass('gray selected').append('<span class="label">' + selectedNum + '</span>');
            selectedNum++;
            $('.label').css('font-size', zoom/labelZoom + 'vw');
            $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
        } else if ($(ev.target).hasClass('selected')) {
            fixNums($(ev.target).children().text());
            $(ev.target).toggleClass('selected unlocked').empty().append(Math.floor(ev.target.id % rowSize) * (skip + rowSize) - Math.floor(ev.target.id / rowSize) + startingIndex);
            $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
            $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
        } else if ($(ev.target).hasClass('potential')) {
            fixNums($(ev.target).children().text());
            $(ev.target).toggleClass('potential unlocked').empty().append(Math.floor(ev.target.id % rowSize) * (skip + rowSize) - Math.floor(ev.target.id / rowSize) + startingIndex);
            $('.potential > .label').css('color', 'white');
            $('.potential').toggleClass('selected potential');
            autoSelectNeighbors && selectNeighbors(ev.target);
            autoRemoveSelected && $('.selected').toggleClass('selected gray').empty().append(Math.floor(ev.target.id % rowSize) * (skip + rowSize) - Math.floor(ev.target.id / rowSize) + startingIndex) && (selectedChunks = 1) && (selectedNum = 1);
            $('.pick').text('Pick Chunk');
            $('.roll2').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
            isPicking = false;
            $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
            $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
        } else {
            $(ev.target).toggleClass('gray unlocked');
            $('#chunkInfo1').text('Unlocked chunks: ' + --unlockedChunks);
        }
        setData();
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

    $('.lock-closed').hover(function () {
        $(this).removeClass('zmdi-lock').addClass('zmdi-lock-open');
    }, function () {
        $(this).removeClass('zmdi-lock-open').addClass('zmdi-lock');
    });
});

// Prevent arrow key movement
$(document).on({
    'keydown': function(e) {
        if ((e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32)) {
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
        if (e.button !== 0 || atHome || inEntry) {
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
        if (e.button !== 0 || atHome || inEntry) {
            return;
        }
        clicked = true;
        moved = false;
        movedNum = 0;
        clickX = e.pageX;
        clickY = e.pageY;
    },
    'mouseup': function(e) {
        if (e.button !== 0 || atHome || inEntry) {
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
            }
            if ($(e.target).hasClass('gray')) {
                $(e.target).toggleClass('gray selected').append('<span class="label">' + selectedNum + '</span>');
                selectedNum++;
                $('.label').css('font-size', zoom/labelZoom + 'vw');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            } else if ($(e.target).hasClass('selected')) {
                fixNums($(e.target).children().text());
                $(e.target).toggleClass('selected unlocked').empty().append(Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex);
                $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
            } else if ($(e.target).hasClass('potential')) {
                fixNums($(e.target).children().text());
                $(e.target).toggleClass('potential unlocked').empty().append(Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex);
                $('.potential > .label').css('color', 'white');
                $('.potential').toggleClass('selected potential');
                autoSelectNeighbors && selectNeighbors(e.target);
                autoRemoveSelected && $('.selected').toggleClass('selected gray').empty().append(Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex) && (selectedChunks = 1) && (selectedNum = 1);
                $('.pick').text('Pick Chunk');
                $('.roll2').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
                isPicking = false;
                $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
            } else if ($(e.target).hasClass('recent')) {
                // ----
            } else {
                $(e.target).toggleClass('gray unlocked');
                $('#chunkInfo1').text('Unlocked chunks: ' + --unlockedChunks);
            }
            setData();
        }
        $('.outer').css('cursor', 'default');
    }
});

// Handles zooming
$(".body").on('scroll mousewheel', function(e) {
    if (atHome || inEntry) {
        return;
    }
    let oldZoom = zoom;
    e.preventDefault();
    if (e.originalEvent.wheelDelta >= 0) {
        zoom += scale;
        zoom > maxZoom ? zoom = maxZoom : zoom = zoom;
    } else {
        zoom -= scale;
        zoom < minZoom ? zoom = minZoom : zoom = zoom;
    }
    prevScrollLeft = -((zoom/oldZoom) * (-prevScrollLeft + e.clientX)) + e.clientX;
    prevScrollTop = -((zoom/oldZoom) * (-prevScrollTop + e.clientY)) + e.clientY;
    if (prevScrollLeft > 0) {
        prevScrollLeft = 0;
    }
    if (prevScrollTop > 0) {
        prevScrollTop = 0;
    }
    if (prevScrollLeft - $(window).width() < -zoom / 100 * $(window).width()) {
        prevScrollLeft = -(zoom / 100 * $(window).width()) + $(window).width();
    }
    if (prevScrollTop - $(window).height() < -zoom / 100 * $(window).width() * ratio) {
        prevScrollTop = -(zoom / 100 * $(window).width() * ratio) + $(window).height();
    }
    $('.img').css({marginLeft: prevScrollLeft, marginTop: prevScrollTop});
    $('.outer').css({marginLeft: prevScrollLeft, marginTop: prevScrollTop});
    $('.img').width(zoom + 'vw');
    $('.outer').width(zoom + 'vw');
    $('.box').width(zoom/rowSize + 'vw').height(zoom/rowSize + 'vw').css('font-size', zoom/fontZoom + 'vw');
    $('.label').css('font-size', zoom/labelZoom + 'vw');
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
    prevScrollLeft = -((zoom/oldZoom) * (-prevScrollLeft + $(window).width()/2)) + $(window).width()/2;
    prevScrollTop = -((zoom/oldZoom) * (-prevScrollTop + $(window).height()/2)) + $(window).height()/2;
    if (prevScrollLeft > 0) {
        prevScrollLeft = 0;
    }
    if (prevScrollTop > 0) {
        prevScrollTop = 0;
    }
    if (prevScrollLeft - $(window).width() < -zoom / 100 * $(window).width()) {
        prevScrollLeft = -(zoom / 100 * $(window).width()) + $(window).width();
    }
    if (prevScrollTop - $(window).height() < -zoom / 100 * $(window).width() * ratio) {
        prevScrollTop = -(zoom / 100 * $(window).width() * ratio) + $(window).height();
    }
    $('.img').css({marginLeft: prevScrollLeft, marginTop: prevScrollTop});
    $('.outer').css({marginLeft: prevScrollLeft, marginTop: prevScrollTop});
    $('.img').width(zoom + 'vw');
    $('.outer').width(zoom + 'vw');
    $('.box').width(zoom/rowSize + 'vw').height(zoom/rowSize + 'vw').css('font-size', zoom/fontZoom + 'vw');
    $('.label').css('font-size', zoom/labelZoom + 'vw');
}

// Pick button: picks a random chunk from selected/potential
var pick = function() {
    if (locked) {
        return;
    }
    var el;
    var rand;
    var sNum;
    if (!isPicking) {
        el = $('.selected');
        rand = Math.floor(Math.random() * el.length);
        sNum = $(el[rand]).children().text();
        $(el[rand]).toggleClass('selected unlocked').addClass('recent').empty().append(Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex);
    } else {
        el = $('.potential');
        var rand = Math.floor(Math.random() * el.length);
        sNum = $(el[rand]).children().text();
        $(el[rand]).toggleClass('potential unlocked').addClass('recent').empty().append(Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex);
        $('.potential > .label').css('color', 'white');
        $('.potential').toggleClass('selected potential');
        isPicking = false;
        $('.pick').text('Pick Chunk');
        $('.roll2').css({'opacity': 1, 'cursor': 'pointer'}).prop('disabled', false).show();
    }
    fixNums(sNum);
    autoSelectNeighbors && selectNeighbors(el[rand]);
    autoRemoveSelected && $('.selected').toggleClass('selected gray').empty().append(Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex) && (selectedChunks = 1) && (selectedNum = 1);
    $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
    $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
    scrollToPos(parseInt($(el[rand]).attr('id')) % rowSize, Math.floor(parseInt($(el[rand]).attr('id')) / rowSize), 0, 0, false);
    setData();
}

// Roll 2 button: rolls 2 chunks from all selected chunks
var roll2 = function() {
    if (locked) {
        return;
    }
    isPicking = true;
    var el = $('.selected');
    var rand;
    if (el.length > 0) {
        $('.roll2').css({'opacity': 0, 'cursor': 'default'}).prop('disabled', true).hide();
        $('.pick').text('Pick for me');
    }
    for (var i = 0; i < 2; i++) {
        el = $('.selected');
        rand = Math.floor(Math.random() * el.length);
        $(el[rand]).toggleClass('selected potential');
        $('.potential > .label').css('color', 'black');
    }
    setData();
}

// Toggle functionality for if neighbors are to be selected on chunk pick
var toggleNeighbors = function(extra) {
    if (locked && extra !== 'startup') {
        return;
    }
    autoSelectNeighbors = !autoSelectNeighbors;
    $('#toggleNeighbors').toggleClass('on').toggleClass('off');
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
    $('#toggleRemove').toggleClass('on').toggleClass('off');
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
var toggleIds = function(extra) {
    showChunkIds = !showChunkIds;
    $('#toggleIds').toggleClass('on off');
    if ($('#toggleIds').hasClass('on')) {
        $('#toggleIds').text('ON');
        $('.box').css('color', 'rgba(255, 255, 255, 255)');
    } else {
        $('#toggleIds').text('OFF');
        $('.box').css('color', 'rgba(255, 255, 255, 0)');
    }
    extra !== 'startup' && !locked && setData();
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
                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text').css('opacity', 0).show();
                !isPicking && $('.roll2').css('opacity', 0).show();
                $('#entry-menu').animate({'opacity': 0});
                setTimeout(function() {
                    $('#entry-menu').css('opacity', 1).hide();
                    $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text').animate({'opacity': 1});
                    !isPicking && $('.roll2').animate({'opacity': 1});
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
        setTimeout(function() {
            $('#page2a').hide();
            $('#page3a').show();
            pin = $('.pin').val();
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
    var mid = $('.mid').removeClass('wrong').val().toLowerCase();
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

// ----------------------------------------------------------

// Other Functions

// ----------------------------------------------------------

// Once page has loaded, page is centered and initial chunks are selected/unlocked (from url)
var doneLoading = function() {
    if (onMobile) {
        console.log('mobile');
        $('.pick, .roll2, .center').css({'height': '40px', 'font-size': zoom/fontZoom*1.5 + 'px'});
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
        $('#page1').hide();
        if (locked) {
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text').css('opacity', 0).hide();
            !isPicking && $('.roll2').css('opacity', 0).hide();
            $('.center').css('top', '0vw');
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            $('.pin.entry').focus();
        } else {
            $('.center').css('top', '15vw');
        }
        if (locked === undefined) {
            locked = true;
            $('.lock-closed, .lock-opened').hide();
            $('.pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text').css('opacity', 0).hide();
            $('.center').css('top', '0vw');
            !isPicking && $('.roll2').css('opacity', 0).hide();
            $('.center, #toggleIds, .toggleIds.text').css('opacity', 1).show();
            $('.pin.entry').focus();
        }
        for (var i = 0; i < fullSize; i++) {
            $('.outer').append(`<div id=${i} class='box gray'>${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex}</div>`);
        }
        $('.img').width(zoom + 'vw');
        $('.outer').width(zoom + 'vw');
        $('.box').width(zoom/rowSize + 'vw').height(zoom/rowSize + 'vw').css('font-size', zoom/fontZoom + 'vw');
        $('.label').css('font-size', zoom/labelZoom + 'vw');
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
                $(`#${parseInt(el.id) + num}`).toggleClass('selected gray').append('<span class="label">' + selectedNum + '</span>');
                selectedNum++;
                $('.label').css('font-size', zoom/labelZoom + 'vw');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            }
        } else {
            num = ((i - 3) * 2 + 1) * rowSize;
            if (parseInt(el.id) + num >= 0 && parseInt(el.id) + num < fullSize && $(`#${parseInt(el.id)  + num}`).hasClass('gray')) {
                $(`#${parseInt(el.id) + num}`).toggleClass('selected gray').append('<span class="label">' + selectedNum + '</span>');
                selectedNum++;
                $('.label').css('font-size', zoom/labelZoom + 'vw');
                $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
            }
        }
    }
}

// Scroll to new position (for panning/dragging)
var updateScrollPos = function(e) {
    let newScrollLeft = prevScrollLeft - (clickX - e.pageX);
    let newScrollTop = prevScrollTop - (clickY - e.pageY);
    if (newScrollLeft > 0) {
        newScrollLeft = 0;
        prevScrollLeft = 0;
        clickX = e.pageX;
    }
    if (newScrollTop > 0) {
        newScrollTop = 0;
        prevScrollTop = 0;
        clickY = e.pageY;
    }
    if (newScrollLeft - $(window).width() < -zoom / 100 * $(window).width()) {
        newScrollLeft = -(zoom / 100 * $(window).width()) + $(window).width();
        prevScrollLeft = -(zoom / 100 * $(window).width()) + $(window).width();
        clickX = e.pageX;
    }
    if (newScrollTop - $(window).height() < -zoom / 100 * $(window).width() * ratio) {
        newScrollTop = -(zoom / 100 * $(window).width() * ratio) + $(window).height();
        prevScrollTop = -(zoom / 100 * $(window).width() * ratio) + $(window).height();
        clickY = e.pageY;
    }
    $('.img').css({marginLeft: newScrollLeft, marginTop: newScrollTop});
    $('.outer').css({marginLeft: newScrollLeft, marginTop: newScrollTop});
    scrollLeft = - (clickX - e.pageX);
    scrollTop = - (clickY - e.pageY);
}

// Scrolls to position x.xPart, y.yPart
var scrollToPos = function(x, y, xPart, yPart, doQuick) {
    $('.img').width(zoom + 'vw');
    $('.outer').width(zoom + 'vw');
    $('.box').width(zoom/rowSize + 'vw').height(zoom/rowSize + 'vw').css('font-size', zoom/fontZoom + 'vw');
    $('.label').css('font-size', zoom/labelZoom + 'vw');
    prevScrollLeft = -$('#' + (y * rowSize + x)).position().left + $(window).width() / 2 - $('#' + (rowSize + 1)).position().left * (xPart + .5);
    prevScrollTop = -$('#' + (y * rowSize + x)).position().top + $(window).height() / 2 - $('#' + (rowSize + 1)).position().top * (yPart + .5);
    if (prevScrollLeft > 0) {
        prevScrollLeft = 0;
    }
    if (prevScrollTop > 0) {
        prevScrollTop = 0;
    }
    if (prevScrollLeft - $(window).width() < -zoom / 100 * $(window).width()) {
        prevScrollLeft = -(zoom / 100 * $(window).width()) + $(window).width();
    }
    if (prevScrollTop - $(window).height() < -zoom / 100 * $(window).width() * ratio) {
        prevScrollTop = -(zoom / 100 * $(window).width() * ratio) + $(window).height();
    }
    doQuick ? $('.img').css({marginLeft: prevScrollLeft, marginTop: prevScrollTop}) : $('.img').animate({marginLeft: prevScrollLeft, marginTop: prevScrollTop});
    doQuick ? $('.outer').css({marginLeft: prevScrollLeft, marginTop: prevScrollTop}) : $('.outer').animate({marginLeft: prevScrollLeft, marginTop: prevScrollTop});
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
    if (mid) {
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

        settings['neighbors'] && toggleNeighbors('startup');
        settings['remove'] && toggleRemove('startup');
        settings['ids'] && toggleIds('startup');

        chunks && chunks['potential'] && Object.keys(chunks['potential']).sort(function(a, b){return b-a}).forEach(function(id) {
            picking = true;
            $('.box:contains(' + id + ')').addClass('potential').removeClass('gray selected unlocked').append('<span class="label">' + selectedNum++ + '</span>');
            $('.label').css('font-size', zoom/60 + 'vw');
            $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
        });

        chunks && chunks['selected'] && Object.keys(chunks['selected']).sort(function(a, b){return b-a}).forEach(function(id) {
            $('.box:contains(' + id + ')').addClass('selected').removeClass('gray potential unlocked').append('<span class="label">' + selectedNum++ + '</span>');
            $('.label').css('font-size', zoom/60 + 'vw');
            $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
        });

        chunks && chunks['unlocked'] && Object.keys(chunks['unlocked']).forEach(function(id) {
            $('.box:contains(' + id + ')').addClass('unlocked').removeClass('gray selected potential');
            $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
        });

        if (picking) {
            $('.roll2').css({'opacity': 0, 'cursor': 'default'}).prop('disabled', true).hide();
            $('.pick').text('Pick for me');
            isPicking = true;
        }
        
        center('quick');
    });
}

// Stores data in Firebase
var setData = function() {
    myRef.child('settings').update({'neighbors': autoSelectNeighbors, 'remove': autoRemoveSelected, 'ids': showChunkIds});

    var tempJson = {};
    Array.prototype.forEach.call(document.getElementsByClassName('unlocked'), function(el) {
        tempJson[el.childNodes[0].nodeValue] = el.childNodes[0].nodeValue;
    });
    myRef.child('chunks/unlocked').set(tempJson);

    tempJson = {};
    Array.prototype.forEach.call(document.getElementsByClassName('selected'), function(el) {
        tempJson[el.childNodes[0].nodeValue] = el.childNodes[0].nodeValue;
    });
    myRef.child('chunks/selected').set(tempJson);

    tempJson = {};
    Array.prototype.forEach.call(document.getElementsByClassName('potential'), function(el) {
        tempJson[el.childNodes[0].nodeValue] = el.childNodes[0].nodeValue;
    });
    myRef.child('chunks/potential').set(tempJson);
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
            $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text').css('opacity', 0).show();
            !isPicking && $('.roll2').css('opacity', 0).show();
            $('.lock-box').animate({'opacity': 0});
            setTimeout(function() {
                $('.lock-box').css('opacity', 1).hide();
                $('.lock-opened, .pick, #toggleNeighbors, #toggleRemove, .toggleNeighbors.text, .toggleRemove.text').animate({'opacity': 1});
                !isPicking && $('.roll2').animate({'opacity': 1});
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