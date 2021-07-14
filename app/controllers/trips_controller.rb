class TripsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :authorize

  def show
    # byebug
    trip = find_user.trips.find(params[:id])
    render json: trip
  end
  
  def index
    # byebug
    trips = find_user.trips
    render json: trips
  end

  def create
    trip = Trip.create(trip_params)
    trips = find_user.trips
    render json: trips
  end

  def destroy
    trip = Trip.find(params[:id])
    trip.destroy
    trips = find_user.trips
    render json: trips
  end

  private

  def find_user
    User.find(session[:user_id])
  end

  def trip_params
    defaults = { user_id: session[:user_id] }
    params.permit(:name, :user_id, :id).reverse_merge(defaults)
  end

  def record_not_found
    render json: { error: "User not logged in" }, status: :unauthorized
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end
end
