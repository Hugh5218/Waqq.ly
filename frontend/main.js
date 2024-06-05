document.addEventListener('DOMContentLoaded', () => {
    const petForm = document.getElementById('petForm');
    const walkerForm = document.getElementById('walkerForm');
    const petsList = document.getElementById('petsList');
    const walkersList = document.getElementById('walkersList');

    petForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const petData = {
            id: Date.now().toString(),
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
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Pet Data:', data);
            alert('Pet registered successfully!');
            petForm.reset();
            loadPets();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Failed to register pet: ${error.message}`);
        });
    });

    walkerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const walkerData = {
            id: Date.now().toString(),
            name: document.getElementById('walkerName').value,
            experience: document.getElementById('walkerExperience').value,
            location: document.getElementById('walkerLocation').value,
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
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Walker Data:', data);
            alert('Walker registered successfully!');
            walkerForm.reset();
            loadWalkers();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Failed to register walker: ${error.message}`);
        });
    });

    function loadPets() {
        fetch('https://waqqlydogwalking.azurewebsites.net/api/getPets')
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            petsList.innerHTML = '';
            data.forEach(pet => {
                const li = document.createElement('li');
                li.textContent = `${pet.name} (${pet.breed}, ${pet.age} years old)`;
                petsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Failed to load pets: ${error.message}`);
        });
    }

    function loadWalkers() {
        fetch('https://waqqlydogwalking.azurewebsites.net/api/getWalkers')
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            walkersList.innerHTML = '';
            data.forEach(walker => {
                const li = document.createElement('li');
                li.textContent = `${walker.name} (${walker.experience} years experience, location: ${walker.location}, contact: ${walker.contact})`;
                walkersList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Failed to load walkers: ${error.message}`);
        });
    }

    loadPets();
    loadWalkers();
});

