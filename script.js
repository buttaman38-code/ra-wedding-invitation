const $=s=>document.querySelector(s);
const music=$('#music');
function toast(t){const x=$('#toast');x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),2400)}
$('#coverDate').textContent=WEDDING.dates;
$('#mapsBtn').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(WEDDING.mapQuery);
$('#dirBtn').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(WEDDING.mapQuery);
if(WEDDING.musicFile) music.src=WEDDING.musicFile;

window.addEventListener('load',()=>setTimeout(()=>{$('#preloader').style.opacity='0';setTimeout(()=>$('#preloader').remove(),500)},500));
$('#openBtn').onclick=()=>{ $('#cover').style.display='none'; $('#site').hidden=false; window.scrollTo(0,0); playMusic(); };
function playMusic(){if(music.src) music.play().catch(()=>{})}
function toggleMusic(){if(!music.src){toast('Add your music.mp3 and set musicFile in config.js');return}if(music.paused){music.play();toast('Music on')}else{music.pause();toast('Music paused')}}
$('#musicTop').onclick=toggleMusic;

const target=new Date(WEDDING.weddingDate).getTime();
function countdown(){let x=Math.max(0,target-Date.now())/1000;let d=Math.floor(x/86400);x%=86400;let h=Math.floor(x/3600);x%=3600;let m=Math.floor(x/60),s=Math.floor(x%60);$('#d').textContent=String(d).padStart(2,'0');$('#h').textContent=String(h).padStart(2,'0');$('#m').textContent=String(m).padStart(2,'0');$('#s').textContent=String(s).padStart(2,'0')}
countdown();setInterval(countdown,1000);

const cv=$('#scratch'),ctx=cv.getContext('2d');let down=false;
function initScratch(){const r=cv.getBoundingClientRect();cv.width=r.width*devicePixelRatio;cv.height=r.height*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);ctx.fillStyle='#b98b68';ctx.fillRect(0,0,r.width,r.height);ctx.fillStyle='rgba(255,238,225,.3)';for(let i=0;i<900;i++)ctx.fillRect(Math.random()*r.width,Math.random()*r.height,1.5,1.5);ctx.fillStyle='#6f3d35';ctx.font='italic 18px Cormorant Garamond';ctx.textAlign='center';ctx.fillText('Scratch to reveal',r.width/2,r.height/2)}
initScratch();addEventListener('resize',initScratch);
function erase(e){if(!down)return;const r=cv.getBoundingClientRect(),p=e.touches?e.touches[0]:e;ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(p.clientX-r.left,p.clientY-r.top,23,0,Math.PI*2);ctx.fill()}
cv.addEventListener('pointerdown',e=>{down=true;erase(e)});cv.addEventListener('pointermove',erase);addEventListener('pointerup',()=>down=false);

function makeICS(){const ics=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20261110T130000Z\nDTEND:20261110T160000Z\nSUMMARY:${WEDDING.bride} & ${WEDDING.groom} Wedding\nLOCATION:${WEDDING.venue}\nEND:VEVENT\nEND:VCALENDAR`;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='Rabya-Adnan-Wedding.ics';a.click()}
$('#calendarBtn').onclick=makeICS;$('#cal2').onclick=makeICS;

$('#rsvp').onsubmit=e=>{e.preventDefault();const msg=`Wedding RSVP%0AName: ${encodeURIComponent($('#guest').value)}%0AGuests: ${encodeURIComponent($('#count').value||'1')}%0AResponse: ${encodeURIComponent($('#attendance').value)}`;window.open(`https://wa.me/${WEDDING.whatsapp}?text=${msg}`,'_blank')};

$('#wishes').onsubmit=e=>{e.preventDefault();const name=$('#wishName').value.trim(),msg=$('#wishText').value.trim();const el=document.createElement('div');el.className='wish-card';el.innerHTML='<b>'+name.replace(/[<>]/g,'')+'</b><p>'+msg.replace(/[<>]/g,'')+'</p>';$('#wishList').prepend(el);e.target.reset();toast('Your message was added')};

$('#waBtn').onclick=()=>window.open(`https://wa.me/${WEDDING.whatsapp}`,'_blank');

document.querySelectorAll('.gallery button').forEach(b=>b.onclick=()=>{$('#lightImg').src=b.dataset.img;$('#lightbox').classList.add('show')});
$('#closeLight').onclick=()=>$('#lightbox').classList.remove('show');$('#lightbox').onclick=e=>{if(e.target.id==='lightbox')$('#lightbox').classList.remove('show')};
