from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "database.db"


def eMedStoreApp():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'my key'
    #app.config['DATABASE_URL'] = f'postgres://kjtqtxgfanclfu:4825a34ba4737ddebfe6b84402b908c925f8da413f08ae190ebdc9ff01990858@ec2-54-155-110-181.eu-west-1.compute.amazonaws.com:5432/d9jv9qo4dbpeia'
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
        #print('fitness factory db is created')
