let pswd = document.getElementById("account_password");
let chbx = document.getElementById("checkbox");
let submitBtn = document.getElementById("submit");
let reviewText = document.getElementById("revDesc");
    chbx.onclick = function(){
        if (chbx.checked) {
            pswd.type = "text";
        } else {
            pswd.type = "password";
        }
    }
const change = (event) => {
    const link = document.getElementById("logout");
    link.text = link.text === 'Logout' ? 'My Account' : 'Logout';
    event.preventDefault();
}


submitBtn.addEventListener ("click", () => {
    const review = reviewText.value;
    const userRating = parseInt(rating.innerText);
    
    if (!review) {
        alert(
            "Please provide a review before submitting."
             );
        return;
        }
        if (userRating > 0) {
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            reviewElement.innerHTML = `<p><strong>Review: </strong></p><p>${review}</p>`
            reviewsContainer.appendChild(reviewElement);
        }
        reviewText.value = "";
    });

function displayReview() {
    var text = document.getElementById("revDesc");
    text.style.display = "block";
}