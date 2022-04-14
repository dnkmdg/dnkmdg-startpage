let modalVisible = false
const modal = createModal()
const dialog = document.querySelector('.dnk-dialog')

chrome.runtime.onMessage.addListener((request) => {
    if(request.type === 'go-to-bookmark'){
        console.log('SHOWING MODAL')
        toggleModal()
    }
 
    if(request.type === 'go-to-url'){
        toggleKeyboardMode(false)
        window.location = request.url
    } 

    if(request.type === 'close-dialog'){
        toggleKeyboardMode(false)
        closeModal()
    } 
})

const toggleKeyboardMode = (active) => {
    chrome.runtime.sendMessage({ 
        type: 'toggle-keyboard-mode',
        active
    })
}

function createModal(){
    let modal = document.createElement('div')

    modal.classList.add('dnk-dialog')
    modal.innerHTML = `<iframe id="popup-content" src="${chrome.extension.getURL('index.html#/mini')}"></iframe>`
    document.body.appendChild(modal)

    return modal
}

function closeModal(){
    toggleKeyboardMode(false)
    dialog.classList.remove('open')
    modalVisible = false
}

function showModal(){
    toggleKeyboardMode(true)
    dialog.classList.add('open')
        
    modalVisible = true
}

const toggleModal = () => {
    if(dialog && modalVisible){        
        return closeModal()
    } 

    return showModal()   
}