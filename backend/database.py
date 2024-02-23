from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

#Database url
url_database = "sqlite:///finance.db"

Engine=create_engine(url_database,connect_args={"check_same_thread":False})
session_local = sessionmaker(autocommit=False,autoflush=False,bind=Engine)
Base=declarative_base()
