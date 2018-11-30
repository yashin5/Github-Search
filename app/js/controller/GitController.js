class GitController{
    constructor(){
        this.classHTMLTabela = document.querySelector(".desafio-box__content__list");
        this.classHTMLFoto= document.querySelector(".desafio-box__content");
        this.classHTMLRepos= document.querySelector(".tabela-repositorios");
        this.btn1= document.querySelector(".btn1");
        this.btn2= document.querySelector(".btn2");
        this.renderizaUserBox=debounce(1000,this.renderizaUserBox.bind(this));
        this.inputSearch = document.querySelector(".inputSearch");
        this.renderiza();
    };   

    //Une as chamadas de função/eventListeners para então ser chamado no constructor
    renderiza(){            
        this.inputSearch.oninput= event =>{
        event.preventDefault();
        this.renderizaUserBox();
        this.classHTMLRepos.innerHTML="";
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

    //Renderiza as informações do usuário digitado
    renderizaUserBox(){

        //Adiciona efeito de loading
        if(this.inputSearch.value){
            this.classHTMLFoto.innerHTML='<div class="lds-dual-ring"></div>';
            this.classHTMLTabela.innerHTML='<div class="lds-dual-ring"></div>';
        }else{
            return false
        }

        //Realiza o request
        //Passa dados para função que monta a view
        //Trata o erro caso o usuário não exista
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

    //Renderiza tabela com repositórios
    renderizaRepo(){

        //Adiciona efeito de loading
        //Trata o erro caso o usuário  não exista
        this.load(this.classHTMLRepos, 

            //Realiza requisição
            //Passa dados para função que monta a view
            requestRepo(this.inputSearch.value)
            .then(dadosRepo =>{           
                this.classHTMLRepos.innerHTML=this.renderRepoContent(dadosRepo);
            })
        );
    };

    //Renderiza tabela com favoritos
    renderizaFavoritos(){ 

        //Adiciona efeito de loading
        //Trata o erro caso o usuário  não exista
        this.load(this.classHTMLRepos,
            //Realiza requisição
            //Passa dados para função que monta  a view
            //Trata o erro caso o usuário  não exista
            requestRepo(this.inputSearch.value)
            .then(res =>{            
                this.classHTMLRepos.innerHTML= this.renderFavoritosContent(res);
            })
        );
        
    };

    //Passa os dados para uma função que monta a view do box de dados do usuário
    renderUserBoxDados(usuario){
        return this.renderUserBoxDadosComportamento("Repositórios", usuario.public_repos)+
               this.renderUserBoxDadosComportamento("Seguidores", usuario.following)+
               this.renderUserBoxDadosComportamento("Seguindo", usuario.followers);
                
                
    };

    //Monta a view com a imagem do usuário
    //Trata caso não consiga encontrar o usuário
    renderUserBoxFoto(usuario){
        return usuario.avatar_url? 
                    `<img alt="Imagem de usuário" src=${usuario.avatar_url}/>`
                        :                
                    `<div class="msg-erro-usernf">
                        <img  alt="usuario nao encontrado"src="./img/msg-erro-usernf.png"/>
                        <h2>Não conseguimos encontrar esse usuário :( </h2>
                    </div>`;
    };

    //Monta a view com os dados do usuário
    //Trata quando ele não existe
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

    //Monta a view da primeira parte da tabela de repositórios
    //Chama uma função que monta a segunda parte
    //Trata quando o usuário não possui repositórios
    renderRepoContent(repositorio){
        if(this.renderRepo(repositorio)){
        return ` <thead>
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
   
    //Monta a view da segunda parte da tabela de repositórios 
    //Utiliza uma função para montar a data
    renderRepo(repositorio){
        return repositorio.map(res =>{
            return `
            <tr>
                <td>${res.name}</td><td>${dateHelper(res.updated_at)}</td>
            </tr>
            `}).join("");

    };


    //Monta a view da primeira parte da tabela de favoritos
    //Chama uma função que monta a segunda parte
    //Trata quando o usuário não possui favoritos
    renderFavoritosContent(repositorio){
        if(this.renderFavoritos(repositorio)){
            return `<h2>${this.teste()}}</h2>
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

    //Filta as estrelas de cada repositório
    //Monta na ordem do maior pro menor
    renderFavoritosFilter(repositorio){
        return repositorio.filter(res =>{
            if(res.stargazers_count>0){return res}

            else{
                return false
        };
        }).sort((a,b) => b.stargazers_count-a.stargazers_count);

    };

    //Monta a view da segunda parte da tabela de favoritos
    renderFavoritos(repositorio){
        return this.renderFavoritosFilter(repositorio)
            
            .map(res => {return `
                <tr>
                <td>${res.name}</td><td>${res.stargazers_count}</td>
                </tr>
                `}).join("");
    };

    teste(){
        return requestUserBox(this.inputSearch.value).then(username => { return `${username.login}`})
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
    };

};

const gitcontroller = new GitController();