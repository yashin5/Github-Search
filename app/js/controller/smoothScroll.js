function smoothScroll(target){
    let targetAlvo = document.querySelector(target);
    if(targetAlvo){
        let elementBounding = targetAlvo.getBoundingClientRect();
        let scrollY = elementBounding.top+150
        if(elementBounding){
            window.scroll({
                top: scrollY - 200,
                behavior: 'smooth'
            })
        }
    }
}

let scrollSobre = document.querySelector(".sobre")
scrollSobre.onclick =()=>{
    smoothScroll(".AboutMe")
}
let scrollDesafio = document.querySelector(".desafio")
scrollDesafio.onclick =()=>{
    smoothScroll(".desafio-box")
}

let scrollHome = document.querySelector(".scrollTop")
scrollHome.onclick = () =>{
    smoothScroll(".home")
}