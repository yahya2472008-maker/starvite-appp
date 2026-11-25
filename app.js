(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var ESC={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return ESC[c]})}
function nl(s){return esc(s).replace(/\n/g,'<br>')}

var TYPES={
  nikah:{label:'Pernikahan',title:'Undangan Pernikahan',hostLabel:'Nama mempelai',host:'Rina & Dimas',
    opening:'Dengan rasa syukur dan sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari pernikahan kami.',
    closing:'Kehadiran dan doa restu Anda adalah kebahagiaan bagi kami. Terima kasih.',style:'zamrud',start:'10:00'},
  lamaran:{label:'Lamaran',title:'Acara Lamaran',hostLabel:'Nama pasangan',host:'Rina & Dimas',
    opening:'Dengan penuh syukur, kami mengundang Anda untuk hadir pada acara lamaran kami dan berbagi kebahagiaan bersama keluarga.',
    closing:'Terima kasih atas kehadiran dan doa Anda.',style:'sakura',start:'11:00'},
  ultah:{label:'Ulang tahun',title:'Ulang Tahun ke-17',hostLabel:'Nama yang berulang tahun',host:'Naya',
    opening:'Ayo rayakan bersama! Ada makanan enak, musik, dan banyak tawa. Kehadiranmu bikin pestanya makin seru.',
    closing:'Sampai ketemu di pestanya!',style:'pesta',start:'16:00'},
  khitan:{label:'Khitanan',title:'Syukuran Khitanan',hostLabel:'Tuan rumah dan nama anak',host:'Keluarga Bapak Hendra untuk Ananda Raka',
    opening:'Sebagai wujud syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan mendoakan putra kami pada acara khitanan.',
    closing:'Doa dan kehadiran Anda sangat berarti bagi kami. Terima kasih.',style:'langit',start:'09:00'},
  aqiqah:{label:'Aqiqah',title:'Syukuran Aqiqah',hostLabel:'Orang tua dan nama bayi',host:'Keluarga Bapak Andi untuk Ananda Zahra',
    opening:'Atas lahirnya buah hati kami, dengan rasa syukur kami mengundang Anda untuk hadir dan mendoakan bayi kami.',
    closing:'Terima kasih atas doa dan kehadiran Anda.',style:'pelangi',start:'10:00'},
  tujuh:{label:'Tujuh bulanan',title:'Syukuran Tujuh Bulanan',hostLabel:'Calon orang tua',host:'Sari & Bima',
    opening:'Menyambut calon buah hati kami, kami mengundang Anda untuk hadir, berbagi doa, dan menikmati hidangan bersama.',
    closing:'Terima kasih atas doa dan kehadiran Anda.',style:'lavender',start:'15:00'},
  wisuda:{label:'Wisuda',title:'Syukuran Kelulusan',hostLabel:'Nama lulusan',host:'Fajar Nugroho, S.T.',
    opening:'Setelah perjalanan panjang, kami mengundang Anda merayakan kelulusan bersama keluarga dan sahabat.',
    closing:'Terima kasih sudah menjadi bagian dari perjalanan ini.',style:'tinta',start:'13:00'},
  reuni:{label:'Reuni',title:'Reuni Akbar Angkatan 2006',hostLabel:'Angkatan atau komunitas',host:'Alumni SMA Angkatan 2006',
    opening:'Sudah lama tidak bertemu. Yuk berkumpul lagi, bernostalgia, dan melepas rindu bersama teman lama.',
    closing:'Ajak teman seangkatan yang lain ya.',style:'senja',start:'18:00'},
  rumah:{label:'Syukuran rumah',title:'Syukuran Rumah Baru',hostLabel:'Tuan rumah',host:'Keluarga Bapak Wahyu',
    opening:'Kami mengundang Anda untuk hadir di rumah baru kami, berdoa bersama, dan menikmati hidangan sederhana.',
    closing:'Terima kasih atas doa dan kehadiran Anda.',style:'hutan',start:'16:00'},
  buka:{label:'Buka bersama',title:'Buka Puasa Bersama',hostLabel:'Penyelenggara',host:'Keluarga Besar Pak Wahyu',
    opening:'Mari berbuka bersama sambil mempererat silaturahmi. Mohon hadir sebelum azan Magrib.',
    closing:'Sampai jumpa di acara buka bersama.',style:'islami',start:'17:15'},
  doa:{label:'Doa bersama',title:'Doa Bersama',hostLabel:'Tuan rumah',host:'Keluarga Bapak Hendra',
    opening:'Kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara doa bersama. Kehadiran Anda sangat kami harapkan.',
    closing:'Atas kehadirannya kami ucapkan terima kasih.',style:'islami',start:'19:30'},
  seminar:{label:'Seminar',title:'Workshop Desain Produk',hostLabel:'Penyelenggara',host:'Komunitas Desain Lokal',
    opening:'Belajar langsung dari praktisi. Tempat terbatas, silakan daftar lebih awal.',
    closing:'Bawa laptop dan pertanyaan Anda.',style:'galaksi',start:'09:00'},
  rapat:{label:'Rapat',title:'Undangan Rapat',hostLabel:'Penyelenggara atau divisi',host:'Panitia Kegiatan',
    opening:'Sehubungan dengan persiapan kegiatan, kami mengundang Bapak/Ibu untuk menghadiri rapat berikut.',
    closing:'Mohon hadir tepat waktu. Terima kasih atas kerja samanya.',style:'putih',start:'19:30'},
  grand:{label:'Grand opening',title:'Grand Opening',hostLabel:'Nama usaha',host:'Kedai Kopi Senja',
    opening:'Kami resmi membuka pintu. Datang, cicipi menu andalan kami, dan nikmati promo pembukaan.',
    closing:'Kami tunggu kedatangan Anda.',style:'neon',start:'10:00'},
  lain:{label:'Custom',title:'Undangan',hostLabel:'Penyelenggara',host:'',
    opening:'Kami mengundang Anda untuk hadir pada acara berikut.',
    closing:'Terima kasih atas kehadirannya.',style:'tinta',start:'10:00'}
};
var STYLES=[
  {id:'zamrud',name:'Zamrud',note:'Elegan, hijau dan emas'},
  {id:'mawar',name:'Mawar',note:'Lembut, merah muda'},
  {id:'langit',name:'Langit',note:'Cerah, biru langit'},
  {id:'senja',name:'Senja',note:'Hangat, ungu ke jingga'},
  {id:'tinta',name:'Tinta',note:'Tegas, hitam putih'},
  {id:'pesta',name:'Pesta',note:'Meriah, kuning dan pink'},
  {id:'noir',name:'Noir',note:'Mewah, hitam dan emas'},
  {id:'batik',name:'Batik',note:'Klasik, motif kawung'},
  {id:'sakura',name:'Sakura',note:'Manis, kelopak berguguran'},
  {id:'hutan',name:'Hutan',note:'Segar, kunang-kunang'},
  {id:'laut',name:'Laut',note:'Sejuk, gelembung naik'},
  {id:'neon',name:'Neon',note:'Malam, garis menyala'},
  {id:'kraft',name:'Kraft',note:'Hangat, tulisan tangan'},
  {id:'pelangi',name:'Pelangi',note:'Ceria, balon dan pelangi'},
  {id:'galaksi',name:'Galaksi',note:'Bintang jatuh'},
  {id:'lavender',name:'Lavender',note:'Anggun, ungu lembut'},
  {id:'royal',name:'Royal',note:'Formal, biru tua dan emas'},
  {id:'karbon',name:'Karbon',note:'Sporty, hitam dan merah'},
  {id:'gurun',name:'Gurun',note:'Hangat, bukit pasir'},
  {id:'islami',name:'Islami',note:'Hijau tua, bulan sabit'},
  {id:'retro',name:'Retro',note:'Gaya 80-an, grid bergerak'},
  {id:'lapangan',name:'Lapangan',note:'Sepak bola, bola bergulir'},
  {id:'kopi',name:'Kopi',note:'Coklat, uap kopi'},
  {id:'salju',name:'Salju',note:'Dingin, salju turun'},
  {id:'bara',name:'Bara',note:'Api, percikan naik'},
  {id:'koran',name:'Koran',note:'Berita, hitam putih'},
  {id:'cetak',name:'Cetak biru',note:'Teknis, garis ukur'},
  {id:'arcade',name:'Arcade',note:'Game, huruf piksel'},
  {id:'putih',name:'Putih',note:'Bersih dan minimal'}
];
var CATS=['Semua','Elegan','Ceria','Gelap','Alam','Klasik','Modern'],catF='Semua';
var CAT={zamrud:'Elegan',mawar:'Elegan',noir:'Elegan',royal:'Elegan',islami:'Elegan',lavender:'Elegan',sakura:'Elegan',batik:'Klasik',kraft:'Klasik',koran:'Klasik',pesta:'Ceria',pelangi:'Ceria',langit:'Ceria',lapangan:'Ceria',neon:'Gelap',galaksi:'Gelap',bara:'Gelap',karbon:'Gelap',arcade:'Gelap',kopi:'Gelap',hutan:'Alam',laut:'Alam',gurun:'Alam',salju:'Alam',senja:'Alam',tinta:'Modern',putih:'Modern',cetak:'Modern',retro:'Modern'};
function catOf(x){return x.cat||CAT[x.id]||'Modern'}
var FONT={b:"'Bricolage Grotesque',system-ui,sans-serif",c:"'Cormorant Garamond',Georgia,serif",p:"'Playfair Display',Georgia,serif",f:"'Fredoka','Bricolage Grotesque',system-ui,sans-serif",k:"'Caveat','Bricolage Grotesque',cursive",n:"'Bebas Neue','Bricolage Grotesque',Impact,sans-serif",x:"'Press Start 2P','Bricolage Grotesque',monospace"};
var GEN={};
function L(a,b,c){return 'linear-gradient(160deg,'+a+','+b+(c?','+c:'')+')'}
function DOT(c,z){return 'radial-gradient(circle,'+c+' 1.5px,transparent 2px) 0 0/'+z+'px '+z+'px'}
function GRID(c,z){return 'linear-gradient('+c+' 1px,transparent 1px) 0 0/'+z+'px '+z+'px,linear-gradient(90deg,'+c+' 1px,transparent 1px) 0 0/'+z+'px '+z+'px'}
function CHECK(c,z){return 'conic-gradient('+c+' 25%,transparent 0 50%,'+c+' 0 75%,transparent 0) 0 0/'+z+'px '+z+'px'}
function STRIPE(c,z,ang){return 'repeating-linear-gradient('+ang+'deg,'+c+' 0 1px,transparent 1px '+z+'px)'}
function G(id,name,note,cat,bg,ink,soft,acc,on,o){
  o=o||{};
  GEN[id]={fx:o.fx||[],fxc:o.fxc||acc,v:{bg:bg,ink:ink,soft:soft,accent:acc,on:on,line:o.line||acc,display:o.f||'b',tw:o.tw||700,fs:o.fs||'normal',tsz:o.sz||'2.3rem',tt:o.tt||'none',r:o.r||'8px',bw:o.bw||'1px',align:o.al||'center',out:o.out||'0px'}};
  STYLES.push({id:id,name:name,note:note,cat:cat});
}
function gv(id){
  var g=GEN[id];if(!g) return '';
  var v=g.v,o='--c-bg:'+v.bg+';--c-ink:'+v.ink+';--c-soft:'+v.soft+';--c-accent:'+v.accent+';--c-on:'+v.on+';--c-line:'+v.line+';--c-display:'+FONT[v.display]+';--c-tw:'+v.tw+';--c-fs:'+v.fs+';--c-tsz:'+v.tsz+';--c-tt:'+v.tt+';--c-r:'+v.r+';--c-bw:'+v.bw+';--c-align:'+v.align+';--c-out:'+v.out+';--c-fx:'+g.fxc+';';
  if(v.align==='left') o+='--c-just:stretch;--c-just2:flex-start;--c-self:flex-start;';
  return o;
}
function gfx(g){
  var o='';
  function px(){return 'left:'+rnd(3,95).toFixed(0)+'%;'}
  function tm(a,b){return '--d:'+rnd(a,b).toFixed(1)+'s;--dl:-'+rnd(0,b).toFixed(1)+'s'}
  g.fx.forEach(function(r){
    var c=r[0],n=r[1],i,st;
    for(i=0;i<n;i++){
      st='';
      if(c==='gs') st=px()+'top:'+rnd(3,95).toFixed(0)+'%;'+tm(2.4,4.6);
      else if(c==='gp') st=px()+'--s:'+Math.round(rnd(8,14))+'px;--sh:'+(r[2]||'80% 0 80% 0')+';'+tm(9,16);
      else if(c==='gu'||c==='gr') st=px()+'--s:'+Math.round(rnd(6,20))+'px;--sx:'+Math.round(rnd(-30,30))+'px;'+tm(8,16);
      else if(c==='gd') st='top:'+rnd(4,80).toFixed(0)+'%;--s:'+Math.round(rnd(20,40))+'px;'+tm(30,60);
      else if(c==='gl') st='--t:'+rnd(5,95).toFixed(0)+'%;'+tm(2,5);
      else if(c==='gb') st='left:'+rnd(0,80).toFixed(0)+'%;top:'+rnd(0,80).toFixed(0)+'%;--s:'+Math.round(rnd(90,180))+'px;'+tm(8,14);
      else if(c==='gt') st=px()+'top:'+rnd(2,98).toFixed(0)+'%;'+tm(2,5);
      else if(c==='cf'){st=px()+'--cc:'+r[2][i%r[2].length]+';'+tm(6,11);o+='<i class="cf" style="'+st+'"></i>';continue}
      o+='<i class="'+c+'" style="'+st+'"></i>';
    }
  });
  return o;
}

/* Elegan */
G('sampanye','Sampanye','Emas muda, mewah','Elegan',L('#FBF3E4','#EFD9B4'),'#4A3512','#7A6038','#A9772A','#FFFFFF',{f:'p',sz:'2.4rem',r:'2px',bw:'2px',out:'1px',fx:[['gs',10]],fxc:'#C99A3A'});
G('mutiara','Mutiara','Putih lembut, kilau perak','Elegan',L('#FAFAFC','#E6E8F0'),'#2B2F45','#5F6580','#6E78B0','#FFFFFF',{f:'c',fs:'italic',sz:'2.6rem',r:'22px',out:'1px',fx:[['gs',10]],fxc:'#9AA4D6'});
G('rosegold','Rose Gold','Hangat, logam merah muda','Elegan',L('#F7E1DA','#E7B9A9'),'#4B2A24','#7A4E45','#B0604E','#FFFFFF',{f:'p',sz:'2.3rem',r:'4px',out:'1px',fx:[['gs',10]],fxc:'#D98E7C'});
G('safir','Safir','Biru dalam, berkilau','Elegan',L('#0B1F4B','#143A8C'),'#EAF1FF','#A9BCE8','#8FC1FF','#0B1F4B',{f:'p',sz:'2.3rem',r:'2px',out:'1px',fx:[['gs',12]],fxc:'#BFDCFF'});
G('rubi','Rubi','Merah anggur dan emas','Elegan',L('#4A0E1B','#8A1E36'),'#FFEDEF','#E7B1BA','#F2C879','#4A0E1B',{f:'p',fs:'italic',tw:500,sz:'2.4rem',r:'2px',out:'1px',fx:[['gs',12]],fxc:'#F2C879'});
G('giok','Giok','Hijau batu mulia','Elegan',L('#0E3B2E','#1F6B50'),'#EAF7F0','#A8D5C0','#E9D58A','#0E3B2E',{f:'c',fs:'italic',sz:'2.6rem',r:'2px',out:'1px',fx:[['gs',10]],fxc:'#E9D58A'});
G('ametis','Ametis','Ungu kristal','Elegan',L('#2A1450','#5B2FA0'),'#F1E9FF','#C3AEEB','#F0C6FF','#2A1450',{f:'c',fs:'italic',sz:'2.6rem',r:'14px',out:'1px',fx:[['gs',12],['gb',2]],fxc:'#D9A8FF'});
G('gading','Gading','Putih gading, garis tipis','Elegan','#FBF8F0','#2B2B2B','#6B6B6B','#9C7A3C','#FFFFFF',{f:'p',sz:'2.2rem',r:'0px',bw:'1px',out:'1px',line:'#9C7A3C'});
G('beludru','Beludru','Ungu tua, emas','Elegan',L('#2B0F2F','#4E1B54'),'#F7E8F8','#D2A9D8','#E2B659','#2B0F2F',{f:'p',sz:'2.3rem',r:'2px',out:'1px',fx:[['gs',10]],fxc:'#E2B659'});
G('perak','Perak','Dingin, metalik','Elegan',L('#F4F6F8','#CDD3DA'),'#1F2933','#52606D','#3E4C59','#FFFFFF',{f:'b',tw:600,sz:'2.3rem',r:'6px',fx:[['gs',10]],fxc:'#7B8794'});
G('emas','Emas Murni','Kilau emas tebal','Elegan',L('#3B2A0B','#8C6A1C'),'#FFF4D2','#E6CF8F','#FFE08A','#3B2A0B',{f:'p',sz:'2.3rem',r:'2px',bw:'2px',out:'1px',fx:[['gs',16]],fxc:'#FFE08A'});
G('persik','Persik','Jingga lembut','Elegan',L('#FFEFE3','#FFD3B6'),'#5A2E18','#8A5A3E','#D9622B','#FFFFFF',{f:'c',fs:'italic',sz:'2.6rem',r:'20px',fx:[['gp',8,'50%']],fxc:'#FF9E6B'});
G('melati','Melati','Putih hijau, kelopak jatuh','Elegan',L('#FFFFFF','#EAF4EC'),'#234A32','#5E8670','#3F8A5B','#FFFFFF',{f:'c',fs:'italic',sz:'2.6rem',r:'20px',out:'1px',fx:[['gp',9,'50% 0 50% 0']],fxc:'#A9D6B8'});
G('anggrek','Anggrek','Ungu muda anggun','Elegan',L('#F6E9F5','#E0C3E6'),'#3E1F4A','#6E4B7D','#8F3FB5','#FFFFFF',{f:'c',fs:'italic',sz:'2.6rem',r:'20px',fx:[['gp',9,'80% 0 80% 0']],fxc:'#C58BDB'});

/* Ceria */
G('permen','Permen','Warna-warni manis','Ceria',DOT('rgba(255,95,162,.18)',18)+','+L('#FFF1F8','#E8F5FF'),'#3A2A6B','#6B5BA0','#E6358B','#FFFFFF',{f:'f',tw:600,sz:'2.5rem',r:'26px',bw:'3px',line:'#3A2A6B',fx:[['cf',14,['#FF5FA2','#4DB8FF','#FFD166','#7B5CFF']]]});
G('balon','Balon','Balon naik','Ceria',L('#E6F4FF','#FFF4D6'),'#1D3557','#46688F','#D62839','#FFFFFF',{f:'f',tw:600,sz:'2.5rem',r:'26px',bw:'3px',line:'#1D3557',fx:[['gu',9]],fxc:'#E63946'});
G('jeruk','Jeruk','Hangat, jingga cerah','Ceria',L('#FFF3D6','#FFC97A'),'#4A2400','#7A4A14','#D9480F','#FFFFFF',{f:'f',tw:600,sz:'2.5rem',r:'24px',bw:'2px',fx:[['gu',10]],fxc:'#FF9A3C'});
G('limau','Limau','Hijau limau segar','Ceria',L('#F6FFD6','#D8F27A'),'#26340A','#4F6A1A','#3F7D0A','#FFFFFF',{f:'f',tw:600,sz:'2.5rem',r:'24px',bw:'2px',fx:[['gp',9,'0 100% 0 100%']],fxc:'#6CB01E'});
G('bubblegum','Bubblegum','Pink ungu, gelembung','Ceria',L('#FFD6EC','#C9B6FF'),'#3A1E5C','#5E3F8F','#C2267E','#FFFFFF',{f:'f',tw:600,sz:'2.5rem',r:'26px',bw:'3px',line:'#3A1E5C',fx:[['gr',12]],fxc:'#FFFFFF'});
G('lolipop','Lolipop','Kotak-kotak manis','Ceria',CHECK('rgba(230,53,139,.12)',28)+',#FFF8E1','#5A1F3D','#8A4A68','#E6358B','#FFFFFF',{f:'f',tw:600,sz:'2.5rem',r:'22px',bw:'3px',line:'#5A1F3D',fx:[['cf',12,['#E6358B','#2EC4B6','#FFB703','#7B5CFF']]]});
G('karnaval','Karnaval','Meriah dan ramai','Ceria',L('#FFF8EE','#FFE3E0'),'#3B1030','#6B3A5E','#D7263D','#FFFFFF',{f:'f',tw:600,sz:'2.5rem',r:'26px',bw:'3px',line:'#3B1030',fx:[['cf',18,['#D7263D','#F6AE2D','#2E86AB','#59C173']]]});
G('matahari','Matahari','Kuning cerah bersinar','Ceria',L('#FFF6B8','#FFC93C'),'#4A3000','#7A5200','#C2410C','#FFFFFF',{f:'f',tw:600,sz:'2.5rem',r:'24px',bw:'2px',fx:[['gb',3],['gs',8]],fxc:'#FFF1A6'});
G('sorak','Sorak','Kuning tegas, garis hitam','Ceria','#FFD60A','#1B1B1B','#3A3A3A','#1B1B1B','#FFD60A',{f:'n',tw:400,sz:'3rem',tt:'uppercase',r:'0px',bw:'4px',line:'#1B1B1B',fx:[['gl',5]],fxc:'#1B1B1B'});
G('kartun','Kartun','Biru kuning, tebal','Ceria',L('#CFF4FF','#FFF1A6'),'#12324A','#3F6580','#E8531F','#FFFFFF',{f:'f',tw:600,sz:'2.5rem',r:'24px',bw:'3px',line:'#12324A',fx:[['gu',8]],fxc:'#FF6B35'});
G('piknik','Piknik','Kotak-kotak merah','Ceria',CHECK('rgba(214,40,57,.14)',32)+',#FFF9F0','#4A1218','#7A3A40','#D62839','#FFFFFF',{f:'f',tw:600,sz:'2.4rem',r:'12px',bw:'2px',fx:[['gp',8,'50%']],fxc:'#D62839'});
G('catair','Cat Air','Warna menyebar lembut','Ceria',L('#E6F7F2','#F3E8FF','#FFE9D6'),'#2F3A56','#5A6685','#4C63E0','#FFFFFF',{f:'c',fs:'italic',sz:'2.6rem',r:'20px',fx:[['gb',4]],fxc:'#B9A7FF'});

/* Gelap */
G('tengahmalam','Tengah Malam','Biru hitam, bintang','Gelap',L('#05070F','#0D1226'),'#E8ECFF','#9AA6D6','#7C9BFF','#05070F',{f:'b',sz:'2.3rem',r:'12px',fx:[['gt',26]],fxc:'#FFFFFF'});
G('aurora','Aurora','Cahaya hijau ungu','Gelap','radial-gradient(ellipse at 20% 0,rgba(0,255,170,.35),transparent 55%),radial-gradient(ellipse at 90% 30%,rgba(140,80,255,.4),transparent 55%),#060B1A','#EAFFF6','#9ED8C4','#5CFFC8','#06222A',{f:'b',sz:'2.3rem',r:'14px',fx:[['gb',3],['gt',14]],fxc:'#5CFFC8'});
G('siber','Siber','Grid hijau, teknologi','Gelap',GRID('rgba(0,255,200,.12)',22)+',#050B14','#D6FFF6','#7FD9C4','#00FFC8','#050B14',{f:'b',tw:800,sz:'2rem',tt:'uppercase',r:'0px',bw:'2px',al:'left',fx:[['gl',5]],fxc:'#00FFC8'});
G('obsidian','Obsidian','Hitam kaca, tenang','Gelap',L('#0A0A0B','#1C1C20'),'#F2F2F2','#9A9AA3','#E0E0E8','#0A0A0B',{f:'b',tw:600,sz:'2.3rem',r:'4px',fx:[['gs',8]],fxc:'#FFFFFF'});
G('kembangapi','Kembang Api','Percikan warna','Gelap',L('#050816','#0B1230'),'#FFFFFF','#A9B3E0','#FFD166','#050816',{f:'b',sz:'2.3rem',r:'10px',fx:[['cf',14,['#FFD166','#EF476F','#06D6A0','#118AB2']],['gs',8]],fxc:'#FFD166'});
G('lava','Lava','Merah bara, percikan','Gelap',L('#1A0505','#4A0F0A','#8A2108'),'#FFEDE5','#F0B29A','#FFA24A','#1A0505',{f:'n',tw:400,sz:'3rem',tt:'uppercase',r:'2px',bw:'2px',al:'left',fx:[['gu',14]],fxc:'#FFA24A'});
G('samudra','Samudra Dalam','Biru laut dalam','Gelap',L('#02121F','#052B4A','#06476E'),'#E4F6FF','#9CCDE6','#4FD1FF','#02121F',{f:'b',sz:'2.3rem',r:'12px',fx:[['gr',12]],fxc:'#9ADFFF'});
G('kabut','Kabut','Abu biru, berkabut','Gelap',L('#1C2229','#323C47'),'#EEF2F5','#A9B6C2','#A9C7E0','#1C2229',{f:'c',fs:'italic',sz:'2.6rem',r:'12px',fx:[['gd',4]],fxc:'#FFFFFF'});
G('ungumalam','Ungu Malam','Ungu gelap berkilau','Gelap',L('#120726','#2A1052'),'#F0E9FF','#BBA6E8','#B794FF','#120726',{f:'b',sz:'2.3rem',r:'12px',fx:[['gt',16],['gb',2]],fxc:'#D2BDFF'});
G('merahhitam','Merah Hitam','Tegas, garis merah','Gelap',STRIPE('rgba(255,45,45,.12)',16,45)+',#0C0C0C','#F5F5F5','#B5B5B5','#FF2D2D','#FFFFFF',{f:'n',tw:400,sz:'3rem',tt:'uppercase',r:'0px',bw:'2px',al:'left',fx:[['gl',6]],fxc:'#FF2D2D'});
G('matriks','Matriks','Kode hijau jatuh','Gelap','#020A04','#B6FFC8','#6FCF8A','#2BFF6B','#020A04',{f:'x',tw:400,sz:'1.05rem',tt:'uppercase',r:'0px',bw:'2px',al:'left',fx:[['gp',18,'0']],fxc:'#2BFF6B'});
G('tembaga','Tembaga','Coklat logam, kilau','Gelap',L('#1E120B','#4A2A17'),'#FBE9D8','#D9B596','#E29561','#1E120B',{f:'p',sz:'2.3rem',r:'4px',out:'1px',fx:[['gs',10]],fxc:'#E29561'});

/* Alam */
G('pagi','Pagi Berkabut','Sejuk, hijau kabut','Alam',L('#EAF3F0','#CFE2DC'),'#1D3B35','#4E7A6F','#2F7D6B','#FFFFFF',{f:'c',fs:'italic',sz:'2.6rem',r:'16px',fx:[['gd',4]],fxc:'#FFFFFF'});
G('sawah','Sawah','Hijau padi segar','Alam',L('#EEF9D3','#CDE59A','#A5CF6B'),'#1F3A0A','#41610F','#2F6B12','#FFFFFF',{f:'b',sz:'2.3rem',r:'14px',fx:[['gp',9,'0 100% 0 100%']],fxc:'#5C9B22'});
G('pantai','Pantai','Pasir dan laut','Alam',L('#FFF3D1','#C8EEF2','#8ED3E3'),'#0B3C4D','#2B6477','#0E7490','#FFFFFF',{f:'b',sz:'2.3rem',r:'18px',fx:[['gr',10]],fxc:'#FFFFFF'});
G('savana','Savana','Oranye tanah kering','Alam',L('#FDE9B8','#F4B563','#DE8A3B'),'#4A2308','#7A4318','#8F3A08','#FFF1DC',{f:'p',sz:'2.3rem',r:'6px',fx:[['gd',3]],fxc:'#FFF1DC'});
G('embun','Embun','Hijau mint, tetesan','Alam',L('#E8FBF3','#C8F0DE'),'#124A38','#3E7F69','#1F9D72','#FFFFFF',{f:'f',tw:600,sz:'2.4rem',r:'22px',fx:[['gr',10]],fxc:'#56C7A0'});
G('pinus','Pinus','Hutan malam, kunang-kunang','Alam',L('#0D2A22','#17443A'),'#E6F5EE','#9CCBB6','#8FD6B1','#0D2A22',{f:'c',fs:'italic',sz:'2.6rem',r:'6px',out:'1px',fx:[['gt',14],['gp',6,'0 100% 0 100%']],fxc:'#FFE98A'});
G('bungamatahari','Bunga Matahari','Kuning cerah','Alam',L('#FFE680','#FFC400'),'#3B2A00','#6A4A00','#5A3A00','#FFE680',{f:'f',tw:600,sz:'2.4rem',r:'22px',fx:[['gp',8,'50%']],fxc:'#B8860B'});
G('kristal','Es Kristal','Biru es berkilau','Alam',L('#F0FAFF','#BFE4F7'),'#0B3550','#37698B','#1F7FB8','#FFFFFF',{f:'b',sz:'2.3rem',r:'16px',fx:[['gs',12]],fxc:'#6BBDE8'});
G('rimba','Rimba','Hijau hutan tropis','Alam',L('#0A2415','#14452A'),'#E3F5E8','#9CCBAA','#7BE0A0','#0A2415',{f:'b',sz:'2.3rem',r:'8px',fx:[['gp',12,'0 100% 0 100%']],fxc:'#7BE0A0'});
G('lembah','Lembah','Hijau tenang','Alam',L('#DDEBD2','#A9C99B'),'#1B3320','#3F6347','#2E6B3A','#FFFFFF',{f:'c',fs:'italic',sz:'2.6rem',r:'16px',fx:[['gd',3],['gp',5,'0 100% 0 100%']],fxc:'#FFFFFF'});
G('karang','Karang','Jingga laut hangat','Alam',L('#FFE3DA','#FFA38F','#EF7A8C'),'#4A1020','#7A2C3C','#A3162F','#FFFFFF',{f:'f',tw:600,sz:'2.4rem',r:'22px',fx:[['gr',10]],fxc:'#FFFFFF'});

/* Klasik */
G('perkamen','Perkamen','Kertas tua bergaris','Klasik',STRIPE('rgba(120,80,20,.08)',3,0)+','+L('#F3E5C0','#E3CB94'),'#3A2A10','#6B5530','#7A4E10','#FFF5DC',{f:'p',sz:'2.2rem',r:'2px',bw:'2px',out:'1px'});
G('suratlama','Surat Lama','Tulisan tangan di kertas','Klasik',L('#EFE2C8','#DCC9A3'),'#3B2D1A','#6B5738','#8B3A1F','#FFFFFF',{f:'k',sz:'3rem',r:'2px',bw:'2px',line:'#3B2D1A'});
G('wayang','Wayang','Coklat tua, emas','Klasik',L('#2A1608','#4F2A0E'),'#F6E3BF','#CDB187','#E1A63B','#2A1608',{f:'p',sz:'2.2rem',r:'2px',bw:'2px',out:'1px',fx:[['gs',10]],fxc:'#E1A63B'});
G('songket','Songket','Merah tua, benang emas','Klasik','repeating-linear-gradient(45deg,rgba(226,182,89,.14) 0 2px,transparent 2px 14px),'+L('#4A0E1B','#6E1630'),'#FDF0D5','#E3C79A','#E2B659','#4A0E1B',{f:'p',sz:'2.3rem',r:'2px',bw:'2px',out:'1px',fx:[['gs',8]],fxc:'#E2B659'});
G('tegel','Tegel','Ubin biru putih','Klasik',CHECK('rgba(20,70,120,.1)',34)+',#F4F1E8','#1B2F4A','#4A607E','#1E5A96','#FFFFFF',{f:'p',sz:'2.2rem',r:'2px',bw:'2px'});
G('posterlawas','Poster Lawas','Cetakan jadul tebal','Klasik',L('#F2D9A8','#E6B96E'),'#3B1B0A','#6B3A1E','#B3261E','#FFFFFF',{f:'n',tw:400,sz:'3rem',tt:'uppercase',r:'0px',bw:'4px',line:'#3B1B0A'});
G('telegram','Telegram','Hitam putih formal','Klasik',STRIPE('rgba(0,0,0,.05)',3,0)+',#F1EDE0','#222222','#555555','#222222','#F1EDE0',{f:'p',sz:'1.8rem',tt:'uppercase',r:'0px',bw:'3px'});
G('monokrom','Monokrom','Putih abu, serif','Klasik',L('#FAFAFA','#E8E8E8'),'#111111','#555555','#111111','#FFFFFF',{f:'p',fs:'italic',tw:500,sz:'2.4rem',r:'0px',bw:'1px',out:'1px'});
G('sepia','Sepia','Foto lama','Klasik',L('#E8D8BE','#C9AE86'),'#2F2112','#5E4730','#6B4423','#FFFFFF',{f:'c',fs:'italic',sz:'2.6rem',r:'4px',bw:'2px',fx:[['gt',16]],fxc:'#8A6A3F'});
G('kaligrafi','Kaligrafi','Hijau tua di kertas krem','Klasik',L('#F5EFE0','#E8DCC0'),'#1B3A33','#46665D','#1B6B5A','#FFFFFF',{f:'c',fs:'italic',sz:'2.8rem',r:'4px',bw:'1px',out:'1px',fx:[['gs',8]],fxc:'#B8A25A'});

/* Modern */
G('swiss','Swiss','Abu terang, merah tegas','Modern','#F2F2F2','#111111','#555555','#E10600','#FFFFFF',{f:'b',tw:800,sz:'2.6rem',r:'0px',bw:'0px',al:'left'});
G('brutal','Brutal','Kuning, garis tebal','Modern','#FFE14D','#111111','#333333','#111111','#FFE14D',{f:'b',tw:800,sz:'2.2rem',tt:'uppercase',r:'0px',bw:'4px',line:'#111111',al:'left'});
G('mesh','Mesh Gradien','Warna menyatu','Modern','radial-gradient(circle at 15% 20%,#FF8A5B 0,transparent 45%),radial-gradient(circle at 85% 15%,#7B5CFF 0,transparent 45%),radial-gradient(circle at 50% 95%,#27D3C3 0,transparent 50%),#1B1740','#FFFFFF','#E3DEFF','#FFD166','#1B1740',{f:'b',sz:'2.3rem',r:'18px',fx:[['gb',4]],fxc:'#FFFFFF'});
G('kaca','Kaca Buram','Modern, bercahaya','Modern','radial-gradient(circle at 20% 20%,#6EE7F9 0,transparent 40%),radial-gradient(circle at 80% 70%,#A78BFA 0,transparent 45%),#101827','#FFFFFF','#C9D3E6','#6EE7F9','#101827',{f:'b',sz:'2.3rem',r:'24px',fx:[['gb',3]],fxc:'#6EE7F9'});
G('biru','Biru Tegas','Biru royal polos','Modern','#1F4BFF','#FFFFFF','#CBD6FF','#FFFFFF','#1F4BFF',{f:'b',tw:800,sz:'2.4rem',r:'0px',bw:'2px',line:'rgba(255,255,255,.8)',al:'left',fx:[['gl',5]],fxc:'#FFFFFF'});
G('jinggaungu','Jingga Ungu','Gradasi senja','Modern',L('#FF9A3C','#C2307A','#4B1B7A'),'#FFF6EE','#FFE0CC','#FFE9A8','#4B1B7A',{f:'b',sz:'2.3rem',r:'18px',fx:[['gb',3],['gt',10]],fxc:'#FFE9A8'});
G('mint','Mint Segar','Hijau mint bersih','Modern',L('#E4FFF3','#B9F3DB'),'#0B3D2E','#3A7A66','#0F9D6B','#FFFFFF',{f:'b',sz:'2.3rem',r:'18px',fx:[['gr',10]],fxc:'#3DC99A'});
G('grafit','Grafit','Abu gelap, aksen jingga','Modern',L('#2A2D32','#3B3F46'),'#F1F3F5','#B4BAC2','#FF7A3D','#FFFFFF',{f:'b',tw:800,sz:'2.3rem',r:'6px',al:'left',fx:[['gl',5]],fxc:'#FF7A3D'});
G('terakota','Terakota','Tanah liat hangat','Modern',L('#E4B79B','#C9805A'),'#3B1A0C','#6A3A22','#7A2E0F','#FFFFFF',{f:'p',sz:'2.3rem',r:'8px',fx:[['gt',14]],fxc:'#FFE2CF'});
G('zaitun','Zaitun','Hijau zaitun lembut','Modern',L('#E7EAD2','#BAC58E'),'#2A3010','#55602A','#55621B','#FFFFFF',{f:'c',fs:'italic',sz:'2.6rem',r:'12px',fx:[['gp',8,'0 100% 0 100%']],fxc:'#55621B'});
G('denim','Denim','Biru jins','Modern',L('#1E3A5F','#2F5B8A'),'#EAF2FB','#B5C9E0','#FFD28A','#1E3A5F',{f:'b',sz:'2.3rem',r:'6px',fx:[['gt',14]],fxc:'#FFFFFF'});
G('hijaunyala','Hijau Nyala','Hitam, hijau stabilo','Modern','#0B0F0B','#EFFFEA','#9DBF98','#B6FF3B','#0B0F0B',{f:'n',tw:400,sz:'3rem',tt:'uppercase',r:'0px',bw:'2px',al:'left',fx:[['gl',5]],fxc:'#B6FF3B'});


var KEY='ajak-undangan-v1';
var b=TYPES.nikah;
var S={type:'nikah',title:b.title,host:b.host,opening:b.opening,closing:b.closing,
  date:'2026-11-21',start:b.start,end:'',tz:'WIB',venue:'Gedung Serbaguna Melati',address:'Jl. Melati No. 12',maps:'',
  dress:'',note:'',contactName:'',contactPhone:'',style:b.style,countdown:true,
  guests:'Bu Ratna\nPak Hendra\nKeluarga Pak Dedi',sent:{},previewGuest:'',hostUrl:'',serverCode:'',serverKey:'',photos:[],g1b:'',g1n:'',g1a:'',g2b:'',g2n:'',g2a:'',music:'',musicName:'',musicUrl:'',musicFile:'',useCustom:false,customName:'',rundown:''};
try{
  var raw=localStorage.getItem(KEY);
  if(raw){
    var o=JSON.parse(raw);
    if(o&&typeof o==='object'){
      Object.keys(S).forEach(function(k){ if(k in o && typeof o[k]===typeof S[k] && o[k]!==null) S[k]=o[k]; });
    }
  }
}catch(e){}
if(!TYPES[S.type]) S.type='nikah';
if(!STYLES.some(function(x){return x.id===S.style})) S.style='zamrud';
if(['WIB','WITA','WIT'].indexOf(S.tz)<0) S.tz='WIB';

/* guest mode: the invitation comes from the link (?u=...&t=...) */
var GUESTMODE=false,INV=null;
try{var ie=document.getElementById('inv-data');INV=JSON.parse(ie.textContent);if(!INV||!INV.d)INV=null}catch(e){INV=null}
try{
  var qp=new URLSearchParams(location.search),qu=qp.get('u'),qt=qp.get('t')||'',hh=(location.hash||'').replace(/^#/,'');
  if(!qu&&/^[A-Za-z0-9_-]{20,}(\.[A-Za-z0-9_-]+)?$/.test(hh)){
    var hp=hh.split('.');
    qu=hp[0];
    if(hp[1]){try{qt=b64d(hp[1])}catch(e2){}}
  }
  if(qu){
    var qd=JSON.parse(b64d(qu));
    if(qd&&typeof qd==='object'){
      Object.keys(S).forEach(function(k){ if(k in qd && typeof qd[k]===typeof S[k] && qd[k]!==null) S[k]=qd[k]; });
      if(!TYPES[S.type]) S.type='nikah';
      if(!STYLES.some(function(x){return x.id===S.style})) S.style='zamrud';
      if(['WIB','WITA','WIT'].indexOf(S.tz)<0) S.tz='WIB';
      S.previewGuest=String(qt||'').slice(0,80);
      GUESTMODE=true;
    }
  }
}catch(e){}
if(S.hostUrl==='https://claude.ai/artifact/F6h4Tqde8uWPQrqhtTRcr9') S.hostUrl='';
if(!GUESTMODE&&!S.hostUrl){
  if(/^https?:$/.test(location.protocol)&&!/claude/i.test(location.hostname)) S.hostUrl=location.origin+location.pathname;
  else S.hostUrl='';
}

var st;
function save(){if(GUESTMODE) return;clearTimeout(st);st=setTimeout(function(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){try{localStorage.setItem(KEY,JSON.stringify(Object.assign({},S,{music:'',musicName:'',photos:[]})))}catch(e2){}}if(typeof autoSync==='function') autoSync()},250)}

/* ---- helpers ---- */
function b64e(str){
  var b=new TextEncoder().encode(str),o='',i;
  for(i=0;i<b.length;i++) o+=String.fromCharCode(b[i]);
  return btoa(o).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function b64d(x){
  x=x.replace(/-/g,'+').replace(/_/g,'/');
  while(x.length%4) x+='=';
  var o=atob(x),b=new Uint8Array(o.length),i;
  for(i=0;i<o.length;i++) b[i]=o.charCodeAt(i);
  return new TextDecoder().decode(b);
}
function inviteData(withPhotos){
  var o={};
  ['type','title','host','opening','closing','date','start','end','tz','venue','address','maps','dress','note','contactName','contactPhone','style','countdown','g1b','g1n','g1a','g2b','g2n','g2a','musicUrl','musicFile','rundown'].forEach(function(k){o[k]=S[k]});
  if(withPhotos!==false){o.photos=(S.photos||[]).filter(okPh).slice(0,8);o.music=okAudio(S.music)?S.music:'';o.musicName=String(S.musicName||'').slice(0,80)}
  return o;
}
function inviteUrl(name){
  var base=(S.hostUrl||'').trim();
  if(!/^https?:\/\//i.test(base)) return '';
  base=base.split('?')[0].split('#')[0];
  if(/claude\.ai\/artifact\//i.test(base)||/\/u\/[a-z0-9]{8}$/.test(base)){
    if(!name) return base;
    var gl=guests(),ix=-1,i;
    for(i=0;i<gl.length;i++){if(gl[i].name===name){ix=i;break}}
    return ix>=0?base+'#t'+(ix+1):base+'#n-'+hexName(name);
  }
  return base+'#'+b64e(JSON.stringify(inviteData(false)))+(name?'.'+b64e(name):'');
}
function fmtDate(iso){
  if(!iso) return null;
  var p=iso.split('-').map(Number);
  if(p.length!==3||p.some(isNaN)) return null;
  var dt=new Date(Date.UTC(p[0],p[1]-1,p[2]));
  if(isNaN(dt.getTime())) return null;
  var o={timeZone:'UTC'};
  return {
    day:p[2],
    weekday:dt.toLocaleDateString('id-ID',{weekday:'long',timeZone:'UTC'}),
    monthYear:dt.toLocaleDateString('id-ID',{month:'long',year:'numeric',timeZone:'UTC'}),
    full:dt.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})
  };
}
function tf(t){return t.replace(':','.')}
function timeText(){
  if(!S.start) return '';
  return tf(S.start)+' '+S.tz+(S.end?' – '+tf(S.end)+' '+S.tz:' – selesai');
}
function countdown(){
  if(!S.date) return '';
  var p=S.date.split('-').map(Number);
  if(p.length!==3||p.some(isNaN)) return '';
  var off={WIB:7,WITA:8,WIT:9}[S.tz];
  var n=new Date(Date.now()+off*3600000);
  var today=Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate());
  var ev=Date.UTC(p[0],p[1]-1,p[2]);
  var d=Math.round((ev-today)/864e5);
  if(d<0) return '';
  if(d===0) return 'Hari ini';
  if(d===1) return 'Besok';
  return d+' hari lagi';
}
function normPhone(v){
  var d=String(v||'').replace(/\D/g,'');
  if(!d) return '';
  if(d.indexOf('62')===0) return d;
  if(d.charAt(0)==='0') return '62'+d.slice(1);
  if(d.charAt(0)==='8') return '62'+d;
  return d;
}
function mapsUrl(){var m=(S.maps||'').trim();return /^https?:\/\//i.test(m)?m:''}
function guests(){
  return S.guests.split('\n').map(function(l){return l.trim()}).filter(Boolean).map(function(l){
    var i=l.lastIndexOf(','),name=l,phone='';
    if(i>0){
      var digits=l.slice(i+1).replace(/\D/g,'');
      if(digits.length>=8){name=l.slice(0,i).trim();phone=normPhone(digits)}
    }
    return {name:name,phone:phone};
  }).filter(function(g){return g.name});
}
function waLink(phone,msg){return 'https://wa.me/'+(phone||'')+'?text='+encodeURIComponent(msg)}

function buildMessage(guest){
  var d=fmtDate(S.date),L=[],t=timeText(),m=mapsUrl();
  L.push('*'+S.title+'*');
  if(S.host) L.push(S.host);
  L.push('');
  L.push('Kepada Yth. '+(guest||'Bapak/Ibu/Saudara/i'));
  L.push('');
  if(S.opening){L.push(S.opening);L.push('')}
  if(d) L.push('Hari/tanggal: '+d.full);
  if(t) L.push('Waktu: '+t);
  if(S.venue) L.push('Tempat: '+S.venue);
  if(S.address) L.push(S.address);
  if(m) L.push('Peta: '+m);
  if(S.dress) L.push('Busana: '+S.dress);
  if(S.note) L.push('Catatan: '+S.note);
  var rr=parseRun();if(rr.length){L.push('Rangkaian acara:');rr.forEach(function(r){L.push('- '+(r.t?r.t+' ':'')+r.x)})}
  [[S.g1b,S.g1n,S.g1a],[S.g2b,S.g2n,S.g2a]].forEach(function(r){if(String(r[1]||'').trim()) L.push('Amplop digital: '+[String(r[0]||'').trim(),String(r[1]).trim(),r[2]?'a.n. '+String(r[2]).trim():''].filter(Boolean).join(' '))});
  if(S.closing){L.push('');L.push(S.closing)}
  if(S.contactName||S.contactPhone){
    L.push('');
    L.push('Kontak: '+[S.contactName,S.contactPhone].filter(Boolean).join(' · '));
  }
  var lk=inviteUrl(guest);
  if(lk){L.push('');L.push('Lihat undangan lengkap (kartu beranimasi):');L.push(lk)}
  return L.join('\n');
}

/* ---- renderers ---- */
function renderTypes(){
  $('#types').innerHTML=Object.keys(TYPES).map(function(id){
    var t=TYPES[id];
    return '<button type="button" class="chip" data-type="'+id+'" aria-pressed="'+(id===S.type)+'"><i class="dot" data-style="'+t.style+'" style="'+gv(t.style)+'"></i>'+esc(t.label)+'</button>';
  }).join('');
  var T=TYPES[S.type];
  $('#hostLabel').textContent=T.hostLabel;
  $('#f-host').placeholder=T.host||'';
}
function renderStyles(){
  $('#cats').innerHTML=CATS.map(function(c){return '<button type="button" class="chip plain" data-cat="'+c+'" aria-pressed="'+(c===catF)+'">'+c+'</button>'}).join('');
  var list=STYLES.filter(function(x){return catF==='Semua'||catOf(x)===catF});
  $('#styleCount').textContent=list.length+' dari '+STYLES.length+' gaya';
  $('#styles').innerHTML=list.map(function(x){
    return '<button type="button" class="style-btn" data-pick="'+x.id+'" aria-pressed="'+(x.id===S.style)+'">'+
      '<span class="sw" data-style="'+x.id+'" style="display:grid;'+gv(x.id)+'">Aa</span>'+
      '<span class="style-meta"><b>'+x.name+'</b><span>'+x.note+'</span></span></button>';
  }).join('');
}
function renderCard(play){
  var d=fmtDate(S.date),t=timeText(),g=S.previewGuest||'Bapak/Ibu/Saudara/i';
  var cd=S.countdown?countdown():'';
  var m=mapsUrl(),ph=normPhone(S.contactPhone);
  var h='';
  h+='<p class="c-eyebrow">Anda diundang</p>';
  h+='<h2 class="c-title">'+esc(S.title||'Judul acara')+'</h2>';
  if(S.host) h+='<p class="c-host">'+esc(S.host)+'</p>';
  h+='<div class="c-orn" aria-hidden="true"><i></i></div>';
  h+='<p class="c-to">Kepada Yth.<strong>'+esc(g)+'</strong></p>';
  if(S.opening) h+='<p class="c-open">'+nl(S.opening)+'</p>';
  var ph=(S.photos||[]).filter(okPh).slice(0,8);
  if(ph.length) h+='<div class="c-gal n'+Math.min(ph.length,4)+'">'+ph.map(function(p,i){return '<button type="button" class="c-ph" data-ph="'+i+'" aria-label="Foto '+(i+1)+'"><img src="'+p+'" alt="" loading="lazy"></button>'}).join('')+'</div>';
  if(d){
    h+='<div class="c-when"><div class="c-day">'+d.day+'</div><div class="c-wd">'+esc(d.weekday)+', '+esc(d.monthYear)+'</div><div class="c-time">'+esc(t||'Waktu belum diisi')+'</div></div>';
  }else{
    h+='<p class="c-empty">Tanggal belum diisi</p>';
  }
  if(cd) h+='<span class="c-count">'+esc(cd)+'</span>';
  if(S.venue||S.address){
    h+='<div><p class="c-label">Tempat</p>';
    if(S.venue) h+='<p class="c-venue">'+esc(S.venue)+'</p>';
    if(S.address) h+='<p class="c-addr">'+nl(S.address)+'</p>';
    h+='</div>';
  }
  if(S.dress) h+='<p class="c-extra"><b>Busana:</b> '+esc(S.dress)+'</p>';
  if(S.note) h+='<p class="c-extra"><b>Catatan:</b> '+esc(S.note)+'</p>';
  var rn=parseRun();
  if(rn.length) h+='<div class="c-run"><p class="c-label">Rangkaian acara</p>'+rn.map(function(r){return r.t?'<div class="c-ri"><span class="c-rt">'+esc(r.t)+'</span><span class="c-rx">'+esc(r.x)+'</span></div>':'<div class="c-ri plain"><span class="c-rx">'+esc(r.x)+'</span></div>'}).join('')+'</div>';
  var gf=[[S.g1b,S.g1n,S.g1a],[S.g2b,S.g2n,S.g2a]].map(function(r,i){return {i:i,b:String(r[0]||'').trim(),n:String(r[1]||'').trim(),a:String(r[2]||'').trim()}}).filter(function(r){return r.n});
  if(gf.length) h+='<div class="c-gift"><p class="c-label">Amplop digital</p>'+gf.map(function(r){return '<div class="c-acc"><div><b>'+esc(r.b||'Rekening')+'</b><span class="c-no">'+esc(r.n)+'</span>'+(r.a?'<span class="c-an">a.n. '+esc(r.a)+'</span>':'')+'</div><button type="button" class="c-btn alt c-copy" data-copy="'+r.i+'">Salin</button></div>'}).join('')+'</div>';
  if(S.closing) h+='<p class="c-close">'+nl(S.closing)+'</p>';
  if(m||ph){
    h+='<div class="c-btns">';
    if(m) h+='<a class="c-btn alt" href="'+esc(m)+'" target="_blank" rel="noopener">Lihat lokasi</a>';
    if(ph){
      var rm='Halo, saya ingin bertanya tentang '+S.title+(S.host?' ('+S.host+')':'')+'.';
      h+='<a class="c-btn" href="'+esc(waLink(ph,rm))+'" target="_blank" rel="noopener">Hubungi penyelenggara</a>';
    }
    h+='</div>';
  }
  var host=$('#cardHost'),card=host.querySelector('.card');
  if(!card||card.dataset.style!==S.style){
    host.innerHTML='<div class="card" data-style="'+S.style+'" style="'+gv(S.style)+'"><div class="c-fx" aria-hidden="true">'+fx(S.style)+'</div><div class="c-frame"></div></div>';
    card=host.querySelector('.card');play=true;
  }
  if(!play) card.classList.remove('play');
  var fr=card.querySelector('.c-frame');
  fr.innerHTML=h;
  Array.prototype.forEach.call(fr.children,function(el,i){el.style.setProperty('--i',i)});
  if(play){card.classList.remove('play');void card.offsetWidth;card.classList.add('play')}
}
function rnd(a,b){return a+Math.random()*(b-a)}
function fx(s){
  if(GEN[s]) return gfx(GEN[s]);
  var o='',i;
  function add(cls,style){o+='<i class="'+cls+'" style="'+style+'"></i>'}
  function pos(){return 'left:'+rnd(3,95).toFixed(0)+'%;'}
  function tm(a,b){return '--d:'+rnd(a,b).toFixed(1)+'s;--dl:-'+rnd(0,b).toFixed(1)+'s'}
  if(s==='zamrud'){for(i=0;i<12;i++) add('sp',pos()+'top:'+rnd(3,95).toFixed(0)+'%;'+tm(2.4,4.6))}
  else if(s==='mawar'){for(i=0;i<9;i++) add('pt',pos()+tm(9,16))}
  else if(s==='langit'){for(i=0;i<4;i++) add('cl','top:'+rnd(4,70).toFixed(0)+'%;'+tm(30,60))}
  else if(s==='senja'){add('sun','');for(i=0;i<14;i++) add('st',pos()+'top:'+rnd(2,40).toFixed(0)+'%;'+tm(2,5))}
  else if(s==='tinta'){add('rg','');add('rg two','')}
  else if(s==='noir'){for(i=0;i<10;i++) add('sp',pos()+'top:'+rnd(3,95).toFixed(0)+'%;'+tm(2.4,4.6))}
  else if(s==='sakura'){for(i=0;i<14;i++) add('pt',pos()+tm(9,16))}
  else if(s==='hutan'){for(i=0;i<8;i++) add('pt',pos()+tm(10,18));for(i=0;i<10;i++) add('st',pos()+'top:'+rnd(5,95).toFixed(0)+'%;'+tm(2,5))}
  else if(s==='laut'){for(i=0;i<12;i++) add('bb',pos()+'--s:'+Math.round(rnd(8,22))+'px;'+tm(8,16))}
  else if(s==='neon'){add('sc','')}
  else if(s==='kraft'){add('tp','')}
  else if(s==='pelangi'){
    var bc=['#FF6B6B','#FFB84D','#5ED98A','#4DB8FF','#A38BFF'];
    add('rb','');
    for(i=0;i<8;i++) add('bl',pos()+'--bc:'+bc[i%bc.length]+';'+tm(10,18))
  }
  else if(s==='galaksi'){for(i=0;i<26;i++) add('st',pos()+'top:'+rnd(2,98).toFixed(0)+'%;'+tm(2,5));add('sh','')}
  else if(s==='lavender'){for(i=0;i<12;i++) add('sp',pos()+'top:'+rnd(3,95).toFixed(0)+'%;'+tm(2.4,4.6))}
  else if(s==='royal'){for(i=0;i<10;i++) add('sp',pos()+'top:'+rnd(3,95).toFixed(0)+'%;'+tm(2.4,4.6))}
  else if(s==='karbon'){for(i=0;i<6;i++) add('sl','--t:'+rnd(5,95).toFixed(0)+'%;'+tm(2,5))}
  else if(s==='gurun'){add('dn','bottom:-70px');add('dn two','bottom:-95px;left:-40%')}
  else if(s==='islami'){add('cr','');for(i=0;i<8;i++) add('sp',pos()+'top:'+rnd(3,95).toFixed(0)+'%;'+tm(2.4,4.6))}
  else if(s==='retro'){add('rs','');add('gf','')}
  else if(s==='lapangan'){add('cc','');add('hl','');add('bal','')}
  else if(s==='kopi'){for(i=0;i<6;i++) add('sm','left:'+rnd(5,70).toFixed(0)+'%;'+tm(7,12))}
  else if(s==='salju'){for(i=0;i<22;i++) add('sn',pos()+'--s:'+Math.round(rnd(3,8))+'px;'+tm(8,16))}
  else if(s==='bara'){for(i=0;i<18;i++) add('em',pos()+'--s:'+Math.round(rnd(3,7))+'px;--sx:'+Math.round(rnd(-40,40))+'px;'+tm(5,10))}
  else if(s==='cetak'){add('rg','');add('rg two','');add('dm','');add('dm b','')}
  else if(s==='arcade'){add('cu','')}
  else if(s==='pesta'){
    var cols=['#FF4F8B','#2EC4B6','#7B5CFF','#FFFFFF','#FF9F1C'];
    for(i=0;i<16;i++) add('cf',pos()+'--cc:'+cols[i%cols.length]+';'+tm(6,11))
  }
  return o;
}
function initSky(){
  var cv=$('#sky');if(!cv||!cv.getContext) return;
  var cx=cv.getContext('2d'),W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,2),stars=[],shoots=[],last=0,nextShoot=800,run=true;
  var reduce=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches);
  var COLS=['255,255,255','200,220,255','255,236,205','222,204,255'];
  function size(){
    W=window.innerWidth;H=window.innerHeight;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
    cx.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.max(90,Math.min(Math.round(W*H/5500),320)),i,z;
    stars=[];
    for(i=0;i<n;i++){
      z=Math.random();
      stars.push({x:Math.random()*W,y:Math.random()*H,r:z<.7?rnd(.4,.9):(z<.93?rnd(.9,1.4):rnd(1.4,2)),sp:rnd(.01,.05)*(1+z*2),ph:Math.random()*6.28,tw:rnd(.6,2.2),c:COLS[Math.floor(Math.random()*4)]});
    }
    if(reduce) draw(0,0);
  }
  function spawn(){
    var dir=Math.random()<.78?1:-1,big=Math.random()<.22;
    shoots.push({
      x:dir>0?rnd(-W*.1,W*.7):rnd(W*.3,W*1.1),y:rnd(-20,H*.45),
      vx:dir*rnd(9,14),vy:rnd(4,8),
      len:big?rnd(22,30):rnd(12,20),w:big?rnd(2.4,3.4):rnd(1.2,1.9),
      col:big?(Math.random()<.5?'255,170,90':'150,255,200'):'255,255,255',
      life:0,dur:big?95:60
    });
  }
  function draw(t,dt){
    var i,s,a,sh,g,h,tx,ty;
    cx.clearRect(0,0,W,H);
    for(i=0;i<stars.length;i++){
      s=stars[i];
      s.y-=s.sp*dt;
      if(s.y<-4){s.y=H+4;s.x=Math.random()*W}
      a=.55+.45*Math.sin(t/1000*s.tw+s.ph);
      cx.fillStyle='rgba('+s.c+','+a.toFixed(3)+')';
      cx.beginPath();cx.arc(s.x,s.y,s.r,0,6.2832);cx.fill();
      if(s.r>1.4){
        cx.fillStyle='rgba('+s.c+','+(a*.14).toFixed(3)+')';
        cx.beginPath();cx.arc(s.x,s.y,s.r*3.2,0,6.2832);cx.fill();
      }
    }
    if(!reduce&&t>nextShoot){
      nextShoot=t+rnd(1200,3600);
      spawn();
      if(Math.random()<.18) spawn();
    }
    for(i=shoots.length-1;i>=0;i--){
      sh=shoots[i];
      sh.x+=sh.vx*dt;sh.y+=sh.vy*dt;sh.life+=dt/sh.dur;
      if(sh.life>=1){shoots.splice(i,1);continue}
      a=Math.sin(sh.life*3.1416);
      tx=sh.x-sh.vx*sh.len;ty=sh.y-sh.vy*sh.len;
      g=cx.createLinearGradient(sh.x,sh.y,tx,ty);
      g.addColorStop(0,'rgba('+sh.col+','+a.toFixed(3)+')');
      g.addColorStop(.35,'rgba('+sh.col+','+(a*.35).toFixed(3)+')');
      g.addColorStop(1,'rgba('+sh.col+',0)');
      cx.strokeStyle=g;cx.lineWidth=sh.w;cx.lineCap='round';
      cx.beginPath();cx.moveTo(sh.x,sh.y);cx.lineTo(tx,ty);cx.stroke();
      h=cx.createRadialGradient(sh.x,sh.y,0,sh.x,sh.y,sh.w*4);
      h.addColorStop(0,'rgba(255,255,255,'+a.toFixed(3)+')');
      h.addColorStop(1,'rgba('+sh.col+',0)');
      cx.fillStyle=h;
      cx.beginPath();cx.arc(sh.x,sh.y,sh.w*4,0,6.2832);cx.fill();
    }
  }
  function frame(t){
    if(!run) return;
    var dt=last?Math.min((t-last)/16.7,3):1;
    last=t;
    draw(t,dt);
    requestAnimationFrame(frame);
  }
  size();
  window.addEventListener('resize',size);
  if(!reduce){
    requestAnimationFrame(frame);
    document.addEventListener('visibilitychange',function(){
      if(document.hidden){run=false}
      else if(!run){run=true;last=0;requestAnimationFrame(frame)}
    });
  }
}
function initExtras(){
  initSky();
  var list=Object.keys(TYPES).map(function(id){return '<span class="tk">'+esc(TYPES[id].label)+'</span>'}).join('');
  $('#ticker').innerHTML=list+list;
  var cols=['var(--accent)','var(--gold)','var(--ink)'],fl='',q;
  for(q=0;q<12;q++){
    fl+='<i class="fl k'+(q%3)+'" style="left:'+rnd(1,98).toFixed(0)+'%;--s:'+Math.round(rnd(9,24))+'px;--p:'+cols[q%3]+';--d:'+rnd(16,34).toFixed(0)+'s;--dl:-'+rnd(0,30).toFixed(0)+'s;--sx:'+Math.round(rnd(-60,60))+'px"></i>';
  }
  var bkc=['var(--gold)','var(--accent)','#4C7CC9'];
  for(q=0;q<6;q++){
    fl='<i class="bk" style="left:'+rnd(0,90).toFixed(0)+'%;top:'+rnd(5,80).toFixed(0)+'%;--s:'+Math.round(rnd(90,220))+'px;--p:'+bkc[q%3]+';--d:'+rnd(10,20).toFixed(0)+'s;--dl:-'+rnd(0,10).toFixed(0)+'s"></i>'+fl;
  }
  $('#bgfx').innerHTML=fl;
  var host=$('#cardHost');
  host.addEventListener('pointermove',function(e){
    if(e.pointerType!=='mouse'||(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)) return;
    var c=host.querySelector('.card');if(!c) return;
    var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    c.style.transform='rotateX('+(-y*5).toFixed(2)+'deg) rotateY('+(x*6).toFixed(2)+'deg)';
  });
  host.addEventListener('pointerleave',function(){var c=host.querySelector('.card');if(c) c.style.transform=''});
}
function renderMessage(){
  var msg=buildMessage('');
  $('#msg').value=msg;
  $('#waGeneral').href=waLink('',msg);
  var lu=inviteUrl('');
  $('#linkOut').value=lu||'';
  $('#openLink').href=lu||'#';
  $('#openLink').style.opacity=lu?'':'.5';
}
function renderGuests(){
  var G=guests(),done=0;
  G.forEach(function(g){if(S.sent[g.name]) done++});
  $('#prog').textContent=G.length?(done+' dari '+G.length+' tamu sudah ditandai terkirim'):'';
  if(!G.length){
    $('#guestList').innerHTML='<li class="empty">Belum ada tamu. Tulis satu nama per baris di kotak di atas.</li>';
    return;
  }
  $('#guestList').innerHTML=G.map(function(g,i){
    var phoneTxt=g.phone?'+'+g.phone:'Tanpa nomor';
    return '<li class="g">'+
      '<label class="g-sent"><input type="checkbox" data-sent="'+i+'"'+(S.sent[g.name]?' checked':'')+' aria-label="Sudah dikirim ke '+esc(g.name)+'"></label>'+
      '<div><span class="g-name">'+esc(g.name)+'</span><span class="g-phone">'+esc(phoneTxt)+'</span></div>'+
      '<div class="g-acts">'+
        '<a class="btn sm primary" href="'+esc(waLink(g.phone,buildMessage(g.name)))+'" target="_blank" rel="noopener">Kirim WhatsApp</a>'+
        '<button type="button" class="btn sm" data-copyg="'+i+'">Salin</button>'+
        '<button type="button" class="btn sm" data-view="'+i+'">Lihat di kartu</button>'+
      '</div></li>';
  }).join('');
}
function renderGuestPick(){
  var G=guests(),sel=$('#guestPick');
  if(!S.useCustom&&S.previewGuest&&!G.some(function(g){return g.name===S.previewGuest})) S.previewGuest='';
  sel.innerHTML='<option value="">Tanpa nama (umum)</option>'+G.map(function(g,i){
    return '<option value="'+i+'"'+(!S.useCustom&&g.name===S.previewGuest?' selected':'')+'>'+esc(g.name)+'</option>';
  }).join('')+'<option value="__custom"'+(S.useCustom?' selected':'')+'>Nama lain (ketik sendiri)...</option>';
  var ci=$('#guestCustom'),ca=$('#customActs');
  if(ci){ci.hidden=!S.useCustom;if(document.activeElement!==ci) ci.value=S.customName||''}
  if(ca) ca.hidden=!S.useCustom;
}
function refresh(){renderGuestPick();renderCard();renderMessage();renderGuests();renderCal();renderMusic()}
function syncForm(){
  $$('[data-k]').forEach(function(el){
    var k=el.dataset.k;
    if(el.type==='checkbox') el.checked=!!S[k]; else el.value=S[k];
  });
}

/* ---- tabs ---- */
var mq=window.matchMedia('(min-width:920px)');
var shell=$('#shell');
function setTab(t){
  if(mq.matches&&t==='preview') t='acara';
  shell.dataset.tab=t;
  $$('.tab').forEach(function(b){b.setAttribute('aria-selected',String(b.dataset.tab===t))});
}
if(mq.addEventListener) mq.addEventListener('change',function(){setTab(shell.dataset.tab)});

/* ---- actions ---- */
var toastT;
function toast(msg){
  var el=$('#toast');el.textContent=msg;el.classList.add('show');
  clearTimeout(toastT);toastT=setTimeout(function(){el.classList.remove('show')},2200);
}
function fallbackCopy(text){
  var ta=document.createElement('textarea');
  ta.value=text;ta.style.cssText='position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta);ta.select();
  var ok=false;try{ok=document.execCommand('copy')}catch(e){}
  ta.remove();return ok;
}
function copyText(text){
  var done=function(){toast('Tersalin ke papan klip')};
  var fail=function(){toast(fallbackCopy(text)?'Tersalin ke papan klip':'Gagal menyalin. Pilih teksnya dan salin manual.')};
  try{
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(done,fail)}else{fail()}
  }catch(e){fail()}
}
function applyType(id){
  var prev=TYPES[S.type],next=TYPES[id];
  ['title','host','opening','closing'].forEach(function(k){if(!S[k]||S[k]===prev[k]) S[k]=next[k]});
  if(!S.start||S.start===prev.start) S.start=next.start;
  if(S.style===prev.style) S.style=next.style;
  S.type=id;
  syncForm();renderTypes();renderStyles();refresh();renderCard(true);save();
}
var resetArm=0;
function resetClick(){
  var btn=$('#resetBtn');
  if(!resetArm){
    resetArm=setTimeout(function(){resetArm=0;btn.textContent='Kembalikan teks ke contoh jenis ini'},3000);
    btn.textContent='Yakin? Klik sekali lagi';return;
  }
  clearTimeout(resetArm);resetArm=0;
  btn.textContent='Kembalikan teks ke contoh jenis ini';
  var T=TYPES[S.type];
  S.title=T.title;S.host=T.host;S.opening=T.opening;S.closing=T.closing;S.start=T.start;S.style=T.style;
  syncForm();renderStyles();refresh();renderCard(true);save();toast('Teks dikembalikan ke contoh');
}

document.addEventListener('input',function(e){
  var el=e.target.closest&&e.target.closest('[data-k]');
  if(!el) return;
  var k=el.dataset.k;
  S[k]=el.type==='checkbox'?el.checked:el.value;
  refresh();save();
});
document.addEventListener('change',function(e){
  var t=e.target;
  if(t.matches&&t.matches('[data-sent]')){
    var G=guests(),g=G[Number(t.dataset.sent)];
    if(g){S.sent[g.name]=t.checked;if(!t.checked) delete S.sent[g.name];save();renderGuests()}
  }
  if(t.id==='guestPick'){
    if(t.value==='__custom'){S.useCustom=true;S.previewGuest=String(S.customName||'').trim()}
    else{var G2=guests();S.useCustom=false;S.previewGuest=t.value===''?'':(G2[Number(t.value)]?G2[Number(t.value)].name:'')}
    renderGuestPick();renderCard(true);save();
  }
});
document.addEventListener('click',function(e){
  var t=e.target.closest('button,a');
  if(!t) return;
  if(t.dataset.ph!==undefined){lbShow(Number(t.dataset.ph));return}
  if(t.dataset.lb){if(t.dataset.lb==='x') lbClose(); else lbShow(lbI+(t.dataset.lb==='n'?1:-1));return}
  if(t.dataset.delph!==undefined){S.photos.splice(Number(t.dataset.delph),1);renderPhotos();renderCard(true);save();return}
  if(t.dataset.copy!==undefined){var rn=[S.g1n,S.g2n][Number(t.dataset.copy)];if(rn) copyText(String(rn).trim());return}
  if(t.id==='mpBtn'){toggleMusic();return}
  if(t.id==='musicDel'){if(S.musicFile&&S.serverCode){fetch('/api/undangan/'+S.serverCode+'/musik',{method:'DELETE',headers:{'X-Kunci':S.serverKey}}).catch(function(){})}S.music='';S.musicName='';S.musicUrl='';S.musicFile='';var mu=$('#f-musicurl');if(mu) mu.value='';renderMusic();save();return}
  if(t.id==='copyCustomLink'||t.id==='copyCustomMsg'){var cn=String(S.customName||'').trim();if(!cn){toast('Ketik nama tamu dulu');return}if(t.id==='copyCustomMsg'){copyText(buildMessage(cn))}else{var cu=inviteUrl(cn);if(cu) copyText(cu);else toast('Tempel tautan halaman Starvite dulu')}return}
  if(t.dataset.tab){setTab(t.dataset.tab);if(t.dataset.tab==='kirim'){autoFirst()}if(t.dataset.tab==='preview') renderCard(true);window.scrollTo(0,0);return}
  if(t.id==='replay'){renderCard(true);return}
  if(t.id==='openInv'){var cv=$('#cover');cv.classList.add('out');setTimeout(function(){cv.hidden=true},450);renderCard(true);startMusic();return}
  if(t.id==='pubInv'){publishInv();return}
  if(t.id==='calIcs'){downloadIcs();return}
  if(t.id==='copyData'){
    var gnames=guests().map(function(g){return g.name});
    copyText('AJAK-DATA '+JSON.stringify({d:inviteData(false),g:gnames}));
    return;
  }
  if(t.id==='copyLink'){var lu=inviteUrl('');if(lu) copyText(lu); else toast('Tempel tautan halaman Starvite dulu');return}
  if(t.id==='openLink'&&!inviteUrl('')){e.preventDefault();toast('Tempel tautan halaman Starvite dulu');return}
  if(t.dataset.type){applyType(t.dataset.type);return}
  if(t.dataset.cat){catF=t.dataset.cat;renderStyles();return}
  if(t.dataset.pick){S.style=t.dataset.pick;renderStyles();renderCard(true);save();return}
  if(t.id==='copyMsg'){copyText($('#msg').value);return}
  if(t.id==='resetBtn'){resetClick();return}
  if(t.dataset.copyg!==undefined){var g=guests()[Number(t.dataset.copyg)];if(g) copyText(buildMessage(g.name));return}
  if(t.dataset.view!==undefined){
    var gv=guests()[Number(t.dataset.view)];
    if(gv){S.previewGuest=gv.name;renderGuestPick();renderCard(true);save();if(!mq.matches) setTab('preview');else toast('Kartu menampilkan '+gv.name)}
  }
});

var SERVERMODE=!(window.claude&&window.claude.use);
var SERVERCODE=(/^\/u\/([a-z0-9]{8})\/?$/.exec(location.pathname)||[])[1]||'';
function z(d){return d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}
function calInfo(){
  if(!S.date) return null;
  var p=S.date.split('-').map(Number);
  if(p.length!==3||p.some(isNaN)) return null;
  var off={WIB:7,WITA:8,WIT:9}[S.tz]||7;
  function ut(hm){var q=(hm||'00:00').split(':').map(Number);return new Date(Date.UTC(p[0],p[1]-1,p[2],(q[0]||0)-off,q[1]||0))}
  var a=ut(S.start),e=S.end?ut(S.end):new Date(a.getTime()+(S.start?2:24)*36e5);
  if(e<=a) e=new Date(e.getTime()+864e5);
  var det=[S.host,S.opening].filter(Boolean).join('\n\n')+(parseRun().length?'\n\nRangkaian acara:\n'+parseRun().map(function(r){return (r.t?r.t+' ':'')+r.x}).join('\n'):'')+(mapsUrl()?'\n\nPeta: '+mapsUrl():'');
  return {a:a,e:e,title:S.title||'Undangan',det:det,loc:[S.venue,S.address].filter(Boolean).join(', ')};
}
function renderCal(){
  var g=$('#calGoogle'),h=$('#calHint'),b=$('#calIcs');if(!g) return;
  var c=calInfo();
  if(!c){h.textContent='Isi tanggal acara dulu supaya tombol kalender aktif.';g.removeAttribute('href');g.style.opacity='.5';b.disabled=true;return}
  var d=fmtDate(S.date);b.disabled=false;g.style.opacity='';
  h.textContent='Simpan '+(d?d.full:'')+(S.start?' pukul '+tf(S.start)+' '+S.tz:'')+' ke kalender Anda, lengkap dengan lokasi.';
  g.href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(c.title)+'&dates='+z(c.a)+'/'+z(c.e)+'&details='+encodeURIComponent(c.det)+'&location='+encodeURIComponent(c.loc);
}
function icsEsc(t){return String(t||'').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n')}
function downloadIcs(){
  var c=calInfo();if(!c){toast('Isi tanggal acara dulu');return}
  var L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Starvite//ID','BEGIN:VEVENT','UID:'+z(c.a)+'-'+Math.random().toString(36).slice(2)+'@starvite','DTSTAMP:'+z(new Date()),'DTSTART:'+z(c.a),'DTEND:'+z(c.e),'SUMMARY:'+icsEsc(c.title),'DESCRIPTION:'+icsEsc(c.det),'LOCATION:'+icsEsc(c.loc),'BEGIN:VALARM','TRIGGER:-PT3H','ACTION:DISPLAY','DESCRIPTION:'+icsEsc(c.title),'END:VALARM','END:VEVENT','END:VCALENDAR'];
  var a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([L.join('\r\n')],{type:'text/calendar'}));a.download='undangan.ics';
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(function(){URL.revokeObjectURL(a.href)},1000);
}
function okPh(p){return typeof p==='string'&&p.length<400000&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(p)}
function renderPhotos(){
  var g=$('#pgrid'),c=$('#phCount');if(!g) return;
  S.photos=(S.photos||[]).filter(okPh).slice(0,8);
  g.innerHTML=S.photos.map(function(p,i){return '<div class="pth"><img src="'+p+'" alt=""><button type="button" data-delph="'+i+'" aria-label="Hapus foto '+(i+1)+'">\u00d7</button></div>'}).join('');
  c.textContent=S.photos.length+' dari 8 foto';
}
function addPhotos(files){
  var room=8-(S.photos||[]).length;
  if(room<=0){toast('Maksimal 8 foto');return}
  var list=Array.prototype.slice.call(files).filter(function(f){return /^image\//.test(f.type)});
  if(list.length>room) toast('Hanya '+room+' foto yang muat, maksimal 8');
  list.slice(0,room).forEach(function(f){
    var im=new Image(),u=URL.createObjectURL(f);
    im.onload=function(){
      var r=Math.min(1,900/Math.max(im.width,im.height)),cv=document.createElement('canvas');
      cv.width=Math.round(im.width*r);cv.height=Math.round(im.height*r);
      cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);
      var q=.78,d=cv.toDataURL('image/jpeg',q);
      while(d.length>300000&&q>.4){q-=.1;d=cv.toDataURL('image/jpeg',q)}
      URL.revokeObjectURL(u);
      if(!S.photos) S.photos=[];
      if(S.photos.length<8&&okPh(d)){S.photos.push(d);renderPhotos();renderCard(true);save()}
    };
    im.onerror=function(){URL.revokeObjectURL(u);toast('Foto tidak bisa dibaca')};
    im.src=u;
  });
}
var lbI=0;
function lbShow(i){var l=(S.photos||[]).filter(okPh);if(!l.length) return;lbI=(i+l.length)%l.length;$('#lbImg').src=l[lbI];$('#lb').hidden=false}
function lbClose(){$('#lb').hidden=true;$('#lbImg').removeAttribute('src')}
document.addEventListener('click',function(e){if(e.target&&e.target.id==='lb') lbClose()});
document.addEventListener('keydown',function(e){var lb=$('#lb');if(!lb||lb.hidden) return;if(e.key==='Escape') lbClose();else if(e.key==='ArrowRight') lbShow(lbI+1);else if(e.key==='ArrowLeft') lbShow(lbI-1)});
document.addEventListener('change',function(e){var t=e.target;if(t&&t.id==='f-photos'){addPhotos(t.files||[]);t.value=''}});
function verifyServer(){
  // Tautan lama bisa tersisa di peramban dari sesi sebelumnya. Jika server tidak mengenalinya, buat ulang otomatis.
  if(!SERVERMODE||!S.serverCode) return;
  fetch('/api/undangan/'+S.serverCode,{cache:'no-store'}).then(function(r){
    if(r.status!==404) return;
    S.serverCode='';S.serverKey='';S.musicFile='';S.hostUrl=location.origin;
    save();refresh();pubState('Tautan lama tidak ditemukan di server ini. Membuat tautan baru...');
    publishServer(true);
  }).catch(function(){});
}
function okAudio(p){return typeof p==='string'&&p.length<2300000&&/^data:audio\/(mpeg|mp3|ogg|wav|webm|mp4|aac|x-m4a);base64,[A-Za-z0-9+\/=]+$/.test(p)}
function ytId(u){var m=/^https?:\/\/(?:www\.|m\.|music\.)?(?:youtube\.com\/(?:watch\?(?:[^#\s]*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i.exec(String(u||'').trim());return m?m[1]:''}
function musicInfo(){
  var u=String(S.musicUrl||'').trim();
  if(u){
    var y=ytId(u);
    if(y) return {k:'y',s:y};
    if(/^https?:\/\/(open\.spotify\.com|spotify\.link|soundcloud\.com|on\.soundcloud\.com)\//i.test(u)) return {k:'',s:'',bad:'sp'};
    if(/^https?:\/\/\S{3,490}$/i.test(u)) return {k:'a',s:u};
    return {k:'',s:'',bad:'x'};
  }
  if(/^\/musik\/[a-z0-9]{8}(\?v=\d{1,15})?$/.test(String(S.musicFile||''))) return {k:'a',s:S.musicFile};
  if(okAudio(S.music)) return {k:'a',s:S.music};
  return {k:'',s:''};
}
var mpSrc='',mpKind='',mpYt=null,mpYtReady=false,mpYtErr='',mpWant=false,mpAudioErr='';
var YT_ERR={2:'Tautan video tidak valid. Salin ulang tautan dari YouTube.',5:'Browser tidak bisa memutar video ini. Coba video lain.',100:'Video tidak ditemukan atau bersifat pribadi. Coba video lain.',101:'Pemilik video tidak mengizinkan video ini disematkan. Coba video lain, misalnya versi audio atau lirik resmi, atau pakai unggah file lagu.',150:'Pemilik video tidak mengizinkan video ini disematkan. Coba video lain, misalnya versi audio atau lirik resmi, atau pakai unggah file lagu.',153:'YouTube menolak memutar video ini di halaman ini (kode 153). Muat ulang halaman, coba video lain, atau pakai unggah file lagu.'};
function ytLoadApi(ok,fail){
  if(window.YT&&window.YT.Player){ok();return}
  if(window.__ytq){window.__ytq.push([ok,fail]);return}
  window.__ytq=[[ok,fail]];
  var sc=document.createElement('script');sc.src='https://www.youtube.com/iframe_api';
  sc.onerror=function(){var q=window.__ytq||[];window.__ytq=null;q.forEach(function(x){x[1]()})};
  window.onYouTubeIframeAPIReady=function(){var q=window.__ytq||[];window.__ytq=null;q.forEach(function(x){x[0]()})};
  document.head.appendChild(sc);
}
function ytDestroy(){
  if(mpYt){try{mpYt.destroy()}catch(e){}}
  mpYt=null;mpYtReady=false;mpYtErr='';mpWant=false;
  var h=$('#mpYtHost');if(h) h.remove();
}
function ytCreate(id){
  var host=document.createElement('div'),slot=document.createElement('div');
  host.id='mpYtHost';host.setAttribute('aria-hidden','true');
  host.style.cssText='position:fixed;left:-400px;top:0;width:200px;height:200px;overflow:hidden;pointer-events:none';
  host.appendChild(slot);document.body.appendChild(host);
  ytLoadApi(function(){
    if(mpSrc!==id) return;
    try{
      mpYt=new YT.Player(slot,{width:200,height:200,videoId:id,playerVars:{controls:0,playsinline:1,rel:0,loop:1,playlist:id,origin:location.origin},events:{
        onReady:function(){mpYtReady=true;paintMusic();if(mpWant){mpWant=false;try{mpYt.playVideo()}catch(e){}}},
        onStateChange:function(e){var b=$('#mpBtn');if(!b) return;if(e.data===1) b.classList.add('on');else if(e.data===2) b.classList.remove('on')},
        onError:function(e){mpYtErr=YT_ERR[e.data]||('Video tidak bisa diputar (kode '+e.data+').');var b=$('#mpBtn');if(b) b.classList.remove('on');paintMusic()}
      }});
    }catch(e){mpYtErr='Pemutar YouTube gagal dibuat. Muat ulang halaman atau pakai unggah file lagu.';paintMusic()}
  },function(){
    if(mpSrc!==id) return;
    mpYtErr='Pemutar YouTube tidak bisa dimuat. Periksa koneksi internet. Di halaman claude.ai fitur ini tidak tersedia, jadi pakai unggah file lagu.';paintMusic();
  });
}
function musicText(){
  var m=musicInfo();
  if(m.k==='y') return mpYtErr||(mpYtReady?'Tautan YouTube siap. Ketuk tombol \u266a di pojok layar untuk mencoba.':'Memeriksa tautan YouTube...');
  if(m.k==='a'){
    if(mpAudioErr) return mpAudioErr;
    return (String(S.musicUrl||'').trim()?'Tautan file lagu dikenali.':'Lagu terpasang: '+(S.musicName||'file lagu')+(S.musicFile?' (tersimpan di server).':'.'))+' Ketuk tombol \u266a di pojok layar untuk mencoba.';
  }
  if(m.bad==='sp') return 'Spotify dan SoundCloud belum didukung. Pakai tautan YouTube, atau unggah file lagu.';
  if(m.bad==='x') return 'Tautan belum dikenali. Tempel tautan YouTube (youtube.com atau youtu.be) atau tautan langsung ke file lagu.';
  return 'Belum ada lagu.';
}
function paintMusic(){var st=$('#musicState');if(st) st.textContent=musicText()}
function renderMusic(){
  var m=musicInfo(),b=$('#mpBtn'),a=$('#mpAudio');
  if(b) b.hidden=!m.k;
  if(m.s!==mpSrc||m.k!==mpKind){
    if(a) a.pause();
    ytDestroy();mpAudioErr='';
    if(b) b.classList.remove('on');
    mpSrc=m.s;mpKind=m.k;
    if(a){if(m.k==='a'){a.preload='metadata';a.src=m.s}else a.removeAttribute('src')}
    if(m.k==='y') ytCreate(m.s);
  }
  paintMusic();
  var d=$('#musicDel');if(d) d.hidden=!(S.music||S.musicUrl||S.musicFile);
}
function toggleMusic(){
  var b=$('#mpBtn');if(!mpSrc||!b) return;
  if(mpKind==='y'){
    if(mpYtErr){toast(mpYtErr);return}
    if(!mpYtReady){mpWant=true;toast('Pemutar YouTube sedang disiapkan...');return}
    var st=-1;try{st=mpYt.getPlayerState()}catch(e){}
    try{if(st===1) mpYt.pauseVideo();else mpYt.playVideo()}catch(e){}
    return;
  }
  var a=$('#mpAudio');if(!a) return;
  if(a.paused){a.play().then(function(){b.classList.add('on')}).catch(function(){toast(mpAudioErr||'Lagu tidak bisa diputar')})}
  else{a.pause();b.classList.remove('on')}
}
function startMusic(){
  if(!mpSrc) return;
  if(mpKind==='y'){
    if(mpYtErr) return;
    if(!mpYtReady){mpWant=true;return}
    try{if(mpYt.getPlayerState()!==1) mpYt.playVideo()}catch(e){}
    return;
  }
  var a=$('#mpAudio');if(a&&a.paused) toggleMusic();
}
(function(){
  var a=$('#mpAudio');
  if(a) a.addEventListener('error',function(){
    if(!a.getAttribute('src')) return;
    mpAudioErr='Lagu tidak bisa dimuat. Periksa tautan lagunya (alamat salah atau situs menolak), atau pakai unggah file lagu.';
    var b=$('#mpBtn');if(b) b.classList.remove('on');
    paintMusic();
  });
})();
function mimeOf(f){
  var ok={'audio/mpeg':1,'audio/mp3':1,'audio/ogg':1,'audio/wav':1,'audio/webm':1,'audio/mp4':1,'audio/aac':1,'audio/x-m4a':1};
  return ok[f.type]?f.type:(/\.m4a$/i.test(f.name)?'audio/mp4':/\.ogg$/i.test(f.name)?'audio/ogg':/\.wav$/i.test(f.name)?'audio/wav':/\.aac$/i.test(f.name)?'audio/aac':'audio/mpeg');
}
function uploadMusic(f){
  var st=$('#musicState');
  function say(t){if(st) st.textContent=t}
  say('Menyiapkan unggahan...');
  Promise.resolve(S.serverCode?null:publishServer(true)).then(function(){
    if(!S.serverCode||!S.serverKey){say('Belum bisa mengunggah karena server belum menyimpan undangan. Coba lagi sebentar lagi.');return}
    var x=new XMLHttpRequest();
    x.open('PUT','/api/undangan/'+S.serverCode+'/musik');
    x.setRequestHeader('X-Kunci',S.serverKey);
    x.setRequestHeader('X-Nama',encodeURIComponent(f.name));
    x.setRequestHeader('Content-Type',mimeOf(f));
    x.upload.onprogress=function(e){if(e.lengthComputable) say('Mengunggah '+Math.round(e.loaded/e.total*100)+'% dari '+(f.size/1048576).toFixed(1)+' MB...')};
    x.onload=function(){
      if(x.status===200){
        S.musicFile='/musik/'+S.serverCode+'?v='+Date.now();S.musicName=f.name.slice(0,80);S.music='';S.musicUrl='';
        var mu=$('#f-musicurl');if(mu) mu.value='';
        save();renderMusic();publishServer(true);
      }else say('Gagal mengunggah (kode '+x.status+'). Coba lagi.');
    };
    x.onerror=function(){say('Gagal mengunggah. Pastikan server masih berjalan.')};
    x.send(f);
  });
}
function setMusic(f){
  if(!f) return;
  if(!/^audio\//.test(f.type)&&!/\.(mp3|m4a|ogg|wav|aac)$/i.test(f.name)){toast('Pilih file lagu (mp3, m4a, ogg, atau wav)');return}
  if(SERVERMODE){uploadMusic(f);return}
  if(f.size>1500000){toast('Di halaman claude.ai lagu maksimal 1,5 MB. Pakai versi komputer untuk file lebih besar.');return}
  var mt=mimeOf(f),r=new FileReader();
  r.onload=function(){var d=String(r.result).replace(/^data:[^;,]*/,'data:'+mt);if(okAudio(d)){S.music=d;S.musicName=f.name.slice(0,80);S.musicUrl='';S.musicFile='';var mu=$('#f-musicurl');if(mu) mu.value='';renderMusic();save()}else toast('File lagu tidak valid')};
  r.onerror=function(){toast('File lagu tidak bisa dibaca')};
  r.readAsDataURL(f);
}
document.addEventListener('change',function(e){var t=e.target;if(t&&t.id==='f-music'){setMusic(t.files&&t.files[0]);t.value=''}});
function hexName(n){var b=new TextEncoder().encode(String(n).slice(0,80)),o='',i;for(i=0;i<b.length;i++) o+=('0'+b[i].toString(16)).slice(-2);return o}
function unhexName(x){try{var a=[],i;for(i=0;i<x.length;i+=2) a.push(parseInt(x.substr(i,2),16));return new TextDecoder().decode(new Uint8Array(a)).slice(0,80)}catch(e){return ''}}
document.addEventListener('input',function(e){var t=e.target;if(t&&t.id==='guestCustom'){S.customName=t.value;S.previewGuest=t.value.trim();renderCard();save()}});
function parseRun(){
  return String(S.rundown||'').split('\n').map(function(l){return l.trim()}).filter(Boolean).slice(0,10).map(function(l){
    var m=/^(\d{1,2}[.:]\d{2}(?:\s*[-\u2013]\s*(?:\d{1,2}[.:]\d{2}|selesai))?)\s+(.+)$/i.exec(l);
    return m?{t:m[1].replace(/:/g,'.'),x:m[2]}:{t:'',x:l};
  });
}
function startGuest(){
  document.body.classList.add('guest');
  try{document.title=S.title||'Undangan'}catch(e){}
  $('#cvTitle').textContent=S.title||'Undangan';
  $('#cvName').textContent=S.previewGuest||'Bapak/Ibu/Saudara/i';
  $('#cover').hidden=false;
  renderCard(true);
  initExtras();
  renderCal();renderMusic();
  var gr=$('#gRibbon');if(gr) gr.hidden=false;
}
function playIntro(){
  var el=$('#intro');if(!el) return;
  var reduce=false,seen=false;
  try{reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  try{seen=sessionStorage.getItem('ajak-intro')==='1'}catch(e){}
  if(reduce||seen) return;
  try{sessionStorage.setItem('ajak-intro','1')}catch(e){}
  el.hidden=false;document.body.classList.add('intro-on');
  var done=false;
  function end(){
    if(done) return;done=true;
    el.classList.add('out');
    document.body.classList.remove('intro-on');
    document.body.classList.add('enter');
    setTimeout(function(){el.hidden=true;document.body.classList.remove('enter')},1000);
  }
  el.addEventListener('click',end);
  setTimeout(end,3200);
}
function startEditor(){
  playIntro();
  document.body.classList.add('owner');
  var rb=$('#roleBadge');if(rb) rb.hidden=false;
  syncForm();renderTypes();renderStyles();refresh();renderCard(true);initExtras();setTab('acara');renderPhotos();verifyServer();
}
function applyInv(){
  var qd=INV.d;
  Object.keys(S).forEach(function(k){ if(k in qd && typeof qd[k]===typeof S[k] && qd[k]!==null) S[k]=qd[k]; });
  if(!TYPES[S.type]) S.type='nikah';
  if(!STYLES.some(function(x){return x.id===S.style})) S.style='zamrud';
  if(['WIB','WITA','WIT'].indexOf(S.tz)<0) S.tz='WIB';
  var tm=/^t(\d{1,3})$/.exec((location.hash||'').replace(/^#/,''));
  var nmh=/^n-([0-9a-f]{2,700})$/.exec((location.hash||'').replace(/^#/,''));
  S.previewGuest=(tm&&INV.g&&INV.g[Number(tm[1])-1])?String(INV.g[Number(tm[1])-1]).slice(0,80):(nmh&&nmh[1].length%2===0?unhexName(nmh[1]):'');
  GUESTMODE=true;
}
function roleOwner(){
  return new Promise(function(res){
    var done=false;function fin(v){if(!done){done=true;res(!!v)}}
    setTimeout(function(){fin(false)},12000);
    try{
      if(!window.claude||!window.claude.use){fin(false);return}
      window.claude.use('user').then(function(u){
        if(!u){fin(false);return}
        return u.isOwner().then(fin);
      }).catch(function(){fin(false)});
    }catch(e){fin(false)}
  });
}
function pubState(t){var e=$('#pubState');if(e) e.textContent=t||''}
var lastSig=null,autoT=null;
function sigNow(){return JSON.stringify({d:inviteData(),g:guests().map(function(g){return g.name})})}
function autoSync(){
  if(!SERVERMODE||GUESTMODE||!S.serverCode) return;
  clearTimeout(autoT);
  autoT=setTimeout(function(){if(sigNow()!==lastSig) publishServer(true)},1500);
}
function autoFirst(){
  if(SERVERMODE&&!GUESTMODE&&!S.serverCode) publishServer(true);
}
function hhmm(){var d=new Date();return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}
function publishServer(auto){
  var btn=$('#pubInv');
  var names=guests().map(function(g){return g.name});
  var code=S.serverCode;
  var sig=sigNow();
  if(auto) pubState('Menyimpan otomatis...');
  return fetch(code?'/api/undangan/'+code:'/api/undangan',{
    method:code?'PUT':'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({data:inviteData(),guests:names,kunci:S.serverKey})
  }).then(function(r){return r.json().then(function(j){return {ok:r.ok,status:r.status,j:j}})}).then(function(res){
    if(!res.ok){
      if(code&&(res.status===404||res.status===403)){S.serverCode='';S.serverKey='';return publishServer(auto)}
      throw {code:'server'};
    }
    S.serverCode=res.j.kode;
    if(res.j.kunci) S.serverKey=res.j.kunci;
    S.hostUrl=location.origin+'/u/'+S.serverCode;
    lastSig=sig;
    save();syncForm();refresh();
    if(btn) btn.disabled=false;
    pubState(auto?'Tersimpan otomatis pukul '+hhmm()+'. Tautan sudah siap dikirim.':'Undangan diterbitkan. Tautan sudah siap dikirim.');
  }).catch(function(){
    if(btn) btn.disabled=false;
    pubState('Gagal menyimpan ke server. Pastikan server Starvite berjalan.');
  });
}
function publishInv(){
  var art=null,btn=$('#pubInv');
  if(!(window.claude&&window.claude.use)){ if(btn) btn.disabled=true; pubState('Menyimpan ke server...'); publishServer(); return; }
  if(btn) btn.disabled=true;
  pubState('Menerbitkan undangan...');
  var p;
  try{ p=window.claude&&window.claude.use?window.claude.use('artifact'):Promise.resolve(null) }catch(e){ p=Promise.resolve(null) }
  p.then(function(a){
    if(!a) throw {code:'none'};
    art=a;
    return fetch(location.href.split('#')[0],{cache:'no-store'});
  }).then(function(r){
    if(!r.ok) throw {code:'fetch'};
    return r.text();
  }).then(function(html){
    if(!/^\s*<!doctype/i.test(html)) throw {code:'fetch'};
    var json=JSON.stringify({d:inviteData(),g:guests().map(function(g){return g.name})}).replace(/</g,'\\u003c');
    var re=/(<script id="inv-data" type="application\/json">)[\s\S]*?(<\/script>)/;
    if(!re.test(html)) throw {code:'fetch'};
    html=html.replace(re,function(m,a,b){return a+json+b});
    return art.publish(html);
  }).then(function(){
    pubState('Undangan diterbitkan. Halaman akan dimuat ulang.');
  }).catch(function(e){
    if(btn) btn.disabled=false;
    var c=e&&e.code;
    if(c==='not_writer'||c==='not_granted') pubState('Hanya pemilik halaman yang bisa menerbitkan.');
    else if(c==='conflict') pubState('');
    else if(c==='none'||c==='fetch'||c==='capability_disabled'||c==='not_declared') pubState('Penerbitan otomatis tidak tersedia di sini. Pakai cara lain di bawah.');
    else pubState('Gagal menerbitkan. Coba lagi sebentar lagi.');
  });
}
if(GUESTMODE){ startGuest(); }
else if(INV){
  document.body.classList.add('wait');
  roleOwner().then(function(owner){
    document.body.classList.remove('wait');
    if(owner){ startEditor(); }
    else{ applyInv(); startGuest(); }
  });
}else{ startEditor(); }
})();