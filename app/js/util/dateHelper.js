function dateHelper(data){
    let date = new Date(data);
        day = date.getDate();
        month = date.getMonth()+1;
        year = date.getFullYear();

    return `${day}/${month}/${year}`;
};