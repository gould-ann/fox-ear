<?php
		
	function find_node($node){
		$file = file_get_contents('nodes_to_xy.json');

		$data = json_decode($file, true);

		unset($file);//prevent memory leaks for large json.;
		// echo $data;
		// echo json_encode($data[$node]);
		return json_encode($data[$node]);
		// echo "$data[$node]";
	}

	//creates json file based off of provided latitude longitude time and amp
	//url encode amplitude with 'amp' 
	function retrieve_write($node, $time, $amplitude){

		// open the current file
		$file = file_get_contents('data.json');
		//load in the data from the file
		$data = json_decode($file, true);


		// get the lat and long from the node name
		$lat_long = json_decode(find_node($node), true);

		// add in the new data to the old data
		$data[$node] = array("lattitude"=>$lat_long["latitude"], "longitude"=> $lat_long["logitude"], "time"=>$time, "amplitude"=>$amplitude);
		// echo $arr;
		$json_arr = json_encode($data);
		$json_arr = $json_arr;
		echo $json_arr;
		$json = $_POST['json'];

		$file = fopen('data.json','w+');
		fwrite($file, $json_arr);
		fclose($file);
	}
	$node = $_GET["node"];
	$time = $_GET["time"];
	$amplitude = $_GET["amp"];
	retrieve_write($node, $time, $amplitude);
?>