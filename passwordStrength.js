/**
 * @author Otelo Magalhães
 * @copyright 2016
 * 
 * Description:
	This file has only one function that displays password strength
	based on length, special characters, numbers and case.
	Strength levels include too short, weak, medium and strong.
	Only passwords from level weak to strong are accepted.
 */

$(document).ready(function() {

	$('#password').keyup(function(e) {
		// strong requires a password longer then 8 chars including one upper case, one lower case, one number and a symbol.
		 var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
		 // medium requires a password longer then 6 chars including either one number or an upper and a lower case.
		 var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		 // week requires at least 6 chars.
		 // if it doesn't meet any of the above then the pw is too small
		 // and therefore cannot be used as password.
		 var enoughRegex = new RegExp("(?=.{6,}).*", "g");
		 
		 //the following if statement will test the inputed password against those regex
		 //and update strength bar and the text displayed to the end user accordingly.
		 if (false == enoughRegex.test($(this).val())) {
				 $('#passstrength').html('Password demasaido pequena!');
				 document.getElementById("passstrength").className = 'myerror';
				 document.getElementById("password").style.borderColor = "red";
				 document.getElementById("pwbar").className = 'bar25';
				 document.getElementById("confirm_password").disabled = true;
				 $('#pwbartext').html('25%');
		 } else if (strongRegex.test($(this).val())) {
				 document.getElementById("passstrength").className = 'myok';
				 document.getElementById("password").style.borderColor = "green";
				 $('#passstrength').html('Password Forte!');
				 document.getElementById("pwbar").className = 'bar100';
				 $('#pwbartext').html('100%');
				 document.getElementById("confirm_password").disabled = false;
		 } else if (mediumRegex.test($(this).val())) {
				 document.getElementById("passstrength").className = 'mywarning';
				 document.getElementById("password").style.borderColor = "green";
				 $('#passstrength').html('Password Média!');
				 document.getElementById("pwbar").className = 'bar75';
				 $('#pwbartext').html('75%');
				 document.getElementById("confirm_password").disabled = false;
		 } else {
				 document.getElementById("passstrength").className = 'mywarning';
				 document.getElementById("pwbar").className = 'bar50';
				 $('#passstrength').html('Password Fraca!');
				 document.getElementById("password").style.borderColor = "green";
				 $('#pwbartext').html('50%');
				 document.getElementById("confirm_password").disabled = false;
			}
	});
});