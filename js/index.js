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

function createGameCard({ id, image, price, platform, descrition }) {
  return `
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">An item</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
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
