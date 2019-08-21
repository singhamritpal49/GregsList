// console.log("hdfghjsd")
const itemsURL = "http://localhost:3000/items"
const ul = document.getElementById('list');


document.addEventListener("DOMContentLoaded", function () {
    fetch(itemsURL)
        .then(response => response.json())
        .then(renderItem)

    function renderItem(items) {
        items.forEach(function (item) {
            ul.innerHTML += `
        <li class="itemLi" data-id=${item.id}> ${item.name}</li>`
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
            <h3>Item Title: ${item.name} </h3>
            <h3>Description: ${item.description} </h3>
            <h3> 💰Price: $${item.price} </h3>
            <div> <img src="${item.image}" height="480" width="480" >   </div>
            <h3>Posted By: ${userData.name}</h3>
            `
                })
        }

    })

})
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
        .then(response => console.log(response))
    //.then(json => console.log(json))


})
