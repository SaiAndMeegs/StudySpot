// The point of this for now will be to just write some basic methods I anticipate I'll need.

colors = ['red', 'orange', 'green', 'light-red'];
const bookingLimit = 2;

function getStar(favorite) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <svg id="Layer_2" class="star ${favorite ? 'favorite' : ''}" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.79 11.95">
    <defs>
    </defs>
    <g id="Layer_3" data-name="Layer 3">
        <g>
        <path class="cls-1" d="M9.3,10.95c-.13,0-.24-.03-.35-.08l-1.91-.95c-.19-.1-.41-.15-.64-.15s-.45,.05-.65,.15l-1.91,.95c-.11,.06-.23,.08-.35,.08-.1,0-.2-.02-.29-.06-.1-.04-.18-.1-.25-.17-.07-.07-.13-.15-.17-.25-.04-.09-.06-.18-.06-.29l.02-.15,.33-1.85c.02-.08,.03-.17,.03-.26,0-.2-.04-.4-.13-.59-.08-.18-.2-.34-.34-.47l-1.37-1.26c-.08-.07-.14-.16-.18-.25-.04-.1-.07-.2-.07-.3,0-.1,.02-.19,.05-.28,.03-.09,.08-.17,.14-.24,.06-.07,.13-.12,.21-.17,.08-.05,.17-.07,.27-.09l1.99-.27c.24-.03,.46-.11,.65-.25,.18-.13,.33-.3,.44-.51l.95-1.81c.07-.13,.16-.23,.29-.31,.12-.07,.26-.11,.41-.11s.28,.04,.41,.11c.12,.07,.22,.17,.29,.31l.95,1.81c.1,.2,.25,.38,.44,.51,.19,.14,.41,.22,.64,.25l1.99,.27c.1,.01,.19,.04,.27,.09,.08,.05,.15,.1,.21,.17,.06,.07,.11,.15,.14,.24,.03,.09,.05,.18,.05,.28,0,.11-.02,.21-.07,.3-.04,.1-.1,.18-.18,.25l-1.37,1.26c-.15,.14-.27,.3-.35,.48-.08,.18-.12,.38-.12,.57,0,.09,0,.18,.03,.27l.33,1.84,.02,.15c0,.11-.02,.2-.06,.29-.04,.1-.1,.18-.17,.25-.07,.07-.16,.13-.25,.17-.09,.04-.19,.06-.29,.06Z"/>
        <path class="cls-2" d="M6.39,1.5c.06,0,.1,.01,.15,.04,.03,.02,.07,.05,.1,.11l.95,1.8c.14,.28,.34,.51,.6,.69,.26,.19,.55,.3,.86,.34l1.99,.27s.08,.02,.1,.03c.03,.02,.05,.04,.07,.06,.02,.02,.04,.05,.05,.09,.01,.03,.02,.06,.02,.1,0,.04,0,.07-.02,.1-.02,.04-.03,.06-.06,.09l-1.37,1.26c-.2,.18-.36,.4-.47,.65-.11,.25-.16,.51-.16,.77,0,.12,.01,.24,.03,.35l.33,1.85v.05s0,0,0,0c0,.04,0,.07-.01,.08-.02,.04-.04,.07-.07,.1-.03,.03-.06,.05-.1,.07-.03,.01-.06,.02-.09,.02-.05,0-.09,0-.13-.03l-1.91-.95c-.26-.13-.56-.2-.87-.2s-.6,.07-.87,.2l-1.91,.95s-.08,.03-.13,.03c-.04,0-.06,0-.09-.02-.04-.02-.07-.04-.1-.07-.03-.03-.05-.06-.07-.1,0-.02-.01-.04-.01-.08v-.06s.34-1.83,.34-1.83c.02-.12,.04-.25,.04-.37,0-.28-.06-.54-.17-.8-.11-.24-.26-.45-.46-.63l-1.37-1.26s-.05-.05-.06-.09c-.02-.03-.02-.06-.02-.1,0-.04,0-.07,.02-.1,.01-.04,.03-.06,.05-.09,.02-.02,.04-.04,.07-.06,.03-.02,.06-.03,.1-.03l1.98-.27c.33-.04,.63-.16,.89-.35,.24-.18,.44-.41,.58-.68l.95-1.81c.04-.07,.07-.09,.1-.11,.05-.03,.09-.04,.15-.04m0-1c-.24,0-.46,.06-.67,.18s-.36,.29-.47,.5l-.95,1.81c-.07,.14-.17,.25-.29,.34s-.26,.14-.42,.16l-2,.28c-.16,.02-.31,.07-.44,.15s-.25,.17-.35,.28-.17,.24-.23,.39-.08,.3-.08,.46c0,.18,.04,.34,.11,.51s.17,.3,.3,.42l1.37,1.26c.1,.09,.17,.19,.23,.31s.08,.25,.08,.38c0,.05,0,.11-.02,.17l-.33,1.85s-.01,.08-.02,.12,0,.08,0,.12c0,.18,.03,.34,.1,.49s.16,.29,.28,.4,.25,.21,.41,.27,.32,.1,.49,.1c.2,0,.39-.04,.57-.13l1.91-.95c.12-.06,.27-.09,.42-.09s.3,.03,.42,.09l1.91,.95c.18,.09,.37,.13,.57,.13,.17,0,.33-.03,.49-.1s.29-.16,.41-.27,.21-.25,.28-.4,.1-.32,.1-.49c0-.04,0-.08,0-.12s0-.08-.02-.12l-.33-1.85c-.01-.06-.02-.12-.02-.17,0-.13,.03-.25,.08-.38s.13-.23,.23-.32l1.37-1.26c.13-.12,.23-.26,.3-.42s.11-.33,.11-.51c0-.16-.03-.31-.08-.46s-.13-.27-.23-.39-.21-.21-.35-.28-.28-.12-.44-.15l-2-.28c-.15-.02-.29-.07-.42-.16s-.22-.2-.29-.34l-.95-1.81c-.11-.21-.27-.38-.47-.5s-.42-.18-.67-.18h0Z"/>
        </g>
    </g>
    </svg>`

}

/**
 * Create a building element
 * @param {object} building - a building object
 * @param {int} availability - the availability in the building: 0 = low, 1 = medium, 2 = high
 * @param {string} imageURL - the URL of an image of the building
 */
function makeBuilding(building, availability, favorite) {
    let cards = document.getElementsByClassName('cards')[0];
    let elem = document.createElement('a');
    elem.className = `building ${colors[availability]}`;
    avails = ['Low', 'Medium', 'High']
    //let content = building.num_rooms_available/building.num_rooms_total >= 0.5 ? 'High availability right now.' : (building.num_rooms_available >= 2 ? `Medium availability right now.` : (building.num_rooms_available > 0 ? `Low availability right now.` : `No availability right now.`))
    let content = building.num_rooms_available === 1 ? `${building.num_rooms_available} room available right now.` : `${building.num_rooms_available} rooms available right now.`

    elem.href = '/rooms/' + building.building_id + "/" + building.building_name;
    elem.innerHTML = `<h2 class="searchable">${building.building_name}</h2>
    <p>${content}</p>
    ${getStar(favorite)}`;
    elem.style.backgroundImage = `url('/images/${building.building_id}-min.jpeg')`
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
    elem.innerHTML = description === null ? timeString :  `<strong>${description}</strong><br>${timeString}`;

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
                    if(!hov.classList.contains('block')) hov = hov.parentNode;
                    for(let j = 0; j < wrapper.children.length; j++) {
                        let elem = wrapper.children[j];
                        elem.classList.remove('closed');
                        elem.style.transform = `translateX(${elem.dataset.transform}px)`
                        if(elem !== hov) {
                            elem.classList.add('closed');
                        }
                        if(parseInt(elem.dataset.transform) > parseInt(hov.dataset.transform)) {
                            let shift = `calc(${document.getElementsByClassName('day')[0].getBoundingClientRect().width}px - ${((wrapper.children.length) * 10) - parseInt(elem.dataset.transform)}px)`;
                            //console.log(shift);
                            //console.log(((wrapper.children.length - 1) * 10) + parseInt(elem.dataset.transform));
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

function makeBooking(booking) {
    let parent = document.getElementsByClassName('bookings')[0];
    
    let url = '/building_rooms/building_room_id/' + booking.building_room_id;
    fetch(url).then(response => response.json()).then(room => {
        room = room[0];
        console.log(room);
        let elem = document.createElement('a');
        elem.className = 'booking';
        elem.innerHTML = `<div>${room.building_room_name}</div>
        <div>${booking.date.split('T')[0]}</div>
        <div>${booking.start_time} - ${booking.end_time}</div>`
        elem.href = '../calendar/' + room.building_room_id + "/" + room.building_room_name;
        parent.appendChild(elem);
        
        // if(checkOverflow(parent)) {
        console.log(parent.style.gridRow);
        let gR = Math.ceil((parent.getElementsByClassName('booking').length + 1) / 2) + 1;
        // let gR = parseInt(parent.style.gridRow.split('/')[1]) + 1;
        parent.style.gridRow = '1 / ' + gR;
        // } 
    })
}

// function checkOverflow(el) {
//    var curOverflow = el.style.overflow;

//    if ( !curOverflow || curOverflow === "visible" )
//       el.style.overflow = "hidden";

//    var isOverflowing = el.clientWidth < el.scrollWidth 
//       || el.clientHeight < el.scrollHeight;

//    el.style.overflow = curOverflow;

//    return isOverflowing;
// }

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

    if(building_room.curr_time_until_next_event !== null){
        let curr_time_until_next_event = new Date();
        let temp_curr_time_until_next_event = building_room.curr_time_until_next_event.split(':');
        curr_time_until_next_event.setHours(temp_curr_time_until_next_event[0], temp_curr_time_until_next_event[1], temp_curr_time_until_next_event[2], 0)

        console.log(temp_curr_time_until_next_event[0])

        let content = availability == 0 ? `Class in session.` : (parseInt(temp_curr_time_until_next_event[0]) === 0 && parseInt(temp_curr_time_until_next_event[1]) < 59 ? `Around ${parseInt(temp_curr_time_until_next_event[1])} minutes until next class.` : `${avails[availability]} availability right now.`);
        let name = building_room.building_room_name;
        let lsi = name.lastIndexOf(' ');
        name = '<span class="mobile-invisible" style="margin-right: 0.25em">' + name.slice(0, lsi) + "</span>" + name.slice(lsi);
        elem.innerHTML = parseInt(temp_curr_time_until_next_event[0]) === 0 && parseInt(temp_curr_time_until_next_event[1]) < 30 && availability !== 0 ? 
        //prob change this to light red
        `<div class="dot ${colors[3]}"></div>
        <p class="searchable">${name}</p>
        <p>${content}</p>`

        : `<div class="dot ${colors[availability]}"></div>
        <p class="searchable">${name}</p>
        <p>${content}</p>`;
    }
    else{
        let content = availability == 0 ? `Class in session.` : `${avails[availability]} availability right now.`;
        let name = building_room.building_room_name;
        let lsi = name.lastIndexOf(' ');
        name = '<span class="mobile-invisible" style="margin-right: 0.25em">' + name.slice(0, lsi) + "</span>" + name.slice(lsi);
        elem.innerHTML = 
        `<div class="dot ${colors[availability]}"></div>
        <p class="searchable">${name}</p>
        <p>${content}</p>`

    }

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

function makePopup(string, preventableID) {
    if(!preventableID || !parseCookie(document.cookie)[preventableID]) {
        let oldP = document.getElementsByClassName('popup');
        if(oldP.length) {
            oldP[0].remove();
        }
        let popup = document.createElement('div');
        popup.className = 'popup';
        let loc = document.getElementsByTagName('nav')[0].getBoundingClientRect()
        let top = loc.height + 20;
        popup.innerHTML = string;
        if(preventableID) {
            let prevent = document.createElement('span');
            prevent.classList.add('prevent');
            prevent.innerHTML = "Don't show this again.";
            prevent.addEventListener('click', (e) => {
                e.preventDefault();
                document.cookie = preventableID + '=true';
                popup.remove();
            })
            popup.innerHTML += ' ';
            popup.appendChild(prevent);
        }
        let close = document.createElement('i');
        close.className = "fa fa-close popup-close";
        popup.appendChild(close);
        document.body.appendChild(popup);
        popup.style.top = top + 'px';
        close.addEventListener('click', () => {
            popup.remove();
        })
    }
}

function parseCookie(str) {
    if(!str) return str;
    return str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
    }, {});
}

document.addEventListener('DOMContentLoaded', () => {
    let spot = document.getElementsByClassName('logo')[0];
    //console.log(spot);
    setTimeout(() => {spot.style.transform = 'translateY(15%)'}, 400);
})