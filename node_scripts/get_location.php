<?php

$file = file_get_contents('data.json');

//load in the data from the file

$data = json_decode($file, true);

$first , $second, $third = array("lattitude" => 0,"longitude" => 0,"time" => 0,"amplitude" => 0);

foreach($data as $key => $value) {
    $element = json_decode($value, true);
    $amp = $element["amplitude"];
    if($first["amplitude"] < $amp) {
        $third = $second;
        $second = $first;
        $first = $element;
    }

    elseif($second["amplitude"] < $amp) {
        $third = $second;
        $second = $element;
    }

    elseif($third["amplitude"] < $amp) {
        $third = $element;
    }
}
echo $first;
echo $second;
echo $third;

// define the points
$A = [$first["lattitude"],$first["longitude"]];
$B = [$second["lattitude"],$second["longitude"]];
$C = [$third["lattitude"],$third["longitude"]];
$times = [$first["time"],$second["time"],$third["time"]];

// step one! calculate relative distances between time
$time_ab = $times[0] / ($times[0] + $times[1]);
$time_bc = $times[1] / ($times[1] + $times[2]);
$time_ca = $times[2] / ($times[2] + $times[0]);
// echo $time_bc;
// step two! calculate the equations for the lines
$eq_ab = [($B[1] - $A[1]) / ($B[0] - $A[0]), (($B[1] - $A[1]) / ($B[0] - $A[0])) * -1 * $A[0] + $A[1]];
$eq_bc = [($C[1] - $B[1]) / ($C[0] - $B[0]), (($C[1] - $B[1]) / ($C[0] - $B[0])) * -1 * $B[0] + $B[1]];
$eq_ca = [($A[1] - $C[1]) / ($A[0] - $C[0]), (($A[1] - $C[1]) / ($A[0] - $C[0])) * -1 * $C[0] + $C[1]];

// echo json_encode($eq_bc);
 // echo json_encode($eq_ca);
// step three! calculate the points on that line
$ab_x = ($B[0] - $A[0]) * $time_ab + $A[0];
$bc_x = ($C[0] - $B[0]) * $time_bc + $B[0];
$ca_x = ($A[0] - $C[0]) * $time_ca + $C[0];
 // echo $ab_x;
// echo $bc_x;
// echo $ca_x


//step four!

$ab_y = $eq_ab[0] * $ab_x + $eq_ab[1];
$bc_y = $eq_bc[0] * $bc_x + $eq_bc[1];
$ca_y = $eq_ca[0] * $ca_x + $eq_ca[1];

// echo $bc_y;
// echo "<br>";
// echo $bc_y;
//echo $ca_y;
$ab_yp = [(-1/$eq_ab[0]),(-1/$eq_ab[0]*(-$ab_x)) + $ab_y];
$bc_yp = [(-1/$eq_bc[0]),(-1/$eq_bc[0]*(-$bc_x)) + $bc_y];
$ca_yp = [(-1/$eq_ca[0]),(-1/$eq_ca[0]*(-$ca_x)) + $ca_y];

// echo json_encode($b_yp);
//step 5: set lines equal to each other :D

$abp_bcp_x = ($ab_yp[1] - $bc_yp[1])/($bc_yp[0] - $ab_yp[0]);
$bcp_cap_x = ($bc_yp[1] - $ca_yp[1])/($ca_yp[0] - $bc_yp[0]);
$cap_abp_x = ($ca_yp[1] - $ab_yp[1])/($ab_yp[0] - $ca_yp[0]);

$abp_bcp_y = $abp_bcp_x * ($ab_yp[0] + $ab_yp[1]);
$bcp_cap_y = $bcp_cap_x * ($bc_yp[0] + $bc_yp[1]);
$cap_abp_y = $cap_abp_x * ($ca_yp[0] + $ca_yp[1]);

$final_x = ($abp_bcp_x + $bcp_cap_x + $cap_abp_x)/3;
$final_y = ($abp_bcp_y + $bcp_cap_y + $cap_abp_y)/3;

echo json_encode([$final_x, $final_y]);


?>