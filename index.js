var clicked = false, clickY;
var zoom = 350;
var scale = 30;
var fullSize = 1075;
var rowSize = 43;
var onMobile = typeof window.orientation !== 'undefined';
var isPicking = false;
var autoSelectNeighbors = true;
var autoRemoveSelected = false;
var scrollLeft = 0;
var prevScrollLeft = 0;
var scrollTop = 0;
var prevScrollTop = 0;
var ratio = 4800 / 8256;
var movedNum = 0;
var selectedNum = 1;
var unlockedChunks = 0;
var selectedChunks = 0;
var startingIndex = 4671;
var skip = 213;
var fontZoom = onMobile ? 40 : 15;
var labelZoom = onMobile ? 80 : 50;

var hammertime = new Hammer(document.getElementsByClassName('body')[0]);
hammertime.get('pinch').set({ enable: true });

hammertime.on('pinchin pinchout', function(ev) {
    if (onMobile) {
        let oldZoom = zoom;
        e.preventDefault();
        if (e.originalEvent.wheelDelta >= 0) {
            zoom += scale;
            zoom > 550 ? zoom = 550 : zoom = zoom;
        } else {
            zoom -= scale;
            zoom < 100 ? zoom = 100 : zoom = zoom;
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
    }
});

hammertime.on('panstart', function(ev) {
    if (onMobile) {
        clickX = ev.changedPointers[0].pageX;
        clickY = ev.changedPointers[0].pageY;
    }
});

hammertime.on('panend', function(ev) {
    if (onMobile) {
        prevScrollLeft = prevScrollLeft + scrollLeft;
        prevScrollTop = prevScrollTop + scrollTop;
    }
});

hammertime.on('panleft panright panup pandown', function(ev) {
    if (onMobile) {
        updateScrollPos(ev.changedPointers[0]);
    }
});

hammertime.on('tap', function(ev) {
    if (onMobile) {
        console.log('tap');
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

window.onload = function() {
    setTimeout(doneLoading, 1500);
}

var doneLoading = function() {
    convertFromUrl(window.location.href.split('?')[1]);
    center('quick');
    if (onMobile) {
        console.log('mobile');
        $('.pick, .roll2, .center').css({'height': '40px', 'font-size': zoom/fontZoom*1.5 + 'px'});
        $('.text, .toggle').css('font-size', zoom/fontZoom + 'px');
        $('.box').addClass('mobile');
    }
    $('.loading').remove();
}

$( document ).ready(function() {
    for (var i = 0; i < fullSize; i++) {
        $('.outer').append(`<div id=${i} class='box gray'>${Math.floor(i % rowSize) * (skip + rowSize) - Math.floor(i / rowSize) + startingIndex}</div>`);
    }
    $('.img').width(zoom + 'vw');
    $('.outer').width(zoom + 'vw');
    $('.box').width(zoom/rowSize + 'vw').height(zoom/rowSize + 'vw').css('font-size', zoom/fontZoom + 'px');
    $('.label').css('font-size', zoom/labelZoom + 'vw');
});

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

$(".body").on('scroll mousewheel', function(e) {
    let oldZoom = zoom;
    e.preventDefault();
    if (e.originalEvent.wheelDelta >= 0) {
        zoom += scale;
        zoom > 550 ? zoom = 550 : zoom = zoom;
    } else {
        zoom -= scale;
        zoom < 100 ? zoom = 100 : zoom = zoom;
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

var center = function(extra) {
    let arr = $('.unlocked');
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

var scrollToPos = function(x, y, xPart, yPart, doQuick) {
    //zoom = 150;
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

var fixNums = function(num) {
    $('.label').each(function(index) {
        if (parseInt($(this).text()) >= num) {
            $(this).text(parseInt($(this).text()) - 1);
        }
    });
    selectedNum--;
}

var convertFromUrl = function(url) {
    if (!url) {
        return;
    }
    var arr = url.split(';');
    var unlocked = arr[0].split(',');
    var selected = arr[1].split(',');
    var potential = arr[2].split(',');
    unlocked[0] !== "" && unlocked.forEach(function(el) {
        $('#' + el).toggleClass('gray unlocked');
        $('#chunkInfo1').text('Unlocked chunks: ' + ++unlockedChunks);
    });
    selected[0] !== "" && selected.forEach(function(el) {
        $('#' + el).toggleClass('gray selected').append('<span class="label">' + selectedNum + '</span>');
        selectedNum++;
        $('.label').css('font-size', zoom/60 + 'vw');
        $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
    });
    potential[0] !== "" && potential.forEach(function(el) {
        $('#' + el).toggleClass('gray potential').append('<span class="label">' + selectedNum + '</span>');
        selectedNum++;
        $('.label').css('font-size', zoom/60 + 'vw');
        $('#chunkInfo2').text('Selected chunks: ' + ++selectedChunks);
    });
    if (potential[0] !== "") {
        $('.roll2').hide();
        $('.pick').text('Pick for me');
        isPicking = true;
    }
}

var convertToUrl = function() {
    var str = '';
    $('.unlocked').each(function(index) {
        str += $(this).attr('id') + ',';
    });
    if ($('.unlocked').length > 0) {
        str = str.slice(0, -1);
    }
    str += ';';
    $('.selected').each(function(index) {
        str += $(this).attr('id') + ',';
    });
    if ($('.selected').length > 0) {
        str = str.slice(0, -1);
    }
    str += ';';
    $('.potential').each(function(index) {
        str += $(this).attr('id') + ',';
    });
    if ($('.potential').length > 0) {
        str = str.slice(0, -1);
    }
    history.pushState({}, '', window.location.href.split('?')[0] + '?' + str);
}