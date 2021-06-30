const usersTable = document.querySelector('.usersTable')
const userModal = document.querySelector('.userInfo--modal')
const userInfoContainer = document.querySelector('.userInfoContainer')
const closeBtn = document.querySelector('.closeBtn')

function getUserData(user) {

    // Have to nest function to prevent it running on page load
    return async function () {
        // Get user data
        let usersData = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
            .then(response => response.json())
        console.log(usersData)

        // Clears modal
        userInfoContainer.innerHTML = ''

        // Opens info modal
        userModal.classList.remove('inactive')

        usersData.forEach(post => {
            // Create postContainer
            let postContainer = document.createElement("div")
            postContainer.classList.add("postContainer")

            // Create email tag
            let emailTag = document.createElement("p")
            emailTag.classList.add("postInfo")
            let emailInfo = `<span class="heading">Email:</span> ${user.email}`
            emailTag.innerHTML = emailInfo

            // Create name tag
            let nameTag = document.createElement("p")
            nameTag.classList.add("postInfo")
            let nameInfo = `<span class="heading">Title:</span> ${post.title}`
            nameTag.innerHTML = nameInfo

            // Create body tag
            let bodyTag = document.createElement("p")
            bodyTag.classList.add("postInfo")
            let bodyInfo = `<span class="heading">Post:</span> ${post.body}`
            bodyTag.innerHTML = bodyInfo

            // Appending elements
            postContainer.appendChild(emailTag)
            postContainer.appendChild(nameTag)
            postContainer.appendChild(bodyTag)

            userInfoContainer.appendChild(postContainer)

        })


    }

}


function close() {
    userModal.classList.add('inactive')
}

closeBtn.addEventListener('click', close)

async function getUsers() {
    try {

        let res = await fetch('https://jsonplaceholder.typicode.com/users')
        return await res.json()

    } catch (error) {

        console.log(error)

    }
}

async function displayUsers() {
    let allUsers = await getUsers()
    allUsers.forEach(user => {
        // Create newUser row
        let newUser = document.createElement("tr")
        newUser.classList.add("tableData")

        // Create the Full Name cell
        let userFullName = document.createElement('td')
        userFullName.innerText = user.name

        // Create the Username cell
        let username = document.createElement('td')
        username.innerText = user.username

        // Create the Email cell
        let email = document.createElement('td')
        email.innerText = user.email

        // Appending the cells to the table row
        newUser.appendChild(userFullName)
        newUser.appendChild(username)
        newUser.appendChild(email)

        newUser.addEventListener('click', getUserData(user))

        usersTable.appendChild(newUser)
    })

}



displayUsers()


