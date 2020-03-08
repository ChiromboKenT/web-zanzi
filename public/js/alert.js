const form = document.querySelector(".form");

form.addEventListener("submit", ()=>{
   Swal.fire({
      title: 'Thank You for Submitting, Shorai Chirombo will Contact you as soon as possible',
      width: 600,
      padding: '3em',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.7)
        left top
        no-repeat
      `
    }).then(function() {
      window.location = "/";
  });
})