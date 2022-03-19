
const header_menu = document.querySelectorAll("#header .nav-menu")[0]
const header_nav = document.querySelectorAll("#header .nav-header")[0]

window.addEventListener('scroll', function() {
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        header_nav.classList.add('normal-nav-header')
        header_menu.classList.add('normal-menu')
    }else {
        header_nav.classList.remove('normal-nav-header')
        header_menu.classList.remove('normal-menu')
    }
})