function toggleNav() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('/.netlify/functions/api-key-fetcher')
        .then(response => response.json())
        .then(data => {

            emailjs.init(data.publicKey);

            // Handle form submission
            const formElement = document.getElementById('contact-form');
            if (formElement) {
                formElement.addEventListener('submit', function(event) {
                    event.preventDefault();

                    emailjs.sendForm('service_5ky7acm', 'template_gft9dsh', this)
                        .then(() => {
                            Swal.fire({
                                icon: "success",
                                title: "Email has been sent successfully!",
                                showCloseButton: true,
                                confirmButtonText: "OK",
                            });
                        })
                        .catch(error => {
                            console.error('Error sending email:', error);
                            Swal.fire({
                                icon: "error",
                                title: "Failed to send email.",
                                text: "Something went wrong!",
                                showConfirmButton: true,
                                confirmButtonText: "OK",
                            });
                        });
                });
            } else {
                console.error('Form element not found');
            }
        })
        .catch(error => {
            console.error('Error fetching the EmailJS public key:', error);
        });
        
    //Animate on scroll
    AOS.init({
        duration: 1200, 
        once: true,     
    });
    // Lightbox functionality for gallery items
    const galleryItems = document.querySelectorAll('.galleryItem');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightboxImage');
    const closeBtn = document.querySelector('.close');
    const prevButton = document.querySelector('.prevButton');
    const nextButton = document.querySelector('.nextButton');
    const eventTitleLightbox = document.querySelector('.event-title-lightbox');


    let currentImageIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            lightboxImage.src = item.querySelector('img').src;
            eventTitleLightbox.textContent = item.querySelector('.event-title').textContent;
            lightbox.style.display = 'flex';
            document.body.classList.add('lock-scroll');
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.classList.remove('lock-scroll'); 
    });

    prevButton.addEventListener('click', () => {
        prevImage();
    });

    nextButton.addEventListener('click', () => {
        nextImage();
    });
    function showImage(index) {
        lightboxImage.src = galleryItems[index].querySelector('img').src;
        eventTitleLightbox.textContent = galleryItems[index].querySelector('.event-title').textContent;
        currentImageIndex = index;
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        showImage(currentImageIndex);
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        showImage(currentImageIndex);
    }
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    if (hamburger) {
        hamburger.addEventListener('click', toggleNav);
    }
    // Carousel functionality
    let index = 0;
const visibleItems = 3;
let intervalId;
function cloneItems() {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');

    for (let i = 0; i < visibleItems; i++) {
        const clone = items[i].cloneNode(true);
        track.appendChild(clone);
    }

    for (let i = items.length - visibleItems; i < items.length; i++) {
        const clone = items[i].cloneNode(true);
        track.insertBefore(clone, items[0]);
    }
}

function showItems() {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = items[0].getBoundingClientRect().width;

    if (index < 0) {
        index = items.length - visibleItems * 2;
        track.style.transition = 'none';
        track.style.transform = `translateX(-${index * itemWidth}px)`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.5s ease';
                moveLeft();
            });
        });
    } else if (index >= items.length - visibleItems) {
        index = visibleItems;
        track.style.transition = 'none';
        track.style.transform = `translateX(-${index * itemWidth}px)`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.5s ease';
                moveRight();
            });
        });
    } else {
        track.style.transform = `translateX(-${index * itemWidth}px)`;
    }
}

function moveLeft() {
    index--;
    showItems();
}

function moveRight() {
    index++;
    showItems();
}
function startAutoMove() {
    intervalId = setInterval(() => {
        moveRight();
    }, 3000); // Move right every 3 seconds 
}

function stopAutoMove() {
    clearInterval(intervalId);
}

    cloneItems();
    startAutoMove();
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = items[0].getBoundingClientRect().width;
    const track = document.querySelector('.carousel-track');
    track.addEventListener('mouseenter', stopAutoMove); 
    track.addEventListener('mouseleave', startAutoMove); 
    index = visibleItems; 
    track.style.transition = 'none';
    track.style.transform = `translateX(-${index * itemWidth}px)`;
    requestAnimationFrame(() => {
        track.style.transition = 'transform 0.5s ease';
    });
    document.querySelector('.carousel-button.left').addEventListener('click', moveLeft);
    document.querySelector('.carousel-button.right').addEventListener('click', moveRight);
});
