class Stop < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :extra_stop, presence: true
  
  belongs_to :trip
end