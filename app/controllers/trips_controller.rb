class TripsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :authorize

  def show
    trip = User.find(session[:user_id]).Trip.find(id: params[:id])
    render json: trip, include: :stops
  end
  
  def index
    # byebug
    trips = User.find(session[:user_id]).trips
    render json: trips
  end

  def create
    trip = Trip.create(trip_params)
    render json: trip
  end

  private

  def trip_params
    defaults = { user_id: session[:user_id] }
    params.permit(:name, :user_id).reverse_merge(defaults)
  end

  def record_not_found
    render json: { error: "User not logged in" }, status: :unauthorized
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end
end
