$(document).ready(function() {
    const audioPlayer = $('#audio-player')[0];
    const songName = $('#song-name');
    const songThumbnail = $('#song-thumbnail');
    const playPauseBtn = $('#play-pause-btn');
    let hasInteracted = false; // Flag to track user interaction

    // Update song name and thumbnail
    function updateSongInfo(name, thumbnail) {
        songName.text(name);
        songThumbnail.attr('src', thumbnail);
    }

    // Example of switching songs
    const songs = [
        { name: 'øneheart x reidenshi - snowfall', thumbnail: 'https://i.ytimg.com/vi/LlN8MPS7KQs/maxresdefault.jpg', src: 'songs/snowfall.mp3' },
        { name: 'øneheart - this feeling (remix)', thumbnail: 'https://i.ytimg.com/vi/SRTVAs_qHng/maxresdefault.jpg', src: 'songs/this_feeling.mp3' },
        { name: '.diedlonely, énouement - stellar', thumbnail: 'https://i.ytimg.com/vi/R1vx49mTtD0/maxresdefault.jpg', src: 'songs/stellar.mp3' },
        { name: 'øneheart - apathy (slowed + reverb)', thumbnail: 'https://i.ytimg.com/vi/3PlV7FlGQrM/maxresdefault.jpg', src: 'songs/apathy.mp3' },
    ];

    let currentSongIndex = 0;

    function switchSong(index) {
        const song = songs[index];
        audioPlayer.src = song.src;
        updateSongInfo(song.name, song.thumbnail);
        if (hasInteracted) {
            audioPlayer.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        }
    }

    // Initial song
    switchSong(currentSongIndex);

    // Example of switching to the next song
    $('#next-song-btn').on('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        fadeOutSongInfo().then(() => {
            switchSong(currentSongIndex);
            fadeInSongInfo();
        });
    });

    // Play/Pause functionality
    playPauseBtn.on('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play().catch(error => {
                console.error("Error playing audio:", error);
            });
            playPauseBtn.text('Pause');
        } else {
            audioPlayer.pause();
            playPauseBtn.text('Play');
        }
    });

    // Function to fade out song info
    function fadeOutSongInfo() {
        return new Promise((resolve) => {
            songName.fadeOut();
            songThumbnail.fadeOut();
            setTimeout(() => {
                resolve();
            }, 500); // Adjust the duration as needed
        });
    }

    // Function to fade in song info
    function fadeInSongInfo() {
        songName.fadeIn();
        songThumbnail.fadeIn();
    }

    // Add event listener for user interaction
    $(document).on('click', function() {
        if (!hasInteracted) {
            hasInteracted = true;
            audioPlayer.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        }
    });
});

// Add functionality for navigating through messages
const messages = [
    "<h1>You Are Not Alone</h1><p>Life is full of challenges, but you have the strength to overcome them. Every day is a new opportunity to make a difference and find joy. Your existence matters, and your presence enriches the world. Reach out to your loved ones, seek help, and never lose hope. You are loved, you are valuable, and you are worthy of happiness. Hold on, keep fighting, and believe that better days are ahead. You are not alone in this journey. Together, we can overcome.</p>",
    "<h1>You Are Not Alone</h1><p>When you feel overwhelmed by darkness, remember that even the smallest light can pierce through the shadows. Your struggles do not define you; they shape you into a resilient being. Embrace the support around you, and know that your presence is a gift to this world. Your story is not over, and there are brighter chapters waiting to be written. Hold on tight to hope, for it is a beacon guiding you through the storm. You are not alone in your journey towards healing and renewal.</p>",
    "<h1>You Are Not Alone</h1><p>In moments of despair, it's crucial to remember that pain is temporary, but the strength you cultivate within yourself is enduring. Your existence is a testament to courage, and your struggles do not diminish your worth. Reach out to those who care about you, for their love is a lifeline in turbulent waters. Every sunrise brings the promise of a new beginning, and every setback is a stepping stone towards resilience. You are not alone; you are surrounded by compassion and empathy. Together, we can navigate the darkest nights and welcome the dawn of a brighter tomorrow.</p>",
    "<h1>You Are Not Alone</h1><p>When the weight of the world feels unbearable, remember that your presence in this universe is significant. Your journey is a tapestry woven with both triumphs and tribulations, each thread contributing to the masterpiece of your life. Despite the storms that may rage around you, there is hope in the promise of tomorrow. Reach out to those who understand your pain, for they will walk beside you through the darkest valleys. Your story is far from over, and your strength knows no bounds. You are not alone in your struggle, for love and support surround you, guiding you towards healing and redemption.</p>",
    "<h1>You Are Not Alone</h1><p>When the shadows of despair loom large, remember that you are surrounded by a community that cares for you deeply. Your journey, though fraught with challenges, is a testament to your resilience and strength. Your presence in this world is a beacon of hope, illuminating the lives of those around you. Embrace the love that surrounds you, for it is a powerful force that can conquer even the deepest darkness. Reach out to those who offer solace and support, for together, we can weather any storm. You are not alone in your struggles; you are cherished, valued, and deeply loved.</p>",
    "<h1>You Are Not Alone</h1><p>Amidst the chaos and uncertainty, remember that your presence in this world is a profound gift. Your journey, though marked by trials, is a testament to your resilience and inner strength. Reach out to those who offer compassion and understanding, for they will walk alongside you through the darkest of days. Every obstacle you face is an opportunity for growth, and every tear shed is a testament to your humanity. Hold onto hope, for it is a guiding light in the depths of despair. You are not alone in your struggles; you are surrounded by love, support, and unwavering solidarity.</p>"
    // Add more motivational messages here
];

let currentMessageIndex = 0;
const messageContent = $('#message-content');

function showCurrentMessage() {
    messageContent.html(messages[currentMessageIndex]);
}

showCurrentMessage();

$('#prev-message-btn').on('click', function() {
    currentMessageIndex = (currentMessageIndex - 1 + messages.length) % messages.length;
    showCurrentMessage();
});

$('#next-message-btn').on('click', function() {
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    showCurrentMessage();
});
