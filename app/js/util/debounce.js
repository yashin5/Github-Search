function debounce(delay, fn) {
    let timer = 0;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    };
  };