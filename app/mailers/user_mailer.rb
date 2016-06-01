class UserMailer < ApplicationMailer

  default from: 'thekylelaughlin@gmail.com'

  def share_email(user, emails)
    @user = user
    @url  = "/#{@user.id}/#{@user.first_name}/#{@user.url_token}"
    mail(to: emails, subject: "#{@user.first_name} would like to share photos with you")
  end

end
