// WEDDING MUSIC — register before other website scripts
const weddingMusic = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

if (weddingMusic && musicToggle && musicIcon) {
  musicToggle.addEventListener("click", async function () {
    if (weddingMusic.paused) {
      try {
        weddingMusic.volume = 0.8;
        await weddingMusic.play();
        musicIcon.textContent = "Ⅱ";
        musicToggle.setAttribute("aria-label", "Pause wedding music");
      } catch (error) {
        alert("Music could not play: " + error.message);
      }
    } else {
      weddingMusic.pause();
      musicIcon.textContent = "♫";
      musicToggle.setAttribute("aria-label", "Play wedding music");
    }
  });
}
// RSVP FORM
const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", function(e) {
    e.preventDefault();
  

    const form = new FormData(rsvpForm);
    const name = form.get("guestName") || "";
    const attendance = form.get("attendance") || "";
    const count = form.get("guestCount") || "Not specified";

    const message =
      "Wedding RSVP - Rabya & Adnan\n" +
      "Name: " + name + "\n" +
      "Attendance: " + attendance + "\n" +
      "Guests: " + count;

    const url = "https://wa.me/923107185753?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank");
  });
}

// WISHES FORM
const wishForm = document.getElementById("wishForm");

if (wishForm) {
  wishForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("wishName").value.trim();
    const msg = document.getElementById("wishMessage").value.trim();

    if (!name || !msg) return;

    const card = document.createElement("div");
    card.className = "wish-note";

    const strong = document.createElement("strong");
    strong.textContent = name;

    const p = document.createElement("p");
    p.textContent = msg;

    card.append(strong, p);
    document.getElementById("wishesWall").prepend(card);

    wishForm.reset();
    document.getElementById("charCount").textContent = "0";
    alert("Your lovely wish has been added!");
  });
}
// EASY CUSTOMIZATION: edit these details when your final arrangements are confirmed.
const WEDDING = {
  couple: "Rabya & Adnan",
  // Change the year and time below to your actual Mehndi date/time.
  countdownDate: "2026-11-26T17:00:00",
  mapSearch: "Marquee, Gujranwala"
};

const $ = (s) => document.querySelector(s);
const toast = (message) => {
  const el = $("#toast"); el.textContent = message; el.classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer = setTimeout(()=>el.classList.remove("show"),2600);
};

function openInvitation(){
   const cover = $("#home");
   if (cover.classList.contains("is-opening")) return;

   cover.classList.add("is-opening");

   weddingMusic.volume = 0.8;
   weddingMusic.play().then(() => {
      musicIcon.textContent = "Ⅱ";
      musicToggle.setAttribute("aria-label", "Pause wedding music");
   }).catch(error => {
      console.log("Music error:", error);
   });

   setTimeout(()=>$("#invitation").scrollIntoView({behavior:"smooth"}),750);
}
$("#openInvite").addEventListener("click",openInvitation);
document.querySelectorAll("[data-scroll]").forEach(b=>b.addEventListener("click",()=>$(b.dataset.scroll).scrollIntoView({behavior:"smooth"})));

function updateCountdown(){
  const diff = new Date(WEDDING.countdownDate).getTime()-Date.now();
  if(diff<=0){["days","hours","minutes","seconds"].forEach(id=>$("#"+id).textContent="00");return;}
  const d=Math.floor(diff/86400000),h=Math.floor(diff%86400000/3600000),m=Math.floor(diff%3600000/60000),s=Math.floor(diff%60000/1000);
  $("#days").textContent=String(d).padStart(2,"0");$("#hours").textContent=String(h).padStart(2,"0");
  $("#minutes").textContent=String(m).padStart(2,"0");$("#seconds").textContent=String(s).padStart(2,"0");
}
updateCountdown();setInterval(updateCountdown,1000);

const canvas=$("#scratchCanvas"),ctx=canvas.getContext("2d");let drawing=false,erased=false;
// ROSE-GOLD SCRATCH SPARKLES ✨
function createScratchSparkles(x,y){
  const colors=["#fff0c7","#f7c6d0","#e8b86d","#ffffff","#d99aab"];

  for(let i=0;i<9;i++){
    const sparkle=document.createElement("span");
    sparkle.textContent=Math.random()>.5?"✦":"✧";

    sparkle.style.cssText=`
      position:fixed;
      left:${x+(Math.random()-.5)*55}px;
      top:${y+(Math.random()-.5)*55}px;
      color:${colors[Math.floor(Math.random()*colors.length)]};
      font-size:${10+Math.random()*13}px;
      pointer-events:none;
      z-index:99999;
      text-shadow:0 0 8px #f8dca0;
      animation:scratchGlitter .8s ease-out forwards;
    `;

    document.body.appendChild(sparkle);
    setTimeout(()=>sparkle.remove(),850);
  }
}
function paintScratch(){
  const r=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
  canvas.width=r.width*dpr;canvas.height=r.height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  const grad=ctx.createLinearGradient(0,0,r.width,r.height);grad.addColorStop(0,"#b88b55");grad.addColorStop(.45,"#e3c28a");grad.addColorStop(1,"#987044");
  ctx.fillStyle=grad;ctx.fillRect(0,0,r.width,r.height);
  ctx.globalAlpha=.25;for(let i=0;i<500;i++){ctx.fillStyle=i%2?"#fff0c7":"#69482c";ctx.fillRect(Math.random()*r.width,Math.random()*r.height,Math.random()*2+1,Math.random()*2+1)}ctx.globalAlpha=1;
  ctx.fillStyle="#fff0d3";ctx.font="italic 19px Georgia";ctx.textAlign="center";ctx.fillText("SCRATCH HERE",r.width/2,r.height/2);
  ctx.globalCompositeOperation="destination-out";erased=false;
}
function scratchStart(e){drawing=true;scratchMove(e)}
function scratchMove(e){
 if(!drawing)return;const r=canvas.getBoundingClientRect(),p=e.touches?e.touches[0]:e;
 const x=p.clientX-r.left,y=p.clientY-r.top;

if(Math.random()>.35){
  createScratchSparkles(p.clientX,p.clientY);
}

ctx.globalCompositeOperation="destination-out";
ctx.beginPath();
ctx.arc(x,y,24,0,Math.PI*2);
ctx.fill();
 const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;let clear=0;for(let i=3;i<pixels.length;i+=32)if(pixels[i]===0)clear++;
 if(clear/(pixels.length/32)>.48&&!erased){erased=true;canvas.style.transition="opacity .8s";canvas.style.opacity="0";setTimeout(()=>canvas.style.display="none",850);toast("Our special dates are revealed ♥")}
}
function scratchEnd(){drawing=false}
canvas.addEventListener("pointerdown",scratchStart);canvas.addEventListener("pointermove",scratchMove);window.addEventListener("pointerup",scratchEnd);
paintScratch();window.addEventListener("resize",()=>{if(!erased){canvas.style.display="block";canvas.style.opacity="1";paintScratch()}});

const photos=[
 "https://mariafaisal.com/cdn/shop/articles/Mehndi_Image_6065c6d7-53e8-4883-ab1f-c48de15e1f47.png?v=1780849788",
 "https://akmalscatering.com/images/events/1778732833.png",
 "https://static.showit.co/800/MIbT4DlHTResPhfoCKyp2A/227789/chicago-indian-wedding-decorator-drury-lane-eventful-moments-by-alina.jpg",
 "https://marcem.com.pk/wp-content/uploads/2025/08/DSC04083-1024x683_11zon.webp"
];let photoIndex=0;
function showPhoto(i){photoIndex=(i+photos.length)%photos.length;$("#galleryMain").style.backgroundImage=`url("${photos[photoIndex]}")`;$("#galleryCount").textContent=`${photoIndex+1} / ${photos.length}`;document.querySelectorAll(".thumb").forEach((b,n)=>b.classList.toggle("active",n===photoIndex))}
document.querySelectorAll(".thumb").forEach(b=>{b.style.backgroundImage=`url("${photos[Number(b.dataset.index)]}")`;b.addEventListener("click",()=>showPhoto(Number(b.dataset.index)))});
$("#galleryMain").addEventListener("click",()=>showPhoto(photoIndex+1));$("#galleryMain").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")showPhoto(photoIndex+1)});showPhoto(0);

// RSVP — Send guest details to WhatsApp
const RSVP_WHATSAPP = "923107185753";

$("#wishMessage").addEventListener("input",e=>$("#charCount").textContent=e.target.value.length);

const calendarBtn = document.getElementById("calendarBtn");

if (calendarBtn) {
  calendarBtn.addEventListener("click", () => {
    const start = "20261126T170000";
    const end = "20261126T220000";

    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Rabya and Adnan//Wedding//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:mehndi-rabya-adnan-20261126
DTSTAMP:20261107T000000Z
DTSTART:${start}
DTEND:${end}
SUMMARY:Mehndi - ${WEDDING.couple}
LOCATION:At Home
DESCRIPTION:Wedding celebrations for ${WEDDING.couple}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], {
      type: "text/calendar;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "Rabya-and-Adnan-Mehndi.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}
$("#mapLink").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(WEDDING.mapSearch);

