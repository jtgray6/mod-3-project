const workoutsURL = 'http://localhost:4000/workouts'
const cardioURL = 'http://localhost:4000/cardios'
const weightURL = 'http://localhost:4000/weights'

const workoutContainer = document.querySelector('#workout-container')

const token = localStorage.getItem('token')

fetch(workoutsURL, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
    }
})
    .then(response => response.json())
    .then(workouts => {
        const validWorkouts = workouts.filter(workout => {
            return workout.date != null
        })
        console.log(validWorkouts)
        validWorkouts.map(workout => {
            const workoutId = workout.id
            const workoutCard = document.createElement('div')
            workoutCard.className = 'workout-card'
            const cardioContainer = document.createElement('div')
            cardioContainer.className = 'cardio-exercise-container'
            const weightContainer = document.createElement('div')
            weightContainer.className = 'weight-exercise-container'
            const cardButtons = document.createElement('div')
            cardButtons.className = 'card-buttons'
            cardButtons.innerHTML = `
                <div id="workout-id" hidden>${workoutId}</div>
                <ion-icon id="delete-workout" name="trash-outline"></ion-icon>
            `
            workoutCard.append(cardButtons)
            const workoutTitle = document.createElement('h4')
            workoutTitle.className = 'workout-title'
            workoutTitle.innerHTML = `<ion-icon id="edit-date" name="calendar-outline"></ion-icon> Workout on ${workout.date}`
            
            workoutCard.append(workoutTitle)
            if (workout.cardios.length > 0) {
                const cardioTitle = document.createElement('h5')
                cardioTitle.innerHTML = `Cardio Exercises <ion-icon id="add-cardio-card" name="add-circle-outline"></ion-icon>`
                cardioContainer.append(cardioTitle)
                workout.cardios.map(cardio => {
                    const cardioId = cardio.id
                    const cardioElement = document.createElement('h6')
                    cardioElement.innerHTML = `
                <div id="workout-id" hidden>${workoutId}</div>
                <div id="workout-id" hidden>${workoutId}</div>
                <div id="workout-id" hidden>${workoutId}</div>
                <ion-icon id="edit-cardio" name="create-outline"></ion-icon> ${cardio.name} - ${cardio.duration} minutes - ${cardio.distance} miles - ${cardio.calories} calories<div id="cardio-id" hidden>${cardioId}</div>`
                    cardioContainer.append(cardioElement)
                    workoutCard.append(cardioContainer)
                })
            }
            if (workout.weights.length > 0) {
                const weightTitle = document.createElement('h5')
                weightTitle.innerHTML = `Weight Training <ion-icon id="add-weight-card" name="add-circle-outline"></ion-icon>`
                weightContainer.append(weightTitle)
                workout.weights.map(weight => {
                    const weightId = weight.id
                    const weightElement = document.createElement('h6')
                    weightElement.innerHTML = `<ion-icon id="edit-weight" name="create-outline"></ion-icon> ${weight.name} - ${weight.amount} lbs - ${weight.sets} sets - ${weight.reps} reps<div id="weight-id" hidden>${weightId}</div>`
                    weightContainer.append(weightElement)
                    workoutCard.append(weightContainer)
                })
            }
            workoutContainer.append(workoutCard)
        })
        const deleteWorkout = document.querySelectorAll('#delete-workout')
        deleteWorkout.forEach(button => {
            let workoutID = document.querySelector('#workout-id')
            button.addEventListener('click', event => {
                const buttonElement = event.target.parentNode
                buttonElement.parentNode.remove()
                const intWorkoutID = parseInt(workoutID.textContent)
                fetch(`${workoutsURL}/${intWorkoutID}`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }) 
            })
        })
        const editDate = document.querySelectorAll('#edit-date')
        editDate.forEach(button => {
            let workoutID = document.querySelector('#workout-id')
            const intWorkoutID = parseInt(workoutID.innerText)
            button.addEventListener('click', event => {
                button.name = 'checkmark-outline'
                const workoutTitle = document.querySelector('.workout-title')
                const oldDate = workoutTitle.innerText.split(' ')[3]
                console.log(oldDate)
                workoutTitle.innerHTML = `Workout on <form id="new-date-form"><input id="new-date-input" type="date" name="date"><input type="submit" hidden></form>`
                const newDateForm = document.querySelector('#new-date-form')
                newDateForm.addEventListener('submit', event => {
                    event.preventDefault()
                    
                    const formData = new FormData(newDateForm)
                    const newDate = formData.get('date')
                    workoutTitle.innerHTML = `<ion-icon id="edit-date" name="calendar-outline"></ion-icon> Workout on ${newDate}`
                    fetch(`${workoutsURL}/${intWorkoutID}`, {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `bearer ${token}`
                        },
                        body: JSON.stringify({
                            date: newDate
                        })
                    })
                })
                
            })
        })
        const addCardio = document.querySelectorAll('#add-cardio-card')
        addCardio.forEach(button => {
            let workoutID = document.querySelector('#workout-id')
            const intWorkoutID = parseInt(workoutID.innerText)
            button.addEventListener('click', event => {
                console.log('Event working')
                const cardioCardContainer = document.querySelector('.cardio-exercise-container')
                const cardioForm = document.createElement('form')
                cardioForm.className = "cardio-form"
                cardioForm.innerHTML = `
                    <input type="text" name="name" class="cardio-form-input" placeholder="Description"/>
                    <input type="integer" name="duration" class="cardio-form-input" placeholder="Duration (minutes)"/>
                    <input type="float" name="distance" class="cardio-form-input" placeholder="Distance (miles)"/>
                    <input type="integer" name="calories" class="cardio-form-input" placeholder="Calories Burned"/>
                    <input type="submit" class="submit-cardio" value="Submit Cardio"/>
                `
                cardioCardContainer.append(cardioForm)
                const submitCardio = document.querySelector('.cardio-form')
                submitCardio.addEventListener('submit', event => {
                    event.preventDefault()
                    const cardioId = document.querySelector('#cardio-id')
                    const formData = new FormData(cardioForm)
                    const name = formData.get('name')
                    const duration = formData.get('duration')
                    const distance = formData.get('distance')
                    const calories = formData.get('calories')
                    const cardioExercise = document.createElement('h6')
                    cardioExercise.innerHTML = `
                    <ion-icon id="edit-cardio" name="create-outline"></ion-icon> ${name} - ${duration} minutes - ${distance} miles - ${calories} calories<div id="cardio-id" hidden>${cardioId}</div>
                    `
                    cardioCardContainer.append(cardioExercise)
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
                            workout_id: intWorkoutID
                        })
                    }).then(response => response.json()).then(console.log)
                    cardioForm.remove()
                })
            })
        })
        // weight below, cardio above
        const addWeight = document.querySelectorAll('#add-weight-card')
        addWeight.forEach(button => {
            let workoutID = document.querySelector('#workout-id')
            const intWorkoutID = parseInt(workoutID.innerText)
            button.addEventListener('click', event => {
                console.log('Event working')
                const weightCardContainer = document.querySelector('.weight-exercise-container')
                const weightForm = document.createElement('form')
                weightForm.className = "weight-form"
                weightForm.innerHTML = `
                    <input type="text" name="name" class="cardio-form-input" placeholder="Description"/>
                    <input type="integer" name="amount" class="cardio-form-input" placeholder="Weight Amount (lb)"/>
                    <input type="float" name="sets" class="cardio-form-input" placeholder="Sets (#)"/>
                    <input type="integer" name="reps" class="cardio-form-input" placeholder="Reps (#)"/>
                    <input type="submit" class="submit-cardio" value="Submit Weights"/>
                `
                weightCardContainer.append(weightForm)
                const submitWeight = document.querySelector('.weight-form')
                submitWeight.addEventListener('submit', event => {
                    event.preventDefault()
                    const weightId = document.querySelector('#weight-id')
                    const formData = new FormData(weightForm)
                    const name = formData.get('name')
                    const amount = formData.get('amount')
                    const sets = formData.get('sets')
                    const reps = formData.get('reps')
                    const weightExercise = document.createElement('h6')
                    weightExercise.innerHTML = `
                    <ion-icon id="edit-weight" name="create-outline"></ion-icon> ${name} - ${amount} lbs - ${sets} sets - ${reps} reps<div id="weight-id" hidden>${weightId}</div>
                    `
                    weightCardContainer.append(weightExercise)
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
                            workout_id: intWorkoutID
                        })
                    }).then(response => response.json()).then(console.log)
                    weightForm.remove()
                })
            })
        })
        const editCardio = document.querySelectorAll('#edit-cardio')
        editCardio.forEach(button => {
            console.log(button)
        })

    })
