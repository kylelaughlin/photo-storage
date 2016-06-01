class UsersController < ApplicationController

  def new
    @user = User.new
    @image = Image.new
  end

  def create
    @user = User.new(user_params)
    token = SecureRandom.hex[0,20].upcase
    @user.url_token = token
    if @user.save
      @user = login(user_params[:email], user_params[:password])
      redirect_to user_path(@user), notice: "User Created!"
    else
      flash.now[:alert] = "User Not Created"
      redirect_to user_new_path
    end
  end

  def show
    @user = User.find(params[:id])
    if @user == current_user || params[:token] == @user.url_token
      if params[:token]
        @guest = true
        @name = params[:name]
      else
        @guest = false
      end
      @images = Image.where(user_id: @user.id)
    else
      flash.now[:alert] = "You do not have access to that user's photos"
      redirect_to root_path
    end
  end

  def current
    render :json => current_user
  end

  def update
    @user = current_user
    @user.update_attributes(first_name: params[:first_name],
                            last_name: params[:last_name],
                            email: params[:email])
    render nothing: true
  end

  def mailer
    email_string = params[:myEmail].join(", ")
    UserMailer.share_email(current_user, email_string).deliver_now
    render nothing: true
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
