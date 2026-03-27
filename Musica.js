let musicaAtual = null;

const player = document.getElementById("audioPlayer");
const btnPlay = document.getElementById("btnPlay");
const progresso = document.getElementById("progresso");


const bancoMusicas = {
    "1": [
        { nome: "Rock 1", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
        { nome: "Rock 2", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
    ],
    "2": [
        { nome: "Pop 1", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
    ],
    "3": [
        { nome: "Hip Hop", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
    ],
    "4": [
        { nome: "Eletrônica", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
    ],
    "5": [
        { nome: "Jazz", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
    ],
    "6": [
        { nome: "Clássica", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" }
    ]
};


function carregarMusicas() {
    const genero = document.getElementById("genero").value;
    const container = document.getElementById("musicas");

    if (!genero) {
        container.innerHTML = "<p class='text-danger'>Escolha um gênero!</p>";
        return;
    }

    let musicas = bancoMusicas[genero] || [];

    container.innerHTML = musicas.map(m => `
        <div class="col-md-4 mb-3">
            <div class="card-musica p-3">

                <h5>${m.nome}</h5>

                <button onclick='tocarMusica(${JSON.stringify(m)})'
                class="btn btn-success w-100 mt-2">
                ▶️ Tocar
                </button>

            </div>
        </div>
    `).join("");
}


function tocarMusica(m) {
    musicaAtual = m;

    player.src = m.audio;
    player.play();

    btnPlay.innerHTML = "⏸️";
    document.getElementById("nomeMusica").innerText = m.nome;
    document.getElementById("playerFixo").classList.remove("d-none");
}

function togglePlay() {
    if (player.paused) {
        player.play();
        btnPlay.innerHTML = "⏸️";
    } else {
        player.pause();
        btnPlay.innerHTML = "▶️";
    }
}


player.addEventListener("timeupdate", () => {
    progresso.value = (player.currentTime / player.duration) * 100 || 0;
});

progresso.addEventListener("input", () => {
    player.currentTime = (progresso.value / 100) * player.duration;
});


function favoritarAtual() {
    let fav = JSON.parse(localStorage.getItem("fav")) || [];

    if (!fav.find(f => f.nome === musicaAtual.nome)) {
        fav.push(musicaAtual);
        localStorage.setItem("fav", JSON.stringify(fav));
        alert("Adicionado ❤️");
    }
}

function mostrarFavoritos() {
    let fav = JSON.parse(localStorage.getItem("fav")) || [];
    const container = document.getElementById("musicas");

    if (fav.length === 0) {
        container.innerHTML = "<p>Nenhum favorito 😢</p>";
        return;
    }

    container.innerHTML = fav.map(m => `
        <div class="col-md-4 mb-3">
            <div class="card-musica p-3">
                <h5>${m.nome}</h5>
            </div>
        </div>
    `).join("");
}


function filtrarMusicas() {
    let input = document.getElementById("busca").value.toLowerCase();
    let cards = document.querySelectorAll(".col-md-4");

    cards.forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}