
const btn = document.querySelector('#submit')

btn.addEventListener('click', (event) => {

    // disable default action
    event.preventDefault()

    // configure a request
    const xhr = new XMLHttpRequest()
    xhr.open('POST', window.location.pathname.replace("poortl", ""))

    // set headers
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    const json = { 
        "tecst": document.querySelector('#en').value
    }
    // send request
    xhr.send(JSON.stringify(json))

    // listen for `load` event
    xhr.onload = () => {
        document.querySelector('#glish').value = xhr.responseText
    } 
});