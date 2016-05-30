class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user = login(user_params[:email], user_params[:password])
      redirect_to user_path(@user), notice: "User Created!"
    else
      flash.now[:alert] = "User Not Created"
      redirect_to user_new_path
    end
  end

  def show
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
