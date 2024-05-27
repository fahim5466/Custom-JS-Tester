document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();

    const { value } = document.querySelector('input');
    const h3 = document.querySelector('h3');

    if(value.includes('@')){
        h3.innerHTML = 'Looks good!';
    }else{
        h3.innerHTML = 'Invalid email!';
    }
})