const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll(){
    const windowTop = window.pageYOffset + 500;
    target.forEach(function(element){
        if ((windowTop) > element.offsetTop){
            element.classList.add(animationClass);
        }
        console.log(element.offsetTop);
    })
}

window.addEventListener('scroll', function(){
    animeScroll();
})


