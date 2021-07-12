class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  
  def show
    user = User.find(session[:user_id])
    render json: user
  end

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    defaults = { admin: false }
    params.permit(:username, :password, :password_confirmation, :admin).reverse_merge(defaults)
  end

  def record_not_found
    render json: { error: "User not logged in" }, status: :unauthorized
  end
  
end
