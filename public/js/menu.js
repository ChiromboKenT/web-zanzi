//select 
const open = document.querySelector(".menu");
const close= document.querySelector(".close");
const sidebar = document.querySelector(".sidebar");
const header = document.querySelector(".header");
const eventButton = document.querySelector(".event-button");

open.addEventListener("click", ()=>{
   sidebar.classList.add("sidebar-show");
   header.classList.add("header-active");


   //Show Close
  close.classList.add("active");
  while(open.classList.contains("active")){
   open.classList.remove("active");
   }

})
eventButton.addEventListener("click", ()=>{
   if(!eventButton.classList.contains("act")){
      sidebar.classList.add("sidebar-show");
      header.classList.add("header-active");


      //Show Close
      close.classList.add("active");
      while(open.classList.contains("active")){
         open.classList.remove("active");
      }
   }

})
close.addEventListener("click",(c)=>{
   sidebar.classList.remove("sidebar-show");
   header.classList.remove("header-active")

   //show open
   open.classList.add("active");
   while(close.classList.contains("active")){
      close.classList.remove("active");
   }
   while(eventButton.classList.contains("act")){
      eventButton.classList.remove("act");
   }

})



