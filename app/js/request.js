
class Requests{
    constructor(classHTMLTabela,classHTMLFoto, classHTMLRepos){
        this.classHTMLTabela = classHTMLTabela;
        this.classHTMLFoto= classHTMLFoto;
        this.classHTMLRepos=classHTMLRepos
    }
request (username){
    return fetch(`https://api.github.com/users/${username}`)
    .then(res => res.ok? res.json():false)
    .then(res =>{
        let viewFoto=`<img alt="Imagem de usuário" src=${res.avatar_url}/>`;

        let viewTabela= `
           
            <tr>
                <td>Repositórios</td>
                <td>${res.public_repos}</td>
            </tr>
            <tr>
                <td>Seguidores</td>
                <td>${res.following}</td>
            </tr>
            <tr>
                <td>Seguindo</td>
                <td>${res.followers}</td>
            </tr>
           </table>`;
        
        
        this.classHTMLTabela.innerHTML=viewTabela;
        this.classHTMLFoto.innerHTML=viewFoto;})

}

request2(username){
    fetch(`https://api.github.com/users/${username}/repos`).then(res =>res.ok? res.json():false)
    .then(res =>{ 
        let viewRepos = `<table>
                        <tr>
                        <td>Lista dos repositórios</td>
                        ${res.map(res =>{return `
                        <td>${res.name}</td>
                        `})}
                        </tr>
                        <tr>
                        ${res.map(res =>{return `
                        <td>${res.updated_at}</td>
                        `})}
                        </tr>
                        </table>`;
                    
        this.classHTMLRepos.innerHTML=viewRepos})}

}


var forms = document.querySelector(".forms")
var forma = document.querySelector(".teste")
var repositorios = document.querySelector(".repositorios")
var teste = document.querySelector(".desafio-box__content__list")
var testee = document.querySelector(".desafio-box__content")
forms.oninput=(event)=>{
    event.preventDefault();

    var testa = new Requests(teste,testee, repositorios)
    testa.request(forma.value)
    testa.request2(forma.value)
    
}