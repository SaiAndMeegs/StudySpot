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

    let elem = document.createElement('div');
    elem.className = `block ${colors[availability]}`;
    elem.style.top = start + 'px';
    elem.style.height = length + 'px';
    elem.innerHTML = description === null ? timeString :  description + '<br>' + timeString;

    let blocks = day.getElementsByClassName('block');
    for(let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        let t = start;
        let h = length;
        let bt = parseFloat(block.style.top);
        let bh = parseFloat(block.style.height);
        
        if((t <= bt && t + h > bt) || (t < bt + bh && t + h >= bt + bh)) {
            let wrapper;
            if(block.parentNode.className === 'block-bundle') {
                wrapper = block.parentNode;
                Array.from(wrapper.children).forEach(e => {
                    e.style.maxWidth = `calc(100% - ${(wrapper.children.length) * 10}px)`;
                    e.classList.remove('closed');
                    e.classList.add('closed');
                })
                wrapper.appendChild(elem);
            } else {
                wrapper = document.createElement('div');
                wrapper.className = 'block-bundle';
                wrap(block, wrapper);
                block.dataset.transform = 0;
                block.style.maxWidth = `calc(100% - ${(wrapper.children.length) * 10}px)`;
                block.classList.add('closed');
                wrapper.appendChild(elem);
                wrapper.addEventListener('mouseover', (e) => {
                    let hov = e.target;
                    for(let j = 0; j < wrapper.children.length; j++) {
                        let elem = wrapper.children[j];
                        elem.classList.remove('closed');
                        elem.style.transform = `translateX(${elem.dataset.transform}px)`
                        if(elem !== hov) {
                            elem.classList.add('closed');
                        }
                        if(parseInt(elem.dataset.transform) > parseInt(hov.dataset.transform)) {
                            let shift = `calc(${document.getElementsByClassName('day')[0].getBoundingClientRect().width}px - ${((wrapper.children.length) * 10) - parseInt(elem.dataset.transform)}px)`;
                            console.log(shift);
                            console.log(((wrapper.children.length - 1) * 10) + parseInt(elem.dataset.transform));
                            elem.style.transform = 'translateX(' + shift + ')';
                        }
                    }
                })
                // wrapper.addEventListener('mouseout', () => {
                //     for(let i = 0; i < wrapper.children.length; i++) {
                //         let elem = wrapper.children[i];
                //         elem.classList.remove('closed');
                //         if(i !== wrapper.children.length - 1) elem.classList.add('closed');
                //         elem.style.transform = `translateX(${elem.dataset.transform}px)`
                        
                //     }
                // })
            }
            elem.style.maxWidth = `calc(100% - ${(wrapper.children.length - 1) * 10}px)`;
            elem.style.transform = `translateX(${(wrapper.children.length - 1) * 10}px)`;
            elem.dataset.transform = (wrapper.children.length - 1) * 10;
            break;
        }
    }

    if(!elem.parentNode) {
        day.appendChild(elem);
    }
}

function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
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
    let content = availability == 0 ? `Class in session.` : `${avails[availability]} availability right now.`;
    let name = building_room.building_room_name;
    let lsi = name.lastIndexOf(' ');
    name = '<span class="mobile-invisible" style="margin-right: 0.25em">' + name.slice(0, lsi) + "</span>" + name.slice(lsi);
    elem.innerHTML = `<div class="dot ${colors[availability]}"></div>
    <p class="searchable">${name}</p>
    <p>${content}</p>`;
    elem.href = '../../calendar/' + building_room.building_room_id + "/" + building_room.building_room_name;
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

function makePopup(string) {
    let oldP = document.getElementsByClassName('popup')
    if(oldP.length) {
        oldP[0].remove();
    }
    let popup = document.createElement('div');
    popup.className = 'popup';
    let loc = document.getElementsByTagName('nav')[0].getBoundingClientRect()
    let top = loc.height + 20;
    popup.innerHTML = string + '<i class="fa fa-close popup-close"></i>';
    document.body.appendChild(popup);
    popup.style.top = top + 'px';
    popup.addEventListener('click', () => {
        popup.remove();
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let spot = document.getElementsByClassName('logo')[0];
    console.log(spot);
    setTimeout(() => {spot.style.transform = 'translateY(15%)'}, 400);

})
