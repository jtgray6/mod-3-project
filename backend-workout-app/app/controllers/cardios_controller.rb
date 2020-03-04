class CardiosController < ApplicationController
    def index
        @cardios = Cardio.all
        render json: @cardios
    end
end
