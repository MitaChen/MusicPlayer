

var audio = document.getElementById("music"); //用id取得文件上的某元素
var btnPlay = document.getElementById("btnPlay");
var volValue = document.getElementById("volValue");
var volInfo = document.getElementById("volInfo");
var info = document.getElementById("info");
var song = document.getElementById("song");
var progress = document.getElementById("progress");
var book = document.getElementById("book");
console.log(audio.children[0].title);
//book.parentNode

song.addEventListener('change', function () {
    changeMusic(song.selectedIndex);
});


var option
var tBook = book.children[1];
function Update() {

    // 移除目前下拉選單中的所有歌曲
    for (var j = song.children.length - 1; j >= 0; j--) {
        song.removeChild(song.children[j]);
    }
    //再抓取我的歌本中的歌曲給下拉選單
    for (var i = 0; i < tBook.children.length; i++) {
        option = document.createElement("option");
        option.innerText = tBook.children[i].innerText;
        option.value = tBook.children[i].title;
        song.appendChild(option);
    }
    changeMusic(0);
}

//歌單拖移

function allowDrop(ev) {
    ev.preventDefault();  //停止物件預設行為
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (ev.target.id == "")
        ev.target.appendChild(document.getElementById(data));
    else
        ev.target.parentNode.appendChild(document.getElementById(data));
}


//歌單

var option;
var sBook = book.children[0];
for (var i = 0; i < sBook.children.length; i++) {
    sBook.children[i].draggable = "true";
    sBook.children[i].id = "song" + (i + 1);
    sBook.children[i].addEventListener('dragstart', function () {
        drag(event);
    });
    option = document.createElement("option");
    option.innerText = sBook.children[i].innerText;
    option.value = sBook.children[i].title;
    song.appendChild(option);
}
changeMusic(0);

function songBook() {
    book.className = book.className == "" ? "hide" : "";
}


//全曲循環
function setAllLoop() {
    info.children[2].innerText = info.children[2].innerText == "目前播放狀態 ♬ 全曲循環" ? "" : "目前播放狀態 ♬ 全曲循環";
}

//隨機播放
function setRandom() {
    info.children[2].innerText = info.children[2].innerText == "目前播放狀態 ♬ 隨機播放" ? "" : "目前播放狀態 ♬ 隨機播放";
}

//單曲循環
function setLoop() {
    info.children[2].innerText = info.children[2].innerText == "目前播放狀態 ♬ 單曲循環" ? "" : "目前播放狀態 ♬ 單曲循環";
}

//時間軸
function setTimeBar() {
    audio.currentTime = progress.value;
}

//上一首下一首
function changeSong(i) {
    var index = song.selectedIndex + i;
    changeMusic(index);
}

//function changeSong(i) {
//    var index = song.selectedIndex + i;
//    if (index < 0) {
//        index = song.options.length - 1;
//    }
//    else if (song.selectedIndex == song.options.length - 1) {
//        index = 0;
//    }
//    changeMusic(index);
//}

//歌曲切換
var musicObj, musicIndex = 0;
function changeMusic(i) {

    //console.log(evt.target.options[evt.target.selectedIndex].value);
    //musicObj = evt.target.options;
    //musicIndex = evt.target.selectedIndex;
    song.options[i].selected = true;
    audio.children[0].src = song.options[i].value;
    audio.children[0].title = song.options[i].innerText;
    audio.load();

    if (btnPlay.innerText == ";")
        Play();
}

//時間格式轉換
var min = 0, sec = 0, min2 = 0, sec2 = 0;
function getTimeFormat(timeSec) {
    min = parseInt(timeSec / 60);
    sec = parseInt(timeSec % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    return min + ":" + sec;
}

//總結下面的語法寫法 min = min < 10 ? "0" + min : min;
//if (min < 10)
//    min = "0" + min;
//if (sec < 10)
//    sec = "0" + sec;

//取得歌曲播放時間
function getDuration() {

    progress.max = parseInt(audio.duration);
    progress.value = parseInt(audio.currentTime);

    var w = (audio.currentTime / audio.duration * 100) + "%";
    progress.style.backgroundImage = "-webkit-linear-gradient(left,#fffdcf,#FAE9CB " + w + ", #ffffff " + w + ",#ffffff)";

    info.children[1].innerText = getTimeFormat(audio.currentTime) + " / " + getTimeFormat(audio.duration);

    setTimeout(getDuration, 10);

    if (audio.currentTime == audio.duration) {
        if (info.children[2].innerText == "目前播放狀態 ♬ 隨機播放") {
            var n = Math.floor(Math.random() * song.options.length);
            changeMusic(n);
        }
        else if (info.children[2].innerText == "目前播放狀態 ♬ 全曲循環" && song.selectedIndex == song.options.length - 1) {
            changeMusic(0);
        }
        else if (info.children[2].innerText == "目前播放狀態 ♬ 單曲循環") {
            changeSong(0);
        }
        else if (song.selectedIndex == song.options.length - 1) {
            Stop();
        }
        else
            changeSong(1);
    }
}

//解耦 耦合力

//播放與暫停功能
function Play() {
    if (audio.paused) {
        audio.play();
        btnPlay.innerText = ";";
        info.children[0].innerText = "目前播放 ♪ " + audio.children[0].title;
        getDuration();
    }
    else {
        audio.pause();
        btnPlay.innerText = "4";
        info.children[0].innerText = "目前音樂暫停中";
    }
}

//停止播放功能
function Stop() {
    audio.pause();
    audio.currentTime = 0;
    btnPlay.innerText = "4";
    info.children[0].innerText = "目前音樂已停止播放";
}

//function Pause() {
//    audio.pause();
//}

//快轉倒轉
function changeTime(t) {
    audio.currentTime += t;
}

//function nextTime() {
//    audio.currentTime += 3;
//}
//function prevTime() {
//    audio.currentTime -= 3;
//}

//音量微調
function changeVolume(v) {
    /* audio.volume += v;*/
    volValue.value = parseInt(volValue.value) + v;
    setVolume();
}

//音量調整
setVolume()
function setVolume() {
    volInfo.value = volValue.value;
    audio.volume = volValue.value / 100;


    var z = volValue.value + "%";
    volValue.style.backgroundImage = "-webkit-linear-gradient(left,#fffdcf,#FAE9CB " + z + ", #ffffff " + z + ",#ffffff)";
}

//靜音
function setMuted() {
    audio.muted = !audio.muted;
}

