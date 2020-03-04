class WorkoutsController < ApplicationController
    before_action :authenticate

    def index
        @workouts = Workout.all
        render json: @workouts, include: [:cardios, :weights, :user]
    end
end
