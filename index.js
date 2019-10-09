// console.log("hdfghjsd")
const itemsURL = "http://localhost:3000/items"
const ul = document.getElementById('list');
// fetch(`http://localhost:3000/users`)

document.addEventListener("DOMContentLoaded", function () {
    fetch(itemsURL)
        .then(response => response.json())
        .then(renderItem)

    function renderItem(items) {
        items.forEach(function (item) {
            ul.innerHTML += `
        <li id="item-${item.id}" class="itemLi " data-id=${item.id}>${item.name}</li>`
        })
    }
    ul.addEventListener('click', () => {
        // console.log(event.target)
        // console.log(event.target)
        const oneItem = `http://localhost:3000/items/${event.target.dataset.id}`
        if (event.target.classList.contains('itemLi')) {
            fetch(oneItem)
                .then(res => res.json())
                .then(showItem)
        }

        function showItem(item) {
            const user = `http://localhost:3000/users/${item.user_id}`
            fetch(user)
                .then(res => res.json())
                .then(function (userData) {
                    // console.log(userData)
                    const showDiv = document.getElementById("showItem")
                    showDiv.innerHTML =
                        `
                    <h4> Title: ${item.name} </h4>
                    <h6>Description: ${item.description} </h6>
                    <h6> Price: $${item.price} </h6>
                    <div> <img src="${item.image}" height="300" width="300" >   </div>
                    <p>Posted By: ${userData.name}</p>
                    <button type="button" onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-black buttonfx curtaindown" id="updateButton">Update</button>
                    <button type="button" id="deleteButton" class="w3-button w3-black buttonfx curtaindown">Delete</button> 

                    `
                })
                ///////////////DELETE///////////////
                .then(function () {
                    //////////////delete on the database//////////////
                    const deleteButton = document.getElementById('deleteButton')
                    deleteButton.addEventListener('click', () => {
                        fetch(`http://localhost:3000/items/${item.id}`, {
                            method: 'DELETE'
                        })
                            ////////////delete on the page////////////
                            .then(res => res.json())
                            .then(function (item) {
                                const theLi = document.getElementById(`item-${item.id}`)
                                // console.log(theLi)
                                theLi.remove()
                                const showDiv = document.getElementById("showItem")
                                showDiv.innerHTML = ""

                            })
                    })

                })
                ///////////UPDATE//////////////////
                .then(function () {

                    const updateListForm = document.querySelector('.update-list-form')
                    // console.log(updateListForm)
                    updateListForm.addEventListener('submit', () => {
                        event.preventDefault()
                        fetch(`http://localhost:3000/items/${item.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: `${event.target.name.value}`,
                                description: `${event.target.description.value}`,
                                price: `${event.target.price.value}`,
                                image: `${event.target.image.value}`,
                                category: `${event.target.category.value}`,
                                user_id: 1
                            })
                        })
                            .then(res => res.json())
                            .then(function (x) {
                                console.log(x)
                                const showDiv = document.getElementById("showItem")
                                showDiv.innerHTML =
                                    `
                                        <h3>Item Title: ${x.name} </h3>
                                        <h3>Description: ${x.description} </h3>
                                        <h3> 💰Price: $${x.price} </h3>
                                        <div> <img src="${x.image}" height="300" width="300" > </div>
                                        <h3>Posted By: ${x.user.name}</h3>
                                        <button type="button" onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-black" id="updateButton">Update</button>
                                        <button type="button" id="deleteButton">Delete</button>
                                        `
                                const updateLi = document.getElementById(`item-${x.id}`)
                                console.log(updateLi)

                                updateLi.innerText = `${x.name}`
                            })

                    })
                })
        }
    })
})
/////////////ADD///////////////
const addListForm = document.querySelector('.add-list-form')
// console.log(addListForm)
addListForm.addEventListener('submit', () => {
    event.preventDefault()
    // console.log(event.target)
    fetch("http://localhost:3000/items", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${event.target.name.value}`,
            description: `${event.target.description.value}`,
            price: `${event.target.price.value}`,
            image: `${event.target.image.value}`,
            category: `${event.target.category.value}`,
            user_id: 1
        })
    })
        .then(res => res.json())
        .then(function (item) {
            console.log(item)
            ul.innerHTML +=
                `
            <li id="item-${item.id}" class="itemLi" data-id=${item.id}>${item.name}</li>
            `

        })
    //.then(json => console.log(json))
    addListForm.reset()

})
