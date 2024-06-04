document.getElementById('petForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const petData = {
        name: document.getElementById('petName').value,
        age: document.getElementById('petAge').value,
        breed: document.getElementById('petBreed').value,
    };

    fetch('https://waqqlydogwalking.azurewebsites.net/api/registerPet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(petData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pet Data:', data);
        alert('Pet registered successfully!');
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('walkerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const walkerData = {
        name: document.getElementById('walkerName').value,
        experience: document.getElementById('walkerExperience').value,
        contact: document.getElementById('walkerContact').value,
    };

    fetch('https://waqqlydogwalking.azurewebsites.net/api/registerWalker', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(walkerData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Walker Data:', data);
        alert('Walker registered successfully!');
    })
    .catch(error => console.error('Error:', error));
});