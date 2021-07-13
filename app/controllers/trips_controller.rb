class TripsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def show
    trip = User.find(session[:user_id]).Trip.find(id: params[:id])
    render json: trip, include: :stops
  end
  
  def index
    # byebug
    trips = User.find(session[:user_id]).trips
    render json: trips
  end

  private

  def trip_params
    params.permit()
  end

  def record_not_found
    render json: { error: "User not logged in" }, status: :unauthorized
  end
end
