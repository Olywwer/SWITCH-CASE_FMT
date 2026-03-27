function escolherTema() {

    const opcao = document.getElementById("tema").value;

    const resultado = document.getElementById("resultado");
    const projetos = document.getElementById("projetos");
    const trilha = document.getElementById("trilha");

    let mensagem = "";
    let sugestoes = [];
    let passos = [];

    switch (opcao) {

        case "1":
            mensagem = " Você escolheu Programação!";
            sugestoes = ["Criar login", "Fazer CRUD", "Criar site"];
            passos = ["Lógica", "JavaScript", "Framework"];
            break;

        case "2":
            mensagem = " Você escolheu Jogos!";
            sugestoes = ["Jogo da velha", "Jogo 2D", "Sistema de pontos"];
            passos = ["Lógica", "Engine", "Projetos"];
            break;

        case "3":
            mensagem = " Você escolheu Tecnologia!";
            sugestoes = ["Montar PC", "Blog tech", "Redes"];
            passos = ["Hardware", "Redes", "Cloud"];
            break;

        case "4":
            mensagem = " Você escolheu Design!";
            sugestoes = ["UI app", "Layout site", "Identidade visual"];
            passos = ["Cores", "Figma", "UX"];
            break;

        case "5":
            mensagem = " Você escolheu IA!";
            sugestoes = ["Chatbot", "Análise dados", "Modelo IA"];
            passos = ["Python", "ML", "Projetos"];
            break;

        case "6":
            mensagem = " Você escolheu Segurança!";
            sugestoes = ["Criptografia", "Pentest", "Sistema seguro"];
            passos = ["Redes", "Web security", "Hacking ético"];
            break;

        default:
            resultado.innerHTML = "<div class='box'>⚠️ Escolha um tema válido!</div>";
            projetos.innerHTML = "";
            trilha.innerHTML = "";
            return;
    }

    
    localStorage.setItem("temaEscolhido", opcao);

    
    resultado.innerHTML = `
        <div class="box">
            <h3 class="titulo">${mensagem}</h3>
            <p> Continue evoluindo nessa área!</p>
        </div>
    `;

   
    projetos.innerHTML = `
        <div class="box">
            <h4 class="titulo"> Projetos</h4>
            <ul>${sugestoes.map(s => `<li>${s}</li>`).join("")}</ul>
        </div>
    `;

   
    trilha.innerHTML = `
        <div class="box">
            <h4 class="titulo"> Trilha</h4>
            <ol>${passos.map(p => `<li>${p}</li>`).join("")}</ol>
        </div>
    `;
}


document.addEventListener("DOMContentLoaded", () => {
    const salvo = localStorage.getItem("temaEscolhido");

    if (salvo) {
        document.getElementById("tema").value = salvo;
        escolherTema();
    }
});