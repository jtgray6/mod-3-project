class WeightsController < ApplicationController
    def index
        @weights = Weight.all
        render json: @weights
    end

    def create
        @weight = Weight.create(
            name: params[:name],
            amount: params[:amount],
            sets: params[:sets],
            reps: params[:reps],
            workout_id: params[:workout_id]
        )

        render json: @weight
    end
end
