writing{variant="standard" id="74106" title="CampusVibe script.js"} /* ================= GLOBAL HELPERS ================= */

function showNotification(message) { const notification = document.getElementById("notification");

notification.querySelector("p").textContent = message; notification.classList.add("show");

setTimeout(() => { notification.classList.remove("show"); }, 2500); }

/* ================= NAVIGATION ================= */

function scrollToSection(sectionId) { const section = document.getElementById(sectionId);

if (section) { section.scrollIntoView({ behavior: "smooth" }); } }

/* ================= LOGIN ================= */

function login() { showNotification("Login feature coming soon! 🎧"); }

/* ================= HERO PLAYER ================= */

function playHero(button) {

if (button.textContent.trim() === "▶") {

button.textContent = "Ⅱ";

showNotification("Now playing Campus Sunset 🎵");

} else {

button.textContent = "▶";

showNotification("Music paused ⏸️"); } }

/* ================= MUSIC SEARCH ================= */

function searchMusic() {

const input = document .getElementById("musicSearch") .value .toLowerCase() .trim();

const songs = document.querySelectorAll(".song-card");

let visibleSongs = 0;

songs.forEach(song => {

const name = song .dataset .name .toLowerCase();

const text = song .innerText .toLowerCase();

if ( name.includes(input) || text.includes(input) ) {

song.style.display = "grid"; visibleSongs++;

} else {

song.style.display = "none"; } });

if (visibleSongs === 0 && input !== "") { showNotification("No songs found 🔍"); } }

/* ================= LIKE SONG ================= */

function likeSong(button) {

button.classList.toggle("liked");

if (button.classList.contains("liked")) {

button.textContent = "♥";

showNotification("Added to your favourites ❤️");

} else {

button.textContent = "♡";

showNotification("Removed from favourites"); } }

/* ================= PLAY SONG ================= */

function playSong(button) {

const card = button.closest(".song-card");

const title = card.querySelector(".song-info h3").textContent;

// Reset all other buttons document.querySelectorAll(".song-play").forEach(btn => {

if (btn !== button) { btn.textContent = "▶"; }

});

if (button.textContent === "▶") {

button.textContent = "Ⅱ";

showNotification(Now playing "${title}" 🎵);

} else {

button.textContent = "▶";

showNotification(Paused "${title}"); } }

/* ================= VIEW ALL MUSIC ================= */

function showAllMusic() {

const songs = document.querySelectorAll(".song-card");

songs.forEach(song => { song.style.display = "grid"; });

const search = document.getElementById("musicSearch");

if (search) { search.value = ""; }

showNotification("Showing all campus music 🎵"); }

/* ================= PLAYLIST MODAL ================= */

function openPlaylist() {

document .getElementById("playlistModal") .classList.add("show");

setTimeout(() => { document.getElementById("playlistName").focus(); }, 100); }

function closePlaylist() {

document .getElementById("playlistModal") .classList.remove("show"); }

function createPlaylist() {

const name = document .getElementById("playlistName") .value .trim();

const description = document .getElementById("playlistDescription") .value .trim();

if (!name) {

showNotification("Please enter a playlist name 🎵");

return; }

console.log("New playlist:", { name: name, description: description });

closePlaylist();

document.getElementById("playlistName").value = ""; document.getElementById("playlistDescription").value = "";

showNotification(Playlist "${name}" created! 🎉); }

/* ================= PLAY PLAYLIST ================= */

function playPlaylist(button) {

const card = button.closest(".playlist-card");

const playlistName = card .querySelector("h3") .textContent;

// Stop other playlist buttons document.querySelectorAll(".playlist-body button").forEach(btn => {

if (btn !== button) { btn.textContent = "▶ Play Playlist"; }

});

if (button.dataset.playing === "true") {

button.dataset.playing = "false"; button.textContent = "▶ Play Playlist";

showNotification(Paused "${playlistName}");

} else {

button.dataset.playing = "true"; button.textContent = "Ⅱ Pause Playlist";

showNotification(Playing "${playlistName}" 🎵); } }

/* ================= JAM MODAL ================= */

function openJam() {

document .getElementById("jamModal") .classList.add("show");

setTimeout(() => { document.getElementById("jamName").focus(); }, 100); }

function closeJam() {

document .getElementById("jamModal") .classList.remove("show"); }

function createJam() {

const name = document .getElementById("jamName") .value .trim();

const location = document .getElementById("jamLocation") .value .trim();

const time = document .getElementById("jamTime") .value;

if (!name) {

showNotification("Please enter a jam session name 🎸");

return; }

if (!location) {

showNotification("Please enter a location 📍");

return; }

if (!time) {

showNotification("Please select a time ⏰");

return; }

console.log("New Jam Session:", { name: name, location: location, time: time });

closeJam();

document.getElementById("jamName").value = ""; document.getElementById("jamLocation").value = ""; document.getElementById("jamTime").value = "";

showNotification("${name}" jam session created! 🎸); }

/* ================= JOIN JAM ================= */

function joinJam(button) {

const jamCard = button.closest(".jam-card");

const jamName = jamCard .querySelector(".jam-info h3") .textContent;

if (button.classList.contains("joined")) {

button.classList.remove("joined"); button.textContent = "Join";

showNotification(You left "${jamName}");

} else {

button.classList.add("joined"); button.textContent = "Joined ✓";

showNotification(You joined "${jamName}"! 🎸); } }

/* ================= CLOSE MODALS ON BACKDROP ================= */

document.addEventListener("click", function(event) {

const playlistModal = document.getElementById("playlistModal");

const jamModal = document.getElementById("jamModal");

if (event.target === playlistModal) { closePlaylist(); }

if (event.target === jamModal) { closeJam(); } });

/* ================= ESC KEY ================= */

document.addEventListener("keydown", function(event) {

if (event.key === "Escape") {

closePlaylist(); closeJam(); } });

/* ================= ENTER KEY FOR MODALS ================= */

document.addEventListener("keydown", function(event) {

if (event.key !== "Enter") { return; }

const activeElement = document.activeElement;

if (activeElement && activeElement.id === "playlistName") {

createPlaylist(); }

if (activeElement && activeElement.id === "jamName") {

createJam(); } });

/* ================= INITIAL LOAD ================= */

document.addEventListener("DOMContentLoaded", function() {

console.log("CampusVibe loaded successfully 🎵");

});
