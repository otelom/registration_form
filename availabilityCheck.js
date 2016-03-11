/**
 * @author Otelo Magalhães
 * @copyright 2016
 *
 * Description:
	This file is where I validate the syntax of the inputed email
	as well as I check for it's availability in the database.
 */
	 
$(document).ready(function() {  
		
		var checking_db = 'A verificar disponibilidade...';  
		
		// This function is called when email is being written
		$('#email').keyup(function(){  
				// This is my email RegEx
		var validEmail = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", "i");
		// If the email doesn't match the RegEx then it's marked as invalid
		if (false == validEmail.test($('#email').val())) {
			$('#email_availability_result').html('Email inválido!');
			document.getElementById("email_availability_result").className = "myerror";
			document.getElementById("email").style.borderColor = "red";
			document.getElementById("confirm_email").disabled = true;
		// but if it matches, then we have to check for it's availability.
		}else{  
			document.getElementById("email").style.borderColor = "yellow";
			$('#email_availability_result').html(checking_db); 
			document.getElementById("email_availability_result").className = "mywarning";
			check_availability();  
		}  
		});  
	});  
		
	//function to check email availability  
	function check_availability(){  
		//get the email  
		var email = $('#email').val();  

		// Here I use ajax to run the check
		$.post("checkEmail.php", { email: email },  
			function(result){  
				// if the result tells me that it's available I present that to the user.
				if(result == 'available'){  
					$('#email_availability_result').html('\''+ email + '\' está disponível.');  
					document.getElementById("email_availability_result").className = "myok";
					document.getElementById("email").style.borderColor = "green";
					document.getElementById("confirm_email").disabled = false;
				// if it already exists I show that message.
				}else if (result == 'existent email'){  
					//show that the email is NOT available  
					$('#email_availability_result').html('\''+ email + '\' já existe.');  
					document.getElementById("email_availability_result").className = "myerror";
					document.getElementById("email").style.borderColor = "red";
					document.getElementById("confirm_email").disabled = true;
				}
				// and if there's a connection problem, the user is also notified.
				else{
				 $('#email_availability_result').html('Erro de ligação à base de dados.');  
				 document.getElementById("email_availability_result").className = "myerror";
				 document.getElementById("email").style.borderColor = "red";
				 document.getElementById("confirm_email").disabled = true;
				}
			}
		);  
}  