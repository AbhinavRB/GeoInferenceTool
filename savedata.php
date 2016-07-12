<?php
	if(!empty($_POST['data'])){
		$data = $_POST['data'];
		$filedata = fopen('parameters.txt', "w");
		fwrite($filedata, $data)
	}
	$res = shell_exec("python main.py 2>&1");

?>