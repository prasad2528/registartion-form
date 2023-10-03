document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const table = document.querySelector("table");
    const button = document.getElementById("button");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const workStatus = document.querySelector('input[name="work_status"]:checked').value;
        const mobile = document.getElementById("mobile").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const skills = [...document.querySelectorAll('input[name="skills[]"]:checked')].map(skill => skill.value).join(", ");

        const newRow = table.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);

        cell1.innerHTML = name;
        cell2.innerHTML = email;
        cell3.innerHTML = workStatus;
        cell4.innerHTML = mobile;
        cell5.innerHTML = gender;
        cell6.innerHTML = skills;

        // Clear the form after submission
        button.addEventListener("click", function(event) {
            event.preventDefault();
            form.reset();
            // Clear the table by resetting its innerHTML
            table.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Work Status</th>
                    <th>Mobile Number</th>
                    <th>Gender</th>
                    <th>Skills</th>
                </tr>`;
        });

    });
});
