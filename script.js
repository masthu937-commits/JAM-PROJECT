
const songs = [
    { id: 1, title: "Samajavaragamana", artist: "Sid Sriram", category: "romantic", icon: "💜", color: "c1" },
    { id: 2, title: "Inkem Inkem Inkem Kaavaale", artist: "Sid Sriram", category: "romantic", icon: "🌸", color: "c2" },
    { id: 3, title: "Butta Bomma", artist: "Armaan Malik", category: "energetic", icon: "✨", color: "c3" },
    { id: 4, title: "Naatu Naatu", artist: "Rahul Sipligunj, Kaala Bhairava", category: "energetic", icon: "🔥", color: "c4" },
    { id: 5, title: "Srivalli", artist: "Sid Sriram", category: "melody", icon: "🌿", color: "c5" },
    { id: 6, title: "Oo Antava", artist: "Indravathi Chauhan", category: "energetic", icon: "🎧", color: "c6" },
    { id: 7, title: "Adiga Adiga", artist: "Sid Sriram", category: "romantic", icon: "🌷", color: "c7" },
    { id: 8, title: "Inthandham", artist: "S. P. Charan", category: "romantic", icon: "🌙", color: "c8" },
    { id: 9, title: "Kurchi Madathapetti", artist: "Sahithi Chaganti, Sri Krishna", category: "energetic", icon: "⚡", color: "c1" },
    { id: 10, title: "Chuttamalle", artist: "Shilpa Rao", category: "romantic", icon: "💖", color: "c2" },
    { id: 11, title: "Oh Sita Hey Rama", artist: "Vishal Chandrashekhar", category: "melody", icon: "🌹", color: "c3" },
    { id: 12, title: "Aradhya", artist: "Sid Sriram, Chinmayi", category: "romantic", icon: "🦋", color: "c4" },
    { id: 13, title: "Ramulo Ramula", artist: "Anurag Kulkarni", category: "energetic", icon: "🎉", color: "c5" },
    { id: 14, title: "Vellipomaakey", artist: "Sid Sriram", category: "melody", icon: "🌌", color: "c6" },
    { id: 15, title: "Priyathama Priyathama", artist: "Chinmayi", category: "melody", icon: "🌼", color: "c7" },
    { id: 16, title: "Life of Ram", artist: "Pradeep Kumar", category: "melody", icon: "🌄", color: "c8" }
];

let playlist = [];
let joined = false;
let participants = 0;
let totalVotes = 0;

const songGrid = document.getElementById("songGrid");
const playlistItems = document.getElementById("playlistItems");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const toast = document.getElementById("toast");

function renderSongs() {
    const search = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;

    const filteredSongs = songs.filter(song => {
        const matchesSearch =
            song.title.toLowerCase().includes(search) ||
            song.artist.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" || song.category === category;

        return matchesSearch && matchesCategory;
    });

    if (filteredSongs.length === 0) {
        songGrid.innerHTML = `
            <div class="no-results">
                No songs found. Try another search!
            </div>`;
        return;
    }

    songGrid.innerHTML = filteredSongs.map(song => {
        const isAdded = playlist.some(item => item.id === song.id);

        return `
            <article class="song-card">
                <div class="cover ${song.color}">
                    <span>${song.icon}</span>
                </div>

                <div class="song-info">
                    <h3 title="${song.title}">${song.title}</h3>
                    <p>${song.artist}</p>

                    <div class="song-actions">
                        <span class="song-tag">
                            ${song.category.toUpperCase()}
                        </span>

                        <button
                            class="add-btn ${isAdded ? "added" : ""}"
                            data-add="${song.id}"
                            aria-label="Add ${song.title} to playlist"
                            title="${isAdded ? "Already added" : "Add to playlist"}">
                            ${isAdded ? "✓" : "+"}
                        </button>
                    </div>
                </div>
            </article>`;
    }).join("");
}

function addSong(id) {
    const song = songs.find(item => item.id === id);

    if (!song) return;

    if (playlist.some(item => item.id === id)) {
        showToast("This song is already in your playlist!");
        return;
    }

    playlist.push({ ...song, votes: 0 });

    renderSongs();
    renderPlaylist();
    updateStats();

    showToast(song.title + " added to your playlist!");
}

function renderPlaylist() {
    document.getElementById("playlistBadge").textContent =
        playlist.length + (playlist.length === 1 ? " song" : " songs");

    document.getElementById("emptyPlaylist").style.display =
        playlist.length === 0 ? "block" : "none";

    if (playlist.length === 0) {
        playlistItems.innerHTML = "";
        return;
    }

    playlistItems.innerHTML = playlist.map(song => `
        <div class="playlist-item">
            <div class="mini-cover ${song.color}">${song.icon}</div>

            <div class="playlist-item-info">
                <strong>${song.title}</strong>
                <small>${song.artist}</small>
            </div>

            <button class="vote-btn" data-vote="${song.id}"
                title="Vote for this song">
                ♡ ${song.votes}
            </button>

            <button class="remove-btn" data-remove="${song.id}"
                title="Remove song"
                style="background:#fff0ef;color:#bd6666">
                ×
            </button>
        </div>
    `).join("");
}

function updateStats() {
    document.getElementById("songCount").textContent = playlist.length;
    document.getElementById("memberCount").textContent = participants;
    document.getElementById("voteCount").textContent = totalVotes;
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2300);
}

songGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-add]");

    if (button) {
        addSong(Number(button.dataset.add));
    }
});

playlistItems.addEventListener("click", event => {
    const voteButton = event.target.closest("[data-vote]");
    const removeButton = event.target.closest("[data-remove]");

    if (voteButton) {
        const song = playlist.find(
            item => item.id === Number(voteButton.dataset.vote)
        );

        if (song) {
            song.votes++;
            totalVotes++;

            renderPlaylist();
            updateStats();
            showToast("Your vote has been counted! ♡");
        }
    }

    if (removeButton) {
        const id = Number(removeButton.dataset.remove);
        playlist = playlist.filter(song => song.id !== id);

        renderSongs();
        renderPlaylist();
        updateStats();

        showToast("Song removed from playlist.");
    }
});

searchInput.addEventListener("input", renderSongs);
categoryFilter.addEventListener("change", renderSongs);

document.getElementById("clearPlaylist").addEventListener("click", () => {
    if (playlist.length === 0) {
        showToast("Your playlist is already empty.");
        return;
    }

    playlist = [];
    renderSongs();
    renderPlaylist();
    updateStats();

    showToast("Playlist cleared successfully.");
});

document.getElementById("joinJam").addEventListener("click", () => {
    const jamTime = document.getElementById("jamTime").value;

    if (joined) {
        joined = false;
        participants--;
        document.getElementById("joinJam").textContent = "Join the jam ↗";
        document.getElementById("jamStatus").textContent = "You left the session.";
        showToast("You left the jam session.");
    } else {
        if (jamTime && new Date(jamTime) < new Date()) {
            showToast("Please choose a future date and time.");
            return;
        }

        joined = true;
        participants++;
        document.getElementById("joinJam").textContent = "Leave the jam ×";
        document.getElementById("jamStatus").textContent =
            jamTime ? "Session time selected!" : "You're in the jam!";
        showToast("Welcome to the campus jam! 🎸");
    }

    document.getElementById("participantText").textContent =
        participants + (participants === 1 ? " person joined" : " people joined");

    document.getElementById("avatars").innerHTML =
        participants > 0 ? `<span>🎵</span>` : `<span>♫</span>`;

    updateStats();
});

// Initial page setup
renderSongs();
renderPlaylist();
updateStats();
