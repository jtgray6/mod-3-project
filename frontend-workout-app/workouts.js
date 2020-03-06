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
        // console.log(validWorkouts)
        validWorkouts.map(workout => {
            let workoutId = workout.id
            console.log(workout)
            const workoutCard = document.createElement('div')
            workoutCard.className = 'workout-card'
            const cardioContainer = document.createElement('div')
            cardioContainer.className = 'cardio-exercise-container'
            const weightContainer = document.createElement('div')
            weightContainer.className = 'weight-exercise-container'
            let cardButtons = document.createElement('div')
            cardButtons.className = 'card-buttons'
            cardButtons.innerHTML = `
                <ion-icon id="delete-workout" data-id=${workoutId} name="trash-outline"></ion-icon>
            `
    
            workoutCard.append(cardButtons)
            const workoutTitle = document.createElement('h4')
            workoutTitle.className = 'workout-title'
            workoutTitle.innerHTML = `<ion-icon id="edit-date" data-id=${workoutId} name="calendar-outline"></ion-icon> Workout on ${workout.date}`
            
            workoutCard.append(workoutTitle)
            if (workout.cardios.length > 0) {
                const cardioTitle = document.createElement('h5')
                cardioTitle.innerHTML = `Cardio Exercises <ion-icon id="add-cardio-card" data-id=${workoutId} name="add-circle-outline"></ion-icon>`
                cardioContainer.append(cardioTitle)
                workout.cardios.map(cardio => {
                    const cardioId = cardio.id
                    const cardioElement = document.createElement('h6')
                    cardioElement.innerHTML = `
                        <ion-icon id="edit-cardio" data-id=${cardioId} name="create-outline"></ion-icon> ${cardio.name} - ${cardio.duration} minutes - ${cardio.distance} miles - ${cardio.calories} calories
                        `
                    cardioContainer.append(cardioElement)
                    workoutCard.append(cardioContainer)
                })
            }
            if (workout.weights.length > 0) {
                const weightTitle = document.createElement('h5')
                weightTitle.innerHTML = `Weight Training <ion-icon id="add-weight-card" data-id=${workoutId} name="add-circle-outline"></ion-icon>`
                weightContainer.append(weightTitle)
                workout.weights.map(weight => {
                    const weightId = weight.id
                    const weightElement = document.createElement('h6')
                    weightElement.innerHTML = `
                        <ion-icon id="edit-weight" data-id=${weightId} name="create-outline"></ion-icon> ${weight.name} - ${weight.amount} lbs - ${weight.sets} sets - ${weight.reps} reps
                    `
                    weightContainer.append(weightElement)
                    workoutCard.append(weightContainer)
                })
            }
            workoutContainer.append(workoutCard)
        })
        const editDate = document.querySelectorAll('#edit-date')
        editDate.forEach(button => {
            const intWorkoutID = parseInt(button.dataset.id)
            console.log(intWorkoutID)
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
                    workoutTitle.innerHTML = `<ion-icon id="edit-date" data-id=${intWorkoutID} name="calendar-outline"></ion-icon> Workout on ${newDate}`
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
            const intWorkoutID = parseInt(button.dataset.id)
            console.log(intWorkoutID)
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
                    const cardioId = parseInt(button.dataset.id)
                    console.log(cardioId)
                    const formData = new FormData(cardioForm)
                    const name = formData.get('name')
                    const duration = formData.get('duration')
                    const distance = formData.get('distance')
                    const calories = formData.get('calories')
                    const cardioExercise = document.createElement('h6')
                    cardioExercise.innerHTML = `
                    <ion-icon id="edit-cardio" data-id=${intWorkoutID} name="create-outline"></ion-icon> ${name} - ${duration} minutes - ${distance} miles - ${calories} calories
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
            const intWorkoutID = parseInt(button.dataset.id)
            button.addEventListener('click', event => {
                console.log('Event working')
                const weightCardContainer = document.querySelector('.weight-exercise-container')
                const weightForm = document.createElement('form')
                weightForm.className = "weight-form"
                weightForm.innerHTML = `
                    <input type="text" name="name" class="weight-form-input" placeholder="Description"/>
                    <input type="integer" name="amount" class="weight-form-input" placeholder="Weight Amount (lb)"/>
                    <input type="float" name="sets" class="weight-form-input" placeholder="Sets (#)"/>
                    <input type="integer" name="reps" class="weight-form-input" placeholder="Reps (#)"/>
                    <input type="submit" class="submit-weight" value="Submit Weights"/>
                `
                weightCardContainer.append(weightForm)
                const submitWeight = document.querySelector('.weight-form')
                submitWeight.addEventListener('submit', event => {
                    event.preventDefault()
                    const weightId = parseInt(button.dataset.id)
                    console.log(weightId)
                    const formData = new FormData(weightForm)
                    const name = formData.get('name')
                    const amount = formData.get('amount')
                    const sets = formData.get('sets')
                    const reps = formData.get('reps')
                    const weightExercise = document.createElement('h6')
                    weightExercise.innerHTML = `
                    <ion-icon id="edit-weight" data-id=${intWorkoutID} name="create-outline"></ion-icon> ${name} - ${amount} lbs - ${sets} sets - ${reps} reps
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
            const intWorkoutID = parseInt(button.dataset.id)
            button.addEventListener('click', event => {
                console.log(event)
                const cardioForm = document.createElement('form')
                cardioForm.className = "cardio-form"
                cardioForm.innerHTML = `
                    <input type="text" name="name" class="cardio-form-input" placeholder="Description"/>
                    <input type="integer" name="duration" class="cardio-form-input" placeholder="Duration (minutes)"/>
                    <input type="float" name="distance" class="cardio-form-input" placeholder="Distance (miles)"/>
                    <input type="integer" name="calories" class="cardio-form-input" placeholder="Calories Burned"/>
                    <input type="submit" class="submit-cardio" value="Submit Cardio"/>
                `
                button.parentNode.append(cardioForm)
                const submitCardio = document.querySelector('.cardio-form')
                submitCardio.addEventListener('submit', event => {
                    event.preventDefault()
                    const intCardioID = parseInt(button.dataset.id)
                    console.log(button.dataset.id)
                    const formData = new FormData(cardioForm)
                    const name = formData.get('name')
                    const duration = formData.get('duration')
                    const distance = formData.get('distance')
                    const calories = formData.get('calories')
                    button.parentNode.innerHTML = `
                        <ion-icon id="edit-cardio" data-id=${intCardioID} name="create-outline"></ion-icon> ${name} - ${duration} minutes - ${distance} miles - ${calories} calories<div id="cardio-id" hidden>${intCardioID}</div>
                    `
                    fetch(`${cardioURL}/${intCardioID}`, {
                        method: "PUT",
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
        const editWeight = document.querySelectorAll('#edit-weight')
        editWeight.forEach(button => {
            const intWorkoutID = parseInt(button.dataset.id)
            button.addEventListener('click', event => {
                const weightForm = document.createElement('form')
                weightForm.className = "weight-form"
                weightForm.innerHTML = `
                    <input type="text" name="name" class="weight-form-input" placeholder="Description"/>
                    <input type="integer" name="amount" class="weight-form-input" placeholder="Weight Amount (lb)"/>
                    <input type="float" name="sets" class="weight-form-input" placeholder="Sets (#)"/>
                    <input type="integer" name="reps" class="weight-form-input" placeholder="Reps (#)"/>
                    <input type="submit" class="submit-weight" value="Submit Weights"/>
                `
                button.parentNode.append(weightForm)
                const submitWeight = document.querySelector('.weight-form')
                submitWeight.addEventListener('submit', event => {
                    event.preventDefault()
                    const intWeightID = parseInt(button.dataset.id)
                    console.log(intWeightID)
                    const formData = new FormData(weightForm)
                    const name = formData.get('name')
                    const amount = formData.get('amount')
                    const sets = formData.get('sets')
                    const reps = formData.get('reps')
                    button.parentNode.innerHTML = `
                    <ion-icon id="edit-weight" data-id=${intWeightID} name="create-outline"></ion-icon> ${name} - ${amount} lbs - ${sets} sets - ${reps} reps
                    `
                    fetch(`${weightURL}/${intWeightID}`, {
                        method: "PUT",
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
        const deleteWorkout = document.querySelectorAll('#delete-workout')
        console.log(deleteWorkout)
        deleteWorkout.forEach(button => {
            button.addEventListener('click', event => {
                const intWorkoutID = parseInt(button.dataset.id)
                console.log(intWorkoutID)
                const buttonElement = event.target.parentNode
                console.log('button', button)
                buttonElement.parentNode.remove()
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
    })
