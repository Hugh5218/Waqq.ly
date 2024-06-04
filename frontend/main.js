document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('petForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const petData = {
            name:'Bob' ,
            age: '12',
            breed: 'test'
        };
        // const petData = {
        //     name: document.getElementById('petName').value,
        //     age: document.getElementById('petAge').value,
        //     breed: document.getElementById('petBreed').value
        // };

        console.log('about to fetch.');
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
            console.log('Pet Data:', data);
            alert('Pet registered successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to register pet.');
        });
    });

    document.getElementById('walkerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const walkerData = {
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Walker Data:', data);
            alert('Walker registered successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to register walker.');
        });
    });
});