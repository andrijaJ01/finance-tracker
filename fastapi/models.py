from database import Base
from sqlalchemy import Column, String, Integer, Boolean, Float

class transaction(Base):
    __tablename__ = "transacrions"
    id = Column(Integer,primary_key=True,index=True)
    amt = Column(Float)
    cat = Column(String)
    desc = Column(String)
    is_income = Column(Boolean)
    date = Column(String)
