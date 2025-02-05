class Stop < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :trip_id, errors: "stops names must be unique for the trip" }
  validates :description, presence: true
  
  belongs_to :trip
end