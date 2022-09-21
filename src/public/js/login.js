const form = document.getElementById('loginForm')

form?.addEventListener('submit', e => {
    e.preventDefault()
    let data = new FormData(form)
    let obj = {}
    data.forEach((value, key) => obj[key] = value);
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            window.location.href = '/'
        }
        if (res.status != 200) {
            window.location.href = '/loginfail'
        }
    })
})


