//Faz determinada função ser executada apenas depois do tempo desejado, apenas 1 vez
function debounce(delay, fn) {
    let timer = 0;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    };
  };