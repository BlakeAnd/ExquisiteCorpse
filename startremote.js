let canvas = ".";

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
  canvas = "top";
  window.location.assign(`https://drawexquisitecorpse.netlify.com/remotedraw`);
}

function selectedBottom() {
  canvas = "bottom";
  window.location.assign(`https://drawexquisitecorpse.netlify.com/remotedraw`);
}

