const homeUrl = fetch("http://localhost:3000/home");
const portfolioUrl = fetch("http://localhost:3000/portfolio");
const setupUrl = fetch("http://localhost:3000/setup");
const aboutmeUrl = fetch("http://localhost:3000/aboutme");
const testimonialsUrl = fetch("http://localhost:3000/testimonials");
const contactUrl = fetch("http://localhost:3000/contact");
const aboutMeBtn = document.getElementById("aboutMeBtn");
const editTextHomeBtn = document.getElementById("edit_text_Home_btn");
// .....................Home Page////////////////////////
//
let data;
function display() {
  fetch("http://localhost:3000/home")
    .then((a) => {
      return a.json();
    })
    .then((a) => {
      data = a;
      const title = document.querySelector(".hi_im_user_h1");
      const userImg = document.querySelector(".main_img_db");
      const description = document.querySelector(".main_lorem_p");
      title.textContent = a.title;
      description.textContent = a.description;
      userImg.src = a.heroImage;
    })
    .catch((er) => {
      console.log(`Serverda hatolik bor`);
    });
}
display();
aboutMeBtn.addEventListener("click", function () {
  const userInput = prompt("Ismingizni yozing!! Misol:Hi i'm Jaxangir");

  fetch("http://localhost:3000/home", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, title: userInput }),
  })
    .then((response) => response.json())
    .then((updatedData) => {
      console.log("Updated data:", updatedData);
      display();
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });
});
editTextHomeBtn.addEventListener("click", function () {
  const userInput = prompt("Comment Yozing!!! Misol:Hobbiyingiz");

  fetch("http://localhost:3000/home", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, description: userInput }),
  })
    .then((response) => response.json())
    .then((updatedData) => {
      console.log("Updated data:", updatedData);
      display();
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });
});
//////////////////////Portfolio Page//////////////////
