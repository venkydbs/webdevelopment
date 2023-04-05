from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "database.db"


def eMedStoreApp():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'venkat web key'
    #app.config['DATABASE_URL'] = f'postgres://zqxmishasausru:426eda4b64cfa558d3690924e8bfff7471064b7d726cf4998dedca5c488918f6@ec2-52-215-68-14.eu-west-1.compute.amazonaws.com:5432/dassanunr5n99c'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User, Note
    with app.app_context():
        db.create_all()

    #create_database(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app


def create_database(app):
    if not path.exists('website/' + DB_NAME):
        db.create_all(app=app)
