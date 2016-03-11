<?php

	/**
	 * @author Otelo Magalhães
	 * @copyright 2016
	 * 
	 * Description: 
		This server.php receives the information from the form and sends it to the databse.
		This file is protected against direct access throwing a <400 - Bad Request> error if someone tries to access this file
		directly from the browser without having all the required data being sent correctly.
		The connection to the db is also escaped to make sure no injection can be made through it.
	 */

	// Here, I'm checking if all the essential variables were passed from the html to guarantee security and data integrity,
	//	if not, the user is redirected to a 400 bad request error page that I created for this purpose.
	if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['first_name']) && isset($_POST['last_name'])){
		
	}  else{
		header("Location: bad_request.htm");
	}

	// I'm including the file with all my db connection variables.
	include 'connection.php';

	// defining variables 
	$email = $_POST['email'];
	$password = $_POST['password'];
	$first_name = $_POST['first_name'];
	$last_name = $_POST['last_name'];

	// defining variables but making sure that none of the optional ones is null
	// and changing any nulls for an empty string to avoid errors of undefined variables later.
	$address = isset($_POST['address'])? $_POST['address'] : '';
	$postal_code = isset($_POST['postal_code'])? $_POST['postal_code'] : '';
	$city = isset($_POST['city'])? $_POST['city'] : '';
	$country = isset($_POST['country'])? $_POST['country'] : '';
	$nif = isset($_POST['nif'])? $_POST['nif'] : '';
	$phone = isset($_POST['phone'])? $_POST['phone'] : '';


// Here I create the connection to the db using the variables that I imported earlier from another file.

	$conn = new mysqli($servername, $db_username, $db_password, $dbname);
	// I check the connection and if any error comes up , I'll echo it and kill the connection.
	if ($conn->connect_error) {
		echo "Connection failed: ", utf8_encode($conn->connect_error);
		die();
	}


	// Here is where I prepare the query and bind the variables.
	// Using prepared statements allows me not to worry about sql injection because it already escapes everything.
	if ($stmt = $conn->prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")){
	$stmt->bind_param("ssssssssii", $email, $password, $first_name, $last_name, $address, $postal_code, $city, $country, $nif, $phone);

	// Here I execute the sql query.
	$stmt->execute();
	}else 
	{
	//	printf("Connect failed: %s\n", $conn->connect_error);
		die("Errormessage: ".$conn->connect_error ." ". $conn->error);
	}	
	// Here is where I show the result to the user
	// If there's any error I'll print it out, giving any aditional details about the cause of failure, if no errors were found,
	// a success message is printed. For either, I use html with a little bit of style to show it.
	if ($stmt->error != ''){
		echo "<h1 style='color:red; font-weight: bold;'>ERRO</h1>";
		echo ('<p>'.$stmt->error);
	}else{
		echo "<h1 style='Color:green'>OK</h1>";
		echo ("<p>Utilizador criado com sucesso.");
	}

	// To end, I close the statement and the connection to the database.
	$stmt->close();
	$conn->close();

?>
