const editBtn = document.getElementById("testimonials__edit_btn");
const deleteBtn = document.getElementById("testimonials__delete_btn");

function displayTestimonials() {
  fetch("http://localhost:3000/testimonials")
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
        testimonialDiv.style.backgroundColor = "gray";
        testimonialDiv.classList.add("testimonial");

        testimonialDiv.innerHTML = `
            <div  class="testimonial-image">
              <img src="${testimonial.image}" alt="${testimonial.name}">
            </div>
            <div  class="testimonial-content">
              <h3>${testimonial.name}</h3>
              <p class="role">${testimonial.role}</p>
              <p class="message">"${testimonial.message}"</p>
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
            name: prompt("New name", testimonial.name),
            role: prompt("New role", testimonial.role),
            message: prompt("New message", testimonial.message),
          };

          fetch(`http://localhost:3000/testimonials/${testimonial.id}`, {
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
            fetch(`http://localhost:3000/testimonials/${testimonial.id}`, {
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
