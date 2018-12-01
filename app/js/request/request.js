//Realiza reuiqição a api do github e busca todos os dados de usuário
function requestUserBox (username){
    return fetch(`https://api.github.com/users/${username}`)
    .then(res => res.ok? res.json():false);
};

//Realiza reuiqição a api do github e busca todos os dados dos repositórios do usuário
function requestRepo(username){
    return fetch(`https://api.github.com/users/${username}/repos`)
    .then(res =>res.ok? res.json():console.log(res.responseText))
    .catch(err =>{ throw new Error (err)});
};

