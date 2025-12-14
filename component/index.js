export default function index() {

  function toggleDropdown() {
      const dropdown = document.getElementById("dropdown-content");
      dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
    }

    // Close dropdown if click outside
    window.onclick = function(event) {
      if (!event.target.matches('.dropdown-button') && !event.target.closest('.dropdown-button')) {
        document.getElementById("dropdown-content").style.display = "none";
      }
    }
}