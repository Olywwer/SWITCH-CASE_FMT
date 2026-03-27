const bancoFilmes = {
    "1": [
        {
            nome: "John Wick",
            img: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
            desc: "Um ex-assassino volta à ativa em busca de vingança."
        },
        {
            nome: "Gladiador",
            img: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
            desc: "General romano luta por honra e vingança."
        },
        {
            nome: "Mad Max: Fury Road",
            img: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
            desc: "Sobrevivência em um mundo pós-apocalíptico."
        }
    ],

    "2": [
        {
            nome: "Deadpool",
            img: "https://image.tmdb.org/t/p/w500/3E53WEZJqP6aM84D8CckXx4pIHw.jpg",
            desc: "Um anti-herói irreverente quebra todas as regras."
        },
        {
            nome: "Se Beber, Não Case!",
            img: "https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg",
            desc: "Uma despedida de solteiro fora de controle."
        },
        
        {
            nome: "Ace Ventura",
            img: "https://image.tmdb.org/t/p/w500/pqiRuETmuSybfnVZ7qyeoXhQyN1.jpg",
            desc: "Um detetive excêntrico especializado em animais."
        },


    ],

    "3": [
        {
            nome: "Forrest Gump",
            img: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
            desc: "A história emocionante de um homem simples."
        },
        {
            nome: "Coringa",
            img: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
            desc: "A origem sombria de um vilão icônico."
        },
        {
            nome: "Clube da Luta",
            img: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
            desc: "Um homem cria um clube secreto de luta."
        }
    ],

    "4": [
        {
            nome: "It: A Coisa",
            img: "https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
            desc: "Um palhaço aterrorizante assombra crianças."
        },
        {
            nome: "Invocação do Mal",
            img: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
            desc: "Investigadores enfrentam forças sobrenaturais."
        },
        {
            nome: "Hereditário",
            img: "https://image.tmdb.org/t/p/w500/lHV8HHlhwNup2VbpiACtlKzaGIQ.jpg",
            desc: "Uma família lida com eventos assustadores."
        }
    ],

    "5": [
        {
            nome: "Interestelar",
            img: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            desc: "Uma jornada espacial para salvar a humanidade."
        },
        {
            nome: "Matrix",
            img: "https://image.tmdb.org/t/p/w500/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg",
            desc: "A realidade pode não ser o que parece."
        },
        {
            nome: "Avatar",
            img: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
            desc: "Uma aventura em um planeta alienígena."
        }
    ],

    "6": [
        {
            nome: "Titanic",
            img: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
            desc: "Um romance inesquecível em meio a uma tragédia."
        },
        {
            nome: "La La Land",
            img: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
            desc: "Amor e sonhos em Los Angeles."
        },
        {
            nome: "Diário de uma Paixão",
            img: "https://image.tmdb.org/t/p/w500/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg",
            desc: "Uma história de amor intensa e duradoura."
        }
    ]
};


function carregarFilmes() {
    const categoria = document.getElementById("categoria").value;
    const container = document.getElementById("filmes");

    if (!categoria) {
        container.innerHTML = "<p class='text-danger'>Escolha uma categoria!</p>";
        return;
    }

    localStorage.setItem("categoria", categoria);

    let filmes = bancoFilmes[categoria] || [];

    container.innerHTML = filmes.map((f, i) => `
        <div class="col-md-4">
            <div class="card-filme p-2">

                <img 
                  src="${f.img}" 
                  onerror="this.src='https://via.placeholder.com/300x450?text=Sem+Imagem'"
                  onclick='abrirModal(${JSON.stringify(f)})'
                >

                <h5 class="mt-2">${f.nome}</h5>

                <div class="estrelas" data-index="${i}">
                    ${gerarEstrelas(i)}
                </div>

                <button class="btn-fav" onclick='favoritar(${JSON.stringify(f)})'>
                    ❤️
                </button>

            </div>
        </div>
    `).join("");
}
function mostrarFavoritos() {
    const container = document.getElementById("filmes");
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {
        container.innerHTML = "<p class='text-warning'>Nenhum favorito ainda</p>";
        return;
    }

    container.innerHTML = favoritos.map((f, i) => `
        <div class="col-md-4">
            <div class="card-filme p-2">

                <img 
                  src="${f.img}" 
                  onerror="this.src='https://via.placeholder.com/300x450?text=Sem+Imagem'"
                  onclick='abrirModal(${JSON.stringify(f)})'
                >

                <h5 class="mt-2">${f.nome}</h5>

                <button class="btn btn-danger mt-2" onclick="removerFavorito('${f.nome}')">
                    ❌ Remover
                </button>
                

            </div>
        </div>
    `).join("");
}

function removerFavorito(nome) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(f => f.nome !== nome);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos(); // Atualiza a tela
}

function gerarEstrelas(index) {
    return [1,2,3,4,5].map(n =>
        `<span onclick="avaliar(${index}, ${n})">★</span>`
    ).join("");
}

function avaliar(index, nota) {
    let estrelas = document.querySelectorAll(`.estrelas[data-index="${index}"] span`);

    estrelas.forEach((e, i) => {
        e.classList.toggle("ativo", i < nota);
    });

    localStorage.setItem("nota_" + index, nota);
}


function favoritar(filme) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (!favoritos.find(f => f.nome === filme.nome)) {
        favoritos.push(filme);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        alert("Adicionado aos favoritos ❤️");
    } else {
        alert("Já está nos favoritos!");
    }
}


function filtrarFilmes() {
    let input = document.getElementById("busca").value.toLowerCase();
    let filmes = document.querySelectorAll(".col-md-4");

    filmes.forEach(f => {
        let nome = f.innerText.toLowerCase();
        f.style.display = nome.includes(input) ? "block" : "none";
    });
}


function abrirModal(filme) {
    let modalHTML = `
        <div class="modal fade show" style="display:block; background:rgba(0,0,0,0.8)">
            <div class="modal-dialog">
                <div class="modal-content bg-dark text-light p-3">
                    <h3>${filme.nome}</h3>
                    <img src="${filme.img}" class="img-fluid mb-3">
                    <p>${filme.desc}</p>
                    <button class="btn btn-danger" onclick="fecharModal()">Fechar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function fecharModal() {
    document.querySelector(".modal").remove();
}


window.onload = () => {
    let categoria = localStorage.getItem("categoria");
    if (categoria) {
        document.getElementById("categoria").value = categoria;
        carregarFilmes();
    }
};