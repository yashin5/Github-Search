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
        this.renderizaUserBox();
        }
        this.btn1.onclick= event =>{
            event.preventDefault();
            this.renderizaRepo();
        }
            

        this.btn2.onclick= event =>{
            event.preventDefault();
            this.renderizaFavoritos()
        }
    
    }

    renderizaUserBox(){
        requestUserBox(this.inputSearch.value)    
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
        .then(dados_repo =>{ 
            let viewRepos = `
            <thead>
                <tr>
                <th>Repositório</th>
                <th>Última atualização</th>
                </tr>
            </thead>
            <tbody>
            
                ${this.renderRepo(dados_repo)}
            
            </tbody>`;
                        
            this.classHTMLRepos.innerHTML=viewRepos})


    }
    renderizaFavoritos(){
        requestRepo(this.inputSearch.value)
        .then(dados_repo =>{
            let viewFavoritos = `
                <thead>
                    <tr>
                    <th>Repositório</th>
                    <th>Número de estrelas</th>
                    </tr>
                </thead>
                <tbody>
                
                ${this.renderFavoritos(dados_repo)}
                </tbody>`;
        this.classHTMLRepos.innerHTML=viewFavoritos
        })
    }

    renderRepo(repositorio){
        return repositorio.map(res =>{return `
            <tr>
            <td>${res.name}</td><td>${dateHelper(res.updated_at)}</td>
            </tr>
            `}).join("")
    }

    renderFavoritos(repositorio){
        return repositorio.map(res =>{return `
        <tr>
        <td>${res.name}</td><td>${res.stargazers_count}</td>
        </tr>
        `}).join("")
}
}

const gitcontroller = new GitController();
    
