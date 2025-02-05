class StopsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def index
    trip = find_trip.stops
    render json: stops, include: :trip
  end
  
  def create
    # byebug
    if correct_user
      stop = Stop.create(stop_params)
      trip = find_trip
      # stops = Trip.find(stop_params[:trip_id]).stops
      if stop.valid?
        render json: trip, status: :created
      else
        render json: { errors: stop.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: "Unauthorized" }
    end
  end

  def destroy
    trip = find_trip
    stop = Stop.find(params[:id])
    stop.destroy
    render json: trip, include: :stops
  end

  def update
    if correct_user
      stop = find_trip.stops.find_by(name: params[:name])
      if stop.nil?
        render json: { errors: "stop not found"}
      else
        stop.update(stop_params)
        trip = find_trip
        render json: trip, include: :stops
      end
    else
      render json: { errors: "Unauthorized" }
    end
  end

  private

  def find_trip
    Trip.find(params[:trip_id])
  end
  
  def correct_user
    find_trip[:user_id] == session[:user_id]
  end

  def stop_params
    defaults = { extra_stop: false }
    params.permit(:name, :description, :extra_stop, :trip_id).reverse_merge(defaults)
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
