class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.string :price
      t.string :image
      t.string :category
      t.integer :user_id

      t.timestamps
    end
  end
end
