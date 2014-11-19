from controllers import pages

wsgi_routes = [
    (r'/', pages.home),
    (r'/(\w+)', pages.template),
]