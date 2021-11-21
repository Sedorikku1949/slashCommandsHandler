var options = {
  animationOutSelf: 'scaleup 0.5s',
  animationOutClose: 'scaledown 0.30s',
  delayFunction: function(i){return i+4}
};

var notifications = new Notifications(".notification", options);
notifications.init();

var Notifs = function(text, type, behavior){
  if (typeof text !== 'string' || text.length < 1) return null
  const el = document.createElement('p');
  el.classList.add('notification');
  let innerHTML = text
  switch(type){
    case "success": { el.classList.add('is-success'); break; };
    case "error": { el.classList.add('is-danger'); break; };
    case "warning": { el.classList.add('is-warning'); break; };
    default: el.classList.add('is-primary');
  }
  if (behavior === 'yes') el.setAttribute('data-close', 'self');
  else innerHTML += '<button class="delete will-close" type="button">Close</button>'
  el.innerHTML = innerHTML
  document.getElementById("notif-container").appendChild(el)
}