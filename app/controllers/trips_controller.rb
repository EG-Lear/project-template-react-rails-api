class TripsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
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
    if trip.valid?
      trips = find_user.trips
      render json: trips
    else
      render json: { errors: trip.errors.full_messages }
    end
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
    render json: { errors: "User not logged in" }, status: :unauthorized
  end

  def authorize
    return render json: { errors: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
