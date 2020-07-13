class View{
     
     constructor(idEvento){
         
         //this._idEvento = idEvento;
         this._salaActive = $("#salaActive");
         this._programacao = $("#programacao");
         this._scroll = $("#scroll");
         this._listaSalas = $("#listaSalas");
         this._listaExpositores = $("#listaExpositores");
         this._alertaRetorno = $("#alertaRetorno");
         this._loginaovivo = $("section.login-aovivo");

         let url_string = window.location.href;
         let url = new URL(url_string);
         let c = url.searchParams.get("c");
         console.log("URL ID: "+c);

         this._idEvento = c;

     }
      

     carregamento(){
     	console.log("EXIBINDO CARREGAMENTO");
     	this._alertaRetorno.html(`<p style="text-align: center;">
             <img src="images/icone.png" class="ld ld-bounce" alt="BeautyConnect" style="width:62px;margin-top:32px;animation-duration: 0.65s;">
           </p>
           <p style="text-align: center;font-size: 14px;">
             Carregando
           </p>`);
     }
     


     login(evento){
        
        console.log("INICIANDO LOGIN...");
        evento.preventDefault();
     	this.carregamento();        

     	var email = $("#emailLogin").val();
      localStorage.setItem("emailLogado",email);

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
                     localStorage.setItem("aovivo_expositores",JSON.stringify(dados.aovivo_expositores));
                     localStorage.setItem("logadoAoVivo","sim");

                     $(".whatsapp").html(`
                        
                        <a href="https://api.whatsapp.com/send?l=pt_BR&phone=55${dados.evento[0].whatsapp_suporte}&text=Olá estou precisando de ajuda sobre o evento ${dados.evento[0].nome}" title="Tire suas dúvidas no Whatsapp" target="_blank">
                          <img src="images/whatsapp-logo-1-e1524582800686.png" alt="Whatsapp Canal de atendimento">
                        </a>

                     `);

                     localStorage.setItem("whatsapp_suporte",dados.evento[0].whatsapp_suporte);
                     

                     $("#salaActive").html(`

                         <h2>${dados.aovivo[0].nome_sala}</h2>
                         <a href="javascript:void(0)" onclick="app.verSala(${dados.aovivo[0].id})" title="ASSISTIR PALESTRA AO VIVO">
                            ASSISTIR PALESTRA AO VIVO
                         </a>


                      `);

                     $("#programacao").html(`

                          <h2 class="titulo">Programação - ${dados.aovivo[0].nome_sala}</h2>
                          <div class="scroll" id="scroll">
                             
                             ${dados.aovivo[0].programacao}

                          </div>

                      `);


                     $("#listaSalas").html("");

                     for(var i=1;i<dados.aovivo.length;i++){
                       
                       $("#listaSalas").append(`
                            
                              <!-- SALA -->
                              <div class="sala">
                                 <h2>${dados.aovivo[i].nome_sala}</h2>
                                 <a href="javascript:void(0)" onclick="app.verSala(${dados.aovivo[i].id})" title="${dados.aovivo[i].nome_sala}">
                                    ${dados.aovivo[i].tema}
                                 </a>
                              </div>
                              <!-- SALA -->

                       `);

                     }


                     $("#listaExpositores").html();

                     for(var i = 0;i<dados.aovivo_expositores.length;i++){

                      $("#listaExpositores").append(`
                           
                           <!-- EXPOSITOR -->
                           <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 expositor">
                              <div class="logo-expositor" style="background:url('https://beautyconnect.com.br/cdn/${dados.aovivo_expositores[i].logo}') transparent no-repeat;background-size: 200px auto;background-position: center center;">
                                 &nbsp;
                              </div>
                              <p>
                                <a href="${dados.aovivo_expositores[i].url_apresentacao}" title="Apresentação" class="btn btn-default" target="_blank">
                                  APRESENTAÇÃO
                                </a>
                              </p>
                              <p>
                                <a href="${dados.aovivo_expositores[i].url_atendimento}" title="Atendimento" class="btn btn-default" target="_blank">
                                  ATENDIMENTO
                                </a>
                              </p>
                           </div>
                           <!-- EXPOSITOR -->

                      `);

                     }


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


     recarregarEvento(){

           console.log("RECARREGANDO EVENTO");
           
           let evento = JSON.parse(localStorage.getItem("evento"));
           let aovivo = JSON.parse(localStorage.getItem("aovivo"));
           let aovivo_expositores = JSON.parse(localStorage.getItem("aovivo_expositores"));

           $(".whatsapp").html(`
                        
                        <a href="https://api.whatsapp.com/send?l=pt_BR&phone=55${evento[0].whatsapp_suporte}&text=Olá estou precisando de ajuda sobre o evento ${evento[0].nome}" title="Tire suas dúvidas no Whatsapp" target="_blank">
                          <img src="images/whatsapp-logo-1-e1524582800686.png" alt="Whatsapp Canal de atendimento">
                        </a>

                     `);

                    

                     $("#salaActive").html(`

                         <h2>${aovivo[0].nome_sala}</h2>
                         <a href="javascript:void(0)" onclick="app.verSala(${aovivo[0].id})" title="ASSISTIR PALESTRA AO VIVO">
                            ASSISTIR PALESTRA AO VIVO
                         </a>


                      `);

                     $("#programacao").html(`

                          <h2 class="titulo">Programação - ${aovivo[0].nome_sala}</h2>
                          <div class="scroll" id="scroll">
                             
                             ${aovivo[0].programacao}

                          </div>

                      `);


                     $("#listaSalas").html("");

                     for(var i=1;i<aovivo.length;i++){
                       
                       $("#listaSalas").append(`
                            
                              <!-- SALA -->
                              <div class="sala">
                                 <h2>${aovivo[i].nome_sala}</h2>
                                 <a href="javascript:void(0)" onclick="app.verSala(${aovivo[i].id})" title="${aovivo[i].nome_sala}">
                                    ${aovivo[i].tema}
                                 </a>
                              </div>
                              <!-- SALA -->

                       `);

                     }


                     $("#listaExpositores").html();

                     for(var i = 0;i<aovivo_expositores.length;i++){

                      $("#listaExpositores").append(`
                           
                           <!-- EXPOSITOR -->
                           <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 expositor">
                              <div class="logo-expositor" style="background:url('https://beautyconnect.com.br/cdn/${aovivo_expositores[i].logo}') transparent no-repeat;background-size: 200px auto;background-position: center center;">
                                 &nbsp;
                              </div>
                              <p>
                                <a href="${aovivo_expositores[i].url_apresentacao}" title="Apresentação" class="btn btn-default" target="_blank">
                                  APRESENTAÇÃO
                                </a>
                              </p>
                              <p>
                                <a href="${aovivo_expositores[i].url_atendimento}" title="Atendimento" class="btn btn-default" target="_blank">
                                  ATENDIMENTO
                                </a>
                              </p>
                           </div>
                           <!-- EXPOSITOR -->

                      `);

                     }

     }



     verSala(idConteudo){
         
         console.log("INICIANDO MÉTODO PARA VER SALA: "+idConteudo);
         location.href="aovivo.html?c="+idConteudo;
     
     }


     ativarPreviewSala(idConteudo){

         console.log("INICIANDO MÉTODO PARA VER PREVIEW DA SALA"+idConteudo);

         let conteudos = JSON.parse(localStorage.getItem("aovivo"));
         
         console.log("CONTEÚDO SALVO:");
         console.log(conteudos);

         for(var i = 0;i<conteudos.length;i++){
              
              if(conteudos[i].id==idConteudo){

                   $("#salaActive").html(`
                         <h2>${conteudos[i].nome_sala}</h2>
                         <a href="javascript:void(0)" onclick="app.verSala(${conteudos[i].id})" title="ASSISTIR PALESTRA AO VIVO">
                            ASSISTIR PALESTRA AO VIVO
                         </a>
                    `);

                   $("#programacao").html(`
                          <h2 class="titulo">Programação - ${conteudos[i].nome_sala}</h2>
                          <div class="scroll" id="scroll">
                             ${conteudos[i].programacao}
                          </div>
                   `);

              }

         }
                      

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