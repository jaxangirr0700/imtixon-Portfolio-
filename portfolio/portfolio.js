const editBtn = document.getElementById("testimonials__edit_btn");
const deleteBtn = document.getElementById("testimonials__delete_btn");

function displayTestimonials() {
  fetch("http://localhost:3000/portfolio")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const testimonialsContainer = document.getElementById(
        "testimonials-container"
      );
      testimonialsContainer.innerHTML = "";

      data.forEach((testimonial) => {
        const testimonialDiv = document.createElement("div");
        testimonialDiv.classList.add("testimonial");

        testimonialDiv.innerHTML = `
            <div class="testimonial-image">
              <img src="${testimonial.image}" alt="${testimonial.title}">
            </div>
            <div class="testimonial-content">
              <h3>${testimonial.title}</h3>
              <p class="role">${testimonial.description}</p>
              <p class="message">"${testimonial.link}"</p>
             <main class="container">
      <div class="main_first_box_title">
        <div class="main_btn_box">
           <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
        </div>
      </div>
    </main>
            </div>
    
          `;

        const editButton = testimonialDiv.querySelector(".edit-btn");
        editButton.addEventListener("click", () => {
          const updatedData = {
            title: prompt("New name", portfolio.title),
            description: prompt("New name", portfolio.description),
            link: prompt("New name", portfolio.link),
          };

          fetch(`http://localhost:3000/portfolio/${testimonial.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedData),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((updated) => {
              displayTestimonials();
            })
            .catch((err) => {
              console.error("Update error:", err);
            });
        });

        const deleteButton = testimonialDiv.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
          const confirmation = confirm(
            "Are you sure you want to delete this testimonial?"
          );
          if (confirmation) {
            fetch(`http://localhost:3000/portfolio/${testimonial.id}`, {
              method: "DELETE",
            })
              .then(() => {
                displayTestimonials();
              })
              .catch((err) => {
                console.error("Delete error:", err);
              });
          }
        });

        testimonialsContainer.appendChild(testimonialDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching testimonials:", error);
    });
}

displayTestimonials();
