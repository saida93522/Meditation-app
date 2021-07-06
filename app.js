const app = () => {
    const song = document.querySelector('.song')
    const playBtn = document.querySelector('.play')
    const outline = document.querySelector('.moving-outline circle')
    const video = document.querySelector('.vid-container video')
    const timeSelect = document.querySelectorAll('.time-select button')


    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button')
    //time display

    const timeDisplay = document.querySelector('.time-display')

    //get the length of play outline
    const outlineLength = outline.getTotalLength();
    // console.log(outlineLength);

    //duration
    let fakeDuration = 600
    //animate outline
    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    //Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            checkPlaying(song)
        })
    })


    ///Play a sound
    playBtn.addEventListener('click', function () {
        checkPlaying(song)
    })

    //Sound timing
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        })
    })



    ///function specific to stop and play sounds
    const checkPlaying = song => {
        if (song.paused) {
            song.play()
            video.play()
            playBtn.src = './svg/pause.svg'

        } else {
            song.pause();
            video.pause()
            playBtn.src = './svg/play.svg'
        }
    };


    ///ANIMATE circle using the time
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;

        let elapsedTime = fakeDuration - currentTime;
        let seconds = Math.floor(elapsedTime % 60)
        let minutes = Math.floor(elapsedTime / 60);



        ///animate circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress


        ///animate text
        timeDisplay.textContent = `${minutes}: ${seconds}`

        if (currentTime >= fakeDuration) {
            song.pause()
            song.currentTime = 0
            playBtn.src = './svg/play.svg'
            video.pause()
        }
    }





}


app();