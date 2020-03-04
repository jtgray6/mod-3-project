class CreateWeights < ActiveRecord::Migration[6.0]
  def change
    create_table :weights do |t|
      t.string :name
      t.integer :amount
      t.integer :sets
      t.integer :reps

      t.timestamps
    end
  end
end
