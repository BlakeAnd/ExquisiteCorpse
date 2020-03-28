let canvas_selection = ".";

function selectedRandom() {
  let rand = Math.random();
  if (rand < 0.5){
    selectedTop();
  } 
  else {
    selectedBottom();
  }
}

function selectedTop() {
  canvas_selection = "top";
  // window.location.assign(`https://drawexquisitecorpse.netlify.com/remotedraw`);
  history.pushState({
    id: 'homepage'
}, 'Home | My App', 'https://drawexquisitecorpse.netlify.com/remotedraw');
}

function selectedBottom() {
  canvas_selection = "bottom";
  window.location.assign(`https://drawexquisitecorpse.netlify.com/remotedraw`);
}
