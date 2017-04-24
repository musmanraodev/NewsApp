let todo = document.getElementById('todo');
let descriptionbox = document.querySelector('.descriptionbox');
let newarticle = {};
let alreadyfirst = true;

fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
  .then(function (response) {
    response.json()
      .then(function (json) {
        json.forEach(function (value) {
          gettingeach(value);
        });
      })
  })

function gettingeach(value) {
  fetch(`https://hacker-news.firebaseio.com/v0/item/${value}.json`)
    .then(function (response) {
      response.json()
        .then(function (json) {
          todo.innerHTML += `<li class='item' onclick='showdetails(this.id)' id='${json.id}'>${json.title}</li>`;
          newarticle[json.id] = `<div class='title'><h2>${json.title}</h2></div><div class='author'><h3>Added By: "${json.by}"</h3></div><div class='score'><h3>Score: ${json.score}</h3></div><div class='link'><a href='${json.url}' target='_blank'>Click Here To Read This Article</a></div>`;
          alreadyfirst && showdetails(json.id);
        })
    })
}

function showdetails(value) {
  descriptionbox.innerHTML = newarticle[value];
  alreadyfirst = false;
}

