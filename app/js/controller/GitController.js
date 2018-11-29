class GitController{
    constructor(){
        this.classHTMLTabela = document.querySelector(".desafio-box__content__list");
        this.classHTMLFoto= document.querySelector(".desafio-box__content");
        this.classHTMLRepos= document.querySelector(".tabela-repositorios");
        this.btn1= document.querySelector(".btn1");
        this.btn2= document.querySelector(".btn2");
        this.renderizaUserBox=debounce(1000,this.renderizaUserBox.bind(this))
        this.inputSearch = document.querySelector(".inputSearch");
        this.renderiza();
    };   
    
    renderiza(){        
        this.inputSearch.oninput= event =>{
        event.preventDefault();
        this.renderizaUserBox();
        };
        
        this.btn1.onclick= event =>{
            event.preventDefault();
            this.renderizaRepo();
        };
            

        this.btn2.onclick= event =>{
            event.preventDefault();
            this.renderizaFavoritos();
        };
    
    };

    renderizaUserBox(){
        requestUserBox(this.inputSearch.value)    
        .then(user =>{
            this.classHTMLFoto.innerHTML= this.renderUserBoxFoto(user);
            this.classHTMLTabela.innerHTML= this.renderUserBoxDados(user);
        });

    };

    renderizaRepo(){
        requestRepo(this.inputSearch.value)
        .then(dadosRepo =>{           
            this.classHTMLRepos.innerHTML=this.renderRepoContent(dadosRepo);
        });

    }

    renderizaFavoritos(){
        requestRepo(this.inputSearch.value)
        .then(dadosRepo =>{
        this.classHTMLRepos.innerHTML=this.renderFavoritosContent(dadosRepo)
        });
    };

    renderUserBoxFoto(usuario){
        return usuario.avatar_url? 
                    `<img alt="Imagem de usuário" src=${usuario.avatar_url}/>`
                        :                
                    `<div class="msg-erro-usernf">
                        <img  alt="usuario nao encontrado"src="./img/msg-erro-usernf.png"/>
                        <h2>Não conseguimos encontrar esse usuário :( </h2>
                    </div>`;
    };

    renderUserBoxDados(usuario){
        return `<h2>Repositórios - ${usuario.public_repos? usuario.public_repos
                    :
                "usuário não existe"}</h2>
                <h2>Seguidores - ${usuario.following? usuario.following
                    :
                "usuário não existe"}</h2>
                 <h2>Seguindo - ${usuario.followers? usuario.followers
                    :
                "usuário não existe"}</h2>`;
    };

    renderRepo(repositorio){
        return repositorio.map(res =>{return `
            <tr>
            <td>${res.name}</td><td>${dateHelper(res.updated_at)}</td>
            </tr>
            `}).join("");

    };

    renderRepoContent(repositorio){
        return `
                <thead>
                    <tr>
                    <th>Repositório</th>
                    <th>Última atualização</th>
                    </tr>
                </thead>
                <tbody>
                
                    ${this.renderRepo(repositorio)?
                    this.renderRepo(repositorio)
                    :
                        `<div class="msg-erro">
                        <img  src="./img/msg-erro.png"/>
                        <h2 >Esse usuário não possui repositórios :(
                        </div>`
                    }
                
                </tbody>`;
    };

    renderFavoritos(repositorio){
        return this.renderFavoritosFilter(repositorio)
            
            .map(res => {return `
                <tr>
                <td>${res.name}</td><td>${res.stargazers_count}</td>
                </tr>
                `}).join("");
    };

    renderFavoritosContent(repositorio){
        return `
                <thead>
                    <tr>
                    <th>Repositório</th>
                    <th>Número de estrelas</th>
                    </tr>
                </thead>
                <tbody>
                
                ${this.renderFavoritos(repositorio)? 
                    this.renderFavoritos(repositorio)
                    :
                    `<div class="msg-erro">
                        <img  src="./img/msg-erro.png"/>
                        <h2 >Esse repositório não possui estrelas :(
                    </div>`}
                </tbody>`;
    }

    renderFavoritosFilter(repositorio){
        return repositorio.filter(res =>{
            if(res.stargazers_count>0){return res}

            else{return console.log("erro")
        };
    }).sort((a,b) => b.stargazers_count-a.stargazers_count);
    };

};

const gitcontroller = new GitController();
    

function smoothScroll(target,duration){
    let targetAlvo = document.querySelector(target);
    let targetPosition = targetAlvo.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime){
        if(startTime ===null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0,run);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    };

    function ease(t, b, c, d){
        t /= d / 2;
        if(t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) -1) + b;
    }

    requestAnimationFrame(animation);
}

let scrollSobre = document.querySelector(".sobre")
scrollSobre.onclick =()=>{
    smoothScroll(".AboutMe", 1000)
}
let scrollDesafio = document.querySelector(".desafio")
scrollDesafio.onclick =()=>{
    smoothScroll(".desafio-box", 1000)
}
