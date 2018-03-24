<?php
	//creates json file based off of provided latitude longitude time and amp
	//url encode amplitude with 'amp' 
	function retrieve_write($lat, $long, $time, $amplitude){
		$assoc_array = array("lattitude"=>$lat, "longitude"=> $long, "time"=>$time, "amplitude"=>$amplitude);
		// echo $arr;
		$json_arr = json_encode($assoc_array);
		$json_arr = $json_arr;
		echo $json_arr;
		$json = $_POST['json'];

		$file = fopen('data.json','w+');
		fwrite($file, $json_arr);
		fclose($file);
	}
	$lat = $_GET["lat"];
	$long = $_GET["long"];
	$time = $_GET["time"];
	$amplitude = $_GET["amp"];
?>