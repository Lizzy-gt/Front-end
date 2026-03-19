const nomeAluno = document.querySelector('#nome-usuario')
nomeAluno.innerHTML = "Luiz Gustavo🌼"

const fotoPerfil = document.querySelector('#foto-perfil')
fotoPerfil.src = "./src/img/foto_de_perfil.png"

const corFundo = document.querySelector('#container-perfil')
corFundo.style.backgroundColor = '#f1ecb4'

const statusUsuario = document.getElementById('badge-status');
if (statusUsuario) {
    statusUsuario.classList.add('online')
    statusUsuario.textContent = 'Status: Online'
}

const qtndSkill = document.querySelectorAll('.skill')
console.log('Quantidade de skill que ele tem:', qtndSkill.length)
