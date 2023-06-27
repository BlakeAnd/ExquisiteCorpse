const queryString = window.location.search;

console.log("joining", typeof(queryString), queryString);

let pair_id = queryString.substring(1, 7)
let canvas_selection = queryString.substring(8, 14)
console.log("id", pair_id, "canv", canvas_selection);

localStorage.setItem("pair_id", pair_id);
localStorage.setItem("canvas_selection", canvas_selection);
localStorage.setItem("player_status", "joining"); 

if(document.referrer.length > 0){
  window.location.assign(`https://drawexquisitecorpse.netlify.com/remotedraw`);
}
else{
  window.location.assign(`file:///D:/Blake/Documents/Moved%20Docs/Git/ExquisiteCorpseProject/ExquisiteCorpse/remotedraw.html`);
}
