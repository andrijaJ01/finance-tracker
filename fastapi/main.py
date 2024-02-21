from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import session_local 
from database import Engine 
from fastapi.middleware.cors import CORSMiddleware
import models

app = FastAPI()

origins = [
        "http://localhost:3000",
        ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)


class transBase(BaseModel):
    amt:float
    cat:str
    desc:str
    is_income:bool
    date:str

class transModel(transBase):
    id: int
    class config:
        orm_mode = True

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=Engine)

@app.post("/tran", response_model=transModel)
async def create_transaction(transaction: transBase,db:db_dependency):
    db_trans= models.transaction(**transaction.dict())
    db.add(db_trans)
    db.commit()
    db.refresh(db_trans)
    return db_trans

@app.get("/transaction", response_model=List[transModel])
async def read_trans(db:db_dependency,skip:int = 0, limit:int = 100):
    trans = db.query(models.transaction).offset(skip).limit(limit).all()
    return trans
