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
 const x=p.clientX-r.left,y=p.clientY-r.top;ctx.globalCompositeOperation="destination-out";ctx.beginPath();ctx.arc(x,y,24,0,Math.PI*2);ctx.fill();
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

$("#rsvpForm").addEventListener("submit",e=>{
 e.preventDefault();const f=new FormData(e.currentTarget),name=f.get("guestName"),att=f.get("attendance"),count=f.get("guestCount")||"Not specified";
 const message=`Wedding RSVP%0AName: ${encodeURIComponent(name)}%0AResponse: ${encodeURIComponent(att)}%0AGuest count: ${encodeURIComponent(count)}`;
 $("#rsvpNote").textContent="Your RSVP is ready to send. WhatsApp will open so you can share it with the hosts.";
 window.open(`https://wa.me/?text=${message}`,"_blank");e.currentTarget.reset();
});
$("#wishMessage").addEventListener("input",e=>$("#charCount").textContent=e.target.value.length);
$("#wishForm").addEventListener("submit",e=>{
 e.preventDefault();const name=$("#wishName").value.trim(),msg=$("#wishMessage").value.trim();if(!name||!msg)return;
 const card=document.createElement("div");card.className="wish-note";const strong=document.createElement("strong"),p=document.createElement("p");strong.textContent=name;p.textContent=msg;card.append(strong,p);$("#wishesWall").prepend(card);e.currentTarget.reset();$("#charCount").textContent="0";toast("Your lovely wish has been added ♥");
});
$("#calendarBtn").addEventListener("click",()=>{
 const start="20261126T170000",end="20261126T220000";
 const ics=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:Mehndi - ${WEDDING.couple}\nLOCATION:${WEDDING.mapSearch}\nDESCRIPTION:Wedding celebrations for ${WEDDING.couple}\nEND:VEVENT\nEND:VCALENDAR`;
 const blob=new Blob([ics],{type:"text/calendar"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="Rabya-and-Adnan-wedding.ics";a.click();URL.revokeObjectURL(url);
});
$("#mapLink").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(WEDDING.mapSearch);
const weddingMusic = $("#weddingMusic");
$("#musicToggle").addEventListener("click", async () => {
 if (weddingMusic.paused) {
   try { await weddingMusic.play(); $("#musicIcon").textContent = "Ⅱ"; $("#musicToggle").setAttribute("aria-label", "Pause wedding music"); }
   catch (err) { toast("Please tap again to start the music."); }
 } else {
   weddingMusic.pause(); $("#musicIcon").textContent = "♫"; $("#musicToggle").setAttribute("aria-label", "Play wedding music");
 }
});
