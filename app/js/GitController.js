class GitController{
    constructor(){
        let $ = 
        this.classHTMLTabela = document.querySelector(".desafio-box__content__list");
        this.classHTMLFoto= document.querySelector(".desafio-box__content");
        this.classHTMLRepos= document.querySelector(".tabela-repositorios");
        this.btn1= document.querySelector(".btn1");
        this.btn2= document.querySelector(".btn2");
        this.inputSearch = document.querySelector(".inputSearch");
        this.renderiza()
    }   
    
    renderiza(){        
        this.inputSearch.oninput= event =>{
        event.preventDefault();
        this.renderizaBox();
    }
        this.btn1.onclick= event =>{
            event.preventDefault();
            this.renderizaRepo();
    }
            

        this.btn2.onclick= event =>{
            event.preventDefault();
            // renderizaFavoritos()
    }
    
}

    renderizaBox(){
        requestBox(this.inputSearch.value)    
        .then(res =>{
            let viewFoto= `<img alt="Imagem de usuário" src=${res.avatar_url}/>`;

            let viewTabela= `
                    <h2>Repositórios - ${res.public_repos}</h2>
                    <h2>Seguidores - ${res.following}</h2>
                    <h2>Seguindo - ${res.followers}</h2>`; 
            this.classHTMLTabela.innerHTML=viewTabela;
            this.classHTMLFoto.innerHTML=viewFoto;})
    }

    renderizaRepo(){
        requestRepo(this.inputSearch.value)
        .then(res =>{ 
            let viewRepos = `
            <thead>
                <tr>
                <th>Repositório</th>
                <th>Última atualização</th>
                </tr>
            </thead>
            <tbody>
            
                ${res.map(res =>{return `
                <tr>
                <td>${res.name}</td><td>${dateHelper(res.updated_at)}</td>
                </tr>
                `}).join("")}
            
            </tbody>`
                        
            this.classHTMLRepos.innerHTML=viewRepos})
    }
}

const gitcontroller = new GitController();
    
