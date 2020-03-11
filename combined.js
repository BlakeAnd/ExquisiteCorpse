//convert to use data passed from a backend

function combine_canvases () {
  var can3 = document.getElementById('canvas3');
  var ctx3 = can3.getContext('2d'); 


  context = canvas.getContext('2d');
  context2 = canvas2.getContext('2d');
 
  ctx3.drawImage(canvas, 0, 270);
  ctx3.drawImage(canvas2, 0, 0);

    
  var imageData = ctx3.getImageData(0, 0, 400, 600);
  console.log(imageData.data.length);
  //examine every pixel, 
  //change any old rgb to the new-rgb
  for (var i = 430000; i < 434000; i += 4) { 
      // is this pixel the old rgb?
      if (125 < imageData.data[i + 3] && imageData.data[i + 3] < 135) {
          imageData.data[i + 3] = 0;
      } 
  }
  for (var i = 478000; i < 482000; i += 4) { 
    // is this pixel the old rgb?
    if (125 < imageData.data[i + 3] && imageData.data[i + 3] < 135) {
        imageData.data[i + 3] = 0;
    } 
}
  ctx3.putImageData(imageData, 0, 0);
  // put the re-colored image back on the image
  // var img1 = document.getElementById("image1");
  // img1.src = c.toDataURL('image/png');
}