// console.log("js has been loaded!");

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn = document.getElementById('closeBtn');
const contentDiv = document.getElementById('content');

// "event name", callback function
menuBtn.addEventListener('click', () => {
  // console.log("clicked!")
  mobileMenu.classList.add('active');
}); // end of menuBtn click

closeBtn.addEventListener('click', () => {
  // console.log("clicked!")
  mobileMenu.classList.remove('active');
}); // end of menuBtn click

function renderProperties(properties) {
  properties.forEach((room) => {
    // create elements
    const roomArticle = document.createElement('article');
    roomArticle.classList.add('room');

    const roomNameElement = document.createElement('h3');
    roomNameElement.classList.add('room--name');
    roomNameElement.textContent = room.name;

    const roomDescriptionElement = document.createElement('p');
    roomDescriptionElement.classList.add('room--description');
    roomDescriptionElement.textContent = room.description;

    const roomPriceElement = document.createElement('p');
    roomPriceElement.textContent = `Price: ${room.price}`;

    const roomGuestsElement = document.createElement('p');
    roomGuestsElement.textContent = `Guests: ${room.guests}`;

    roomArticle.appendChild(roomNameElement);
    roomArticle.appendChild(roomDescriptionElement);
    roomArticle.appendChild(roomPriceElement);
    roomArticle.appendChild(roomGuestsElement);

    document.body.appendChild(roomArticle);
  }); // end of forEach
} // end of renderProperties

const displayCategory = (category, properties) => {
  // console.log({ category });
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('category');

  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = category.label.plural;

  sectionElement.appendChild(sectionTitle);

  // console.log(category.label.singular);
  // filter properties
  const filteredProperties = properties.filter(
    (property) =>
      // return true or false
      category.label.singular === property.type
  );

  filteredProperties.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  // console.log({filteredProperties});
  filteredProperties.forEach((property) => {
    const articleElement = document.createElement('article');
    articleElement.classList.add('property');

    const propertyTitle = document.createElement('h3');
    propertyTitle.classList.add('property--title');

    const propertyHtml = `
      <h3 class="property--title">${property.name}</h3>
      <p class="property--description">${property.description}</p>
      <p class="property--price">${property.price}</p>
    `;

    articleElement.innerHTML = propertyHtml;

    sectionElement.appendChild(articleElement);
  }); // end of forEach()

  // loop & append properties

  contentDiv.appendChild(sectionElement);
}; // end of displayCategory

Promise.all([
  // fetch 1
  fetch('js/properties.json').then((response) => response.json()),
  // fetch 2
  fetch('js/categories.json').then((response) => response.json()),
])
  .then(([properties, categories]) => {
    // console.log({ properties });
    // console.log({ categories });
    categories.forEach((category) => {
      displayCategory(category, properties);
    });
  })
  .catch((error) => {
    console.error('There was a problem fetching the data:', error);
  });
