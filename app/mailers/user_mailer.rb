class UserMailer < ApplicationMailer

  default from: 'thekylelaughlin@gmail.com'

  def welcome_email(user, emails)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: emails, subject: 'Welcome to My Awesome Site')
  end

end
