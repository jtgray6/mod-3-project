class CardiosController < ApplicationController
    before_action :authenticate

    def index
        @cardios = Cardio.all
        render json: @cardios
    end

    def create
        @cardio = Cardio.create(
            name: params[:name],
            duration: params[:duration],
            distance: params[:distance],
            calories: params[:calories],
            workout_id: params[:workout_id]
        )

        render json: @cardio
    end
end
