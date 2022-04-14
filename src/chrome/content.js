let modalVisible = false
const modal = createModal()
const dialog = document.querySelector('.dnk-dialog')

chrome.runtime.onMessage.addListener((request) => {
    if(request.type === 'go-to-bookmark'){
        toggleModal()
    }
 
    if(request.type === 'go-to-url'){
        toggleKeyboardMode(false)

        if(window.location.href === request.url){
            closeModal()
        } else {
            window.location = request.url
        }
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
    modal.innerHTML = `<iframe id="dnk-popup-content" src="${chrome.extension.getURL('index.html#/mini')}"></iframe>`
    document.body.appendChild(modal)

    return modal
}

function closeModal(){
    console.log('CLOSING MODAL')
    toggleKeyboardMode(false)
    dialog.classList.remove('open')
    modalVisible = false
}

function showModal(){
    console.log('SHOWING MODAL')

    const iframe = document.querySelector('#dnk-popup-content')

    toggleKeyboardMode(true)
    dialog.classList.add('open')
    iframe.contentWindow.focus()
        
    modalVisible = true
}

const toggleModal = () => {
    if(dialog && modalVisible){        
        return closeModal()
    } 

    return showModal()   
}