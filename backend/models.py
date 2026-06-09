from mongoengine import Document, StringField, connect, DateTimeField, IntField
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()
connect(host=os.getenv("MONGO_URI"))

class User(Document):
    name = StringField(required=True, max_length=100)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)

class Upload(Document):
    meta = {'collection': 'upload', 'strict': False}
    user_email = StringField(required=True)
    file_url = StringField(required=True)
    public_id = StringField(required=True, unique=True)
    format = StringField(max_length=50)
    bytes = IntField()
    created_at = DateTimeField(default=datetime.utcnow)
