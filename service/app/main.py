# app/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from app import models, schemas
from app.database import Base, engine, SessionLocal

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Webhook Transaction Service")

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def health_check():
    """Simple health check"""
    return {
        "status": "HEALTHY",
        "current_time": datetime.utcnow().isoformat()
    }


@app.post("/v1/webhooks/transactions", status_code=202)
def receive_webhook(payload: schemas.TransactionCreate, db: Session = Depends(get_db)):
    """Receive transaction webhook"""
    txn = db.query(models.Transaction).filter_by(transaction_id=payload.transaction_id).first()

    if txn:
        # Already exists — return idempotent response
        return {"status": "ALREADY_EXISTS"}

    new_txn = models.Transaction(
        transaction_id=payload.transaction_id,
        source_account=payload.source_account,
        destination_account=payload.destination_account,
        amount=payload.amount,
        currency=payload.currency,
        status="PROCESSING"
    )
    db.add(new_txn)
    db.commit()

    # Background task will be added later (Celery)
    return {"status": "ACCEPTED"}


@app.get("/v1/transactions/{transaction_id}", response_model=schemas.TransactionResponse)
def get_transaction(transaction_id: str, db: Session = Depends(get_db)):
    """Retrieve transaction by ID"""
    txn = db.query(models.Transaction).filter_by(transaction_id=transaction_id).first()

    if not txn:
        raise HTTPException(status_code=404, detail="Transaction not found")

    return txn
