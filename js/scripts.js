// INITIALIZE
let app = new View(localStorage.getItem("aovivoIdEvento"));
$("#loginform").submit();
localStorage.setItem("logadoAoVivo","sim");

        /*
if(localStorage.getItem("logadoAoVivo")=="sim"){
          
          console.log("USUÁRIO LOGADO");
          app._loginaovivo.fadeOut(500);
          app.resetLogin();

          setTimeout("app.recarregarEvento();",2500);


}
*/

/* ABRIR OU FECHAR O MENU SIDE */
function fecharSideMenu(){
   $(".menu-side").css("right","-370px");
}

function abrirSideMenu(){
   $(".menu-side").css("right","0px");
}

/* ABRIR OU FECHAR O MENU DE LOGIN */
function fecharModalLogin(){
    $(".modal-login").fadeOut("500");
}
function abrirModalLogin(){
    $(".modal-login").fadeIn("500");
}

// PARALLAX DO BANNER PRINCIPAL
$("#container").mousemove(function(e) {
  parallaxIt(e, "#slide", -50);
  parallaxIt(e, ".background", -30);
});

$("#container2").mousemove(function(e) {
  parallaxIt2(e, "#slide2", -63);
});

function parallaxIt(e, target, movement) {
  var $this = $("#container");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 1, {
    x: (relX - $this.width() / 2) / $this.width() * movement,
    y: (relY - $this.height() / 2) / $this.height() * movement
  });
}
function parallaxIt2(e, target, movement) {
  var $this = $("#container2");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 1, {
    x: (relX - $this.width() / 2) / $this.width() * movement,
    y: (relY - $this.height() / 2) / $this.height() * movement
  });
}


// DESABILITAR O PAUSE ON HOVER
$('.carousel').carousel({
    pause: "false"
});


