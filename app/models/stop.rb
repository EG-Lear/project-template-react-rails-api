class Stop < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  
  belongs_to :trip
end