class UserMailer < ApplicationMailer

  default from: 'thekylelaughlin@gmail.com'

  def share_email(user, emails)
    @user = user
    @url  = "localhost:3000/users/#{@user.id}/#{@user.url_token}"
    mail(to: emails, subject: "#{@user.first_name} would like to share photos with you")
  end

end
