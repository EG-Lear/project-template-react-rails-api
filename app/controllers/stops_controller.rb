class StopsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :authorize

  def index
    stops = Trip.find(stop_params[:trip_id]).stops
    render json: stops, include: :trip
  end
  
  def create
    # byebug
    stop = Stop.create(stop_params)
    trip = Trip.find(stop_params[:trip_id])
    # stops = Trip.find(stop_params[:trip_id]).stops
    if stop.valid?
      render json: trip
    else
      render json: { errors: stop.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def stop_params
    defaults = { extra_stop: false }
    params.permit(:name, :description, :extra_stop, :trip_id).reverse_merge(defaults)
  end

  def record_not_found
    render json: { error: "User not logged in" }, status: :unauthorized
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end
