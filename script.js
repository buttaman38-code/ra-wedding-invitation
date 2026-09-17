const openBtn=document.getElementById("openBtn"), envelope=document.getElementById("envelope"), main=document.getElementById("main"), opening=document.getElementById("opening");
openBtn.onclick=()=>{envelope.classList.add("open");setTimeout(()=>{opening.style.display="none";main.classList.remove("hidden");window.scrollTo(0,0);},900);};

const petals=document.getElementById("petals");
setInterval(()=>{if(document.hidden)return;const p=document.createElement("div");p.className="petal";p.textContent=["✿","❀","♡","✦"][Math.floor(Math.random()*4)];p.style.left=Math.random()*100+"vw";p.style.animationDuration=(5+Math.random()*7)+"s";p.style.opacity=.25+Math.random()*.5;petals.appendChild(p);setTimeout(()=>p.remove(),13000)},650);

const target=new Date("2026-11-09T18:00:00+05:00");
function tick(){let d=Math.max(0,target-new Date()),s=Math.floor(d/1000);let vals=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];document.querySelectorAll("#timer strong").forEach((e,i)=>e.textContent=String(vals[i]).padStart(2,"0"))}
setInterval(tick,1000);tick();

const canvas=document.getElementById("scratch"),ctx=canvas.getContext("2d");let drawing=false;
function resize(){const r=canvas.getBoundingClientRect();canvas.width=r.width*devicePixelRatio;canvas.height=r.height*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);ctx.fillStyle="#a96c56";ctx.fillRect(0,0,r.width,r.height);ctx.fillStyle="#d9ad88";ctx.font="600 18px 'Cormorant Garamond'";ctx.textAlign="center";ctx.fillText("✦  OUR FOREVER BEGINS  ✦",r.width/2,r.height/2-8);ctx.font="13px 'Cormorant Garamond'";ctx.fillText("Scratch to reveal",r.width/2,r.height/2+22)}
resize();window.addEventListener("resize",resize);
function scratch(e){if(!drawing)return;const r=canvas.getBoundingClientRect(),x=(e.touches?e.touches[0].clientX:e.clientX)-r.left,y=(e.touches?e.touches[0].clientY:e.clientY)-r.top;ctx.globalCompositeOperation="destination-out";ctx.beginPath();ctx.arc(x,y,24,0,Math.PI*2);ctx.fill()}
canvas.onpointerdown=()=>drawing=true;canvas.onpointerup=()=>drawing=false;canvas.onpointermove=scratch;canvas.ontouchstart=e=>{drawing=true;scratch(e)};canvas.ontouchmove=e=>{e.preventDefault();scratch(e)};

function addCalendar(){const start="20261109T130000Z",end="20261109T170000Z";const url=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rabya%20%26%20Adnan%20Wedding%20—%20Mehndi&dates=${start}/${end}&location=Gujranwala%2C%20Pakistan&details=Wedding%20celebration%20of%20Rabya%20%26%20Adnan`;window.open(url,"_blank")}
document.getElementById("calendarBtn").onclick=addCalendar;document.getElementById("calendarBtn2").onclick=addCalendar;

document.getElementById("rsvpBtn").onclick=()=>{const n=document.getElementById("rsvpName").value.trim();document.getElementById("rsvpSuccess").textContent=n?"Thank you, "+n+"! Your RSVP has been recorded on this device.":"Please enter your name."};
document.getElementById("wishBtn").onclick=()=>{const n=document.getElementById("wishName").value.trim(),m=document.getElementById("wishMessage").value.trim();document.getElementById("wishSuccess").textContent=(n&&m)?"Thank you, "+n+"! Your beautiful wish has been received.":"Please enter your name and message."};

let musicOn=false;const musicBtn=document.getElementById("musicBtn");musicBtn.onclick=()=>{musicOn=!musicOn;musicBtn.textContent=musicOn?"🔊":"♫";musicBtn.title="Music placeholder — add your MP3 in the final version";};
