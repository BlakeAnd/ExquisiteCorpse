const queryString = window.location.search;

console.log("joining", typeof(queryString), queryString);

let pair_id = queryString.substring(1, 7)
let canvas_selection = queryString.substring(7, 12)
console.log("id", pair_id, "canv", canvas_selection);
localStorage.setItem();
