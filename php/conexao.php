<?php
    $nome = $_POST['nome'];
    $laboratorio = $_POST['laboratorio'];
    $opcao1 = $_POST['mouse'];
    $opcao2 = $_POST['monitor'];
    $opcao3 = $_POST['internet'];
    $opcao4 = $_POST['teclado'];
    $opcao5 = $_POST['som'];

    include_once("inserir.php");

    $sql = "INSERT INTO dados VALUES ";
    $sql .= "('$nome', '$laboratorio', '$mouse', '$teclado', '$internet', '$teclado', '$som')";

    mysqli_query($conexao, $sql) or die ("ERRO AO TENTAR CADASTRAR O QUIZ");
    mysqli_close($conexao);

    header("Location: /relatorio/loading.html");

?>