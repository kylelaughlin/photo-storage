class ImagesController < ApplicationController

  def upload
    @user = current_user
    params[:images].each do |image|
      Image.create(image:image, user_id: @user.id)
    end
    @images = Image.where(user_id: @user.id)
    render :json => @images
  end



  private

  def image_params
    params.require(:image).permit(:image, :user_id)
  end

end
