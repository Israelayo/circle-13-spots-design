// Wait for the page to load first
window.onload = function () {
  const editBtn = document.querySelector('.edit');

  editBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Create the modal structure
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2>Edit Profile</h2>
        <form id="edit-profile-form">
          <input type="text" id="name" placeholder="Enter your name" />
          <input type="text" id="profession" placeholder="Your profession" />
          <button type="submit">Save</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.querySelector('.modal-content').style.background = '#fff';
    modal.querySelector('.modal-content').style.padding = '20px';
    modal.querySelector('.modal-content').style.margin = '100px auto';
    modal.querySelector('.modal-content').style.width = '300px';
    modal.querySelector('.modal-content').style.borderRadius = '8px';

    // Handle closing the modal
    modal.querySelector('.close-btn').onclick = () => modal.remove();

    modal.querySelector('form').onsubmit = function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const profession = document.getElementById('profession').value;

      document.querySelector('h1').textContent = name;
      document.querySelector('.header-2 p').textContent = profession;

      modal.remove(); 
    };
  });
};
