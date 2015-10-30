from sqlalchemy import Column, Integer, String, Boolean, event
from liotyphserver.database import Base, engine, db_session
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

from liotyphserver import app


class User(Base):
	__tablename__ = 'users'
	id = Column(Integer, primary_key=True)
	name = Column(String(50), unique=True)
	email = Column(String(120), unique=True)
	password = Column(String(120))
	isroot = Column(Boolean)

	def __init__(self, name=None, email=None, password=None, isroot=False):
		self.name = name
		self.email = email
		self.password = password
		self.isroot = isroot

	def __repr__(self):
		return '\{"User": "%r" \}' % (self.name)

	def hash_password(self, password):
		self.password_hash = pwd_context.encrypt(password)

	def verify_password(self, password):
		return pwd_context.verify(password, self.password)

	def generate_auth_token(self, expiration=600):
		s = Serializer(app.config['SECRET_KEY'],expires_in=600)
		return s.dumps({ 'id': self.id})

	@staticmethod
	def verify_auth_token(token):
		print("token %r" %(token))
		s = Serializer(app.config['SECRET_KEY'])
		try:
			data = s.loads(token)
		except SignatureExpired:
			return None
		except BadSignature:
			return None
		user = User.query.get(data['id'])
		return user


@event.listens_for(User.__table__, 'after_create')
def init_table(target, connection, **kw):
	print("Init table User")
	first_user = User('admin')
	first_user.isroot = True
	first_user.password = pwd_context.encrypt("liotyph")
	db_session.add(first_user)
	db_session.commit()





class Picture(Base):
	__tablename__ = 'pictures'
	id = Column(Integer, primary_key = True)
	year = Column(Integer, default = 0)
	month = Column(Integer, default = 0)
	path = Column(String(200), unique = True)
	orientation = Column(Integer, default = 0)

	def  __init__(self, year=0, month=0, path=None, orientation=0):
		self.year = year
		self.month = month
		self.path = path
		self.orientation = orientation

	def __repr__(self):
		return '<Picture %r>' % (self.path)


Base.metadata.create_all(engine)
