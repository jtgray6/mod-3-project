class CreateCardios < ActiveRecord::Migration[6.0]
  def change
    create_table :cardios do |t|
      t.string :name
      t.integer :duration
      t.float :distance
      t.integer :calories

      t.timestamps
    end
  end
end
