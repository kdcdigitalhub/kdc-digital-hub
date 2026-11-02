// KDC DIGITAL HUB — interações do catálogo (dados de demonstração)
const categories = [
  ["Desenvolvimento Pessoal","✦"],["Negócios e Empreendedorismo","▣"],["Tecnologia e Programação","⌘"],["Educação e Ensino","⌂"],
  ["Literatura e Ficção","❖"],["Romance","♡"],["História","◷"],["Saúde e Bem-estar","✚"],
  ["Finanças e Investimentos","◇"],["Marketing Digital","◎"],["Religião e Espiritualidade","☼"],["Direito","§"],
  ["Ciências","⚛"],["Psicologia","◉"],["Biografias","♙"],["Infantil e Juvenil","☆"]
];

const books = [
  {id:1,title:"A Arte de Recomeçar",author:"KDC Editorial",category:"Desenvolvimento Pessoal",description:"Uma leitura sobre disciplina, autoconhecimento e a coragem de construir novos caminhos. Um guia introdutório para transformar intenção em ação.",price:0,date:"2026-10-28",pages:128,format:"PDF",colors:["#59417d","#a78bfa"],tag:"DESTAQUE",keywords:"hábitos motivação mudança"},
  {id:2,title:"Mentalidade Empreendedora",author:"Equipa KDC",category:"Negócios e Empreendedorismo",description:"Princípios essenciais para identificar oportunidades, estruturar ideias e compreender os desafios de iniciar um negócio.",price:2500,date:"2026-10-25",pages:164,format:"PDF",colors:["#633f2d","#b47b52"],tag:"NOVO",keywords:"negócio empresa liderança"},
  {id:3,title:"O Universo da Tecnologia",author:"KDC Editorial",category:"Tecnologia e Programação",description:"Uma introdução acessível ao mundo digital, à programação e às tecnologias que estão a transformar a sociedade.",price:0,date:"2026-10-22",pages:96,format:"PDF",colors:["#163d79","#3984e9"],tag:"GRATUITO",keywords:"informática digital programação"},
  {id:4,title:"Histórias que nos Formam",author:"Biblioteca KDC",category:"Literatura e Ficção",description:"Uma coletânea demonstrativa de narrativas sobre escolhas, identidade, memória e a complexidade das relações humanas.",price:1800,date:"2026-10-19",pages:142,format:"PDF",colors:["#6b2d46","#c16a8a"],tag:"POPULAR",keywords:"romance contos ficção"},
  {id:5,title:"Aprender para Ensinar",author:"KDC Educação",category:"Educação e Ensino",description:"Reflexões práticas sobre aprendizagem, organização do estudo e estratégias para tornar o ensino mais significativo.",price:0,date:"2026-10-15",pages:110,format:"PDF",colors:["#365b50","#82b8a1"],tag:"GRATUITO",keywords:"escola pedagogia ensino"},
  {id:6,title:"Finanças em Perspetiva",author:"KDC Editorial",category:"Finanças e Investimentos",description:"Conceitos básicos de orçamento, poupança e planeamento financeiro apresentados de forma simples e educativa.",price:2200,date:"2026-10-12",pages:132,format:"PDF",colors:["#283e37","#81a88b"],tag:"NOVO",keywords:"dinheiro poupança orçamento"},
  {id:7,title:"Psicologia do Quotidiano",author:"Biblioteca KDC",category:"Psicologia",description:"Uma introdução a conceitos da psicologia que ajudam a compreender comportamentos, emoções e relações no dia a dia.",price:1500,date:"2026-10-08",pages:118,format:"PDF",colors:["#594a70","#a999c9"],tag:"",keywords:"mente emoções comportamento"},
  {id:8,title:"Marketing na Era Digital",author:"KDC Digital",category:"Marketing Digital",description:"Conheça fundamentos de comunicação online, conteúdo, posicionamento de marca e relacionamento com públicos digitais.",price:0,date:"2026-10-02",pages:104,format:"PDF",colors:["#1c4770","#4f9ac4"],tag:"GRATUITO",keywords:"redes sociais publicidade marca"}
];

const bookGrid = document.getElementById("bookGrid");
const categoryGrid = document.getElementById("categoryGrid");
const categoryFilter = document.getElementById("categoryFilter");
const catalogSearch = document.getElementById("catalogSearch");
const sortFilter = document.getElementById("sortFilter");
const catalogCount = document.getElementById("catalogCount");
const resultsMessage = document.getElementById("resultsMessage");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("bookDialog");
const dialogContent = document.getElementById("dialogContent");
const toast = document.getElementById("toast");
let activeCategory = "";
let favorites = JSON.parse(localStorage.getItem("kdc-favorites") || "[]");

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function money(value) { return value === 0 ? "Gratuito" : `${value.toLocaleString("pt-PT")} Kz`; }
function makeCover(book, extraClass="") {
  return `<div class="cover-art ${extraClass}" style="background:linear-gradient(145deg,${book.colors[0]},${book.colors[1]})"><span class="cover-kicker">KDC DIGITAL HUB</span><span class="cover-title">${escapeHTML(book.title)}</span><span class="cover-author">${escapeHTML(book.author)}</span><i class="cover-shape"></i></div>`;
}
function showToast(message) {
  toast.textContent = message; toast.classList.add("show");
  clearTimeout(showToast.timer); showToast.timer = setTimeout(()=>toast.classList.remove("show"),2400);
}
function renderCategories() {
  categoryGrid.innerHTML = categories.map(([name,icon]) => `
    <button class="category-card ${activeCategory===name?"active":""}" data-category="${escapeHTML(name)}">
      <span class="category-icon">${icon}</span><span>${escapeHTML(name)}</span>
    </button>`).join("");
  categoryFilter.innerHTML = `<option value="">Todas as categorias</option>` + categories.map(([name])=>`<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join("");
  categoryFilter.value = activeCategory;
}
function getFilteredBooks() {
  const term = catalogSearch.value.trim().toLocaleLowerCase("pt");
  let result = books.filter(book => {
    const matchesCategory = !activeCategory || book.category === activeCategory;
    const haystack = `${book.title} ${book.author} ${book.category} ${book.description} ${book.keywords}`.toLocaleLowerCase("pt");
    return matchesCategory && (!term || haystack.includes(term));
  });
  if(sortFilter.value==="title") result.sort((a,b)=>a.title.localeCompare(b.title,"pt"));
  if(sortFilter.value==="newest") result.sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(sortFilter.value==="price") result.sort((a,b)=>a.price-b.price);
  return result;
}
function renderBooks() {
  const result = getFilteredBooks();
  catalogCount.textContent = `${result.length} ${result.length===1?"livro disponível":"livros disponíveis"}`;
  resultsMessage.textContent = activeCategory ? `Categoria: ${activeCategory}` : "A mostrar resultados da biblioteca";
  bookGrid.innerHTML = result.map(book => `
    <article class="book-card">
      <button class="favorite-button ${favorites.includes(book.id)?"saved":""}" data-favorite="${book.id}" aria-label="Adicionar ${escapeHTML(book.title)} aos favoritos">${favorites.includes(book.id)?"♥":"♡"}</button>
      <div class="book-cover">${makeCover(book)}</div>
      <div class="book-meta"><span class="book-category">${escapeHTML(book.category)}</span><h3>${escapeHTML(book.title)}</h3><p class="book-author">${escapeHTML(book.author)}</p>
        <div class="book-bottom"><span class="book-price ${book.price===0?"free-label":""}">${money(book.price)}</span><button class="details-button" data-details="${book.id}">Ver detalhes ↗</button></div>
      </div>
    </article>`).join("");
  emptyState.classList.toggle("hidden", result.length!==0);
  bookGrid.classList.toggle("hidden", result.length===0);
}
function setCategory(name) {
  activeCategory = activeCategory===name ? "" : name;
  renderCategories(); renderBooks();
  document.getElementById("biblioteca").scrollIntoView({behavior:"smooth"});
}
function openBook(id) {
  const book = books.find(item=>item.id===Number(id)); if(!book) return;
  dialogContent.innerHTML = `<div class="dialog-layout">
    <div class="dialog-cover" style="background:linear-gradient(145deg,${book.colors[0]},${book.colors[1]})"><span class="cover-kicker">KDC DIGITAL HUB</span><span class="cover-title">${escapeHTML(book.title)}</span><span class="cover-author">${escapeHTML(book.author)}</span></div>
    <div class="dialog-info"><span class="book-category">${escapeHTML(book.category)}</span><h2>${escapeHTML(book.title)}</h2><div class="book-author">Por ${escapeHTML(book.author)}</div><p>${escapeHTML(book.description)}</p><p><b>Formato:</b> ${book.format}<br><b>Páginas:</b> ${book.pages}<br><b>Publicado:</b> ${new Date(book.date+"T12:00:00").toLocaleDateString("pt-PT")}</p><strong>${money(book.price)}</strong><br><button class="button button-primary" id="demoAction">${book.price===0?"Solicitar acesso gratuito":"Comprar eBook"} →</button></div>
  </div>`;
  dialog.showModal();
  document.getElementById("demoAction").addEventListener("click",()=>showToast("Demonstração: a compra e o download serão ativados após integração do backend."));
}
function clearAll() {
  activeCategory=""; catalogSearch.value=""; categoryFilter.value=""; sortFilter.value="featured";
  renderCategories(); renderBooks();
}
categoryGrid.addEventListener("click",e=>{const button=e.target.closest("[data-category]");if(button)setCategory(button.dataset.category);});
bookGrid.addEventListener("click",e=>{
  const fav=e.target.closest("[data-favorite]");
  const detail=e.target.closest("[data-details]");
  if(fav){const id=Number(fav.dataset.favorite);favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];localStorage.setItem("kdc-favorites",JSON.stringify(favorites));renderBooks();showToast(favorites.includes(id)?"Livro guardado nos favoritos.":"Livro removido dos favoritos.");}
  if(detail)openBook(detail.dataset.details);
});
catalogSearch.addEventListener("input",renderBooks);
categoryFilter.addEventListener("change",()=>{activeCategory=categoryFilter.value;renderCategories();renderBooks();});
sortFilter.addEventListener("change",renderBooks);
document.getElementById("clearFilters").addEventListener("click",clearAll);
document.getElementById("emptyClear").addEventListener("click",clearAll);
document.getElementById("heroSearch").addEventListener("submit",e=>{e.preventDefault();catalogSearch.value=document.getElementById("heroSearchInput").value;renderBooks();document.getElementById("biblioteca").scrollIntoView({behavior:"smooth"});});
document.getElementById("dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
const menuToggle=document.getElementById("menuToggle"),mainNav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.textContent=open?"×":"☰";});
mainNav.addEventListener("click",e=>{if(e.target.closest("a")){mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.textContent="☰";}});
document.getElementById("year").textContent=new Date().getFullYear();
renderCategories();renderBooks();
