/* Created by Source Link AKA Source Chunk
 * Revision of an idea by Amehzyn
 * With help from Slay to Stay for chunk Id's
 * 8/17/2019
 */

var onMobile = typeof window.orientation !== 'undefined';                   // Is user on a mobile device
var isPicking = false;                                                      // Has the user just rolled 2 chunks and is currently picking
var autoSelectNeighbors = true;                                             // Toggle state for select neighbors button
var autoRemoveSelected = false;                                             // Toggle state for remove selected button
var clicked = false;                                                        // Is mouse being held down

var zoom = 350;                                                             // Starting zoom value
var maxZoom = 550;                                                          // Furthest zoom in value
var minZoom = onMobile ? 275 : 100;                                         // Smallest zoom out value
var fontZoom = onMobile ? 40 : 15;                                          // Font size zoom
var labelZoom = onMobile ? 800 : 50;                                         // Selected label font size zoom
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

var hammertime = new Hammer(document.getElementsByClassName('body')[0]);    // Initialize Hammerjs [Mobile]

// ----------------------------------------------------------

// Event Listeners

// ----------------------------------------------------------

// Shows loading screen while page sorts itself
window.onload = function() {
    setTimeout(doneLoading, 1000);
}

// Creates board of boxes, sets initial sizes of scalable elements
$( document ).ready(function() {
    for (var i = 0; i < fullSize; i++) {
        $('.outer').append(`<div id=${i} class='box gray'>${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex}</div>`);
    }
    $('.img').width(zoom + 'vw');
    $('.outer').width(zoom + 'vw');
    $('.box').width(zoom/rowSize + 'vw').height(zoom/rowSize + 'vw').css('font-size', zoom/fontZoom + 'px');
    $('.label').css('font-size', zoom/labelZoom + 'vw');
});

// [Mobile] Prevents normal mobile zooming methods
hammertime.on('pinchin pinchout doubletap', function(ev) {
    if (onMobile) {
        ev.preventDefault();
    }
});

// [Mobile] Mobile equivalent to 'mousedown', starts drag sequence
hammertime.on('panstart', function(ev) {
    if (onMobile) {
        clickX = ev.changedPointers[0].pageX;
        clickY = ev.changedPointers[0].pageY;
    }
});

// [Mobile] Mobile equivalent to 'mouseup', ends drag sequence
hammertime.on('panend', function(ev) {
    if (onMobile) {
        prevScrollLeft = prevScrollLeft + scrollLeft;
        prevScrollTop = prevScrollTop + scrollTop;
    }
});

// [Mobile] Mobile equivalent to 'mousemove', determines amount dragged since last trigger
hammertime.on('panleft panright panup pandown', function(ev) {
    if (onMobile) {
        updateScrollPos(ev.changedPointers[0]);
    }
});

//[Mobile] Handles mobile 'clicks'
hammertime.on('tap', function(ev) {
    if (onMobile && $(ev.target).hasClass('box')) {
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
            autoRemoveSelected && $('.selected').toggleClass('selected gray').empty().append(Math.floor(ev.target.id % rowSize) * (skip + rowSize) - Math.floor(ev.target.id / rowSize) + startingIndex);
            $('.pick').text('Pick Chunk');
            $('.roll2').show();
            isPicking = false;
            $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
            $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
        } else {
            $(ev.target).toggleClass('gray unlocked');
            $('#chunkInfo1').text('Unlocked chunks: ' + --unlockedChunks);
        }
        convertToUrl();
    }
});

// Handles dragging and clicks
$(document).on({
    'mousemove': function(e) {
        if (e.button !== 0) {
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
        if (e.button !== 0) {
            return;
        }
        clicked = true;
        moved = false;
        movedNum = 0;
        clickX = e.pageX;
        clickY = e.pageY;
    },
    'mouseup': function(e) {
        if (e.button !== 0) {
            return;
        }
        clicked = false;
        if (movedNum > 1) {
            prevScrollLeft = prevScrollLeft + scrollLeft;
            prevScrollTop = prevScrollTop + scrollTop;
        } else if ($(e.target).hasClass('box')) {
            if (onMobile) {
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
                autoRemoveSelected && $('.selected').toggleClass('selected gray').empty().append(Math.floor(e.target.id % rowSize) * (skip + rowSize) - Math.floor(e.target.id / rowSize) + startingIndex);
                $('.pick').text('Pick Chunk');
                $('.roll2').show();
                isPicking = false;
                $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
                $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
            } else {
                $(e.target).toggleClass('gray unlocked');
                $('#chunkInfo1').text('Unlocked chunks: ' + --unlockedChunks);
            }
            convertToUrl();
        }
        $('.outer').css('cursor', 'default');
    }
});

// Handles zooming
$(".body").on('scroll mousewheel', function(e) {
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
    $('.box').width(zoom/rowSize + 'vw').height(zoom/rowSize + 'vw').css('font-size', zoom/fontZoom + 'px');
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
    $('.box').width(zoom/rowSize + 'vw').height(zoom/rowSize + 'vw').css('font-size', zoom/fontZoom + 'px');
    $('.label').css('font-size', zoom/labelZoom + 'vw');
}

// Pick button: picks a random chunk from selected/potential
var pick = function() {
    var el;
    var rand;
    var sNum;
    if (!isPicking) {
        el = $('.selected');
        rand = Math.floor(Math.random() * el.length);
        sNum = $(el[rand]).children().text();
        $(el[rand]).toggleClass('selected unlocked').empty().append(Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex);
    } else {
        el = $('.potential');
        var rand = Math.floor(Math.random() * el.length);
        sNum = $(el[rand]).children().text();
        $(el[rand]).toggleClass('potential unlocked').empty().append(Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex);
        $('.potential > .label').css('color', 'white');
        $('.potential').toggleClass('selected potential');
        isPicking = false;
        $('.pick').text('Pick Chunk');
        $('.roll2').show();
    }
    fixNums(sNum);
    autoSelectNeighbors && selectNeighbors(el[rand]);
    autoRemoveSelected && $('.selected').toggleClass('selected gray').empty().append(Math.floor(el[rand].id % rowSize) * (skip + rowSize) - Math.floor(el[rand].id / rowSize) + startingIndex);
    $('#chunkInfo2').text('Selected chunks: ' + --selectedChunks);
    $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
    convertToUrl();
}

// Roll 2 button: rolls 2 chunks from all selected chunks
var roll2 = function() {
    isPicking = true;
    var el = $('.selected');
    var rand;
    if (el.length > 0) {
        $('.roll2').hide();
        $('.pick').text('Pick for me');
    }
    for (var i = 0; i < 2; i++) {
        el = $('.selected');
        rand = Math.floor(Math.random() * el.length);
        $(el[rand]).toggleClass('selected potential');
        $('.potential > .label').css('color', 'black');
    }
    convertToUrl();
}

// Toggle functionality for if neighbors are to be selected on chunk pick
var toggleNeighbors = function(e) {
    if ($('#toggleNeighbors').hasClass('locked')) {
        return;
    }
    $('#toggleRemove').toggleClass('locked');
    autoSelectNeighbors = !autoSelectNeighbors;
    $('#toggleNeighbors').toggleClass('on').toggleClass('off');
    if ($('#toggleNeighbors').hasClass('on')) {
        $('#toggleNeighbors').text('ON');
    } else {
        $('#toggleNeighbors').text('OFF');
    }
}

// Toggle functionality for if other selected chunks are set to unlocked after chunk pick
var toggleRemove = function(e) {
    if ($('#toggleRemove').hasClass('locked')) {
        return;
    }
    $('#toggleNeighbors').toggleClass('locked');
    autoRemoveSelected = !autoRemoveSelected;
    $('#toggleRemove').toggleClass('on').toggleClass('off');
    if ($('#toggleRemove').hasClass('on')) {
        $('#toggleRemove').text('ON');
    } else {
        $('#toggleRemove').text('OFF');
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

// ----------------------------------------------------------

// Other Functions

// ----------------------------------------------------------

// Once page has loaded, page is centered and initial chunks are selected/unlocked (from url)
var doneLoading = function() {
    convertFromUrl(window.location.href.split('?')[1]);
    center('quick');
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
    $('.box').width(zoom/rowSize + 'vw').height(zoom/rowSize + 'vw').css('font-size', zoom/fontZoom + 'px');
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

// Gather chunk initial state from url
var convertFromUrl = function(url) {
    if (!url) {
        return;
    }
    var arr = url.split(';');
    var unlocked = arr[0].match(/.{1,3}/g);
    var selected = arr[1].match(/.{1,3}/g);
    var potential = arr[2].match(/.{1,3}/g);
    var i;

    i = 0;
    unlocked && unlocked.forEach(function(e) {
        unlocked[i] = parseInt(e, 36);
        i++;
    });

    i = 0;
    selected && selected.forEach(function(e) {
        selected[i] = parseInt(e, 36);
        i++;
    });

    i = 0;
    potential && potential.forEach(function(e) {
        potential[i] = parseInt(e, 36);
        i++;
    });

    unlocked && unlocked[0] !== "" && unlocked.forEach(function(el) {
        $('.box:contains(' + el + ')').toggleClass('gray unlocked');
        $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
    });
    selected && selected[0] !== "" && selected.forEach(function(el) {
        $('.box:contains(' + el + ')').toggleClass('gray selected').append('<span class="label">' + selectedNum + '</span>');
        selectedNum++;
        $('.label').css('font-size', zoom/60 + 'vw');
        $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
    });
    potential && potential[0] !== "" && potential.forEach(function(el) {
        $('.box:contains(' + el + ')').toggleClass('gray potential').append('<span class="label">' + selectedNum + '</span>');
        selectedNum++;
        $('.label').css('font-size', zoom/60 + 'vw');
        $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
    });
    if (potential && potential[0] !== "") {
        $('.roll2').hide();
        $('.pick').text('Pick for me');
        isPicking = true;
    }
}

// Convert chunk state to url
var convertToUrl = function() {
    var str = '';
    Array.prototype.forEach.call(document.getElementsByClassName('unlocked'), function(el) {
        str += parseInt(el.childNodes[0].nodeValue).toString(36);
    });
    str += ';';
    Array.prototype.forEach.call(document.getElementsByClassName('selected'), function(el) {
        str += parseInt(el.childNodes[0].nodeValue).toString(36);
    });
    str += ';';
    Array.prototype.forEach.call(document.getElementsByClassName('potential'), function(el) {
        str += parseInt(el.childNodes[0].nodeValue).toString(36);
    });
    history.pushState({}, '', window.location.href.split('?')[0] + '?' + str);
}