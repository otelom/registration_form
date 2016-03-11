/**
 * @author Otelo Magalhães
 * @copyright 2016
 * 
 * Description:
	This file is the one that performs all the validation of the form data.
	It's dividid in 3 sections:
	1 - Flags - used to enable/disable the submit button.
	2 - Handlers - call functions when fields are eddited.
	3 - Functions - perfom the actual validations.
 */

$(document).ready(function() {

	// This is where I define all my flags,
	// this flags will tell me if the submit button
	// can or cannot be enabled anytime a change occurs.
	var fEmail = false;
	var fPw = false;
	var fFname = false;
	var fLname = false;
	var fAddress = true;
	var fCity = true;
	var fphone = true;
	var fNif = true;
	var fPostalCode = true;


	/* ################################################################################################# */
	/*										             	HANDLERS																												 */
	/* ################################################################################################# */
	
	// This function clears the confirm_password field everytime
	// the password field is changed.
	 $('#password').keyup(function(){
		document.getElementById('confirm_password').value = ('');
	});
	
	// This function calls validatePassword everytime confirm_password field is changed.
	 $('#confirm_password').keyup(function(){  
		validatePassword();
	});
	
	// This function clears the confirm_field field everytime
	// the email field is changed.
	 $('#email').on("change", function(){  
	 document.getElementById('confirm_email').value = ('');
	 });
	
	// This function calls validateEmail everytime confirm_email field is changed.
	 $('#confirm_email').keyup(function(){  
		validateEmail();
	});
	
	// This function calls validadeOnlyText everytime first_name field is changed.
	 $('#first_name').keyup(function(){  
		validateOnlyText("first_name");
	});
	
	// This function calls validadeOnlyText everytime last_name field is changed.
	 $('#last_name').keyup(function(){  
		validateOnlyText("last_name");
	});
	
	// This function calls validadeOnlyText everytime city field is changed.
	 $('#city').keyup(function(){  
		validateOnlyText("city");
	});
	
	// This function calls validadeNIF everytime nif field is changed.
	 $('#nif').keyup(function(){  
		validateNIF();
	});
	
	// This function calls validadePhone everytime phone field is changed.
	// This field has 2 events because I decided to show in realtime the
	// validation but only change '+' to '00' after field losing focus.
	 $('#phone').keyup(function(){  
		validatePhone();
	});
	
	// This function calls validadePhone everytime phone field is changed and
	// replaces '+' for '00' since they mean the same and in that way we can store it in the db as int.
	 $('#phone').on('change', function(){  
		document.getElementById("phone").value = document.getElementById("phone").value.replace("+", "00");
		validatePhone();
	});
	
	// This function calls validadePhone everytime country field is changed.
	// This happens because phone validation takes in consideration the selected country.
	 $('#country').on('change', function(){  
		validatePhone();
	});
	
	// This function calls validatPostalCode everytime postal code field is changed.
	 $('#postal_code').keyup(function(){  
		validatePostalCode();
	});
	
	/* ################################################################################################# */
	/*																	     FUNCTIONS												 													 */
	/* ################################################################################################# */
	
	// This function verifies if password and confirm_password are
	// the same as well as makes sure they're not too short.
	function validatePassword() {
		//if passwords differ or if confirm_password is null then show error
		if (($('#password').val() != $('#confirm_password').val()) || ($('#confirm_password').val().length == 0 )) {
			document.getElementById("confirm_password").style.borderColor = "red";
			fPw = false;
		// if both passwords are the same and if they meet the minimum security of 6 char (weak level), accept.
		}else if ($('#password').val().length >=6) {
			document.getElementById("confirm_password").style.borderColor = "green";
			fPw = true;
		}			
		//otherwise, deny.
		else {
			document.getElementById("confirm_password").style.borderColor = "red";
			document.getElementById("password").style.borderColor = "red";
			fPw = false;
		}
		btnSubmit();
	};	
	
	// This function verifies if email and confirm_email are the same
	function validateEmail() {
		//if emails differ and if confirm_email is null then show error
		if (($('#email').val() != $('#confirm_email').val()) || ($('#confirm_email').val().length == 0 )) {
			document.getElementById("confirm_email").style.borderColor = "red";
			fEmail = false;
		//otherwise, show good
		} else {
				document.getElementById("confirm_email").style.borderColor = "green";
				fEmail = true;
		}
		btnSubmit();
	};	

	// This function tests if the data inserted is text only.
	function validateOnlyText(e) {
		//this is a regex I made to accepts only text.
		var onlyText = new RegExp("^[^0-9,._!\"#$%&/()=?@´`~^+*]+$", "mg"); 
		//this is the value of the object we're checking (e.g. first_name)
		var value = document.getElementById(e).value;
		
		// if value doesn't match regex or is null
		if (false == onlyText.test(value) || value.length == 0) {
			// if it's city and it's null, accept it
			if(e=='city' && value.length==0){
				document.getElementById(e).style.borderColor = "#cccccc";
				updateTextFlags(e,true);
			// if it's not city then fails
			}else{
			document.getElementById(e).style.borderColor = "red";
			updateTextFlags(e,false);
			}
		//otherwise we're good.
		}else{  
			document.getElementById(e).style.borderColor = "green";
			updateTextFlags(e,true);
		}  
	};  	
	
	// This function is used to update the flags that let the btnSubmit() function do it's job.
	// This is only used for the text only fields (first name, last name and city).
	function updateTextFlags(e,result) {
		switch(e) {
			case "city":
				fCity = result;
				break;
			case "first_name":
				fFname = result;
				break;
			default:
				fLname = result;
		}
		btnSubmit();
	};
				
	// This function checks if a given number has only 9 digits.
	function validate9digits(e) {
		//this regex accepts only numbers with 9 digits.
		var only9digits = new RegExp("^[0-9 ]{9}$");
		
		if (false == only9digits.test(e)) {
			return 0;
		}else{  
			return 1;
		}  
	};  	
	
	// This function validates the nif's field.
	// This is an optional field.
	// The number is tested to see if it matches the 9 digit regex.
	// Since many of the verifications are very similar, please refer
	// to validatePhone() and/or to validatePostalCode() functions for a
	// better explanation/understanding of the code.
	function validateNIF() {
		var value = document.getElementById("nif").value;
		if (value!=''){
			// if nif doesn't have exactly 9 digits
			if (false == validate9digits(value)) {
				document.getElementById("nif").style.borderColor = "red";
				fNif = false;
			// otherwise it's good
			}else{  
				document.getElementById("nif").style.borderColor = "green";
				fNif = true;
			}  
		}else{
			document.getElementById("nif").style.borderColor = "#cccccc";
			fNif = true;
		}
		btnSubmit();
	};  	
	
	// This function validates the phone field.
	// To do that this function also checks what country did the user selected because
	// if the country selected was Portugal then only portuguese numbers will be accepted.
	// If other country was selected this function will assume that any 9 digit number is
	// correct and any other number of digits is marked as yellow letting the user know that
	// validation is inconclusive. 
	// This is the intended behaviour since I only care to validate portuguese numbers.
	function validatePhone() {
		// here I set my two variables, the phone value and a boolean for Portugal.
		var value = document.getElementById("phone").value;
		var pt = (document.getElementById("country").value == "PT") ? 1 : 0;
		//This field is also optional so it needs to be marked as correct it it's empty.
		if (value!=''){
			if	(pt){
				//var onlyPTnumbers = new RegExp("^(((((00|\\+)351){0})|(((00|\\+)351){1}))((9(1|2|3|6))|(2|3)[0-9])[0-9]{7})$", "m");
				var onlyPTnumbers = new RegExp("^(((((00|\\+)351){0,1})((9(1|2|3|6))|(2|3)[0-9])[0-9]{7}))*$", "m");
				
				if (onlyPTnumbers.test(value)){
					document.getElementById("phone").style.borderColor = "green";
					fphone = true;
				}
				// invalid number
				else{
					document.getElementById("phone").style.borderColor = "red";
					fphone = false;
				}
			// if not from Portugal
			}else {
				if (validate9digits(value)){
					document.getElementById("phone").style.borderColor = "green";
					fphone = true;
				}else {
					document.getElementById("phone").style.borderColor = "yellow";	
					fphone = true;
				}
			}
		// if not filled mark as ok
		}else{
			document.getElementById("phone").style.borderColor = "#cccccc";
			fphone = true;
		}
		btnSubmit();
	};
	
	// This function validates the postal code field.
	function validatePostalCode() {
		// I storing the given postal code in a variable for easy access.
		var value = document.getElementById("postal_code").value;
		//this regex accepts only data of the the following kind: XXXX-XXX where X must be a digit.
		var zip = new RegExp("^[0-9]{4}-[0-9]{3}$", "m");
		//Since this is an optional field, if it's not filled by the user
		// it should be marked as valid in order to allow the submit button to enable.
		if (value!=''){
			//if it wasn't correctly filled in, turns red indicating error.
			if (false == zip.test(value)) {
				fPostalCode = false;
				document.getElementById("postal_code").style.borderColor = "red";
			//if it was correctly filled in, then shows green, indicating success.
			}else{  
				fPostalCode = true;
				document.getElementById("postal_code").style.borderColor = "green";
			}
		//if it wasn't filled and since this is an optional field,
		// then allow it to continue by marking it as correct.
		}else{
			fPostalCode = true;
			document.getElementById("postal_code").style.borderColor = "#cccccc";
		}
	btnSubmit();
	}
	
	// This function is called by all the others because this is where
	// I update the submit button status. This function checks is all fields have valid
	// data and only enables the button iff ALL fields report valid.
	function btnSubmit() {
		
		if (fEmail && fPw && fFname && fLname && fAddress && fCity && fphone && fNif && fPostalCode){
			document.getElementById("btnSubmit").disabled = false;
			document.getElementById("btnSubmit").className = "btn-lg btn-primary";
		}else{
			document.getElementById("btnSubmit").disabled = true;
			document.getElementById("btnSubmit").className = "disabled";
		}
	}
});