<?php

	/**
	 * @author Otelo Magalhães
	 * @copyright 2016
	 *
	 * Description:
		This file is responsible for checking the availability of given emails.
		A query is executed to the database and the answer is sent back to JS.
	 */

	// I'm including the file with all my db connection variables.
	include 'connection.php';

	// here I define the email variable.
	$email = $_POST['email'];

	// Create connection to the database.
	$conn = new mysqli($servername, $db_username, $db_password, $dbname);
	// Check connection and show any possible errors.
	if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
	} 

	// prepare and bind - To note that by doing this I'm preventing SQL injection.
	$stmt =$conn->prepare("SELECT email FROM users WHERE email = ? LIMIT 1");
	$stmt->bind_param("s", $email);


	// execute the query as well deal with any possible errors.
	$stmt->execute();
	echo $stmt->error;

	// send the response to JS.
	if ($stmt->fetch()){
		echo "existent email";
	}else{
			echo "available";
	}
	// close statement and db connection.
	$stmt->close();
	$conn->close();
?>