class Trip < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :user_id }

  belongs_to :user
  has_many :stops, dependent: :destroy
end