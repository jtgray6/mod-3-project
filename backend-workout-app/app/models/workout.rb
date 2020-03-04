class Workout < ApplicationRecord
    has_many :cardios
    has_many :weights
    belongs_to :user
end
