
const songs = [
    {id:1, title:"Samajavaragamana", movie:"Ala Vaikunthapurramuloo", category:"melody", emoji:"💜", cover:"c1"},
    {id:2, title:"Butta Bomma", movie:"Ala Vaikunthapurramuloo", category:"energetic", emoji:"💃", cover:"c2"},
    {id:3, title:"Inkem Inkem Inkem Kaavaale", movie:"Geetha Govindam", category:"romantic", emoji:"💖", cover:"c3"},
    {id:4, title:"Vachindamma", movie:"Geetha Govindam", category:"romantic", emoji:"🌸", cover:"c4"},
    {id:5, title:"Srivalli", movie:"Pushpa", category:"melody", emoji:"🌹", cover:"c5"},
    {id:6, title:"Oo Antava", movie:"Pushpa", category:"mass", emoji:"🔥", cover:"c6"},
    {id:7, title:"Ramuloo Ramulaa", movie:"Ala Vaikunthapurramuloo", category:"energetic", emoji:"🎉", cover:"c7"},
    {id:8, title:"Naatu Naatu", movie:"RRR", category:"mass", emoji:"⚡", cover:"c8"},
    {id:9, title:"Dosti", movie:"RRR", category:"energetic", emoji:"🤝", cover:"c1"},
    {id:10, title:"Komuram Bheemudo", movie:"RRR", category:"melody", emoji:"🌿", cover:"c2"},
    {id:11, title:"Aradhya", movie:"Kushi", category:"romantic", emoji:"❤️", cover:"c3"},
    {id:12, title:"Na Roja Nuvve", movie:"Kushi", category:"romantic", emoji:"🌹", cover:"c4"},
    {id:13, title:"Kurchi Madathapetti", movie:"Guntur Kaaram", category:"mass", emoji:"💥", cover:"c5"},
    {id:14, title:"Dum Masala", movie:"Guntur Kaaram", category:"mass", emoji:"🔥", cover:"c6"},
    {id:15, title:"Oh Sita Hey Rama", movie:"Sita Ramam", category:"romantic", emoji:"💌", cover:"c7"},
    {id:16, title:"Inthandham", movie:"Sita Ramam", category:"melody", emoji:"🌷", cover:"c8"},
    {id:17, title:"Penny", movie:"Sarkaru Vaari Paata", category:"energetic", emoji:"💰", cover:"c1"},
    {id:18, title:"Kalaavathi", movie:"Sarkaru Vaari Paata", category:"romantic", emoji:"✨", cover:"c2"},
    {id:19, title:"Chuttamalle", movie:"Devara", category:"romantic", emoji:"🌺", cover:"c3"},
    {id:20, title:"Fear Song", movie:"Devara", category:"mass", emoji:"🖤", cover:"c4"},
    {id:21, title:"Daakko Daakko Meka", movie:"Pushpa", category:"mass", emoji:"🐺", cover:"c5"},
    {id:22, title:"Yenti Yenti", movie:"Geetha Govindam", category:"melody", emoji:"🌼", cover:"c6"},
    {id:23, title:"Priyathama Priyathama", movie:"Majili", category:"melody", emoji:"💗", cover:"c7"},
    {id:24, title:"Vellipomaakey", movie:"Saahasam Swaasaga Saagipo", category:"melody", emoji:"🌙", cover:"c8"},
    {id:25, title:"Adiga Adiga", movie:"Ninnu Kori", category:"romantic", emoji:"💞", cover:"c1"},
    {id:26, title:"Life of Ram", movie:"Jaanu", category:"melody", emoji:"🌄", cover:"c2"},
    {id:27, title:"Pilla Raa", movie:"RX 100", category:"romantic", emoji:"💕", cover:"c3"},
    {id:28, title:"Mind Block", movie:"Sarileru Neekevvaru", category:"mass", emoji:"💪", cover:"c4"},
    {id:29, title:"Seeti Maar", movie:"DJ", category:"energetic", emoji:"🎶", cover:"c5"},
    {id:30, title:"Top Lesi Poddi", movie:"Iddarammayilatho", category:"energetic", emoji:"🥳", cover:"c6"}
];

let playlist = [];
let votes = {};
let participants = [];
let joined = false;

const songGrid = document.getElementById("songGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const playlistItems = document.getElementById("playlistItems");
const emptyPlaylist = document.getElementById("emptyPlaylist");
const toastBox = document.getElementById("toast");

function showToast(message) {
    toastBox.textContent = message;
    toastBox.classList.add("show");

    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
        toastBox.classList.remove("show");
    }, 2200);
}

function renderSongs() {
    const search = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;

    const filteredSongs = songs.filter(song => {
        const matchesSearch =
            song.title.toLowerCase().includes(search) ||
            song.movie.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" || song.category === category;

        return matchesSearch && matchesCategory;
    });

    songGrid.innerHTML = "";

    if (filteredSongs.length === 0) {
        songGrid.innerHTML =
            '<p class="muted">No songs found. Try another search.</p>';
        updateStats();
        return;
    }

    filteredSongs.forEach(song => {
        const isAdded = playlist.some(item => item.id === song.id);

        const card = document.createElement("article");
        card.className = "song-card";

        card.innerHTML = `
            <div class="cover ${song.cover}">
                <span>${song.emoji}</span>
            </div>
            <span class="song-category">${song.category}</span>
            <h3>${song.title}</h3>
            <p class="movie">${song.movie}</p>
            <div class="song-actions">
                <button class="vote-btn" data-vote="${song.id}">
                    ♡ ${votes[song.id] || 0}
                </button>
                <button class="add-btn" data-add="${song.id}">
                    ${isAdded ? "✓ Added" : "+ Add"}
                </button>
            </div>
        `;

        songGrid.appendChild(card);
    });

    updateStats();
}

function renderPlaylist() {
    playlistItems.innerHTML = "";
    emptyPlaylist.style.display = playlist.length ? "none" : "block";

    playlist.forEach(song => {
        const item = document.createElement("div");
        item.className = "playlist-item";

        item.innerHTML = `
            <div class="playlist-emoji">${song.emoji}</div>
            <div class="playlist-info">
                <h4>${song.title}</h4>
                <p>${song.movie}</p>
            </div>
            <button class="remove-btn" data-remove="${song.id}">
                Remove
            </button>
        `;

        playlistItems.appendChild(item);
    });

    document.getElementById("playlistBadge").textContent =
        `${playlist.length} songs`;

    renderSongs();
}

function updateStats() {
    document.getElementById("songCount").textContent = songs.length;

    document.getElementById("memberCount").textContent =
        participants.length;

    document.getElementById("voteCount").textContent =
        Object.values(votes).reduce((total, count) => total + count, 0);
}

songGrid.addEventListener("click", function(event) {
    const voteButton = event.target.closest("[data-vote]");
    const addButton = event.target.closest("[data-add]");

    if (voteButton) {
        const id = Number(voteButton.dataset.vote);
        votes[id] = (votes[id] || 0) + 1;
        renderSongs();
        showToast("Your vote has been counted! ❤️");
    }

    if (addButton) {
        const id = Number(addButton.dataset.add);
        const song = songs.find(item => item.id === id);

        if (playlist.some(item => item.id === id)) {
            showToast("This song is already in your playlist.");
            return;
        }

        playlist.push(song);
        renderPlaylist();
        showToast(song.title + " added to your playlist! 🎵");
    }
});

playlistItems.addEventListener("click", function(event) {
    const button = event.target.closest("[data-remove]");

    if (!button) return;

    const id = Number(button.dataset.remove);
    playlist = playlist.filter(song => song.id !== id);

    renderPlaylist();
    showToast("Song removed from playlist.");
});

document.getElementById("clearPlaylist").addEventListener("click", function() {
    if (playlist.length === 0) {
        showToast("Your playlist is already empty.");
        return;
    }

    playlist = [];
    renderPlaylist();
    showToast("Playlist cleared successfully.");
});

searchInput.addEventListener("input", renderSongs);
categoryFilter.addEventListener("change", renderSongs);

document.getElementById("joinJam").addEventListener("click", function() {
    if (joined) {
        participants = participants.filter(name => name !== "You");
        joined = false;
        this.textContent = "Join Jam Session →";
        document.getElementById("jamStatus").textContent = "Open to Join";
        showToast("You left the jam session.");
    } else {
        participants.push("You");
        joined = true;
        this.textContent = "Leave Jam Session";
        document.getElementById("jamStatus").textContent = "You're Participating!";
        showToast("Welcome to the campus jam! 🎸");
    }

    document.getElementById("participantText").textContent =
        participants.length
            ? `${participants.length} participant(s) joined`
            : "Be the first to join!";

    const avatars = document.getElementById("avatars");
    avatars.innerHTML = "";

    const emojiList = ["🎧", "🎸", "🎤", "🎹", "🥁", "🎵"];

    for (let i = 0; i < participants.length; i++) {
        const avatar = document.createElement("span");
        avatar.textContent = emojiList[i % emojiList.length];
        avatars.appendChild(avatar);
    }

    updateStats();
});

renderPlaylist();
