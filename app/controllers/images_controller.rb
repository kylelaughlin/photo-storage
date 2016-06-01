class ImagesController < ApplicationController

  def upload

    @user = current_user
    params[:images].each do |image|
      Image.create(image:image, user_id: @user.id)
    end
    @images = Image.where(user_id: @user.id)
    render :json => @images
  end

  def all_images
    @user = current_user
    @images = Image.where(user_id: @user.id).order(created_at: :desc)
    render :json => @images
  end

  def images_update
    @user = current_user
    @images = Image.where(user_id: @user.id).order(created_at: :desc)
    respond_to do |format|
      format.js
    end
  end


  private

  def image_params
    params.require(:image).permit(:image, :user_id)
  end

end
