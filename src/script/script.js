const main = document.querySelector("main")

// RECEBE DADOS DO BANCO DE DADOS
    //--FAMILIAS---------------------------------------------------------------------------
async function obtainFam(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    res = await fetch("https://polar-crag-16613.herokuapp.com/familia", requestOptions)
        .then(response =>{
            return response.json()
        })
        .then(result =>{return result})
        .catch(error => console.log('error', error));

    console.log(res)
    return JSON.stringify(res);
}

//--PRODUTOS--------------------------------------------------------------------------------

async function obtainProd(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    res = await fetch("https://polar-crag-16613.herokuapp.com/produto", requestOptions)
        .then(response =>{
            return response.json()
        })
        .then(result =>{return result})
        .catch(error => console.log('error', error));

    console.log(res)
    return JSON.stringify(res);
}

 //-- UM PRODUTO
async function obtainOneProd(code){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    res = await fetch(`https://polar-crag-16613.herokuapp.com/produto/${code}`, requestOptions)
        .then(response =>{
            return response.json()
        })
        .then(result =>{return result})
        .catch(error => console.log('error', error));

    console.log(res)
    return JSON.stringify(res);
}

//--LISTA DE VARIAÇÕES---------------------------------------------------------------------

async function obtainVar(code){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    res = await fetch(`https://polar-crag-16613.herokuapp.com/variacoes/${code}`, requestOptions)
        .then(response =>{
            return response.json()
        })
        .then(result =>{return result})
        .catch(error => console.log('error', error));

    console.log(res)
    return JSON.stringify(res);
}

//--LISTA TODAS POSSIBILIDADES DE VARIACAO DE UM PRODUTO (PRODVAR)---------------------------------------------------------------------

async function obtainProdvar(code){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    res = await fetch(`https://polar-crag-16613.herokuapp.com/prodvar/${code}`, requestOptions)
        .then(response =>{
            return response.json()
        })
        .then(result =>{return result})
        .catch(error => console.log('error', error));

    console.log("prodvar:"+res)
    return JSON.stringify(res);
}

(async () => {
    //-- pega familia e converte em obj
    var familia = await obtainFam();
    console.log("Familia:" + familia)
    familia = await JSON.parse(familia)
    console.log(familia)
    console.log(typeof(familia))

    //-- pega fproduto e converte em obj
    var produto = await obtainProd();
    console.log("Produto:" + produto)
    produto = await JSON.parse(produto)
    console.log(produto)
    console.log(typeof(produto))

        for(i = 0; i < familia.length; i++){
            console.log(`familia index ${i}`)
            var qtprod = 0
            for(n in produto){if(familia[i].famcode == produto[n].procode.substring(0,3)){qtprod++}}
            main.innerHTML += 
            `<div class="familia">
                <span class="material-icons-outlined more" id="setta_${i}"onclick="expandHide('prodfam_${i}','setta_${i}')">expand_more</span><div><img src="${familia[i].famimage}" alt="foto${familia[i].famdesc}"></div><h1>FAMÍLIA ${familia[i].famdesc}</h1><p>${qtprod} PRODUTOS</p>
                </div>`;
            for(j=0;j<produto.length;j++){
                console.log(`produto index ${j}`)
                console.log(produto[j].procode)
                if(familia[i].famcode == produto[j].procode.substring(0,3)){
                    main.innerHTML += `<li id="codprod_${produto[j].procode}" class="prodfam_${i}" onclick=productPage("${produto[j].procode}")>
                        <h2>${produto[j].procode} | ${produto[j].prodesc}</h2>
                        <span>IP ${produto[j].proip}</span>
                        <span>
                            <img src="src/img/lighticons/${produto[j].inout}.png" alt="${produto[j].inout}">
                        </span>
                        <span>
                            <img src="src/img/lighticons/${produto[j].type}.png" alt="${produto[j].type}">
                        </span>
                        <span>
                            <img src="src/img/lighticons/${produto[j].install}.png" alt="${produto[j].install}">
                        </span>
                        <span>
                            <img src="src/img/lighticons/${produto[j].luz}.png" alt="${produto[j].luz}">
                        </span>
                </li>`
                }
            }
        }
    })();

   async function productPage(code){
        var modal = document.getElementById("modal")
        var oneproduto = await obtainOneProd(code);
        oneproduto = await JSON.parse(oneproduto)
        console.log(oneproduto)
        modal.innerHTML += 
        `<div id="produto">
            <div class="foto">
                <img src="${oneproduto[0].proimage}" alt="Foto">
            </div>
            <div class="codigo">
                <p>${oneproduto[0].procode}</p>
            </div>
            <div class="desc">
                <p>${oneproduto[0].prodesc}</p>
            </div>
            <div class="infos">
                <div class="geral">
                <span>
                    <img src="src/img/lighticons/${oneproduto[0].inout}.png" alt="${oneproduto[0].inout}">
                </span>
                <span>
                    <img src="src/img/lighticons/${oneproduto[0].type}.png" alt="${oneproduto[0].type}">
                </span>
                <span>
                    <img src="src/img/lighticons/${oneproduto[0].install}.png" alt="${oneproduto[0].install}">
                </span>
                <span>
                    <img src="src/img/lighticons/${oneproduto[0].luz}.png" alt="${oneproduto[0].luz}">
                </span>
                </div>
                <div class="contacab">
                    <p>Acabamentos:</p>
                </div>
            </div>
            <div class="obter" onclick="exportToExcel(${oneproduto[0].procode})">Obter Códigos! <span class="material-icons-outlined">file_download</span></div>
        </div>`
        oneproduto[0].branco == true? document.querySelector(".contacab").innerHTML += `<div class="branco"></div>`:modal.innerHTML +=``
        oneproduto[0].preto == true? document.querySelector(".contacab").innerHTML += `<div class="preto"></div>`:modal.innerHTML +=``
        oneproduto[0].grafite == true? document.querySelector(".contacab").innerHTML += `<div class="grafite"></div>`:modal.innerHTML +=``
        oneproduto[0].prata == true? document.querySelector(".contacab").innerHTML += `<div class="prata"></div>`:modal.innerHTML +=``
        oneproduto[0].marrom == true? document.querySelector(".contacab").innerHTML += `<div class="marrom"></div>`:modal.innerHTML +=``
        oneproduto[0].marromcort == true? document.querySelector(".contacab").innerHTML += `<div class="marromcort"></div>`:modal.innerHTML +=``
        oneproduto[0].bronzefosc == true? document.querySelector(".contacab").innerHTML += `<div class="bronzefosc"></div>`:modal.innerHTML +=``
        oneproduto[0].ourovelho == true? document.querySelector(".contacab").innerHTML += `<div class="ourovelho"></div>`:modal.innerHTML +=``
        oneproduto[0].dourado == true? document.querySelector(".contacab").innerHTML += `<div class="dourado"></div>`:modal.innerHTML +=``
        oneproduto[0].amarelo == true? document.querySelector(".contacab").innerHTML += `<div class="amarelo"></div>`:modal.innerHTML +=``
        oneproduto[0].vermelho == true? document.querySelector(".contacab").innerHTML += `<div class="vermelho"></div>`:modal.innerHTML +=``
        oneproduto[0].laranjaneon == true? document.querySelector(".contacab").innerHTML += `<div class="laranjaneon"></div>`:modal.innerHTML +=``
        oneproduto[0].salmao == true? document.querySelector(".contacab").innerHTML += `<div class="salmao"></div>`:modal.innerHTML +=``
        oneproduto[0].verdesalvia == true? document.querySelector(".contacab").innerHTML += `<div class="verdesalvia"></div>`:modal.innerHTML +=``
        oneproduto[0].verdesm == true? document.querySelector(".contacab").innerHTML += `<div class="verdesm"></div>`:modal.innerHTML +=``
        oneproduto[0].azul == true? document.querySelector(".contacab").innerHTML += `<div class="azul"></div>`:modal.innerHTML +=``
        oneproduto[0].roxo == true? document.querySelector(".contacab").innerHTML += `<div class="roxo"></div>`:modal.innerHTML +=``
        oneproduto[0].ameixa == true? document.querySelector(".contacab").innerHTML += `<div class="ameixa"></div>`:modal.innerHTML +=``
        oneproduto[0].natural == true? document.querySelector(".contacab").innerHTML += `<div class="natural"></div>`:modal.innerHTML +=``
        

        var onevaria = await obtainVar(code);
        onevaria = await JSON.parse(onevaria)
        console.log(onevaria)
        var tipos = []
        for (i in onevaria){ tipos.push(onevaria[i].vartipo) }
        var unitipos = [...new Set(tipos)];
        console.log(unitipos)

        modal.innerHTML +=`
        <div id="variacao">
        </div>
        <div class="busca">
            <div class="btnbusca" onclick="buscaProd()"><span>Buscar</span></div>
            <div class="codigobusca"><span>XXX.X</span></div>
            <div class="descbusca"><span>DESCRIÇÃO PRODUTO XXX</span></div>
            <div class="infobusca"><span>INFO</span></div>
            <div class="precobusca">R$ <span>0,00</span></div>
        </div>
        <div class="tabela">
            <table>
                <tbody>
                    <tr class="head"><th>Código</th><th>Descrição</th><th>Inform. adcional</th><th>Preço</th></tr>
                </tbody>
            </tabela>
        </div>` 
        for (i in unitipos){
                document.getElementById("variacao").innerHTML +=
                `<div onclick="expandOptions('${unitipos[i].replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')}')" class="listatop_${unitipos[i].replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')}">
                        <h3>${unitipos[i]}</h3><span class="material-icons-outlined">arrow_drop_down</span>
                        <div class="lista_${unitipos[i].replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')}">
                            <div class="options"></div>
                        </div>
                </div>`
        }

        for (i in unitipos){
            for (j in onevaria){
                console.log(onevaria[j].vartipo == unitipos[i])
                console.log(`${onevaria[j].vartipo} --- ${unitipos[i]} || ${typeof(onevaria[j].vartipo)} --  ${typeof(unitipos[i])}`)
                if(onevaria[j].vartipo == unitipos[i]){
                    var lista = document.querySelector(`.lista_${unitipos[i].replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')} > div`)
                    lista.innerHTML += `<p onclick="selecionaVar('${unitipos[i]}','${onevaria[j].vardesc.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')}')" class="opt_${onevaria[j].vardesc.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')}"><span>${onevaria[j].varcode} | </span>${onevaria[j].vardesc}</p>`
                }
            }        
        }

        var oneprodvar = await obtainProdvar(code);
        oneprodvar = await JSON.parse(oneprodvar)
        console.log(oneprodvar)
        console.log(typeof(prodvar))

        for (i=0; i<100;i++){
            document.querySelector(".tabela > table > tbody").innerHTML += 
            `<tr><td>${oneprodvar[i].prodvcode}</td><td>${oneprodvar[i].prodvdesc}</td><td>${oneprodvar[i].prodvinfo}</td><td>${oneprodvar[i].prodvpreco}</td></tr>`
        }

        expandModal();
    }

    async function buscaProd(){
        var codigo = document.querySelector(".codigo p").innerText
        codigo += '.'
        var node = document.querySelectorAll("#variacao h3")
        for (i=0; i<node.length;i++){
            codigo += node.item(i).innerText.substring(0,1)
        }
    console.log(codigo)
    var oneprodvar = await obtainProdvar(codigo);
        oneprodvar = await JSON.parse(oneprodvar)
        console.log(oneprodvar)
    document.querySelector(".codigobusca span").innerText = codigo
    document.querySelector(".descbusca span").innerText = oneprodvar[0].prodvdesc
    document.querySelector(".infobusca span").innerText = oneprodvar[0].prodvinfo
    document.querySelector(".precobusca span").innerText = oneprodvar[0].prodvpreco

    }

    async function exportToExcel(){
        //document.getElementById("load").style.visibility = "visible"
        codigo = document.querySelector(".codigo p").innerText
        var oneprodvar = await obtainProdvar(codigo);
            oneprodvar = await JSON.parse(oneprodvar)
            console.log(oneprodvar)
            document.querySelector(".tabela > table > tbody").innerHTML =
            `
            <table>
                <tbody>
                    <tr class="head"><th>Código</th><th>Descrição</th><th>Inform. adcional</th><th>Preço</th></tr>
                </tbody>
            </tabela>`
            for (i=0; i<oneprodvar.length;i++){
                console.log("teste" + oneprodvar[i])
                document.querySelector(".tabela > table > tbody").innerHTML += 
                `<tr><td>${oneprodvar[i].prodvcode}</td><td>${oneprodvar[i].prodvdesc}</td><td>${oneprodvar[i].prodvinfo}</td>R$<td>${oneprodvar[i].prodvpreco}</td></tr>`
            }
            downloadTable()

     }

     function downloadTable(){
        var table2excel = new Table2Excel();
        table2excel.export(document.querySelector("table"))
     }