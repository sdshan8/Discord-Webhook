const URI = new URL("https://discord.com/api/webhooks/1053546550632124457/U3pkRv6RH0isL_qZUADHWaP__eVPETdNHX81xoxWNPqKP4oSnLXCphinJbwiugswyZEd");

const content = document.querySelector("#content");
const preview = document.querySelector("#preview");
const send = document.querySelector(".button");
const avatar = document.querySelector("#avatar");
const name = document.querySelector(".name");
const time = document.querySelector("#time");

async function gg() {
  setTime()
  const ff = await fetch(URI);
  if (await ff.status == 200) {
  const json = await ff.json();
  avatar.src = `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.png`;
  name.textContent = json.name;
  } else {
    avatar.src = 'https://api.dicebear.com/5.x/thumbs/svg';
    name.textContent = 'Anon';
    alert('Please enter the correct webhook url')
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
let d = new Date();
function setTime() {
  time.textContent = `Today at ${ap(d)}`;
  d = new Date();
}


function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
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