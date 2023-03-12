const content = document.querySelector("#content");
const preview = document.querySelector("#preview");
const send = document.querySelector(".button");
const avatar = document.querySelector("#avatar");
const name = document.querySelector(".name");
const time = document.querySelector("#time");
const modal = document.querySelector(".modal-wrapper");
const webhook_url = document.querySelector(".modal > input");
const modal_button = document.querySelector(".modal > button");

let URI, d;
const urlRegex = /(https?:\/\/[^\s]+)/g;
let avatarUrl = "2a5d5179-ef27-4923-a265-524dc546f9a2.jpeg";


function modal_open() {
  modal.style.display = 'flex';
  modal.style.opacity = '1'
}
function modal_close() {
  modal.style.opacity = '0'
  modal.style.display = 'none';
}

modal_button.onclick = async  () => {
  if(!(urlRegex.test(webhook_url.value))) {
    alert('Please enter a valid webhook url')
    return
  }
  URI = new URL(webhook_url.value)
  const ff = await fetch(URI);
  if (await ff.status == 200) {
    const json = await ff.json();
    avatar.src = `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.png`;
    name.textContent = json.name;
    modal_close();
    localStorage.whUrl = URI
  } else {
    avatar.src = avatarUrl;
    name.textContent = 'Anon';
    alert('Please enter a valid webhook url')
  }
}

const setup = async()=>{
  if(localStorage.whUrl) {
    URI = new URL(localStorage.whUrl)
    const ff = await fetch(URI);
    if (await ff.status == 200) {
      const json = await ff.json();
      avatar.src = `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.png`;
      name.textContent = json.name;
      modal_close();
    } else {
      localStorage.whUrl = null;
      alert ('Error Occurred, Please enter URL again');
      modal_open();
    }
  } else {
    avatar.src = avatarUrl;
    name.textContent = 'Anon';
    setTime();
    modal_open();
  }
}

function ap(dd) {
  let output = String(dd.getHours() % 12);
  output += ':'
  if (dd.getMinutes() < 10) {
    output += "0" + dd.getMinutes();
  } else {
    output += dd.getMinutes()
  }
  output += ' '
  if(dd.getHours() < 12) {
    output += 'AM'
  } else {
    output += 'PM'
  }
  return output;
}
function setTime() {
  d = new Date();
  time.textContent = `Today at ${ap(d)}`;
}


function urlify(text) {
  return text.replace(urlRegex, function(ur) {
    return '<a href="' + ur + '">' + ur + '</a>';
  })
}

content.oninput = (e) => {
  preview.innerHTML = urlify(e.target.value);
  if(e.target.value) {
    send.disabled = false;
  } else {
    send.disabled = true;
  }
  setTime()
};

const request = new XMLHttpRequest();

request.onload = ()=>{
  send.ariaBusy = false;
  alert("Message sent");
  preview.innerHTML = "";
  content.value = "";
}
request.onerror = ()=>{
  send.ariaBusy = false;
  alert("Error Occurred")
  preview.innerHTML = "Error Occurred";
}

send.onclick = () => {
  request.open("POST", URI);

  request.setRequestHeader('Content-type', 'application/json');

  const params = {
    content: content.value
  }
  request.send(JSON.stringify(params));
  send.ariaBusy = true;
}