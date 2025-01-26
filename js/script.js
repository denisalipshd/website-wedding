// countdown js
const endDate = new Date("2025-11-03T00:00:00");
function updateCountdown() {
  const now = new Date();
  const difference = endDate - now;
  if (difference <= 0) {
    document.getElementById("timer").innerHTML = "Countdown Selesai!";
    return;
  }
  // Keep the year, month, and day fixed
  document.getElementById("days").textContent = endDate.getDate();
  // Calculate remaining hours, minutes, and seconds
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  // Update time elements with leading zeros
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}
setInterval(updateCountdown, 1000);
updateCountdown();

// comment
const commentForm = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");

// Fungsi untuk menampilkan komentar yang tersimpan
function loadComments() {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Bersihkan daftar komentar
  commentList.innerHTML = "";

  // Tampilkan semua komentar dalam satu kotak
  comments.forEach(({ name, comment }) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    commentDiv.innerHTML = `
        <h5>${name}</h5>
        <p>${comment}</p>
      `;

    commentList.appendChild(commentDiv);
  });
}

// Fungsi untuk menyimpan komentar baru
function saveComment(name, comment) {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push({ name, comment });
  localStorage.setItem("comments", JSON.stringify(comments));
}

// Event listener untuk form submit
commentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (!name || !comment) {
    alert("Nama dan komentar harus diisi!");
    return;
  }

  saveComment(name, comment);
  loadComments();
  commentForm.reset();
});

// Tampilkan komentar saat halaman dimuat
loadComments();
