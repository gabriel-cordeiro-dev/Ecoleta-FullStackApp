//Confiurando a população do campo Estado e Cidades
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true


    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")


let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover uma classe
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id


    //verificar se existem itens selecionados, caso sim, pegar estes itens
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //será true ou false
        return item == itemId
    })

    //se já estiver selecionado
    if (alreadySelected >= 0) {
        //tirar da seleção
        const filtredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return false
        })

        selectedItems = filtredItems
    } else {
        //se não estiver selecionado
        //adicionar a seleção
        selectedItems.push(itemId)
    }


    //atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}