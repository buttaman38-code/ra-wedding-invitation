
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const toast=(msg)=>{const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window._toast);window._toast=setTimeout(()=>t.classList.remove('show'),2400)};

// Gentle falling petals
function petal(){
  const p=document.createElement('i'); p.className='petal';
  p.style.left=Math.random()*100+'vw';
  p.style.setProperty('--x',(Math.random()*160-80)+'px');
  p.style.animationDuration=(5+Math.random()*6)+'s';
  p.style.opacity=.25+Math.random()*.55;
  $('#petals').appendChild(p); setTimeout(()=>p.remove(),12000);
}
setInterval(petal,900); for(let i=0;i<7;i++) setTimeout(petal,i*300);

$('#openInvite').addEventListener('click',()=>$('#reveal')?.scrollIntoView({behavior:'smooth'}));

const target=new Date('2026-11-09T17:00:00+05:00').getTime();
function countdown(){
  let d=Math.max(0,target-Date.now()), sec=Math.floor(d/1000);
  const vals=[Math.floor(sec/86400),Math.floor(sec%86400/3600),Math.floor(sec%3600/60),sec%60];
  $$('#timer strong').forEach((el,i)=>el.textContent=String(vals[i]).padStart(2,'0'));
}
countdown();setInterval(countdown,1000);

function makeICS(){
  const ics=`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//RabyaAndAdnan//Wedding//EN
BEGIN:VEVENT
UID:rabya-adnan-20261109@example.com
DTSTAMP:20260917T000000Z
DTSTART:20261109T120000Z
DTEND:20261111T180000Z
SUMMARY:Rabya & Adnan — Wedding Celebrations
LOCATION:Marquee, Gujranwala
DESCRIPTION:Mehndi 9 Nov • Nikah 10 Nov • Walima 11 Nov
END:VEVENT
END:VCALENDAR`;
  const blob=new Blob([ics],{type:'text/calendar'}),a=document.createElement('a');
  a.href=URL.createObjectURL(blob);a.download='Rabya-And-Adnan-Wedding.ics';a.click();URL.revokeObjectURL(a.href);
}
$('#calendarBtn').onclick=makeICS;$('#calendarBtn2').onclick=makeICS;

$$('.thumbs button').forEach((b,i)=>b.onclick=()=>{$('#mainGallery').src=b.dataset.img;$('#galleryCount').textContent=`${i+1} / 5`});

$('#rsvpForm').onsubmit=e=>{e.preventDefault();toast('Thank you! Your RSVP has been received on this device.');e.target.reset()};
$('#wishForm').onsubmit=e=>{e.preventDefault();toast('Your wishes have been saved on this device.');e.target.reset();$('#chars').textContent='0'};
$$('textarea').forEach(t=>t.addEventListener('input',()=>$('#chars').textContent=t.value.length));

const weddingAudio = $('#weddingAudio');
let playing=false;

async function toggleMusic(){
  if(!weddingAudio) return;
  if(weddingAudio.paused){
    try{
      await weddingAudio.play();
      playing=true;
      $('#musicBtn').textContent='♫';
      toast('Lover — music on');
    }catch(err){
      toast('Add your legally obtained assets/lover.mp3 file first.');
    }
  }else{
    weddingAudio.pause();
    playing=false;
    $('#musicBtn').textContent='♪';
    toast('Music paused');
  }
}
$('#musicBtn').onclick=toggleMusic;

$('#musicSelect').addEventListener('change',e=>{
  if(e.target.value==='none'){
    weddingAudio.pause();
    playing=false;
    $('#musicBtn').textContent='♪';
    toast('Music turned off');
  }else{
    toast('Selected: Taylor Swift — Lover');
  }
});

$('#autoplay').addEventListener('change',e=>{
  localStorage.setItem('musicAutoplay', e.target.checked ? '1' : '0');
  if(e.target.checked) toast('Autoplay preference saved. Browsers may require a tap before music starts.');
});

if(localStorage.getItem('musicAutoplay')==='1') $('#autoplay').checked=true;
$$('.swatch').forEach(b=>b.onclick=()=>{document.documentElement.style.setProperty('--pink',getComputedStyle(b).backgroundColor);toast('Accent preview changed')});
$('#saveChanges').onclick=()=>{localStorage.setItem('coupleNames',$('#namesInput').value);toast('Changes saved on this device')};
if(localStorage.getItem('coupleNames'))$('#namesInput').value=localStorage.getItem('coupleNames');
