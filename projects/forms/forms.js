document.getElementById('myForm').addEventListener('submit',function(event) {
            event.preventDefault();

            const fullname = document.getElementById('fname').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('pass').value.trim();
            const ageValue = document.getElementById('age').value.trim();
            const age = Number(ageValue);
            
            if (!fullname) {
                alert("Please enter your full name.");
                return;
            }

            if (!email) {
                alert("Please enter your email.");
                return;
            }
            
            if (!password) {
                alert("Please enter your password.");
                return;
            }

            if (!ageValue || isNaN(age) || age < 18) {
                alert("You need to be at least 18.");
                return;
            }

            const formElement = event.target;
            const fd = new FormData(formElement);

            const formDataObj = {};
            fd.forEach((value, key) => {
                if (key in formDataObj) {
                    if (Array.isArray(formDataObj[key])) {
                        formDataObj[key].push(value);
                    } else {
                        formDataObj[key] = [formDataObj[key], value];
                    }
                } else {
                    formDataObj[key] = value;
                }
            });

            console.log(formDataObj);

            const xhr = new XMLHttpRequest();
            xhr.open("GET", "submit.json", true);
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        console.log(response);
                        
                        document.getElementById('message').innerText = response.message;

                        const formEl = document.getElementById('myForm');
                        formEl.reset();
                        formEl.style.display = 'none';   
                    } else {
                        alert("Error submitting form.");
                    }
                }
            };

            xhr.send(JSON.stringify(formDataObj));
    });