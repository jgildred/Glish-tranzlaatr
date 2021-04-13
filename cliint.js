
const btn = document.querySelector('#submit')

//document.querySelector('#en').value = "Glish is a modern language based on English, but without the unnecessary complexity of English."

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
    document.querySelector('#glish').value = "pleez waat..."

    xhr.error = () => {
        document.querySelector('#glish').value = "sumthing went rong. trii sumthing els."
    }

    // listen for `load` event
    xhr.onload = () => {
        document.querySelector('#glish').value = xhr.responseText
    } 
})