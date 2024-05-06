const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');

const cities = ['New York', 'London', 'Paris', 'Rome'];
const flights = [
  ['New York', 'London', 7],
  ['New York', 'Paris', 9],
  ['London', 'Paris', 3],
  ['Paris', 'Rome', 5]
];

const cityCoords = {
  'New York': { x: 100, y: 100 },
  'London': { x: 300, y: 50 },
  'Paris': { x: 500, y: 100 },
  'Rome': { x: 400, y: 250 }
};

// Draw cities and flights
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw cities
  cities.forEach(city => {
    ctx.beginPath();
    ctx.arc(cityCoords[city].x, cityCoords[city].y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();

    ctx.font = '12px Arial';
    ctx.fillText(city, cityCoords[city].x - 15, cityCoords[city].y - 15);
  });

  // Draw flights
  flights.forEach(flight => {
    const [source, destination, cost] = flight;
    const sourceCoords = cityCoords[source];
    const destCoords = cityCoords[destination];

    ctx.beginPath();
    ctx.moveTo(sourceCoords.x, sourceCoords.y);
    ctx.lineTo(destCoords.x, destCoords.y);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.font = '10px Arial';
    const midX = (sourceCoords.x + destCoords.x) / 2;
    const midY = (sourceCoords.y + destCoords.y) / 2;
    ctx.fillText(cost, midX, midY);
  });
}

// Display adjacency matrix in square form with city names
function displayAdjacencyMatrix() {
  let adjacencyMatrix = '<table border="1"><tr><td></td>';
  cities.forEach(city => {
    adjacencyMatrix += `<td>${city}</td>`;
  });
  adjacencyMatrix += '</tr>';
  cities.forEach((source, i) => {
    adjacencyMatrix += `<tr><td>${source}</td>`;
    cities.forEach((destination, j) => {
      const flight = flights.find(([src, dest]) => src === source && dest === destination);
      adjacencyMatrix += `<td>${flight ? flight[2] : '0'}</td>`;
    });
    adjacencyMatrix += '</tr>';
  });
  adjacencyMatrix += '</table>';
  output.innerHTML = adjacencyMatrix;
}

// Display adjacency list
function displayAdjacencyList() {
  let adjacencyList = '';
  cities.forEach(city => {
    adjacencyList += city + ': ';
    const neighbors = flights.filter(([source]) => source === city);
    neighbors.forEach(([source, destination, cost], i) => {
      adjacencyList += destination + ' (' + cost + ')';
      if (i < neighbors.length - 1) adjacencyList += ', ';
    });
    adjacencyList += '<br>';
  });
  output.innerHTML = adjacencyList;
}

// Check connection between cities
function checkConnection() {
  const source = prompt('Enter source city:');
  const destination = prompt('Enter destination city:');
  const isConnected = flights.some(([src, dest]) => (src === source && dest === destination) || (src === destination && dest === source));
  output.textContent = `Is ${source} connected to ${destination}? ${isConnected ? 'Yes' : 'No'}`;
}

draw();
