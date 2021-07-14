class RecommendationsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :authorize

  def index
    recommendations = Recommendation.all
    render json: recommendations
  end

  private

  def record_not_found
    render json: { error: "User not logged in" }, status: :unauthorized
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id 
  end

  def is_admin
    User.find(session[:user_id]).admin
  end

end
