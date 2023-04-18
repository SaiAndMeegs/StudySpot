// The point of this for now will be to just write some basic methods I anticipate I'll need.

colors = ['red', 'orange', 'green'];

/**
 * Create a building element
 * @param {object} building - a building object
 * @param {int} availability - the availability in the building: 0 = low, 1 = medium, 2 = high
 * @param {string} imageURL - the URL of an image of the building
 */
function makeBuilding(building, availability, imageURL) {
    let cards = document.getElementsByClassName('cards')[0];
    let elem = document.createElement('a');
    elem.className = `building ${colors[availability]}`;
    avails = ['Low', 'Medium', 'High']
    let content = `${avails[availability]} availability right now.`;
    
    elem.href = '/rooms/' + building.building_id + "/" + building.building_name;
    elem.innerHTML = `<h2 class="searchable">${building.building_name}</h2>
    <p>${content}</p>`;
    elem.style.backgroundImage = `url('${building.image_url}')`
    elem.onclick = () => {localStorage.setItem('building_id', building.building_id)}

    cards.appendChild(elem);
}

/**
 * Create a time block element
 * @param {int} start - start time of the block in minutes from 6:00AM.
 * @param {int} length - length of the block in minutes.
 * @param {string|int} day - day of the block, either a string or an integer, where 0=Monday, 1=Tuesday...
 * @param {int} availability - the availability during the block.
 * @param {string} description - the description of the block.
 */
function makeTimeBlock(start, length, day, availability, description) {
    if(typeof day === 'string') {
        days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        day = days.indexOf(day.toLowerCase());
    }
    day = document.getElementsByClassName('day')[day];

    let timeStringStart = (((Math.floor(start / 60) + 5) % 12) + 1) + ':' + (start % 60).toString().padStart(2, '0');
    let timeStringEnd = (((Math.floor((start + length) / 60) + 5) % 12) + 1) + ':' + ((start + length) % 60).toString().padStart(2, '0');
    let timeString = timeStringStart + ' - ' + timeStringEnd;
    let id = genRandomId();
    let elem = document.createElement('label');
    elem.htmlFor = id;
    elem.className = `block ${colors[availability]}`;
    elem.style.top = start + 'px';
    elem.style.height = length + 'px';
    elem.innerHTML = description + '<br>' + timeString;
    // elem.innerHTML = `<div class='desc'>${description}</div>`;

    let activator = document.createElement('input');
    activator.id = id;
    activator.className = 'activate';
    activator.type = 'text';
    // day.appendChild(activator); 
    day.appendChild(elem);
}

/**
 * Create a room element
 * @param {string} name - room name
 * @param {int} availability - the current availability in the room.
 * @todo In the future, may want to change to show time of next class.
 * @todo Perhaps put 5 dots on the right that fill up based on the availability.
 */
function makeRoom(building_room, availability) {
    let rooms = document.getElementsByClassName('rooms')[0];
    let elem = document.createElement('a');
    elem.className = 'result';

    avails = ['Low', 'Medium', 'High']
    let content = `${avails[availability]} availability right now.`;
    elem.innerHTML = `<div class="dot ${colors[availability]}"></div>
    <p class="searchable">${building_room.building_room_name}</p>
    <p>${content}</p>`;
    elem.href = '../../calendar/' + building_room.building_room_id;
    elem.onclick = () => localStorage.setItem('building_room_id', building_room.building_room_id)
    rooms.appendChild(elem);
}

function getTopImage(search) {
    let url = 'http://localhost:5001/building_image/' + search
    
    return fetch(url)
    .then((res) => res.json())
    .then((data) => {
        return data['images_results'][0]['thumbnail'];
    })
}

function getBuildingImage(school, building) {
    return getTopImage(school + ' ' + building);
}

function genRandomId(digits) {
    let p = digits ? Math.pow(10, p) : 10000;
    let id = Math.floor(Math.random() * p);
    while(document.getElementById('id-' + id)) {
        id = Math.floor(Math.random() * p);
    }
    return 'id-' + id;
}

function search(string, elements) {
    string = string.toLowerCase();
    if(typeof elements !== 'array') elements = Array.from(elements);
    return elements.filter(element => {
        let match = element.getElementsByClassName('searchable')[0].innerHTML.toLowerCase();
        return match.indexOf(string) === 0;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let spot = document.getElementsByClassName('logo')[0];
    console.log(spot);
    setTimeout(() => {spot.style.bottom = '-6px'}, 400);

})