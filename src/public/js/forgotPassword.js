FormData.addEventListener('submit', e =>{
    const data = new FormData (form)
    const obj = {}

    data.forEach((value, key) => (obj[key] = value))

    const url =  'api/auth/forgotPassword'
    const headers = {
        'Content-Type': 'application/json'
    }
    const method = 'PATCH'
    const body = JSON.stringyfy(obj)

    fetch(url, {
        headers,
        method,
        body,
    })
    .then(response => response.json())
    .then(data => alert(data.status))
    .catch(error => console.log(error))
})