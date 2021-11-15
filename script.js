const music  =   document.querySelector("audio");
const play   =   document.getElementById("play");
const img    =   document.querySelector("img");
const body   =   document.querySelector("body");
const artist =   document.getElementById("artist");
const song   =   document.getElementById("song-name");
const next   =   document.getElementById("next");
const prev   =   document.getElementById("prev");
const progress_area = document.getElementById("progress-area");
let progress =   document.getElementById("progress-bar");
let max_duration =   document.getElementById("max-duration");
let current_time =  document.getElementById("current-time");



let isPlaying = false;

// play music function
const PlayMusic = () => {
          isPlaying =  true;
          music.play();
          play.classList.replace("fa-play","fa-pause");
          img.classList.add("anime");
};

// pause music function
const PauseMusic = () => {
      isPlaying =  false;
      music.pause();
      play.classList.replace("fa-pause","fa-play");
      img.classList.remove("anime");
};

// function to change background
var background = [
      "linear-gradient(45deg, red, blue)",
      "linear-gradient(145deg,var(--blue) 0%, var(--dark-blue) 70%)",
      "linear-gradient(145deg, orange 40%, cyan)",
      "linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)"
];

var i=0;
const changeBackground = () => {
      if(i<background.length)
      {
            body.style.background = background[i];
            i++;
      }
      else
      {
            i=0;
      }
};

// Songs List
var songs =[
      {
            audio:"BEATS",
            artist:"Shawn Hughes",
            name:"song1"
      },
      {
            audio:"REMEMBER",
            artist:"Shawn Walker",
            name:"song2"
      },
      {
            audio:"EVERLAST",
            artist:"Alan Wayne",
            name:"song3"
      },
      {
            audio:"AWAKE",
            artist:"Serena",
            name:"song4"
      }

];

// Song changing function
const loadSong = (songs) => {
      song.textContent = songs.audio;
      artist.textContent = songs.artist;
      music.src = "audios/" + songs.name + ".mp3";
      img.src = "images/" + songs.name + ".jpg";
};

let songIndex =0;

const nextSong = () => {
      songIndex = (songIndex+1) % songs.length;
      loadSong(songs[songIndex]);
      PlayMusic();
      changeBackground();
};

const prevSong = () => {
      songIndex = (songIndex -1 + songs.length) % songs.length;
      loadSong(songs[songIndex]);
      PlayMusic();
      changeBackground();
}

// Events to happen when clicked
play.addEventListener('click', ()=>{
      if(isPlaying)
      {
            PauseMusic();
      }
      else
      {
            PlayMusic();
      }
});

// Progress bar 
music.addEventListener('timeupdate' ,(event) =>{
      // Want to know more here DOUBT
      const {currentTime,duration} = event.target;
      let progress_time = (currentTime / duration) * 100;
      progress.style.width = `${progress_time}%`;     
      
      // Song current time update
      let min_current = Math.floor(currentTime / 60);
      let sec_current = Math.floor(currentTime % 60);
      if(sec_current < 10)
      {
            sec_current = `0${sec_current}`;
      }
      let current_duration = `${min_current}:${sec_current}`;
      
      current_time.textContent = `${current_duration}`;
      

      // Song duration update
      let min_time = Math.floor(duration / 60);
      let sec_time = Math.floor(duration % 60);
      let total_duration = `${min_time}:${sec_time}`;
      
      // if not done it prints NAN on song changing
      if(duration)
      {
            max_duration.textContent = `${total_duration}`;
      }
});

// to skip to the song when clicked in progress area
progress_area.addEventListener('click',(event) =>{
      // const duration = music.duration;
      const {duration} = music;
      let move_progress = 
      (event.offsetX / event.target.clientWidth) * duration;
      music.currentTime = move_progress;
});

// to change the music when it ends
music.addEventListener('ended',nextSong);
next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);

