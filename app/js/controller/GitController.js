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
        if(this.inputSearch.value){
            this.classHTMLFoto.innerHTML='<div class="lds-dual-ring"></div>';
            this.classHTMLTabela.innerHTML='<div class="lds-dual-ring"></div>';
        }else{
            false
        }
        requestUserBox(this.inputSearch.value)    
        .then(user =>{
            this.classHTMLFoto.innerHTML= this.renderUserBoxFoto(user) ;
            this.classHTMLTabela.innerHTML= this.renderUserBoxDados(user);
        }).catch(() =>{
            this.classHTMLFoto.innerHTML= "";
            this.classHTMLTabela.innerHTML= "";
                throw new Error("Erro na requisição");
            });  

    };

    renderizaRepo(){
        this.load(this.classHTMLRepos, 
            requestRepo(this.inputSearch.value)
            .then(dadosRepo =>{           
                this.classHTMLRepos.innerHTML=this.renderRepoContent(dadosRepo);
            })
        );
    };

    renderizaFavoritos(){ 
        this.load(this.classHTMLRepos,
            requestRepo(this.inputSearch.value)
            .then(res =>{            
                this.classHTMLRepos.innerHTML= this.renderFavoritosContent(res);
            })
        );
        
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
        return this.renderUserBoxDadosComportamento("Repositórios", usuario.public_repos)+
               this.renderUserBoxDadosComportamento("Seguidores", usuario.following)+
               this.renderUserBoxDadosComportamento("Seguindo", usuario.followers);
                
                
    };

    renderUserBoxDadosComportamento(campo, dadoDoUsuario){
        if(dadoDoUsuario){
            return  `<h2>${campo} - ${dadoDoUsuario}</h2>`
        }else{
            if(dadoDoUsuario == null){
                return `<h2>${campo} - Usuário não existe</h2>`
            }else{
                return `<h2>${campo} - ${dadoDoUsuario}</h2>`
            };
        };
    };

    renderRepo(repositorio){
        return repositorio.map(res =>{return `
            <tr>
            <td>${res.name}</td><td>${dateHelper(res.updated_at)}</td>
            </tr>
            `}).join("");

    };

    renderRepoContent(repositorio){
        if(this.renderRepo(repositorio)){
        return `      <thead>
                    <tr>
                    <th>Repositório</th>
                    <th>Última atualização</th>
                    </tr>
                </thead>
                <tbody>
                
                    ${this.renderRepo(repositorio)
                    }                
                </tbody>`
        }else{
        return `<div class="msg-erro">
                    <img  src="./img/msg-erro.png"/>
                    <h2 >Esse usuário não possui repositórios :(
                    </div>`;
                };
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
        if(this.renderFavoritos(repositorio)){
            return `
                    <thead>
                        <tr>
                        <th>Repositório</th>
                        <th>Número de estrelas</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    ${this.renderFavoritos(repositorio)
                    }
                    </tbody>`
        }
        else{
            return `<div class="msg-erro">
                        <img  src="./img/msg-erro.png"/>
                        <h2 >Esse usuário não possui repositórios com estrelas :(
                    </div>`
        };
    };

    renderFavoritosFilter(repositorio){
        return repositorio.filter(res =>{
            if(res.stargazers_count>0){return res}

            else{
                return false
        };

    }).sort((a,b) => b.stargazers_count-a.stargazers_count);
    };

    load(classInnerHTML, fn){
        if(this.inputSearch.value){
            this.classHTMLRepos.innerHTML='<div class="lds-dual-ring"></div>';
        }else{
            false;
        }
        fn.catch(() =>{
                classInnerHTML.innerHTML= "";
                throw new Error("Erro na requisição")
            });           
    }

};

const gitcontroller = new GitController();