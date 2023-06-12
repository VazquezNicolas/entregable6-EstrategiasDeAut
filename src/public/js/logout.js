let miboton = document.getElementById('logOut')

miboton.addEventListener('click', e => {
    const url = '/api/auth/logout'
    const method = 'GET'
    fetch(url, {
        method,
    })
    .then(response => Swal.fire({
        title: 'Deslogueado!',
        text: 'Usuario Deslogueado',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
    )
    .then(data => console.log(data))
    .catch(error => console.log(error))
})