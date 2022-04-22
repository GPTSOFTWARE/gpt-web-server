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

var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight + 248 || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

var image = document.getElementById('home-count-up');
var count_ele = document.querySelectorAll('#home-count-up .count-value')
let flag = 0;
!!image && window.addEventListener('scroll', function (event) {
	if (flag === 0 && isInViewport(image)) {
		count_ele.forEach(ele => {
            const updateCunter = () => {
                const target = +ele.getAttribute('data-value')
                const c = +ele.innerText
    
                if(c < target) {
                    ele.innerText = `+${Math.floor(c + target / 100)}`
                    setTimeout(updateCunter, 1)
                }
            }
            updateCunter()
        })
        flag = 1;
	}
}, false);

const responsive_btn = document.getElementById("menu-responsive-btn")
const menu = document.querySelectorAll(".nav-menu .menu-list")[0];

responsive_btn.addEventListener("click", () => {
    menu.classList.toggle("nav-menu-display")
})