let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const addToyForm = document.querySelector('.add-toy-form')
const cardContainer = document.querySelector('#toy-collection')
let toyArray =[]
let btn = document.createElement('btn')






function getToys(){
  fetch('http://localhost:3000/toys/')
  .then(resp => resp.json())
  .then(toys => {
    toyArray = toys.map(toy => {
      renderToys(toy)
      // console.log(toy)
    })
  })
}

function addNewToy(toyName){
  fetch('http://localhost:3000/toys/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'},
    body: JSON.stringify(toyName)
  })

}

function newLike(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(toy.name)
  })
}


addToyForm.addEventListener('submit', event => {
  
 event.preventDefault()
//  console.log(event)
 newToy(event)
})

function newToy(event){
  
  let toyURL = event.target[1].value
  let toyName ={
     name:event.target[0].value,
     image:event.target[1].value,
     likes: 0
  }
  let newCard = document.createElement('div')
  newCard.classList.add('card')
  newCard.innerHTML = `
  <h2>${toyName.name}</h2>
  <img src="${toyURL}" class="toy-avatar">`
  cardContainer.appendChild(newCard)
  addNewToy(toyName)
}

function likePatch(toyLikes){
  toyLikes++
  newLike(toyLikes)
}

function btnClick (btn){
  // console.log(btn)
  btn.addEventListener('click', e => {
    console.log(e)

  })
}

  function renderToys(toy){
  let toyName = toy.name
  let toyURL = toy.image
  let toyId = toy.id
  let toyLikes = toy.likes
  let newCard = document.createElement('div')
  newCard.classList.add('card')
  newCard.innerHTML = `
  <h2>${toyName}</h2>
  <img src="${toyURL}" class="toy-avatar">
  <p>${toyLikes} Likes </p>
  <button class ="like-btn" id=${toyId}>Like <3</button>`
  cardContainer.appendChild(newCard)
  let btnsObj = document.getElementById(`${toyId}`)
  console.log(btnsObj)
  // let btnsArray = [...btnsObj]
  // btnsArray.forEach(btn => btnClick(btn))
  btnsObj.addEventListener('click', toyLikes => likePatch(toyLikes))
  }

  getToys()
  
  // let btnsObj = document.querySelectorAll('.like-btn')
  // let btnsArray = [...btnsObj]
  // btnsArray.forEach(btn => btnClick(btn))