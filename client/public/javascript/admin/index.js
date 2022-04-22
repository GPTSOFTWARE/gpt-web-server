const btn_pluss = document.querySelectorAll(".btn-plus")
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

const btn_delete = document.querySelectorAll(".delete-project")
btn_delete.forEach((btn) => {
    btn.addEventListener("click", () => {
        fetch(btn.getAttribute("data-path"), {
            method: "DELETE",
        }).then((res) => {
            console.log(res.url)
            window.location.href = `/admin${btn.getAttribute("data-redirect")}`
            if(res.body) {
                alert("Project is deleted")
            }else {
                alert("Delete project is failed")
            }
        })
    })
})

function preview() {
    frame.src = URL.createObjectURL(event.target.files[0]);
}
function clearImage() {
    document.getElementById('formFile').value = null;
    frame.src = "";
}