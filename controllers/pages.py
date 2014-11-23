import webapp2
import logging
import config

'''
Base controller to deal with 500 errors, the other controllers will subclass this one
'''
class base(webapp2.RequestHandler):
    def handle_exception(self, exception, debug):
        # Log the error.
        logging.exception(exception)
        # Set a custom message.
        template_values = {'title': 'Internal Server Error!',}
        template = config.jinja_environment.get_template('errors/500.html')
        self.response.out.write(template.render(template_values))
        self.response.set_status(500)
        # If the exception is a HTTPException, use its error code.
        # Otherwise use a generic 500 error code.
        if isinstance(exception, webapp2.HTTPException):
            self.response.set_status(exception.code)
        else:
            self.response.set_status(500)

'''
Show the template based on the URL (path).
'''
class template(base):
    def get(self, path): 
        template_values = {'title': path.capitalize(), 
                           'navigation': self.navigation,
                           'active_page': path.lower()}
        logging.info('path: ' +  path)
        template = config.jinja_environment.get_template('pages/' + path + '.html')
        self.response.out.write(template.render(template_values))   
    '''
    Variables declared inside the class definition, but not inside a method are static.
    '''
    navigation = ['philanthropy', 'enterprise', 'assets', 'exhibitions']

'''
Show the first page in the navigation list, by calling the parent class.
I could do self.redirect("/philanthropy") the outcome would be the same.
'''
class home(template):
    def get(self):
        return super(home, self).get('home')
