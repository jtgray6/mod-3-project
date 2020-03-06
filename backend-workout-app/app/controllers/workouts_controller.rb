class WorkoutsController < ApplicationController
    before_action :authenticate

    def index
        @workouts = Workout.all
        @user_workouts = @workouts.select {|workout| workout.user == @user}
        render json: @user_workouts, include: [:cardios, :weights, :user]
    end

    def create
        @workout = Workout.create(
            date: params[:date],
            user_id: @user.id
        )
        render json: @workout
    end

    def destroy
        @workout = Workout.find(params[:id])
        id = @workout.id
        Cardio.all.each{|cardio| 
            if cardio.workout_id == id
                cardio.destroy
            end
        }
        Weight.all.each{|weight| 
            if weight.workout_id == id
                weight.destroy
            end
        }
        @workout.destroy
    end

    def update
        @workout = Workout.find(params[:id])
        @workout.update(
            date: params[:date]
        )
    end
end
