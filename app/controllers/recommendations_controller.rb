class RecommendationsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :authorize

  def index
    recommendations = Recommendation.all
    render json: recommendations
  end

  def create
    if is_admin
      Recommendation.create(reco_params)
      recommendations = Recommendation.all
      render json: recommendations
    else
      render json: { errors: "Not authorized" }
    end
  end

  private

  def reco_params
    params.permit(:name, :description, :image_url)
  end

  def record_not_found
    render json: { errors: "User not logged in" }, status: :unauthorized
  end

  def authorize
    return render json: { errors: "Not authorized" }, status: :unauthorized unless session.include? :user_id 
  end

  def is_admin
    User.find(session[:user_id]).admin
  end

end
