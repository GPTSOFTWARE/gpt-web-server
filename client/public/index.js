const explore_more = document.getElementById('explore-more');
const home_menu = document.querySelectorAll('.home-menu')[0];
const menu_item = document.querySelectorAll('.menu-item')
const menu_item_a = document.querySelectorAll('.menu-item a')

document.addEventListener("click", (event) => {
    if (explore_more.contains(event.target)) {
        home_menu.classList.add('home-menu-active')
        explore_more.classList.add('explore-more-hidden')
        menu_item.forEach((item) => {
            item.classList.remove('menu-item-noactive')
            item.classList.add('menu-item-active')
        })
        menu_item_a.forEach((item) => {
            item.classList.remove('content-hidden')
            item.classList.add('content-block')
        })
    } else {
        home_menu.classList.remove('home-menu-active')
        explore_more.classList.remove('explore-more-hidden')
        menu_item.forEach((item) => {
            item.classList.add('menu-item-noactive')
            item.classList.remove('menu-item-active')
        })
        menu_item_a.forEach((item) => {
            item.classList.add('content-hidden')
            item.classList.remove('content-block')
        })
    }
});