# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Cardio.destroy_all
Weight.destroy_all
Workout.destroy_all

# date format: dd/MM/yyyy
workout3_2_20 = Workout.create(date: "02/03/2020", user_id: 10)

running = Cardio.create(name: "Running", duration: 30, distance: 2.5, calories: 300, workout: workout3_2_20)
# biking = Cardio.create(name: "Biking", duration: 22, distance: 5.8, calories: 255)
# stair_stepper = Cardio.create(name: "Stair Stepper", duration: 12, distance: 1.6, calories: 420)

bench_press = Weight.create(name: "Bench Press", amount: 135, sets: 3, reps: 10, workout: workout3_2_20)