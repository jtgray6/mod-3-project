# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_04_202755) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cardios", force: :cascade do |t|
    t.string "name"
    t.integer "duration"
    t.float "distance"
    t.integer "calories"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "workout_id"
    t.index ["workout_id"], name: "index_cardios_on_workout_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "weights", force: :cascade do |t|
    t.string "name"
    t.integer "amount"
    t.integer "sets"
    t.integer "reps"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "workout_id"
    t.index ["workout_id"], name: "index_weights_on_workout_id"
  end

  create_table "workouts", force: :cascade do |t|
    t.date "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_workouts_on_user_id"
  end

  add_foreign_key "cardios", "workouts"
  add_foreign_key "weights", "workouts"
  add_foreign_key "workouts", "users"
end
