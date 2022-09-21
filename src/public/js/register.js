const form = document.getElementById('registerForm')

form?.addEventListener('submit', e => {
    e.preventDefault()
    let data = new FormData(form)
    let obj = {}
    data.forEach((value, key) => obj[key] = value);
    fetch('/signup', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res.status)
        if (res.status != 200) {
            window.location.href = '/registerfail'
        }
        if (res.status === 200) {
            window.location.href = '/login'
        }
    })
})