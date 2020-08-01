function combine_canvases () {
  let combined_canvas = document.getElementById('combined_canvas');
  let combined_context = combined_canvas.getContext('2d'); 


  context = canvas.getContext('2d');

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageData.data.length);
  var JSON_img_data = JSON.stringify(imageData);
  // console.log(JSON_img_data);
    // console.log(JSON_img_data);

  //   // var ctx3 = can3.getContext('2d'); 

  let combinedImageData = combined_context.getImageData(0,0, 4, 6);


  let pair_id = localStorage.getItem("pair_id");
  let selected_canvas = localStorage.getItem("canvas_selection");

  let data = {
    img_data: imageData,
    selected_canvas: selected_canvas,
    pair_id: pair_id
  }
  console.log("data sent:", data)
  
  let deployed = "https://drawexquisitecorpse.herokuapp.com";
  let local = "http://localhost:5000";
  let url = local;
  axios({
    method: 'post',
    url: `${url}/drawings`,
    data: data
  })
    .then( res => {
      console.log("res!", res);
      let combined_data = Uint8ClampedArray.from(res.data[0].image_data.data);
      combinedImageData.data.set(combined_data);
      console.log("combined", combined_data);
      if(combined_data.length === 0){
        window.location.assign(`https://drawexquisitecorpse.netlify.com/waiting`);
      }
      combined_context.putImageData(combinedImageData, 0, 0);
    })
    .catch( err => {
      console.log("err!", err);
    })

    // combined_context.drawImage(res., 0, 600);

}