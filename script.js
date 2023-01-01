// initialise all the variables
let myProgressBar = document.getElementById("myProgressBar");
let audioElement = new Audio("/songs/1.mp3");
let playButton = document.getElementById("playButton"); 
let gif = document.getElementById("gif");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let currentSongId = 1;
let currentSongSelected = document.getElementById(currentSongId);
let songIndex = 1;
let songPlaying = document.getElementById('songPlaying');
let songDuration = Array.from(document.getElementsByClassName('duration'));

let songItem = Array.from(document.getElementsByClassName("songItem"));

let songList = [
    {songName:"Abey Yaar Fotty Seven ft Bali Prod Fotty Seven", filePath: "songs/1.mp3", songCover: "covers/1.jpg"},
    {songName:"ANGAD Prod Fotty Seven", filePath: "songs/2.mp3", songCover: "covers/2.jpg"},
    {songName:"Banjo Official Video Fotty Seven", filePath: "songs/3.mp3", songCover: "covers/3.jpg"},
    {songName:"Chal Nikal Fotty Seven Hindi Rap Prod Rebel 7", filePath: "songs/4.mp3", songCover: "covers/4.jpg"},
    {songName:"CHAUD Prod Fotty Seven", filePath: "songs/5.mp3", songCover: "covers/5.jpg"},
    {songName:"Galat Launda Fotty Seven Hindi Rap Prod MojoJojo", filePath: "songs/6.mp3", songCover: "covers/6.jpg"},
    {songName:"Gooda Hindi Rap Prod Fotty Seven", filePath: "songs/7.mp3", songCover: "covers/7.jpg"},
    {songName:"Kya Haal Hai Bro Fotty Seven", filePath: "songs/8.mp3", songCover: "covers/8.jpg"},
    {songName:"Tu Hai Kaun Fotty Seven ft Raga Prod Armid Beats", filePath: "songs/9.mp3", songCover: "covers/9.jpg"},
];


songItem.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songList[i].songCover;
    element.getElementsByClassName('songName')[0].innerHTML = songList[i].songName;
});

let concatNum = (num)=> {
    return num.toString().padStart(2, '0');
};


const songg = ()=>{
    songDuration.forEach((element, i)=>{
        let audio = new Audio();
        audio.src = songList[i].filePath;
        audio.addEventListener('loadedmetadata', ()=>{
            let min = Math.floor(audio.duration/60);
            let sec = Math.floor(audio.duration % 60);
            let result = `${concatNum(min)}:${concatNum(sec)}`
            element.innerText = result;
        });
    });
};

songg();



// action on event 
playButton.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        currentSongSelected = document.getElementById(currentSongId);
        playButton.classList.remove("fa-circle-play");
        currentSongSelected.classList.remove("fa-circle-play");

        playButton.classList.add("fa-circle-pause");
        currentSongSelected.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        currentSongSelected = document.getElementById(currentSongId);
        playButton.classList.remove("fa-circle-pause");
        currentSongSelected.classList.remove("fa-circle-pause");

        playButton.classList.add("fa-circle-play");
        currentSongSelected.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{

    if(playButton.classList[2] == 'fa-circle-play'){
        audioElement.pause();
        audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
    }
    else{
        audioElement.pause();
        audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
        audioElement.play();
    }
    
});

const makeAllPlay = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if(e.target.classList[2] == 'fa-circle-play'){
            makeAllPlay();
            songIndex = parseInt(e.target.id);
            currentSongId = songIndex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            playButton.classList.remove('fa-circle-play');
            playButton.classList.add('fa-circle-pause');
            songPlaying.innerText = songList[currentSongId-1].songName;
            gif.style.opacity = 1;
            audioElement.play();
        }
        else{
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            playButton.classList.remove('fa-circle-pause');
            playButton.classList.add('fa-circle-play');
            songPlaying.innerText = songList[currentSongId-1].songName;
            gif.style.opacity = 0;
            audioElement.pause();
        }
    });
});

next.addEventListener('click', ()=>{
    songIndex += 1;
    if(songIndex > 9){
        songIndex = 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    playButton.classList.remove('fa-circle-play');
    playButton.classList.add('fa-circle-pause');
    currentSongId += 1;
    if(currentSongId > 9){
        currentSongId = 1;
    }
    currentSongSelected = document.getElementById(currentSongId);
    makeAllPlay();
    currentSongSelected.classList.remove('fa-circle-play');
    currentSongSelected.classList.add('fa-circle-pause');
    songPlaying.innerText = songList[currentSongId-1].songName;
    audioElement.play();

});


previous.addEventListener('click', ()=>{
    songIndex -= 1;
    if(songIndex < 1){
        songIndex = 9;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    playButton.classList.remove('fa-circle-play');
    playButton.classList.add('fa-circle-pause');
    currentSongId -= 1;
    if(currentSongId < 1){
        currentSongId = 9;
    }
    currentSongSelected = document.getElementById(currentSongId);
    makeAllPlay();
    currentSongSelected.classList.remove('fa-circle-play');
    currentSongSelected.classList.add('fa-circle-pause');
    songPlaying.innerText = songList[currentSongId-1].songName;
    audioElement.play();
});
