document.getElementById('myForm').addEventListener('submit',function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            const ageValue = document.getElementById('age').value.trim();
            const age = Number(ageValue);
            const season = document.getElementById('season').value;
            const fromDate = document.getElementById('from').value;
            const toDate = document.getElementById('to').value;
            const location = document.getElementById('location').value.trim();
            
            const festivalPref = document.querySelector('input[name="preference"]:checked');
            const travelStyle = document.querySelector('input[name="travelType"]:checked');

            if (!festivalPref) {
                alert("Please choose your festival preference.");
                return;
            }

            if (!travelStyle) {
                alert("Please choose your travel style.");
                return;
            }
            
            if (!ageValue || isNaN(age) || age < 18) {
                alert("You need to be at least 18.");
                return;
            }
            
            if (season === "blank") {
                alert("Please select your favorite season.");
                return;
            }

            if (fromDate && toDate && fromDate > toDate) {
                alert("The 'From' date cannot be later than the 'To' date.");
            }

            if (!email) {
                alert("Please enter your email.");
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