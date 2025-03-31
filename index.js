document.addEventListener('DOMContentLoaded', function() {
    // Fetch hotel data from 'db.json'
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            // Update Hotel Information
            document.getElementById('hotelName').textContent = data.hotel.name;
            document.getElementById('hotelNameHero').textContent = data.hotel.name;
            document.getElementById('hotelNameFooter').textContent = data.hotel.name;
            document.getElementById('hotelDescription').textContent = data.hotel.description;
            document.getElementById('hotelAddress').textContent = data.hotel.address;
            document.getElementById('hotelPhone').textContent = data.hotel.phone;
            document.getElementById('hotelEmail').textContent = data.hotel.email;

            // Display Available Rooms
            const roomList = document.getElementById('roomList');
            data.rooms.forEach(room => {
                roomList.innerHTML += `
                    <div class="room-card">
                        <img src="${room.image}" alt="${room.type}">
                        <div class="room-info">
                            <h3>${room.type}</h3>
                            <p>${room.description}</p>
                            <p class="price">$${room.price}/night</p>
                            <button class="btn book-btn" data-room-type="${room.type}">Book Now</button>
                        </div>
                    </div>
                `;
            });

            // Display Customer Testimonials
            const testimonialList = document.getElementById('testimonialList');
            data.testimonials.forEach(testimonial => {
                testimonialList.innerHTML += `
                    <div class="testimonial-card">
                        <p>"${testimonial.comment}"</p>
                        <div class="author">- ${testimonial.name}, ${testimonial.location}</div>
                    </div>
                `;
            });

            document.getElementById('currentYear').textContent = new Date().getFullYear();

            // Booking functionality
            const bookingFormContainer = document.getElementById('bookingFormContainer');
            const bookingForm = document.getElementById('bookingForm');
            const bookingAlert = document.getElementById('bookingAlert');
            const bookingRoomType = document.getElementById('bookingRoomType');

            // Add event listeners for booking buttons
            document.querySelectorAll('.book-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const roomType = this.getAttribute('data-room-type');
                    bookingRoomType.value = roomType;
                    bookingFormContainer.classList.add('active');
                    bookingForm.style.display = 'block';
                    bookingAlert.style.display = 'none';
                    
                    // Scroll to the booking form
                    bookingFormContainer.scrollIntoView({ behavior: 'smooth' });
                });
            });

            // Handle form submission
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Hide the form and show success message
                bookingForm.style.display = 'none';
                bookingAlert.style.display = 'block';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    bookingAlert.style.display = 'none';
                    bookingForm.style.display = 'block';
                    bookingForm.reset();
                    bookingFormContainer.classList.remove('active');
                }, 3000);
            });
        })

});