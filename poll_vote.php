<?php
$record = file_get_contents("php://input");


     $test = getallheaders();
	 $flag=false;
    if ( array_key_exists('HttpHeaderForm', $test) ) {
		$flag=true;
	}
	if($flag==false){
		echo 'inValidRequest';    
		exit();		
	}
/*$servername = "localhost:3307";	
$username = "root";
$password = "";//"sandy3180";
$dbname = "dervansp_id606597_sport_database";
*/
$servername = "localhost";
$username = "dervansp";
$password = "sandy3180";
$dbname = "dervansp_id606597_sport_database";


$conn = new mysqli($servername, $username, $password,$dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$record=json_decode($record);
$vote=$record->record->partidetails;
$games=$record->record->games;
$tm=$record->record->tm;
$amt=$record->record->amt;
$type=$record->record->type;
$sql =  "INSERT INTO `PARTICIPANT`(`PART_ID`, `FNAME`, `MNAME`, `LNAME`, `DOB`, `AGE`, `SCHOOL`, `ADDRESS_LINE1`, `ADDRESS_LINE2`, `STATE`, `CITY`, `PINCODE`, `SCHOOL_ADDRESS_LINE1`, `SCHOOL_ADDRESS_LINE2`, `SCHOOL_STATE`, `SCHOOL_CITY`, `SCHOOL_PINCODE`, `GENDER`, `PHONE`, `EMER_PHONE`, `EMAIL_ID`,`bankDetails`,`paymentdate`,`bloodgroup`,`identitynumber`,`identitytype`) VALUES (null,'".$vote->firstname."','".$vote->middlename."','".$vote->lastname."','".$vote->dob."','".$vote->age."','".$vote->nameOfSchoolOrClub."','".$vote->addr1."','".$vote->addr2."','".$vote->state."','".$vote->city."','".$vote->pincode."','".$vote->addressOfSchoolOrClub."','".$vote->address2OfSchoolOrClub."','".$vote->schoolstate."','".$vote->schoolcity."','".$vote->schoolpincode."','".$vote->gender."','".$vote->contactno."','".$vote->alternativeno."','".$vote->email."','".$vote->bankDetails."','".$vote->paymentdate."','".$vote->bloodgroup."','".$vote->identitynumber."','".$vote->identitytype."')";
if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
	if($type == 'ind'){
		foreach($games as $key => $jsons) {
			$sql1 =  "INSERT INTO `PARTI_GAME`(`PARTI_GAME_ID`, `PART_ID`, `GAME_ID`) VALUES (null,".$last_id.",".$jsons->eventid.")";
			if ($conn->query($sql1) === TRUE) {
			
			}else {
			
			}
		}
	}else {
		$sql1 = "INSERT INTO `team`(`TEAM_NAME`, `TEAM_SCHOOL`, `TEAM_SCHOOL_ADD1`, `TEAM_SCHOOL_ADD2`, `TEAM_SCHOOL_CITY`, `TEAM_SCHOOL_STATE`, `TEAM_SCHOOL_PINCODE`, `CAPTAIN_PART_ID`) VALUES ('".$vote->nameOfSchoolOrClub."','','".$vote->addressOfSchoolOrClub."','','".$vote->schoolcity."','".$vote->schoolstate."','".$vote->pincode."',".$last_id.")"
		if ($conn->query($sql1) === TRUE) {
			$team_id = $conn->insert_id;
			foreach($tm as $key => $jsons) {
				$sql2 =  "INSERT INTO `PARTICIPANT`(`PART_ID`, `FNAME`, `MNAME`, `LNAME`, `DOB`, `AGE`, `SCHOOL`, `ADDRESS_LINE1`, `ADDRESS_LINE2`, `STATE`, `CITY`, `PINCODE`, `SCHOOL_ADDRESS_LINE1`, `SCHOOL_ADDRESS_LINE2`, `SCHOOL_STATE`, `SCHOOL_CITY`, `SCHOOL_PINCODE`, `GENDER`, `PHONE`, `EMER_PHONE`, `EMAIL_ID`,`bankDetails`,`paymentdate`,`bloodgroup`,`identitynumber`,`identitytype`) VALUES (null,'".$jsons->firstname."','".$jsons->middlename."','".$jsons->lastname."','".$jsons->dob."','','','".$jsons->addr1."','','".$jsons->state."','".$jsons->city."','".$jsons->pincode."','','','','','','','".$jsons->contactno."','".$jsons->alternativeno."','".$jsons->email."','','','".$jsons->bloodgroup."','','')";	
				if ($conn->query($sql2) === TRUE) {
					$id = $conn->insert_id;
					$sql3="INSERT INTO `TEAM_PARTI`(`TEAM_ID`, `PART_ID`) VALUES (".$team_id.",".$id.")";
					if ($conn->query($sql3) === TRUE) {
			
					}else {
			
					}
				}else {
					
				}
			}
			foreach($games as $key => $jsons) {
				$sql4 = "INSERT INTO `TEAM_GAME`(`TEAM_ID`, `GAME_ID`) VALUES (".team_id.",".$jsons->eventid.")";
				if ($conn->query($sql4) === TRUE) {
			
				}else {
			
				}
			}
			
		}else {
			
		}
	}
	
	/*foreach($tm as $key => $jsons) {
	$sql2 =  "INSERT INTO `teammember`(`part_id`, `firstname`, `lastname`, `dob`, `contactno`, `alternativeno`, `email`) VALUES (".$last_id.",'".$jsons->firstname."','".$jsons->lastname."','".$jsons->dob."','".$jsons->contactno."','".$jsons->alternativeno."','".$jsons->email."')";

		if ($conn->query($sql2) === TRUE) {
			
		}else {
			
		}
	}*/
	if($vote->contactno!=""){
	$user = "gulshankhubnani";
	$apikey = "fYgae0FETGS2Qts76cks"; 
	$senderid  =  "MYTEXT"; 
	$mobile  =  $vote->contactno; 
	
	$message   =  "Dear ".$vote->firstname.",\n Thank you very much for the Enrollment in Dervan Youth Game 2018. Your Permanent Registration Number(PRN) with SVJCT is ".$last_id." Kindly Pay Rs ".$amt." towards entry fee vefire 15/02/2018. For more information, Please Contact SVJCT @ 123456789"; 
	$message = urlencode($message);
	$type   =  "txt";

	$ch = curl_init("http://smshorizon.co.in/api/sendsms.php?user=".$user."&apikey=".$apikey."&mobile=".$mobile."&senderid=".$senderid."&message=".$message."&type=".$type.""); 
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);      
    curl_close($ch); 
	
	}
    echo $last_id;
} else {
    echo '-1';
}


$conn->close();
?>
