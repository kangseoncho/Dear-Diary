//test function to see if i can access the value in the input field
function test() {
    console.log(document.getElementById('existingUser').value)
}

function verification() {
    axios.post('http://localhost:3000/verification', {
        user: document.getElementById('existingUser').value,
        password: document.getElementById('existingPassword').value
    }).then((res) => {
       console.log("i am axios request verification: ", res)
    })
}

function signup() {
    axios.post('http://localhost:3000/newuser', {
        user: document.getElementById('newUser').value,
        password: document.getElementById('newPassword').value
    }).then((res) => {
        console.log("i am axios request signup: ", res)
    })
}