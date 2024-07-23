$(document).ready(function() {
    var isValid = false;
    var NameRegex = /^[a-zA-Z.'-]+$/;
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  
    $('#form').submit(function(e) {
      e.preventDefault(); // Prevent default form submission
      isValid = validateFields($('#Name').val(), $('#email').val(), $('#pwd').val());
      if (isValid) {
        // Store the values in local storage
        localStorage.setItem("Name", $('#Name').val());
        localStorage.setItem("email", $('#email').val());
        localStorage.setItem("password", $('#pwd').val());
        window.location.href = "landing.html";
      }
    });
  
    // Call the validation functions when the fields are blurred
    $("#Name").blur(function() {
      validateName($(this));
    });
    $("#email").blur(function() {
      validateEmail($(this));
    });
    $("#pwd").blur(function() {
      validatePwd($(this));
    });
  
    // Define the validation functions
    function validateFields(name, email, password) {
      isValid = true;
      if (!validateName(name)) {
        isValid = false;
      }
      if (!validateEmail(email)) {
        isValid = false;
      }
      if (!validatePwd(password)) {
        isValid = false;
      }
      return isValid;
    }
  
    function validateName() {
        var name = $("#Name")[0].value;
        if (!NameRegex.test(name)) {
          $("#Name").addClass('is-invalid');
          $('#invalidName').text('*Name is invalid');
          return false;
        } else {
          $("#Name").removeClass('is-invalid');
          $("#Name").addClass('is-valid');
          $('#invalidName').text('');
          return true;
        }
      }
      
      function validateEmail() {
        var email = $("#email")[0].value;
        if (!emailRegex.test(email)) {
          $("#email").addClass('is-invalid');
          $('#invalidEmail').text('*Please Enter a valid email address');
          return false;
        } else {
          $("#email").removeClass('is-invalid');
          $("#email").addClass('is-valid');
          $('#invalidEmail').text('');
          return true;
        }
      }
      
      function validatePwd() {
        var password = $("#pwd")[0].value;
        if (!passwordRegex.test(password)) {
          $("#pwd").addClass('is-invalid');
          $('#invalidPwd').text('*Use at least 8 characters,at least one uppercase, one lowercase and number');
          return false;
        } else {
          $("#pwd").removeClass('is-invalid');
          $("#pwd").addClass('is-valid');
          $('#invalidPwd').text('');
          return true;
        }
      }

      $("#SignInForm").submit((e) => {
      e.preventDefault();
      if (!validateForm()) {
          $("#UsernameOrEmail").addClass("is-invalid");
          $("#invalidInput").text("Please fill out the required field");
      }else{
          $('#SignInForm').get(0).submit();
      }
      });

      function validateForm() {
      const usernameOrEmailValue = $("#UsernameOrEmail").val().trim();
      if (usernameOrEmailValue === "") {
          return false;
      }
      return true;
      }

      if (localStorage.getItem("email")) {
          const storedEmail = localStorage.getItem("email");
          $("#UsernameOrEmail").val(storedEmail);
      }
          
    });