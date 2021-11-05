
//CONTROLA EXPANSÃO DOS PRODUTOS
function expandHide(nomeid,span){
    if(document.querySelector(`.${nomeid}`).style.visibility == "hidden" || document.querySelector(`.${nomeid}`).style.visibility == "" ){
        var list = document.querySelectorAll(`.${nomeid}`)
        document.querySelector(`#${span}`).style.transform = "rotate(-90deg)";
        for(i in list){
            list.item(i).style.visibility = "visible"
            list.item(i).style.opacity = 1
            list.item(i).style.height = "auto";
            list.item(i).style.padding = "10px";

        }
    }else{
        var list = document.querySelectorAll(`.${nomeid}`)
        document.querySelector(`#${span}`).style.transform = "rotate(0deg)";
        for(i in list){
            list.item(i).style.visibility = "hidden"
            list.item(i).style.height = 0
            list.item(i).style.opacity = 0
            list.item(i).style.padding = "0px";
        }
    }
}

//-- EXIBE MODAL 
function expandModal(){
    document.getElementById("modal").style.visibility = "visible"
    document.getElementById("modal").style.opacity = 1
}

function closeModal(){
    document.getElementById("modal").style.visibility = "hidden"
    document.getElementById("modal").style.transition = "opacity 0.6s ease-out"
    document.getElementById("modal").style.opacity = 0
    document.getElementById("modal").innerHTML = `<div id="closemodal" onclick="closeModal()">
    <span class="material-icons-outlined">close</span>
</div>`

}

function expandOptions(varia){
    var options = document.querySelector(`#variacao .lista_${varia}`)
    if(options.style.visibility == "hidden"||options.style.visibility == ""){
        options.style.visibility = "visible"
    }else{
        options.style.visibility = "hidden"
    }
    
}

function selecionaVar(varia,desc){
    var option = document.querySelector(`#variacao .listatop_${varia} h3`)

    option.innerText = document.querySelector(`#variacao .lista_${varia} .opt_${desc}`).innerText
}

