class Trip < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :stops
end