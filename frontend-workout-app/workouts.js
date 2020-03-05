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
                <ion-icon id="delete-workout" name="trash-outline"></ion-icon>
                <div id="workout-id" hidden>${workoutId}</div>
                <ion-icon id="edit-workout" name="create-outline"></ion-icon>
            `
            workoutCard.append(cardButtons)
            const workoutTitle = document.createElement('h4')
            workoutTitle.className = 'workout-title'
            workoutTitle.textContent = `Workout on ${workout.date}`
            workoutCard.append(workoutTitle)
            if (workout.cardios.length > 0) {
                const cardioTitle = document.createElement('h5')
                cardioTitle.textContent = 'Cardio'
                cardioContainer.append(cardioTitle)
                workout.cardios.map(cardio => {
                    const cardioElement = document.createElement('h6')
                    cardioElement.textContent = `${cardio.name} - ${cardio.duration} minutes - ${cardio.distance} miles - ${cardio.calories} calories`
                    cardioContainer.append(cardioElement)
                    workoutCard.append(cardioContainer)
                })
            }
            if (workout.weights.length > 0) {
                const weightTitle = document.createElement('h5')
                weightTitle.textContent = 'Weights'
                weightContainer.append(weightTitle)
                workout.weights.map(weight => {
                    const weightElement = document.createElement('h6')
                    weightElement.textContent = `${weight.name} - ${weight.amount} lbs - ${weight.sets} sets - ${weight.reps} reps`
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
    })
