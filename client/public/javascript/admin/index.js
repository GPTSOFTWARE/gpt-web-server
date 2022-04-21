const btn_pluss = document.querySelectorAll(".btn-plus")
console.log(btn_pluss)
btn_pluss.forEach((btn_plus) => {
    btn_plus.addEventListener("click", () => {
        const target = document.querySelector(btn_plus.getAttribute("data-target"));
        target.innerHTML += `
        <div class="mb-3">
            <input class="form-control" name="${btn_plus.getAttribute("data-name")}">
        </div>
        `
    })
})