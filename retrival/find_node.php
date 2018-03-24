
<?php
	function find_node($node){
		$file = file_get_contents('nodes_to_xy.json');

		$data = json_decode($file, true);

		unset($file);//prevent memory leaks for large json.;
		// echo $data;
		echo json_encode($data[$node]);
		// echo "$data[$node]";
	}

	find_node($_GET["node"]);

?>