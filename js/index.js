const requestURL = "../json/games.json";

async function fetchGamesJson() {
  try {
    const response = await fetch(requestURL);
    if (!response.ok) {
      throw new Error(`Error en la peticion al JSON ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los juegos de la API : ", error);
    return null;
  }
}

function createGameCard({ id, name, image, price, platform, description }) {
  return `
        <div class="card" style="width: 35rem;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${id} - ${name}</h5>
                <p class="card-text">${description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${price} €</li>
                <li class="list-group-item">${platform}</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Buy</a>
                <a href="#" class="card-link">Wishlist</a>
            </div>
        </div>
    `;
}

async function displayGames() {
  const gameSection = document.getElementById("gameSection");
  const gameData = await fetchGamesJson();

  if (gameData && gameData.games) {
    const gameCards = gameData.games.map(createGameCard).join("");
    gameSection.innerHTML = gameCards;
  } else {
    gameSection.innerHTML = `<p>No se ha podido cargar el JSON de los videojuegos</p>`;
  }
}

displayGames();
