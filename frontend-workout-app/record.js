const recordCard = document.querySelector('.record-card')
const workoutURL = 'http://localhost:4000/workouts'
const cardioURL = 'http://localhost:4000/cardios'
const weightURL = 'http://localhost:4000/weights'


recordCard.addEventListener('submit', event => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const formData = new FormData(recordCard)
    const date = formData.get('date')
    fetch(workoutURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({
            date: date
        })
    })
        .then(response => response.json())
        .then(response => {
            const workoutId = response.id
            const dateInput = document.querySelector('#date-input')
            const enterDate = document.querySelector('#submit-date')
            const addButtons = document.createElement('div')
            addButtons.className = 'addButtonsContainer'
            dateInput.remove()
            enterDate.remove()
            addButtons.innerHTML = `
                <button class="record-button" id="add-cardio">Add Cardio</button>
                <button class="record-button" id="add-weights">Add Weights</button>
                `
            recordCard.append(addButtons)
            const addCardio = document.querySelector('#add-cardio')
            const addWeight = document.querySelector('#add-weights')
            addCardio.addEventListener('click', event => {
                const cardioForm = document.createElement('form')
                cardioForm.className = "cardio-form"
                cardioForm.innerHTML = `
                    <input type="text" name="name" class="cardio-form-input" placeholder="Description"/>
                    <input type="integer" name="duration" class="cardio-form-input" placeholder="Duration (minutes)"/>
                    <input type="float" name="distance" class="cardio-form-input" placeholder="Distance (miles)"/>
                    <input type="integer" name="calories" class="cardio-form-input" placeholder="Calories Burned"/>
                    <input type="submit" class="submit-cardio" value="Submit Cardio"/>
                `
                addCardio.parentNode.append(cardioForm)
                const submitCardio = document.querySelector('.cardio-form')
                submitCardio.addEventListener('submit', event => {
                    event.preventDefault()
                    const formData = new FormData(cardioForm)
                    const name = formData.get('name')
                    const duration = formData.get('duration')
                    const distance = formData.get('distance')
                    const calories = formData.get('calories')
                    fetch(cardioURL, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `bearer ${token}`
                        },
                        body: JSON.stringify({
                            name: name,
                            duration: duration,
                            distance: distance,
                            calories: calories,
                            workout_id: workoutId
                        })
                    }).then(response => response.json()).then(console.log)
                    cardioForm.remove()
                })
            })
            addWeight.addEventListener('click', event => {
                const weightForm = document.createElement('form')
                weightForm.className = "weight-form"
                weightForm.innerHTML = `
                    <input type="text" name="name" class="cardio-form-input" placeholder="Description"/>
                    <input type="integer" name="amount" class="cardio-form-input" placeholder="Weight Amount (lb)"/>
                    <input type="float" name="sets" class="cardio-form-input" placeholder="Sets (#)"/>
                    <input type="integer" name="reps" class="cardio-form-input" placeholder="Reps (#)"/>
                    <input type="submit" class="submit-cardio" value="Submit Weights"/>
                `
                addWeight.parentNode.append(weightForm)
                const submitWeight = document.querySelector('.weight-form')
                submitWeight.addEventListener('submit', event => {
                    event.preventDefault()
                    const formData = new FormData(weightForm)
                    const name = formData.get('name')
                    const amount = formData.get('amount')
                    const sets = formData.get('sets')
                    const reps = formData.get('reps')
                    fetch(weightURL, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `bearer ${token}`
                        },
                        body: JSON.stringify({
                            name: name,
                            amount: amount,
                            sets: sets,
                            reps: reps,
                            workout_id: workoutId
                        })
                    }).then(response => response.json()).then(console.log)
                    weightForm.remove()
                })
            })
            

        })
})

