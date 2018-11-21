const carouselImages = Array.from(
  document.getElementsByClassName("carousel-img")
);
const nextBtn = Array.from(document.getElementsByClassName("next-btn"));
const prevBtn = Array.from(document.getElementsByClassName("prev-btn"));
const allImagesLength = carouselImages.length;
const slideNavigationDivs = Array.from(
  document.getElementsByClassName("slide-navigation")
);

const createNavCircles = attachingElement => {
  for (let i = 0; i < allImagesLength; i++) {
    const newCircle = document.createElement("span");
    newCircle.className = "nav-circle ma1";
    // always set the first circle to active
    if (i == 0) {
      newCircle.classList.add("active");
    }
    attachingElement.appendChild(newCircle);
  }
};

const cycleSliderForward = () => {
  for (let i = 0; i < allImagesLength; i++) {
    if (carouselImages[i].classList.contains("active")) {
      // remove the current active image from the DOM
      carouselImages[i].classList.remove("active");
      navCircles[i].classList.remove("active");
      // if it's the last image then show the first image
      if (i === allImagesLength - 1) {
        carouselImages[0].classList.add("active");
        navCircles[0].classList.add("active");
        break;
      } else {
        // show the next image
        carouselImages[i + 1].classList.add("active");
        navCircles[i + 1].classList.add("active");
        break;
      }
    }
  }
};

const cycleSliderBackward = () => {
  for (let i = allImagesLength - 1; i >= 0; i--) {
    if (carouselImages[i].classList.contains("active")) {
      carouselImages[i].classList.remove("active");
      navCircles[i].classList.remove("active");
      if (i === 0) {
        carouselImages[allImagesLength - 1].classList.add("active");
        navCircles[allImagesLength - 1].classList.add("active");
        break;
      } else {
        carouselImages[i - 1].classList.add("active");
        navCircles[i - 1].classList.add("active");
        break;
      }
    }
  }
};

const intervalManager = (flag, handler, time) => {
  if (flag) intervalID = setInterval(handler, time);
  else clearInterval(intervalID);
};

const setSliderImage = imageIndex => {
  carouselImages.forEach((image, index) => {
    if (index === imageIndex) {
      image.classList.add("active");
      navCircles[index].classList.add("active");
    } else {
      image.classList.remove("active");
      navCircles[index].classList.remove("active");
    }
  });
};

nextBtn.forEach(btn => {
  btn.addEventListener("click", cycleSliderForward);
});

prevBtn.forEach(btn => {
  btn.addEventListener("click", cycleSliderBackward);
});

slideNavigationDivs.forEach(div => {
  createNavCircles(div);
});

const navCircles = Array.from(document.getElementsByClassName("nav-circle"));

navCircles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    setSliderImage(index);
  });
});

intervalManager(true, cycleSliderForward, 5000);
