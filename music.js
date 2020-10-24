const playlist= [
    {
        songName : "alan-walker-alone",
        songImg : "/images/alanWalker.jpg",
        songSrc : "/music/alan-walker-alone.mp3"
    },
    {
        songName : "apna-time-aayega-gully-boy",
        songImg : "/images/apnaTime.jpg",
        songSrc : "/music/apna-time-aayega-gully-boy.mp3"
    },
    {
        songName : "Sanu Ek Pal Chain - Raid",
        songImg : "/images/sanuEkPal.jpg",
        songSrc : "/music/Sanu Ek Pal Chain - Raid.mp3"
    },
    {
        songName : "jitni-dafa-dekhu-tujhe",
        songImg : "/images/jitniDafa.png",
        songSrc : "/music/jitni-dafa-dekhu-tujhe.mp3"
    },
    {
        songName : "love-me-like-you-do",
        songImg : "/images/Love Me Like You Do.png",
        songSrc : "/music/love-me-like-you-do.mp3"
    },
    {
        songName : "Post Malone - Hollywood s Bleeding (Audio)",
        songImg : "/images/hollywood.jpg",
        songSrc : "/music/Post Malone - Hollywood s Bleeding (Audio).mp3"
    },
    {
        songName : "roi-na-je-yaad-meri-aayi-ve",
        songImg : "/images/royiNa.jpg",
        songSrc : "/music/roi-na-je-yaad-meri-aayi-ve.mp3"
    },
    {
        songName : "The Heart Wants What It Wants (Official Video) (1)",
        songImg : "/images/selena-gomez1.jpg",
        songSrc : "/music/Selena Gomez - The Heart Wants What It Wants (Official Video) (1).mp3"
    },
    {
        songName : "tere-jaisa-yaar-kahan-new-version",
        songImg : "/images/tereJaisa.jpg",
        songSrc : "/music/tere-jaisa-yaar-kahan-new-version.mp3"
    },
    {
        songName : "Bon Appetit",
        songImg : "/images/bonApetit.jpg",
        songSrc : "/music/Bon Appetit.mp3"
    }
]

var handle= document.getElementById('music');
var songName= document.getElementById('song-name');
var songImg= document.getElementById('song-img');
var play=document.getElementById('play');
var pause=document.getElementById('pause');
handle.controls=false;

function togglePlaylist(){
    console.log("3")
    document.getElementById('playlist').classList.toggle("togglePlaylist");
}

function togglePlay(){
    if(handle.paused || handle.ended){
        play.style.display='none'
        pause.style.display='inline-block';
        handle.play();
    }
    else{
        pause.style.display='none';
        play.style.display='inline-block';
        handle.pause();
    }
}

function setVolume(){
    var volume= document.getElementById('volume');
    handle.volume=volume.value;
}

function loop()
{
    handle.loop= !handle.loop;
    if(handle.loop)
    {
        document.getElementById('repeat').classList.add('repeat-active');
    }
    else{
        document.getElementById('repeat').classList.remove('repeat-active');
    }
}

function toggleMute(){
    if(!handle.muted){
        document.getElementById('volume').value="0";
    }
    else{
        document.getElementById('volume').value=handle.volume;
    }
    handle.muted=!handle.muted;
}

var duration= 0;
handle.onloadedmetadata= function(){
    duration= Math.floor(handle.duration);
}

function update(){
    var progress= document.getElementById('progress');
    if(handle.currentTime>0)
    {
        progress.value=  Math.floor((100/handle.duration)*handle.currentTime);
    } 
    var minDuration=Math.floor(duration/60);
    var secDuration= duration- minDuration*60;
    document.getElementById('song-duration').innerHTML= minDuration+ ":"+ secDuration;

    var time=Math.floor(handle.currentTime);
    var min= Math.floor(time/60);
    var seconds= time- min*60;
    if(seconds<10)
    {
        document.getElementById('current-time').innerHTML= min+":0"+ seconds;
    }
    else{

        document.getElementById('current-time').innerHTML= min+":"+ seconds;
    }
}

var i=0;
function next(){
    var prev= "id"+ (i);
    document.getElementById(prev).classList.remove("addClass");
    if(i<playlist.length-1)
    {
        i=i+1;
    }
    else{
        i=0
    }
    songImg.src= playlist[i].songImg;
    songName.innerHTML= playlist[i].songName;
    handle.src=playlist[i].songSrc;
    handle.autoplay="true";
    var current= "id"+ i;
    document.getElementById(current).classList.add("addClass");
    document.getElementById('song-duration').innerHTML="0:0";
    togglePlay();
}

function back(){
    var prev= "id"+ i;
    document.getElementById(prev).classList.remove("addClass");
    if(i>0)
    {
        i=i-1;
    }
    songImg.src= playlist[i].songImg;
    songName.innerHTML= playlist[i].songName;
    handle.src=playlist[i].songSrc;
    handle.autoplay="true";
    var current= "id"+ i;
    document.getElementById(current).classList.add("addClass");
    document.getElementById('song-duration').innerHTML="0:0";
    togglePlay();
}

function songByChoice(e){
    var prev= "id"+ i;
    document.getElementById(prev).classList.remove("addClass");
    var get= "/music/"+ document.getElementById(e.id).innerHTML + ".mp3";
    i= playlist.findIndex(x=> x.songSrc=== get);
    console.log(i)
    songImg.src= playlist[i].songImg;
    songName.innerHTML= playlist[i].songName;
    handle.src=playlist[i].songSrc;
    var current= "id"+ i;
    document.getElementById(current).classList.add("addClass");
    handle.autoplay="true";
    togglePlay();
}

var disableUpdate= false;
var progress= document.getElementById('progress');
progress.addEventListener('input',
function(){
    disableUpdate=true;
    var progress= document.getElementById('progress').value;
    handle.currentTime= (progress/100)*handle.duration;
});

if(!disableUpdate)
{
    handle.addEventListener("timeupdate",update,false);
}