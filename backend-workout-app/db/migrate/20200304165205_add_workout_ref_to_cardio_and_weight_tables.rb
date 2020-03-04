class AddWorkoutRefToCardioAndWeightTables < ActiveRecord::Migration[6.0]
  def change
    add_reference :cardios, :workout, foreign_key: true
    add_reference :weights, :workout, foreign_key: true
  end
end
