document.getElementById('myForm').addEventListener('submit',function(event) {
            event.preventDefault();

            const fullname = document.getElementById('fname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('pass').value;
            const age = document.getElementById('age').value;
            
            if (!fullname || !email) {
                alert("You need a name and email.");
                return;
            }

            if (!age || age <18) {
                alert("You need to be at least 18.");
                return;
            }

            const formData = {
                name: fullname,
                email: email,
                password: password,
                age: age
            };

            console.log(formData);

            const xhr = new XMLHttpRequest();
            xhr.open("GET", "submit.json", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    alert("Form submitted successfully!");
                    const response = JSON.parse(xhr.responseText);
                    console.log(response);
                    //document.getElementById('myForm').reset();
                    document.getElementById('myForm').innerHTML = '';
                    document.getElementById('message').innerText = response.message;
                } else if (xhr.readyState === 4) {
                    alert("Error submitting form.");
                }
            };
            xhr.send(JSON.stringify(formData));
    });