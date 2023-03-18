const urlApi1 = "https://dummyjson.com/posts";
const urlApi2 = "https://dummyjson.com/products";
const urlApi3 = "https://dummyjson.com/todos";

function promiseAPI(urlAPI, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(urlAPI)
        .then(response => response.json())
        .then(data => {
          resolve(data.posts);
        })
        .catch(error => {
          reject(error);
        });
    }, delay);
  });
}

function promiseAPI2(urlAPI, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(urlAPI)
        .then(response => response.json())
        .then(data => {
          console.log(data.products[0].title);
          resolve(data.products);
        })
        .catch(error => {
          reject(error);
        });
    }, delay);
  });
}

function promiseAPI3(urlAPI, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(urlAPI)
        .then(response => response.json())
        .then(data => {
          console.log(data.todos);
          resolve(data.todos);
        })
        .catch(error => {
          reject(error);
        });
    }, delay);
  });
}

function fetchApiData() {
  const tableBody = document.querySelector("#data-table tbody");
  const api1Promise = promiseAPI(urlApi1, 1000);
  const api2Promise = api1Promise.then(() => promiseAPI2(urlApi2, 2000));
  const api3Promise = api2Promise.then(() => promiseAPI3(urlApi3, 3000));


  api1Promise
    .then(api1Data => {
      api1Data.forEach(item => {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.innerText = item.title;
        row.appendChild(cell);
        tableBody.appendChild(row);
      });

      return true;
    })
    .then(api1Resolved => {
      if (api1Resolved) {
        return api2Promise;
      }
    })
    .then(api2Data => {
      api2Data.forEach(item => {
        const row = document.querySelector(`#data-table tbody tr:nth-child(${item.id})`);
        const cell = document.createElement("td");
        cell.innerText = item.title;
        row.appendChild(cell);
      });

      return true;
    })
    .then(api2Resolved => {
      if (api2Resolved) {
        return api3Promise;
      }
    })
    .then(api3Data => {
      api3Data.forEach(item => {
        const row = document.querySelector(`#data-table tbody tr:nth-child(${item.id})`);
        const cell = document.createElement("td");
        cell.innerText = item.completed;
        row.appendChild(cell);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

const fetchBtn = document.querySelector("#fetchBtn");
fetchBtn.addEventListener("click", fetchApiData);
