function requestUserBox (username){
    return fetch(`https://api.github.com/users/${username}`)
    .then(res => res.ok? res.json():false);
};

function requestRepo(username){
    return fetch(`https://api.github.com/users/${username}/repos`)
    .then(res =>res.ok? res.json():console.log(res.responseText))
    .catch(err =>{ throw new Error (err)});
};

