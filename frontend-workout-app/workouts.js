const workoutsURL = 'http://localhost:4000/workouts'
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
            cardioContainer.className = 'exercise-container'
            const weightContainer = document.createElement('div')
            weightContainer.className = 'exercise-container'
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
                    const cardioElement = document.createElement('h6')
                    cardioElement.innerHTML = `<ion-icon id="edit-cardio" name="create-outline"></ion-icon> ${cardio.name} - ${cardio.duration} minutes - ${cardio.distance} miles - ${cardio.calories} calories`
                    cardioContainer.append(cardioElement)
                    workoutCard.append(cardioContainer)
                })
            }
            if (workout.weights.length > 0) {
                const weightTitle = document.createElement('h5')
                weightTitle.innerHTML = `Weight Training <ion-icon id="add-weight-card" name="add-circle-outline"></ion-icon>`
                weightContainer.append(weightTitle)
                workout.weights.map(weight => {
                    const weightElement = document.createElement('h6')
                    weightElement.innerHTML = `<ion-icon id="edit-weight" name="create-outline"></ion-icon> ${weight.name} - ${weight.amount} lbs - ${weight.sets} sets - ${weight.reps} reps`
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

    })
