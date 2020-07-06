class View{
     
     constructor(idEvento){
         
         this._idEvento = idEvento;
         this._salaActive = $("#salaActive");
         this._programacao = $("#programacao");
         this._scroll = $("#scroll");
         this._listaSalas = $("#listaSalas");
         this._listaExpositores = $("#listaExpositores");
         this._alertaRetorno = $("#alertaRetorno");
         this._loginaovivo = $("section.login-aovivo");

     }
      

     carregamento(){
     	console.log("EXIBINDO CARREGAMENTO");
     	this._alertaRetorno.html(`<div class="loader loader--style2" title="1"> <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/> </path> </svg> </div>`);
     }
     


     login(evento){
        
        console.log("INICIANDO LOGIN...");
        evento.preventDefault();
     	this.carregamento();        

     	var email = $("#emailLogin").val();
     	var scopo = this;

     	console.log("E-MAIL DE LOGIN: "+email);

     	      // INICIO CHAMADA AJAX
              var request = $.ajax({
                  method: "POST",
                  url: "https://beautyconnect.com.br/api/aovivo-autenticacao.php",
                  data:{email:email,idEvento:this._idEvento}
              })
              request.done(function (dados) {            
                  console.log("%c RETORNO DADOS LOGIN","background:#ff0000;color:#fff;");
                  console.log(dados);

                  if(dados.sucesso==200){
                  	 scopo.loginSucesso();
                  	 localStorage.setItem("evento",JSON.stringify(dados.evento));
                  	 localStorage.setItem("aovivo",JSON.stringify(dados.aovivo));
                  }else{
                  	scopo.loginInvalido();
                  }
                  
              });
              request.fail(function (dados) {
                   console.log("API NÃO DISPONÍVEL (login -> View)");
                   scopo.loginErro();
              });
              // FINAL CHAMADA AJAX

     }

     loginSucesso(){
     
     	this._loginaovivo.fadeOut(500);
     	this.resetLogin();
     
     }

     loginInvalido(){

     	    this._alertaRetorno.html(`
                   <div class="alert alert-danger" role="alert">
		               E-mail não encontrado! Verifique as informações inseridas e tente novamente.
		          </div>
        	`);



     }
     
     loginErro(){

            this._alertaRetorno.html(`
                   <div class="alert alert-danger" role="alert">
		               Nossos servidores estão indisponíveis, tente novamente.
		          </div>
        	`);
        	
     }
     
     resetLogin(){

     	this._alertaRetorno.html("");
     
     }

    

}