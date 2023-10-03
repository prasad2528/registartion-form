const getUserButton = document.getElementById("getUserButton");
const userGrid = document.getElementById("userGrid");
const loader = document.getElementById("loader");

getUserButton.addEventListener("click", () => {
    loader.style.display = "block";

    // Make an API call to fetch user data
    fetch("https://reqres.in/api/users?page=1")
        .then((response) => response.json())
        .then((data) => {
            loader.style.display = "none";
            displayUsers(data.data);
        })
        .catch((error) => {
            loader.style.display = "none";
            console.error("Error fetching user data:", error);
        });
});

function displayUsers(users) {
    userGrid.innerHTML = "";
    users.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
            <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
            <h3>${user.first_name} ${user.last_name}</h3>
            <p>Email: ${user.email}</p>
        `;
        userGrid.appendChild(userCard);
    });
}