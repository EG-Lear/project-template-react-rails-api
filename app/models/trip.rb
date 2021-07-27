class Trip < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :user_id }

  belongs_to :user
  has_many :stops, dependent: :destroy

  def self.user_trips # a code challenge froma peer displays the user with the most trips
    self.group(:user_id).count.sort_by{|user_id, count| count}.last[0]
  end
end