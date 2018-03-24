<?php
	function retrieve_write($lat, $long, $time, $probability){


		$assoc_array = array("lattitude"=>$lat, "longitude"=> $long, "time"=>$time, "probability"=>$probability);
		// echo $arr;
		$json_arr = json_encode($assoc_array);
		$json_arr = '[' . $json_arr . ']';
		echo $json_arr;
		$json = $_POST['json'];

		$file = fopen('data.json','w+');
		fwrite($file, $json_arr);
		fclose($file);
	}
	retrieve_write(71.0000, 89.23434, "2:00pm", [0,1,2,3,4]);
?>s