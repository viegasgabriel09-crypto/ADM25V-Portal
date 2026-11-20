const KEY="adm25v-portal-v2";
const initial={
 activities:[
  {date:"25/11/2026",title:"Prova de Matemática",text:"Geometria: cilindro, pirâmide, prisma e cubo."},
  {date:"27/11/2026",title:"Trabalho de Administração",text:"Entrega conforme orientação da professora."},
  {date:"02/12/2026",title:"Seminário de Sociologia",text:"Preparação e apresentação do grupo."}
 ],
 notices:[
  {date:"20/11/2026",title:"Conteúdo da prova de Matemática",text:"Confira os conteúdos no material da disciplina."},
  {date:"20/11/2026",title:"Organização da semana",text:"Acompanhe o cronograma para não perder as atividades."},
  {date:"20/11/2026",title:"Portal ADM25V",text:"Este é o novo portal da turma."}
 ],
 files:[]
};
let data;
try{data=JSON.parse(localStorage.getItem(KEY))||structuredClone(initial)}catch(e){data=structuredClone(initial)}

function render(){
 document.getElementById("activityCount").textContent=data.activities.length;
 document.getElementById("noticeCount").textContent=data.notices.length;
 document.getElementById("fileCount").textContent=data.files.length;
 document.getElementById("activities").innerHTML=data.activities.map(a=>`<article class="card"><div class="date">${a.date}</div><h3>${a.title}</h3><p>${a.text}</p></article>`).join("");
 document.getElementById("notices").innerHTML=data.notices.map(a=>`<article class="card"><div class="date">${a.date}</div><h3>${a.title}</h3><p>${a.text}</p></article>`).join("");
 document.getElementById("files").innerHTML=data.files.length?data.files.map((f,i)=>`<div class="file"><div>📄 <strong>${f.name}</strong></div><a href="${f.url}" target="_blank" rel="noopener">Abrir PDF</a></div>`).join(""):"<p style='margin-top:18px'>Nenhum PDF adicionado ainda.</p>";
 localStorage.setItem(KEY,JSON.stringify(data));
}
function addPdf(e){
 const file=e.target.files[0]; if(!file)return;
 if(file.type!=="application/pdf"){alert("Escolha um arquivo PDF.");return}
 const reader=new FileReader();
 reader.onload=()=>{data.files.unshift({name:file.name,url:reader.result});render();alert("PDF adicionado com sucesso!");e.target.value=""};
 reader.readAsDataURL(file);
}
function searchPortal(){
 const q=document.getElementById("search").value.toLowerCase().trim();
 document.querySelectorAll(".card").forEach(c=>c.style.display=!q||c.textContent.toLowerCase().includes(q)?"":"none");
}
render();