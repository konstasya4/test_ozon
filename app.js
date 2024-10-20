document.addEventListener("DOMContentLoaded", function () {
  const inputPercent = document.getElementById("input_percent");
  const checkboxHidden = document.getElementById("checkbox_hidden");
  const checkboxAnimate = document.getElementById("checkbox_animate");
  const circle = document.querySelector(".foreground_circle");
  const backgroundCircle = document.querySelector(".background_circle");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0; 
  const computedStyle = window.getComputedStyle(circle);

  function setSegmentLength(percent) {
    const segmentLength = (percent / 100) * circumference;
    circle.style.strokeDasharray = `${segmentLength} ${circumference - segmentLength}`;
  }

  function startAnimation() {
    const startOffset = parseFloat(computedStyle.strokeDashoffset) || 0;
    const endOffset = startOffset - circumference;
  
    circle.style.setProperty('--dash-offset-start', `${startOffset}px`);
    circle.style.setProperty('--dash-offset-end', `${endOffset}px`);
  
    circle.style.animation = `dash-move 4s linear infinite`;
  }

  function stopAnimation() {
    currentOffset = parseFloat(computedStyle.strokeDashoffset); 
    circle.style.animation = "none";
    circle.style.strokeDashoffset = `${currentOffset}px`; 
    circle.style.setProperty('--dash-offset-start', `${currentOffset}`);
  }

  function toggleCircleVisibility() {
    const visibility = checkboxHidden.checked ? "hidden" : "visible";
    circle.style.visibility = visibility;
    backgroundCircle.style.visibility = visibility;
  }

  function applyPercent() {
    let percent = Math.min(Math.max(Number(inputPercent.value), 0), 100);
    setSegmentLength(percent);
  }

  checkboxAnimate.addEventListener("change", function () {
    if (checkboxAnimate.checked) {
      startAnimation();
    } else {
      stopAnimation();
    }
  });

  inputPercent.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      applyPercent();
    }
  });

  checkboxHidden.addEventListener("change", toggleCircleVisibility);

  setSegmentLength(inputPercent.value);
});
