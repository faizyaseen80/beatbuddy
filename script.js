// carausal
const swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let songImage = Array.from(document.getElementsByClassName("song-image"));
let songTitle = Array.from(document.getElementsByClassName("song-title"));
let songPlay = Array.from(document.getElementsByClassName("song-play"));
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("master-song-name");
let masterCover = document.getElementById("master-cover");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let currentTimeDisplay = document.getElementById("current-time");
let totalTimeDisplay = document.getElementById("total-time");

// My songs
let songs = [
  {
    songName: "Rab Jane",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Channa mereya",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Peacky blinder",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Dil diya gallan",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Has ke(Satveer)",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Heeriye(Arijit)",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Jhoome jo pathan",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Kuchh to bata",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Pardesh Katenda",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Rafta Rafta",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
  {
    songName: "Afreen Afreen",
    filePath: "songs/11.mp3",
    coverPath: "covers/11.jpg",
  },
  {
    songName: "Ye Raaten Ye",
    filePath: "songs/12.mp3",
    coverPath: "covers/12.jpg",
  },
  {
    songName: "Goat",
    filePath: "songs/13.mp3",
    coverPath: "covers/13.jpg",
  },
  {
    songName: "Ud di firan",
    filePath: "songs/14.mp3",
    coverPath: "covers/14.jpg",
  },
  {
    songName: "Aap ki nazron",
    filePath: "songs/15.mp3",
    coverPath: "covers/15.jpg",
  },
  {
    songName: "Ankho ne teri",
    filePath: "songs/16.mp3",
    coverPath: "covers/16.jpg",
  },
  {
    songName: "Mai agar kahu",
    filePath: "songs/17.mp3",
    coverPath: "covers/17.jpg",
  },
  {
    songName: "Pehli dafa",
    filePath: "songs/18.mp3",
    coverPath: "covers/18.jpg",
  },
  {
    songName: "Dekhte Dekhte",
    filePath: "songs/19.mp3",
    coverPath: "covers/19.jpg",
  },
  {
    songName: "Ghar se nikalte",
    filePath: "songs/20.mp3",
    coverPath: "covers/20.jpg",
  },
  {
    songName: "Hamari Adhuri",
    filePath: "songs/21.mp3",
    coverPath: "covers/21.jpg",
  },
  {
    songName: "Chale Aana",
    filePath: "songs/22.mp3",
    coverPath: "covers/22.jpg",
  },
  {
    songName: "Jag Ghoomeya",
    filePath: "songs/23.mp3",
    coverPath: "covers/23.jpg",
  },
  {
    songName: "Mann ki lagan",
    filePath: "songs/24.mp3",
    coverPath: "covers/24.jpg",
  },
  {
    songName: "Lo maan liya",
    filePath: "songs/25.mp3",
    coverPath: "covers/25.jpg",
  },
  {
    songName: "Mera Tera",
    filePath: "songs/26.mp3",
    coverPath: "covers/26.jpg",
  },
  {
    songName: "Gulabi Aankhe",
    filePath: "songs/27.mp3",
    coverPath: "covers/27.jpg",
  },
  {
    songName: "Dil Awara",
    filePath: "songs/28.mp3",
    coverPath: "covers/28.jpg",
  },
  {
    songName: "Likhe jo khat",
    filePath: "songs/29.mp3",
    coverPath: "covers/29.jpg",
  },
  {
    songName: "Bol do na",
    filePath: "songs/30.mp3",
    coverPath: "covers/30.jpg",
  },
];

// matser cover image
songImage.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
});

// master song name
songTitle.forEach((element, i) => {
  element.innerHTML = songs[i].songName;
});

// function to time format
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Play a song by click on master play button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    document.getElementById(songIndex).classList.add("active");
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    document.getElementById(songIndex).classList.add("active");
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
});

// Increase progress bar width with song current time
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
  currentTimeDisplay.innerText = formatTime(audioElement.currentTime);
  totalTimeDisplay.innerText = formatTime(audioElement.duration);
  if (progress === 100) {
    playSong();
  }
});

// change the song time by clicking progress bar
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Remove the active class in previous song
const makePlay = () => {
  songPlay.forEach((element) => {
    element.classList.remove("active");
  });
};

// Play a song by click on song name
songPlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    songIndex = parseInt(e.target.id);
    makePlay();
    e.target.classList.add("active");
    audioElement.src = ` songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    masterCover.src = `covers/${songIndex + 1}.jpg`;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  });
});

// Paly a next song by click on next button
next.addEventListener("click", () => {
  if (songIndex >= 30) {
    songIndex = 30;
  } else {
    songIndex += 1;
  }
  document.getElementById(songIndex - 1).classList.remove("active");
  document.getElementById(songIndex).classList.add("active");
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  masterSongName.innerText = songs[songIndex].songName;
  masterCover.src = `covers/${songIndex + 1}.jpg`;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

// Play a previous song by click on previous button
previous.addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  document.getElementById(songIndex + 1).classList.remove("active");
  document.getElementById(songIndex).classList.add("active");
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  masterSongName.innerText = songs[songIndex].songName;
  masterCover.src = `covers/${songIndex + 1}.jpg`;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

// Function to play a song by index
function playSong() {
  songIndex++;
  document.getElementById(songIndex).classList.add("active");
  document.getElementById(songIndex - 1).classList.remove("active");
  const songSrc = `songs/${songIndex + 1}.mp3`;
  audioElement.src = songSrc;
  audioElement.currentTime = 0;
  masterSongName.innerText = songs[songIndex].songName;
  masterCover.src = `covers/${songIndex + 1}.jpg`;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
}
