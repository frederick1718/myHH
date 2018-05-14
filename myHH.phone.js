document.addEventListener("DOMContentLoaded", ()=> {
  let pages = /^\//[Symbol.replace](window.location.pathname, "").split(/\.|\//);
  if(myHH.hasOwnProperty(pages[0])) myHH[pages[0]](pages);
  myHH.general(pages);
});
