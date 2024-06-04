document.addEventListener('DOMContentLoaded', () => {
    const petForm = document.getElementById('petForm');
    const walkerForm = document.getElementById('walkerForm');
    const petsList = document.getElementById('petsList');
    const walkersList = document.getElementById('walkersList');

    petForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const petData = {
            name: document.getElementById('petName').value,
            age: document.getElementById('petAge').value,
            breed: document.getElementById('petBreed').value
        };

        fetch('https://waqqlydogwalking.azurewebsites.net/api/registerPet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(petData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('Pet registered successfully!');
            loadPets();
        })
        .catch(error => console.error('Error:', error));
    });

    walkerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const walkerData = {
            name: document.getElementById('walkerName').value,
            experience: document.getElementById('walkerExperience').value,
            contact: document.getElementById('walkerContact').value
        };

        fetch('https://waqqlydogwalking.azurewebsites.net/api/registerWalker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(walkerData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('Walker registered successfully!');
            loadWalkers();
        })
        .catch(error => console.error('Error:', error));
    });

    function loadPets() {
        fetch('https://waqqlydogwalking.azurewebsites.net/api/getPets')
        .then(response => response.json())
        .then(data => {
            petsList.innerHTML = '';
            data.forEach(pet => {
                const li = document.createElement('li');
                li.textContent = `${pet.name} (${pet.breed}, ${pet.age} years old)`;
                petsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    function loadWalkers() {
        fetch('https://waqqlydogwalking.azurewebsites.net/api/getWalkers')
        .then(response => response.json())
        .then(data => {
            walkersList.innerHTML = '';
            data.forEach(walker => {
                const li = document.createElement('li');
                li.textContent = `${walker.name} (${walker.experience} years experience, contact: ${walker.contact})`;
                walkersList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    loadPets();
    loadWalkers();
});
