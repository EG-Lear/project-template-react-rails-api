class CreateStops < ActiveRecord::Migration[6.1]
  def change
    create_table :stops do |t|
      t.string :name
      t.integer :trip_id
      t.string :description
      t.boolean :extra_stop
      
      t.timestamps
    end
  end
end