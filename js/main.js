const URL = 'https://randomuser.me/api/?results=18';
let users = [];

const button = document.querySelector('#btn');
const container = document.querySelector('#container');

const GENERATOR_BUTTON_TEXT = `
<i class="fas fa-sync-alt"></i>
  Generar nuevos
`;

const BACK_BUTTON_TEXT = `
<i class="fas fa-arrow-left"></i>
  Regresar
`;

const drawContainer = () => {
  button.innerHTML = GENERATOR_BUTTON_TEXT;
  container.innerHTML = '';

  fetch(URL)
    .then((response) => response.json())
    .then(({ results }) => {
      results.forEach((user) => {
        const { name, picture, login } = user;
        users = [...users, user];

        const div = document.createElement('div');
        div.className = '';

        div.innerHTML = `
          <a href="javascript:void(0)" class="container-user">
            <figure class="container-user__image">
              <img src=${picture.large} alt='Photo user'/>
            </figure>
            <span class="container-user--overlay" uuid="${login.uuid}">
              <p>
                <span class="container-user--first" uuid="${login.uuid}">${name.first}</span>
                <span class="container-user--last" uuid="${login.uuid}">${name.last}</span>
              </p>
            </span>
          </a>
        `;

        div.addEventListener('click', userDetail);
        container.appendChild(div);
      });
    })
    .catch((err) => {
      console.error(err);
      drawContainer();
    });
};

document.addEventListener('DOMContentLoaded', (event) => drawContainer());

const userDetail = (event) => {
  container.style.display = 'none';
  button.innerHTML = BACK_BUTTON_TEXT;
  const uuid = event.target.getAttribute('uuid');
  const user = getUser(uuid);
  const detailContainer = document.querySelector('#detail');
  const div = document.createElement('div');
  div.className = 'frame';
  div.innerHTML = `
    <div class="detail-container">
      <img src=${user.picture.large} class="detail-container__image"/>
      <div class="detail-container__description">
        <span><span class="attribute">Nombre:</span> ${user.name.first} ${user.name.last} </span>
        <span><span class="attribute">Email:</span> ${user.email}</span>
        <span><span class="attribute">Dirección:</span> ${user.location.city},  ${user.location.street.number} ${user.location.street.name}</span>
        <span><span class="attribute">Número télefonico:</span> ${user.phone}</span>
        <span><span class="attribute">Número celular:</span> ${user.cell}</span>
      </div>
    </div>
  `;
  detailContainer.appendChild(div);
};

const getUser = (uuid) => {
  const index = users.findIndex((u) => u.login.uuid === uuid);
  return users[index];
};

button.addEventListener('click', () => {
  document.querySelector('#detail').innerHTML = '';
  container.style.display = 'grid';
  users = [];
  drawContainer();
});
