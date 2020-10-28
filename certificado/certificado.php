<?php

$certificado      = "Aqui o hash";
$data_certificado = "Aqui a data";
$curso            = "Aqui o curso";
       


          $nome_curso    = "Nome do curso";
          $carga_horaria = "Carga horária";
          $resumo        = "Resumo do curso";

     
       $nome_aluno = $_GET["nome"];
       
       // CONVERTER A DATA E HORA PARA UM FORMATO "HUMAM FRIEND'LY" = 2018-03-29 00:40:56
       
       $hora_final = "DATA EVENTO";

// GERANDO NOVO PDF 
$stylesheet = file_get_contents('pdf.css');
$parcial = '<br><img src="certificado.png" style="width:100%;height:auto;" />';

$parcial = $parcial."<p>&nbsp;</p><h1><strong style='font-size:36px;color:#000;display:block;margin-bottom:25px;'>".$nome_aluno."</strong><br> participou do Beauty Summit 360 Digital 2020, com conteúdo <br>direcionado à saúde estética, ciência, gestão e inovação, <br>que aconteceu nos dias <strong>18 e 19 de julho</strong> <br>com carga horária de <strong>16 horas</strong>.</h1><p>&nbsp;</p>";

$parcial = $parcial."<p style='text-align:right;'><img src='assinatura.png' style='margin-right:45px;margin-top:35px;' /></p>";

$parcial = $parcial."<p>&nbsp;</p>";

$parcial = $parcial."";

$parcial = $parcial."</div>";

//$parcial = $parcial."<img src='logo.png' style='width:100%;' />";

//echo $parcial;



  //require("/pdf/MPDF57/mpdf.php");
  require("pdf6/mpdf.php");

  // IMPRIMIR NA TELA

  $mpdf=new mPDF();

  $mpdf->SetWatermarkImage("fundo.png");

  $mpdf->showWatermarkImage = true;
     
  $mpdf->WriteHTML($stylesheet,1);
 
  $mpdf->WriteHTML($parcial,2);
              
  $mpdf->Output();
 
  exit();

?>